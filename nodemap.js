// === NODE MAP ===
let mapCtx, mapW, mapH;
let mapNodes = [];
let selectedNode = null;

// Spain bounding box
const SPAIN = { minLat: 35.8, maxLat: 43.8, minLon: -9.5, maxLon: 4.5 };

function openMap() {
  showScreen('mapScreen');
  setTimeout(initMap, 100);
}

function closeMap() {
  showMenu();
}

function initMap() {
  const canvas = document.getElementById('mapCanvas');
  const container = document.getElementById('mapContainer');
  mapW = container.clientWidth;
  mapH = container.clientHeight;
  canvas.width = mapW * 2; // retina
  canvas.height = mapH * 2;
  canvas.style.width = mapW + 'px';
  canvas.style.height = mapH + 'px';
  mapCtx = canvas.getContext('2d');
  mapCtx.scale(2, 2);

  // Project nodes
  mapNodes = NODES.map(n => {
    const x = ((n.lon - SPAIN.minLon) / (SPAIN.maxLon - SPAIN.minLon)) * (mapW - 60) + 30;
    const y = ((SPAIN.maxLat - n.lat) / (SPAIN.maxLat - SPAIN.minLat)) * (mapH - 80) + 40;
    const radius = Math.max(12, Math.min(28, n.stores / 3));
    const baseRadius2 = n.stores > 0 ? Math.max(14, Math.min(28, n.stores / 3)) : 12;
    return { ...n, x, y, radius: baseRadius2 };
  });

  drawMap();

  // Touch/click
  canvas.addEventListener('click', handleMapClick);
  canvas.addEventListener('touchstart', handleMapTouch, { passive: true });
}

function drawMap() {
  mapCtx.clearRect(0, 0, mapW, mapH);

  // Draw connections (subtle lines between nearby nodes)
  mapCtx.strokeStyle = 'rgba(0,168,225,0.08)';
  mapCtx.lineWidth = 1;
  for (let i = 0; i < mapNodes.length; i++) {
    for (let j = i + 1; j < mapNodes.length; j++) {
      const dx = mapNodes[i].x - mapNodes[j].x;
      const dy = mapNodes[i].y - mapNodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        mapCtx.beginPath();
        mapCtx.moveTo(mapNodes[i].x, mapNodes[i].y);
        mapCtx.lineTo(mapNodes[j].x, mapNodes[j].y);
        mapCtx.stroke();
      }
    }
  }

  // Draw nodes
  mapNodes.forEach(n => {
    const isSelected = selectedNode && selectedNode.station === n.station;

    // Glow
    if (isSelected) {
      mapCtx.beginPath();
      mapCtx.arc(n.x, n.y, n.radius + 8, 0, Math.PI * 2);
      mapCtx.fillStyle = 'rgba(0,168,225,0.15)';
      mapCtx.fill();
    }

    // Outer ring
    mapCtx.beginPath();
    mapCtx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
    mapCtx.fillStyle = isSelected ? 'rgba(0,168,225,0.3)' : 'rgba(0,0,0,0.06)';
    mapCtx.fill();

    // Main circle
    const color = n.type === 'Hub' ? '#ff9900' : '#00a8e1';
    const baseRadius = n.stores > 0 ? Math.max(14, Math.min(28, n.stores / 3)) : 12;
    const gradient = mapCtx.createRadialGradient(n.x - baseRadius * 0.3, n.y - baseRadius * 0.3, 0, n.x, n.y, baseRadius);
    gradient.addColorStop(0, lightenColor(color, 30));
    gradient.addColorStop(1, color);

    mapCtx.beginPath();
    mapCtx.arc(n.x, n.y, baseRadius, 0, Math.PI * 2);
    mapCtx.fillStyle = gradient;
    mapCtx.fill();

    // Shadow
    mapCtx.shadowColor = color;
    mapCtx.shadowBlur = isSelected ? 16 : 8;
    mapCtx.beginPath();
    mapCtx.arc(n.x, n.y, baseRadius, 0, Math.PI * 2);
    mapCtx.fillStyle = 'transparent';
    mapCtx.fill();
    mapCtx.shadowBlur = 0;

    // Label
    mapCtx.fillStyle = '#fff';
    mapCtx.font = `bold ${Math.max(7, baseRadius * 0.5)}px -apple-system, sans-serif`;
    mapCtx.textAlign = 'center';
    mapCtx.textBaseline = 'middle';
    mapCtx.fillText(n.station, n.x, n.y);
  });
}

function handleMapClick(e) {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  findAndSelectNode(x, y);
}

function handleMapTouch(e) {
  const rect = e.target.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  findAndSelectNode(x, y);
}

function findAndSelectNode(x, y) {
  let found = null;
  for (const n of mapNodes) {
    const dx = x - n.x;
    const dy = y - n.y;
    if (Math.sqrt(dx * dx + dy * dy) < n.radius + 10) {
      found = n;
      break;
    }
  }

  if (found) {
    selectedNode = found;
    showNodeInfo(found);
    if (navigator.vibrate) navigator.vibrate(20);
  } else {
    selectedNode = null;
    document.getElementById('mapInfoPanel').classList.remove('active');
  }
  drawMap();
}

function showNodeInfo(node) {
  document.getElementById('mapInfoStation').textContent = node.station;
  document.getElementById('mapInfoRegion').textContent = node.region;
  document.getElementById('mapInfoStores').textContent = node.stores;
  document.getElementById('mapInfoDensity').textContent = node.stores > 0 ? node.stores + ' tiendas' : 'N/A';
  document.getElementById('mapInfoProgram').textContent = node.type;
  document.getElementById('mapInfoProvinces').innerHTML = node.provinces.map(p =>
    `<span class="mip-chip">${p}</span>`
  ).join('');
  document.getElementById('mapInfoPanel').classList.add('active');
}

function lightenColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + percent);
  const g = Math.min(255, ((num >> 8) & 0x00FF) + percent);
  const b = Math.min(255, (num & 0x0000FF) + percent);
  return `rgb(${r},${g},${b})`;
}

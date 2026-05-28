// === PREMIUM NODE MAP — Fixed Pulse + Spread ===
let leafletMap = null;
let mapMarkers = [];
let selectedNode = null;
let mapMode = 'default';
let pulseInterval = null;

function openMap() {
  showScreen('mapScreen');
  setTimeout(initLeafletMap, 200);
}

function closeMap() {
  if (pulseInterval) { clearInterval(pulseInterval); pulseInterval = null; }
  showMenu();
}

function initLeafletMap() {
  if (leafletMap) { leafletMap.remove(); leafletMap = null; }
  if (pulseInterval) { clearInterval(pulseInterval); pulseInterval = null; }

  leafletMap = L.map('leafletMap', {
    center: [39.5, -3.0],
    zoom: 6,
    zoomControl: false,
    attributionControl: false
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 16, minZoom: 5
  }).addTo(leafletMap);

  L.control.zoom({ position: 'bottomleft' }).addTo(leafletMap);

  const spreadNodes = applySpread(NODES);
  renderNodes(spreadNodes);
  startPulseAnimation();
  injectMapStyles();
}

// Spread overlapping nodes so they don't stack
function applySpread(nodes) {
  const spread = 0.04; // degrees offset
  const groups = {};

  // Group by rounded coords
  nodes.forEach(n => {
    const key = `${(n.lat * 10).toFixed(0)}_${(n.lon * 10).toFixed(0)}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
  });

  const result = [];
  Object.values(groups).forEach(group => {
    if (group.length === 1) {
      result.push({ ...group[0], displayLat: group[0].lat, displayLon: group[0].lon });
    } else {
      // Arrange in circle around center
      const cx = group.reduce((s, n) => s + n.lat, 0) / group.length;
      const cy = group.reduce((s, n) => s + n.lon, 0) / group.length;
      const angleStep = (2 * Math.PI) / group.length;
      const radius = spread * Math.min(group.length, 6) / 3;
      group.forEach((n, i) => {
        const angle = angleStep * i - Math.PI / 2;
        result.push({
          ...n,
          displayLat: cx + Math.cos(angle) * radius,
          displayLon: cy + Math.sin(angle) * radius * 1.3 // lon is narrower at Spain's lat
        });
      });
    }
  });
  return result;
}

function renderNodes(nodes) {
  mapMarkers = [];
  const maxVol = Math.max(...nodes.map(n => n.volume || 0));

  nodes.forEach((node) => {
    const color = getNodeColor(node);
    const vol = node.volume || 1000;
    const baseRadius = Math.max(4, Math.min(12, (vol / maxVol) * 12));
    const lat = node.displayLat;
    const lon = node.displayLon;

    // Heat glow (static, no animation)
    const heatRing = L.circleMarker([lat, lon], {
      radius: baseRadius + 8 + (vol / maxVol) * 14,
      fillColor: color,
      color: 'transparent',
      weight: 0,
      fillOpacity: 0.06
    }).addTo(leafletMap);

    // Pulse ring for Exclusive (will be animated via JS)
    let pulseRing = null;
    if (node.type === 'Exclusive') {
      pulseRing = L.circleMarker([lat, lon], {
        radius: baseRadius + 3,
        fillColor: 'transparent',
        color: color,
        weight: 1.5,
        opacity: 0.6,
        fillOpacity: 0
      }).addTo(leafletMap);
    }

    // Main dot
    const marker = L.circleMarker([lat, lon], {
      radius: baseRadius,
      fillColor: color,
      color: '#fff',
      weight: 1.2,
      opacity: 0.9,
      fillOpacity: 0.9
    }).addTo(leafletMap);

    // Label (only show at zoom >= 7 or always for bigger nodes)
    marker.bindTooltip(node.station, {
      permanent: true,
      direction: 'top',
      offset: [0, -baseRadius - 2],
      className: node.type === 'Exclusive' ? 'node-label node-label-exclusive' : 'node-label'
    });

    marker.on('click', () => selectNode(node, marker));

    mapMarkers.push({ marker, heatRing, pulseRing, node, baseRadius });
  });

  leafletMap.on('click', (e) => {
    if (!e.originalEvent.target.closest('.leaflet-interactive')) closeInfoPanel();
  });
}

// JS-based pulse: smoothly animate radius of purple rings
function startPulseAnimation() {
  let tick = 0;
  pulseInterval = setInterval(() => {
    tick += 0.08;
    const pulse = Math.sin(tick) * 0.5 + 0.5; // 0..1
    mapMarkers.forEach(({ pulseRing, baseRadius }) => {
      if (!pulseRing) return;
      const r = baseRadius + 3 + pulse * 6;
      const opacity = 0.7 - pulse * 0.5;
      pulseRing.setRadius(r);
      pulseRing.setStyle({ opacity: Math.max(0.15, opacity) });
    });
  }, 50);
}

function selectNode(node, marker) {
  selectedNode = node;
  mapMarkers.forEach(m => m.marker.setStyle({ weight: 1.2 }));
  marker.setStyle({ weight: 3 });

  leafletMap.flyTo([node.displayLat || node.lat, node.displayLon || node.lon],
    Math.max(leafletMap.getZoom(), 8), { duration: 0.5 });

  showNodeInfo(node);
  if (navigator.vibrate) navigator.vibrate(15);
}

function closeInfoPanel() {
  document.getElementById('mapInfoPanel').classList.remove('active');
  selectedNode = null;
  mapMarkers.forEach(m => m.marker.setStyle({ weight: 1.2 }));
}

function showNodeInfo(node) {
  const maxVol = Math.max(...NODES.map(n => n.volume || 0));
  const volPct = ((node.volume || 0) / maxVol * 100).toFixed(0);

  document.getElementById('mapInfoStation').textContent = node.station;
  document.getElementById('mapInfoRegion').textContent = `${node.region} • ${node.type}`;
  document.getElementById('mapInfoStores').textContent = node.stores || '—';
  document.getElementById('mapInfoDensity').textContent = volPct + '%';
  document.getElementById('mapInfoProgram').textContent = node.type;
  document.getElementById('mapInfoProvinces').innerHTML = node.provinces.map(p =>
    `<span class="mip-chip">${p}</span>`
  ).join('') + (node.motherDS ? `<span class="mip-chip mip-mother">Mother: ${node.motherDS}</span>` : '');

  const volBar = document.getElementById('mapInfoVolBar');
  if (volBar) { volBar.style.width = volPct + '%'; volBar.style.background = getNodeColor(node); }
  const volLabel = document.getElementById('mapInfoVolLabel');
  if (volLabel) volLabel.textContent = (node.volume || 0).toLocaleString() + ' pkg/día';

  document.getElementById('mapInfoPanel').classList.add('active');
}

function toggleMapMode() {
  const modes = ['default', 'heatmap', 'volume'];
  mapMode = modes[(modes.indexOf(mapMode) + 1) % modes.length];
  const btn = document.getElementById('mapModeBtn');
  if (btn) btn.textContent = { default: '🌐 Normal', heatmap: '🔥 Calor', volume: '📦 Volumen' }[mapMode];
  applyMapMode();
}

function applyMapMode() {
  const maxVol = Math.max(...NODES.map(n => n.volume || 0));
  mapMarkers.forEach(({ marker, heatRing, node, baseRadius }) => {
    const intensity = (node.volume || 0) / maxVol;
    if (mapMode === 'heatmap') {
      heatRing.setStyle({ fillOpacity: intensity * 0.22 });
      marker.setStyle({ fillOpacity: 0.95 });
    } else if (mapMode === 'volume') {
      marker.setRadius(Math.max(5, intensity * 18));
      heatRing.setStyle({ fillOpacity: intensity * 0.15 });
    } else {
      marker.setRadius(baseRadius);
      heatRing.setStyle({ fillOpacity: 0.06 });
      marker.setStyle({ fillOpacity: 0.9 });
    }
  });
}

function getNodeColor(node) {
  switch (node.type) {
    case 'Exclusive': return '#a855f7';
    case 'Hub': return '#ff9900';
    case 'DS': return '#00a8e1';
    default: return '#6b7280';
  }
}

function injectMapStyles() {
  if (document.getElementById('premiumMapStyles')) return;
  const style = document.createElement('style');
  style.id = 'premiumMapStyles';
  style.textContent = `
    .node-label {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      color: rgba(255,255,255,.85) !important;
      font-size: 7.5px !important;
      font-weight: 700 !important;
      text-shadow: 0 1px 3px rgba(0,0,0,.95), 0 0 6px rgba(0,0,0,.6) !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    .node-label::before { display: none !important; }
    .node-label-exclusive {
      color: #e9d5ff !important;
      text-shadow: 0 1px 3px rgba(168,85,247,.9), 0 0 8px rgba(168,85,247,.4) !important;
    }

    #leafletMap { border-radius: 0; background: #080d16; }

    .leaflet-control-zoom a {
      background: rgba(12,18,30,.94) !important;
      color: #fff !important;
      border: 1px solid rgba(255,255,255,.08) !important;
      width: 36px !important;
      height: 36px !important;
      line-height: 36px !important;
      font-size: 15px !important;
      border-radius: 10px !important;
      margin-bottom: 4px !important;
      backdrop-filter: blur(10px) !important;
    }

    .map-mode-btn {
      position: absolute;
      top: 60px;
      left: 12px;
      z-index: 1000;
      background: rgba(12,18,30,.94);
      border: 1px solid rgba(255,255,255,.1);
      color: #fff;
      padding: 9px 14px;
      border-radius: 10px;
      font-size: 0.7rem;
      font-weight: 700;
      cursor: pointer;
      backdrop-filter: blur(10px);
      transition: all 0.2s;
    }
    .map-mode-btn:active { transform: scale(0.94); }

    .map-legend {
      background: rgba(12,18,30,.94) !important;
      border: 1px solid rgba(255,255,255,.06) !important;
      backdrop-filter: blur(14px) !important;
      border-radius: 12px !important;
      padding: 12px 14px !important;
      box-shadow: 0 6px 24px rgba(0,0,0,.4) !important;
    }
    .map-legend-title { color: rgba(255,255,255,.5) !important; font-size: 0.55rem !important; letter-spacing: 0.8px !important; }
    .map-legend-item { color: rgba(255,255,255,.75) !important; font-size: 0.62rem !important; }

    .map-info-panel {
      background: rgba(12,18,30,.96) !important;
      border: 1px solid rgba(255,255,255,.06) !important;
      backdrop-filter: blur(20px) !important;
      border-radius: 22px 22px 0 0 !important;
      box-shadow: 0 -10px 40px rgba(0,0,0,.5) !important;
    }
    .map-info-station { color: #fff !important; font-size: 1.3rem !important; }
    .map-info-region { color: rgba(255,255,255,.45) !important; }
    .map-info-stat { background: rgba(255,255,255,.04) !important; border: 1px solid rgba(255,255,255,.06) !important; border-radius: 12px !important; }
    .map-info-stat .mis-val { color: #fff !important; }
    .map-info-stat .mis-lbl { color: rgba(255,255,255,.35) !important; }
    .mip-chip { background: rgba(0,168,225,.1) !important; color: #38bdf8 !important; border: 1px solid rgba(0,168,225,.15) !important; }
    .mip-mother { background: rgba(168,85,247,.1) !important; color: #c084fc !important; border: 1px solid rgba(168,85,247,.15) !important; }

    .vol-bar-wrap { width:100%; height:5px; background:rgba(255,255,255,.06); border-radius:3px; margin-top:12px; overflow:hidden; }
    .vol-bar { height:100%; border-radius:3px; transition:width .5s ease; }
    .vol-label { font-size:.66rem; color:rgba(255,255,255,.4); margin-top:5px; font-weight:600; }

    .map-header { background:rgba(12,18,30,.94) !important; border-bottom:1px solid rgba(255,255,255,.04) !important; backdrop-filter:blur(14px) !important; z-index:10; position:relative; }
    .map-header-title { color:#fff !important; }
    .map-header .btn-close { color:rgba(255,255,255,.5) !important; }

    .map-stats-bar { position:absolute; top:60px; right:12px; z-index:5; display:flex; flex-direction:column; gap:5px; }
    .map-stat-pill { background:rgba(12,18,30,.94); border:1px solid rgba(255,255,255,.06); backdrop-filter:blur(10px); border-radius:8px; padding:5px 10px; font-size:0.58rem; font-weight:700; color:rgba(255,255,255,.75); display:flex; align-items:center; gap:5px; }
    .map-stat-pill .dot { width:7px; height:7px; border-radius:50%; }
  `;
  document.head.appendChild(style);
}

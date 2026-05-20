// === NODE MAP WITH LEAFLET ===
let leafletMap = null;
let mapMarkers = [];
let selectedNode = null;

function openMap() {
  showScreen('mapScreen');
  setTimeout(initLeafletMap, 150);
}

function closeMap() {
  showMenu();
}

function initLeafletMap() {
  // Destroy previous instance if exists
  if (leafletMap) {
    leafletMap.remove();
    leafletMap = null;
  }

  // Create map centered on Spain
  leafletMap = L.map('leafletMap', {
    center: [39.8, -3.0],
    zoom: 6,
    zoomControl: false,
    attributionControl: false
  });

  // Dark premium tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 14,
    minZoom: 5
  }).addTo(leafletMap);

  // Add zoom control bottom-left
  L.control.zoom({ position: 'bottomleft' }).addTo(leafletMap);

  // Add nodes as circle markers
  mapMarkers = [];
  NODES.forEach(node => {
    const color = node.type === 'Hub' ? '#ff9900' : '#00a8e1';
    const radius = node.stores > 0 ? Math.max(8, Math.min(20, node.stores / 5)) : 7;

    const marker = L.circleMarker([node.lat, node.lon], {
      radius: radius,
      fillColor: color,
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.85
    }).addTo(leafletMap);

    // Label
    marker.bindTooltip(node.station, {
      permanent: true,
      direction: 'center',
      className: 'node-label'
    });

    // Click handler
    marker.on('click', () => {
      selectedNode = node;
      showNodeInfo(node);
      // Highlight
      mapMarkers.forEach(m => {
        m.marker.setStyle({ weight: 2, opacity: 1 });
      });
      marker.setStyle({ weight: 4, opacity: 1 });
      leafletMap.panTo([node.lat, node.lon], { animate: true });
      if (navigator.vibrate) navigator.vibrate(20);
    });

    mapMarkers.push({ marker, node });
  });

  // Close info panel when clicking map background
  leafletMap.on('click', (e) => {
    if (!e.originalEvent.target.closest('.leaflet-interactive')) {
      document.getElementById('mapInfoPanel').classList.remove('active');
      selectedNode = null;
      mapMarkers.forEach(m => m.marker.setStyle({ weight: 2 }));
    }
  });

  // Inject custom CSS for labels
  if (!document.getElementById('nodeMapStyles')) {
    const style = document.createElement('style');
    style.id = 'nodeMapStyles';
    style.textContent = `
      .node-label {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        color: #fff !important;
        font-size: 9px !important;
        font-weight: 800 !important;
        text-shadow: 0 1px 3px rgba(0,0,0,.8) !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .node-label::before { display: none !important; }
      #leafletMap { border-radius: 0; }
      .leaflet-control-zoom a {
        background: rgba(26,43,73,.9) !important;
        color: #fff !important;
        border: none !important;
        width: 36px !important;
        height: 36px !important;
        line-height: 36px !important;
        font-size: 18px !important;
        border-radius: 10px !important;
        margin-bottom: 4px !important;
      }
    `;
    document.head.appendChild(style);
  }
}

function showNodeInfo(node) {
  document.getElementById('mapInfoStation').textContent = node.station;
  document.getElementById('mapInfoRegion').textContent = node.region;
  document.getElementById('mapInfoStores').textContent = node.stores || '-';
  document.getElementById('mapInfoDensity').textContent = node.stores > 80 ? 'Alta' : node.stores > 40 ? 'Media' : node.stores > 0 ? 'Baja' : 'N/A';
  document.getElementById('mapInfoProgram').textContent = node.type;
  document.getElementById('mapInfoProvinces').innerHTML = node.provinces.map(p =>
    `<span class="mip-chip">${p}</span>`
  ).join('');
  document.getElementById('mapInfoPanel').classList.add('active');
}

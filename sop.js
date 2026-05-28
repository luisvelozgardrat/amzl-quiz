// === SOP DATA — VOLUMEN D+1 ===
const SOP_BULK = [
  // BLOQUE 08:00
  {
    title: "🕐 08:00 — Abrir herramienta ADV_v4",
    body: `Dirígete a la carpeta de ejecución local:<br>
      <span class="sop-path">C:\\Users\\luisgard\\amazon.com\\Hub Delivery ES - Documentos\\Network & Planning\\Python\\ADV_v4</span>
      Haz clic en la barra de direcciones, escribe <code>cmd</code> y pulsa Enter. En la consola:<br><br>
      <code>py main.py</code>`,
    checks: ["Consola CMD abierta en carpeta ADV_v4","Comando py main.py ejecutado"]
  },
  {
    title: "🕐 08:00 — Ejecutar extracción (Opción 2)",
    body: `En el menú de la consola, elige la <strong>Opción 2</strong>. Comenzará el proceso automático de Chrome.<br><br>
      <div class="sop-warning"><strong>⚠️ Atención con Chrome:</strong><br>
      1. Saldrá un aviso de que no puede abrir Chrome — ciérralo.<br>
      2. Se abrirá un Chrome sin automatización — cierra esa pestaña.<br>
      3. A los pocos segundos, se abrirá un nuevo Chrome pidiendo login. Inicia sesión y el script extraerá los datos automáticamente.</div>`,
    checks: ["Opción 2 seleccionada","Login completado en Chrome","Extracción automática en curso"]
  },
  {
    title: "🕐 08:00 — Descargar reporte SF (en paralelo)",
    body: `Mientras el script extrae los nodos, descarga el reporte de Tiendas Activas:<br><br>
      <a class="sop-link" href="https://accesspoints.lightning.force.com/lightning/r/Report/00Oat00000558UOEAY/view" target="_blank">📋 Reporte Tiendas Activas — Salesforce</a><br><br>
      Exporta el archivo y guárdalo en <code>ADV_v4\\data\\raw</code> con nombre: <code>SF_YYYY-MM-DD</code>`,
    checks: ["Reporte SF descargado","Archivo guardado en ADV_v4/data/raw con nombre correcto"]
  },
  {
    title: "🕐 08:00 — Procesar datos (Opciones 1 y 6)",
    body: `Una vez que Chrome se haya cerrado (extracción terminada):<br><br>
      1. Vuelve a la consola y selecciona la <strong>Opción 1</strong>. Espera a que termine.<br>
      2. Luego selecciona la <strong>Opción 6</strong>. Toma unos segundos más.<br>
      3. Cuando finalice, puedes cerrar la consola.<br><br>
      <div class="sop-warning"><strong>✅ Verificación:</strong> Comprueba que existe <code>Sort Planning DD.MM.YYYY.xlsx</code> en <code>ADV_v4\\data\\processed</code></div>`,
    checks: ["Opción 1 ejecutada correctamente","Opción 6 ejecutada correctamente","Archivo Sort Planning del día generado"]
  },
  // BLOQUE 12:00
  {
    title: "🕐 12:00 — Descargar Bulk del día desde SharePoint",
    body: `Descarga el archivo Bulk Upload Tool del día:<br><br>
      <a class="sop-link" href="https://amazoneur-my.sharepoint.com/shared?id=%2Fsites%2FHubDeliveryES%2FShared%20Documents%2FNetwork%20%26%20Planning%2FNetwork%2F2%2E%20Store%20Capacity%2F5%2EBulk%20Upload%20tool" target="_blank">📂 SharePoint — Bulk Upload Tool</a>
      <div class="sop-warning"><strong>🚨 CRITICAL — Cambiar la fecha:</strong> Nada más abrir el Bulk, cambia la fecha a <strong>MAÑANA</strong>. Si no se cambia, los ramp-ups de nodos nuevos no calculan correctamente y se coge el volumen del día incorrecto. <strong>Gran impacto.</strong></div>
      <div class="sop-warning"><strong>🚨 Nodos nuevos (en rojo):</strong> Verifica si hay nodos marcados en rojo que necesitan ser arrastrados para lanzar en la fecha correcta.</div>`,
    checks: ["Bulk descargado de SharePoint","Fecha cambiada a MAÑANA","Nodos en rojo verificados/arrastrados"]
  },
  {
    title: "🕐 12:00 — Consultar las tres fuentes de datos",
    body: `Descarga los datos de estas 3 fuentes:<br><br>
      <a class="sop-link" href="https://us-east-1.quicksight.aws.amazon.com/sn/account/amzlbiaquicksight/dashboards/5bcd91e5-3a6d-42af-8d15-a01fce249b86/sheets/5bcd91e5-3a6d-42af-8d15-a01fce249b86_3e539644-0dd6-4d9e-8018-cb91f6cd4bc5?sso_login=true#" target="_blank">🟠 Glamdring — NSD Dashboard (QuickSight)</a>
      <a class="sop-link" href="https://accesspoints.lightning.force.com/lightning/r/Report/00Oat00000558UOEAY/view" target="_blank">🟢 Reporte Tiendas Activas — Salesforce</a>
      <a class="sop-link" href="https://us-east-1.quicksight.aws.amazon.com/sn/account/amzlbiaquicksight/dashboards/3ddfdbb0-52e5-449b-a819-0a0f180e28c7/sheets/3ddfdbb0-52e5-449b-a819-0a0f180e28c7_f092ac35-498d-4bc2-a11c-f448a3f3b8ff" target="_blank">🔵 24H Forecast — QuickSight</a>`,
    checks: ["Glamdring (NSD Adhoc Events) descargado","Reporte SF descargado","24H Forecast descargado"]
  },
  {
    title: "🕐 12:00 — Actualizar el Bulk sumando CAPS del día",
    body: `Añade al archivo Bulk las CAPS del día con los datos de las fuentes consultadas.<br><br>
      <div class="sop-warning"><strong>⚠️ CRÍTICO:</strong> Filtra y elimina todas las filas con valor <strong>0</strong> usando <code>Ctrl + Mayús + L</code>. No omitas este paso.</div><br>
      Copia y pega los datos <strong>siempre como VALORES y sin encabezados</strong>.`,
    checks: ["Ceros filtrados y eliminados","Datos pegados como valores sin encabezados"]
  },
  {
    title: "🕐 12:00 — Extraer datos de Sort Planning para Cap Utilization",
    body: `Abre el archivo Sort Planning del día desde:<br>
      <span class="sop-path">C:\\Users\\luisgard\\amazon.com\\Hub Delivery ES - Documentos\\Network & Planning\\Python\\ADV_v4\\data\\processed</span>
      Extrae la información de la pestaña <strong>SP</strong> y pégala <strong>debajo de la última fila</strong> en la pestaña <strong>Cap Utilization</strong> del Bulk.`,
    checks: ["Pestaña SP abierta en Sort Planning","Datos pegados debajo de última fila en Cap Utilization"]
  },
  {
    title: "🕐 12:00 — Ejecutar las macros del Bulk",
    body: `Con todos los datos cargados, ejecuta las macros del archivo Bulk para que se procesen los cálculos automáticos.`,
    checks: ["Macros ejecutadas correctamente"]
  },
  {
    title: "🕐 12:00 — Ajustar parámetros de volumen Día +1",
    body: `Parámetros ajustables:<br><br>
      <strong>• 24H Adjustment Factor</strong> — máximo 1.3<br>
      <strong>• Min ADV</strong> — máximo 80<br>
      <strong>• Max ADV</strong> — máximo 120<br>
      <strong>• Flex Up vs CVP</strong> — no debe superar ±15%<br>
      <strong>• Delta Admiral vs CVP</strong> — cuanto más cercano a 0, mejor<br><br>
      Colchón sobre CVP: +200 a +800 paquetes según tamaño del nodo (por pérdida en secuenciación).`,
    checks: ["Factor, Min/Max ADV ajustados","Flex Up vs CVP dentro de ±15%","Delta Admiral vs CVP revisado"]
  },
  // BLOQUE 15:00
  {
    title: "🕐 15:00 — Extraer archivo desde Slack (nsd-audits-es)",
    body: `Entra al canal <code>nsd-audits-es</code> y ejecuta:<br><br>
      <code>/export [fecha-3dias] [fecha-mañana]</code><br><br>
      Espera a que cargue completamente antes de descargar.<br>
      <a class="sop-link" href="https://amazon.enterprise.slack.com/archives/nsd-audits-es" target="_blank">📎 Abrir canal nsd-audits-es</a>`,
    checks: ["Comando /export ejecutado con rango correcto","Archivo descargado completamente"]
  },
  {
    title: "🕐 15:00 — Ejecutar script NSDslackv2",
    body: `Navega a la ruta del script y ejecútalo con el archivo descargado:<br>
      <span class="sop-path">C:\\Users\\luisgard\\amazon.com\\Hub Delivery ES - Documentos\\Network & Planning\\Python\\Rostering\\NSDslackv2</span>`,
    checks: ["Script NSDslackv2 ejecutado correctamente"]
  },
  {
    title: "🕐 15:00 — Actualizar Bulk con datos del script",
    body: `Incorpora los resultados del script NSDslackv2 al archivo Bulk (pestaña NSD Slack).<br><br>
      <div class="sop-warning"><strong>⚠️ Recuerda:</strong> Pegar siempre como <strong>valores</strong> y sin encabezados.</div>`,
    checks: ["Datos del script pegados en pestaña NSD Slack"]
  },
  {
    title: "🕐 15:00 — Revisión final de parámetros",
    body: `Revisa que todo esté dentro de rangos:<br><br>
      • <strong>Flex Up vs CVP</strong> — no superar ±15%<br>
      • <strong>24H Factor</strong> — máximo 1.3<br>
      • <strong>Min ADV</strong> — máximo 80<br>
      • <strong>Max ADV</strong> — máximo 120<br>
      • <strong>Delta Admiral vs CVP</strong> — cercano a 0`,
    checks: ["Todos los parámetros dentro de rango"]
  },
  {
    title: "🕐 15:00 — Verificar fecha y crear TT para LMAQ",
    body: `<div class="sop-warning"><strong>🚨 IMPORTANTE:</strong> Verifica que la fecha sea <strong>MAÑANA</strong> antes de enviar.</div><br>
      <a class="sop-link" href="https://river-iad.amazon.com/?org=hub_delivery" target="_blank">🎫 River — Crear TT (Hub Delivery)</a><br><br>
      <strong>Configuración del TT:</strong><br>
      • Type of Change: Supply Window Max Capacity Change<br>
      • Bulk Upload Type: Ad Hoc SW Max Capacity Change<br>
      • Effective Date: Fecha de MAÑANA (MM/DD/YYYY)<br><br>
      <div class="sop-warning"><strong>🚨 CRITICAL:</strong> Adjuntar archivo CSV (MCO) en la página final del SIM antes de "Submit ticket".</div>`,
    checks: ["Fecha verificada = mañana","TT creado en River","MCO (CSV) adjunto en el TT"]
  }
];

// === SOP DATA — HUB HERO ===
const SOP_HUB_HERO = [
  {
    title: "Fase 1 — Abrir herramienta ADV_v4",
    body: `Dirígete a la carpeta:<br>
      <span class="sop-path">C:\\Users\\luisgard\\amazon.com\\Hub Delivery ES - Documentos\\Network & Planning\\Python\\ADV_v4</span>
      Haz clic en la barra de direcciones, escribe <code>cmd</code> y pulsa Enter. En la consola:<br><br>
      <code>py main.py</code>`,
    checks: ["Consola CMD abierta","py main.py ejecutado"]
  },
  {
    title: "Fase 1 — Ejecutar extracción (Opción 2)",
    body: `Elige la <strong>Opción 2</strong> en el menú. Chrome se abrirá automáticamente.<br><br>
      <div class="sop-warning"><strong>⚠️ Chrome:</strong> Cerrar avisos iniciales → login en el Chrome que pide sesión → extracción automática.</div>`,
    checks: ["Opción 2 ejecutada","Login completado","Extracción en curso"]
  },
  {
    title: "Fase 1 — Descargar reporte SF (en paralelo)",
    body: `Mientras extrae, descarga el reporte de Salesforce:<br><br>
      <a class="sop-link" href="https://accesspoints.lightning.force.com/lightning/r/Report/00Oat00000558UOEAY/view" target="_blank">📋 Reporte Tiendas Activas — Salesforce</a><br><br>
      Guárdalo en <code>ADV_v4\\data\\raw</code> como <code>SF_YYYY-MM-DD</code>`,
    checks: ["Reporte SF descargado","Guardado en data/raw con nombre correcto"]
  },
  {
    title: "Fase 1 — Procesar datos (Opciones 1 y 6)",
    body: `Cuando Chrome se cierre:<br><br>
      1. Selecciona <strong>Opción 1</strong> → espera.<br>
      2. Selecciona <strong>Opción 6</strong> → espera.<br>
      3. Cierra la consola.<br><br>
      Resultado en: <code>ADV_v4\\data\\processed\\Sort Planning DD.MM.YYYY.xlsx</code>`,
    checks: ["Opción 1 completada","Opción 6 completada","Sort Planning generado"]
  },
  {
    title: "Fase 2 — Abrir Base de Datos Hub Hero",
    body: `Ve a la carpeta del proyecto:<br>
      <span class="sop-path">C:\\Users\\luisgard\\amazon.com\\Hub Delivery ES - Documentos\\Network & Planning\\Proyectos\\7. HUB hero</span>
      Abre el archivo <strong>hub hero.xlsx</strong>.`,
    checks: ["Archivo hub hero.xlsx abierto"]
  },
  {
    title: "Fase 2 — Pegar datos de Sort Planning",
    body: `En <strong>hub hero.xlsx</strong>, ve a la pestaña <strong>Sort planning</strong>:<br><br>
      1. Borra todos los datos desde fila 2 hacia abajo.<br>
      2. Sitúate en A2 y pega como <strong>valores</strong> (Ctrl+Shift+V) los datos de la pestaña SP del Sort Planning del día.<br><br>
      <div class="sop-warning"><strong>💡 Importante:</strong> Siempre "Pegar como valores" para no romper fórmulas. Guarda y cierra al terminar.</div>`,
    checks: ["Datos anteriores borrados","Datos nuevos pegados como valores","Archivo guardado y cerrado"]
  },
  {
    title: "Fase 3 — Generar Dashboard interactivo",
    body: `Sin salir de la carpeta <strong>7. HUB hero</strong>:<br><br>
      1. Clic en barra de direcciones → escribe <code>cmd</code> → Enter<br>
      2. En la consola: <code>py ejecutar_hub_hero.pyw</code><br>
      3. Espera a que termine la ventana de carga.<br><br>
      Se genera <code>dashboard_interactive.html</code> en la misma carpeta.`,
    checks: ["Comando ejecutado","Dashboard HTML generado"]
  },
  {
    title: "Fase 3 — Subir a carpeta compartida",
    body: `Copia <code>dashboard_interactive.html</code> y ve a:<br>
      <span class="sop-path">\\\\ant.amazon.com\\dept-eu\\MAD12\\ES-AMZL\\PM-LM\\Rural\\01. Operations\\1. Operativa\\14. HUB Hero</span><br><br>
      1. Borra el archivo existente <strong>ES HUB HERO</strong><br>
      2. Pega el nuevo archivo<br>
      3. Renómbralo a <strong>ES HUB HERO</strong> (sin extensión .html)`,
    checks: ["Archivo antiguo eliminado","Nuevo archivo pegado","Renombrado a ES HUB HERO"]
  }
];

// === COMBINED SOP LIST ===
const SOP_LIST = [
  { id: 'bulk', name: 'SOP Volumen D+1 (Bulk)', data: SOP_BULK },
  { id: 'hubhero', name: 'SOP Hub Hero (Dashboard)', data: SOP_HUB_HERO }
];

// === SOP STATE ===
let currentSOP = SOP_LIST[0];
let sopChecks = JSON.parse(localStorage.getItem('sopChecks')) || {};

function openSOP() {
  showScreen('sopScreen');
  renderSOPSelector();
  renderSOP();
}

function closeSOP() {
  showMenu();
}

function renderSOPSelector() {
  const container = document.getElementById('sopSelector');
  if (!container) return;
  container.innerHTML = SOP_LIST.map(sop => `
    <button class="sop-tab ${sop.id === currentSOP.id ? 'active' : ''}" onclick="switchSOP('${sop.id}')">${sop.name}</button>
  `).join('');
}

function switchSOP(id) {
  currentSOP = SOP_LIST.find(s => s.id === id);
  renderSOPSelector();
  renderSOP();
}

function renderSOP() {
  const list = document.getElementById('sopList');
  const data = currentSOP.data;
  const checksKey = currentSOP.id;
  if (!sopChecks[checksKey]) sopChecks[checksKey] = {};

  list.innerHTML = data.map((step, i) => {
    const stepChecks = sopChecks[checksKey][i] || [];
    const allChecked = step.checks.every((_, ci) => stepChecks.includes(ci));
    return `
      <div class="sop-card ${allChecked ? 'completed' : ''}" id="sopCard${i}">
        <div class="sop-card-header" onclick="toggleSopCard(${i})">
          <div class="sop-step-num">${allChecked ? '✓' : i + 1}</div>
          <div class="sop-step-title">${step.title}</div>
          <div class="sop-chevron">▼</div>
        </div>
        <div class="sop-card-body">
          <div class="sop-body-inner">
            ${step.body}
            ${step.checks.map((c, ci) => `
              <div class="sop-check ${stepChecks.includes(ci) ? 'checked' : ''}" onclick="toggleSopCheck(${i},${ci})">
                <div class="sop-check-box">${stepChecks.includes(ci) ? '✓' : ''}</div>
                <div class="sop-check-text">${c}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
  updateSopProgress();
}

function toggleSopCard(i) {
  const card = document.getElementById(`sopCard${i}`);
  card.classList.toggle('open');
}

function toggleSopCheck(stepIdx, checkIdx) {
  const checksKey = currentSOP.id;
  if (!sopChecks[checksKey]) sopChecks[checksKey] = {};
  if (!sopChecks[checksKey][stepIdx]) sopChecks[checksKey][stepIdx] = [];
  const idx = sopChecks[checksKey][stepIdx].indexOf(checkIdx);
  if (idx === -1) {
    sopChecks[checksKey][stepIdx].push(checkIdx);
  } else {
    sopChecks[checksKey][stepIdx].splice(idx, 1);
  }
  localStorage.setItem('sopChecks', JSON.stringify(sopChecks));
  renderSOP();
}

function updateSopProgress() {
  const data = currentSOP.data;
  const checksKey = currentSOP.id;
  const totalChecks = data.reduce((sum, s) => sum + s.checks.length, 0);
  const doneChecks = Object.values(sopChecks[checksKey] || {}).reduce((sum, arr) => sum + arr.length, 0);
  const pct = totalChecks > 0 ? (doneChecks / totalChecks) * 100 : 0;
  document.getElementById('sopProgressBar').style.width = `${pct}%`;
}

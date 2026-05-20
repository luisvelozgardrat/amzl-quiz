// === SOP DATA ===
const SOP_DATA = [
  {
    title: "Extraer archivo desde Slack — nsd-audits-es",
    body: `Entra al canal <code>nsd-audits-es</code> en Slack y ejecuta el comando de exportación con el rango de fechas:<br><br>
      <code>/export 2026-05-15 2026-05-18</code><br><br>
      Espera a que el archivo termine de cargar completamente antes de descargarlo.
      <a class="sop-link" href="https://amzn-amzl.slack.com/archives/nsd-audits-es" target="_blank">🔗 Abrir canal Slack</a>`,
    checks: ["Comando /export ejecutado con fechas correctas","Archivo descargado completamente"]
  },
  {
    title: "Ejecutar script Python — NSDslackv2",
    body: `Una vez descargado el archivo, navega a la siguiente ruta y ejecuta el script:
      <span class="sop-path">C:\\Users\\luisgard\\amazon.com\\Hub Delivery ES - Documentos\\Network & Planning\\Python\\Rostering\\NSDslackv2</span>`,
    checks: ["Script NSDslackv2 ejecutado correctamente"]
  },
  {
    title: "Consultar las tres fuentes de datos",
    body: `Consulta estas 3 fuentes y sube el NSD Dashboard en Glamdling:<br><br>
      <a class="sop-link" href="https://us-east-1.quicksight.aws.amazon.com/sn/account/amzlbiaquicksight/dashboards/5bcd91e5-3" target="_blank">📊 NSD Dashboard (QuickSight)</a>
      <a class="sop-link" href="https://accesspoints.lightning.force.com/lightning/r/Report/00Oat00000558UOEAY/view" target="_blank">📋 Tiendas Activas (Salesforce)</a>
      <a class="sop-link" href="https://us-east-1.quicksight.aws.amazon.com/sn/account/amzlbiaquicksight/dashboards/3ddfdbb0-5" target="_blank">📈 24H Forecast (QuickSight)</a>`,
    checks: ["NSD Dashboard consultado y subido en Glamdling","Reporte tiendas activas revisado en Salesforce","24H Forecast consultado en QuickSight"]
  },
  {
    title: "Trabajar el archivo Bulk en CAPS",
    body: `Navega a la carpeta de Bulk Uploads:
      <span class="sop-path">C:\\Users\\luisgard\\amazon.com\\Hub Delivery ES - Network & Planning\\Network\\1. SnOP\\7. Bulk Uploads CAPS</span>
      <div class="sop-warning"><strong>⚠️ CRÍTICO:</strong> Filtra y elimina todas las filas con valor <strong>0</strong> usando <code>Ctrl + Mayús + L</code>. No omitas este paso.</div>
      Copia y pega los datos <strong>siempre como VALORES y sin encabezados</strong> para preservar la estructura del archivo original.`,
    checks: ["Ceros eliminados del bulk con filtro Ctrl+Mayús+L","Datos pegados como valores y sin encabezados"]
  },
  {
    title: "Ajustar parámetros de volumen Día +1",
    body: `Estas son las <strong>únicas celdas que puedes modificar</strong> para alterar la media de paquetes del día siguiente:<br><br>
      <strong>• 24H Adjustment Factor</strong> — Factor de ajuste sobre el forecast de las próximas 24h<br>
      <strong>• Min ADV</strong> — Volumen diario promedio mínimo permitido<br>
      <strong>• Max ADV</strong> — Volumen diario promedio máximo permitido<br>
      <strong>• Flex Up vs CVP</strong> — No debería pasar del 15%<br>
      <strong>• Delta Admiral vs CVP</strong> — Diferencia entre volumen Admiral vs forecast+CVP`,
    checks: ["Parámetros 24H Adjustment, Min ADV y Max ADV ajustados","Flex Up vs CVP verificado (máx 15%)","Delta Admiral vs CVP revisado"]
  },
  {
    title: "Verificar fecha y crear TT para LMAQ",
    body: `Verifica que la fecha puesta sea la de <strong>mañana</strong>.<br><br>
      Crea el Trouble Ticket en River para que LMAQ apruebe el volumen del día siguiente. El <strong>MCO</strong> es el archivo que adjuntas en el TT.
      <a class="sop-link" href="https://river-iad.amazon.com/?org=hub_delivery" target="_blank">🎫 Crear TT en River (Hub Delivery)</a>`,
    checks: ["Fecha verificada (debe ser mañana)","TT creado en River con MCO adjunto","LMAQ aprobó el volumen"]
  }
];

// === SOP STATE ===
let sopChecks = JSON.parse(localStorage.getItem('sopChecks')) || {};

function openSOP() {
  showScreen('sopScreen');
  renderSOP();
}

function closeSOP() {
  showMenu();
}

function renderSOP() {
  const list = document.getElementById('sopList');
  list.innerHTML = SOP_DATA.map((step, i) => {
    const stepChecks = sopChecks[i] || [];
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
  if (!sopChecks[stepIdx]) sopChecks[stepIdx] = [];
  const idx = sopChecks[stepIdx].indexOf(checkIdx);
  if (idx === -1) {
    sopChecks[stepIdx].push(checkIdx);
  } else {
    sopChecks[stepIdx].splice(idx, 1);
  }
  localStorage.setItem('sopChecks', JSON.stringify(sopChecks));
  renderSOP();
}

function updateSopProgress() {
  const totalChecks = SOP_DATA.reduce((sum, s) => sum + s.checks.length, 0);
  const doneChecks = Object.values(sopChecks).reduce((sum, arr) => sum + arr.length, 0);
  const pct = totalChecks > 0 ? (doneChecks / totalChecks) * 100 : 0;
  document.getElementById('sopProgressBar').style.width = `${pct}%`;
}

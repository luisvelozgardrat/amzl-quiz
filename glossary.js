const glossary=[
{term:"AMZL",full:"Amazon Logistics",desc:"La red logística de última milla de Amazon."},
{term:"HUB",full:"Hub (Centro de distribución)",desc:"Centro de despacho de paquetes para última milla."},
{term:"DBR",full:"Daily Business Review",desc:"Revisión diaria del negocio, reporte operativo que se revisa cada mañana."},
{term:"DP",full:"Delivery Partner",desc:"Socio de entrega (DSP o Flex)."},
{term:"DSP",full:"Delivery Service Partner",desc:"Empresa asociada que realiza entregas para Amazon con su propia flota."},
{term:"EU",full:"Europe",desc:"Región Europa."},
{term:"SEU",full:"Southern Europe",desc:"Europa del Sur."},
{term:"WW HDP",full:"Worldwide Hub Delivery Program",desc:"Programa mundial de entrega por Hubs."},
{term:"SnOP",full:"Sales and Operations Planning",desc:"Planificación de ventas y operaciones (volumen)."},
{term:"OFD",full:"Out for Delivery",desc:"Paquetes que han salido a reparto."},
{term:"Fcst",full:"Forecast",desc:"Pronóstico/previsión de volumen esperado."},
{term:"ND",full:"Next Day",desc:"Día siguiente."},
{term:"D0",full:"Day Zero",desc:"Día actual/hoy."},
{term:"W0/W1",full:"Week 0 / Week 1",desc:"Semana actual / semana siguiente."},
{term:"WtD",full:"Week to Date",desc:"Acumulado de la semana hasta la fecha."},
{term:"WON",full:"Week Over Network",desc:"Métrica de attainment semanal sobre la red."},
{term:"Cap Utilization",full:"Capacity Utilization",desc:"Porcentaje de uso de la capacidad instalada de una estación. >98% = riesgo de saturación."},
{term:"New Intake",full:"New Intake",desc:"Volumen nuevo de paquetes que ingresa a la red logística."},
{term:"LMDX",full:"Last Mile Delivery Experience",desc:"Experiencia de entrega de última milla. Mide calidad."},
{term:"BPS",full:"Basis Points",desc:"Puntos base. 1 BPS = 0.01%. Mide impacto en coste de fallos."},
{term:"DPMO",full:"Defects Per Million Opportunities",desc:"Defectos por millón de oportunidades. Menos es mejor."},
{term:"PDD",full:"Promised Delivery Date",desc:"Fecha de entrega prometida al cliente."},
{term:"DEA",full:"Delivery Execution Attempt",desc:"Ventana/intento de ejecución de entrega planificada."},
{term:"NOV",full:"Not on Van",desc:"Paquete que no se cargó en la furgoneta. Fallo operativo."},
{term:"OV",full:"Over Volume",desc:"Exceso de volumen sobre la capacidad de la estación."},
{term:"PANDA",full:"PANDA (sistema interno)",desc:"Sistema que calcula el Attainment con numerador (ganados) / denominador (oportunidades)."},
{term:"SC",full:"Slow Connections",desc:"Conexiones lentas entre nodos de la red. Causan pérdida de attainment."},
{term:"ATS",full:"Available to Ship",desc:"Disponible para envío."},
{term:"XSI",full:"Community Member Serious Incident",desc:"Incidente grave involucrando miembros de la comunidad."},
{term:"GSOC",full:"Global Security Operations Center",desc:"Centro Global de Operaciones de Seguridad."},
{term:"OTR",full:"On The Road",desc:"Incidentes vehiculares en ruta."},
{term:"ACES",full:"Amazon Customer Excellence System",desc:"Sistema de excelencia del cliente. Se divide en In Station y On Road."},
{term:"WFS",full:"Workforce Staffing",desc:"Dotación de personal. Gestiona contratación y fill rates."},
{term:"RCA",full:"Root Cause Analysis",desc:"Análisis de causa raíz. Se escribe cuando una métrica cruza su umbral."},
{term:"DEI",full:"Diversity, Equity and Inclusion",desc:"Diversidad, equidad e inclusión."},
{term:"CPS",full:"Cost Per Shipment",desc:"Coste por paquete entregado. Total CPS = Store + Milkrun + Fixed."},
{term:"SPR",full:"Shipments Per Route",desc:"Paquetes por ruta. Más es mejor eficiencia."},
{term:"D1S",full:"Day One Starts",desc:"Personas que empiezan su primer día de trabajo."},
{term:"LO",full:"Labor Order",desc:"Pedido de personal. Cuánta gente se solicitó."},
{term:"RLC",full:"Red Level Changes",desc:"Cambios de último momento en pedidos de personal."},
{term:"Fill Rate",full:"New Hire Fill Rate",desc:"% de posiciones cubiertas vs solicitadas. >100% = cubriste más de lo pedido."},
{term:"ASL",full:"Available Shift Labor",desc:"Mano de obra disponible por turno. Mide utilización del personal."},
{term:"ADTA",full:"Available Delivery Time Allocation",desc:"Tiempo de entrega disponible. >100% = usas más tiempo del planificado."},
{term:"FPY",full:"First Pass Yield",desc:"Calidad al primer intento en estación. Se mide en DPMO."},
{term:"Attainment",full:"Attainment",desc:"% de paquetes que AMZL gana para entregar vs oportunidades totales. LA métrica más importante."},
{term:"Linehaul",full:"Linehaul",desc:"Transporte de larga distancia entre centros logísticos (sortation centers, hubs)."},
{term:"Last Mile",full:"Last Mile",desc:"Último tramo de entrega desde la estación hasta la puerta del cliente."},
{term:"Milkrun",full:"Milkrun",desc:"Ruta multi-parada entre estaciones. Más ecológica y eficiente."},
{term:"Concession",full:"Concession",desc:"Compensación al cliente (reembolso o reemplazo) por fallo en entrega. Se mide en DPMO."},
{term:"Rescue",full:"Rescued Volume",desc:"Paquetes reasignados a otro conductor cuando el original no puede completar su ruta."},
{term:"Sidelined",full:"Sidelined Shipments",desc:"Paquetes retirados del flujo normal. No se entregan hoy, se reintentan mañana."},
{term:"Roster Compliance",full:"Roster Compliance",desc:"Mide si los DSPs cumplen con el planning de turnos y rutas asignadas."},
{term:"Flag",full:"Flag (Alerta)",desc:"Se genera cuando una métrica cruza su umbral/target. Requiere RCA y Action Item."},
{term:"Benchmark",full:"Benchmark CPS Urban",desc:"Coste de referencia urbano. Se compara vs CPS real para ver si somos más baratos o caros."},
{term:"Ageing",full:"Ageing Shipments",desc:"Paquetes atascados que llevan 3, 4, 5 o 6+ días sin entregarse."},
];

function openGlossary(){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('glossaryScreen').classList.add('active');
  document.getElementById('glossaryInput').value='';
  renderGlossary(glossary);
  setTimeout(()=>document.getElementById('glossaryInput').focus(),100);
}

function closeGlossary(){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('menuScreen').classList.add('active');
}

function filterGlossary(){
  const q=document.getElementById('glossaryInput').value.toLowerCase().trim();
  if(!q){renderGlossary(glossary);return;}
  const filtered=glossary.filter(g=>g.term.toLowerCase().includes(q)||g.full.toLowerCase().includes(q)||g.desc.toLowerCase().includes(q));
  renderGlossary(filtered);
}

function renderGlossary(items){
  const c=document.getElementById('glossaryList');
  if(!items.length){c.innerHTML='<div class="glossary-empty">No se encontró ningún término</div>';return;}
  c.innerHTML=items.map(g=>`<div class="glossary-item"><div class="gi-term">${g.term}</div><div class="gi-full">${g.full}</div><div class="gi-desc">${g.desc}</div></div>`).join('');
}

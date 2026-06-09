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
{term:"S2R",full:"Store to Route",desc:"Nodo donde el volumen del HUB se clasifica por Milk Run y se despacha a stores. El DSP recoge desde stores."},
{term:"Dispatch Sheet",full:"Dispatch Sheet / Wave Plan",desc:"Documento con el plan de oleadas de despacho para un nodo S2R. Se genera desde Route Planning."},
{term:"Wave Plan",full:"Wave Plan",desc:"Sinónimo de Dispatch Sheet. Plan de oleadas que indica qué volumen va a cada store/ruta."},
{term:"Route Planning",full:"Route Planning (herramienta)",desc:"Herramienta interna para planificar rutas y generar Dispatch Sheets."},
{term:"Stow",full:"Stow (Clasificación)",desc:"Proceso de clasificar el volumen del HUB por Milk Run. Debe completarse antes de generar Dispatch Sheets."},
{term:"DILO",full:"Day In the Life Of",desc:"Documento que describe la rutina diaria de un nodo. Define horarios clave como cuándo se completa el stow."},
{term:"GHOST Store",full:"GHOST Store (Tienda fantasma)",desc:"Store ficticia creada cuando no hay store real en una zona o cuando una store sale y no hay quién absorba su volumen. El DSP asume el volumen directamente."},
{term:"Store Rostering",full:"Store Rostering",desc:"Proceso donde las stores confirman vía HUB App si van a trabajar o no. Se revisa tras generar Dispatch Sheets."},
{term:"LMAQ",full:"Last Mile Account Quality",desc:"Equipo encargado de la calidad de cuentas de última milla. Recibe la transición del proceso de Dispatch Sheets."},
{term:"Mother DS",full:"Mother Delivery Station",desc:"Estación de entrega principal de la que dependen los nodos hub (ej: DMA4 es mother de EHM4)."},
{term:"Exclusive",full:"Exclusive Node",desc:"Nodo hub que opera exclusivamente para Amazon Hub, no comparte volumen con la DS madre."},
{term:"Shared",full:"Shared Node",desc:"Nodo que comparte volumen entre la DS madre y el hub."},
{term:"AM",full:"Account Manager",desc:"Persona responsable de gestionar la relación con los nodos/stores asignados."},
{term:"CIT",full:"CIT (Continuous Improvement Team)",desc:"Equipo de mejora continua que define procesos y DILOs."},
{term:"QR Code",full:"QR Code (Dispatch)",desc:"Código QR generado para cada Dispatch Sheet. El DSP lo escanea durante el load-out."},
{term:"Load-out",full:"Load-out",desc:"Proceso de carga de paquetes en la furgoneta del DSP antes de salir a ruta."},
{term:"ADV",full:"Average Daily Volume",desc:"Volumen diario promedio de paquetes procesados en un nodo o estación."},
{term:"OTR",full:"On The Road",desc:"Métricas e incidentes que ocurren en ruta (accidentes, infracciones, comportamiento del conductor)."},
{term:"UTR",full:"Under the Roof",desc:"Métricas y operaciones que ocurren dentro de la estación (stow, induct, sort)."},
{term:"ATROPS",full:"Adaptive Transportation Optimization Service",desc:"Servicio de optimización de transporte. Configura rutas, ship methods y ESMM."},
{term:"CPT",full:"Critical Pull Time",desc:"Hora límite para que un paquete sea procesado y cargado en el camión de salida."},
{term:"FC",full:"Fulfillment Center",desc:"Centro de cumplimiento donde se almacenan y preparan pedidos antes de envío."},
{term:"IXD",full:"Inbound Cross-Dock",desc:"Centro de recepción y redistribución de inventario entrante hacia FCs o DSs."},
{term:"SLAM",full:"Scan, Label, Apply, Manifest",desc:"Proceso de escaneo, etiquetado y manifiesto de paquetes antes del envío."},
{term:"DA",full:"Delivery Associate",desc:"Conductor/repartidor que entrega paquetes al cliente final."},
{term:"LDT",full:"Loaded Drive Time",desc:"Tiempo de conducción con carga. Mide eficiencia del conductor en ruta."},
{term:"SPORH",full:"Shipments Per On Road Hour",desc:"Paquetes despachados por hora en ruta. Métrica clave de productividad de entrega."},
{term:"FADS",full:"First Attempt Delivery Success",desc:"Éxito en el primer intento de entrega. Más alto = menos reintentos y costes."},
{term:"DNR",full:"Delivered Not Received",desc:"Tracking dice entregado pero el cliente no lo tiene. Genera concesión."},
{term:"RTS",full:"Return To Station",desc:"Paquetes que regresan a la estación sin ser entregados. Impacta attainment."},
{term:"PRNA",full:"Partial Route Not Attempted",desc:"Ruta parcialmente no intentada. El conductor no completó todas las paradas."},
{term:"FRNA",full:"Full Route Not Attempted",desc:"Ruta completa no intentada. El conductor no salió o devolvió toda la ruta."},
{term:"VaR",full:"Volume at Risk",desc:"Volumen en riesgo de no ser entregado por problemas de capacidad, clima o ejecución."},
{term:"OTD",full:"On Time Delivery",desc:"% de paquetes entregados dentro de la ventana prometida al cliente."},
{term:"MBR",full:"Monthly Business Review",desc:"Revisión mensual del negocio con métricas, tendencias y planes de acción."},
{term:"WBR",full:"Weekly Business Review",desc:"Revisión semanal del negocio. Más operativa y granular que el MBR."},
{term:"OP1",full:"Operational Plan 1",desc:"Plan operativo anual (primera ronda, ~agosto). Define presupuesto y metas del año siguiente."},
{term:"OP2",full:"Operational Plan 2",desc:"Plan operativo anual (segunda ronda, ~noviembre). Ajuste fino del OP1."},
{term:"FTE",full:"Full Time Equivalent",desc:"Equivalente a tiempo completo. Unidad para medir headcount normalizado."},
{term:"HC",full:"Headcount",desc:"Número de personas/posiciones en un equipo u organización."},
{term:"SOP",full:"Standard Operating Procedure",desc:"Procedimiento operativo estándar. Documento que define cómo ejecutar una tarea."},
{term:"ANDON",full:"Andon (Sistema de alerta)",desc:"Sistema para notificar problemas de calidad o proceso. Cualquiera puede 'tirar del Andon'."},
{term:"COE",full:"Correction of Errors",desc:"Documento post-mortem que analiza un fallo operativo y define acciones correctivas."},
{term:"PRFAQ",full:"Press Release + FAQ",desc:"Documento Working Backwards: comunicado de prensa ficticio + preguntas frecuentes."},
{term:"STL",full:"Single Threaded Leader",desc:"Líder dedicado 100% a un proyecto/programa sin distracciones."},
{term:"LP",full:"Leadership Principles",desc:"Los 16 principios de liderazgo de Amazon. Base de cultura y decisiones."},
{term:"GEMBA",full:"Gemba (Ir al lugar)",desc:"Término japonés: ir al lugar donde ocurre el trabajo para observar y entender."},
{term:"KAIZEN",full:"Kaizen (Mejora continua)",desc:"Filosofía de mejora continua. En Amazon se usa para proyectos de optimización."},
{term:"KPI",full:"Key Performance Indicator",desc:"Indicador clave de rendimiento que mide el éxito de un objetivo."},
{term:"OPEX",full:"Operational Expenditures",desc:"Gastos operativos recurrentes (personal, transporte, consumibles)."},
{term:"CAPEX",full:"Capital Expenditure",desc:"Inversión en activos fijos (equipos, infraestructura, vehículos)."},
{term:"SLA",full:"Service Level Agreement",desc:"Acuerdo de nivel de servicio. Define tiempos y calidad comprometidos."},
{term:"ESMM",full:"Enhanced Ship Method Model",desc:"Modelo de rutas configurado en ATROPS. Define la ruta del paquete desde FC hasta DS."},
{term:"MR",full:"Milk Run",desc:"Ruta de transporte multi-parada entre nodos. Más eficiente que envíos directos."},
{term:"DS",full:"Delivery Station",desc:"Estación de entrega. Último punto antes de que el paquete salga a ruta con el DA."},
{term:"NI",full:"New Intake",desc:"Volumen nuevo de paquetes que ingresa a la red logística en un período."},
{term:"OTIF",full:"On-Time In-Full",desc:"A tiempo y completo. Métrica combinada de puntualidad y completitud."},
{term:"FLEX",full:"Amazon Flex",desc:"Programa de conductores independientes que entregan con su propio vehículo."},
{term:"SSD",full:"Sub-Same Day Delivery",desc:"Entrega en menos de un día (horas). Programa de entrega ultra rápida."},
{term:"DILO",full:"Day In the Life Of",desc:"Documento que describe la rutina diaria de un nodo con horarios clave."},
{term:"AM",full:"Area Manager",desc:"Gerente de área. Responsable de operaciones en una zona o turno específico."},
{term:"OPS",full:"Operations / Order Product Sales",desc:"Operaciones. También puede referirse a ventas de producto por pedido."},
{term:"DPPH",full:"Deliveries Per Paid Hour",desc:"Entregas por hora pagada. Métrica de eficiencia de coste laboral."},
{term:"INR",full:"Item Not Received",desc:"Artículo no recibido. Reclamación del cliente por paquete no entregado."},
{term:"PHR",full:"Preference Honor Rate",desc:"% de veces que el conductor respetó la preferencia de entrega del cliente."},
{term:"LMCX",full:"Last Mile Customer Experience",desc:"Experiencia del cliente en última milla. Engloba métricas de calidad de entrega."},
{term:"Turing",full:"Turing (Sistema de Capacidad)",desc:"Cerebro de planificación de capacidad de Hub Delivery ES. Calcula cuántos paquetes puede recibir cada tienda cada día para 13 semanas. Owner: Alfonso."},
{term:"SPOZH",full:"Stops Per Operating Zone Hour",desc:"Paquetes procesados por hora de trabajo por tienda. Mide eficiencia. Input clave para calcular capacidad base en Turing (Cap = SPOZH × Hours × Growth)."},
{term:"CVP",full:"Constrained Volume Plan",desc:"Forecast de volumen con restricciones. Dice cuántos paquetes se ESPERA que lleguen a cada nodo cada día. Turing lo usa para ajustar capacidad."},
{term:"NSD",full:"Non-Scheduled Days",desc:"Días en que una tienda NO opera (vacaciones, festivos, cierre). Si tiene NSD, Turing le asigna 0 capacidad ese día."},
{term:"Glamdring",full:"Glamdring (NSD Calendar)",desc:"Sistema/hoja con ~500K filas que contiene el calendario NSD de TODAS las tiendas. Se descarga de QuickSight. Sin él, Turing asignaría paquetes a tiendas cerradas."},
{term:"Hard Cap",full:"Hard Cap (Límite fijo)",desc:"Límite de capacidad por nodo que NUNCA se puede superar, sin importar qué calculen las fórmulas. Decisión de negocio o restricción física."},
{term:"Growth Factor",full:"Growth Factor (Factor de crecimiento)",desc:"Multiplicador que permite a tiendas absorber gradualmente más volumen. 5% para Shared, 4% para Exclusive. Se aplica a la fórmula base."},
{term:"Nursery",full:"Nursery (Periodo de ramp-up)",desc:"Primera semana tras el launch de una tienda nueva. Recibe ADV medio de su tipo (Exclusive/Shared) con suelo de 40 paquetes."},
{term:"Heaviness",full:"Heaviness / Lightness",desc:"Factor de desviación del forecast SnOP vs histórico 4 semanas. Heaviness > 1 = se espera más volumen. Lightness < 1 = se espera menos. Ajusta la cap diaria."},
{term:"4wk Share",full:"4 Week Hub Share",desc:"% REAL de volumen de la DS que va por Hub Delivery en las últimas 4 semanas. Ej: 25% = de cada 100 pkg, 25 van por Hub. Objetivo: subirlo."},
{term:"Store Capacity",full:"Store Capacity (Hoja principal de Turing)",desc:"La hoja más importante de Turing (~5,240 filas). Calcula la capacidad de CADA tienda combinando SPOZH, ADV, growth, tenure, work rate, etc."},
{term:"CAP Upload",full:"CAP Upload (Output de Turing)",desc:"Hoja de salida de Turing con capacidad por tienda por día para 13 semanas (~3,651 filas). Se sube a Admiral. Alimenta el Bulk Upload."},
{term:"Admiral",full:"Admiral (Sistema de capacidades)",desc:"Sistema donde se cargan las capacidades finales de cada tienda. El Bulk Upload genera el archivo que se sube aquí vía TT."},
{term:"Work Rate",full:"Work Rate (Tasa de trabajo real)",desc:"% de tiendas que REALMENTE trabajaron cada día por nodo. Si un nodo tiene 100 tiendas pero solo 70 abren los martes, Work Rate = 70%."},
{term:"MTP",full:"MTP (Macro principal de Turing)",desc:"Macro que ejecuta el cálculo a 13 semanas. Genera Wk+13 output. Hay 3 versiones: MTP, MTP_store_cap, MTP_store_cap_adjusted2."},
{term:"MCO",full:"MCO (CSV del Bulk Upload)",desc:"Archivo CSV que se genera de la macro del Bulk y se adjunta al TT en River. Sin él, LMAQ no puede aprobar los cambios de capacidad."},
{term:"TT",full:"Trouble Ticket (SIM)",desc:"Ticket que se crea en River con type 'Supply Window Max Capacity Change'. Se adjunta el MCO y se programa para fecha de MAÑANA."},
{term:"Caravan",full:"Caravan (Plataforma de reporting)",desc:"Plataforma donde se publica el DBR diario. Se pega Volumen SnOP + nota con SPR. El equipo de liderazgo lo revisa cada mañana."},
{term:"Perfect Mile",full:"Perfect Mile (Dashboard de calidad)",desc:"Dashboard que mide calidad de entrega. Reporta con D-2 (2 días de retraso). Incluye Speed (VPS) y métricas por nodo."},
{term:"Commingling",full:"Commingling (Volumen mixto)",desc:"Volumen que combina paquetes de diferentes flujos/programas en la misma ruta. Se extrae junto al volumen total en el script DBR."},
{term:"Caravan",full:"Caravan (Plataforma de reporting)",desc:"Plataforma donde se publica el DBR diario. Se pega Volumen SnOP + nota con SPR con formato Veris Mod."},
{term:"SnOP",full:"Sales and Operations Planning",desc:"Plan de ventas y operaciones. Define el volumen previsto por nodo y semana. El target contra el que se mide la red. Turing lo usa para lightness/heaviness."},
{term:"Peak",full:"Peak (Periodo pico)",desc:"Periodos de alta demanda (Navidad, Prime Day). Max hours sube a 4h/6h, Max ADV sube a 5000. Factores peak = 1.05 para Urban y Rural."},
{term:"Tenure",full:"Tenure (Antigüedad de tienda)",desc:"Categorización por antigüedad del partner (días desde launch). Determina si aplica ramp-up, nursery, o capacidad completa."},
{term:"Evaluator",full:"Evaluator (Panel de control Turing)",desc:"Hoja de Turing con parámetros globales y validaciones. Se configuran factores peak, umbrales de ramp-up, etc. sin tocar fórmulas individuales."},
{term:"BH",full:"Bank Holidays (Festivos)",desc:"Festivos por zipcode: nacionales (Navidad), autonómicos (Sant Jordi), locales (fiestas de pueblo). Cada tienda puede tener festivos diferentes."},
{term:"Sort Code",full:"Sort Code (Código de ruta)",desc:"Código que mapea tienda → jurisdicción → ruta Milk Run. Ej: HUB_EQZ3_D. Solo aplica a tiendas Rurales/Exclusive."},
{term:"PWR%",full:"Planned Work Rate %",desc:"Porcentaje planificado de trabajo por nodo y día. Hoja de Turing que muestra el % esperado de tiendas operativas cada día de las próximas semanas."},
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
  c.innerHTML=items.map(g=>`<div class="glossary-item"><div style="display:flex;align-items:center;justify-content:space-between"><div class="gi-term">${g.term}</div><button onclick="pronounce('${g.full.replace(/'/g,"\\'")}')"
  style="background:none;border:none;font-size:1.2rem;cursor:pointer;padding:4px" aria-label="Pronunciar">🔊</button></div><div class="gi-full">${g.full}</div><div class="gi-desc">${g.desc}</div></div>`).join('');
}

function pronounce(text){
  if('speechSynthesis' in window){
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang='en-US';
    u.rate=0.9;
    speechSynthesis.speak(u);
  }
}

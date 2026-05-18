const podcastScript = [
{s:"a",t:"Bueno, bienvenido al equipo. Hoy te voy a explicar todo lo que necesitas saber sobre el Daily Business Review, el DBR, que es básicamente el reporte que revisamos cada mañana."},
{s:"b",t:"Perfecto, he visto que tiene muchas secciones y acrónimos. ¿Por dónde empezamos?"},
{s:"a",t:"Empecemos por lo básico. AMZL es Amazon Logistics, la red de última milla. Un HUB es un centro de despacho de paquetes. Y el DBR es la revisión diaria del negocio para la región EU, Europa."},
{s:"b",t:"¿Y qué es un Delivery Partner?"},
{s:"a",t:"Un DP es un socio de entrega. Puede ser un DSP, que es una empresa asociada que hace entregas para Amazon, o un driver de Flex. Los DSPs tienen flotas de furgonetas y conductores propios."},
{s:"b",t:"Vale, ¿y qué estructura tiene el reporte?"},
{s:"a",t:"El DBR tiene varias secciones: Agenda, Safety, Volume SnOP que es planificación de volumen, Attainment que es cumplimiento de objetivos, LMDX que es calidad de última milla, Volume at Risk, Finance, ACES In Station, ACES On Road, y WFS que es Workforce Staffing."},
{s:"b",t:"Vamos con Volume SnOP entonces, ¿qué métricas son las importantes ahí?"},
{s:"a",t:"SnOP significa Sales and Operations Planning. Las métricas clave son: OFD que es Out for Delivery, los paquetes que salen a reparto. New Intake que es el volumen nuevo que entra a la red. Y Cap Utilization que es el porcentaje de uso de capacidad de las estaciones."},
{s:"b",t:"¿Y qué es el Forecast?"},
{s:"a",t:"Fcst es Forecast, la previsión de volumen. Comparamos el volumen real contra el forecast de la semana anterior. Si dice New Intake vs Fcst w-1 es 1.39%, significa que entró un 1.39% más de lo previsto."},
{s:"b",t:"¿Qué pasa cuando una estación está muy llena?"},
{s:"a",t:"Cuando Cap Utilization supera el 98%, esa estación está en riesgo de saturación. Hay una métrica que cuenta cuántas estaciones están por encima del 98%. Si son muchas, hay problema."},
{s:"b",t:"Ahora explícame el Attainment, que parece ser la métrica más importante."},
{s:"a",t:"El Attainment es EL número. Es el porcentaje de paquetes que AMZL gana para entregar versus lo que el sistema ofrece como oportunidad. Si el attainment es 85%, significa que de cada 100 paquetes que podrían ir por nuestra red, ganamos 85."},
{s:"b",t:"¿Y por qué se pierden los otros 15?"},
{s:"a",t:"Se pierde por cuatro razones. Caps: no hay capacidad en la estación. PDD miss: no podemos cumplir la fecha de entrega prometida al cliente. Not feasible: no cubrimos esa zona geográfica. Y More expensive: somos más caros que otra opción de envío."},
{s:"b",t:"¿Qué es PANDA?"},
{s:"a",t:"PANDA es el sistema interno que calcula el Attainment. Tiene un numerador, que son los paquetes que ganamos, y un denominador, que es el total de oportunidades. Attainment es simplemente numerador dividido entre denominador."},
{s:"b",t:"¿Y las Slow Connections?"},
{s:"a",t:"SC o Slow Connections son conexiones lentas entre nodos de la red logística. Si un linehaul, que es el transporte de larga distancia, llega tarde al hub, eso genera una slow connection y perdemos attainment."},
{s:"b",t:"Vale, pasemos a calidad. ¿Qué es LMDX?"},
{s:"a",t:"LMDX es Last Mile Delivery Experience. Aquí medimos la calidad de la entrega. La métrica estrella es First Day Delivery Success: el porcentaje de paquetes entregados el primer día prometido. Debería estar por encima del 98%."},
{s:"b",t:"¿Y DPMO qué es?"},
{s:"a",t:"DPMO es Defects Per Million Opportunities. Es como medimos los fallos. Por ejemplo, Concession DPMO mide cuántas compensaciones damos al cliente por cada millón de paquetes. Menos es mejor."},
{s:"b",t:"¿Qué es NOV?"},
{s:"a",t:"NOV es Not on Van. Son paquetes que deberían haberse cargado en la furgoneta pero no se cargaron. Se mide en unidades absolutas y en DPMO. Es un fallo operativo de la estación."},
{s:"b",t:"¿Y los BPS?"},
{s:"a",t:"BPS son Basis Points, puntos base. 1 BPS es 0.01%. Se usa para medir el impacto en coste de los fallos de última milla. Si Last Mile bps Hub es 36, significa que el coste de fallos es 0.36% del valor."},
{s:"b",t:"¿Qué es DEA?"},
{s:"a",t:"DEA es Delivery Execution Attempt, la ventana planificada de entrega. Attempted in DEA mide qué porcentaje de paquetes se intentaron entregar dentro de su ventana. Si es 99.76%, casi todos se intentaron a tiempo."},
{s:"b",t:"Ahora Finance. ¿Qué es CPS?"},
{s:"a",t:"CPS es Cost Per Shipment, el coste por paquete. Se descompone en: Store Cost que es el coste de la estación, Milkrun Cost que son las rutas multi-parada, y Other Fixed Costs. Todo sumado da el Total CPS."},
{s:"b",t:"¿Y el Benchmark?"},
{s:"a",t:"El Benchmark es el coste de referencia urbano. Si nuestro CPS es 1.56 y el benchmark es 2.25, el Delta es negativo, o sea somos más baratos. Eso es bueno. Si fuera al revés, estaríamos perdiendo dinero."},
{s:"b",t:"¿Qué es ACES?"},
{s:"a",t:"ACES es Amazon Customer Excellence System. Se divide en In Station y On Road. In Station mide la operación dentro del hub: Ageing Shipments son paquetes atascados que llevan 3, 4, 5 o más días sin entregarse. On Time Dispatch mide si las furgonetas salen a tiempo."},
{s:"b",t:"¿Qué son ASL y ADTA?"},
{s:"a",t:"ASL es Available Shift Labor, mide qué porcentaje del personal disponible se está usando. ADTA es Available Delivery Time Allocation, mide el uso del tiempo de entrega disponible. Si ADTA está por encima del 100%, estás usando más tiempo del planificado."},
{s:"b",t:"¿Y On Road?"},
{s:"a",t:"On Road mide eficiencia en ruta. SPR es Shipments Per Route, cuántos paquetes por ruta. Más es mejor. Milkrun es una ruta multi-parada entre estaciones, más ecológica. Y Volume to be Rescued es cuando un conductor no puede terminar su ruta y hay que reasignar sus paquetes."},
{s:"b",t:"¿Y WFS, la parte de personal?"},
{s:"a",t:"WFS es Workforce Staffing. D1S es Day One Starts, la gente que empieza su primer día. Labor Order es cuánta gente pediste. Fill Rate es qué porcentaje cubriste. Si pediste 61 y empezaron 62, tu fill rate es 101%."},
{s:"b",t:"¿Qué es RLC?"},
{s:"a",t:"RLC es Red Level Changes, cambios de último momento en los pedidos de personal. A veces necesitas más gente de la que habías planeado. El fill rate se calcula contra el LO original y también contra LO más RLC."},
{s:"b",t:"¿Y Volume at Risk?"},
{s:"a",t:"Volume at Risk son paquetes en peligro de no entregarse. Se divide en Linehaul, que son problemas de transporte de larga distancia, y Ops Issue, problemas operativos. Sidelined Shipments son paquetes retirados del flujo que se reintentarán mañana."},
{s:"b",t:"¿Algo más que deba saber para el día a día?"},
{s:"a",t:"Sí. Cuando una métrica cruza su umbral, se genera un flag. Cada flag necesita un RCA, Root Cause Analysis, y un Action Item. Tu trabajo diario es revisar el DBR por la mañana, identificar flags, escribir el análisis de causa raíz, y crear acciones correctivas."},
{s:"b",t:"Genial, creo que con esto tengo una base sólida. Gracias por la explicación."},
{s:"a",t:"¡De nada! Recuerda: Attainment es el rey, LMDX es la calidad, y Finance es el coste. Si dominas esos tres, dominas el DBR."},
];

let podcastIdx=0,podcastPlaying=false,podcastUtterance=null;

function startPodcast(){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('podcastScreen').classList.add('active');
  podcastIdx=0;podcastPlaying=false;
  renderTranscript();
}

function endPodcast(){
  speechSynthesis.cancel();podcastPlaying=false;
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('menuScreen').classList.add('active');
}

function renderTranscript(){
  const c=document.getElementById('podcastTranscript');
  c.innerHTML=podcastScript.map((l,i)=>`<div class="podcast-bubble speaker-${l.s} ${i===podcastIdx?'active':''}" id="pb${i}"><div class="speaker-name">${l.s==='a'?'Mentor':'Tú'}</div>${l.t}</div>`).join('');
  const el=document.getElementById('pb'+podcastIdx);
  if(el)el.scrollIntoView({behavior:'smooth',block:'center'});
}

function podcastToggle(){
  if(podcastPlaying){speechSynthesis.cancel();podcastPlaying=false;updatePlayBtn();}
  else{podcastPlaying=true;updatePlayBtn();speakLine();}
}

function speakLine(){
  if(!podcastPlaying||podcastIdx>=podcastScript.length){podcastPlaying=false;updatePlayBtn();return;}
  renderTranscript();
  const line=podcastScript[podcastIdx];
  const u=new SpeechSynthesisUtterance(line.t);
  u.lang='es-ES';u.rate=1.05;
  const voices=speechSynthesis.getVoices();
  const esVoices=voices.filter(v=>v.lang.startsWith('es'));
  if(esVoices.length>=2){u.voice=line.s==='a'?esVoices[0]:esVoices[1];}
  else if(esVoices.length===1){u.voice=esVoices[0];u.pitch=line.s==='a'?1:1.3;}
  u.onend=()=>{podcastIdx++;speakLine();};
  document.getElementById('podcastStatus').textContent='▶ Reproduciendo';
  speechSynthesis.speak(u);
}

function podcastNext(){speechSynthesis.cancel();podcastIdx=Math.min(podcastIdx+1,podcastScript.length-1);if(podcastPlaying)speakLine();else renderTranscript();}
function podcastPrev(){speechSynthesis.cancel();podcastIdx=Math.max(podcastIdx-1,0);if(podcastPlaying)speakLine();else renderTranscript();}
function updatePlayBtn(){document.getElementById('btnPlay').textContent=podcastPlaying?'⏸':'▶';document.getElementById('podcastStatus').textContent=podcastPlaying?'▶ Reproduciendo':'⏸ Pausado';}

speechSynthesis.getVoices();

const CONNECTIONS = [
{cause:"Cap Utilization sube al 99%",effect:"Attainment Loss por Caps aumenta",explain:"Sin espacio en la estación, PANDA no puede asignar más paquetes → se pierden oportunidades."},
{cause:"Linehaul llega 3 horas tarde",effect:"Volume at Risk - Linehaul sube",explain:"Los paquetes no llegan a tiempo a la estación → no se pueden entregar en su PDD."},
{cause:"DSP no cumple el roster",effect:"On Time Dispatch baja",explain:"Menos conductores = menos rutas salen a tiempo → retrasos en cadena."},
{cause:"Ageing Shipments 6+ días sube",effect:"Concession DPMO aumenta",explain:"Paquetes con 6+ días superan el SLA → se generan concesiones automáticas al cliente."},
{cause:"New Intake supera el Forecast en +10%",effect:"Estaciones se saturan (Cap Util > 98%)",explain:"Más volumen del esperado sin capacidad extra → saturación → sidelines."},
{cause:"CPS del Hub sube de $1.56 a $2.00",effect:"Attainment Loss por 'More Expensive' sube",explain:"PANDA detecta que AMZL es más caro → asigna paquetes a otros carriers."},
{cause:"Slow Connections aumentan",effect:"Attainment Loss por PDD miss sube",explain:"Transporte lento entre nodos → paquetes no llegan a tiempo → no se cumple la fecha prometida."},
{cause:"NOV (Not on Van) sube",effect:"First Day Delivery Success baja",explain:"Paquetes no cargados = no salen a reparto = no se entregan el primer día."},
{cause:"Fill Rate WFS baja al 65%",effect:"Capacidad operativa se reduce",explain:"Menos personal → menos paquetes procesados → más sidelines y caps loss."},
{cause:"ADTA Utilisation supera 105%",effect:"Rescues aumentan",explain:"Conductores usan más tiempo del planificado → no terminan rutas → volumen se rescata."},
{cause:"Store Rostering no se revisa",effect:"DSP entrega en stores cerradas (fallo)",explain:"Sin actualizar el wave plan, el DSP va a stores que no trabajan → paquetes no entregados."},
{cause:"Escáner de estación se avería",effect:"NOV DPMO se dispara",explain:"Sin escaneo, paquetes no se registran como cargados aunque estén en la van."},
];

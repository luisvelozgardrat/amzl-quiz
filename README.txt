============================================================
PROYECTO: AMZL QUIZ — Amazon Hub Location DBR Trainer
============================================================

PROPIETARIO: Luis Veloz Gardrat (luisgard@)
ROL: Network Manager — Hub Delivery ES (Hub Location)
MANAGER: filipge@
INICIO ROL: Lunes 19 Mayo 2026

============================================================
UBICACIÓN DEL PROYECTO
============================================================

Código fuente: C:\Users\luisgard\Desktop\Proyectos\amzl-quiz\
GitHub: https://github.com/luisvelozgardrat/amzl-quiz
Live URL: https://luisvelozgardrat.github.io/amzl-quiz/

============================================================
ARCHIVOS DEL PROYECTO
============================================================

index.html      — App completa (HTML + CSS inline), estilo Duolingo premium
questions.js    — 110+ preguntas con campo "explain" en 12 categorías
game.js         — Lógica: 4 modos juego, SRS, XP, niveles, confetti, explicaciones
nodes.js        — 47 nodos activos de la red ES con coordenadas
nodemap.js      — Mapa interactivo con Leaflet (zoom, pan, dark tiles)
sop.js          — SOP interactivo con checklist persistente
scenarios.js    — Escenarios reales del DBR
connections.js  — Juego de causa-efecto entre métricas
glossary.js     — Glosario buscable
podcast.js      — Podcast simulado (dos personas explicando)
achievements.js — Sistema de logros
auth.js         — Login simple
sw.js           — Service Worker (PWA)
logo.png        — Logo Amazon Hub (blanco sobre fondo oscuro)

============================================================
ESTADO ACTUAL (Mayo 2026)
============================================================

✅ COMPLETADO:
- App gamificada con 4 modos (Arcade, Supervivencia, Estudio, Blitz)
- 110+ preguntas con explicaciones contextuales en 12 categorías
- Sistema SRS (preguntas falladas se repiten)
- Panel de explicación slide-up tras cada respuesta
- Mapa de 47 nodos con Leaflet (zoom, pan, info panel)
- SOP interactivo: "Cruce de Análisis de Volumen Día +1"
- Glosario, Logros, Escenarios, Conexiones, Podcast
- Tema claro/oscuro, login, PWA
- Desplegado en GitHub Pages

🔧 PENDIENTE / MEJORAS FUTURAS:
- Corregir coordenadas aproximadas de nodos cuando Luis confirme ubicaciones reales
- Agregar más SOPs conforme aprenda nuevos procesos
- Agregar preguntas nuevas: Drops, SPR, UTR, OCAMI, DNR, FDDS
- Mejorar estética si Luis lo pide (ya pasó por v1 oscura → v2 blanca → v3 Duolingo)
- Quiz geográfico: "¿Dónde está este nodo?" sobre el mapa

============================================================
CONTEXTO DEL ROL (para entender las preguntas)
============================================================

- AMZL = Amazon Logistics (última milla)
- Hub = Centro de despacho para Delivery Partners
- DBR = Daily Business Review (reporte diario que revisa cada mañana)
- El rol gestiona métricas de: Volume SnOP, Attainment, LMDX/Quality, 
  Volume at Risk, Finance, ACES, WFS, Safety
- Attainment = % de paquetes que AMZL "gana" vs otros carriers
- CPS = Cost Per Shipment (coste por paquete)
- 47 nodos activos en España (D=Delivery Station, O=Hub)

============================================================
SOP: BULK UPLOAD — PROCESO REAL (actualizado con lo aprendido)
============================================================

FIRST RUN (12:00h):
1. Alguien del equipo sube las CAPS (no es tu tarea, las coges de ahí)
2. Abrir archivo Bulk vacío del día siguiente
3. Meter CAPS del día siguiente (del archivo que subió el compañero)
4. Meter Glamdring (NSD Dashboard de QuickSight)
5. Meter reporte SF (Salesforce tiendas activas)
6. Meter 24H Forecast (QuickSight)
7. ⚠️ FILTRAR CEROS: Ctrl+Mayús+L → quitar filas con 0
8. Pegar SIEMPRE como VALORES y SIN encabezados
9. Verificar fecha = mañana
10. Revisar parámetros (24H Adjustment, Min/Max ADV, Flex Up <15%)
11. Subir a CAPS (sin crear TT en el first run)

NSD SLACK (15:00h):
1. Canal: nsd-audits-es
2. Comando: /export [fecha-3dias] [fecha-mañana] (rango de 3 días)
3. Esperar que cargue, descargar archivo
4. Copiar y pegar el archivo descargado en el Bulk
5. Ejecutar script: C:\Users\luisgard\amazon.com\Hub Delivery ES - Documentos\Network & Planning\Python\Rostering\NSDslackv2

SEGUNDO RUN (con TT):
- Mismo proceso + crear TT en River para LMAQ
- Link: https://river-iad.amazon.com/?org=hub_delivery
- Adjuntar MCO en el TT

============================================================
LINKS IMPORTANTES
============================================================

NSD Dashboard: https://us-east-1.quicksight.aws.amazon.com/sn/account/amzlbiaquicksight/dashboards/5bcd91e5-3
Salesforce: https://accesspoints.lightning.force.com/lightning/r/Report/00Oat00000558UOEAY/view
24H Forecast: https://us-east-1.quicksight.aws.amazon.com/sn/account/amzlbiaquicksight/dashboards/3ddfdbb0-5
River (TT): https://river-iad.amazon.com/?org=hub_delivery
Bulk Uploads: C:\Users\luisgard\amazon.com\Hub Delivery ES - Network & Planning\Network\1. SnOP\7. Bulk Uploads CAPS
Script NSD: C:\Users\luisgard\amazon.com\Hub Delivery ES - Documentos\Network & Planning\Python\Rostering\NSDslackv2

============================================================
47 NODOS ACTIVOS (Mayo 2026)
============================================================

DS (Delivery Stations): DCT9, DQB9, DMA3, DQV6, DAS1, DCT4, DCT7, DCZ3, 
DGA2, DQA4, DQA3, DQV2, DCZ4, DQM5, DQB6, DGA1, DZG2, DQB5, DMZ2, 
DQB2, DQL2, DIC1, DQA8, DMA4, DMA6, DQV8, DMZ4, DQA7, DGP1, DQE2

Hubs: OCM2, OCM4, OCB4, OCN1, OQV7, OCL4, OCL5, OCL2, OML1, OQA3, 
OQA6, OGA5, OQA4, OCM1, OCN2, OCL3, ORI2

============================================================
PARA RETOMAR
============================================================

Para continuar este proyecto en un nuevo chat, pega esto:

"Abre C:\Users\luisgard\Desktop\Proyectos\amzl-quiz\README.txt 
y lee el contexto completo para retomar el proyecto AMZL Quiz."

============================================================

// Auth - credentials
const VALID_USERS = [
  {user:'luisgard@amazon.com', pass:'hub2026'},
  {user:'filipge@amazon.com', pass:'hub2026'}
];

// Check if already logged in
(function(){
  if(localStorage.getItem('hubTrainerAuth')==='true'){
    document.getElementById('loginScreen').style.display='none';
    document.getElementById('splashScreen').style.display='none';
    document.getElementById('menuScreen').classList.add('active');
    setTimeout(()=>showToast('👋','¡De vuelta! Sigue entrenando.'),500);
  }
})();

function doLogin(){
  const user=document.getElementById('loginUser').value.trim().toLowerCase();
  const pass=document.getElementById('loginPass').value;
  const err=document.getElementById('loginError');
  const match=VALID_USERS.find(u=>u.user===user&&u.pass===pass);
  if(match){
    err.textContent='';
    localStorage.setItem('hubTrainerAuth','true');
    // Hide login, show splash
    document.getElementById('loginScreen').style.display='none';
    document.getElementById('splashScreen').style.display='flex';
    // After splash, show menu
    setTimeout(()=>{
      document.getElementById('splashScreen').style.display='none';
      document.getElementById('menuScreen').classList.add('active');
      setTimeout(()=>showToast('🚀','¡Bienvenido! Hoy es un gran día para aprender.'),400);
      setTimeout(()=>showOnboarding(),1000);
    },2200);
  } else {
    err.textContent='Usuario o contraseña incorrectos';
    document.getElementById('loginPass').value='';
  }
}

// Enter key support
document.addEventListener('keydown',e=>{
  if(e.key==='Enter' && document.getElementById('loginScreen').style.display!=='none'){
    doLogin();
  }
});

function showToast(icon,msg){
  const t=document.getElementById('toast');
  t.querySelector('.toast-icon').textContent=icon;
  t.querySelector('.toast-msg').textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3500);
}

// === ONBOARDING ===
const OB_STEPS=[
  {icon:'🎮',title:'Aprende jugando',desc:'4 modos de juego para dominar las métricas del DBR: Arcade, Supervivencia, Blitz y Estudio.'},
  {icon:'🧠',title:'Escenarios reales',desc:'Practica con datos reales del DBR. Decide qué acción tomar como si fuera tu primer día.'},
  {icon:'🏆',title:'Desbloquea logros',desc:'Gana XP, sube de nivel y desbloquea achievements. Tu progreso se guarda automáticamente.'}
];
let obStep=0;

function showOnboarding(){
  if(localStorage.getItem('hubOnboardingDone')) return;
  document.getElementById('onboarding').style.display='flex';
  obStep=0;
  renderOBStep();
}

function renderOBStep(){
  const s=OB_STEPS[obStep];
  document.getElementById('obIcon').textContent=s.icon;
  document.getElementById('obTitle').textContent=s.title;
  document.getElementById('obDesc').textContent=s.desc;
  document.getElementById('obDots').innerHTML=OB_STEPS.map((_,i)=>`<div class="onboarding-dot ${i===obStep?'active':''}"></div>`).join('');
  document.getElementById('obBtn').textContent=obStep===OB_STEPS.length-1?'¡Empezar!':'Siguiente';
}

function nextOnboarding(){
  obStep++;
  if(obStep>=OB_STEPS.length){
    document.getElementById('onboarding').style.display='none';
    localStorage.setItem('hubOnboardingDone','true');
  } else { renderOBStep(); }
}

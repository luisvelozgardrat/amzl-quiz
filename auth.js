// Auth - credentials
const VALID_USER = 'luisgard@amazon.com';
const VALID_PASS = 'hub2025';

// Check if already logged in
(function(){
  if(localStorage.getItem('hubTrainerAuth')==='true'){
    document.getElementById('loginScreen').style.display='none';
    document.getElementById('menuScreen').classList.add('active');
    setTimeout(()=>showToast('👋','¡De vuelta! Sigue entrenando.'),500);
  }
})();

function doLogin(){
  const user=document.getElementById('loginUser').value.trim().toLowerCase();
  const pass=document.getElementById('loginPass').value;
  const err=document.getElementById('loginError');
  if(user===VALID_USER && pass===VALID_PASS){
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

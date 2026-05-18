const ACHIEVEMENTS = [
  {id:'first_blood',icon:'🎯',name:'Primera Sangre',desc:'Responde tu primera pregunta',check:s=>s.totalAnswered>=1},
  {id:'streak_3',icon:'🔥',name:'En Racha',desc:'Racha de 3 días seguidos',check:s=>s.dailyStreak>=3},
  {id:'streak_7',icon:'🔥',name:'Semana Perfecta',desc:'Racha de 7 días seguidos',check:s=>s.dailyStreak>=7},
  {id:'streak_14',icon:'💎',name:'Imparable',desc:'Racha de 14 días seguidos',check:s=>s.dailyStreak>=14},
  {id:'ans_50',icon:'📝',name:'Estudiante',desc:'Responde 50 preguntas',check:s=>s.totalAnswered>=50},
  {id:'ans_200',icon:'📚',name:'Dedicado',desc:'Responde 200 preguntas',check:s=>s.totalAnswered>=200},
  {id:'ans_500',icon:'🧠',name:'Erudito',desc:'Responde 500 preguntas',check:s=>s.totalAnswered>=500},
  {id:'acc_80',icon:'🎖️',name:'Precisión',desc:'Alcanza 80% de acierto global',check:s=>s.totalAnswered>=20&&(s.totalCorrect/s.totalAnswered)>=0.8},
  {id:'acc_95',icon:'👑',name:'Maestro',desc:'Alcanza 95% de acierto global',check:s=>s.totalAnswered>=30&&(s.totalCorrect/s.totalAnswered)>=0.95},
  {id:'level_5',icon:'⭐',name:'Nivel 5',desc:'Alcanza el nivel 5',check:s=>s.level>=5},
  {id:'level_10',icon:'🌟',name:'Nivel 10',desc:'Alcanza el nivel 10',check:s=>s.level>=10},
  {id:'cat_master',icon:'🏆',name:'Especialista',desc:'90%+ acierto en una categoría (mín 10 preguntas)',check:s=>{return Object.values(s.catStats).some(c=>c.total>=10&&(c.correct/c.total)>=0.9);}},
  {id:'all_cats',icon:'🌐',name:'Generalista',desc:'Juega en todas las categorías',check:s=>Object.keys(s.catStats).length>=10},
  {id:'daily_goal',icon:'✅',name:'Meta Cumplida',desc:'Completa tu meta diaria',check:s=>s.dailyDone>=s.dailyGoal},
  {id:'survivor',icon:'💀',name:'Superviviente',desc:'Responde 20+ en modo Supervivencia sin morir',check:s=>s.bestSurvival>=20},
];

function checkAchievements(){
  let newUnlocks=[];
  ACHIEVEMENTS.forEach(a=>{
    if(!state.achievements.includes(a.id) && a.check(state)){
      state.achievements.push(a.id);
      newUnlocks.push(a);
    }
  });
  if(newUnlocks.length>0){
    save();
    newUnlocks.forEach((a,i)=>{
      setTimeout(()=>showToast(a.icon,`¡Logro desbloqueado: ${a.name}!`),i*1500+400);
    });
  }
}

function openAchievements(){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('achievementsScreen').classList.add('active');
  renderAchievements();
}

function closeAchievements(){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('menuScreen').classList.add('active');
}

function renderAchievements(){
  const grid=document.getElementById('achGrid');
  const unlocked=state.achievements.length;
  document.getElementById('achCounter').textContent=`${unlocked} / ${ACHIEVEMENTS.length} desbloqueados`;
  grid.innerHTML=ACHIEVEMENTS.map(a=>{
    const isUnlocked=state.achievements.includes(a.id);
    return `<div class="ach-card ${isUnlocked?'unlocked':'locked'}">
      <div class="ach-icon">${isUnlocked?a.icon:'🔒'}</div>
      <div class="ach-name">${a.name}</div>
      <div class="ach-desc">${a.desc}</div>
    </div>`;
  }).join('');
  renderWeeklyChart();
}

function renderWeeklyChart(){
  const container=document.getElementById('weeklyBars');
  const days=['L','M','X','J','V','S','D'];
  const today=new Date();
  let bars=[];
  for(let i=6;i>=0;i--){
    const d=new Date(today); d.setDate(d.getDate()-i);
    const dateStr=d.toISOString().slice(0,10);
    const log=state.weeklyLog.find(l=>l.date===dateStr);
    const count=log?log.answered:0;
    const dayIdx=d.getDay()===0?6:d.getDay()-1;
    bars.push({label:days[dayIdx],count});
  }
  const max=Math.max(...bars.map(b=>b.count),1);
  container.innerHTML=bars.map(b=>{
    const h=Math.max((b.count/max)*100,4);
    return `<div class="weekly-bar-col"><div class="weekly-bar-track"><div class="weekly-bar" style="height:${h}%"></div></div><div class="weekly-bar-label">${b.label}</div></div>`;
  }).join('');
}

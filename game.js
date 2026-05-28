// === STATE ===
let state = JSON.parse(localStorage.getItem('amzlQuiz')) || {
  xp: 0, level: 1, streak: 0, bestStreak: 0,
  totalCorrect: 0, totalAnswered: 0,
  catStats: {}, wrongQueue: [],
  dailyStreak: 0, lastPlayDate: null, dailyGoal: 10, dailyDone: 0,
  weeklyLog: [], achievements: [], bestSurvival: 0
};

let game = { mode:'', questions:[], idx:0, score:0, lives:3, timer:null, timeLeft:0, lastMode:'' };
let selectedCats = new Set();
let studyFlipped = false;
let isMuted=localStorage.getItem('hubMuted')==='true';

// === INIT ===
function init() {
  checkDailyStreak();
  renderCatFilter();
  updateMenuStats();
  renderWeakness();
}

function save() {
  localStorage.setItem('amzlQuiz', JSON.stringify(state));
}

// === DAILY STREAK ===
function getToday(){ return new Date().toISOString().slice(0,10); }

function getDailyQuestion(){
  const today=getToday();
  const seed=[...today].reduce((a,c)=>a+c.charCodeAt(0),0);
  return QUESTIONS[seed % QUESTIONS.length];
}

function checkDailyStreak(){
  const today = getToday();
  if(state.lastPlayDate === today) return;
  const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
  if(state.lastPlayDate === yesterday){
    // consecutive day - streak continues
  } else if(state.lastPlayDate && state.lastPlayDate !== today){
    // missed a day - reset streak
    state.dailyStreak = 0;
  }
  state.dailyDone = 0;
  save();
  // Show daily question hint
  const dq=getDailyQuestion();
  setTimeout(()=>showToast('💡','Pregunta del día: '+dq.q.substring(0,40)+'...'),1500);
}

function markDayPlayed(){
  const today = getToday();
  if(state.lastPlayDate !== today){
    state.dailyStreak++;
    state.lastPlayDate = today;
    // Log to weekly
    state.weeklyLog.push({date:today, answered:0, correct:0});
    if(state.weeklyLog.length > 7) state.weeklyLog.shift();
    save();
    if(state.dailyStreak > 1){
      setTimeout(()=>showToast('🔥',`¡Racha de ${state.dailyStreak} días seguidos!`),600);
    }
  }
}

function addDailyProgress(){
  state.dailyDone++;
  const todayLog = state.weeklyLog.find(l=>l.date===getToday());
  if(todayLog) todayLog.answered++;
  if(state.dailyDone===state.dailyGoal){
    setTimeout(()=>{showToast('🎉','¡Meta diaria completada!');playSound('levelup');fireConfetti();},500);
  }
  save();
}

// === XP & LEVEL ===
function xpForLevel(lvl) { return lvl * 120; }

function addXP(amount) {
  state.xp += amount;
  const prevLevel=state.level;
  while (state.xp >= xpForLevel(state.level)) {
    state.xp -= xpForLevel(state.level);
    state.level++;
  }
  if(state.level>prevLevel) playSound('levelup');
  save();
}

function updateMenuStats() {
  document.getElementById('levelBadge').textContent = `NIVEL ${state.level}`;
  document.getElementById('xpBar').style.width = `${(state.xp / xpForLevel(state.level)) * 100}%`;
  document.getElementById('statXP').textContent = state.xp + (state.level - 1) * 120;
  document.getElementById('statStreak').textContent = state.dailyStreak || state.streak;
  document.getElementById('statAccuracy').textContent = state.totalAnswered > 0
    ? Math.round((state.totalCorrect / state.totalAnswered) * 100) + '%' : '-';
  // Daily goal bar
  const goalPct = Math.min((state.dailyDone / state.dailyGoal) * 100, 100);
  const goalBar = document.getElementById('dailyGoalBar');
  const goalText = document.getElementById('dailyGoalText');
  if(goalBar) goalBar.style.width = goalPct + '%';
  if(goalText) goalText.textContent = `${state.dailyDone}/${state.dailyGoal} hoy`;
  const streakBadge = document.getElementById('dailyStreakBadge');
  if(streakBadge) streakBadge.textContent = `🔥 ${state.dailyStreak} días`;
}

// === WEAKNESS DASHBOARD ===
function renderWeakness() {
  const section = document.getElementById('weaknessSection');
  const cats = Object.entries(state.catStats).filter(([,v]) => v.total >= 3);
  if (cats.length === 0) { section.innerHTML = ''; return; }

  cats.sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));
  const top5 = cats.slice(0, 5);

  section.innerHTML = `
    <div style="margin-top:16px;padding:0 20px 20px;background:var(--card);border:1.5px solid var(--border);border-radius:20px;box-shadow:0 4px 20px rgba(0,0,0,.04)">
      <div class="collapsible-header" onclick="toggleCollapsible(this)">
        <span class="col-title">Tu dominio por categoría</span>
        <span class="col-chevron">▼</span>
      </div>
      <div class="collapsible-body">
        ${top5.map(([cat, data]) => {
          const pct = Math.round((data.correct / data.total) * 100);
          const color = pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)';
          return `<div class="weakness-bar">
            <span class="wlabel">${cat}</span>
            <div class="wtrack"><div class="wfill" style="width:${pct}%;background:${color}"></div></div>
            <span class="wpct">${pct}%</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

// === CATEGORY FILTER ===
function renderCatFilter() {
  const cats = [...new Set(QUESTIONS.map(q => q.cat))];
  const container = document.getElementById('catFilter');
  container.innerHTML = cats.map(c =>
    `<div class="cat-chip active" onclick="toggleCat(this,'${c}')">${c}</div>`
  ).join('');
  cats.forEach(c => selectedCats.add(c));
}

function toggleCat(el, cat) {
  if (selectedCats.has(cat)) {
    selectedCats.delete(cat);
    el.classList.remove('active');
  } else {
    selectedCats.add(cat);
    el.classList.add('active');
  }
}

function getFilteredQuestions() {
  return QUESTIONS.filter(q => selectedCats.has(q.cat));
}

// === SCREEN MANAGEMENT ===
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showMenu() {
  updateMenuStats();
  renderWeakness();
  showScreen('menuScreen');
}

// === START GAME ===
function startGame(mode) {
  const pool = getFilteredQuestions();
  if (pool.length < 4) { alert('Selecciona más categorías (mínimo 4 preguntas)'); return; }

  game.mode = mode;
  game.lastMode = mode;
  game.score = 0;
  game.idx = 0;
  game.lives = 3;

  let shuffled = shuffle([...pool]);

  // SRS: inject wrong questions from previous sessions at the front
  if (state.wrongQueue.length > 0) {
    const wrongOnes = state.wrongQueue
      .map(qText => QUESTIONS.find(q => q.q === qText))
      .filter(Boolean)
      .slice(0, 5);
    shuffled = [...shuffle(wrongOnes), ...shuffled];
    // Remove duplicates
    const seen = new Set();
    shuffled = shuffled.filter(q => { if (seen.has(q.q)) return false; seen.add(q.q); return true; });
  }

  if (mode === 'arcade') {
    game.questions = shuffled.slice(0, 20);
    game.timeLeft = 0;
    showScreen('gameScreen');
    updateGameUI();
    startTimer('count-up');
  } else if (mode === 'survival') {
    game.questions = shuffled;
    game.timeLeft = 0;
    showScreen('gameScreen');
    updateGameUI();
    startTimer('count-up');
  } else if (mode === 'blitz') {
    game.questions = shuffled;
    game.timeLeft = 60;
    showScreen('gameScreen');
    updateGameUI();
    startTimer('countdown');
  } else if (mode === 'study') {
    game.questions = shuffled.slice(0, Math.min(20, shuffled.length));
    studyFlipped = false;
    showScreen('studyScreen');
    showStudyCard();
  }
}

// === TIMER ===
function startTimer(type) {
  clearInterval(game.timer);
  if (type === 'countdown') {
    updateTimerDisplay();
    game.timer = setInterval(() => {
      game.timeLeft--;
      updateTimerDisplay();
      if (game.timeLeft <= 0) { clearInterval(game.timer); endGame(); }
    }, 1000);
  } else {
    game.timeLeft = 0;
    updateTimerDisplay();
    game.timer = setInterval(() => { game.timeLeft++; updateTimerDisplay(); }, 1000);
  }
}

function updateTimerDisplay() {
  const m = Math.floor(Math.abs(game.timeLeft) / 60);
  const s = Math.abs(game.timeLeft) % 60;
  document.getElementById('timerDisplay').textContent = `⏱ ${m}:${s.toString().padStart(2,'0')}`;
}

// === GAME UI ===
function updateGameUI() {
  const q = game.questions[game.idx];
  document.getElementById('qCat').textContent = q.cat;
  document.getElementById('qText').textContent = q.q;
  document.getElementById('scoreDisplay').textContent = `⭐ ${game.score}`;

  const livesEl = document.getElementById('livesDisplay');
  livesEl.textContent = game.mode === 'survival' ? '❤️'.repeat(game.lives) : '';

  const pct = game.mode === 'blitz' ? 0 : ((game.idx) / game.questions.length) * 100;
  document.getElementById('gameProgress').style.width = `${pct}%`;

  const opts = shuffle([...q.opts]);
  const container = document.getElementById('optionsContainer');
  container.innerHTML = opts.map((o, i) =>
    `<button class="opt-btn" data-idx="${i}">${o}</button>`
  ).join('');
  container.querySelectorAll('.opt-btn').forEach(btn => {
    btn.addEventListener('click', () => selectAnswer(btn, btn.textContent));
  });
}

function selectAnswer(btn, answer) {
  if (document.querySelector('.opt-btn.disabled')) return;
  const q = game.questions[game.idx];
  const correct = answer === q.a;
  const buttons = document.querySelectorAll('.opt-btn');

  buttons.forEach(b => {
    b.classList.add('disabled');
    if (b.textContent === q.a) b.classList.add('correct');
  });

  if (correct) {
    game.score++;
    state.streak++;
    state.totalCorrect++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    btn.classList.add('correct');
    vibrate(30);
    playSound('correct');
    showFloatingXP(10);
    // Remove from wrong queue if was there
    state.wrongQueue = state.wrongQueue.filter(x => x !== q.q);
    // Confetti on streaks of 5
    if (state.streak % 5 === 0) fireConfetti();
  } else {
    btn.classList.add('wrong');
    state.streak = 0;
    if (game.mode === 'survival') game.lives--;
    vibrate([50, 30, 50]);
    playSound('wrong');
    // SRS: add to wrong queue
    if (!state.wrongQueue.includes(q.q)) {
      state.wrongQueue.push(q.q);
      if (state.wrongQueue.length > 20) state.wrongQueue.shift();
    }
  }

  state.totalAnswered++;
  markDayPlayed();
  addDailyProgress();
  if (!state.catStats[q.cat]) state.catStats[q.cat] = { correct: 0, total: 0 };
  state.catStats[q.cat].total++;
  if (correct) {
    state.catStats[q.cat].correct++;
    const todayLog = state.weeklyLog.find(l=>l.date===getToday());
    if(todayLog) todayLog.correct++;
  }
  save();
  checkAchievements();
  showExplanation(q, correct);
}

// === EXPLANATION PANEL ===
function showExplanation(q, correct) {
  const panel = document.getElementById('explanationPanel');
  panel.className = correct ? 'explain-panel active' : 'explain-panel active explain-wrong-panel';
  const icon = correct ? '✅' : '❌';
  const title = correct ? '¡Bien hecho!' : 'Respuesta incorrecta';
  const streakHTML = (correct && state.streak > 1) ? `<span class="streak-badge">🔥 ${state.streak}</span>` : '';
  const explain = q.explain || q.a;

  panel.innerHTML = `
    <div class="explain-header ${correct ? 'explain-correct' : 'explain-wrong'}">
      <span class="explain-icon">${icon}</span>
      <span class="explain-title">${title}</span>
      ${streakHTML}
    </div>
    <div class="explain-body">
      <div class="explain-answer">✓ ${q.a}</div>
      <div class="explain-detail">${explain}</div>
    </div>
    <button class="btn-continue" onclick="continueGame()">CONTINUAR</button>
  `;
  panel.scrollIntoView({behavior:'smooth',block:'end'});
}

function continueGame() {
  const panel = document.getElementById('explanationPanel');
  panel.className = 'explain-panel';
  panel.innerHTML = '';

  if (game.mode === 'survival' && game.lives <= 0) { endGame(); return; }
  game.idx++;
  if (game.mode === 'blitz') {
    if (game.idx >= game.questions.length) game.idx = 0;
    updateGameUI();
  } else if (game.idx >= game.questions.length) {
    endGame();
  } else {
    updateGameUI();
  }
}

// === FEEDBACK ===
function vibrate(pattern) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

// Audio feedback
let audioCtx=null;
function getAudioCtx(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();return audioCtx;}

function playSound(type){
  if(isMuted) return;
  try{
    const ctx=getAudioCtx();
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);
    gain.gain.value=0.12;
    if(type==='correct'){osc.frequency.value=880;osc.type='sine';gain.gain.setValueAtTime(0.12,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.2);osc.start();osc.stop(ctx.currentTime+0.2);}
    else if(type==='wrong'){osc.frequency.value=220;osc.type='square';gain.gain.setValueAtTime(0.08,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.3);osc.start();osc.stop(ctx.currentTime+0.3);}
    else if(type==='levelup'){osc.frequency.value=523;osc.type='sine';gain.gain.setValueAtTime(0.1,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.4);osc.start();setTimeout(()=>{const o2=ctx.createOscillator();const g2=ctx.createGain();o2.connect(g2);g2.connect(ctx.destination);o2.frequency.value=784;o2.type='sine';g2.gain.setValueAtTime(0.1,ctx.currentTime);g2.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.3);o2.start();o2.stop(ctx.currentTime+0.3);},150);osc.stop(ctx.currentTime+0.15);}
  }catch(e){}
}

function fireConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#00a8e1', '#c6985e', '#34a853', '#ea4335', '#f59e0b', '#1a2b49'];
  let html = '';
  for (let i = 0; i < 40; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const size = 6 + Math.random() * 6;
    html += `<div class="confetti-piece" style="left:${left}%;background:${color};width:${size}px;height:${size}px;animation-delay:${delay}s"></div>`;
  }
  container.innerHTML = html;
  setTimeout(() => { container.innerHTML = ''; }, 3000);
}

// === STUDY MODE ===
function showStudyCard() {
  const q = game.questions[game.idx];
  document.getElementById('flashLabel').textContent = 'Pregunta';
  document.getElementById('flashText').textContent = q.q;
  document.getElementById('flashcard').classList.remove('flipped');
  document.getElementById('studyProgress').textContent = `${game.idx + 1} / ${game.questions.length}`;
  document.getElementById('studyProgressBar').style.width = `${(game.idx / game.questions.length) * 100}%`;
  studyFlipped = false;
}

function flipCard() {
  if (studyFlipped) return;
  studyFlipped = true;
  const q = game.questions[game.idx];
  const explain = q.explain || q.a;
  document.getElementById('flashLabel').textContent = 'Respuesta';
  document.getElementById('flashText').innerHTML = `<strong>${q.a}</strong><br><br><span style="font-size:.82rem;color:var(--muted);font-weight:400">${explain}</span>`;
  document.getElementById('flashcard').classList.add('flipped');
}

function studyNext(knew) {
  const q = game.questions[game.idx];
  if (knew) {
    state.streak++;
    addXP(5);
    state.wrongQueue = state.wrongQueue.filter(x => x !== q.q);
  } else {
    state.streak = 0;
    if (!state.wrongQueue.includes(q.q)) {
      state.wrongQueue.push(q.q);
      if (state.wrongQueue.length > 20) state.wrongQueue.shift();
    }
  }
  save();

  game.idx++;
  if (game.idx >= game.questions.length) {
    endGame();
  } else {
    showStudyCard();
  }
}

// === END GAME ===
function endGame() {
  clearInterval(game.timer);
  document.getElementById('explanationPanel').classList.remove('active');

  let xpEarned = 0;
  if (game.mode === 'study') {
    xpEarned = game.idx * 5;
  } else {
    xpEarned = game.score * 10;
    if (game.mode === 'blitz') xpEarned = game.score * 15;
    if (game.mode === 'survival') xpEarned += game.idx * 2;
  }

  addXP(xpEarned);
  if(game.mode==='survival' && game.idx > state.bestSurvival) state.bestSurvival = game.idx;
  checkAchievements();

  const total = game.mode === 'blitz' ? game.idx : game.questions.length;
  document.getElementById('finalScore').textContent = game.mode === 'study'
    ? `${game.idx}/${game.questions.length}` : `${game.score}/${total}`;
  document.getElementById('finalSub').textContent = game.mode === 'study'
    ? 'Tarjetas revisadas' : 'Respuestas correctas';
  document.getElementById('xpEarned').textContent = `+${xpEarned} XP`;

  showScreen('resultsScreen');
}

function retryGame() { startGame(game.lastMode); }

// === ERROR REVIEW ===
function startErrorReview(){
  if(state.wrongQueue.length < 2){
    showToast('✅','¡No tienes errores pendientes!');
    return;
  }
  const errorQs = state.wrongQueue.map(qText=>QUESTIONS.find(q=>q.q===qText)).filter(Boolean);
  if(errorQs.length < 2){ showToast('✅','¡No tienes errores pendientes!'); return; }
  game.mode = 'arcade';
  game.lastMode = 'arcade';
  game.score = 0;
  game.idx = 0;
  game.lives = 3;
  game.questions = shuffle([...errorQs]);
  game.timeLeft = 0;
  showScreen('gameScreen');
  updateGameUI();
  startTimer('count-up');
}

// === SCENARIO MODE ===
let scenarioState = {idx:0, scenarios:[], score:0};

function startScenario(){
  scenarioState.idx=0;
  scenarioState.score=0;
  scenarioState.scenarios=shuffle([...SCENARIOS]);
  showScreen('scenarioScreen');
  renderScenario();
}

function renderScenario(){
  const sc=scenarioState.scenarios[scenarioState.idx];
  document.getElementById('scenarioProgress').textContent=`${scenarioState.idx+1}/${scenarioState.scenarios.length}`;
  document.getElementById('scTitle').textContent=sc.title;
  document.getElementById('scContext').textContent=sc.context;
  document.getElementById('scMetric').textContent=sc.metric;
  document.getElementById('scQuestion').textContent=sc.question;
  const container=document.getElementById('scOptions');
  container.innerHTML=sc.options.map((o,i)=>`<button class="opt-btn" data-idx="${i}">${o}</button>`).join('');
  container.querySelectorAll('.opt-btn').forEach(btn=>{
    btn.addEventListener('click',()=>selectScenarioAnswer(btn,parseInt(btn.dataset.idx)));
  });
}

function selectScenarioAnswer(btn,idx){
  const sc=scenarioState.scenarios[scenarioState.idx];
  const correct=idx===sc.correct;
  const buttons=document.querySelectorAll('#scOptions .opt-btn');
  buttons.forEach((b,i)=>{
    b.classList.add('disabled');
    if(i===sc.correct) b.classList.add('correct');
  });
  if(correct){scenarioState.score++;btn.classList.add('correct');vibrate(30);playSound('correct');}
  else{btn.classList.add('wrong');vibrate([50,30,50]);playSound('wrong');}
  const panel=document.getElementById('explanationPanel');
  panel.className = correct ? 'explain-panel active' : 'explain-panel active explain-wrong-panel';
  panel.innerHTML=`
    <div class="explain-header ${correct?'explain-correct':'explain-wrong'}">
      <span class="explain-icon">${correct?'✅':'❌'}</span>
      <span class="explain-title">${correct?'¡Bien hecho!':'Respuesta incorrecta'}</span>
    </div>
    <div class="explain-body">
      <div class="explain-answer">✓ ${sc.options[sc.correct]}</div>
      <div class="explain-detail">${sc.explain}</div>
    </div>
    <button class="btn-continue" onclick="continueScenario()">CONTINUAR</button>
  `;
}

function continueScenario(){
  document.getElementById('explanationPanel').className='explain-panel';
  scenarioState.idx++;
  if(scenarioState.idx>=scenarioState.scenarios.length){
    addXP(scenarioState.score*20);
    checkAchievements();
    document.getElementById('finalScore').textContent=`${scenarioState.score}/${scenarioState.scenarios.length}`;
    document.getElementById('finalSub').textContent='Escenarios resueltos correctamente';
    document.getElementById('xpEarned').textContent=`+${scenarioState.score*20} XP`;
    showScreen('resultsScreen');
  } else { renderScenario(); }
}

function endScenario(){ showMenu(); }

// === CONNECTIONS MODE ===
let connState={idx:0,items:[],score:0};

function startConnections(){
  connState.idx=0;connState.score=0;
  connState.items=shuffle([...CONNECTIONS]);
  showScreen('connectionsScreen');
  renderConnection();
}

function renderConnection(){
  const c=connState.items[connState.idx];
  document.getElementById('connProgress').textContent=`${connState.idx+1}/${connState.items.length}`;
  document.getElementById('connCause').textContent=c.cause;
  // Generate 4 options: correct + 3 random wrong effects
  const others=connState.items.filter(x=>x!==c).map(x=>x.effect);
  const wrongOpts=shuffle(others).slice(0,3);
  const opts=shuffle([c.effect,...wrongOpts]);
  const container=document.getElementById('connOptions');
  container.innerHTML=opts.map(o=>`<button class="opt-btn">${o}</button>`).join('');
  container.querySelectorAll('.opt-btn').forEach(btn=>{
    btn.addEventListener('click',()=>selectConnectionAnswer(btn,btn.textContent));
  });
}

function selectConnectionAnswer(btn,answer){
  const c=connState.items[connState.idx];
  const correct=answer===c.effect;
  const buttons=document.querySelectorAll('#connOptions .opt-btn');
  buttons.forEach(b=>{b.classList.add('disabled');if(b.textContent===c.effect)b.classList.add('correct');});
  if(correct){connState.score++;btn.classList.add('correct');vibrate(30);playSound('correct');}
  else{btn.classList.add('wrong');vibrate([50,30,50]);playSound('wrong');}
  const panel=document.getElementById('explanationPanel');
  panel.className = correct ? 'explain-panel active' : 'explain-panel active explain-wrong-panel';
  panel.innerHTML=`
    <div class="explain-header ${correct?'explain-correct':'explain-wrong'}">
      <span class="explain-icon">${correct?'\u2705':'\u274c'}</span>
      <span class="explain-title">${correct?'\u00a1Bien hecho!':'Respuesta incorrecta'}</span>
    </div>
    <div class="explain-body">
      <div class="explain-answer">${c.cause} \u2192 ${c.effect}</div>
      <div class="explain-detail">${c.explain}</div>
    </div>
    <button class="btn-continue" onclick="continueConnection()">CONTINUAR</button>
  `;
}

function continueConnection(){
  document.getElementById('explanationPanel').className='explain-panel';
  connState.idx++;
  if(connState.idx>=connState.items.length){
    addXP(connState.score*15);
    checkAchievements();
    document.getElementById('finalScore').textContent=`${connState.score}/${connState.items.length}`;
    document.getElementById('finalSub').textContent='Conexiones correctas';
    document.getElementById('xpEarned').textContent=`+${connState.score*15} XP`;
    showScreen('resultsScreen');
  } else { renderConnection(); }
}

// === UTILS ===
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// === BOOT ===
function toggleCollapsible(header){
  header.classList.toggle('open');
  const body=header.nextElementSibling;
  body.classList.toggle('open');
}

function toggleTheme(){
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  document.documentElement.setAttribute('data-theme',isDark?'':'dark');
  localStorage.setItem('hubTheme',isDark?'light':'dark');
  document.getElementById('themeToggle').textContent=isDark?'🌙':'☀️';
}

function changeDailyGoal(){
  const goals=[5,10,15,20,30];
  const current=goals.indexOf(state.dailyGoal);
  state.dailyGoal=goals[(current+1)%goals.length];
  save();
  updateMenuStats();
  showToast('🎯',`Meta diaria: ${state.dailyGoal} preguntas`);
}

// === MUTE TOGGLE ===
function toggleMute(){
  isMuted=!isMuted;
  localStorage.setItem('hubMuted',isMuted?'true':'false');
  document.getElementById('muteToggle').textContent=isMuted?'🔇':'🔊';
}

// === FLOATING XP ===
function showFloatingXP(amount){
  const el=document.createElement('div');
  el.className='xp-float';
  el.textContent=`+${amount} XP`;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),1300);
}

// === SHARE RESULT ===
function shareResult(){
  const score=document.getElementById('finalScore').textContent;
  const xp=document.getElementById('xpEarned').textContent;
  const text=`🏆 Amazon Hub Trainer\n📊 Score: ${score}\n${xp}\n🔥 Racha: ${state.dailyStreak} días\n\n¿Te atreves a superarme?`;
  if(navigator.share){
    navigator.share({title:'Amazon Hub Trainer',text}).catch(()=>{});
  } else {
    navigator.clipboard.writeText(text).then(()=>showToast('📋','Resultado copiado al portapapeles'));
  }
}

// Apply saved theme & mute
(function(){
  const saved=localStorage.getItem('hubTheme');
  if(saved==='dark'){
    document.documentElement.setAttribute('data-theme','dark');
    const btn=document.getElementById('themeToggle');
    if(btn) btn.textContent='☀️';
  }
  const muteBtn=document.getElementById('muteToggle');
  if(muteBtn && isMuted) muteBtn.textContent='🔇';
})();

init();

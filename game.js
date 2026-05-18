// === STATE ===
let state = JSON.parse(localStorage.getItem('amzlQuiz')) || {
  xp: 0, level: 1, streak: 0, bestStreak: 0,
  totalCorrect: 0, totalAnswered: 0,
  catStats: {}, wrongQueue: []
};

let game = { mode:'', questions:[], idx:0, score:0, lives:3, timer:null, timeLeft:0, lastMode:'' };
let selectedCats = new Set();
let studyFlipped = false;

// === INIT ===
function init() {
  renderCatFilter();
  updateMenuStats();
  renderWeakness();
}

function save() {
  localStorage.setItem('amzlQuiz', JSON.stringify(state));
}

// === XP & LEVEL ===
function xpForLevel(lvl) { return lvl * 120; }

function addXP(amount) {
  state.xp += amount;
  while (state.xp >= xpForLevel(state.level)) {
    state.xp -= xpForLevel(state.level);
    state.level++;
  }
  save();
}

function updateMenuStats() {
  document.getElementById('levelBadge').textContent = `NIVEL ${state.level}`;
  document.getElementById('xpBar').style.width = `${(state.xp / xpForLevel(state.level)) * 100}%`;
  document.getElementById('statXP').textContent = state.xp + (state.level - 1) * 120;
  document.getElementById('statStreak').textContent = state.streak;
  document.getElementById('statAccuracy').textContent = state.totalAnswered > 0
    ? Math.round((state.totalCorrect / state.totalAnswered) * 100) + '%' : '-';
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
  if (btn.classList.contains('disabled')) return;
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
    // Remove from wrong queue if was there
    state.wrongQueue = state.wrongQueue.filter(x => x !== q.q);
    // Confetti on streaks of 5
    if (state.streak % 5 === 0) fireConfetti();
  } else {
    btn.classList.add('wrong');
    state.streak = 0;
    if (game.mode === 'survival') game.lives--;
    vibrate([50, 30, 50]);
    // SRS: add to wrong queue
    if (!state.wrongQueue.includes(q.q)) {
      state.wrongQueue.push(q.q);
      if (state.wrongQueue.length > 20) state.wrongQueue.shift();
    }
  }

  state.totalAnswered++;
  if (!state.catStats[q.cat]) state.catStats[q.cat] = { correct: 0, total: 0 };
  state.catStats[q.cat].total++;
  if (correct) state.catStats[q.cat].correct++;
  save();

  showExplanation(q, correct);
}

// === EXPLANATION PANEL ===
function showExplanation(q, correct) {
  const panel = document.getElementById('explanationPanel');
  const icon = correct ? '✅' : '❌';
  const title = correct ? '¡Correcto!' : 'Incorrecto';
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
    <button class="btn-continue" onclick="continueGame()">Continuar →</button>
  `;
  panel.classList.add('active');
}

function continueGame() {
  document.getElementById('explanationPanel').classList.remove('active');

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

  const total = game.mode === 'blitz' ? game.idx : game.questions.length;
  document.getElementById('finalScore').textContent = game.mode === 'study'
    ? `${game.idx}/${game.questions.length}` : `${game.score}/${total}`;
  document.getElementById('finalSub').textContent = game.mode === 'study'
    ? 'Tarjetas revisadas' : 'Respuestas correctas';
  document.getElementById('xpEarned').textContent = `+${xpEarned} XP`;

  showScreen('resultsScreen');
}

function retryGame() { startGame(game.lastMode); }

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

init();

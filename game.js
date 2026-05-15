// === STATE ===
let state = JSON.parse(localStorage.getItem('amzlQuiz')) || {
  xp: 0, level: 1, streak: 0, bestStreak: 0,
  totalCorrect: 0, totalAnswered: 0,
  catStats: {}
};

let game = { mode:'', questions:[], idx:0, score:0, lives:3, timer:null, timeLeft:0, lastMode:'' };
let selectedCats = new Set();
let studyFlipped = false;

// === INIT ===
function init() {
  renderCatFilter();
  updateMenuStats();
}

function save() {
  localStorage.setItem('amzlQuiz', JSON.stringify(state));
}

// === XP & LEVEL ===
function xpForLevel(lvl) { return lvl * 100; }

function addXP(amount) {
  state.xp += amount;
  while (state.xp >= xpForLevel(state.level)) {
    state.xp -= xpForLevel(state.level);
    state.level++;
  }
  save();
}

function updateMenuStats() {
  document.getElementById('levelBadge').textContent = `Nivel ${state.level}`;
  document.getElementById('xpBar').style.width = `${(state.xp / xpForLevel(state.level)) * 100}%`;
  document.getElementById('statXP').textContent = state.xp + (state.level - 1) * 100;
  document.getElementById('statStreak').textContent = state.streak;
  document.getElementById('statAccuracy').textContent = state.totalAnswered > 0
    ? Math.round((state.totalCorrect / state.totalAnswered) * 100) + '%' : '-';
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

  const shuffled = shuffle([...pool]);

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

  // Lives
  const livesEl = document.getElementById('livesDisplay');
  livesEl.textContent = game.mode === 'survival' ? '❤️'.repeat(game.lives) : '';

  // Progress
  const total = game.mode === 'blitz' ? '∞' : game.questions.length;
  const pct = game.mode === 'blitz' ? 0 : ((game.idx) / game.questions.length) * 100;
  document.getElementById('gameProgress').style.width = `${pct}%`;

  // Options (shuffled)
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
  } else {
    btn.classList.add('wrong');
    state.streak = 0;
    if (game.mode === 'survival') game.lives--;
  }

  state.totalAnswered++;
  // Track category stats
  if (!state.catStats[q.cat]) state.catStats[q.cat] = { correct: 0, total: 0 };
  state.catStats[q.cat].total++;
  if (correct) state.catStats[q.cat].correct++;
  save();

  setTimeout(() => {
    if (game.mode === 'survival' && game.lives <= 0) { endGame(); return; }
    game.idx++;
    if (game.mode === 'blitz') {
      if (game.idx >= game.questions.length) game.idx = 0; // loop
      updateGameUI();
    } else if (game.idx >= game.questions.length) {
      endGame();
    } else {
      updateGameUI();
    }
  }, correct ? 600 : 1200);
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
  document.getElementById('flashLabel').textContent = 'Respuesta';
  document.getElementById('flashText').textContent = q.a;
  document.getElementById('flashcard').classList.add('flipped');
}

function studyNext(knew) {
  if (knew) { state.streak++; addXP(5); }
  else { state.streak = 0; }
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
init();

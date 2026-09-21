// =========================================================================
// ⚙️ НАСТРОЙКИ СИСТЕМЫ И ИГРЫ (Удобный конфиг)
// =========================================================================

// 0. ССЫЛКА НА ЮТУБ (Вставьте сюда нужную ссылку)
const NUDES_YOUTUBE_LINK = "https://rt.pornhub.com/video/search?search=redhead+compilation";

// 1. АУДИО ФАЙЛЫ
const AUDIO_CONFIG = {
  click: new Audio('sfx_click.mp3'),
  error: new Audio('sfx_error.mp3'),
  item: new Audio('sfx_item.mp3'),
  bg_dark: new Audio('bg_dark.mp3'),
  bg_pirate: new Audio('bg_pirate.mp3'),
  bg_turbina: new Audio('bg_turbina.mp3'),
  bg_metal: new Audio('bg_metal.mp3'),
  alchowhore: new Audio('alchowhore.mp3') 
};
AUDIO_CONFIG.bg_dark.loop = true; 
AUDIO_CONFIG.bg_pirate.loop = true;
AUDIO_CONFIG.bg_turbina.loop = true; 
AUDIO_CONFIG.bg_metal.loop = true;

// 2. ДАННЫЕ ПЕРСОНАЖЕЙ (Для окна Досье)
const CHARS_CONFIG = {
  "vlad": { name: "Влад Сорочинский", img: "vlad.jpg", role: "Актёр, сценарист" },
  "tolya": { name: "Анатолий Дударев", img: "tolya.jpg", role: "Cборка, сценарист" },
  "egor": { name: "Егор Вороненко", img: "egor.jpg", role: "Актёр, сценарист" },
  "serega": { name: "Серёга Селезнёв", img: "serega.jpg", role: "Актёр, сценарист" },
  "alisa": { name: "Алиса Никитина", img: "alisa.jpg", role: "Именинница, йоу" }
};

// 3. ТЕКСТ BIOS (ЭКРАН ЗАГРУЗКИ)
const BIOS_LINES = [
    "ALISA-PC BIOS v2.4.1995 initializing...",
    "Checking CPU... OK.",
    "Checking RAM Memory... 1024MB OK.",
    "Loading Serega_Dead_Inside_Beats.dll... [WARNING: DEPRESSION DETECTED]",
    "Mounting Egor_Nudes_Archive.rar... [ACCESS DENIED - FILES STOLEN]",
    "Bypassing Tolya's chloric floor defense protocol... [OK]",
    "Extracting Tundra_Sequel_Plans.exe... [PENDING]",
    "Loading Omsk_Memories.sys... [OK]",
	"The Tundra vodka was drunk... [DONE]",
	"The bra is on. Vlad is pleased... [SUCCESS]",
	"Listen to Egor's ramblings... [REDACTED]",
	"Make the promised pancakes for Tolya. Pick up the wet dog food after two years... [OK]",
	"Getting into a fight with Seryozha using chairs at Yegor's place... [OK]",
    "System booted successfully. Welcome, Alisa."
];

// 4. МЫСЛИ АЛИСЫ (Для кликов по рабочему столу и ивентов)
const THOUGHTS = {
    start: "Ну-ка, что ребята мне заготовили.",
    trash: "Корзина... Символично.",
    beats: "Дед-инсайд биты Серёги... Включать я это, конечно же, не буду.",
    shark: "О боже, та самая акула из аквапарка. Толя гений фотошопа. Ахахахаха",
    audio: "О да, гимн этого вечера!",
    nudes_rar: "Слава богу, что украли! Мои глаза целее будут.",
    txt: "Ох, помню эту философию... Серёга в своем репертуаре.",
    img_zima: "Ох, помню, как вчера... Жесткая была зима.",
    img_1995: "Атмосферно... Прям ностальгия в глаз попала.",
    img_whore: "АХАХАХ, это что вообще такое?!",
    start_btn: "Меню пуск?",
    event_nudes: "ТРОЯН?! Только не мои нюдсы, сука!",
    event_omsk: "Омск пытаются стереть?! НИ ЗА ЧТО! КЛИКАЙ КЛИКАЙ КЛИКАЙ!"
};

// =========================================================================
// ПЕРЕМЕННЫЕ ДВИЖКА
// =========================================================================
let state = { alko: 0, mad: 0, items: [] };
const emojiMap = { "Лимон": "🍋", "Сахар": "🧊", "Спирт": "⛽" };
let isGameStarted = false;
let currentBgMusic = null;


// =========================================================================
// СИСТЕМА МЫСЛЕЙ (Алиса Игрок)
// =========================================================================
let thoughtTimeout;
let thoughtInterval;

function showAlisaThought(text, autoHide = false) {
    const box = document.getElementById('alisa-dialogue-box');
    const container = document.getElementById('alisa-text-container');
    
    box.classList.remove('hidden');
    box.style.opacity = 1;
    clearInterval(thoughtInterval);
    clearTimeout(thoughtTimeout);
    container.innerHTML = "";

    let i = 0;
    thoughtInterval = setInterval(() => {
        if (i < text.length) {
            container.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(thoughtInterval);
            // Автоматическое скрытие (для кликов по раб.столу)
            if (autoHide) {
                thoughtTimeout = setTimeout(() => {
                    box.style.opacity = 0;
                    setTimeout(() => box.classList.add('hidden'), 500);
                }, 4000); 
            }
        }
    }, 20); // Быстрая печать для мыслей
}

// Централизованный обработчик кликов по иконкам
function triggerDesktopEvent(type) {
    if (type === 'trash') openFakePopup('Корзина пуста. Все воспоминания сохранены.');
    if (type === 'beats') openFakePopup('Файл поврежден. Никто не слушает дед-инсайдовские биты.');
    if (type === 'shark') openFakePopup('Толя заблокировал доступ к исходникам. Идет рендер акулы.');
    if (type === 'audio') openAudioPlayer();
    if (type === 'nudes_rar') openFakePopup('Неизвестный злоумышленник украл все нюдсы Егора и мы к "сожалению" не увидим их');
    if (type === 'txt') openTxtModal('shiza_book_seleznev.txt', 'Тут излагается философия и жизненная позиция Сергея Селезнёва, члена партии Яблоко. Покупайте по скидке, пока не поздно в его тг @antonleb_22');
    if (type === 'img_zima') openImgModal('zima_2025.jpg');
    if (type === 'img_1995') openImgModal('1995_gooddamn.jpg');
    if (type === 'img_whore') openImgModal('whore_s.jpg');
    if (type === 'start') openFakePopup('Меню Пуск временно не работает.');

    // Показываем реакцию Алисы
    if (THOUGHTS[type]) {
        showAlisaThought(THOUGHTS[type], true);
    }
}


// =========================================================================
// ЭКРАН ЗАПУСКА ПК И БИОС
// =========================================================================
function startBootSequence() {
    playSound('click');
    document.getElementById('boot-screen-initial').classList.add('hidden');
    const flash = document.getElementById('white-flash');
    flash.classList.remove('hidden');
    
    setTimeout(() => {
        flash.style.opacity = 0;
        document.getElementById('bios-screen').classList.remove('hidden');
        runBiosText();
    }, 100);
}

function runBiosText() {
    const biosContainer = document.getElementById('bios-text');
    let lineIndex = 0;
    const interval = setInterval(() => {
        if(lineIndex < BIOS_LINES.length) {
            biosContainer.innerHTML += BIOS_LINES[lineIndex] + "<br>";
            lineIndex++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('bios-screen').classList.add('hidden');
                document.getElementById('white-flash').classList.add('hidden'); 
                setupDesktop();
            }, 1500);
        }
    }, 150); 
}

function setupDesktop() {
    document.getElementById('desktop').classList.remove('hidden');
    document.getElementById('taskbar-container').classList.remove('hidden');
    
    const icons = document.querySelectorAll('.randomize-icon');
    icons.forEach(icon => {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 200) {
            const maxX = window.innerWidth - 100; 
            const maxY = window.innerHeight - 120; 
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            const isOverlappingCenter = (
                randomX > window.innerWidth/2 - 250 && randomX < window.innerWidth/2 + 150 &&
                randomY > window.innerHeight/2 - 200 && randomY < window.innerHeight/2 + 100
            );

            if (!isOverlappingCenter) {
                icon.style.left = randomX + 'px'; icon.style.top = randomY + 'px'; placed = true;
            }
            attempts++;
        }
        if (!placed) { icon.style.left = '10px'; icon.style.top = '10px'; }
    });
}

function launchGame() {
    playSound('click');
    document.getElementById('main-window').classList.remove('hidden');
    if (!isGameStarted) {
        showAlisaThought(THOUGHTS.start, true);
        renderScene('start');
        isGameStarted = true;
    }
}


// =========================================================================
// АУДИО КОНТРОЛЛЕР И ЧАСЫ
// =========================================================================
setInterval(() => {
    const d = new Date();
    document.getElementById('taskbar-time').innerText = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}, 1000);

function playMusic(trackName) {
  if (currentBgMusic) currentBgMusic.pause();
  if (trackName && AUDIO_CONFIG[trackName]) {
    currentBgMusic = AUDIO_CONFIG[trackName];
    if(AUDIO_CONFIG.alchowhore.paused) {
        currentBgMusic.play().catch(e => console.log("Ждем первого клика"));
    }
  }
}
function playSound(type) {
  if(AUDIO_CONFIG[type]) { AUDIO_CONFIG[type].currentTime = 0; AUDIO_CONFIG[type].play().catch(e => {}); }
}

const playerProgress = document.getElementById('audio-progress');
const playerVolume = document.getElementById('audio-volume');
const currentTimeEl = document.getElementById('audio-current-time');
const durationEl = document.getElementById('audio-duration');

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60); const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

AUDIO_CONFIG.alchowhore.ontimeupdate = () => {
    currentTimeEl.innerText = formatTime(AUDIO_CONFIG.alchowhore.currentTime);
    durationEl.innerText = formatTime(AUDIO_CONFIG.alchowhore.duration);
    if (AUDIO_CONFIG.alchowhore.duration) playerProgress.value = (AUDIO_CONFIG.alchowhore.currentTime / AUDIO_CONFIG.alchowhore.duration) * 100;
};

playerProgress.addEventListener('input', () => { AUDIO_CONFIG.alchowhore.currentTime = (playerProgress.value / 100) * AUDIO_CONFIG.alchowhore.duration; });
playerVolume.addEventListener('input', () => { AUDIO_CONFIG.alchowhore.volume = playerVolume.value; });

function openAudioPlayer() {
    playSound('click'); document.getElementById('audio-modal').classList.remove('hidden'); playAlcoWhore();
}
function playAlcoWhore() {
    playSound('click'); if (currentBgMusic) currentBgMusic.pause(); 
    AUDIO_CONFIG.alchowhore.play().catch(e => console.log("Audio play failed"));
}
function pauseAlcoWhore() { playSound('click'); AUDIO_CONFIG.alchowhore.pause(); }
function closeAudioModal() {
    playSound('click'); AUDIO_CONFIG.alchowhore.pause(); AUDIO_CONFIG.alchowhore.currentTime = 0;
    document.getElementById('audio-modal').classList.add('hidden');
}


// =========================================================================
// ИНВЕНТАРЬ И МОДАЛЬНЫЕ ОКНА
// =========================================================================
function openTxtModal(title, text) {
    playSound('click'); document.getElementById('txt-title').innerText = title; document.getElementById('txt-content').value = text;
    const modal = document.getElementById('txt-modal');
    modal.style.top = (Math.random() * 20 + 20) + '%'; modal.style.left = (Math.random() * 30 + 20) + '%';
    modal.classList.remove('hidden');
}
function openImgModal(src) {
    playSound('click'); document.getElementById('img-title').innerText = src; document.getElementById('img-content').src = src;
    const modal = document.getElementById('img-modal');
    modal.style.top = (Math.random() * 15 + 10) + '%'; modal.style.left = (Math.random() * 30 + 10) + '%';
    modal.classList.remove('hidden');
}

function showChar(id) {
  playSound('click'); const data = CHARS_CONFIG[id];
  document.getElementById('char-title').innerText = data.name; document.getElementById('char-img').src = data.img; document.getElementById('char-desc').innerText = data.role;
  const modal = document.getElementById('char-modal');
  modal.classList.remove('hidden'); modal.style.top = Math.floor(Math.random() * 20) + 10 + '%'; modal.style.left = Math.floor(Math.random() * 40) + 5 + '%';
}
function closeCharModal() { playSound('click'); document.getElementById('char-modal').classList.add('hidden'); }

function formatText(text) {
  return text
    .replace(/Влад:/g, '<span class="char-link char-vlad" onclick="showChar(\'vlad\')">Влад:</span>')
    .replace(/Толя:/g, '<span class="char-link char-tolya" onclick="showChar(\'tolya\')">Толя:</span>')
    .replace(/Егор:/g, '<span class="char-link char-egor" onclick="showChar(\'egor\')">Егор:</span>')
    .replace(/Серёга:/g, '<span class="char-link char-serega" onclick="showChar(\'serega\')">Серёга:</span>')
    .replace(/Алиса:/g, '<span class="char-link char-alisa" onclick="showChar(\'alisa\')">Алиса:</span>');
}

let pendingSceneToLoad = null;
function openFakePopup(msg, isLink = false) {
  playSound('error'); 
  document.getElementById('fake-popup-msg').innerText = msg;
  const popup = document.getElementById('fake-popup'); 
  const linkBox = document.getElementById('fake-popup-link-container');
  const linkElem = document.getElementById('fake-popup-link');
  
  if (isLink) {
    linkBox.classList.remove('hidden');
    if (linkElem) {
      linkElem.href = NUDES_YOUTUBE_LINK;
      linkElem.target = "_blank";
      linkElem.onclick = () => {
        triggerNudesGameOver();
      };
    }
  } else {
    linkBox.classList.add('hidden');
  }
  popup.classList.remove('hidden');
}
function closeFakePopup() { 
  playSound('click'); document.getElementById('fake-popup').classList.add('hidden'); document.getElementById('fake-popup-link-container').classList.add('hidden');
  if (pendingSceneToLoad) { renderScene(pendingSceneToLoad); pendingSceneToLoad = null; }
}


// =========================================================================
// ЭНКАУНТЕРЫ (Случайные события)
// =========================================================================
let eventNudesDone = false;
let eventOmskDone = false;
let encounterTimer;
let encounterInterval;

function triggerEncounter(nextScene) {
    const roll = Math.random();
    if (roll < 0.20 && !eventNudesDone) { startEventNudes(nextScene); return true; } 
    else if (roll > 0.80 && !eventOmskDone) { startEventOmsk(nextScene); return true; }
    return false;
}

function startEventNudes(nextScene) {
    eventNudesDone = true; playSound('error');
    document.getElementById('event-overlay').classList.remove('hidden');
    document.getElementById('event-window').innerHTML = `
        <div class="title-bar"><div class="title-bar-text">WARNING.TROJAN</div></div>
        <div class="window-body" style="height: 100%; position: relative;">
            <p style="color: red; font-weight: bold; text-align: center;">ВНИМАНИЕ! Злоумышленник получил доступ к компьютеру и скачивает ваши нюдсы!</p>
            <div style="text-align: center; margin-top: 50px;">
                <button onclick="startNudesMinigame('${nextScene}')" style="font-size: 16px; font-weight: bold; padding: 10px;">Прогнать злоумышленника</button>
            </div>
        </div>
    `;
    showAlisaThought(THOUGHTS.event_nudes, true); // Реакция Алисы
}

function startNudesMinigame(nextScene) {
    playSound('click');
    const eventWin = document.getElementById('event-window').querySelector('.window-body');
    eventWin.innerHTML = `<p style="text-align: center; font-weight: bold;">Успей нажать на вирус 5 раз! Осталось <span id="nudes-time">8</span> сек.</p><button id="virus-btn" class="virus-btn" style="padding: 5px 10px; font-size: 12px;">УДАЛИТЬ</button>`;
    
    let clicks = 0; let timeLeft = 8;
    const virusBtn = document.getElementById('virus-btn');
    
    encounterInterval = setInterval(() => { virusBtn.style.top = (Math.random() * 200 + 40) + "px"; virusBtn.style.left = (Math.random() * 250 + 10) + "px"; }, 600);
    encounterTimer = setInterval(() => {
        timeLeft--; document.getElementById('nudes-time').innerText = timeLeft;
        if (timeLeft <= 0) { clearInterval(encounterTimer); clearInterval(encounterInterval); loseNudesGame(nextScene); }
    }, 1000);

    virusBtn.onclick = () => {
        playSound('click'); clicks++;
        if (clicks >= 5) { clearInterval(encounterTimer); clearInterval(encounterInterval); winNudesGame(nextScene); }
        virusBtn.style.top = (Math.random() * 200 + 40) + "px"; virusBtn.style.left = (Math.random() * 250 + 10) + "px";
    };
}

function winNudesGame(nextScene) {
    document.getElementById('event-overlay').classList.add('hidden'); pendingSceneToLoad = nextScene;
    openFakePopup("Злоумышленник был побеждён! Ваши данные были спасены!");
}

function loseNudesGame(nextScene) {
    document.getElementById('event-overlay').classList.add('hidden');
    const failIcon = document.createElement('div'); failIcon.className = 'desktop-icon randomize-icon';
    failIcon.style.top = '80%'; failIcon.style.left = '10%';
    failIcon.innerHTML = `<div class="icon-img">🔗</div><span style="color:red;">СЛИВ_АЛИСЫ.url</span>`;
    failIcon.onclick = () => {
        window.open(NUDES_YOUTUBE_LINK, '_blank');
        triggerNudesGameOver();
    };
    document.getElementById('desktop').appendChild(failIcon);
    pendingSceneToLoad = nextScene;
    openFakePopup("ВРЕМЯ ВЫШЛО! Злоумышленник успешно скачал данные.", true);
}

function triggerNudesGameOver() {
    if (currentBgMusic) currentBgMusic.pause();
    for (let key in AUDIO_CONFIG) {
        if (AUDIO_CONFIG[key] && typeof AUDIO_CONFIG[key].pause === 'function') {
            AUDIO_CONFIG[key].pause();
        }
    }
    
    document.getElementById('main-window').classList.add('hidden');
    document.getElementById('desktop').classList.add('hidden');
    document.getElementById('taskbar-container').classList.add('hidden');
    document.getElementById('alisa-dialogue-box').classList.add('hidden');
    document.getElementById('fake-popup').classList.add('hidden');
    document.getElementById('event-overlay').classList.add('hidden');
    
    document.body.className = '';
    document.body.style.backgroundColor = "black";
    
    let gameOverScreen = document.getElementById('nudes-gameover-overlay');
    if (!gameOverScreen) {
        gameOverScreen = document.createElement('div');
        gameOverScreen.id = 'nudes-gameover-overlay';
        gameOverScreen.style.position = 'fixed';
        gameOverScreen.style.top = '0';
        gameOverScreen.style.left = '0';
        gameOverScreen.style.width = '100vw';
        gameOverScreen.style.height = '100vh';
        gameOverScreen.style.backgroundColor = 'black';
        gameOverScreen.style.color = 'white';
        gameOverScreen.style.display = 'flex';
        gameOverScreen.style.flexDirection = 'column';
        gameOverScreen.style.justifyContent = 'center';
        gameOverScreen.style.alignItems = 'center';
        gameOverScreen.style.zIndex = '9999999';
        gameOverScreen.style.textAlign = 'center';
        gameOverScreen.style.fontFamily = "'Pixelated MS Sans Serif', Arial";
        document.body.appendChild(gameOverScreen);
    }
    
    gameOverScreen.innerHTML = `
        <h1 style="color: red; font-size: 32px; margin-bottom: 20px;">СИСТЕМА ЗАБЛОКИРОВАНА</h1>
        <p style="font-size: 18px; line-height: 1.6; color: #ccc; max-width: 80%;">
            Алиса нажала на ссылку, и данные утекли в сеть...<br>
            Экран потемнел. Игра завершена.
        </p>
        <p style="font-size: 14px; margin-top: 30px; color: #888;">
            (Обновите страницу, чтобы начать заново)
        </p>
    `;
}

function startEventOmsk(nextScene) {
    eventOmskDone = true; playSound('error');
    document.getElementById('event-overlay').classList.remove('hidden');
    document.getElementById('event-window').innerHTML = `
        <div class="title-bar"><div class="title-bar-text">CRITICAL_MEMORY_FAILURE</div></div>
        <div class="window-body">
            <p style="color: red; font-weight: bold; text-align: center;">КРИТИЧЕСКАЯ УГРОЗА! Неизвестная сущность пытается стереть все воспоминания об Омске из головы Алисы!</p>
            <div style="text-align: center; margin-top: 30px;"><button onclick="startOmskMinigame('${nextScene}')" style="font-size: 16px; font-weight: bold; padding: 10px;">Сопротивляться</button></div>
        </div>
    `;
    showAlisaThought(THOUGHTS.event_omsk, true); // Реакция Алисы
}

function startOmskMinigame(nextScene) {
    playSound('click');
    document.getElementById('event-window').querySelector('.window-body').innerHTML = `
        <p style="text-align: center; font-weight: bold;">Спамь кнопку, чтобы заполнить шкалу! Осталось <span id="omsk-time">6</span> сек.</p>
        <div class="progress-bar-container"><div id="omsk-progress" class="progress-fill"></div></div>
        <div style="text-align: center; margin-top: 20px;"><button id="omsk-btn" style="padding: 15px 30px; font-size: 18px; font-weight: bold;">ВСПОМНИТЬ!</button></div>
    `;
    
    let progress = 10; let timeLeft = 6;
    const progBar = document.getElementById('omsk-progress');
    
    encounterInterval = setInterval(() => { progress -= 2.5; if (progress < 0) progress = 0; progBar.style.width = progress + "%"; }, 100);
    encounterTimer = setInterval(() => {
        timeLeft--; document.getElementById('omsk-time').innerText = timeLeft;
        if (timeLeft <= 0) { clearInterval(encounterTimer); clearInterval(encounterInterval); loseOmskGame(); }
    }, 1000);

    document.getElementById('omsk-btn').onclick = () => {
        progress += 8;
        if (progress >= 100) { progBar.style.width = "100%"; clearInterval(encounterTimer); clearInterval(encounterInterval); winOmskGame(nextScene); }
    };
}

function winOmskGame(nextScene) {
    document.getElementById('event-overlay').classList.add('hidden'); pendingSceneToLoad = nextScene;
    openFakePopup("Ваши воспоминания были сохранены. Сущность отступила.");
}

function loseOmskGame() {
    document.getElementById('event-overlay').classList.add('hidden'); playSound('error');
    document.getElementById('main-window').classList.add('hidden'); document.getElementById('desktop').classList.add('hidden');
    document.getElementById('taskbar-container').classList.add('hidden'); document.body.className = ''; document.body.style.backgroundColor = "black";
    document.getElementById('alisa-dialogue-box').classList.add('hidden'); 
    document.getElementById('main-window').classList.remove('hidden');
    
    document.getElementById('window-title').innerText = "FATAL ERROR";
    document.getElementById('game-container').innerHTML = "<h2 style='color:red; text-align:center;'>Ваши воспоминания были стёрты.<br>Омска больше нет.</h2>";
    document.getElementById('choices').innerHTML = "<button onclick='location.reload()'>Перезагрузить реальность</button>";
    document.getElementById('choices').classList.remove('hidden');
}


// =========================================================================
// ФИЗИКА КРОВИ НА CANVAS (Страшная сцена)
// =========================================================================
function startBloodDeath() {
  playSound('error');
  if (currentBgMusic) currentBgMusic.pause();
  AUDIO_CONFIG.alchowhore.pause(); 
  
  document.getElementById('main-window').classList.add('hidden');
  document.getElementById('desktop').classList.add('hidden');
  document.getElementById('taskbar-container').classList.add('hidden');
  document.getElementById('alisa-dialogue-box').classList.add('hidden'); 
  document.body.className = ''; 
  document.body.style.backgroundColor = "black";
  
  const canvas = document.getElementById('blood-canvas');
  canvas.classList.remove('hidden');
  const ctx = canvas.getContext('2d');
  
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();

  let particles = []; let fillLevel = 0; let mouse = { x: -1000, y: -1000 };
  canvas.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

  function renderBlood() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let k=0; k<4; k++) {
        particles.push({ x: canvas.width * 0.25 + (Math.random()*30-15), y: -10, vx: (Math.random()-0.5)*1.5, vy: Math.random()*3+2 });
        particles.push({ x: canvas.width * 0.75 + (Math.random()*30-15), y: -10, vx: (Math.random()-0.5)*1.5, vy: Math.random()*3+2 });
    }

    fillLevel += 1.2; let surfaceY = canvas.height - fillLevel;
    ctx.fillStyle = '#7a0000'; ctx.fillRect(0, surfaceY, canvas.width, fillLevel);
    ctx.fillStyle = '#9e0000';
    
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i]; p.vy += 0.2; 
        let dx = p.x - mouse.x; let dy = p.y - mouse.y; let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) { let force = (100 - dist) / 100; p.vx += (dx / dist) * force * 7; p.vy += (dy / dist) * force * 7; }
        p.x += p.vx; p.y += p.vy;
        ctx.beginPath(); ctx.arc(p.x, p.y, 8, 0, Math.PI*2); ctx.fill();
        if (p.y >= surfaceY) particles.splice(i, 1);
    }

    if (fillLevel < canvas.height + 50) requestAnimationFrame(renderBlood);
    else {
        ctx.fillStyle = 'black'; ctx.font = 'bold 50px "Pixelated MS Sans Serif", Arial'; ctx.textAlign = 'center'; ctx.fillText('ВЫТЕКЛИ ГЛАЗА', canvas.width/2, canvas.height/2);
        ctx.fillStyle = 'white'; ctx.font = '20px "Pixelated MS Sans Serif", Arial'; ctx.fillText('Обновите страницу (F5), чтобы начать заново', canvas.width/2, canvas.height/2 + 50);
    }
  }
  renderBlood();
}


// =========================================================================
// СЦЕНАРИЙ ИГРЫ (ОСНОВНОЙ СЮЖЕТ)
// =========================================================================
// text - диалоги в главном окне (Алиса как персонаж общается тут же)
// thoughts - мысли Алисы ИГРОКА (появляются внизу)
const scenes = {
    "start": {
        music: "bg_dark",
        text: "<span class='system-text'>ТЕМНОТА. В отдалении играет музыка. Мигает свет через веки.</span><br><br>ГГ открывает глаза",
        choices: [
            { text: "Встать", nextScene: "scene1" },
            { text: "Не вставать", isDeath: true, deathMessage: "Вы решили не вставать. Конец игры." }
        ]
    },
    "scene1": {
        text: "Глаза открываются. Вид: гостиная Егора, по центру стол, на столе алкоголь, карты, мелочь и прочь. На самом столе, с голым торсом танцует Егор. На диване сидят остальные.<br><br>Влад: О! Ты проснулась, осталось мало времени, нужно тусануть.<br><span class='system-text'>*Егор танцует, ещё один элемент одежды снят*</span><br>Серёга: <span class='shake'>Эщкере-е-е-е!</span>",
        thoughts: "Господи, Егор опять разделся... А Серёга со своим эщкере, я сейчас умру от смеха.",
        choices: [
            { text: "Газ, я тока за!", nextScene: "scene2" },
            { text: "Взять стакан", nextScene: "scene2", action: () => { state.alko += 1; playSound('item'); openFakePopup("Выпивает стакан типа с водой, но там не вода."); } },
            { text: "Смотреть на Егора", nextScene: "scene1_death" } 
        ]
    },
    "scene1_death": {
        music: null,
        text: "<span class='system-text'>Ты отказываешься отводить взгляд.</span><br><br>Движения Егора перестают подчиняться законам физики. Его суставы выгибаются под немыслимыми углами, а само пространство вокруг его тела начинает искажаться и рябить. Воздух в комнате становится густым, раскаленным. Ты пытаешься зажмуриться, но веки парализует от первобытного ужаса.<br><br>Зрение застилает красная пелена. Сначала лопаются капилляры. Острая боль пронзает глазные яблоки, словно в них вонзили десятки раскаленных игл. Картинка плывет, цвета смешиваются в багровую кашу. По твоим щекам текут обжигающие, густые слезы...",
        thoughts: "БЛЯТЬ ЧТО ПРОИСХОДИТ ПОЧЕМУ ТАК СТРАШНО АХАХАХ МАЛЬЧИКИ ВЫ ЧЕГО",
        onLoad: () => {
            playSound('error');
            document.getElementById('main-window').classList.add('mad-glitch');
            document.getElementById('main-window').classList.add('aggressive-shake'); 
            setTimeout(() => {
                document.getElementById('main-window').classList.remove('aggressive-shake');
                startBloodDeath();
            }, 7500);
        },
        choices: [] 
    },
    "scene2": {
        text: "Обычный омский подъезд. Ребята стоят у лестницы.<br><br>Егор: Чё, на чём поедем?<br>Толя: У тебя есть деньги?<br>Егор: Конечно нет. Но если Алиса платит, то газ.",
        thoughts: "Омские падики... Как же я по этому скучала. И конечно же мы без денег.",
        choices: [
            { text: "Бабки не проблема.", nextScene: "scene2_kitchen", action: () => { state.mad += 1; } },
            { text: "Не ребят, давайте на автобусе.", nextScene: "scene2_kitchen" },
            { text: "Кооооот, пжшка давай ты заплатишь :> .", nextScene: "scene2_kitchen" },
            {
                text: "Сказать стене комплимент",
                condition: () => state.alko >= 1,
                nextScene: "scene2_kitchen",
                action: () => { openFakePopup("Алиса начинает философский диалог с подъездным граффити.\nВлад: «Ашалеть, чювачочек, а тебя со стакана развезло»."); }
            }
        ]
    },
    "scene2_kitchen": {
        text: "Влад: Тиш чювачочек, всё порешаем, скинемся.<br>Алиса: Блин... Я электронку на кухне забыла! Сек, я мигом!<br><br><span class='system-text'>Алиса забегает обратно в квартиру Егора. Фон: грязная кухня, на столе лежат остатки еды и одинокий лимон.</span>",
        thoughts: "Лимон? Серьезно? Вы бы еще закладку там спрятали.",
        choices: [
            { text: "«О, лимон. Пригодится!»", nextScene: "scene3", action: () => { state.items.push("Лимон"); playSound('item'); openFakePopup("Получен предмет: 🍋 Лимон"); } },
            { text: "«Нахуй он мне нужен, только карман оттянет.»", nextScene: "scene3" }
        ]
    },
    "scene3": {
        music: "bg_pirate",
        text: "Фон: Квартира Толи. На фоне играет Серега Пират. На диване спит кошка Габри.<br>Толя: Так, обувь снимаем аккуратно! Кто насвинячит, заставлю полы с хлоркой пидорить! И музыку мою не переключать, йоу!<br>Егор: А ничо тот факт, что у тебя Серега Пират уже по пятому кругу играет?<br>Толя: А ничо, что это база жеж.<br>Серёга: <span class='shake'>Эщкере...</span><br>Влад: Салам! Где хавчик, чювачочек?<br>Алиса: Чаю, женщина!<br>Толя: Сама иди делай, женщина. Кухня прямо по коридору.",
        thoughts: "Ахах, база от Толи! Пидорить полы с хлоркой — это святое. А Серёга Пират реально задолбал.",
        onLoad: () => { setTimeout(() => openFakePopup("ВНИМАНИЕ! Обнаружена грязь. Запустить протокол 'Полы с хлоркой'?"), 3000); },
        choices: [ { text: "Пойти на кухню", nextScene: "scene3_sugar" } ]
    },
    "scene3_sugar": {
        text: "<span class='system-text'>Алиса идет на кухню. В шкафчике она находит заначку сахара.</span>",
        thoughts: "Толя меня убьет за этот сахар.",
        choices: [
            { text: "«Опа, сахар! Толя не обеднеет.»", nextScene: "scene3_monopoly", action: () => { state.items.push("Сахар"); playSound('item'); openFakePopup("Получен предмет: 🧊 Сахар"); } },
            { text: "«Не буду воровать у Толи.»", nextScene: "scene3_monopoly" }
        ]
    },
    "scene3_monopoly": {
        text: "<span class='system-text'>Спустя час. Все сидят на полу, играют в Монополию.</span><br><br>Алиса: Ну всё, Серёга, ты наступил на мой отель. Ты банкрот. С тебя водка.<br>Серёга: Да бля, у меня только на тёмный козел осталось...<br>Алиса: Тиш, тиш, Серёга, не плачь!<br>Влад: Вот такие вот дела, Серый. Ну-ка, Тиш чювачочек, не расстраивайся.",
        thoughts: "Бедный Серёжа, вечно я его банкрочу. Зато тёмный козел попьет.",
        choices: [
            { text: "«Да ладно вам, давайте я ему козла этого куплю.»", nextScene: "scene4", action: () => { state.mad -= 1; } },
            { text: "«Ага, и спляши нам еще, проигравший!»", nextScene: "scene4", action: () => { state.mad += 1; } },
            {
                text: "Попытаться купить Толю",
                condition: () => state.alko >= 1,
                nextScene: "scene4",
                action: () => { openFakePopup("Алиса кидает в Толю игровые деньги со словами: «Покупаю эту женщину!». Толя отвечает: «Ничо, что я тебя сейчас полы с хлоркой пидорить заставлю?»"); }
            }
        ]
    },
    "scene4": {
        text: "Следующий день. Бар 'Хуторок'. На столе куча пустых бокалов, Влад закидывает снюс, Алиса парит электронку.<br>Влад: Слушайте, пацаны... Я тут подумал. Мечта ведь так и не сбылась.<br>Егор: 'ZАЖИГАЛКА'?<br>Влад: Она самая, чювачочек.<br>Серёга: Да у вас вечно денег нет, какая 'Зажигалка'. Лицензия на Утопию распалась, так и не собрав на стрипуху.<br>Егор: Завались, Серый! Ты сам биты свои дед-инсайдовские пишешь, никто не слушает. А я вот вчера такой джей-рок инструментал накинул... ну, ноооорм вышло.<br>Толя: Тише, тише, киберспортсмены. Задолбали ссориться жеж. <br>Серёга: Алиса, ты почему в таком топике? Сестра, где твой хиджаб?<br>Алиса: В Питере оставила, блин).",
        thoughts: "Хуторок... Легендарное место. Ребята опять со своей Зажигалкой.",
        choices: [
            { text: "Самый крепкий шот в меню!", nextScene: "scene5", action: () => { state.alko+=1; state.mad+=1; } },
            { text: "Водочки мне.", nextScene: "scene5" },
            { text: "Сок, поддержу Толю.", nextScene: "scene5", action: () => { state.alko-=1; } },
            {
                text: "Предложить Егору станцевать тут",
                condition: () => state.alko >= 2,
                nextScene: "scene5",
                action: () => { openFakePopup("Серёга отбивает бит по столу, Егор снимает кофту, но бармен грозится всех выгнать."); }
            }
        ]
    },
    "scene5": {
        music: "bg_turbina",
        text: "Вечер того же дня. Набережная пляж. Играет ТурбинаТурист.<br>Влад: Чипичипи чапачапа дубидуби лавалава!<br>Егор: <span class='shake'>Мемл! Это жесткий мемл!</span><br>Алиса: Спорим на косарь, что я сейчас в Иртыш прыгну?<br>Толя: Ты ебанутая? А ничо тот факт, что там грязи больше, чем в твоем Питере за год выпадает.<br>Серёга: Тиш, тиш, Алиса, я бы на твоем месте не рисковал. Но посмотреть бы посмотрел.",
        thoughts: "Как же хочется реально прыгнуть в Иртыш сейчас.",
        choices: [
            { text: "Прыгнуть в воду в одежде!", nextScene: "scene6", action: () => { state.mad+=2; openFakePopup("Влад в шоке: 'Ашалеть, чювачочек дает!'"); } },
            { text: "Ну нафиг, реально грязно.", nextScene: "scene6", escape: true }, 
            {
                text: "Заявить, что Иртыш — это море",
                condition: () => state.alko >= 2,
                nextScene: "scene6",
                action: () => { state.mad+=2; openFakePopup("Алиса бежит к реке и орет «Чипичипи чапачапа!» в пустоту. Серёга: «Тише, тише, мы ее теряем»."); }
            }
        ]
    },
    "scene6": {
        text: "Третий день. Компания стоит на перепутье.<br>Егор: Так, народ. У Алисы завтра рейс. Как будем провожать?<br>Толя: Можно в Аквапарк погнать. Я потом вас в фотошопе на акул посажу.<br>Влад: Оу-у-у да, детка.<br>Егор: Или ко мне на дачу?",
        thoughts: "Блин, аквапарк или дача? На даче стопудов опять треш будет.",
        choices: [
            { text: "«Го в Аквапарк!»", nextScene: "scene7" },
            { text: "«А может на дачу к Егору? Шашлыки, природа...»", nextScene: "scene6_dacha" }
        ]
    },
	"scene6_dacha": {
        text: "Фон: Дача. Мангал, шашлыки. Егор играет на гитаре, Влад подпевает.<br>Егор: Я забыл купить алкашку!<br>Влад: Блять Егор, ничего нового.<br>Алиса: Тише, тише. Спокуха. Пойду посмотрю, что есть.<br><br><span class='system-text'>Алиса идет в старый сарай. В углу стоит дедовская канистра со спиртом.</span>",
        thoughts: "Егор и забыл алкашку. Назовите более культовый дуэт.",
        choices: [
            { text: "«Берём! То, что доктор прописал.»", nextScene: "scene6_craft", action: () => { state.items.push("Спирт"); playSound('item'); openFakePopup("Получен предмет: ⛽ Спирт"); } },
            { text: "«Ну нах, еще отравимся.»", nextScene: "scene6_craft" },
            {
                text: "Хлебнуть из канистры",
                nextScene: "scene6_vlad_deal"
            }
        ]
    },
    "scene6_vlad_deal": {
        text: "Влад: Пс-с-с, у меня есть то, что тебе нужно.<br><br>Алиса: Правда? А чего ты молчал, давай быстрее.<br><br>Влад: Не так быстро крошка, не всё так просто йоу.<br><br>Алиса: Ох-х-х-х, и что же ты хочешь? <i>(подходя ближе сказала Алиса)</i><br><br>Влад: Ты знаешь, как нужно это заслужить? <i>(улыбаясь и смотря вниз, произнёс Влад.)</i><br><br>Алиса: Догадываюсь <i>(заигрывающе произнесла Алиса.)</i><br><br><span class='system-text'>Алиса спустилась на колени, положила руки на таз Влада, расстегнула его ширинку на джинсах и начала работать своим нежным ротиком.</span>",
        thoughts: "Придётся вертеться, раз нормальных вариантов не осталось...",
        choices: [
            { 
                text: "Далее", 
                nextScene: "scene6_craft",
                action: () => {
                    if (!state.items.includes("Спирт")) {
                        state.items.push("Спирт");
                        playSound('item');
                        openFakePopup("Получен предмет: ⛽ Спирт от Влада");
                    }
                }
            }
        ]
    },
    "scene6_craft": {
        text: () => {
            const hasAll = state.items.includes("Лимон") && state.items.includes("Сахар") && state.items.includes("Спирт");
            if (hasAll) {
                return "Алиса: Лимон есть. Сахар есть. Спирт есть. Время крафтить!<br><br><span class='system-text'>Алиса успешно крафтит Лимончелло. Компания выпивает его. Экран темнеет. Алкошлюха в деле.</span>";
            } else if (state.alko >= 2) {
                return "Алиса: Пупупу... У меня не хватает ингредиентов…<br>Влад: Пс-с-с, у меня есть то, что тебе нужно.<br>Алиса: Правда? А чего ты молчал, давай быстрее.<br>Влад: Не так быстро крошка, не всё так просто йоу.<br>Алиса: Ох-х-х-х, и что же ты хочешь?<br>Влад: Ты знаешь, как нужно это заслужить?<br>Алиса: Догадываюсь...<br><br><span class='system-text'>[Дальше, что было вам знать нельзя, новела 16+] Получен последний предмет и было приготовлено Лимончелло!</span>";
            } else {
                return "Алиса: Пупупу... У меня не хватает ингредиентов…<br>Влад: Тиш чювачочек, ничего страшного. Значит, будем просто жрать шашлык.";
            }
        },
        thoughts: () => {
            const hasAll = state.items.includes("Лимон") && state.items.includes("Сахар") && state.items.includes("Спирт");
            if (hasAll) return "Лимончелло! Моя остановочка.";
            if (state.alko >= 2) return "О БОЖЕ ВЛАД ЧТО ЗА ХЕНТАЙ ПОШЕЛ АХАХАХА Я ВАС НЕНАВИЖУ";
            return "Без бухла на даче... Ну ладно, мясо поем.";
        },
        choices: [
            { 
                text: "Продолжить...", 
                action: () => {
                    const hasAll = state.items.includes("Лимон") && state.items.includes("Сахар") && state.items.includes("Спирт");
                    if (hasAll || state.alko >= 2) {
                        document.body.classList.add('glitch-bg');
                        setTimeout(() => handleSceneTransition({ nextScene: "secret_ending" }), 600);
                    } else {
                        handleSceneTransition({ nextScene: "scene7" });
                    }
                }
            }
        ]
    },
    "scene7": {
        text: () => {
            let end = "";
            if (state.mad > 3) end = "Отдохнула ахуенно, но не успела на самолёт, пришлось переносить рейс. Алиса в панике смотрит на красное табло.";
            else if (state.mad < 2) end = "Отдохнула так себе, но успела на самолёт. Грустная фотография — объятия перед зоной контроля.";
            else end = "Отдохнула ахуенно, что не захотела улетать. Алиса рвет билет на фоне друзей.";
            
            return "ФИНАЛьная локация: Аэропорт.<br>Толя: Ну что, Алиса. Вот и всё.<br>Серёга: Всё, больше никогда не увидимся.<br>Влад: Буду скучать, котик.<br><br><b>" + end + "</b>";
        },
        thoughts: "Блин... Аж грустно стало. Ребят, я вас так люблю.",
        choices: [{ text: "Смотреть титры", nextScene: "credits" }]
    },
    "secret_ending": {
        music: "bg_metal",
        text: "<span class='system-text'>Спустя год. Фон: Больничная палата.</span><br><br>Оказывается, что выпитое Лимончелло привело её к залёту от Влада.<br>Врач: Поздравляю, мамочка! Как назовёте ребенка?<br>Алиса: Блин, что-то Влад тогда говорил на даче...<br>",
        thoughts: "КАКОЙ ЗАЛЕТ ОТ ВЛАДА ВЫ ЧЕ ЕБАНУЛИСЬ АХАХАХАХ",
        onLoad: () => {
            const vid = document.getElementById('meme-video');
            vid.classList.remove('hidden'); vid.play();
            setTimeout(() => { vid.classList.add('hidden'); vid.pause(); }, 3000); 
        },
        choices: [
            { text: "Губка Камаро Ад-Дин Дибиайза", nextScene: "secret_credits" },
            { text: "Хальд Кашимири", nextScene: "secret_credits" },
            { text: "Хидир Каравита", nextScene: "secret_credits" },
            { text: "Измаил Ахмад Канабал", nextScene: "secret_credits" },
            { text: "Усман Абдул Джалил Сиша", nextScene: "secret_credits" },
            { text: "Мухаммад Сумбул", nextScene: "secret_credits" },
            { text: "Максим", nextScene: "secret_credits" }
        ]
    },
    "secret_credits": {
        text: "Алиса: Запишите... выбранное имя!<br>Врач: ...Ашалеть.<br><br><span class='system-text'>Экран резко чернеет. Врубается тяжелый хэви-метал рок.</span>",
        thoughts: "Ашалеть не то слово...",
        choices: [{ text: "Смотреть титры", action: () => { document.body.style.backgroundColor = "black"; renderScene("credits"); } }]
    },
    "credits": {
        text: "أناتولي دوداريف <b>Анатули Дудариф (Анатолий Дударев)</b><br>إيغور فورونينكو <b>Игхур Фурунинку (Егор Вороненко)</b><br>سيريوغا سيليزنيوف <b>Сирьога Силизниуф (Серёга Селезнёв)</b><br>فلاد سوروتشينسكي <b>Флад Сурутшински (Влад Сорочинский)</b><br>أليسا نيكيتينا <b>Алиса Никитина</b><br><br><b>THE HAPPY BIRTHDAY.</b>",
        thoughts: "Спасибо вам огромное, пацаны ❤️",
        choices: []
    }
};

// =========================================================================
// ДВИЖОК ОТРИСОВКИ СЦЕН
// =========================================================================
let typeInterval;
let titleGlitchInterval;

function handleSceneTransition(choice) {
    if (choice.action && !choice.isDeath) choice.action();
    if (choice.isDeath && !choice.action) {
        playSound('error');
        document.getElementById('main-window').classList.add('hidden');
        document.getElementById('fake-popup-msg').innerText = choice.deathMessage;
        document.getElementById('fake-popup').classList.remove('hidden');
        return;
    }
    if (choice.nextScene) {
        if (!triggerEncounter(choice.nextScene)) {
            renderScene(choice.nextScene);
        }
    }
}

function renderScene(sceneId) {
    playSound('click');
    const scene = scenes[sceneId];
    if (!scene) return;

    if (scene.music !== undefined) playMusic(scene.music);
    if (scene.onLoad) scene.onLoad();

    const container = document.getElementById('game-container');
    const choicesContainer = document.getElementById('choices');
    const titleBar = document.getElementById('window-title');
    const fisheye = document.getElementById('fisheye-overlay');

    document.getElementById('stat-alko').innerText = state.alko;
    document.getElementById('stat-mad').innerText = state.mad;
    let invEmojis = state.items.map(item => emojiMap[item]).join(" ");
    document.getElementById('stat-inv').innerText = invEmojis || "Пусто";

    document.body.className = '';
    const gameWin = document.getElementById('main-window');
    
    if (state.alko >= 3) document.body.classList.add('drunk-3');
    else if (state.alko >= 2) document.body.classList.add('drunk-2');
    else if (state.alko >= 1) document.body.classList.add('drunk-1');
    
    if (state.mad >= 2) {
        gameWin.classList.add('mad-glitch');
        fisheye.classList.add('fisheye-active');
        if (!titleGlitchInterval) {
            const glitchChars = "АЛИСА#$!@подарок%&*()_+><?";
            titleGlitchInterval = setInterval(() => {
                let glitched = "";
                for(let k=0; k<15; k++) glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                titleBar.innerText = glitched;
            }, 100);
        }
    } else {
        gameWin.classList.remove('mad-glitch');
        fisheye.classList.remove('fisheye-active');
        clearInterval(titleGlitchInterval);
        titleGlitchInterval = null;
        titleBar.innerText = "алиса_подарок.exe";
    }

    choicesContainer.innerHTML = '';
    clearInterval(typeInterval);

    // Скрываем мысли во время печати основного текста
    document.getElementById('alisa-dialogue-box').style.opacity = 0;
    
    let rawText = typeof scene.text === 'function' ? scene.text() : scene.text;
    let formattedText = formatText(rawText);
    container.innerHTML = "";
    let i = 0, isTag = false, currentHTML = "";

    typeInterval = setInterval(() => {
        if (i < formattedText.length) {
            let char = formattedText.charAt(i);
            currentHTML += char;
            if (char === '<') isTag = true;
            if (char === '>') isTag = false;
            if (!isTag) container.innerHTML = currentHTML;
            i++;
        } else {
            clearInterval(typeInterval);
            showChoices(scene);
            
            // Как только допечатался основной текст, показываем мысли Алисы
            if (scene.thoughts) {
                let thoughtsText = typeof scene.thoughts === 'function' ? scene.thoughts() : scene.thoughts;
                showAlisaThought(thoughtsText, false); 
            }
        }
    }, 15);
}

function showChoices(scene) {
    const choicesContainer = document.getElementById('choices');
    scene.choices.forEach((choice, index) => {
        if (choice.condition && !choice.condition()) return;

        const btn = document.createElement('button');
        btn.innerText = choice.text;
        
        if (choice.escape) {
            btn.classList.add('escaping-btn');
            btn.style.top = (index * 40) + "px";
            btn.onmouseover = () => {
                btn.style.top = Math.random() * 100 + "px";
                btn.style.left = Math.random() * 300 + "px";
            };
        }

        if (choice.action && choice.isDeath) {
            btn.onclick = () => { choice.action(); };
        } else if (choice.action && !choice.nextScene) {
            btn.onclick = () => { choice.action(); };
        } else {
            btn.onclick = () => { handleSceneTransition(choice); };
        }
        
        choicesContainer.appendChild(btn);
    });
    choicesContainer.classList.remove('hidden');
}

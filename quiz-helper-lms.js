// ==UserScript==
// @name         Quiz Helper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A helper tool for quizzes on lms.vinschool.edu.vn by Tran Quang Minh
// @match        https://lms.vinschool.edu.vn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

        const style = document.createElement('style');
    style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;700&display=swap');

    :root {
        --bg-color: #e0f7fa;
        --text-color: #006064;
        --primary-color: #00bcd4;
        --secondary-color: #b2ebf2;
        --border-color: #4dd0e1;
        --success-color: #26a69a;
        --error-color: #ef5350;
        --warning-color: #ffca28;
        --info-color: #29b6f6;
        --hover-color: #0097a7;
        --shadow-color: rgba(0, 188, 212, 0.2);
        --transition-speed: 0.4s;
        --glass-bg: rgba(255, 255, 255, 0.2);
        --glass-border: rgba(255, 255, 255, 0.4);
        --glass-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        --animation-duration: 0.5s;
    }

    .dark-mode {
        --bg-color: #263238;
        --text-color: #e0f7fa;
        --primary-color: #00bcd4;
        --secondary-color: #37474f;
        --border-color: #4dd0e1;
        --success-color: #26a69a;
        --error-color: #ef5350;
        --warning-color: #ffca28;
        --info-color: #29b6f6;
        --hover-color: #4dd0e1;
        --shadow-color: rgba(0, 188, 212, 0.2);
        --glass-bg: rgba(0, 0, 0, 0.2);
        --glass-border: rgba(0, 0, 0, 0.4);
        --glass-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    }

    body {
        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: 'Comfortaa', cursive;
        line-height: 1.6;
        transition: all var(--transition-speed);
        font-size: 18px;
    }

    #welcomeScreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #bfddd9, #bfddd9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        animation: fadeOut 0.8s ease-out 4s forwards;
    }

    #welcomeContent {
        text-align: center;
        color: white;
        font-size: 2.5rem;
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; visibility: hidden; }
    }

    #welcomeIcon {
        width: 300px;
        height: 300px;
        display: block;
        margin: 0 auto 20px;
    }

    #keyPrompt {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #282c34;
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
    }

    #keyContent {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #keyInput {
        padding: 10px;
        font-size: 16px;
        margin: 10px 0;
    }

    #submitKeyButton {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #61dafb;
        border: none;
        cursor: pointer;
    }

    #submitKeyButton:hover {
        background-color: #21a1f1;
    }

    #quizHelperMenu {
        position: fixed;
        top: 20px;
        left: 20px;
        width: 340px;
        background: var(--glass-bg);
        border-radius: 30px;
        box-shadow: var(--glass-shadow);
        overflow: hidden;
        transition: all var(--transition-speed);
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
        backdrop-filter: blur(10px);
        border: 1px solid var(--glass-border);
        animation: slideInAndGlow var(--animation-duration) ease-out;
    }

    @keyframes slideInAndGlow {
    0% {
        transform: translateX(-100%);
        box-shadow: 0 0 0 rgba(0, 188, 212, 0);
    }
    70% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(0);
        box-shadow: 0 0 20px rgba(0, 188, 212, 0.6);
    }
}

    @keyframes slideIn {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }

    #menuHeader {
        background-color: var(--primary-color);
        color: white;
        padding: 20px;
        font-weight: bold;
        font-size: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
        border-bottom: 4px solid var(--border-color);
    }

    #minimizeButton, #helpButton {
        background: none;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        transition: transform var(--transition-speed);
        padding: 5px;
    }

    #minimizeButton:hover, #helpButton:hover {
        transform: scale(1.1) rotate(5deg);
    }

    #menuContent {
        padding: 24px;
        max-height: 450px;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--primary-color) var(--secondary-color);
    }

    .section {
        margin-bottom: 28px;
        animation: fadeIn 0.5s ease-out;
          animation: fadeInUp var(--animation-duration) ease-out;
    }

    @keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .section-title {
        font-weight: 600;
        margin-bottom: 14px;
        color: var(--primary-color);
        font-size: 22px;
        text-shadow: 1px 1px 2px var(--shadow-color);
    }

    button {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 12px 18px;
        border-radius: 50px;
        cursor: pointer;
        transition: all var(--transition-speed);
        font-size: 16px;
        font-weight: 500;
        margin-right: 12px;
        margin-bottom: 12px;
        box-shadow: 0 4px 6px var(--shadow-color);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-speed), transform 0.1s;
    }

    button:hover {
        background-color: var(--hover-color);
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 6px 8px var(--shadow-color);
        animation: buttonPulse 1s infinite;
    }

    button:active {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px var(--shadow-color);
    }

    button .emoji {
        margin-right: 8px;
        font-size: 1.2em;
    }

    @keyframes buttonPulse {
    0% {
        box-shadow: 0 0 0 0 var(--primary-color);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(0, 188, 212, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(0, 188, 212, 0);
    }
}

    input[type="text"], input[type="number"] {
        width: 100%;
        padding: 12px;
        margin-bottom: 12px;
        border: 2px solid var(--border-color);
        border-radius: 50px;
        font-size: 16px;
        transition: all var(--transition-speed);
        background-color: var(--secondary-color);
        color: var(--text-color);
    }

    input[type="text"]:focus, input[type="number"]:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px var(--shadow-color);
        outline: none;
        animation: inputGlow 1.5s infinite alternate;
    }

    @keyframes inputGlow {
    from {
        box-shadow: 0 0 5px var(--primary-color);
    }
    to {
        box-shadow: 0 0 20px var(--primary-color);
    }
}

    #extractionPopup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--bg-color);
        padding: 28px;
        border-radius: 30px;
        box-shadow: 0 10px 30px var(--shadow-color);
        z-index: 10001;
        max-width: 80%;
        max-height: 80%;
        overflow-y: auto;
        display: none;
        opacity: 1;
        transition: all var(--transition-speed);
         animation: zoomIn var(--animation-duration) ease-out;
    }

    @keyframes zoomIn {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}


    #extractionPopup h2 {
        color: var(--primary-color);
        margin-bottom: 20px;
        font-size: 28px;
        text-align: center;
    }

    #extractionContent {
        white-space: pre-wrap;
        margin-bottom: 20px;
        line-height: 1.7;
        font-size: 18px;
        background-color: var(--secondary-color);
        padding: 20px;
        border-radius: 20px;
    }

    #toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100%);
        background-color: var(--primary-color);
        color: white;
        padding: 14px 28px;
        border-radius: 50px;
        opacity: 0;
        transition: all var(--transition-speed);
        font-size: 18px;
        box-shadow: 0 4px 12px var(--shadow-color);
    }

    #toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
         animation: toastSlideUp var(--animation-duration) ease-out, toastFadeOut 0.5s ease-out 2.5s forwards;
    }

    @keyframes toastSlideUp {
    from {
        transform: translateX(-50%) translateY(100%);
    }
    to {
        transform: translateX(-50%) translateY(0);
    }
}

@keyframes toastFadeOut {
    to {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    }
}

    .selected-answer {
        background-color: var(--success-color);
        color: white;
        padding: 8px 12px;
        border-radius: 50px;
        transition: all var(--transition-speed);
        font-weight: bold;
        animation: answerPop 0.3s ease-out;
    }

    @keyframes answerPop {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

    /* Wave animation styles */
    .ocean {
        height: 5%;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #4dd0e1;
    }

    .wave {
        background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg) repeat-x;
        position: absolute;
        bottom: -10px;
        width: 6400px;
        height: 198px;
        animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
        transform: translate3d(0, 0, 0);
    }

    .wave:nth-of-type(2) {
        bottom: -15px;
        animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -.125s infinite, swell 7s ease -1.25s infinite;
        opacity: 1;
    }

    @keyframes wave {
        0% { margin-left: 0; }
        100% { margin-left: -1600px; }
    }

    @keyframes swell {
        0%, 100% { transform: translate3d(0, -25px, 0); }
        50% { transform: translate3d(0, 5px, 0); }
    }

    #timerDisplay {
        font-size: 24px;
        font-weight: bold;
        color: var(--primary-color);
        text-align: center;
        margin-top: 10px;
        animation: timerPulse 2s infinite;
    }

    @keyframes timerPulse {
    0%, 100% {
        transform: scale(1);
        text-shadow: 0 0 5px rgba(0, 188, 212, 0.5);
    }
    50% {
        transform: scale(1.05);
        text-shadow: 0 0 15px rgba(0, 188, 212, 0.8);
    }
}

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .cool-checkbox {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .cool-checkbox input[type="checkbox"] {
        display: none;
    }

    .cool-checkbox label {
        padding-left: 30px;
        position: relative;
        cursor: pointer;
    }

    .cool-checkbox label:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 4px;
         transition: all var(--transition-speed), transform 0.1s;

    }

    .cool-checkbox input[type="checkbox"]:checked + label:before {
        background-color: var(--primary-color);
        animation: checkboxPop 0.3s ease-out;
    }

    .cool-checkbox label:after {
        content: '✔';
        position: absolute;
        top: -1px;
        left: 5px;
        font-size: 16px;
        color: white;
        transition: all var(--transition-speed);
        opacity: 0;
    }

    .cool-checkbox input[type="checkbox"]:checked + label:after {
        opacity: 1;
    }

    @keyframes checkboxPop {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
    `;
    document.head.appendChild(style);

// Function to check if welcome screen should be shown
function shouldShowWelcomeScreen() {
    const lastShown = localStorage.getItem('welcomeScreenLastShown');
    const now = new Date().toDateString();

    if (!lastShown || lastShown !== now) {
        localStorage.setItem('welcomeScreenLastShown', now);
        return true;
    }
    return false;
}

// Create welcome screen
const welcomeScreen = document.createElement('div');
welcomeScreen.id = 'welcomeScreen';
welcomeScreen.innerHTML = `
    <div id="welcomeContent">
        <img src="https://th.bing.com/th/id/OIG1.X_jd7pPvgBsjO5QX7DYI?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Quiz Helper Icon" id="welcomeIcon">
        <h1>🏖️ Yo! Chào mừng đến với Quiz Helper</h1>
        <p>Người bạn đồng hành siêu chill cho mọi bài kiểm tra</p>
        <p>Hãy thư giãn và để chúng tôi lo phần còn lại 😎✌️</p>
    </div>
    <div class="ocean">
        <div class="wave"></div>
        <div class="wave"></div>
    </div>
`;

// Only append the welcome screen if it should be shown
if (shouldShowWelcomeScreen()) {
    document.body.appendChild(welcomeScreen);

    // Optionally, add a function to close the welcome screen
    function closeWelcomeScreen() {
        welcomeScreen.style.display = 'none';
    }

    // You can call closeWelcomeScreen() after a delay or add a close button
    // For example, to close after 5 seconds:
    // setTimeout(closeWelcomeScreen, 5000);
}

// Create menu
const menu = document.createElement('div');
menu.id = 'quizHelperMenu';
menu.style.display = 'none'; // Initially hide the menu
menu.innerHTML = `
    <div id="menuHeader">
        <span>📚 Trợ Thủ Đột Nhập</span>
        <button id="minimizeButton" aria-label="Thu Gọn">_</button>
    </div>
    <div id="menuContent">
        <div class="section">
            <div class="section-title">Hành Động</div>
            <button id="extractButton">📋 Khai Thác Dữ Liệu</button>
            <button id="autoAnswerButton">🎲 Chọn Đáp Án (Random)</button>
            <button id="autoSubmitToggle">🚀 Toggle Auto-Submit</button>
        </div>
        <div class="section">
            <div class="section-title">Lựa Chọn Mã Đáp Ứng</div>
            <input id="answersInput" type="text" placeholder="Nhập mã đáp ứng, phân tách bằng dấu chấm phẩy">
            <button id="selectAnswersButton">✅ Chọn Đáp Án (Dựa Vào Input)</button>
            <button id="saveAnswersButton">💾 Lưu Trữ Mã</button>
            <button id="loadAnswersButton">📂 Nạp Mã</button>
            <button id="highlightAnswersButton">🖍️ Highlight Answers</button>
            <button id="analyzeAnswersButton">📊 Analyze Answers</button>
        </div>
        <div class="section">
            <div class="section-title">Cài Đặt</div>
            <button id="toggleThemeButton">🌓 Chuyển Đổi Giao Diện</button>
        </div>
        <div class="section">
            <div class="section-title">Đồng Hồ Đếm Ngược</div>
            <input id="timerInput" type="number" min="1" max="180" placeholder="Nhập số phút">
            <button id="startTimerButton">▶️ Kích Hoạt Đồng Hồ</button>
            <div id="timerDisplay">0:00</div>
        </div>
        <div class="section">
            <div class="section-title">Nhạc</div>
            <button id="playMusicButton">🎵 Play Music</button>
            <button id="pauseMusicButton">⏸️ Pause Music</button>
            <div>
                <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value="1">
                <label for="volumeSlider">Volume</label>
            </div>
            <div id="currentTrack" style="display:none;">Đang phát: <span id="trackInfo"></span></div>
        </div>
        <div class="section">
            <div class="section-title">Giải Trí</div>
            <button id="openGithubButton">🌐 Blooket Cheat GUI</button>
        </div>
        <div class="section">
            <div class="section-title">Farm</div>
            <div>
                <input type="checkbox" id="farmRandom">
                <label for="farmRandom">Farm Random</label>
            </div>
            <div>
                <input type="checkbox" id="farmInput">
                <label for="farmInput">Farm Dựa vào Input</label>
            </div>
                <label for="iterationsInput">Số Lần Farm:</label>
                <input type="number" id="iterationsInput" min="1" value="10">
            <button id="startFarmButton" class="btn btn-primary">Bắt đầu Farm</button>
        </div>
    </div>
`;
document.body.appendChild(menu);

// Auto-Submit Feature
let autoSubmitEnabled = false;

document.getElementById('autoSubmitToggle').addEventListener('click', () => {
    autoSubmitEnabled = !autoSubmitEnabled;
    alert(`Auto-Submit is now ${autoSubmitEnabled ? 'ENABLED' : 'DISABLED'}`);
    if (autoSubmitEnabled) {
        enableAutoSubmit();
    } else {
        disableAutoSubmit();
    }
});

function enableAutoSubmit() {
    // Set up a MutationObserver to observe changes in the document
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && autoSubmitEnabled) {
                const submitButton = document.querySelector('.btn.submit_button.quiz_submit.btn-primary');
                if (submitButton) {
                    submitButton.click();
                }
            }
        }
    });

    // Start observing the document body for child node changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Store the observer so we can disconnect it later
    document.autoSubmitObserver = observer;
}

function disableAutoSubmit() {
    // Disconnect the MutationObserver if it exists
    if (document.autoSubmitObserver) {
        document.autoSubmitObserver.disconnect();
        document.autoSubmitObserver = null;
    }
}

// Add functionality to the GitHub button
document.getElementById('openGithubButton').addEventListener('click', () => {
    window.open("https://github.com/swagging-post/Blooket-Cheat-GUI-aka-Swaggers-GUI/blob/main/cheats/gui/gui.js", '_blank');
});

// Add event listeners
let audio;
const playMusicButton = document.getElementById('playMusicButton');
const pauseMusicButton = document.getElementById('pauseMusicButton');
const volumeSlider = document.getElementById('volumeSlider');
const trackInfo = document.getElementById('trackInfo');
const currentTrack = document.getElementById('currentTrack');

playMusicButton.addEventListener('click', () => {
    if (!audio) {
        audio = new Audio('https://dn720307.ca.archive.org/0/items/secret-garden-songs-from-a-secret-garden/03.%20Song%20from%20a%20Secret%20Garden.mp3');
        audio.addEventListener('loadedmetadata', () => {
            trackInfo.textContent = `Song from a Secret Garden - ${audio.duration.toFixed(2)}s`;
            currentTrack.style.display = 'block';
        });
    }
    audio.play();
});

pauseMusicButton.addEventListener('click', () => {
    if (audio) {
        audio.pause();
    }
});

volumeSlider.addEventListener('input', (e) => {
    if (audio) {
        audio.volume = e.target.value;
    }
});

// Show welcome screen for a while then show menu
setTimeout(() => {
    welcomeScreen.style.display = 'none';
    showMenu();
}, 4000); // 4000ms = 4s (welcome duration)

function showMenu() {
    const menu = document.getElementById('quizHelperMenu');
    menu.style.display = 'block';
    menu.style.animation = 'fadeIn 0.5s ease-out';
}

// Matrix effect in console
function runMatrix() {
    const columns = Math.floor(window.innerWidth / 10);
    const drops = Array(columns).fill(0);
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    console.clear();

    function drawMatrix() {
        let output = '';
        for (let i = 0; i < drops.length; i++) {
            const char = characters.charAt(Math.floor(Math.random() * characters.length));
            output += `%c${char} `;

            drops[i]++;

            if (drops[i] * 10 > window.innerHeight) {
                drops[i] = 0;
            }
        }
        console.log(output, 'color: lime;');
    }

    setInterval(drawMatrix, 100);
}

// Run matrix effect
runMatrix();

// Show the menu after the welcome animation
setTimeout(() => {
    menu.style.display = 'block';
    menu.style.animation = 'fadeIn 0.5s ease-out';
}); // 4000ms = 3s (welcome duration) + 0.5s (fade out) + 0.5s (buffer)

// Create extraction popup
const popup = document.createElement('div');
popup.id = 'extractionPopup';
popup.innerHTML = `
     <h2>Câu Hỏi Đã Khai Thác</h2>
    <div id="extractionContent"></div>
    <button id="copyButton">📋 Sao Chép vào Bộ Nhớ Tạm</button>
    <button id="closeButton">❌ Đóng</button>
`;
document.body.appendChild(popup);

// Create toast notification
const toast = document.createElement('div');
toast.id = 'toast';
document.body.appendChild(toast);

// Drag functionality
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let lastTime = 0;
let velocity = { x: 0, y: 0 };

const menuHeader = document.getElementById('menuHeader');
menuHeader.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    if (e.target === menuHeader) {
        isDragging = true;
        lastTime = performance.now();
        menu.style.transition = 'none';
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        const currentTime = performance.now();
        const dt = (currentTime - lastTime) / 1000; // delta time in seconds

        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        // Calculate velocity
        velocity.x = (currentX - xOffset) / dt;
        velocity.y = (currentY - yOffset) / dt;

        xOffset = currentX;
        yOffset = currentY;

        requestAnimationFrame(() => setTranslate(currentX, currentY, menu));

        lastTime = currentTime;
    }
}

function dragEnd(e) {
    isDragging = false;
    applyMomentum();
}

function applyMomentum() {
    const friction = 0.95;
    let animating = true;

    function momentumLoop() {
        if (!animating) return;

        velocity.x *= friction;
        velocity.y *= friction;

        xOffset += velocity.x * 0.016; // Assuming 60fps (1/60 ≈ 0.016)
        yOffset += velocity.y * 0.016;

        // Apply bounds
        const bounds = menu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        xOffset = Math.max(0, Math.min(xOffset, viewportWidth - bounds.width));
        yOffset = Math.max(0, Math.min(yOffset, viewportHeight - bounds.height));

        setTranslate(xOffset, yOffset, menu);

        if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
            requestAnimationFrame(momentumLoop);
        } else {
            animating = false;
            menu.style.transition = 'transform 0.3s ease-out';
        }
    }

    requestAnimationFrame(momentumLoop);
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

// Main functionality
function extractQuizAnswers() {
    let quizText = '';

    setTimeout(() => {
        const questionElements = document.querySelectorAll('.question, .question-container, .quiz-item');

        if (questionElements.length === 0) {
            alert('Failed to extract questions. Please try again.');
            return;
        }

        questionElements.forEach((questionElement, index) => {
            let questionText = questionElement.querySelector('.question_text') ? questionElement.querySelector('.question_text').innerText : '';
            quizText += `Câu hỏi ${index + 1}: ${questionText}\n`;
            questionElement.querySelectorAll('.answer, .answer-text, .option').forEach((answerElement, answerIndex) => {
                let answerText = answerElement.innerText;
                quizText += `Đáp án ${answerIndex + 1}: ${answerText}\n`;
            });
            quizText += '\n'; // Thêm một dòng trống giữa các câu hỏi
        });

        displayExtractionPopup(quizText);
    }, 1000); // Đợi 1 giây để đảm bảo rằng tất cả các câu hỏi đã được tải xong
}

function displayExtractionPopup(quizText) {
    const extractionContent = document.getElementById('extractionContent');
    const extractionPopup = document.getElementById('extractionPopup');

    if (!extractionContent || !extractionPopup) {
        alert('Failed to display extraction popup. Please try again.');
        return;
    }

    extractionContent.textContent = quizText;
    extractionPopup.style.display = 'block';
}

function selectCorrectAnswers(correctAnswers) {
    try {
        const questionElements = document.querySelectorAll('.question, .question-container, .quiz-item');
        let answerIndex = 0;
        questionElements.forEach((element) => {
            if (isMatchingQuestion(element)) {
                handleMatchingQuestionSelection(element, correctAnswers.slice(answerIndex));
                answerIndex += getMatchingPairsCount(element);
            } else if (isFillInTheBlankQuestion(element)) {
                const blankCount = handleFillInTheBlankQuestion(element, correctAnswers.slice(answerIndex));
                answerIndex += blankCount;
            } else {
                const answer = correctAnswers[answerIndex++];
                if (answer) {
                    selectMultipleChoiceAnswer(element, answer);
                }
            }
        });
        showToast('Answers selected successfully!');
    } catch (error) {
        handleError(error, 'Failed to select answers. Please try again.');
    }
}

function isMatchingQuestion(element) {
    return element.querySelectorAll('select').length > 0;
}

function isFillInTheBlankQuestion(element) {
    return element.querySelectorAll('input[type="text"]').length > 0;
}

function getMatchingPairsCount(element) {
    return element.querySelectorAll('select').length;
}

function handleMatchingQuestionSelection(element, answers) {
    const selects = element.querySelectorAll('select');
    selects.forEach((select, index) => {
        if (index < answers.length) {
            const answer = answers[index].trim().toLowerCase();
            const option = Array.from(select.options).find(opt =>
                opt.text.trim().toLowerCase().includes(answer) ||
                answer.includes(opt.text.trim().toLowerCase())
            );
            if (option) {
                select.value = option.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    });
}

function handleFillInTheBlankQuestion(element, answers) {
    const inputs = element.querySelectorAll('input[type="text"]');
    inputs.forEach((input, index) => {
        if (index < answers.length) {
            input.value = answers[index];
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    return inputs.length; // Return the number of blanks filled
}

function selectMultipleChoiceAnswer(element, answer) {
    const answerElements = Array.from(element.querySelectorAll('input[type="radio"], input[type="checkbox"], .answer-choice, .mcq-option, div[role="radio"], div[role="checkbox"], label'));
    const matchingAnswer = answerElements.find(a => a.innerText.trim().toLowerCase().includes(answer.toLowerCase()));
    if (matchingAnswer) {
        matchingAnswer.click();
        matchingAnswer.classList.add('selected-answer');
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function handleError(error, message) {
    console.error(error);
    showToast(message);
}

function autoAnswerRandom() {
    try {
        const questionElements = document.querySelectorAll('.question, .question-container, .quiz-item');
        questionElements.forEach(element => {
            if (isMatchingQuestion(element)) {
                handleMatchingQuestionRandom(element);
            } else {
                selectRandomMultipleChoiceAnswer(element);
            }
        });
        showToast('Random answers selected for all questions!');
    } catch (error) {
        handleError(error, 'Failed to select random answers. Please try again.');
    }
}

function handleMatchingQuestionRandom(element) {
    const selects = element.querySelectorAll('select');
    selects.forEach(select => {
        const options = Array.from(select.options).filter(option => option.value !== '');
        if (options.length > 0) {
            const randomOption = options[Math.floor(Math.random() * options.length)];
            select.value = randomOption.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
}

function selectRandomMultipleChoiceAnswer(element) {
    const answers = Array.from(element.querySelectorAll('input[type="radio"], input[type="checkbox"], .answer-choice, .mcq-option'));
    if (answers.length > 0) {
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        randomAnswer.click();
        randomAnswer.classList.add('selected-answer');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('quizHelperDarkMode', isDarkMode);
    showToast(`${isDarkMode ? 'Dark' : 'Light'} mode enabled`);
}

function toggleMinimize() {
    const menuContent = document.getElementById('menuContent');
    const minimizeButton = document.getElementById('minimizeButton');
    if (menuContent.style.display === 'none') {
        menuContent.style.display = 'block';
        minimizeButton.textContent = '_';
        minimizeButton.setAttribute('aria-label', 'Minimize');
    } else {
        menuContent.style.display = 'none';
        minimizeButton.textContent = '□';
        minimizeButton.setAttribute('aria-label', 'Maximize');
    }
}

// New functionality for saving and loading answers
function saveAnswers() {
    const answers = document.getElementById('answersInput').value;
    const blob = new Blob([answers], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'quiz_answers.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Answers saved and downloaded successfully!');

    // Also save to localStorage for auto-loading
    localStorage.setItem('quizHelperAnswers', answers);
}

function loadAnswers() {
    const savedAnswers = localStorage.getItem('quizHelperAnswers');
    if (savedAnswers) {
        document.getElementById('answersInput').value = savedAnswers;
        showToast('Answers loaded successfully!');
    } else {
        showToast('No saved answers found.');
    }
}

// Timer functionality
let timerInterval;
let timeLeft = 0;

function startTimer(duration) {
    clearInterval(timerInterval);
    timeLeft = duration * 60;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showToast('Time\'s up!');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timerDisplay').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Answer highlighting
function highlightAnswers() {
    const answers = document.getElementById('answersInput').value.split(';').map(answer => answer.trim().toLowerCase());
    const questionElements = document.querySelectorAll('.question, .question-container, .quiz-item');

    questionElements.forEach((element) => {
        const answerElements = element.querySelectorAll('.answer, .answer-text, .option');
        answerElements.forEach((answerElement) => {
            const answerText = answerElement.innerText.trim().toLowerCase();
            if (answers.some(answer => answerText.includes(answer))) {
                answerElement.style.backgroundColor = 'yellow';
                answerElement.style.fontWeight = 'bold';
            }
        });
    });

    showToast('Answers highlighted!');
}

// Answer frequency analysis
function analyzeAnswerFrequency() {
    const questionElements = document.querySelectorAll('.question, .question-container, .quiz-item');
    const frequencyMap = new Map();

    questionElements.forEach((element) => {
        const selectedAnswer = element.querySelector('input:checked, select option:checked');
        if (selectedAnswer) {
            const answerText = selectedAnswer.value || selectedAnswer.textContent.trim();
            frequencyMap.set(answerText, (frequencyMap.get(answerText) || 0) + 1);
        }
    });

    let analysisText = 'Answer Frequency Analysis:\n\n';
    for (const [answer, frequency] of frequencyMap.entries()) {
        analysisText += `${answer}: ${frequency} time(s)\n`;
    }

    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.border = '1px solid black';
    popup.style.zIndex = '10000';
    popup.innerHTML = `<h3>Answer Frequency Analysis</h3><pre>${analysisText}</pre><button id="closeAnalysis">Close</button>`;

    document.body.appendChild(popup);

    document.getElementById('closeAnalysis').addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

// Farm functionality
let isFarming = false;
let farmCount = 0;
let totalIterations = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    // Load saved selections from localStorage
    const savedFarmRandom = localStorage.getItem('farmRandom') === 'true';
    const savedFarmInput = localStorage.getItem('farmInput') === 'true';
    const savedTotalIterations = localStorage.getItem('totalIterations');
    const savedFarmCount = localStorage.getItem('farmCount');

    if (savedFarmRandom || savedFarmInput) {
        document.getElementById('farmRandom').checked = savedFarmRandom;
        document.getElementById('farmInput').checked = savedFarmInput;
    }

    if (savedTotalIterations) {
        document.getElementById('iterationsInput').value = savedTotalIterations;
        totalIterations = parseInt(savedTotalIterations);
    }

    if (savedFarmCount) {
        farmCount = parseInt(savedFarmCount);
    }

    // Add event listeners to save selections when they change
    document.getElementById('farmRandom').addEventListener('change', (event) => {
        localStorage.setItem('farmRandom', event.target.checked);
    });
    document.getElementById('farmInput').addEventListener('change', (event) => {
        localStorage.setItem('farmInput', event.target.checked);
    });
    document.getElementById('iterationsInput').addEventListener('change', (event) => {
        localStorage.setItem('totalIterations', event.target.value);
    });

    // Start farming automatically after a delay to ensure page is fully loaded
    setTimeout(startFarming, 3000);
});

function startFarming() {
    const farmRandom = document.getElementById('farmRandom').checked;
    const farmInput = document.getElementById('farmInput').checked;

    if (!farmRandom && !farmInput) {
        showToast('Please select at least one farming method!');
        return;
    }

    totalIterations = parseInt(document.getElementById('iterationsInput').value) || Infinity;
    localStorage.setItem('totalIterations', totalIterations);

    isFarming = true;
    farmStep();
}

function farmStep() {
    if (!isFarming) return;

    if (farmCount >= totalIterations && totalIterations !== Infinity) {
        stopFarming();
        return;
    }

    // Check if we're on the menu page or quiz page
    const primaryButton = document.querySelector('.btn.btn-primary');
    if (primaryButton) {
        // We're on the menu page, start a new quiz
        primaryButton.click();
        // Wait for 1 second before handling the quiz page
        setTimeout(handleQuizPage, 500);
    } else {
        // We might be on the quiz page already
        handleQuizPage();
    }
}

function handleQuizPage() {
    const farmRandom = document.getElementById('farmRandom').checked;
    const farmInput = document.getElementById('farmInput').checked;

    if (farmRandom) {
        autoAnswerRandom();
    } else if (farmInput) {
        const answers = document.getElementById('answersInput').value;
        if (answers) {
            const answersArray = answers.split(';').map(answer => answer.trim());
            selectCorrectAnswers(answersArray);
        } else {
            showToast('Please enter answers for input-based farming.');
            stopFarming();
            return;
        }
    }

    // Submit the quiz
    const submitButton = document.querySelector('.btn.submit_button.quiz_submit.btn-primary');
    if (submitButton) {
        submitButton.click();
        farmCount++;
        localStorage.setItem('farmCount', farmCount);

        // Wait for 1 second before continuing to the next step
        setTimeout(farmStep, 500);
    } else {
        showToast('Submit button not found. Reloading page.');
        setTimeout(() => location.reload(), 500);
    }
}

function stopFarming() {
    isFarming = false;
    localStorage.removeItem('farmCount');
    showToast('Farming stopped!');
}

// Add this function to handle visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && isFarming) {
        // When the page becomes visible again, wait for 1 second before continuing farming
        setTimeout(farmStep, 1000);
    }
});

// Add emergency stop button
const emergencyStopButton = document.createElement('button');
emergencyStopButton.textContent = 'Emergency Stop';
emergencyStopButton.style.position = 'fixed';
emergencyStopButton.style.top = '10px';
emergencyStopButton.style.right = '10px';
emergencyStopButton.style.zIndex = '9999';
emergencyStopButton.addEventListener('click', function() {
    stopFarming();
    localStorage.clear();
    showToast('Emergency stop executed. All farming data cleared.');
});
document.body.appendChild(emergencyStopButton);

// Event listeners
document.getElementById('extractButton').addEventListener('click', extractQuizAnswers);
document.getElementById('selectAnswersButton').addEventListener('click', () => {
    const answers = document.getElementById('answersInput').value;
    if (answers) {
        const answersArray = answers.split(';').map(answer => answer.trim());
        selectCorrectAnswers(answersArray);
    } else {
        showToast('Please enter answers before selecting.');
    }
});
document.getElementById('autoAnswerButton').addEventListener('click', autoAnswerRandom);
document.getElementById('toggleThemeButton').addEventListener('click', toggleTheme);
document.getElementById('minimizeButton').addEventListener('click', toggleMinimize);
document.getElementById('saveAnswersButton').addEventListener('click', saveAnswers);
document.getElementById('loadAnswersButton').addEventListener('click', loadAnswers);
document.getElementById('startTimerButton').addEventListener('click', () => {
    const duration = parseInt(document.getElementById('timerInput').value);
    if (duration > 0) {
        startTimer(duration);
    } else {
        showToast('Please enter a valid duration.');
    }
});
document.getElementById('highlightAnswersButton').addEventListener('click', highlightAnswers);
document.getElementById('analyzeAnswersButton').addEventListener('click', analyzeAnswerFrequency);
document.getElementById('startFarmButton').addEventListener('click', () => {
    if (isFarming) {
        stopFarming();
    } else {
        startFarming();
    }
});

const answersInput = document.getElementById('answersInput');
answersInput.addEventListener('paste', (e) => {
    e.stopPropagation();
});

document.getElementById('copyButton').addEventListener('click', () => {
    const content = document.getElementById('extractionContent').textContent;
    const instruction = "\n\nĐối với câu hỏi trắc nghiệm, liệt kê các đáp án đúng phân tách bằng dấu chấm phẩy (;). Với câu hỏi định nghĩa, cung cấp câu trả lời theo định dạng 'định nghĩa', mỗi cặp phân tách bằng dấu chấm phẩy (;). Ví dụ: a; b; c; nghĩa1; nghĩa2; nghĩa3.Đối với hơn 1 câu hỏi, hãy ghi liên tục các đáp án của các câu hỏi với nhau!";
    navigator.clipboard.writeText(content + instruction).then(() => {
        showToast('Content copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        showToast('Failed to copy content. Please try again.');
    });
});

document.getElementById('closeButton').addEventListener('click', () => {
    document.getElementById('extractionPopup').style.display = 'none';
});

// Keyboard shortcut functionality
document.addEventListener('keydown', function(event) {
    // Ctrl + Q to toggle menu visibility
    if (event.ctrlKey && event.key === 'q') {
        event.preventDefault();
        const menu = document.getElementById('quizHelperMenu');
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        showToast(menu.style.display === 'none' ? 'Quiz Helper hidden' : 'Quiz Helper opened');
    }
});

// Initialize theme
const savedTheme = localStorage.getItem('quizHelperDarkMode');
if (savedTheme === 'true') {
    document.body.classList.add('dark-mode');
}

// Accessibility improvements
function improveAccessibility() {
    const menu = document.getElementById('quizHelperMenu');
    menu.setAttribute('role', 'region');
    menu.setAttribute('aria-label', 'Quiz Helper Menu');

    const buttons = menu.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });

    const input = document.getElementById('answersInput');
    input.setAttribute('aria-label', 'Enter correct answers');
}

// Call accessibility improvements
improveAccessibility();

// Auto-load answers when the script runs
loadAnswers();

console.log('Quiz Helper initialized successfully!');


})();

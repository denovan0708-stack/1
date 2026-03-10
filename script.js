// ============================= 
// 1. WATER RIPPLE LOGIC (FOR DESIGNS)
// ============================= 
const container = document.getElementById("countdown-container");
function moveEffect(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    container.style.setProperty('--cursor-x', x + 'px');
    container.style.setProperty('--cursor-y', y + 'px');
}
window.addEventListener('mousemove', moveEffect);
window.addEventListener('touchmove', moveEffect, { passive: true });

// ============================= 
// 2. COUNTDOWN SYSTEM
// ============================= 
const targetDate = new Date("March 10, 2026 14:35:00").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(timer);
        container.style.opacity = "0";
        setTimeout(() => {
            container.style.display = "none";
            document.getElementById("page").style.display = "flex";
            window.removeEventListener('mousemove', moveEffect);
        }, 1500);
        return;
    }

    const d = Math.floor(diff / (86400000));
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById("days").innerText = d.toString().padStart(2, '0');
    document.getElementById("hours").innerText = h.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
}, 1000);

// ============================= 
// 3. STORY LOGIC
// ============================= 
const textEl = document.getElementById("text");
const gift = document.getElementById("gift-icon");
const story = [
    "Hey, Vallen.", "I made something for you.",
    "There are so many days in a lifetime...", "but this one matters a little more.",
    "Because exactly <b>21 years ago</b>,<br>someone special was born.",
    "Someone named<br><b>Vallen Kalonia</b>.", "And today… we celebrate you.",
    "Happy Birthday, Vallen.", "I'm really glad you exist.",
    "The world became a little brighter<br>the day you were born.",
    "Make a wish.", "Blow the candle.",
    "I hope this year brings you even more happiness,<br>beautiful memories, and everything you deserve.",
    "And that life surprises you<br>in the best possible ways.",
    "Before this page ends,<br>I just want to say something."
];

let step = 0; let clicks = 0; let busy = false; let cinematic = false;

window.addEventListener("mousedown", (e) => {
    if (busy || cinematic || container.style.display !== "none") return;

    // Gift Interaction
    if (document.getElementById("intro-section").contains(e.target)) {
        clicks++;
        gift.classList.add("shake");
        setTimeout(() => gift.classList.remove("shake"), 400);
        confetti({ particleCount: 100, spread: 70, origin: { x: e.clientX/innerWidth, y: e.clientY/innerHeight } });
        
        if (clicks >= 3) {
            document.getElementById("intro-section").style.display = "none";
            document.getElementById("message-section").style.display = "flex";
            document.getElementById("bgMusic").play().catch(()=>{});
            updateText();
        }
        return;
    }

    // Story Interaction
    if (document.getElementById("message-section").style.display === "flex" && e.target.id !== "replayBtn") {
        createRipple(e.clientX, e.clientY);
        if (step === 11) { // Blow candle
            confetti({ particleCount: 400, spread: 100, origin: { y: 0.6 } });
            busy = true; setTimeout(() => { busy = false; next(); }, 1200);
        } else if (step === story.length - 1) {
            runFinalSequence();
        } else {
            next();
        }
    }
});

function updateText() {
    busy = true;
    textEl.classList.add("text-hidden");
    const cake = document.getElementById("cake-wrapper");
    if (step === 10 || step === 11) cake.classList.add("show");
    else cake.classList.remove("show");

    setTimeout(() => {
        textEl.innerHTML = story[step];
        textEl.classList.remove("text-hidden");
        busy = false;
    }, 1200);
}

function next() { if (step < story.length - 1) { step++; updateText(); } }

function runFinalSequence() {
    cinematic = true;
    document.getElementById("message-section").style.opacity = "0";
    setTimeout(() => {
        const ov = document.getElementById("black-overlay");
        ov.style.opacity = "1";
        setTimeout(() => {
            document.getElementById("body-bg").classList.add("ivory-theme");
            ov.style.opacity = "0";
            textEl.innerHTML = "";
            document.getElementById("message-section").style.opacity = "1";
            document.getElementById("cake-wrapper").classList.remove("show");
            
            // Typewriter effect
            let i = 0; const msg = "thank you for being here.";
            function type() {
                if (i < msg.length) {
                    textEl.innerHTML = `<span class="ivory-text">${msg.substring(0, i+1)}</span>`;
                    i++; setTimeout(type, 110);
                } else {
                    setTimeout(() => {
                        textEl.classList.add("text-hidden");
                        setTimeout(() => {
                            textEl.innerHTML = '<span class="ivory-text" style="font-weight:600">Happy Birthday, Vallen.</span>';
                            textEl.classList.remove("text-hidden");
                            setTimeout(() => {
                                const btn = document.getElementById("replayBtn");
                                btn.style.display = "block";
                                setTimeout(() => btn.style.opacity = "1", 100);
                            }, 1500);
                        }, 1500);
                    }, 3000);
                }
            }
            setTimeout(type, 1000);
        }, 1800);
    }, 1000);
}

function createRipple(x, y) {
    const r = document.createElement("div");
    r.className = "ripple";
    r.style.left = x + "px"; r.style.top = y + "px";
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 1000);
}

// Love Particles (Improved)
setInterval(() => {
    const p = document.createElement("div");
    p.className = "love-particle";
    p.innerHTML = "♥";
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty('--sway', (Math.random() - 0.5) * 300 + "px");
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 6000);
}, 400);

document.getElementById("replayBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("black-overlay").style.opacity = "1";
    setTimeout(() => location.reload(), 1200);
});



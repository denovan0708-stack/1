// ============================= 
// 1. COUNTDOWN SYSTEM (LOCK)
// ============================= 
const targetDate = new Date("March 1, 2026 00:00:00").getTime();

const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(countdownTimer);
        const container = document.getElementById("countdown-container");
        container.style.opacity = "0";
        setTimeout(() => {
            container.style.display = "none";
            document.getElementById("page").style.display = "flex";
        }, 1500); 
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d.toString().padStart(2, '0');
    document.getElementById("hours").innerText = h.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
}, 1000);

// ============================= 
// 2. MAIN APP LOGIC
// ============================= 
const text = document.getElementById("text");
const replayBtn = document.getElementById("replayBtn");
const cakeWrapper = document.getElementById("cake-wrapper");
const introSection = document.getElementById("intro-section");
const messageSection = document.getElementById("message-section");
const giftIcon = document.getElementById("gift-icon");
const body = document.getElementById("body-bg");
const overlay = document.getElementById("black-overlay");

let step = 0;
let clickCount = 0;
let isCinematic = false;
let isTransitioning = false;

const story = [
  "Hey, Vallen.", "I made something for you.",
  "There are so many days in a lifetime...", "but this one matters a little more.",
  "Because exactly <b>21 years ago</b>,<br>someone special was born.",
  "Someone named<br><b>Vallen Kalonia</b>.", "And today… we celebrate you.",
  "Happy Birthday, Vallen.", "I'm really glad you exist.",
  "The world became a little brighter<br>the day you were born.",
  "Make a wish.", "Blow the candle.",
  "I hope this year brings you even more happiness, beautiful memories, and<br>everything you deserve.",
  "And that life surprises you<br>in the best possible ways.",
  "Before this page ends,<br>I just want to say something."
];

window.addEventListener("mousedown", (e) => {
  if (isCinematic || isTransitioning) return;

  if (introSection.contains(e.target)) {
    clickCount++;
    giftIcon.classList.add("shake");
    setTimeout(() => giftIcon.classList.remove("shake"), 400);
    confetti({ particleCount: 200, spread: 200, origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } });
    
    // REVISI: 3 KALI KLIK
    if (clickCount >= 3) {
      introSection.style.display = "none";
      messageSection.style.display = "flex";
      document.getElementById("bgMusic").play().catch(() => {});
      showStep();
    }
    return;
  }

  if (messageSection.style.display === "flex" && e.target !== replayBtn) {
    createRipple(e.clientX, e.clientY);
    if (step === 11) {
      confetti({ particleCount: 450, spread: 200, origin: { y: 0.6 } });
      isTransitioning = true;
      setTimeout(() => { isTransitioning = false; nextStep(); }, 1200);
    } else if (step === story.length - 1) {
      startIvory();
    } else {
      nextStep();
    }
  }
});

function showStep() {
  isTransitioning = true;
  text.classList.add("text-hidden");
  if (step === 10 || step === 11) { cakeWrapper.classList.add("show"); } 
  else { cakeWrapper.classList.remove("show"); }

  setTimeout(() => {
    text.innerHTML = story[step];
    text.classList.remove("text-hidden");
    isTransitioning = false;
  }, 1300);
}

function nextStep() {
  if (step < story.length - 1) { step++; showStep(); }
}

function startIvory() {
  isCinematic = true;
  messageSection.style.opacity = "0";
  setTimeout(() => {
    overlay.style.opacity = "1";
    setTimeout(() => {
      body.classList.add("ivory-theme");
      overlay.style.opacity = "0";
      text.innerHTML = "";
      messageSection.style.opacity = "1";
      cakeWrapper.classList.remove("show");
      setTimeout(() => {
        let i = 0; const txt = "thank you for being here.";
        function type() {
          if (i < txt.length) {
            text.innerHTML = `<span class="ivory-text">${txt.substring(0, i + 1)}</span>`;
            i++; setTimeout(type, 110);
          } else {
            setTimeout(() => {
              text.classList.add("text-hidden");
              setTimeout(() => {
                text.innerHTML = '<span class="ivory-text">Happy Birthday, Vallen.</span>';
                text.classList.remove("text-hidden");
                setTimeout(() => {
                  replayBtn.style.display = "block";
                  setTimeout(() => { replayBtn.style.opacity = "1"; }, 100);
                }, 1500);
              }, 1500);
            }, 3000);
          }
        }
        type();
      }, 1000);
    }, 1800);
  }, 1000);
}

function createRipple(x, y) {
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.left = x + "px"; ripple.style.top = y + "px";
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1200);
}

setInterval(() => {
  const el = document.createElement("div");
  el.className = "love-particle";
  el.innerHTML = "♥";
  el.style.left = Math.random() * 100 + "vw";
  el.style.setProperty('--sway', (Math.random() - 0.5) * 300 + "px");
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 6000);
}, 450);

replayBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
  setTimeout(() => location.reload(), 1500);
});



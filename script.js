// ============================= 
// 1. WATER RIPPLE SYSTEM
// ============================= 
const countdownBox = document.getElementById("countdown-container");
function updateRipple(e) {
    if (countdownBox.style.display !== "none") {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        countdownBox.style.setProperty('--cursor-x', x + 'px');
        countdownBox.style.setProperty('--cursor-y', y + 'px');
    }
}
window.addEventListener('mousemove', updateRipple);
window.addEventListener('touchmove', updateRipple);

// ============================= 
// 2. COUNTDOWN SYSTEM
// ============================= 
const targetDate = new Date("March 10, 2026 14:06:00").getTime();
const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff <= 0) {
        clearInterval(timer);
        countdownBox.style.opacity = "0";
        setTimeout(() => {
            countdownBox.style.display = "none";
            document.getElementById("page").style.display = "flex";
            // Kado muncul perlahan (Fade In)
            setTimeout(() => {
                document.getElementById("intro-section").classList.add("visible");
            }, 100);
        }, 1500); 
        return;
    }
    document.getElementById("days").innerText = Math.floor(diff / 86400000).toString().padStart(2, '0');
    document.getElementById("hours").innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
    document.getElementById("minutes").innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    document.getElementById("seconds").innerText = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
}, 1000);

// ============================= 
// 3. STORY LOGIC
// ============================= 
const textDisplay = document.getElementById("text");
const story = [
  "Hey, Vallen.", "I made something for you.",
  "There are so many days in a lifetime...", "but this one matters a little more.",
  "Because exactly <b>21 years ago</b>,<br>someone special was born.",
  "Someone named<br><b>Vallen Kalonia</b>.", "And today… we celebrate you.",
  "Happy Birthday, Vallen.", "I'm really glad you exist.",
  "The world became a little brighter<br>the day you were born.",
  "Make a wish.", "Blow the candle.",
  "I hope this year brings you even more happiness, beautiful memories, and everything you deserve.",
  "And that life surprises you in the best possible ways.",
  "Before this page ends, I just want to say something."
];

let currentStep = 0; let giftClicks = 0; let isWaiting = false; let isFinal = false;
let particleInterval; // Untuk menghentikan hati nanti

window.addEventListener("mousedown", (e) => {
  if (isWaiting || isFinal || countdownBox.style.display !== "none") return;
  
  if (document.getElementById("intro-section").contains(e.target)) {
    giftClicks++;
    document.getElementById("gift-icon").classList.add("shake");
    setTimeout(() => document.getElementById("gift-icon").classList.remove("shake"), 400);
    confetti({ particleCount: 150, spread: 70, origin: { x: e.clientX/innerWidth, y: e.clientY/innerHeight } });
    
    if (giftClicks >= 3) {
      isWaiting = true;
      // Kado Fade Out cepat
      document.getElementById("intro-section").classList.add("fade-out");
      setTimeout(() => {
        document.getElementById("intro-section").style.display = "none";
        document.getElementById("message-section").style.display = "flex";
        document.getElementById("bgMusic").play().catch(()=>{});
        renderStep();
        isWaiting = false;
      }, 600);
    }
    return;
  }
  
  if (document.getElementById("message-section").style.display === "flex" && e.target.id !== "replayBtn") {
    createRipple(e.clientX, e.clientY);
    if (currentStep === 11) {
      confetti({ particleCount: 400, spread: 100, origin: { y: 0.6 } });
      isWaiting = true; setTimeout(() => { isWaiting = false; nextStep(); }, 1200);
    } else if (currentStep === story.length - 1) {
      startIvorySequence();
    } else {
      nextStep();
    }
  }
});

function renderStep() {
  isWaiting = true; textDisplay.classList.add("text-hidden");
  const cake = document.getElementById("cake-wrapper");
  if (currentStep === 10 || currentStep === 11) cake.classList.add("show");
  else cake.classList.remove("show");
  setTimeout(() => { textDisplay.innerHTML = story[currentStep]; textDisplay.classList.remove("text-hidden"); isWaiting = false; }, 1200);
}
function nextStep() { if (currentStep < story.length - 1) { currentStep++; renderStep(); } }

function startIvorySequence() {
  isFinal = true; 
  // HENTIKAN PARTIKEL HATI
  clearInterval(particleInterval);
  document.querySelectorAll('.love-particle').forEach(el => el.remove());

  document.getElementById("message-section").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("black-overlay").style.opacity = "1";
    setTimeout(() => {
      document.getElementById("body-bg").classList.add("ivory-theme");
      document.getElementById("black-overlay").style.opacity = "0";
      textDisplay.innerHTML = ""; document.getElementById("message-section").style.opacity = "1";
      document.getElementById("cake-wrapper").classList.remove("show");
      let charIdx = 0; const finalMsg = "thank you for being here.";
      function typeText() {
        if (charIdx < finalMsg.length) {
          textDisplay.innerHTML = `<span class="ivory-text">${finalMsg.substring(0, charIdx + 1)}</span>`;
          charIdx++; setTimeout(typeText, 110);
        } else {
          setTimeout(() => {
            textDisplay.classList.add("text-hidden");
            setTimeout(() => {
              textDisplay.innerHTML = '<span class="ivory-text" style="font-weight:600">Happy Birthday, Vallen.</span>';
              textDisplay.classList.remove("text-hidden");
              setTimeout(() => {
                document.getElementById("replayBtn").style.display = "block";
                setTimeout(() => document.getElementById("replayBtn").style.opacity = "1", 100);
              }, 1500);
            }, 1500);
          }, 3000);
        }
      }
      setTimeout(typeText, 1000);
    }, 1800);
  }, 1000);
}

function createRipple(x, y) {
  const r = document.createElement("div"); r.className = "ripple";
  r.style.left = x + "px"; r.style.top = y + "px";
  document.body.appendChild(r); setTimeout(() => r.remove(), 1000);
}

// SIMPAN INTERVAL KE VARIABLE AGAR BISA DIHENTIKAN
particleInterval = setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "love-particle";
  heart.innerHTML = `<svg viewBox="0 0 32 32"><path d="M16 28.5L13.8 26.4C6.4 19.7 1.5 15.3 1.5 10C1.5 5.6 4.9 2.1 9.3 2.1C11.8 2.1 14.1 3.2 15.8 5.1C17.5 3.2 19.8 2.1 22.3 2.1C26.7 2.1 30.1 5.6 30.1 10C30.1 15.3 25.2 19.7 17.8 26.4L16 28.5Z"/></svg>`;
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.setProperty('--sway', (Math.random() - 0.5) * 300 + "px");
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 900);

document.getElementById("replayBtn").addEventListener("click", () => location.reload());

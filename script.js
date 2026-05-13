const countdownBox = document.getElementById("countdown-container");
const targetDate = new Date("May 13, 2026 00:00:01").getTime();

// Fungsi Countdown
const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(timer);
        // PROSES PENGHAPUSAN LAYER PENGHALANG
        countdownBox.style.opacity = "0";
        countdownBox.style.pointerEvents = "none"; 
        countdownBox.style.zIndex = "-100"; // Pindah ke paling belakang
        
        setTimeout(() => {
            countdownBox.style.display = "none";
            document.getElementById("page").style.display = "flex";
            const intro = document.getElementById("intro-section");
            intro.classList.add("visible"); // Aktifkan kado
        }, 1000);
        return;
    }

    document.getElementById("days").innerText = Math.floor(diff / 86400000).toString().padStart(2, '0');
    document.getElementById("hours").innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
    document.getElementById("minutes").innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    document.getElementById("seconds").innerText = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
}, 1000);

// Logika Klik Kado & Pesan
let currentStep = 0;
let giftClicks = 0;
const textDisplay = document.getElementById("text");

const story = [
    "Hey, Vallen.", "Here is something for you.",
    "There are so many days in a lifetime...", "and this one matters a little more.",
    "Because exactly <b>21 years ago</b>,<br>someone special was born.",
    "Someone named<br><b>Vallen Kalonia</b>.", "And today… we celebrate you!",
    "Make a wish.", "Blow the candle.",
    "Happy Birthday, Vallen.", "I’m so glad I get to know you.",
    "May today be a reminder of how much you are valued and how much you matter.",
    "I hope this year brings you even more happiness, beautiful memories, and everything you deserve.",
    "And that life surprises you in the best possible ways.",
    "Hey.. know that you are loved by so many. And some of them have a little something they’d like to say..."
];

// Data ucapan teman (disingkat untuk efisiensi script)
const friendsWishes = [
    { name: "Metta", wish: "happy birthday vallenn... u truly deserve the world 🥹" },
    { name: "Olin", wish: "happy birthday BOKeeEEEeEeeemmmm!! wishing you all the best selaluuu yaa" },
    { name: "Cillak", wish: "Happy 21 ya Vallen, YAY udah legalll! Always be happy, healthy and pretty!!" }
    // Tambahkan yang lain di sini jika diperlukan
];

window.addEventListener("click", (e) => {
    // 1. Deteksi Klik Kado
    const intro = document.getElementById("intro-section");
    if (intro.classList.contains("visible") && intro.contains(e.target)) {
        giftClicks++;
        if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        
        if (giftClicks >= 3) {
            intro.style.display = "none";
            document.getElementById("message-section").style.display = "flex";
            const bgMusic = document.getElementById("bgMusic");
            if (bgMusic) bgMusic.play().catch(()=>{});
            renderStep();
        }
        return;
    }

    // 2. Deteksi Klik Lanjut Pesan
    const msgSection = document.getElementById("message-section");
    if (msgSection.style.display === "flex" && e.target.id !== "nextToIvoryBtn") {
        if (currentStep < story.length - 1) {
            currentStep++;
            renderStep();
        } else {
            showFriendsWishes();
        }
    }
});

function renderStep() {
    textDisplay.classList.add("text-hidden");
    const cake = document.getElementById("cake-wrapper");
    
    if (currentStep === 7 || currentStep === 8) cake.classList.add("show");
    else cake.classList.remove("show");

    setTimeout(() => {
        textDisplay.innerHTML = story[currentStep];
        textDisplay.classList.remove("text-hidden");
    }, 600);
}

function showFriendsWishes() {
    textDisplay.style.display = "none";
    const container = document.getElementById("friends-wishes-container");
    const grid = document.getElementById("wishes-grid");
    grid.innerHTML = "";
    friendsWishes.forEach(item => {
        const div = document.createElement("div");
        div.className = "wish-card";
        div.innerHTML = `<span>${item.name}</span><p>"${item.wish}"</p>`;
        grid.appendChild(div);
    });
    container.style.display = "flex";
    container.style.opacity = "1";
}

// Tombol Final "My Turn"
document.getElementById("nextToIvoryBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("friends-wishes-container").style.display = "none";
    document.body.classList.add("ivory-theme");
    textDisplay.style.display = "block";
    textDisplay.innerHTML = `<span class="ivory-text">Happy Birthday, Vallen.</span>`;
});

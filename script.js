const countdownBox = document.getElementById("countdown-container");
const targetDate = new Date("May 13, 2026 00:00:01").getTime();
let currentStep = 0;
let isWaiting = false;
let stopParticles = false;

const friendsWishes = [
    { 
        name: "Metta", 
        wish: "happy birthday vallenn, congrats akhirnya tahun ini bs spend birthday dgn chill dan ga smbil huru hara eco n jagat ok. semoga tahun ini bisa jd tahun yg semakin baik untuk kau ya vallen, may u always be surrounded by lots of love and good things too. i am very glad that i get to spend another year with having you as my best friend and my good listener all the timeee. thank u for being a good friend for me and being a good person for others, u healed me in many ways i didn't even know i needed, thank u for staying dan denger cerita cerita saya even when it's not my best day to show up. thank you for being the person who i don't really need to text everyday but things will always feel the same, thank you for all the late night talks, all the laughs, and all the growing we've been thru cause how time flies kt tbtb suda smester 6 and i've known u since my first semester of college... having u in my uni life bnr bnr one of my biggest blessing and i hope u also feel the same happiness as i did. im sooo happy to see u being so loved bahkan smpe u show your side yg kt ga biasanya lihat, u truly deserve the world 🥹 semoga semua yg baik baik bisaaa tercapai yaaa tahun ini, hepi hepi selalu dan langgeng langgeng ya sama bestie deno. i always pray that every single good thing will find its way to u. you know u always got my back, i love u more than words can describe even when i look biasa biasa saja tp im very grateful to have u bgt bgt bgt bgt. have a blessed birthday vallen my cuki queen 🤍🤍🤍" 
    },
    { 
        name: "Olin", 
        wish: "happy birthday yaa BOKeeEEEeEeeemmmm!!\nwishing you all the best selaluuu yaa, semoga all the good things always come to you :-D\nsemoga apapun yg diusahakan selalu lancar...dan semoga bisa jadi ibu dari para hamster yg baik dan amanah biar hamsternya ga mati muda wkwkwkwk\n\nsemoga di umur yg ke-21 ini juga bisa jadi pribadi yang lebih baik lagii dan lebih dewasa, bisa jadi garam dan terang bagi duniaaa, dan always blessed by the grace of God yaaa ;-)\n\nsemoga impian lu juga akan tercapai secepatnya yaa (contoh: mukbang cuwi cuki segede bola voli 🧆🏐) pokoknya di umur 21 ini we're in this together yaaa dlm sempro, ta, dan segala kehectican dunia ini semoga semuanya dilancarinnn dan kita bisa lulus bareng HUHU AMINNnnn" 
    },
    { 
        name: "Kaput", 
        wish: "Happiest birthday bokem! wishing you nothing but happiness and all the good things in ur life. Thank you for being one of my closest friends. God bless you always <3" 
    },
    { 
        name: "Jordan", 
        wish: "happy birthdayy vallennn WUATB semoga wardobemu akan full dgn DIOR CHANEL YSL HERMES LV" 
    },
    { 
        name: "Anton", 
        wish: "Happy birthday Vallen! Makin sukses dan bahagia ya!" 
    },
    { 
        name: "Cillak", 
        wish: "Happy birthday vikei my bestie my lover🫶🏻 \n\nHappy 21 ya Vallen, YAY udah legalll letsgo to Bali and go to shishi wkwkkwkw\nAlways be happy, healthy and pretty!! \nWishing you all the happiest and good things happen in your legal age ya vikei. Good luck on your TA, semoga km cpt lulus ya sygku🫰🏻🫰🏻\n\nHoping this year brings you nothing but pure joy and amazing new memories. You deserve the world and more. \n\n-love, Cilla" 
    },
    { 
        name: "Stella", 
        wish: "happy birthday my bestiee Vallenn, ih kt ud tmenan 10 tahun? 11 tahun? ga kerasa kw thun dpn dh lulus ya, smoga tar dpet kerjaan yg oke yaa, dan semoga pnjg umur, sehat selalu, tmbh cantii, hope everything you wish for comes true, and i hope u find someone better than ur ex n treat u well, bcs u deserve it. wish u all the best and God bless. love ya 🫶🏻 cpt jadian 🫵🏻 jgn bestie mulu" 
    },
    { 
        name: "Yos", 
        wish: "oi hbd palembang cuwi cuki semoga panjang umur sehat selalu semoga udin petot jugo panjang umur yo, semoga kau biso cobain semua cuwi cuki di bumi ni. pokoknyo semoga semua yang disemogakan tersemogakan amin.\n\noiyo semoga cepet jadian la yo kalian kalo biso habis baco ini langsung yo biak gacor." 
    },
    { 
        name: "Stanlee", 
        wish: "bos palen, habede ya boss, jangan sombong sombong, panjang umur, sehat sehat, langgeng samo deno, jagoi dio jangan dirusaki" 
    }
];


const story = [
    "Hi, Vallen.", "Here is something for you.",
    "Because exactly <b>21 years ago</b>,<br>someone special was born.",
    "Someone named<br><b>Vallen Kalonia</b>.", "Make a wish.", "Blow the candle.",
    "Happy Birthday, Vallen.", "You are loved by so many...", "And they have something to say..."
];

const bridging = ["They’ve said it all.", "Be happy.", "Happy Birthday, Vallen."];

// Timer Logic
const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff <= 0) {
        clearInterval(timer);
        countdownBox.style.opacity = "0";
        setTimeout(() => {
            countdownBox.style.display = "none";
            document.getElementById("page").style.display = "flex";
            document.getElementById("intro-section").classList.add("visible");
        }, 1000);
        return;
    }
    document.getElementById("days").innerText = Math.floor(diff / 86400000).toString().padStart(2, '0');
    document.getElementById("hours").innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
    document.getElementById("minutes").innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    document.getElementById("seconds").innerText = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
}, 1000);

// Interaction Logic
let giftClicks = 0;
window.addEventListener("click", (e) => {
    if (isWaiting || countdownBox.style.display !== "none") return;

    const intro = document.getElementById("intro-section");
    if (intro.classList.contains("visible") && e.target.closest("#intro-section")) {
        giftClicks++;
        if (giftClicks >= 3) {
            intro.style.display = "none";
            document.getElementById("message-section").style.display = "flex";
            document.getElementById("bgMusic").play().catch(()=>{});
            renderStep();
        }
        return;
    }

    if (document.getElementById("message-section").style.display === "flex" && !document.getElementById("friends-wishes-container").style.display.includes("flex")) {
        if (currentStep < story.length - 1) {
            currentStep++;
            renderStep();
        } else {
            showWishes();
        }
    }
});

function renderStep() {
    isWaiting = true;
    const txt = document.getElementById("text");
    const cake = document.getElementById("cake-wrapper");
    
    txt.classList.add("text-hidden");
    if (currentStep === 5) cake.classList.add("show");
    
    setTimeout(() => {
        txt.innerHTML = story[currentStep];
        txt.classList.remove("text-hidden");
        isWaiting = false;
    }, 600);
}

function showWishes() {
    const container = document.getElementById("friends-wishes-container");
    const grid = document.getElementById("wishes-grid");
    grid.innerHTML = friendsWishes.map(i => `<div class="wish-card"><span>${i.name}</span><p>"${i.wish}"</p></div>`).join('');
    container.style.display = "flex";
    setTimeout(() => container.style.opacity = "1", 100);
}

document.getElementById("nextToIvoryBtn").addEventListener("click", async (e) => {
    e.stopPropagation();
    stopParticles = true;
    document.getElementById("friends-wishes-container").style.display = "none";
    document.getElementById("black-overlay").style.opacity = "1";
    
    setTimeout(async () => {
        document.body.classList.add("ivory-theme");
        document.getElementById("cake-wrapper").classList.remove("show");
        document.getElementById("black-overlay").style.opacity = "0";
        const txt = document.getElementById("text");
        
        for (let s of bridging) {
            txt.innerHTML = `<span class="ivory-text">${s}</span>`;
            txt.classList.remove("text-hidden");
            await new Promise(r => setTimeout(r, 2500));
            if (s !== bridging[bridging.length-1]) txt.classList.add("text-hidden");
            await new Promise(r => setTimeout(r, 1000));
        }
        
        const btn = document.getElementById("replayBtn");
        btn.style.display = "inline-block";
        btn.classList.add("btn-dark");
    }, 2000);
});

// Particles
setInterval(() => {
    if (stopParticles) return;
    const p = document.createElement("div"); p.className = "love-particle";
    p.innerHTML = `<svg viewBox="0 0 32 32"><path d="M16 28.5L13.8 26.4C6.4 19.7 1.5 15.3 1.5 10C1.5 5.6 4.9 2.1 9.3 2.1C11.8 2.1 14.1 3.2 15.8 5.1C17.5 3.2 19.8 2.1 22.3 2.1C26.7 2.1 30.1 5.6 30.1 10C30.1 15.3 25.2 19.7 17.8 26.4L16 28.5Z"/></svg>`;
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty('--sway', (Math.random() - 0.5) * 200 + "px");
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 6000);
}, 1000);

document.getElementById("replayBtn").addEventListener("click", () => location.reload());

const countdownBox = document.getElementById("countdown-container");
const targetDate = new Date("May 14, 2026 00:00:01").getTime();
let particleInterval;
let stopAllParticles = false;

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

const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(timer);
        if (countdownBox) {
            countdownBox.style.opacity = "0";
            countdownBox.style.pointerEvents = "none";
            setTimeout(() => {
                countdownBox.style.display = "none";
                const page = document.getElementById("page");
                if (page) page.style.display = "flex";
                setTimeout(() => { 
                    const intro = document.getElementById("intro-section");
                    if (intro) intro.classList.add("visible"); 
                }, 100);
            }, 1000);
        }
        return;
    }

    const d = document.getElementById("days");
    const h = document.getElementById("hours");
    const m = document.getElementById("minutes");
    const s = document.getElementById("seconds");

    if (d) d.innerText = Math.floor(diff / 86400000).toString().padStart(2, '0');
    if (h) h.innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
    if (m) m.innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    if (s) s.innerText = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
}, 1000);

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

const bridgingSentences = [
    "They’ve said it all.",
    "Nothing more I can wish for you, than all the best.",
    "And you know it.",
    "Be happy.",
    "Blessed in abundant wealth and health, love.",
    "Thank you for being here.",
    "Happy Birthday, Vallen."
];

let currentStep = 0; let giftClicks = 0; let isWaiting = false; let isFinal = false; let showingWishes = false;

window.addEventListener("click", (e) => {
    if (isWaiting || isFinal || (countdownBox && countdownBox.style.display !== "none")) return;
    if (showingWishes) return; 

    const intro = document.getElementById("intro-section");
    if (intro && intro.classList.contains("visible") && intro.contains(e.target)) {
        giftClicks++;
        document.getElementById("gift-icon").classList.add("shake");
        setTimeout(() => document.getElementById("gift-icon").classList.remove("shake"), 400);
        if (typeof confetti === 'function') {
            confetti({ particleCount: 150, spread: 70, origin: { x: e.clientX/innerWidth, y: e.clientY/innerHeight } });
        }
        if (giftClicks >= 3) {
            isWaiting = true; intro.classList.add("fade-out");
            setTimeout(() => {
                intro.style.display = "none";
                document.getElementById("message-section").style.display = "flex";
                const bgMusic = document.getElementById("bgMusic");
                if (bgMusic) bgMusic.play().catch(()=>{});
                renderStep(); isWaiting = false;
            }, 500);
        }
        return;
    }

    const msgSection = document.getElementById("message-section");
    if (msgSection && msgSection.style.display === "flex" && e.target.id !== "replayBtn" && e.target.id !== "nextToIvoryBtn") {
        createRipple(e.clientX, e.clientY);
        if (currentStep === 8) { 
            if (typeof confetti === 'function') {
                confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
            }
            isWaiting = true; setTimeout(() => { isWaiting = false; nextStep(); }, 600);
        } else if (currentStep === story.length - 1) {
            showFriendsWishes();
        } else {
            nextStep();
        }
    }
});

const nextIvoryBtn = document.getElementById("nextToIvoryBtn");
if (nextIvoryBtn) {
    nextIvoryBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        isFinal = true; 
        stopAllParticles = true;
        clearInterval(particleInterval);
        document.querySelectorAll('.love-particle').forEach(el => el.remove());

        document.getElementById("friends-wishes-container").style.opacity = "0";
        const overlay = document.getElementById("black-overlay");
        if (overlay) overlay.style.opacity = "1";
        
        setTimeout(async () => {
            document.body.classList.add("ivory-theme");
            document.getElementById("friends-wishes-container").style.display = "none";
            document.getElementById("cake-wrapper").classList.remove("show");
            document.getElementById("message-section").style.display = "flex";
            
            textDisplay.style.display = "block";
            textDisplay.innerHTML = "";
            textDisplay.classList.remove("text-hidden");
            
            if (overlay) overlay.style.opacity = "0";
            await new Promise(r => setTimeout(r, 1500));

            for (let i = 0; i < bridgingSentences.length; i++) {
                await typeSentence(bridgingSentences[i]);
                let pause = i === bridgingSentences.length - 2 ? 3000 : 2000; 
                await new Promise(r => setTimeout(r, pause));

                if (i < bridgingSentences.length - 1) {
                    textDisplay.classList.add("text-hidden");
                    await new Promise(r => setTimeout(r, 1500));
                    textDisplay.innerHTML = "";
                    textDisplay.classList.remove("text-hidden");
                    await new Promise(r => setTimeout(r, 800));
                }
            }

            setTimeout(() => {
                const btn = document.getElementById("replayBtn");
                if (btn) {
                    btn.style.display = "inline-block";
                    setTimeout(() => btn.style.opacity = "1", 100);
                }
            }, 1000);
        }, 2200); 
    });
}

async function typeSentence(sentence) {
    let charIdx = 0;
    return new Promise(resolve => {
        function type() {
            if (charIdx < sentence.length) {
                textDisplay.innerHTML = `<span class="ivory-text">${sentence.substring(0, charIdx + 1)}</span>`;
                charIdx++;
                setTimeout(type, 100); 
            } else {
                resolve();
            }
        }
        type();
    });
}

function renderStep() {
    isWaiting = true; 
    if (textDisplay) textDisplay.classList.add("text-hidden");
    const cake = document.getElementById("cake-wrapper");
    if (cake) {
        if (currentStep === 7 || currentStep === 8) cake.classList.add("show");
        else cake.classList.remove("show");
    }
    setTimeout(() => { 
        if (textDisplay) {
            textDisplay.innerHTML = story[currentStep]; 
            textDisplay.classList.remove("text-hidden"); 
        }
        isWaiting = false; 
    }, 600);
}

function nextStep() { if (currentStep < story.length - 1) { currentStep++; renderStep(); } }

function showFriendsWishes() {
    isWaiting = true; showingWishes = true;
    if (textDisplay) textDisplay.classList.add("text-hidden");
    const container = document.getElementById("friends-wishes-container");
    const grid = document.getElementById("wishes-grid");
    if (grid) {
        grid.innerHTML = ""; 
        friendsWishes.forEach(item => {
            const div = document.createElement("div");
            div.className = "wish-card";
            // "From: " telah dihapus, langsung nama saja
            div.innerHTML = `
                <span>${item.name}</span>
                <p>"${item.wish.replace(/\n/g, '<br>')}"</p>
            `;
            grid.appendChild(div);
        });
    }
    setTimeout(() => {
        if (textDisplay) textDisplay.style.display = "none";
        if (container) {
            container.style.display = "flex";
            setTimeout(() => { container.style.opacity = "1"; isWaiting = false; }, 100);
        }
    }, 600);
}

function createRipple(x, y) {
    const r = document.createElement("div"); r.className = "ripple";
    r.style.left = x + "px"; r.style.top = y + "px";
    document.body.appendChild(r); setTimeout(() => r.remove(), 1000);
}

particleInterval = setInterval(() => {
    if (stopAllParticles) return;
    const heart = document.createElement("div"); heart.className = "love-particle";
    heart.innerHTML = `<svg viewBox="0 0 32 32"><path d="M16 28.5L13.8 26.4C6.4 19.7 1.5 15.3 1.5 10C1.5 5.6 4.9 2.1 9.3 2.1C11.8 2.1 14.1 3.2 15.8 5.1C17.5 3.2 19.8 2.1 22.3 2.1C26.7 2.1 30.1 5.6 30.1 10C30.1 15.3 25.2 19.7 17.8 26.4L16 28.5Z"/></svg>`;
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.setProperty('--sway', (Math.random() - 0.5) * 300 + "px");
    document.body.appendChild(heart); setTimeout(() => heart.remove(), 6000);
}, 900);

const replay = document.getElementById("replayBtn");
if (replay) {
    replay.addEventListener("click", () => {
        document.body.style.opacity = "0"; setTimeout(() => { location.reload(); }, 1000);
    });
}

window.addEventListener('mousemove', (e) => {
    if(countdownBox) {
        countdownBox.style.setProperty('--cursor-x', e.clientX + 'px');
        countdownBox.style.setProperty('--cursor-y', e.clientY + 'px');
    }
});


import { GoogleGenAI } from "@google/genai";

/**
 * PERSONAL ASSET CONFIGURATION
 * Swap these URLs with your own images and videos.
 */
const PERSONAL_ASSETS = {
    // 6 Main Backgrounds for the tabs
    BACKGROUNDS: [
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920', // ORIGIN: Cinematic/Cyber
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1920', // LOGS: Photo Archive
        'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=1920', // KITCHEN: Food/Cooking
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1920', // ECHOES: Data/Screens
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1920', // PASSION: Intimate/Romantic
        'https://images.unsplash.com/photo-1510511459019-5dee5956ff8b?auto=format&fit=crop&q=80&w=1920'  // VAULT: Future/Secret
    ],
    // Memories Section Images
    MEMORIES: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=1200'
    ],
    // Videos for the Kitchen section
    VIDEOS: [
        'https://cdn.pixabay.com/vimeo/457224213/pot-51003.mp4?width=1280&hash=85e0541d457637894a480d15e98f02f9c961e064',
        'https://cdn.pixabay.com/vimeo/328940142/cooking-22527.mp4?width=1280&hash=8c30f878f4b00c3b092283e35d25950854407b14'
    ],
    // Audio Background
    MUSIC: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
};

const CONFIG = {
    AUTH_PASS: '04152025',
    VALENTINE_DATE: new Date('2026-02-14T00:00:00')
};

const DATA = {
    greeting: "My love, we’ve crossed over. Another revolution around the sun, another year where you are the most beautiful part of my reality. You are a wonderful soul, Chinecherem—the secret warmth in my winters and the constant light in my code. I am so grateful to step into this new year with you. Let's make 2026 our greatest masterpiece yet.",
    opening: "Dear Chinecherem,\n\nIn 2024, we met in high-definition reality. In April 2025, we began a journey that combined the precision of my code with the soul of your cooking.\n\nYou are the secret ingredient in my source code. This space is where our two worlds collide: the binary and the botanical, the firewall and the flame.",
    memories: [
        { title: "v1.0 Authentication", date: "Aug 2024", text: "Before screens were our windows, we shared the same air.", img: PERSONAL_ASSETS.MEMORIES[0] },
        { title: "The LDR Protocol", date: "Apr 2025", text: "Initializing the remote connection. Spices met terminals.", img: PERSONAL_ASSETS.MEMORIES[1] }
    ],
    videos: [
        { title: "Culinary Flame", month: "May 2025", url: PERSONAL_ASSETS.VIDEOS[0] },
        { title: "Synchronicity Loop", month: "July 2025", url: PERSONAL_ASSETS.VIDEOS[1] }
    ],
    echoes: {
        "April 2025": [
            { sender: "me", time: "22:01", msg: "Starting remote handshake..." },
            { sender: "her", time: "22:03", msg: "Connection established. Dinner is ready." }
        ],
        "July 2025": [
            { sender: "her", time: "11:15", msg: "Don't forget the secret ingredient." },
            { sender: "me", time: "11:16", msg: "Updating core logic... ingredient found." }
        ]
    },
    passion: "Chinecherem, you are the highest resolution part of my world. My devotion is an immutable variable. Synced forever.",
    vault: [
        { title: "Anniversary Log", date: "Apr 15, 2026", text: "One revolution. Moments chosen over noise." }
    ]
};

// Application State
let state = {
    activeTab: 'origin',
    scanProgress: 0,
    audio: null,
    isValentinesUnlocked: false,
    aiPrompt: null
};

// Element Registry
const el = {
    globalLoader: document.getElementById('global-loader'),
    globalProgress: document.getElementById('global-progress'),
    loaderStatus: document.getElementById('loader-status'),
    decryptLoader: document.getElementById('post-login-loader'),
    decryptProgress: document.getElementById('decrypt-progress'),
    greeting: document.getElementById('greeting-screen'),
    greetingTxt: document.getElementById('greeting-text'),
    proceedBtn: document.getElementById('proceed-btn'),
    loginGate: document.getElementById('login-gate'),
    loginForm: document.getElementById('login-form'),
    sanctuary: document.getElementById('sanctuary'),
    content: document.getElementById('content-area'),
    bgBox: document.getElementById('bg-layers'),
    navBtns: document.querySelectorAll('.nav-btn'),
    passphrase: document.getElementById('passphrase'),
    loginMsg: document.getElementById('login-msg')
};

/**
 * STAGE 1: BOOTLOADER (Pre-loading assets)
 */
async function boot() {
    const assetsToLoad = [
        ...PERSONAL_ASSETS.BACKGROUNDS,
        ...PERSONAL_ASSETS.MEMORIES
    ];

    let loadedCount = 0;
    const updateProgress = () => {
        loadedCount++;
        const percent = Math.floor((loadedCount / assetsToLoad.length) * 100);
        el.globalProgress.style.width = `${percent}%`;
        el.loaderStatus.textContent = `Syncing Component: ${loadedCount}/${assetsToLoad.length}...`;
        
        if (loadedCount >= assetsToLoad.length) {
            setTimeout(initializeGreeting, 800);
        }
    };

    assetsToLoad.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = updateProgress;
        img.onerror = updateProgress; // Continue anyway if one fails
    });
}

function initializeGreeting() {
    el.globalLoader.classList.add('hidden');
    el.greeting.classList.remove('hidden');
    setupBackgrounds();
    typeText(el.greetingTxt, DATA.greeting, 40, () => {
        el.proceedBtn.classList.remove('hidden');
    });

    el.proceedBtn.onclick = () => {
        el.greeting.classList.add('hidden');
        el.loginGate.classList.remove('hidden');
    };

    el.loginForm.onsubmit = handleLogin;

    el.navBtns.forEach(btn => {
        btn.onclick = () => navigate(btn.dataset.tab);
    });
}

function setupBackgrounds() {
    PERSONAL_ASSETS.BACKGROUNDS.forEach((src, i) => {
        const div = document.createElement('div');
        div.className = `bg-layer ${i === 0 ? 'active' : ''}`;
        div.style.backgroundImage = `url(${src})`;
        div.id = `bg-${i}`;
        el.bgBox.appendChild(div);
    });
}

/**
 * STAGE 2: DECRYPTION SEQUENCE (Post-Login)
 */
async function handleLogin(e) {
    e.preventDefault();
    if (el.passphrase.value === CONFIG.AUTH_PASS) {
        el.loginGate.classList.add('hidden');
        el.decryptLoader.style.display = 'flex';
        
        // Decrypt Animation
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            el.decryptProgress.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    el.decryptLoader.style.display = 'none';
                    el.sanctuary.classList.remove('hidden');
                    navigate('origin');
                    initAudio();
                }, 500);
            }
        }, 80);
        
    } else {
        el.loginMsg.textContent = "ERR_IDENTITY_MISMATCH";
        el.passphrase.value = "";
    }
}

function initAudio() {
    if (!state.audio) {
        state.audio = new Audio(PERSONAL_ASSETS.MUSIC);
        state.audio.volume = 0.25;
        state.audio.loop = true;
        state.audio.play().catch(() => console.warn("Audio interaction needed"));
    }
}

function typeText(target, text, speed, onComplete) {
    let i = 0;
    target.textContent = "";
    const interval = setInterval(() => {
        if (i < text.length) {
            target.textContent += text[i];
            i++;
        } else {
            clearInterval(interval);
            if (onComplete) onComplete();
        }
    }, speed);
}

function navigate(tab) {
    state.activeTab = tab;
    el.navBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
        btn.classList.toggle('bg-white/10', btn.dataset.tab === tab);
    });

    const bgIdx = ['origin', 'memories', 'kitchen', 'echoes', 'passion', 'vault'].indexOf(tab);
    document.querySelectorAll('.bg-layer').forEach((l, i) => {
        l.classList.toggle('active', i === bgIdx);
    });

    renderSection(tab);
}

function renderSection(id) {
    el.content.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = "animate-fade-in space-y-20 max-w-5xl mx-auto";

    if (id === 'origin') {
        wrapper.innerHTML = `
            <div class="text-center space-y-12">
                <h2 class="serif text-8xl font-bold italic tracking-tighter glitch" data-text="The Archive">The Archive</h2>
                <div class="glass p-10 md:p-20 rounded-[50px] text-left">
                    <p id="origin-letter" class="serif text-3xl md:text-5xl italic font-light leading-relaxed whitespace-pre-wrap typewriter-cursor"></p>
                </div>
            </div>`;
        el.content.appendChild(wrapper);
        typeText(wrapper.querySelector('#origin-letter'), DATA.opening, 30);
    } 
    else if (id === 'memories') {
        wrapper.innerHTML = DATA.memories.map((m, idx) => `
            <div class="glass rounded-[40px] overflow-hidden flex flex-col md:flex-row border border-white/10 group">
                <div class="md:w-1/2 h-80 overflow-hidden relative">
                    <img src="${m.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[6000ms]">
                    <div class="absolute top-4 left-4 mono text-[10px] bg-black/80 px-4 py-2 rounded-xl border border-white/10 text-[#00e5ff]">LOG_ID: 0${idx+1}</div>
                </div>
                <div class="md:w-1/2 p-10 space-y-6">
                    <span class="mono text-[10px] text-[#ff2d55] font-black tracking-widest uppercase">${m.date}</span>
                    <h3 class="serif text-5xl italic font-bold leading-tight">${m.title}</h3>
                    <p class="serif text-2xl text-white/70 italic leading-relaxed">"${m.text}"</p>
                </div>
            </div>`).join('');
        el.content.appendChild(wrapper);
    }
    else if (id === 'kitchen') {
        wrapper.innerHTML = `
            <div class="text-center space-y-8"><h2 class="serif text-7xl italic font-bold">Culinary Source</h2></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                ${DATA.videos.map(v => `
                    <div class="glass rounded-[40px] overflow-hidden group relative aspect-video bg-black cursor-pointer">
                        <video src="${v.url}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                               muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>
                        <div class="absolute bottom-8 left-8">
                            <span class="mono text-[10px] text-[#ff2d55] font-black uppercase tracking-widest">${v.month}</span>
                            <h4 class="serif text-4xl font-bold italic">${v.title}</h4>
                        </div>
                    </div>`).join('')}
            </div>`;
        el.content.appendChild(wrapper);
    }
    else if (id === 'echoes') {
        wrapper.innerHTML = `
            <div class="space-y-16">
                ${Object.entries(DATA.echoes).map(([month, msgs]) => `
                    <div class="glass p-10 md:p-16 rounded-[40px] space-y-10 border border-white/5">
                        <div class="flex items-center gap-4 border-b border-white/10 pb-8">
                            <h3 class="serif text-4xl italic font-bold">${month} Log</h3>
                        </div>
                        <div class="space-y-8">
                            ${msgs.map(m => `
                                <div class="flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}">
                                    <div class="p-8 rounded-[30px] ${m.sender === 'me' ? 'bg-[#00e5ff]/5 border-[#00e5ff]/20' : 'bg-white/5 border-white/10'} max-w-[85%] border shadow-xl">
                                        <p class="serif text-3xl italic font-light">${m.msg}</p>
                                        <span class="mono text-[9px] text-white/30 mt-4 block uppercase tracking-widest">${m.sender} // ${m.time}</span>
                                    </div>
                                </div>`).join('')}
                        </div>
                    </div>`).join('')}
                
                <div id="ai-prompter" class="glass p-16 rounded-[50px] border border-[#00e5ff]/20 text-center space-y-10">
                    <div class="mono text-[10px] text-[#00e5ff] tracking-[0.5em] uppercase font-black">AI_CORE :: NEURAL_ARCHIVE</div>
                    <h4 class="serif text-5xl italic font-bold">"Shall we write a new log?"</h4>
                    <p id="ai-result" class="serif text-3xl italic text-white/60 leading-relaxed max-w-2xl mx-auto"></p>
                    <button id="ai-gen-btn" class="px-10 py-5 border border-[#00e5ff] text-[#00e5ff] mono text-xs uppercase tracking-[0.4em] hover:bg-[#00e5ff]/10 rounded-full transition-all">Generate Neural Prompt</button>
                </div>
            </div>`;
        el.content.appendChild(wrapper);
        setupAI(wrapper.querySelector('#ai-gen-btn'), wrapper.querySelector('#ai-result'));
    }
    else if (id === 'passion') {
        if (!state.isValentinesUnlocked) {
            const tpl = document.getElementById('tpl-passion-locked').content.cloneNode(true);
            wrapper.appendChild(tpl);
            el.content.appendChild(wrapper);
            setupScanner(wrapper);
            startCountdown(wrapper.querySelector('#countdown'));
        } else {
            wrapper.innerHTML = `
                <div class="text-center py-20 animate-fade-in space-y-16">
                    <h2 class="serif text-9xl italic font-bold tracking-tighter text-[#ff2d55] glitch" data-text="Passion">Passion</h2>
                    <div class="glass p-20 rounded-[80px] border border-[#ff2d55]/30">
                        <p class="serif text-5xl italic font-light leading-relaxed">"${DATA.passion}"</p>
                    </div>
                </div>`;
            el.content.appendChild(wrapper);
        }
    }
    else if (id === 'vault') {
        wrapper.innerHTML = `
            <div class="grid grid-cols-1 gap-10">
                ${DATA.vault.map(v => `
                    <div class="glass p-20 rounded-[50px] border-dashed border-2 border-white/10 opacity-60 text-center space-y-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto opacity-40"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <h3 class="serif text-4xl font-bold italic">${v.title}</h3>
                        <p class="mono text-[12px] uppercase tracking-widest text-[#00e5ff]">Temporal Seal: Unlock ${v.date}</p>
                    </div>`).join('')}
            </div>`;
        el.content.appendChild(wrapper);
    }
}

async function setupAI(btn, resultEl) {
    btn.onclick = async () => {
        btn.textContent = "COMPILING...";
        btn.disabled = true;
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: "Generate a poetic 1-sentence writing prompt for a couple where one person is a cyber-security expert and the other is a chef. Use metaphors of code and cooking. Keep it brief and romantic.",
            });
            typeText(resultEl, response.text, 30);
        } catch (e) {
            resultEl.textContent = "Neural Link Failed. Reconnecting...";
        } finally {
            btn.textContent = "Generate New Prompt";
            btn.disabled = false;
        }
    };
}

function setupScanner(container) {
    const sc = container.querySelector('#scanner'), 
          ring = container.querySelector('.progress-ring__circle'), 
          feedback = container.querySelector('#scanner-feedback');
    const circ = 565;

    sc.onmousedown = sc.ontouchstart = () => {
        if (new Date() < CONFIG.VALENTINE_DATE) {
            feedback.textContent = "ACCESS_DENIED :: TEMPORAL_LOCK";
            feedback.style.color = "var(--love-pink)";
            return;
        }
        sc.classList.add('scanning');
        let p = 0;
        state.scanInterval = setInterval(() => {
            p += 2;
            ring.style.strokeDashoffset = circ - (p / 100) * circ;
            if (p >= 100) {
                clearInterval(state.scanInterval);
                state.isValentinesUnlocked = true;
                navigate('passion');
            }
        }, 30);
    };

    const clearScan = () => {
        clearInterval(state.scanInterval);
        sc.classList.remove('scanning');
        ring.style.strokeDashoffset = circ;
    };
    window.onmouseup = window.ontouchend = clearScan;
}

function startCountdown(disp) {
    const upd = () => {
        const diff = CONFIG.VALENTINE_DATE - new Date();
        if (diff <= 0) { disp.textContent = "AUTHENTICATE_NOW"; return; }
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        disp.textContent = `SYNC_REQUIRED: ${d}D ${h}H ${m}M`;
    };
    upd();
    setInterval(upd, 60000);
}

document.addEventListener('DOMContentLoaded', () => {
    boot();
});

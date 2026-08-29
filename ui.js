// =========================================================
// ui.js - Slider, countdown, FAQ, avis, animations, toasts
// =========================================================

let sliderIndex = 0;
let sliderTimer = null;

// ===== Toast (notifications) =====
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// ===== Slider du hero =====
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    const dots = document.getElementById('sliderDots');
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dots.appendChild(dot);
    });

    goToSlide(0);
    sliderTimer = setInterval(() => goToSlide((sliderIndex + 1) % slides.length), 5000);

    document.getElementById('sliderPrev').addEventListener('click', () => goToSlide(sliderIndex - 1));
    document.getElementById('sliderNext').addEventListener('click', () => goToSlide(sliderIndex + 1));
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const total = slides.length;

    sliderIndex = (index + total) % total;

    slides.forEach((s, i) => {
        s.style.opacity = i === sliderIndex ? '1' : '0';
        s.style.zIndex = i === sliderIndex ? '1' : '0';
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === sliderIndex));

    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => goToSlide((sliderIndex + 1) % total), 5000);
}

// ===== Countdown (vente flash) =====
function initCountdown() {
    const end = new Date();
    end.setHours(23, 59, 59, 999); // fin de la journée

    function tick() {
        const diff = end - new Date();
        if (diff <= 0) return;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
        document.getElementById('cdMin').textContent = String(m).padStart(2, '0');
        document.getElementById('cdSec').textContent = String(s).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
}

// ===== FAQ (accordéon) =====
function renderFaq() {
    const container = document.getElementById('faqList');
    FAQ.forEach(item => {
        const el = document.createElement('div');
        el.className = 'faq-item';
        el.innerHTML = `
            <button class="faq-q">${item.q} <span class="faq-arrow">+</span></button>
            <div class="faq-a"><p>${item.r}</p></div>
        `;
        el.querySelector('.faq-q').addEventListener('click', () => {
            const open = el.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!open) el.classList.add('open');
        });
        container.appendChild(el);
    });
}

// ===== Avis clients (carousel) =====
let avisIndex = 0;

function initAvis() {
    const container = document.getElementById('avisTrack');
    AVIS.forEach(a => {
        const el = document.createElement('div');
        el.className = 'avis-slide';
        const stars = '★'.repeat(a.note) + '☆'.repeat(5 - a.note);
        el.innerHTML = `
            <div class="avis-stars">${stars}</div>
            <p class="avis-texte">"${a.texte}"</p>
            <p class="avis-nom">- ${a.nom}</p>
        `;
        container.appendChild(el);
    });

    showAvis(0);
    setInterval(() => showAvis(avisIndex + 1), 6000);
}

function showAvis(index) {
    const slides = document.querySelectorAll('.avis-slide');
    if (slides.length === 0) return;
    avisIndex = (index + slides.length) % slides.length;
    slides.forEach((s, i) => {
        s.style.opacity = i === avisIndex ? '1' : '0';
        s.style.zIndex = i === avisIndex ? '1' : '0';
    });
}

// ===== Animation au scroll (reveal) =====
let revealObserver = null;

function initReveal() {
    if (!revealObserver) {
        revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
    }

    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => revealObserver.observe(el));
}

// ===== Newsletter =====
function initNewsletter() {
    const btn = document.getElementById('newsletterBtn');
    const input = document.getElementById('newsletterInput');
    btn.addEventListener('click', () => {
        const val = input.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            showToast('L\'email ma sa7ih !', 'error');
            return;
        }
        input.value = '';
        showToast('Chokran ! S9ilti f l-newsletter.', 'success');
    });
}

// ===== Ouverture / fermeture panier =====
function openCart() {
    document.getElementById('cartPanel').classList.add('open');
    document.getElementById('overlay').style.display = 'block';
    document.body.classList.add('no-scroll');
}

function closeCart() {
    document.getElementById('cartPanel').classList.remove('open');
    document.getElementById('overlay').style.display = 'none';
    document.body.classList.remove('no-scroll');
}

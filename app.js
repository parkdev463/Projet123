// =========================================================
// app.js - Initialisation de la boutique
// =========================================================

function init() {
    // Sections dynamiques
    renderCategories();
    initFilters();
    initTabs();
    renderProducts();
    renderFaq();
    initSlider();
    initCountdown();
    initAvis();
    initNewsletter();
    initReveal();

    // Panier : ouverture / fermeture
    document.getElementById('cartBtn').addEventListener('click', openCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
    document.getElementById('overlay').addEventListener('click', closeCart);

    // Paiement
    document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
    document.getElementById('modalClose').addEventListener('click', closeCheckout);
    document.getElementById('checkoutModal').addEventListener('click', e => {
        if (e.target.id === 'checkoutModal') closeCheckout();
    });

    // Quick view
    document.getElementById('qvClose').addEventListener('click', closeQuickView);
    document.getElementById('quickView').addEventListener('click', e => {
        if (e.target.id === 'quickView') closeQuickView();
    });

    // Recherche en direct
    document.getElementById('searchInput').addEventListener('input', renderProducts);

    // Tri des produits
    const sortEl = document.getElementById('sortSelect');
    if (sortEl) {
        sortEl.addEventListener('change', () => {
            triActif = sortEl.value;
            renderProducts();
        });
    }

    // Menu mobile
    document.getElementById('hamburger').addEventListener('click', () => {
        document.getElementById('nav').classList.toggle('open');
    });
    document.querySelectorAll('.nav a').forEach(a => {
        a.addEventListener('click', () => document.getElementById('nav').classList.remove('open'));
    });

    // Touche Echap
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeCart();
            closeCheckout();
            closeQuickView();
        }
    });

    updateCartUI();
}

document.addEventListener('DOMContentLoaded', init);

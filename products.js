// =========================================================
// products.js - Rendu produits, onglets, quick view
// =========================================================

let categorieActive = 'Tous';
let ongletActif = 'nouveaux';
let triActif = 'defaut';

// =========================================================
// Images d'un produit
// =========================================================

function getImages(p) {
    if (p.images && p.images.length > 0) {
        return p.images;
    }

    return [1, 2, 3].map(
        v => `images/prod-${p.id}-${v}.jpg`
    );
}

// =========================================================
// Couleurs associées à chaque catégorie
// =========================================================

const COULEURS_CAT = {
    'Bagues': ['#b8860b', '#8a6508'],
    'Colliers': ['#0e7c7b', '#0a5f5e'],
    "Boucles d'oreilles": ['#b0453a', '#8c342c'],
    'Bracelets': ['#7a5a8f', '#5c426b'],
    'Khalkhal': ['#c9a227', '#a8871f'],
    'Ensembles': ['#9c4f6d', '#7a3a55']
};

function couleurProduit(p) {
    return COULEURS_CAT[p.categorie] || ['#444', '#222'];
}

// =========================================================
// Badge produit
// =========================================================

function badgeProduit(p) {
    if (p.tag === 'promo') {
        return '<span class="badge badge-promo">PROMO</span>';
    }

    if (p.tag === 'nouveau') {
        return '<span class="badge badge-new">NOUVEAU</span>';
    }

    if (p.tag === 'bestseller') {
        return '<span class="badge badge-best">BEST</span>';
    }

    return '';
}

// =========================================================
// Filtrer les produits
// =========================================================

function filterProduits() {

    const searchInput =
        document.getElementById('searchInput');

    const search =
        searchInput
            ? (searchInput.value || '').toLowerCase()
            : '';

    let liste = PRODUITS.filter(p => {

        const okCat =
            categorieActive === 'Tous' ||
            p.categorie === categorieActive;

        const okSearch =
            p.nom.toLowerCase().includes(search);

        let okTab = true;

        if (ongletActif === 'nouveaux') {
            okTab = true;
        }

        if (ongletActif === 'promos') {
            okTab = !!p.ancienPrix;
        }

        if (ongletActif === 'meilleurs') {
            okTab =
                p.tag === 'bestseller' ||
                p.note >= 4.8;
        }

        return okCat && okSearch && okTab;
    });

    if (triActif === 'prix-asc') {
        liste.sort((a, b) => a.prix - b.prix);
    }

    else if (triActif === 'prix-desc') {
        liste.sort((a, b) => b.prix - a.prix);
    }

    else if (triActif === 'note') {
        liste.sort((a, b) => b.note - a.note);
    }

    else if (triActif === 'nom') {
        liste.sort(
            (a, b) => a.nom.localeCompare(b.nom)
        );
    }

    return liste;
}

// =========================================================
// Rendu d'un produit
// =========================================================

function renderProduit(p) {

    const card =
        document.createElement('div');

    card.className =
        'product-card reveal';

    const oldPrice = p.ancienPrix
        ? `<span class="old-price">${formatPrix.format(p.ancienPrix)}</span>`
        : '';

    card.innerHTML = `

        <div class="product-img">

            <img
                src="${getImages(p)[0]}"
                alt="${p.nom}"
                loading="lazy"
            >

            ${badgeProduit(p)}

        </div>

        <div class="product-info">

            <p class="categ">
                ${p.categorie} · ${p.matiere}
            </p>

            <h3>${p.nom}</h3>

            <div class="rating">

                ${'★'.repeat(Math.round(p.note))}
                ${'☆'.repeat(5 - Math.round(p.note))}

                <span>
                    (${p.avis} avis)
                </span>

            </div>

            <div class="prices">

                <span class="prix">
                    ${formatPrix.format(p.prix)}
                </span>

                ${oldPrice}

            </div>

        </div>

        <div class="product-actions">

            <button
                type="button"
                class="btn-add"
                data-quick="${p.id}"
            >
                Voir
            </button>

            <button
                type="button"
                class="btn-cart"
                data-add="${p.id}"
            >
                + Panier
            </button>

        </div>
    `;

    card
        .querySelector('[data-quick]')
        .addEventListener(
            'click',
            () => openQuickView(p.id)
        );

    card
        .querySelector('[data-add]')
        .addEventListener(
            'click',
            () => addToCart(p.id)
        );

    return card;
}

// =========================================================
// Rendu de la grille
// =========================================================

function renderProducts() {

    const container =
        document.getElementById(
            'productsContainer'
        );

    if (!container) return;

    container.innerHTML = '';

    const liste =
        filterProduits();

    if (liste.length === 0) {

        container.innerHTML =
            '<p class="no-result">Aucun produit trouvé.</p>';

        return;
    }

    liste.forEach(p => {

        container.appendChild(
            renderProduit(p)
        );

    });

    if (typeof initReveal === 'function') {
        initReveal();
    }
}

// =========================================================
// Onglets
// =========================================================

function initTabs() {

    document
        .querySelectorAll('.tab-btn')
        .forEach(btn => {

            btn.addEventListener(
                'click',
                () => {

                    ongletActif =
                        btn.dataset.tab;

                    document
                        .querySelectorAll('.tab-btn')
                        .forEach(b =>
                            b.classList.remove('active')
                        );

                    btn.classList.add('active');

                    renderProducts();
                }
            );

        });
}

// =========================================================
// Filtres par catégorie
// =========================================================

function initFilters() {

    const container =
        document.getElementById(
            'filtersContainer'
        );

    if (!container) return;

    const cats =
        ['Tous', ...CATEGORIES.map(c => c.nom)];

    container.innerHTML = '';

    cats.forEach(cat => {

        const btn =
            document.createElement('button');

        btn.type = 'button';

        btn.textContent = cat;

        btn.className =
            'filter-btn' +
            (cat === categorieActive
                ? ' active'
                : '');

        btn.addEventListener(
            'click',
            () => {

                categorieActive = cat;

                document
                    .querySelectorAll('.filter-btn')
                    .forEach(b =>
                        b.classList.remove('active')
                    );

                btn.classList.add('active');

                renderProducts();
            }
        );

        container.appendChild(btn);
    });
}

// =========================================================
// Catégories
// =========================================================

function renderCategories() {

    const container =
        document.getElementById(
            'categoriesGrid'
        );

    if (!container) return;

    container.innerHTML = '';

    CATEGORIES.forEach(cat => {

        const el =
            document.createElement('button');

        el.type = 'button';

        el.className =
            'cat-card';

        el.innerHTML = `

            <span class="cat-icon">

                <img
                    src="${cat.image}"
                    alt="${cat.nom}"
                >

            </span>

            <span>
                ${cat.nom}
            </span>

        `;

        el.addEventListener(
            'click',
            () => {

                categorieActive =
                    cat.nom;

                document
                    .querySelectorAll('.filter-btn')
                    .forEach(b => {

                        b.classList.toggle(
                            'active',
                            b.textContent === cat.nom
                        );

                    });

                ongletActif =
                    'nouveaux';

                document
                    .querySelectorAll('.tab-btn')
                    .forEach(b => {

                        b.classList.toggle(
                            'active',
                            b.dataset.tab === 'nouveaux'
                        );

                    });

                renderProducts();

                const boutique =
                    document.getElementById(
                        'boutique'
                    );

                if (boutique) {

                    boutique.scrollIntoView({
                        behavior: 'smooth'
                    });

                }

            }
        );

        container.appendChild(el);
    });
}

// =========================================================
// QUICK VIEW
// =========================================================

function openQuickView(id) {

    const p = getProduit(id);

    if (!p) {
        console.error(
            'Produit introuvable :',
            id
        );
        return;
    }

    const images =
        getImages(p);

    let selectedImageIndex = 0;

    const oldPrice = p.ancienPrix
        ? `<span class="old-price">${formatPrix.format(p.ancienPrix)}</span>`
        : '';

    const thumbs =
        images
            .map((img, i) => `

                <button
                    type="button"
                    class="qv-thumb${i === 0 ? ' active' : ''}"
                    data-img="${i}"
                >

                    <img
                        src="${img}"
                        alt="${p.nom} - vue ${i + 1}"
                    >

                </button>

            `)
            .join('');

    const qvBody =
        document.getElementById('qvBody');

    if (!qvBody) {

        console.error(
            'qvBody introuvable'
        );

        return;
    }

    qvBody.innerHTML = `

        <div class="qv-grid">

            <div class="qv-img">

                <img
                    id="qvMain"
                    src="${images[0]}"
                    alt="${p.nom}"
                >

                <div class="qv-thumbs">

                    ${thumbs}

                </div>

            </div>

            <div class="qv-info">

                <p class="categ">
                    ${p.categorie} · ${p.matiere}
                </p>

                <h3>
                    ${p.nom}
                </h3>

                <div class="rating">

                    ${'★'.repeat(Math.round(p.note))}
                    ${'☆'.repeat(5 - Math.round(p.note))}

                    <span>
                        (${p.avis} avis)
                    </span>

                </div>

                <div class="prices">

                    <span class="prix big">
                        ${formatPrix.format(p.prix)}
                    </span>

                    ${oldPrice}

                </div>

                <p class="qv-desc">
                    ${p.description}
                </p>

                <div class="qv-actions">

                    <button
                        type="button"
                        class="btn-add"
                        id="qvAdd"
                    >
                        Ajouter au panier
                    </button>

                    <button
                        type="button"
                        class="btn-buy"
                        id="qvBuy"
                    >
                        Acheter
                    </button>

                </div>

            </div>

        </div>
    `;

    const quickView =
        document.getElementById(
            'quickView'
        );

    const mainImage =
        document.getElementById(
            'qvMain'
        );

    const thumbnails =
        document.querySelectorAll(
            '.qv-thumb'
        );

    // =====================================================
    // Changer d'image
    // =====================================================

    thumbnails.forEach(thumb => {

        thumb.addEventListener(
            'click',
            () => {

                selectedImageIndex =
                    Number(
                        thumb.dataset.img
                    );

                thumbnails.forEach(item => {

                    item.classList.remove(
                        'active'
                    );

                });

                thumb.classList.add(
                    'active'
                );

                mainImage.src =
                    images[selectedImageIndex];

            }
        );

    });

    // =====================================================
    // Référence image
    // =====================================================

    function getSelectedImageRef() {

        const imageSrc =
            images[selectedImageIndex];

        return imageSrc
            .split('/')
            .pop()
            .replace(/\.[^/.]+$/, '');
    }

    // =====================================================
    // Ajouter au panier
    // =====================================================

    const qvAdd =
        document.getElementById(
            'qvAdd'
        );

    if (qvAdd) {

        qvAdd.addEventListener(
            'click',
            () => {

                const imageRef =
                    getSelectedImageRef();

                addToCart(
                    p.id,
                    imageRef
                );

                closeQuickView();

            }
        );

    }

    // =====================================================
    // Acheter directement
    // =====================================================

    const qvBuy =
        document.getElementById(
            'qvBuy'
        );

    if (qvBuy) {

        qvBuy.addEventListener(
            'click',
            () => {

                const imageRef =
                    getSelectedImageRef();

                addToCart(
                    p.id,
                    imageRef
                );

                closeQuickView();

                setTimeout(
                    () => {
                        openCart();
                    },
                    300
                );

            }
        );

    }

    // =====================================================
    // Ouvrir Quick View
    // =====================================================

    if (quickView) {

        quickView.classList.add(
            'open'
        );

        document.body.classList.add(
            'no-scroll'
        );

    }
}

function closeQuickView() {

    const quickView =
        document.getElementById('quickView');

    if (quickView) {

        // نقل الـ focus خارج الـ modal قبل إخفائها
        if (document.activeElement &&
            quickView.contains(document.activeElement)) {

            document.activeElement.blur();
        }

        quickView.classList.remove('open');
        quickView.setAttribute('aria-hidden', 'true');
    }

    document.body.classList.remove('no-scroll');
}
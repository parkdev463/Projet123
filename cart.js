// =========================================================
// cart.js - Panier avec référence de l'image choisie
// =========================================================

let panier = loadCart();

// =========================================================
// Charger panier
// =========================================================

function loadCart() {

    try {

        return JSON.parse(
            localStorage.getItem('bijoux_cart')
        ) || {};

    } catch (e) {

        console.error('Erreur chargement panier:', e);

        return {};

    }
}

// =========================================================
// Sauvegarder panier
// =========================================================

function saveCart() {

    localStorage.setItem(
        'bijoux_cart',
        JSON.stringify(panier)
    );
}

// =========================================================
// Ajouter produit au panier
// =========================================================

function addToCart(id, imageRef = null) {

    const key = imageRef
        ? `${id}_${imageRef}`
        : `${id}`;

    if (!panier[key]) {

        panier[key] = {
            id: Number(id),
            qty: 1,
            imageRef: imageRef
        };

    } else {

        panier[key].qty++;

    }

    saveCart();

    updateCartUI();

    showToast('Produit ajouté au panier');
}

// =========================================================
// Changer quantité
// =========================================================

function changeQty(key, delta) {

    if (!panier[key]) return;

    panier[key].qty += delta;

    if (panier[key].qty <= 0) {

        delete panier[key];

    }

    saveCart();

    updateCartUI();
}

// =========================================================
// Supprimer produit
// =========================================================

function removeItem(key) {

    if (!panier[key]) return;

    delete panier[key];

    saveCart();

    updateCartUI();
}

// =========================================================
// Vider panier
// =========================================================

function clearCart() {

    panier = {};

    saveCart();

    updateCartUI();
}

// =========================================================
// Nombre total articles
// =========================================================

function getCartCount() {

    return Object.values(panier).reduce(
        (total, item) => total + item.qty,
        0
    );
}

// =========================================================
// Liste produits panier
// =========================================================

function getCartItems() {

    return Object.entries(panier)

        .map(([key, item]) => {

            const produit =
                getProduit(item.id);

            if (!produit) return null;

            return {
                key: key,
                produit: produit,
                qty: item.qty,
                imageRef: item.imageRef || null
            };

        })

        .filter(Boolean);
}

// =========================================================
// Totaux
// =========================================================

function getCartTotals() {

    let ht = 0;

    for (const item of getCartItems()) {

        ht +=
            item.produit.prix *
            item.qty;

    }

    const tva =
        ht * TVA_RATE;

    return {

        ht: ht,

        tva: tva,

        ttc: ht + tva,

        count: getCartCount()

    };
}

// =========================================================
// Update panier
// =========================================================

function updateCartUI() {

    updateCartCount();

    renderCart();
}

// =========================================================
// Badge panier
// =========================================================

function updateCartCount() {

    const btn =
        document.getElementById(
            'cartBtn'
        );

    const count =
        document.getElementById(
            'cartCount'
        );

    if (!btn || !count) return;

    count.textContent =
        getCartCount();

    btn.classList.remove('bump');

    void btn.offsetWidth;

    btn.classList.add('bump');
}

// =========================================================
// Afficher panier
// =========================================================

function renderCart() {

    const container =
        document.getElementById(
            'cartItems'
        );

    if (!container) return;

    container.innerHTML = '';

    const items =
        getCartItems();

    // =====================================================
    // Panier vide
    // =====================================================

    if (items.length === 0) {

        container.innerHTML =
            '<p class="no-result">Le panier est vide.</p>';

        const total =
            document.getElementById(
                'cartTotal'
            );

        if (total) {

            total.textContent =
                formatPrix.format(0);

        }

        return;
    }

    // =====================================================
    // Produits
    // =====================================================

    for (const item of items) {

        const produit =
            item.produit;

        const qty =
            item.qty;

        const row =
            document.createElement('div');

        row.className =
            'cart-row';

        // =================================================
        // Image
        // =================================================

        const image =
            document.createElement('img');

        image.className =
            'cart-image';

        const images =
            getImages(produit);

        if (item.imageRef) {

            const selected =
                images.find(img => {

                    const filename =
                        img
                            .split('/')
                            .pop()
                            .replace(
                                /\.[^/.]+$/,
                                ''
                            );

                    return filename ===
                        item.imageRef;

                });

            image.src =
                selected || images[0];

        } else {

            image.src =
                images[0];

        }

        image.alt =
            produit.nom;

        // =================================================
        // Informations
        // =================================================

        const info =
            document.createElement('div');

        info.className =
            'cart-info';

        const nom =
            document.createElement('strong');

        nom.textContent =
            produit.nom;

        const reference =
            document.createElement('small');

        reference.textContent =
            item.imageRef
                ? `Réf: ${item.imageRef}`
                : '';

        const prix =
            document.createElement('span');

        prix.textContent =
            formatPrix.format(
                produit.prix * qty
            );

        info.append(
            nom,
            reference,
            prix
        );

        // =================================================
        // Quantité
        // =================================================

        const qtyCtrl =
            document.createElement('div');

        qtyCtrl.className =
            'cart-qty';

        const minus =
            document.createElement('button');

        minus.type =
            'button';

        minus.textContent =
            '-';

        minus.addEventListener(
            'click',
            () => changeQty(
                item.key,
                -1
            )
        );

        const qtyEl =
            document.createElement('span');

        qtyEl.textContent =
            qty;

        const plus =
            document.createElement('button');

        plus.type =
            'button';

        plus.textContent =
            '+';

        plus.addEventListener(
            'click',
            () => changeQty(
                item.key,
                1
            )
        );

        qtyCtrl.append(
            minus,
            qtyEl,
            plus
        );

        // =================================================
        // Supprimer
        // =================================================

        const remove =
            document.createElement('button');

        remove.type =
            'button';

        remove.className =
            'cart-remove';

        remove.textContent =
            'X';

        remove.addEventListener(
            'click',
            () => removeItem(
                item.key
            )
        );

        // =================================================
        // Ajouter ligne
        // =================================================

        row.append(
            image,
            info,
            qtyCtrl,
            remove
        );

        container.appendChild(row);
    }

    // =====================================================
    // Total
    // =====================================================

    const totals =
        getCartTotals();

    const total =
        document.getElementById(
            'cartTotal'
        );

    if (total) {

        total.textContent =
            formatPrix.format(
                totals.ttc
            );

    }
} 
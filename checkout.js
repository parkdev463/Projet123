// =========================================================
// checkout.js - Formulaire de paiement, TVA, monnaie, commande
// =========================================================

let modePaiement = 'carte';

// ===== Envoi commande vers Google Sheets =====

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw9h_4CgsTcha0RRYbWCyolJ0JMCl_ayvdnd7vVwaw_WdNXAcFnJRs-Bn6hZh7YBTyAPw/exec';
              
function sendOrderToSheet(donnees) {

    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(donnees)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showToast('Commande envoyée ✓', 'success');
        } else {
            showToast('Envoi échoué', 'error');
            console.error(result.error);
        }
    })
    .catch(error => {
        showToast('Envoi échoué (réessayez)', 'error');
        console.error(error);
    });
}

function openCheckout() {
    const totals = getCartTotals();
    if (totals.count === 0) {
        showToast('Le panier est vide !', 'error');
        return;
    }
    renderCheckoutForm();
    document.getElementById('checkoutModal').classList.add('open');
    document.body.classList.add('no-scroll');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('open');
    document.body.classList.remove('no-scroll');
}

// Construire le formulaire de paiement
function renderCheckoutForm() {
    const body = document.getElementById('checkoutBody');
    const totals = getCartTotals();

    const itemsList = getCartItems()
        .map(item => `${item.produit.nom} x${item.qty}`)
        .join(', ');

    body.innerHTML = `
        <div class="form-body">
            <div class="form-group">
                <label for="nom">Nom complet *</label>
                <input type="text" id="nom" placeholder="Ex: Fatima Zahra">
            </div>
            <div class="form-group">
                <label for="tel">Téléphone *</label>
                <input type="tel" id="tel" placeholder="06 XX XX XX XX">
            </div>
            <div class="form-group">
                <label for="ville">Ville *</label>
                      <input type="text" id="ville" placeholder="Ex: Agadir, Casablanca...">
            </div>
            <div class="form-group">
                <label for="adresse">Adresse de livraison</label>
                <input type="text" id="adresse" placeholder="Ville, quartier...">
            </div>

            <div class="form-group">
                <label>Mode de paiement</label>
                <div class="pay-methods" id="payMethods">
                    <button type="button" class="pay-method" data-mode="carte">Carte</button>
                    <button type="button" class="pay-method" data-mode="especes">Espèces</button>
                    <button type="button" class="pay-method" data-mode="virement">Virement</button>
                </div>
            </div>

            <div class="cash-area" id="cashArea">
                <div class="form-group">
                    <label for="montantRecu">Montant reçu (MAD)</label>
                    <input type="number" id="montantRecu" min="0" placeholder="0,00">
                </div>
                <div class="summary">
                    <div class="summary-row">
                        <span>Monnaie à rendre</span>
                        <span id="monnaieDisplay"></span>
                    </div>
                </div>
            </div>

            <div class="summary">
                <div class="summary-row"><span>Articles</span><span>${itemsList}</span></div>
                <div class="summary-row total"><span>Total TTC</span><span>${formatPrix.format(totals.ttc)}</span></div>
            </div>

            <button class="btn-confirm" id="confirmBtn">Confirmer la commande</button>
        </div>
    `;

    // Mode de paiement : sélection
    document.querySelectorAll('.pay-method').forEach(btn => {
        btn.addEventListener('click', () => selectPayMode(btn.dataset.mode));
    });
    selectPayMode('carte');

    // Calcul de la monnaie en direct
    document.getElementById('montantRecu').addEventListener('input', updateMonnaie);

    document.getElementById('confirmBtn').addEventListener('click', submitOrder);
}

function selectPayMode(mode) {
    modePaiement = mode;
    document.querySelectorAll('.pay-method').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.mode === mode);
    });
    const showCash = mode === 'especes';
    document.getElementById('cashArea').classList.toggle('visible', showCash);
    if (showCash) updateMonnaie();
}

function updateMonnaie() {
    const recu = parseFloat(document.getElementById('montantRecu').value) || 0;
    const ttc = getCartTotals().ttc;
    document.getElementById('monnaieDisplay').textContent = formatPrix.format(Math.max(0, recu - ttc));
}

// Valider et confirmer la commande
function submitOrder() {
    const nom   = document.getElementById('nom').value.trim();
    const tel   = document.getElementById('tel').value.trim();
    const ville = document.getElementById('ville').value.trim();

    if (nom.length < 3) {
        showToast('Chghli smiytek !', 'error');
        return;
    }


if (ville.length < 2) {
    showToast('Chti la ville !', 'error');
    return;
}
    const telClean = tel.replace(/[\s.-]/g, '');

if (!/^(\+212|0)[5-7]\d{8}$/.test(telClean)) {
    
}

    const totals = getCartTotals();

    // Paiement en espèces : vérifier que le montant est suffisant
    if (modePaiement === 'especes') {
        const recu = parseFloat(document.getElementById('montantRecu').value) || 0;
        if (recu < totals.ttc) {
            showToast('Montant reçu qell mn total TTC !', 'error');
            return;
        }
    }

    const numero = 'BM-' + Date.now().toString().slice(-6);
    const monnaie = modePaiement === 'especes'
        ? formatPrix.format((parseFloat(document.getElementById('montantRecu').value) || 0) - totals.ttc)
        : '-';

    // Envoi vers le Google Sheet
    sendOrderToSheet({
        numero: numero,
        nom: nom,
        tel: tel,
        ville: ville,
        adresse: document.getElementById('adresse').value.trim(),
        modePaiement: modePaiement,

        items: getCartItems()
    .map(i => {
        const images = getImages(i.produit);

        const imageRef = i.imageRef || (
            images[0]
                ? images[0]
                    .split('/')
                    .pop()
                    .replace(/\.[^/.]+$/, '')
                : ''
        );

        return `${i.produit.nom} — ${imageRef} x${i.qty}`;
    })
    .join(', '),
         totalTTC: totals.ttc, 
        date: new Date().toLocaleString('fr-MA')
    });

    renderSuccess(numero, totals, monnaie);
    clearCart();
}

// Écran de confirmation
function renderSuccess(numero, totals, monnaie) {
    const body = document.getElementById('checkoutBody');
    document.getElementById('modalTitle').textContent = 'Commande confirmée';

    body.innerHTML = `
        <div class="success-view">
            <div class="success-icon">&#10003;</div>
            <h4> Merci pour votre confiance   </h4>
            <p>Numéro de commande :</p>
            <p class="order-num">${numero}</p>
            <p>Total payé : <strong>${formatPrix.format(totals.ttc)}</strong></p>
            <p>Mode : ${modePaiement === 'especes' ? 'Espèces' : modePaiement === 'carte' ? 'Carte bancaire' : 'Virement'}</p>
            ${monnaie !== '-' ? `<p>Monnaie à rendre : <strong>${monnaie}</strong></p>` : ''}
            <br>
            <button class="btn-confirm" id="doneBtn">Fermer</button>
        </div>
    `;

    document.getElementById('doneBtn').addEventListener('click', () => {
        closeCheckout();
        document.getElementById('modalTitle').textContent = 'Finaliser la commande';
    });
}

// =========================================================
// data.js - Produits, catégories, avis, FAQ de la boutique
// =========================================================

// Taux de TVA (20% au Maroc)
const TVA_RATE = 0.20;

// Formatteur de prix : 1.200,00 MAD
const formatPrix = new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD'
});

// Catégories (avec icône = lettre affichée dans un cercle)
const CATEGORIES = [
    { nom: 'Bagues', image:                  'images/Bague01.jpg' },
    { nom: 'Colliers', image:                'images/Collier01.jpeg' },
    { nom: "Boucles d'oreilles", image:      'images/Boucles01.JPEG' },
    { nom: 'Bracelets', image:               'images/Bracelet01.jpg' },
    { nom: 'Khalkhal', image:                'images/Khalkhal01.jpg' },
    { nom: 'Ensembles', image:               'images/Ensemble01.jpg' }

];

// Produits : id, nom, categorie, matiere, prix, ancienPrix, note,
//            avis, tag (nouveau | promo | bestseller | ''), description
const PRODUITS = [
    {
        id: 1, nom: 'Bague Solitaire Zircon', categorie: 'Bagues', matiere: 'Argent 925',
        prix: 159 , ancienPrix: 349, note: 4.8, avis: 32, tag: 'promo',
         description: 'Bague solitaire en argent 925 avec zircon étincelant. Élégante au quotidien comme pour les grandes occasions.',
        images: ['images/Bague01.jpg', 'images/Bague02.jpg', 'images/Bague03.jpg', 'images/Bague03.jpg', 'images/Bague04.jpg', 'images/Bague05.jpg', 'images/Bague06.jpg', 'images/Bague07.jpg', 'images/Bague08.jpg', 'images/Bague09.jpg']

    },
    {
        id: 2, nom: 'Bague Amazigh Or 18K', categorie: 'Bagues', matiere: 'Or 18K',
        prix: 149, ancienPrix: 0, note: 5.0, avis: 18, tag: 'bestseller',
          description: 'Bague aux motifs amazighs gravés main, en or 18K certifié et poinçonné.',
        images: ['images/Bague11.jpg', 'images/Bague12.jpg', 'images/Bague13.jpg', 'images/Bague14.jpg', 'images/Bague15.jpg', 'images/Bague16.jpg', 'images/Bague17.jpg', 'images/Bague17.jpg', 'images/Bague18.jpg', 'images/Bague19.jpg']
    },
    {
        id: 3, nom: 'Bague Raffinée Mariage', categorie: 'Bagues', matiere: 'Acier inoxydable',
        prix: 149, ancienPrix: 199, note: 4.6, avis: 27, tag: 'promo',
         description: 'Duo bagues alliance plaqué or blanc avec zircon, idéal pour le mariage ou fiançailles.',
        images: ['images/Bague20.jpg', 'images/Bague21.jpg', 'images/Bague22.jpg', 'images/Bague23.jpg', 'images/Bague24.jpg', 'images/Bague25.jpg', 'images/Bague26.jpg', 'images/Bague27.jpg', 'images/Bague28.jpg']
    },
    {
        id: 4, nom: 'Collier Inoxydable', categorie: 'Colliers', matiere: 'Argent 925',
        prix: 179, ancienPrix: 0, note: 4.9, avis: 41, tag: 'nouveau',
         description: 'Collier personnalisable avec vos initiales en alphabet tifinagh, sur chaîne en argent 925.',
        images: ['images/Collier01.jpeg', 'images/Collier02.jpeg', 'images/Collier03.jpeg', 'images/Collier04.jpeg', 'images/Collier05.jpeg', 'images/Collier06.jpeg', 'images/Collier07.jpeg', 'images/Collier08.jpeg', 'images/Collier09.jpeg']
    },
    {
        id: 5, nom: 'Collier Berbère Perles', categorie: 'Colliers', matiere: 'Perles',
        prix: 189, ancienPrix: 0, note: 4.7, avis: 23, tag: 'bestseller',
         description: 'Collier berbère en perles de rocaille et pendentif artisanal, fait main au Maroc.',
        images: ['images/Collier18.jpeg', 'images/Collier19.jpeg', 'images/Collier20.jpeg', 'images/Collier21.jpeg', 'images/Collier22.jpeg', 'images/Collier23.jpeg', 'images/Collier24.jpeg', 'images/Collier25.jpeg', 'images/Collier26.jpeg']
    },
    {
        id: 6, nom: 'Collier Prénom', categorie: 'Colliers', matiere: 'Argent 925',
        prix: 159, ancienPrix: 420, note: 4.8, avis: 56, tag: 'promo',
         description: 'Collier prénom personnalisé, gravure de votre choix, livré dans un joli écrin cadeau.',
        images: ['images/Collier27.jpeg', 'images/Collier28.jpeg', 'images/Collier29.jpeg', 'images/Collier30.jpeg', 'images/Collier31.jpeg', 'images/Collier32.jpeg', 'images/Collier33.jpeg', 'images/Collier34.jpeg', 'images/Collier25.jpeg']
    },
    {
        id: 7, nom: 'Boucles Sphère Perles', categorie: "Boucles d'oreilles", matiere: 'Perles d\'eau douce',
        prix: 159, ancienPrix: 0, note: 4.9, avis: 15, tag: 'nouveau',
         description: 'Boucles d\'oreilles sphère en véritables perles d\'eau douce, montage doré à l\'or fin.',
        images: ['images/BoucleS01.JPEG', 'images/Boucles02.JPEG', 'images/Boucles03.JPEG', 'images/Boucles04.JPEG', 'images/Boucles05.JPEG', 'images/Boucles06.JPEG', 'images/Boucles07.JPEG', 'images/Boucles08.JPEG']

    },
    {
        id: 8, nom: 'Boucles Zellige', categorie: "Boucles d'oreilles", matiere: 'Acier inoxydable',
        prix: 120, ancienPrix: 150, note: 4.5, avis: 38, tag: 'promo',
         description: 'Boucles aux motifs zellige colorés, légères et hypoallergéniques.',
        images: ['images/Boucles10.JPEG', 'images/Boucles11.JPEG', 'images/Boucles12.JPEG', 'images/Boucles13.JPEG', 'images/Boucles14.JPEG', 'images/Boucles15.JPEG', 'images/Boucles16.JPEG', 'images/Boucles17.JPEG', 'images/Boucles18.JPEG', 'images/Boucles19.JPEG']
    },
    {
        id: 9, nom: 'Boucles Créoles Or 18K', categorie: "Boucles d'oreilles", matiere: 'Or 18K',
        prix: 159, ancienPrix: 0, note: 5.0, avis: 12, tag: 'bestseller',
         description: 'Créoles en or 18K certifié, finition brillante, garanties 10 ans.',
        images: ['images/Boucles20.JPEG', 'images/Boucles21.JPEG', 'images/Boucles23.JPEG', 'images/Boucles24.JPEG', 'images/Boucles25.JPEG', 'images/Boucles26.JPEG', 'images/Boucles27.JPEG', 'images/Boucles28.JPEG', 'images/Boucles29.JPEG']
    },
    {
        id: 10, nom: 'Bracelet Zellige', categorie: 'Bracelets', matiere: 'Acier inoxydable',
        prix: 179, ancienPrix: 130, note: 4.4, avis: 61, tag: 'promo',
         description: 'Bracelet joncs zellige doré, résistant à l\'eau et aux rayures.',
        images: ['images/Bracelet01.jpg', 'images/Bracelet02.jpg', 'images/Bracelet03.jpg', 'images/Bracelet04.jpg', 'images/Bracelet05.jpg', 'images/Bracelet06.jpg', 'images/Bracelet07.jpg', 'images/Bracelet08.jpg']
    },
    {
        id: 11, nom: 'Bracelet Macramé Oasis', categorie: 'Bracelets', matiere: 'Macramé',
        prix: 139, ancienPrix: 0, note: 4.6, avis: 29, tag: 'nouveau',
         description: 'Bracelet macramé ajustable avec perles émeraude synthétique, style bohème chic.',
        images: ['images/Bracelet09.jpg', 'images/Bracelet10.jpg', 'images/Bracelet11.jpg', 'images/Bracelet12.jpg', 'images/Bracelet13.jpg', 'images/Bracelet14.jpg', 'images/Bracelet15.jpg', 'images/Bracelet16.jpg']
    },
    {
        id: 12, nom: 'Bracelet Fusion Tourmaline', categorie: 'Bracelets', matiere: 'Or 18K',
        prix: 169, ancienPrix: 0, note: 4.7, avis: 20, tag: 'bestseller',
         description: 'Bracelet haute joaillerie en or 18K avec pierres tourmaline naturelles.',
        images: ['images/Bracelet17.jpg', 'images/Bracelet18.jpg', 'images/Bracelet19.jpg', 'images/Bracelet20.jpg', 'images/Bracelet21.jpg', 'images/Bracelet22.jpg', 'images/Bracelet23.jpg', 'images/Bracelet24.jpg', 'images/Bracelet25.jpg']
    },
    {
        id: 13, nom: 'Khalkhal Traditionnel', categorie: 'Khalkhal', matiere: 'Argent 925',
        prix: 119, ancienPrix: 0, note: 4.9, avis: 33, tag: 'bestseller',
         description: 'Khalkhal traditionnel marocain en argent 925, symbole de l\'élégance féminine.',
        images: ['images/Khalkhal01.jpg', 'images/Khalkhal02.jpg', 'images/Khalkhal03.jpg', 'images/Khalkhal04.jpg', 'images/Khalkhal05.jpg', 'images/Khalkhal06.jpg', 'images/Khalkhal07.jpg', 'images/Khalkhal08.jpg']
    
    },
    {
        id: 14, nom: 'Chokara Enfant', categorie: 'Khalkhal', matiere: 'Acier inoxydable',
        prix: 119, ancienPrix: 400, note: 4.5, avis: 14, tag: 'promo',
         description: 'Chokara dorée pour enfants, douce pour la peau, idéale pour les fêtes.',
        images: ['images/Khalkhal09.jpg', 'images/Khalkhal10.jpg', 'images/Khalkhal11.jpg', 'images/Khalkhal12.jpg', 'images/Khalkhal13.jpg', 'images/Khalkhal14.jpg', 'images/Khalkhal15.jpg', 'images/Khalkhal16.jpg']
    },
    {
        id: 15, nom: 'Parure Mariage Amazigh', categorie: 'Ensembles', matiere: 'Or 18K',
        prix: 219, ancienPrix: 0, note: 5.0, avis: 9, tag: 'nouveau',
        description: 'Parure complète de mariage : collier, boucles et bracelet aux motifs amazighs traditionnels.',
        images: ['images/Ensemble01.jpg', 'images/Ensemble02.jpg', 'images/Ensemble03.jpg','images/Ensemble04.jpg',]
    },
    {
        id: 16, nom: 'Ensemble Zellige Cadeau', categorie: 'Ensembles', matiere: 'Acier inoxydable',
        prix: 199, ancienPrix: 280, note: 4.6, avis: 25, tag: 'promo',
        description: 'Ensemble collier + boucles zellige dans un écrin cadeau, parfait pour offrir.',
         images: ['images/Ensemble05.jpg', 'images/Ensemble06.jpg', 'images/Ensemble07.jpg', 'images/Ensemble08.jpg', 'images/Ensemble09.jpg', 'images/Ensemble010.jpg', 'images/Ensemble11.jpg', 'images/Ensemble12.jpg', 'images/Ensemble13.jpg', 'images/Ensemble14.jpg', 'images/Ensemble15.jpg', 'images/Ensemble16.jpg', 'images/Ensemble17.jpg', 'images/Ensemble18.jpg', 'images/Ensemble19.jpg', 'images/Ensemble20.jpg']
    }
];

// Avis clients
const AVIS = [
    { nom: 'Fatima E.', texte: 'Finition top w ta3amol mzyan. Je recommande à 100% !', note: 5 },
    { nom: 'Sara B.', texte: 'Le collier est encore plus beau en vrai, la livraison a été super rapide sur Casablanca.', note: 5 },
    { nom: 'Jalila M.', texte: 'Khdiyt l\'ensemble cadeau l maman, 3jbeha bzaaf. Chokran 3la l\'emballage zwin w la livraison f lwa9t.', note: 5 },
    { nom: 'Mouna S.', texte: 'Les finitions des bagues sont impeccables, le rapport qualité/prix est excellent.', note: 4 },
    { nom: 'Latifa A.', texte: 'السلام عليكم، وصلني الكوليي اليوم كيحمق، نفس التصويرة لي في السيت، الصراحة السلعة نقية.', note: 5 },
    { nom: 'Sanaa L.', texte: 'Ils m\'ont tout expliqué sur WhatsApp avant la livraison. Bijou magnifique et très classe.', note: 5 }
];

// FAQ
const FAQ = [
    { q: 'Comment se passe la livraison ?', r: 'Après votre commande, notre équipe vous contacte pour confirmer les détails. La livraison prend entre 1 à 3 jours selon votre ville. Paiement à la livraison disponible.' },
    { q: 'Livrez-vous partout au Maroc ?', r: 'Oui ! Nous livrons dans tout le Maroc : Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Oujda et plus encore.' },
    { q: 'Quels sont les modes de paiement ?', r: 'Paiement à la livraison (COD), carte bancaire, espèces et virement bancaire.' },
    { q: 'Comment connaître ma taille de bague ?', r: 'Pas de souci ! Une fois votre commande passée, nous vous contactons pour confirmer la taille avant expédition.' },
    { q: 'Quelle est la différence entre Or 18K, Argent 925 et Acier ?', r: 'L\'Or 18K contient 75% d\'or pur. L\'Argent 925 est hypoallergénique pour un usage quotidien. L\'Acier inoxydable résiste à l\'eau et aux rayures à petit prix.' },
    { q: 'Puis-je échanger ou retourner ?', r: 'Oui, échange sous 5 jours et retour sous 7 jours après réception, à condition que le bijou soit non porté et dans son emballage d\'origine.' }
];

// Helper : récupérer un produit par son id
function getProduit(id) {
    return PRODUITS.find(p => p.id === Number(id));
}

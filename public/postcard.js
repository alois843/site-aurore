// Sélectionner les éléments du DOM
const carte = document.getElementById('carte');
const recto = document.getElementById('recto');
const fileInput = document.getElementById('fileInput');
const textArea = document.getElementById('text');
const saveButton = document.getElementById('saveButton');
const savedCardsContainer = document.getElementById('savedCards');

// Charger les données depuis l'API (backend)
document.addEventListener('DOMContentLoaded', () => {
    let savedCards = [];
    fetch('http://localhost:3000/cards') // Adresse de l'API
        .then(response => response.json())
        .then(data => {
            savedCards = data;
            savedCards.forEach((card, index) => {
                displaySavedCard(card, index);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des cartes :', error);
        });

    // Attacher l'événement pour la carte (rotation)
    attachFlipEvent();
});

// Fonction pour retourner la carte
function toggleFlip() {
    if (document.activeElement !== textArea) {
        carte.classList.toggle('is-flipped');
    }
}

// Fonction pour attacher l'événement de retour
function attachFlipEvent() {
    carte.removeEventListener('click', toggleFlip);  // Enlever un éventuel ancien écouteur
    carte.addEventListener('click', toggleFlip);
}

// Fonction pour afficher l'image choisie
function changerImage() {
    fileInput.click();
}

// Fonction pour charger l'image choisie
function loadImage(event) {
    const reader = new FileReader();
    
    reader.onload = function() {
        const imageUrl = reader.result;
        const img = new Image();
        img.src = imageUrl;
        img.onload = function() {
            recto.innerHTML = ''; // Effacer le texte "Choisir une image"
            recto.appendChild(img); // Ajouter l'image dans le recto
        };
    };
    
    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}

saveButton.addEventListener('click', () => {
    // Vérification de l'image dans le recto
    const imageUrl = recto.querySelector('img') ? recto.querySelector('img').src : ''; // Récupération de l'image
    const texte = textArea.value;

    if (imageUrl && texte) {
        // Créer une carte à enregistrer
        const newCard = { image: imageUrl, text: texte };

        // Envoi de la carte au serveur
        fetch('http://localhost:3000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCard),  // Données envoyées
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'enregistrement de la carte');
            }
            return response.json();
        })
        .then(() => {
            // Réinitialisation de la liste des cartes affichées
            savedCardsContainer.innerHTML = ''; // Vider les cartes affichées
            fetch('http://localhost:3000/cards')  // Récupérer les cartes du serveur
                .then(response => response.json())
                .then(data => {
                    // Afficher toutes les cartes sauvegardées
                    data.forEach((card, index) => {
                        displaySavedCard(card, index);
                    });
                });

            // Réinitialiser la carte actuelle
            recto.innerHTML = 'Choisir une image';
            textArea.value = '';
            carte.classList.remove('is-flipped');
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de la carte :', error);
        });
    } else {
        alert('Veuillez ajouter une image et un texte pour enregistrer la carte.');
    }
});



// Afficher une carte sauvegardée
function displaySavedCard(card, index) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('saved-card');

    const content = document.createElement('div');
    content.classList.add('card-content');

    const img = document.createElement('img');
    img.src = card.image;
    img.classList.add('saved-card-img');
    content.appendChild(img);

    const text = document.createElement('p');
    text.classList.add('saved-card-text');
    text.textContent = card.text.length > 30 ? card.text.slice(0, 30) + '...' : card.text;
    content.appendChild(text);

    cardElement.addEventListener('click', () => {
        openFullscreenCard(card);
    });

    cardElement.appendChild(content);
    savedCardsContainer.appendChild(cardElement);
}

// Ouvrir une carte en plein écran
function openFullscreenCard(card) {
    const fullscreenCardContainer = document.createElement('div');
    fullscreenCardContainer.classList.add('fullscreen-card');
    const fullscreenCard = document.createElement('div');
    fullscreenCard.classList.add('carte');
    const recto = document.createElement('div');
    recto.classList.add('recto');
    const verso = document.createElement('div');
    verso.classList.add('verso');
    
    const img = new Image();
    img.src = card.image;
    recto.appendChild(img);
    verso.innerHTML = card.text;

    fullscreenCard.appendChild(recto);
    fullscreenCard.appendChild(verso);
    fullscreenCardContainer.appendChild(fullscreenCard);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-fullscreen');
    closeButton.innerHTML = 'X';
    closeButton.addEventListener('click', () => {
        fullscreenCardContainer.remove();
    });

    fullscreenCardContainer.appendChild(closeButton);
    document.body.appendChild(fullscreenCardContainer);

    fullscreenCard.addEventListener('click', () => {
        fullscreenCard.classList.toggle('is-flipped');
    });
}

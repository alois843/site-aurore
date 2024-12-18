document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll(".category-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    // Fonction pour afficher/masquer les images en fonction de la catégorie
    function filterGallery(category) {
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute("data-category");
            if (category === "all" || itemCategory === category) {
                item.style.display = "block";  // Affiche l'élément
            } else {
                item.style.display = "none";  // Cache l'élément
            }
        });
    }

    // Ajouter un événement aux boutons de catégories
    categoryButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Active le bouton sélectionné et désactive les autres
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Filtrer les images en fonction de la catégorie
            const category = button.getAttribute("data-category");
            filterGallery(category);
        });
    });

    // Afficher toutes les images par défaut au chargement de la page
    filterGallery("all");
});


// Récupérer tous les éléments d'image de la galerie
const galleryImages = document.querySelectorAll('.gallery-img');

// Récupérer le lightbox et l'image dans le lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

// Ajouter un événement pour chaque image
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        // Afficher le lightbox et l'image agrandie
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src; // Mettre l'image cliquée dans le lightbox
    });
});

// Fermer le lightbox lorsque l'on clique sur le bouton de fermeture
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Fermer le lightbox lorsqu'on clique en dehors de l'image (sur le fond noir)
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Changement de vue (grille/liste)
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productsGrid = document.querySelector('.products-grid');
    
    gridViewBtn.addEventListener('click', function() {
        productsGrid.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', function() {
        productsGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
    
    // Tri des produits
    const sortSelect = document.getElementById('sort');
    sortSelect.addEventListener('change', function() {
        // Ici vous feriez une requête AJAX ou rechargeriez la page avec le paramètre de tri
        console.log('Tri sélectionné:', this.value);
    });
    
    // Filtres de prix
    const priceRange = document.getElementById('priceRange');
    priceRange.addEventListener('input', function() {
        // Mettre à jour l'affichage des valeurs de prix
        console.log('Plage de prix:', this.value);
    });
    
    // Ajout au panier
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.id || '123'; // À remplacer par l'ID réel
            
            // Animation
            this.innerHTML = '<i class="fas fa-check"></i> Ajouté';
            this.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Ajouter';
                this.style.backgroundColor = '#ff6b6b';
            }, 2000);
            
            // Mettre à jour le compteur du panier
            updateCartCounter();
        });
    });
    
    // Wishlist
    document.querySelectorAll('.btn-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-heart"></i>';
            this.style.color = '#ff6b6b';
        });
    });
    
    // Fonction pour mettre à jour le compteur du panier
    function updateCartCounter() {
        const currentCount = parseInt(document.querySelector('.cart-counter').textContent);
        document.querySelectorAll('.cart-counter').forEach(counter => {
            counter.textContent = currentCount + 1;
        });
    }
    
    // Filtres mobiles
    const mobileFilterBtn = document.createElement('button');
    mobileFilterBtn.className = 'btn-filter-mobile';
    mobileFilterBtn.innerHTML = '<i class="fas fa-filter"></i> Filtres';
    document.querySelector('.page-header').appendChild(mobileFilterBtn);
    
    mobileFilterBtn.addEventListener('click', function() {
        document.querySelector('.category-filters').style.display = 
            document.querySelector('.category-filters').style.display === 'block' ? 'none' : 'block';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Charger le panier depuis le localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartProductsList = document.getElementById('cart-products-list');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Afficher les produits du panier
    displayCartItems(cart);
    
    // Mettre à jour le compteur du panier dans la navbar
    updateCartCounter();
    
    // Fonction pour afficher les articles du panier
    function displayCartItems(cartItems) {
        if (cartItems.length === 0) {
            cartProductsList.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Votre panier est vide</p>
                    <a href="produits.html" class="btn-primary">Commencer vos achats</a>
                </div>
            `;
            checkoutBtn.disabled = true;
            updateCartTotals(0);
            return;
        }
        
        checkoutBtn.disabled = false;
        
        let html = '';
        let subtotal = 0;
        
        cartItems.forEach((item, index) => {
            const price = parseFloat(item.price.replace(',', '.').replace(/[^\d.-]/g, ''));
            const itemTotal = price * item.quantity;
            subtotal += itemTotal;
            
            html += `
                <div class="cart-item" data-index="${index}">
                    <div class="cart-item-info">
                        <div class="cart-item-image" style="background-image: url('${item.image || 'default-product.jpg'}')"></div>
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn decrease-btn">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn increase-btn">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="cart-item-price">
                        <span>${itemTotal.toFixed(2)} dt</span>
                        <button class="remove-item"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
        
        cartProductsList.innerHTML = html;
        updateCartTotals(subtotal);
        
        // Ajouter les écouteurs d'événements pour les boutons
        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase-btn').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    }
    
    // Fonction pour diminuer la quantité
    function decreaseQuantity(e) {
        const cartItem = e.target.closest('.cart-item');
        const index = parseInt(cartItem.dataset.index);
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems(cart);
            updateCartCounter();
        }
    }
    
    // Fonction pour augmenter la quantité
    function increaseQuantity(e) {
        const cartItem = e.target.closest('.cart-item');
        const index = parseInt(cartItem.dataset.index);
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems(cart);
        updateCartCounter();
    }
    
    // Fonction pour supprimer un article
    function removeItem(e) {
        const cartItem = e.target.closest('.cart-item');
        const index = parseInt(cartItem.dataset.index);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems(cart);
        updateCartCounter();
    }
    
    // Fonction pour mettre à jour les totaux
    function updateCartTotals(subtotal) {
        cartSubtotal.textContent = subtotal.toFixed(2) + ' dt';
        cartTotal.textContent = subtotal.toFixed(2) + ' dt'; // Ici vous pourriez ajouter des frais de livraison
    }
    
    // Fonction pour mettre à jour le compteur du panier
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        document.querySelectorAll('.cart-counter').forEach(counter => {
            counter.textContent = totalItems;
        });
    }
    
    // Gestion du bouton de commande
    checkoutBtn.addEventListener('click', function() {
        // Redirection vers la page de paiement
        window.location.href = 'checkout.html';
    });
});
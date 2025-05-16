document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load real user data from API
        const response = await fetch('/api/user-profile.php', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch user data');
        
        const userData = await response.json();
        loadUserData(userData);
        
        // Setup navigation and forms
        setupAccountNavigation();
        setupForms();
        
        // Load real orders if on orders page
        if (window.location.hash === '#commandes') {
            loadOrders();
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Erreur de chargement des données', 'error');
    }
});

async function loadUserData(user) {
    document.getElementById('username').textContent = user.nom;
    document.getElementById('user-email').textContent = user.email;
    
    // Fill profile form
    const form = document.getElementById('profile-form');
    form.elements['fullname'].value = user.nom;
    form.elements['email'].value = user.email;
    form.elements['phone'].value = user.telephone || '';
    form.elements['birthdate'].value = user.date_naissance || '';
    
    // Fill beauty preferences
    const beautyForm = document.getElementById('beauty-profile-form');
    if (user.profile_beaute) {
        beautyForm.elements['skin-type'].value = user.profile_beaute.type_peau || '';
        
        if (user.profile_beaute.problemes) {
            const problemes = JSON.parse(user.profile_beaute.problemes);
            problemes.forEach(issue => {
                const checkbox = beautyForm.querySelector(`input[value="${issue}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
        
        beautyForm.elements['fav_brands'].value = user.profile_beaute.marques_preferees || '';
    }
}

async function saveProfile(form) {
    try {
        const response = await fetch('/api/update-profile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                nom: form.elements['fullname'].value,
                email: form.elements['email'].value,
                telephone: form.elements['phone'].value,
                date_naissance: form.elements['birthdate'].value
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Profil mis à jour avec succès!', 'success');
        } else {
            throw new Error(data.message || 'Erreur de mise à jour');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification(error.message, 'error');
    }
}

async function loadOrders() {
    try {
        const response = await fetch('/api/user-orders.php', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch orders');
        
        const orders = await response.json();
        renderOrders(orders);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('orders-container').innerHTML = 
            '<p class="error">Erreur de chargement des commandes</p>';
    }
}

function renderOrders(orders) {
    const container = document.getElementById('orders-container');
    container.innerHTML = '';
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="no-orders">Vous n\'avez pas encore passé de commande.</p>';
        return;
    }
    
    orders.forEach(order => {
        const orderEl = document.createElement('div');
        orderEl.className = 'order-card';
        
        orderEl.innerHTML = `
            <div class="order-header">
                <h3>Commande #${order.id}</h3>
                <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-date">${new Date(order.date_commande).toLocaleDateString('fr-FR')}</div>
            <div class="order-total">Total: ${order.total.toFixed(2)} €</div>
            
            <div class="order-products">
                <h4>Produits :</h4>
                <ul>
                    ${order.produits.map(p => `
                        <li>${p.quantite} × ${p.nom} - ${p.prix.toFixed(2)} €</li>
                    `).join('')}
                </ul>
            </div>
            
            <button class="btn-track" data-id="${order.id}">Suivre ma commande</button>
        `;
        
        container.appendChild(orderEl);
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}


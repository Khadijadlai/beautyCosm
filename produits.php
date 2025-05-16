<?php
require_once 'includes/config.php';
require_once 'includes/functions.php';

$page_title = 'Tous nos produits - BeautyCosm';
include 'includes/header.php';

// Récupérer tous les produits
$stmt = $db->query("SELECT * FROM products ORDER BY created_at DESC");
$products = $stmt->fetchAll();
?>

<div class="products-header">
    <h1>Nos Produits</h1>
    <div class="sort-options">
        <select id="sort-products" class="form-control">
            <option value="newest">Nouveautés</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
            <option value="popular">Plus populaires</option>
        </select>
    </div>
</div>

<div class="category-filters">
    <a href="produits.php" class="category-filter active">Tous</a>
    <a href="produits.php?category=visage" class="category-filter">Soin Visage</a>
    <a href="produits.php?category=cheveux" class="category-filter">Soin Cheveux</a>
    <a href="produits.php?category=corps" class="category-filter">Soin Corps</a>
    <a href="produits.php?category=maquillage" class="category-filter">Maquillage</a>
    <a href="produits.php?category=parfum" class="category-filter">Parfum</a>
</div>

<div class="products-grid">
    <?php if (empty($products)): ?>
        <div class="no-products">
            <i class="fas fa-box-open"></i>
            <p>Aucun produit disponible pour le moment</p>
        </div>
    <?php else: ?>
        <?php foreach ($products as $product): ?>
            <div class="product-card" data-id="<?= $product['id'] ?>">
                <div class="product-badge">
                    <?php if ($product['stock'] <= 5 && $product['stock'] > 0): ?>
                        <span class="badge badge-warning">Bientôt épuisé</span>
                    <?php elseif ($product['stock'] == 0): ?>
                        <span class="badge badge-danger">Rupture</span>
                    <?php elseif (strtotime($product['created_at']) > strtotime('-1 month')): ?>
                        <span class="badge badge-success">Nouveau</span>
                    <?php endif; ?>
                </div>
                
                <a href="produit.php?id=<?= $product['id'] ?>" class="product-image">
                    <img src="assets/products/<?= $product['image'] ?>" alt="<?= htmlspecialchars($product['name']) ?>">
                </a>
                
                <div class="product-info">
                    <h3><a href="produit.php?id=<?= $product['id'] ?>"><?= htmlspecialchars($product['name']) ?></a></h3>
                    <div class="product-category"><?= ucfirst($product['category']) ?></div>
                    
                    <div class="product-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <span>(128)</span>
                    </div>
                    
                    <div class="product-price">
                        <span><?= formatPrice($product['price']) ?></span>
                        <?php if ($product['old_price'] > 0): ?>
                            <span class="old-price"><?= formatPrice($product['old_price']) ?></span>
                        <?php endif; ?>
                    </div>
                    
                    <div class="product-actions">
                        <button class="btn-wishlist" data-id="<?= $product['id'] ?>">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="btn-add-to-cart" 
                                data-id="<?= $product['id'] ?>"
                                <?= $product['stock'] == 0 ? 'disabled' : '' ?>>
                            <i class="fas fa-shopping-cart"></i>
                            <?= $product['stock'] == 0 ? 'Rupture' : 'Ajouter' ?>
                        </button>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

<div class="pagination">
    <a href="#" class="page-link active">1</a>
    <a href="#" class="page-link">2</a>
    <a href="#" class="page-link">3</a>
    <span class="page-link">...</span>
    <a href="#" class="page-link">10</a>
</div>

<?php include 'includes/footer.php'; ?>
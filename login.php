<?php
session_start();
require 'index.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'];
    $password = $_POST['mot_de_passe'];

    // Rechercher l’utilisateur par email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['mot_de_passe'])) {
        // Authentification réussie
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_nom'] = $user['nom'];
        echo "Connexion réussie. Bienvenue " . $user['nom'] . "!";
    } else {
        echo "Email ou mot de passe incorrect.";
    }
}
?>

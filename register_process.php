<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm = $_POST['confirm_password'];

    if ($password !== $confirm) {
        die("Les mots de passe ne correspondent pas.");
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    try {
        $stmt->execute([$name, $email, $hashedPassword]);
        echo "Inscription réussie ! <a href='register.php'>Retour</a>";
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            echo "Cet email est déjà utilisé.";
        } else {
            echo "Erreur : " . $e->getMessage();
        }
    }
}
?>

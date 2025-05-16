<?php
$host = 'localhost';
$dbname = 'beautycosm';
$user = 'root';
$password = 'khadija'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}

if(isset($_POST['ok'])){
    $nom = $_POST['nom'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (id, password, nom, email) VALUES (NULL, :password, :nom, :email)");
        $stmt->execute(
            array(
                ":password" => $hashedPassword,
                ":nom" => $nom,
                ":email" => $email
            )
        );
        echo "Inscription réussie !";
    } catch (PDOException $e) {
        die("Erreur lors de l'inscription : " . $e->getMessage());
    }
}
?>

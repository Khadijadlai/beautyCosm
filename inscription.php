
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST["nom"]);
    $email = htmlspecialchars($_POST["email"]);
    $password = htmlspecialchars($_POST["password"]);

    echo "<h3>Bienvenue, $nom !</h3>";
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Inscription</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(120deg,pink, #6dd5fa);
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 400px;
      margin: 80px auto;
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    }
    h2 {
      text-align: center;
      color: #2980b9;
    }
    input[type="text"],
    input[type="email"],
    input[type="password"] {
      width: 100%;
      padding: 12px;
      margin-top: 8px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    input[type="submit"] {
      width: 100%;
      padding: 12px;
      background-color: #2980b9;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }
    input[type="submit"]:hover {
      background-color: #2573a6;
    }
    .error {
      color: red;
      margin-bottom: 15px;
    }
  </style>
</head>
<body>

  <div class="container">
    <h2>Créer un compte</h2>
    
    <form id="form" method="POST" action="traitement.php">
      <div class="error" id="error-msg"></div>

      <label>Nom complet :</label>
      <input type="text" name="nom" id="nom" placeholder="Votre nom" required>

      <label>Email :</label>
      <input type="email" name="email" id="email" placeholder="exemple@email.com" required>

      <label>Mot de passe :</label>
      <input type="password" name="password" id="password" placeholder="Mot de passe" required>

      <input type="submit" value="S'inscrire">
    </form>
  </div>

  <script>
    document.getElementById("form").addEventListener("submit", function(event) {
      let nom = document.getElementById("nom").value.trim();
      let email = document.getElementById("email").value.trim();
      let password = document.getElementById("password").value.trim();
      let error = "";

      if (nom.length < 2) {
        error = "Le nom doit contenir au moins 2 caractères.";
      } else if (!email.includes("@") || !email.includes(".")) {
        error = "Adresse email invalide.";
      } else if (password.length < 6) {
        error = "Le mot de passe doit contenir au moins 6 caractères.";
      }

      if (error) {
        event.preventDefault();
        document.getElementById("error-msg").innerText = error;
      }
    });
  </script>

</body>
</html>

const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route pour la page principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost/phpmyadmin/phpMyAdmin-5.2.2-english/index.php?route=/database/structure&db=beautycosm`);
});
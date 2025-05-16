<?php
require_once 'config.php';
require_once 'auth.php';

$userId = checkAuth();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }

    // Validation
    $nom = filter_var($data['nom'] ?? '', FILTER_SANITIZE_STRING);
    $typePeau = filter_var($data['type_peau'] ?? '', FILTER_SANITIZE_STRING);
    $problemes = is_array($data['problemes'] ?? null) ? $data['problemes'] : [];

    if (empty($nom)) {
        http_response_code(400);
        echo json_encode(['error' => 'Le nom est obligatoire']);
        exit;
    }

    try {
        $pdo->beginTransaction();
        
        // Update user table
        $stmt = $pdo->prepare("UPDATE utilisateurs SET nom = ? WHERE id = ?");
        $stmt->execute([$nom, $userId]);
        
        // Update beauty profile
        $stmt = $pdo->prepare("
            INSERT INTO profils_beaute (user_id, type_peau, problemes) 
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                type_peau = VALUES(type_peau),
                problemes = VALUES(problemes)
        ");
        $stmt->execute([
            $userId,
            $typePeau,
            json_encode($problemes)
        ]);
        
        $pdo->commit();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        $pdo->rollBack();
        error_log('Profile update error: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Erreur lors de la mise à jour du profil']);
    }
}
?>
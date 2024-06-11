<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');

if (isset($_SESSION['username'])) {
    echo json_encode(['success' => true, 'username' => $_SESSION['username'], 'role' => $_SESSION['role']]);
} else {
    echo json_encode(['success' => false]);
}
?>

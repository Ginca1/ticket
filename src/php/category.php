<?php
include "db.php";

header('Content-Type: application/json');
header('Access-Control-Max-Age: 86400'); 
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS'); 

$db = new DB();
$conn = $db->conn;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM category";
    $result = $conn->query($sql);

    if ($result === false) {
        
        $error = $conn->error;
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $error]);
    } else {
        $categories = array();
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }

        echo json_encode(['success' => true, 'categories' => $categories]);
    }
} else {
   
    echo json_encode(['success' => false, 'message' => 'Unsupported HTTP method']);
}
?>
<?php
include_once 'db.php';

class UserHandler {
    private $db;

    public function __construct(DB $db) {
        $this->db = $db;
    }

    public function registerUser($username, $email, $password) {
        $response = array();

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (Username, Email, Password, RegistrationDate) VALUES (?, ?, ?, NOW())";
        $stmt = $this->db->conn->prepare($sql);
        $stmt->bind_param("sss", $username, $email, $hashedPassword);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'User registered successfully.';
        } else {
            $response['success'] = false;
            $response['message'] = 'User registration failed.';
        }

        $stmt->close();

        return $response;
    }
}

// CORS headers
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// Handle user registration
$db = new DB();
$userHandler = new UserHandler($db);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
        $response = array('success' => false, 'message' => 'Please provide all required fields.');
        http_response_code(400);
    } else {
        $response = $userHandler->registerUser($data['username'], $data['email'], $data['password']);
        http_response_code($response['success'] ? 200 : 400);
    }

    echo json_encode($response);
} else {
    $response = array('success' => false, 'message' => 'Invalid request method.');
    http_response_code(400);
    echo json_encode($response);
}

$db->closeConnection();
?>
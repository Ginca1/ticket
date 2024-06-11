<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Access-Control-Allow-Credentials: true'); // Add this line to allow credentials

include 'db.php';

class User
{
    private $db;

    public function __construct(mysqli $conn)
    {
        $this->db = $conn;
    }

    public function validateUser($email, $password)
    {
        $stmt = $this->db->prepare("SELECT UserID, Username, Password, Role FROM users WHERE Email = ?");
if (!$stmt) {
    echo json_encode(array("success" => false, "message" => "Database error: " . $this->db->error));
    return;
}
$stmt->bind_param("s", $email);
        
        $stmt->execute();
if ($stmt->error) {
    echo json_encode(array("success" => false, "message" => "Database error: " . $stmt->error));
    return;
}
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['Password'])) {
                // Passwords match
                session_start();
                $_SESSION['user_id'] = $user['UserID'];
                $_SESSION['username'] = $user['Username'];
                $_SESSION['role'] = $user['Role']; // Store the role in the session
        
                echo json_encode(array("success" => true, "username" => $user['Username']));
            } else {
                // Passwords do not match
                echo json_encode(array("success" => false, "message" => "Incorrect password"));
            }
        }

    }
}

class LoginHandler
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function handleLoginRequest($requestData)
    {
        $email = filter_var($requestData['email'], FILTER_VALIDATE_EMAIL);
        $password = trim($requestData['password']);

        if ($email === false) {
            echo json_encode(array("success" => false, "message" => "Invalid email format"));
        } elseif (empty($password)) {
            echo json_encode(array("success" => false, "message" => "Password cannot be empty"));
        } else {
            $this->user->validateUser($email, $password);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);
    $db = new DB();
    $loginHandler = new LoginHandler(new User($db->conn));
    $loginHandler->handleLoginRequest($requestData);
    $db->closeConnection();
}

?>

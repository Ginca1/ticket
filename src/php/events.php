<?php
// Allow only your frontend's domain, replace 'http://localhost:3000' with your actual frontend URL
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db.php';

class Events {
    private $db;

    
    public function __construct() {
        $this->db = new DB();
    }

  
    public function getEvents() {
        $conn = $this->db->conn;

        $sql = "SELECT * FROM events";
        $result = $conn->query($sql);

        $response = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            echo json_encode(array("success" => true, "events" => $response));
        } else {
            echo json_encode(array("success" => false, "message" => "No events found."));
        }

        $this->db->closeConnection();
    }
}

// Usage
$events = new Events();
$events->getEvents();
?>
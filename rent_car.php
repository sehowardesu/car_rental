<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Dynamic CORS for React frontend
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

header('Content-Type: application/json');

require_once 'db.php';

try {
    $db = new Database();
    $conn = $db->connect();


    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['user_id'], $data['car_id'])) {
        echo json_encode(['success' => false, 'message' => 'Missing user_id or car_id']);
        exit;
    }

    $user_id = intval($data['user_id']);
    $car_id = intval($data['car_id']);

    $stmt = $conn->prepare("SELECT availability FROM cars WHERE car_id = :car_id");
    $stmt->execute(['car_id' => $car_id]);
    $car = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$car) {
        echo json_encode(['success' => false, 'message' => 'Car not found']);
        exit;
    }


    $conn->beginTransaction();


    $stmt = $conn->prepare("UPDATE cars SET availability = 1 WHERE car_id = :car_id");
    $stmt->execute(['car_id' => $car_id]);


    $conn->commit();

    echo json_encode(['success' => true, 'car_id' => $car_id]);

} catch (Exception $e) {
    if (isset($conn) && $conn->inTransaction()) $conn->rollBack();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>

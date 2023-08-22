<?php

session_start();
require_once 'db_connect.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Origin: *'); // This line might not be necessary
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type"); 

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve submitted username and password
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Validate user input
    if (empty($username) || empty($password)) {
        http_response_code(400);
        echo json_encode(array("message" => "Username and password are required."));
        exit;
    }

    // Fetch admin record from the database
    $sql = "SELECT id, username, password FROM admintable WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $hashed_password = $row["password"];

        // Verify the password
        if (password_verify($password, $hashed_password)) {
            // Password is correct, create a session
            $_SESSION["id"] = $row["id"];
            $_SESSION["username"] = $row["username"];
            // Return success response
            // echo json_encode(array("message" => "Login successful."));
            // exit;
            echo json_encode(array("message" => "Login successful.", "username" => $row["username"]));
            exit;
        } else {
            // Password is incorrect
            http_response_code(401);
            echo json_encode(array("message" => "Invalid username or password."));
            exit;
        }
    } else {
        // Username not found in the database
        http_response_code(401);
        echo json_encode(array("message" => "Invalid username or password."));
        exit;
    }

    $stmt->close();
    $conn->close();
}
?>

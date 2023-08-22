<?php
// Assuming you have a database connection setup in db_connect.php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Check if the expected elements exist in the $_POST array
  if (isset($_POST['username']) && isset($_POST['password'])) {
    // Retrieve the username and password from the POST data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hash the password using password_hash()
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert the data into the database
    $sql = "INSERT INTO admintable (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $hashed_password);

    if ($stmt->execute()) {
      // Registration successful
      echo json_encode(array("message" => "Registration successful."));
    } else {
      // Error during registration
      http_response_code(500);
      echo json_encode(array("message" => "Registration failed."));
    }

    $stmt->close();
  } else {
    // Required parameters are missing
    http_response_code(400);
    echo json_encode(array("message" => "Invalid request. Username and password are required."));
  }

  $conn->close();
}
?>

<?php
$conn = mysqli_connect('localhost', 'zero', '1234', 'lstv');

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Fetch data from the "users" table
$sql = "SELECT * FROM users";
$result = mysqli_query($conn, $sql);

// Convert the data to JSON format
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Close the connection
mysqli_close($conn);

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>

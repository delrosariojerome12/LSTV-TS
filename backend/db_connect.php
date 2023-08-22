<?php
// header("Access-Control-Allow-Origin: http://localhost:3000");
// header('Access-Control-Allow-Origin: *'); 
// header('Content-Type: application/json');
// header("Access-Control-Allow-Headers: Content-Type"); 
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
header("Access-Control-Allow-Methods: DELETE, POST, GET, OPTIONS");
header("Content-Type: application/json");


$host = 'localhost';
$username = 'zero';
$password = '1234';
$dbname = 'employeedb';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
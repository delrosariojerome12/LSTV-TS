<?php
require_once 'db_connect.php';
// Allow requests from a specific origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET"); // Specify allowed methods

// Prepare the SQL query
$sql = "SELECT * FROM employeefile";
$result = mysqli_query($conn, $sql);

if (!$result) {
    // Handle the error, e.g., send an error response or log the error
    $response = array("error" => mysqli_error($conn));
} else {
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    mysqli_free_result($result);

    if (empty($data)) {
        $response = array("message" => "No records found.");
    } else {
        $response = $data;
    }
}

// Close the connection
mysqli_close($conn);

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>

<?php
require_once 'db_connect.php';
header("Access-Control-Allow-Methods: PUT");

// Check if the request method is PUT
if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    // Retrieve JSON data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract data
    $recId = $data["recid"];
    $fullname = $data["fullname"];
    $gender = $data["gender"];
    $age = $data["age"];
    $birthdate = $data["birthdate"];
    $civilstat = $data["civilstat"];
    $contactnum = $data["contactnum"];
    $salary = $data["salary"];
    $isactive = $data["isactive"];
    $address = $data["address"];

    // Update employee record in the employeefile table
    $updateSql = "UPDATE employeefile SET fullname = ?, gender = ?, age = ?, birthdate = ?, civilstat = ?, contactnum = ?, salary = ?, isactive = ?, address = ? WHERE recid = ?";
    $stmtUpdate = $conn->prepare($updateSql);
    $stmtUpdate->bind_param("ssisssdisi", $fullname, $gender, $age, $birthdate, $civilstat, $contactnum, $salary, $isactive, $address, $recId);

    if ($stmtUpdate->execute()) {
        // Fetch all employee records
        $selectAllSql = "SELECT * FROM employeefile";
        $result = $conn->query($selectAllSql);

        if ($result->num_rows > 0) {
            $employees = array();
            while ($row = $result->fetch_assoc()) {
                $employees[] = $row;
            }
            echo json_encode($employees);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No employees found."));
        }
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error updating employee record: " . $stmtUpdate->error));
    }

    $stmtUpdate->close();
    $conn->close();
}
?>

<?php

require_once 'db_connect.php';


// Initialize an array to store employee data
$employees = array();

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve JSON data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract data
    $fullname = $data["fullname"];
    $gender = $data["gender"];
    $age = $data["age"];
    $birthdate = $data["birthdate"];
    $civilstat = $data["civilstat"];
    $contactnum = $data["contactnum"];
    $salary = $data["salary"];
    $isactive = $data["isactive"];
    $address = $data["address"];

    // Insert data into the employeefile table
    $sql = "INSERT INTO employeefile (fullname, gender, age, birthdate, civilstat, contactnum, salary, isactive, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssisssdis", $fullname, $gender, $age, $birthdate, $civilstat, $contactnum, $salary, $isactive, $address);

    if ($stmt->execute()) {
        // Query to retrieve all employees
        $retrieveSql = "SELECT * FROM employeefile";
        $result = $conn->query($retrieveSql);

        if ($result->num_rows > 0) {
            // Loop through rows and add employees to the array
            while ($row = $result->fetch_assoc()) {
                $employees[] = $row;
            }
            echo json_encode(array("message" => "Employee entry created successfully.", "employees" => $employees));
        } else {
            echo json_encode(array("message" => "Employee entry created successfully.", "employees" => []));
        }
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error creating employee entry: " . $stmt->error, "statusCode" => 500));
    }

    $stmt->close();
    $conn->close();
}
?>

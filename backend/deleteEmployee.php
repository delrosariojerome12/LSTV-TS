<?php   
require_once 'db_connect.php';

// Check if the request method is DELETE
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    // Retrieve JSON data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract data
    $recId = $data["recid"]; // Assuming you send the recid to be deleted

    // Delete employee from the employeefile table
    $deleteSql = "DELETE FROM employeefile WHERE recid = ?";
    $stmtDelete = $conn->prepare($deleteSql);
    $stmtDelete->bind_param("i", $recId);

    if ($stmtDelete->execute()) {
        // Fetch all employees after deletion
        $selectSql = "SELECT * FROM employeefile";
        $result = $conn->query($selectSql);

        if ($result) {
            $employees = [];
            while ($row = $result->fetch_assoc()) {
                $employees[] = $row;
            }
            echo json_encode($employees);
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Error fetching employees after deletion: " . $conn->error));
        }
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error deleting employee: " . $stmtDelete->error));
    }

    $stmtDelete->close();
    $conn->close();
}
?>

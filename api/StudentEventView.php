<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $id = $inData['ID'];

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("SELECT * FROM Events WHERE (SchoolID = (SELECT School FROM Student WHERE StudentID = ?))");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $myArray = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC)){
            $myArray[] = $row;
        }
        sendResultInfoAsJson(json_encode($myArray));
        $stmt->close();
        $conn->close();

    }
?>
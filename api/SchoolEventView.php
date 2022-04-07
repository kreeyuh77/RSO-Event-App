<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $id = $inData['ID'];
    $value = "-1";

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("SELECT * FROM Events WHERE (SchoolID = ?) AND (Approved = ?)");
        $stmt->bind_param("ss", $id, $value);
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
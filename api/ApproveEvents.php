<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $id = $inData['eventID'];
    $code = $inData['ApprovalCode'];
    

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("UPDATE Events SET (Approved = ?) WHERE (id = ?)");
        $stmt->bind_param("ss", $code, $id);
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
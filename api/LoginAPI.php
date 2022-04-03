<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    // $ID = 0;
    // $FirstName = "";
    // $LastName = "";

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("SELECT StudentID, Name FROM Student WHERE School_Email = ? AND Password = ?");
        $stmt->bind_param("ss", $inData["Login"], $inData["Password"]);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if($row = $result->fetch_assoc()){
            returnWithInfo($row['Name'], $row['StudentID']);
        } else {
            returnWithError($inData["Password"]);
        }

        $stmt->close();
        $conn->close();
    }

    function returnWithInfo($Name, $ID){
        $retValue = '{"ID":' . $ID . ',"Name":"' . $Name . '","error":""}';
        sendResultInfoAsJson($retValue);
    }
?>
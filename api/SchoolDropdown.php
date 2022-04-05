<?php

    require_once 'DBH.php';
    require_once 'functions.php';

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        // $stmt = $conn->prepare("SELECT Name FROM University");
        $stmt = $conn->prepare("SELECT json_object(\"Name\", Name) FROM University");
        $stmt->execute();
        $result = $stmt->get_result();
        sendResultInfoAsJson($result);

        $stmt->close();
        $conn->close();
    }

?>
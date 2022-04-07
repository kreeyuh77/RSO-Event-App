<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $id = $inData["ID"];
    $name = $inData["RSOName"];
    

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("SELECT RSOAdminID FROM Student WHERE (StudentID = ?)");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();

        if ("-1" == $row["RSOAdminID"]){
            returnWithError("RSO Already Exists");
        }
        else {
            $stmt = $conn->prepare("INSERT INTO RSO (Name) VALUES (?)");
            $stmt->bind_param("s", $name);
            $stmt->execute();
            $stmt->close();
            $conn->close();
            returnWithError("");
        }
    }
?>
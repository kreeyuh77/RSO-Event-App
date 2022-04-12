<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $comment = $inData["comment"];
    $event = $inData["eventId"];    
    $id = $inData["ID"];
    
    
    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("SELECT Name FROM Student WHERE StudentID = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();
        $name = $row["Name"];

        $stmt = $conn->prepare("INSERT INTO Comments (Comment, EventID, StudentName) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $comment, $event, $name);
        $stmt->execute();
        $stmt->close();
        $conn->close();
        returnWithError("");
    }
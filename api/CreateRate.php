<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $rate = $inData["rate"];
    $eventID = $inData["eventId"];
    $userID = $inData["ID"];

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("INSERT INTO Ratings (EventID, Rating) VALUES (?, ?)");
        $stmt->bind_param("ss", $eventID, $rate);
        $stmt->execute();
        $stmt->close();
        $conn->close();
        returnWithError("");
    }
?>
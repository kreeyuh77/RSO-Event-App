<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $id = $inData["ID"];
    $rsoid = $inData["RSO"];

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("UPDATE Student SET RSOID = ? WHERE StudentID = ?");
        $stmt->bind_param("ss", $rsoid, $id);
        $stmt->execute();
        $stmt->close();
        $conn->close();
        returnWithError("");
    }
?>
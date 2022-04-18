<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $id = $inData["ID"];
    $name = $inData["RSOName"];
    $schoolID = "-1";
    

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("SELECT RSOAdminID FROM Student WHERE StudentID = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();

        
            $stmt = $conn->prepare("SELECT School from Student WHERE StudentID = ?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $stmt->close();
            $schoolID = $row["School"];
            
            $stmt = $conn->prepare("INSERT INTO RSO (Name, SchoolID) VALUES (?, ?)");
            $stmt->bind_param("ss", $name, $schoolID);
            $stmt->execute();
            $stmt->close();
            $stmt = $conn->prepare("UPDATE Student SET RSOAdminID = (SELECT id FROM RSO WHERE Name = ?) WHERE StudentID = ?");
            $stmt->bind_param("ss", $name, $id);
            $stmt->execute();
            $stmt->close();
            $stmt = $conn->prepare("UPDATE Student SET RSOID = (SELECT id FROM RSO WHERE Name = ?) WHERE StudentID = ?");
            $stmt->bind_param("ss", $name, $id);
            $stmt->execute();
            $stmt->close();
            $conn->close();
            returnWithError("");
        
    }
?>
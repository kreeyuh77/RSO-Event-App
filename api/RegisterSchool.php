<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $schoolName = $inData["schoolName"];
    
    $signupUsername = $inData["signupSchoolUsername"];
    $signupPassword = $inData["signupSchoolPassword"];
    
    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    }

    else {
        $stmt = $conn->prepare("SELECT * FROM University WHERE Username = ?");
        $stmt->bind_param("s", $signupUsername);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();

        if ($signupUsername == $row["Username"]){
            returnWithError("Username already exists.");
        }
        else {
            $stmt = $conn->prepare("INSERT INTO University (Name, Username, Password) VALUES (?, ? ,?)");
            $stmt->bind_param($schoolName, $signupUsername, $signupPassword);
            $stmt->execute();
            $stmt->close();
            $conn->close();
            returnWithError("");
        }
    }

    
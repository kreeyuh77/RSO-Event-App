<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $name = $inData["name"];
    $school = $inData["school"];
    $email = $inData["email"];
    $password = $inData["password"];
    
    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    }

    else {
        $stmt = $conn->prepare("SELECT * FROM Student WHERE School_Email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();

        if ($signupUsername == $row["email"]){
            returnWithError("Email already exists");
        }
        else {
            $stmt = $conn->prepare("INSERT INTO Student (Name, School, Student_Email, Password) VALUES (?, ?, ? ,?)");
            $stmt->bind_param("ssss",$name, $school, $email, $password);
            $stmt->execute();
            $stmt->close();
            $conn->close();
            returnWithError("");
        }
    }
?>
    
<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $name = $inData["title"];
    $des = $inData["description"];
    $longitude = $inData["longitude"];
    $latitude = $indDate["latitude"];
    $time = $inData["when"];
    $type = $inData["type"];
    $id = $inData["ID"];
    $approved = "-1";
    $rsoid = "-1";
    $schoolid = "-1";

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
            returnWithError("Not an RSO Admin");
        } else {
            $stmt = $conn->prepare("SELECT Datetime FROM Events WHERE Longitude = ? AND Latitude = ?");
            $stmt->bind_param("ss", $longitude, $latitude);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $stmt->close();

            if($result->num_rows > 0){
                returnWithError("Taken time slot at location");
            } else {
                $stmt = $conn->prepare("SELECT * FROM Student WHERE RSOID = (SELECT RSOAdminID FROM Student WHERE (StudentID = ?))");
                $stmt->bind_param("s", $id);
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                $stmt->close();

                if($result->num_rows < 5){
                    returnWithError("Not enough members");
                } else {
                    $stmt = $conn->prepare("INSERT INTO Events (Name, Description, Longitude, Latitude, Datetime, Type, Approved, RSOID, SchoolID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                    $stmt->bind_param("sssssssss", $name, $des, $longitude, $latitude, $time, $type, $approved, $rsoid, $schoolid);
                    $stmt->execute();
                    $stmt->close();

                    $stmt = $conn->prepare("UPDATE Events SET SchoolID = (SELECT School FROM Student WHERE StudentID = ?) WHERE Name = ?");
                    $stmt->bind_param("ss", $id, $name);
                    $stmt->execute();
                    $stmt->close();

                    if ($type == "RSO"){
                        $stmt = $conn->prepare("UPDATE Events SET RSOID = (SELECT RSOID FROM Student WHERE StudentID = ?) WHERE Name = ?");
                        $stmt->bind_param("ss", $id, $name);
                        $stmt->execute();
                        $stmt->close();
                    }
                }

                
                $conn->close();
            }


            
        }
    }
?>
<?php
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $eventID = $inData["ID"];
    $avg = "-1";

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("SELECT AVG(Rating) FROM Ratings WHERE EventID = ?");
        $stmt->bind_param("s", $eventID);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $avg = $row["AVG(Rating)"];
        // $myArray = array();
        // while($row = $result->fetch_array(MYSQLI_ASSOC)){
        //     $myArray[] = $row;
        // }
        sendResultInfoAsJson(json_encode($avg));
        $stmt->close();
        $conn->close();
        
    }

?>
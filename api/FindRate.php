<?
    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $eventID = $inData["ID"];

    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("SELECT Rating FROM Ratings WHERE EventID = ?");
        $stmt->bind_param("s", $eventID);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();
        sendResultInfoAsJson(json_encode($result));
    }

?>
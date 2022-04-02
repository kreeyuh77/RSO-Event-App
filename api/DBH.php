<?php

$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "password";
$dbName = "rso";

$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
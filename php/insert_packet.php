<?php
include 'config.php';
$info = json_decode(file_get_contents("php://input"));
$name = $info->name;
$userId=$info->userId;
$sql = "INSERT INTO packet(packet_name) VALUES ('$name') ";

if(mysqli_query($con, $sql)) {
    $packetId = mysqli_insert_id($con);
    $query="INSERT INTO userspackets (user_id, packet_id) VALUES ($userId,$packetId) ";
    if(mysqli_query($con, $query)) {
        echo $packetId;
    }
    else {
        echo "Failed";
    }
}
else {
    echo "Failed";
}


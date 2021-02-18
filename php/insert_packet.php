<?php
include 'config.php';
$info = json_decode(file_get_contents("php://input"));
$name = $info->name;
$userUuid=$info->userUuid;
$sql = "INSERT INTO packet(packet_name) VALUES ('$name') ";

if(mysqli_query($con, $sql)) {
    $packetId = mysqli_insert_id($con);
    $sel =mysqli_query($con, "SELECT `user_id` from users where user_uuid ='$userUuid'");
    while ($row = mysqli_fetch_row($sel)) {
        $userId= $row[0]; 
       }
    $query="INSERT INTO userspackets (`user_id`, `packet_id`) VALUES ($userId,$packetId) ";
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


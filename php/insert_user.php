<?php
include 'config.php';
$info = json_decode(file_get_contents("php://input"));
$name = $info->name;
$pass=$info->pass;
$email=$info->email;
$uuid=$info->uuid;
echo $uuid;
$sql = "INSERT INTO users (user_name,user_password,user_email,user_uuid) VALUES ('$name','$pass','$email','$uuid') ";

if(mysqli_query($con, $sql)) {
    
    echo "SIGN UP SUCCESSFUL";
  
}
else {
    echo "Failed";
}


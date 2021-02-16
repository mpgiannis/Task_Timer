<?php

include 'config.php';
$name = $_GET['name'] ;
$password= $_GET['password'] ;
$query = "SELECT * FROM users WHERE user_name = '$name' AND user_password = '$password' ";

$sel = mysqli_query($con,$query);
$data = array();

 while ($row = mysqli_fetch_array($sel)) {
 $data[] = array("id"=>$row['user_id'],"name"=>$row['user_name'],"email"=>$row['user_email']);
}

echo json_encode($data);

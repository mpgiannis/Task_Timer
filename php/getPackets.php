<?php

include 'config.php';

$param = $_GET['userId'] ;
$query="SELECT * FROM packet WHERE packet_id IN (SELECT packet_id FROM userspackets where user_id =$param)";
$sel = mysqli_query($con,$query);
$data = array();

 while ($row = mysqli_fetch_array($sel)) {
 $data[] = array("id"=>$row['packet_id'],"name"=>$row['packet_name']);
}
 
echo json_encode($data);



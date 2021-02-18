<?php
/* if (isset($_COOKIE['TestCookie'])) { */
include 'config.php';

$param = $_GET['userUuid'] ;
$query="SELECT * FROM packet WHERE packet_id IN (SELECT packet_id FROM userspackets where user_id IN(select user_id from users where user_uuid ='$param'))";
$sel = mysqli_query($con,$query);
$data = array();

 while ($row = mysqli_fetch_array($sel)) {
 $data[] = array("id"=>$row['packet_id'],"name"=>$row['packet_name']);
}
 
echo json_encode($data);
/* }
else{
echo json_encode("no loged");
} */


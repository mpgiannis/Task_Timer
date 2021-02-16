<?php

include 'config.php';
$param = $_GET['packet'] ;
$query = "SELECT * FROM tasks WHERE packet_id = $param ";

$sel = mysqli_query($con,$query);
$data = array();

while ($row = mysqli_fetch_array($sel)) {
 $data[] = array("id"=>$row['task_id'],"name"=>$row['task_name']);
}

echo json_encode($data);

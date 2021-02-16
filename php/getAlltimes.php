<?php

include 'config.php';
$param = $_GET['packet'] ;
$query = "SELECT task_id,task_name,SUM(task_time_seconds)
          FROM saved_times   WHERE packet_id = $param 
          GROUP BY task_id;   ";

$sel = mysqli_query($con,$query);
$data = array();

while ($row = mysqli_fetch_array($sel)) {
 $data[] = array("id"=>$row['task_id'],"name"=>$row['task_name'],"time"=>$row['SUM(task_time_seconds)']);
}

echo json_encode($data);
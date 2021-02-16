<?php
include 'config.php';
/* var_dump($object); */
/* $objectData = (array)$info; */
$info = json_decode(file_get_contents("php://input"));
if(count((array)$info) > 0) {
   /*  $time = mysqli_real_escape_string($con, $info->time);
    $email = mysqli_real_escape_string($conn, $info->email);
    $age = mysqli_real_escape_string($conn, $info->age); */
    $packetId = $info->packetId;
    $tasks = $info->tasks;
    $time = $info->time;
    $query = "INSERT INTO saved_times(task_id, task_name, task_time_seconds, packet_id) VALUES ";
    $query_parts = array();
    for($x=0; $x<count($tasks); $x++){              
        $query_parts[] = "(" . $tasks[$x]->id . ", '".$tasks[$x]->name ."'," . $time[$x] . "," . $packetId .  ")";                      
    }
    $sql= $query .= implode(',', $query_parts);
    if(mysqli_query($con, $sql)) {
        echo "Insert Data Successfully";
    }
    else {
        echo $sql;
    }
} 

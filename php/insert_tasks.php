<?php
include 'config.php';
$info = json_decode(file_get_contents("php://input"));
if(count((array)$info) > 0) {

    $names = $info->names;
    $id = $info->packetId;
    $query = "INSERT INTO tasks (packet_id, task_name) VALUES ";
    $query_parts = array();
    for($x=0; $x<count($names); $x++){              
        $query_parts[] = "(" . $id . ", '" . $names[$x] . "')";                      
    }
    $sql= $query .= implode(',', $query_parts);
    if(mysqli_query($con, $sql)) {
        echo "Insert Data Successfully";
    }
    else {
        echo "Failed";
    }
} 

<?php

$host = "localhost"; /* Host name */
$user = "root"; /* User */
$password = "000888aaA!"; /* Password */
$dbname = "tasks"; /* Database name */

$con = mysqli_connect($host, $user, $password,$dbname);
// Check connection
if (!$con) {
 die("Connection failed: " . mysqli_connect_error());
}


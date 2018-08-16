<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin-Method: *');
header("Content-Type: application/json; charset=UTF-8");
date_default_timezone_set('Asia/Manila');
$db = mysqli_connect('localhost','root','','db_client');
?>
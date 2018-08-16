<?php
include('connect.php');
$id = $_POST['employee_id'];
$sql = mysqli_query($db,"DELETE FROM employee_info WHERE employee_id = '$id'");
echo json_encode(array('response' => 'deleted successfully'));
?>
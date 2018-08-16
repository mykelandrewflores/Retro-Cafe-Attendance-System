<?php
include('connect.php');
session_start();
$data = array();
$employee_id = $_POST['employee_id'];
$employee_password = $_POST['employee_password'];
$sql = "SELECT * FROM employee_info WHERE employee_id = '$employee_id' AND employee_password = '$employee_password'";
$result = mysqli_query($db,$sql);
if(mysqli_num_rows($result)) {
	while($rows = mysqli_fetch_assoc($result)) {
		$data = $rows;	
	}
	$_SESSION['session_account'] = $data;
		echo json_encode(array('response' => 'Success!'));
} else {
	echo json_encode(array('response' => 'Invalid Account'));
}

?>
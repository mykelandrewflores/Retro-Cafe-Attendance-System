<?php
include('connect.php');
$data = array();
if(isset($_POST['update_button'])) {
	$employee_id = $_POST['employee_id'];
	$employee_fname = $_POST['employee_fname'];
	$employee_lname = $_POST['employee_lname'];
	$employee_bday = $_POST['employee_bday'];
	$employee_position= $_POST['employee_position'];
	$employee_age = $_POST['employee_age'];
	$employee_address = $_POST['employee_address'];
	$sql = "UPDATE employee_info SET employee_position = '$employee_position',employee_fname = '$employee_fname',employee_lname = '$employee_lname',employee_bday = '$employee_bday',employee_age = '$employee_age',employee_address = '$employee_address' WHERE employee_id = '$employee_id' "; 
	if(mysqli_query($db,$sql)) {
		echo json_encode(array('response' => 'succefully update'));
	}
} else if(isset($_POST['update_dtr_pay'])) {
	$id = $_POST['employee_id'];
	$total_salary = $_POST['total_salary'];
	$sql = "UPDATE employee_dtr SET employee_status = 'paid' WHERE employee_id = '$id' ";
	if(mysqli_query($db,$sql)) {
		$select = mysqli_query($db, "SELECT * FROM employee_info WHERE employee_id = '$id' ");
		$row = mysqli_fetch_array($select);
		$insert = mysqli_query($db,"INSERT INTO employee_reports(employee_id,employee_fname,employee_lname,total_salary,employee_position) VALUES('$id','$row[3]','$row[4]','$total_salary','$row[1]' ) ");
		echo json_encode(array('response' => 'succefully update'));
	}
} elseif (isset($_POST['update_deduction'])) {
	$sql = '';
	$employee_id = $_POST['employee_id'];
	$pagibig = $_POST['pag-ibig'];
	$sss = $_POST['sss'];
	$philhealth = $_POST['philhealth'];
	$others = $_POST['others'];
	$sql .= "UPDATE employee_tax SET deduction_amount = '$pagibig' WHERE employee_id = '$employee_id' AND employee_deduction = 'pag-ibig' ;";
	$sql .= "UPDATE employee_tax SET deduction_amount = '$sss' WHERE employee_id = '$employee_id' AND employee_deduction = 'sss'; ";
	$sql .= "UPDATE employee_tax SET deduction_amount = '$philhealth' WHERE employee_id = '$employee_id' AND employee_deduction = 'philhealth' ;";
	$sql .= "UPDATE employee_tax SET deduction_amount = '$others' WHERE employee_id = '$employee_id' AND employee_deduction = 'others'; ";
	if(mysqli_multi_query($db,$sql)) {
		echo json_encode(array('response' => 'succefully update'));
	}
} elseif(isset($_POST['changepassword'])) {
	$id = $_POST['id'];
	$pass = $_POST['pass'];
	$sql = mysqli_query($db,"UPDATE employee_info SET employee_password = '$pass' WHERE employee_id = '$id' ");
	echo json_encode(array('response' => 'Successfully update'));
}
?>
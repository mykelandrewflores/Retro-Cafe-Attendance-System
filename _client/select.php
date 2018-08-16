<?php
include('connect.php');
$data = array();
if(isset($_GET['select_info'])) {
	$id = $_GET['select_info'];
	$sql = mysqli_query($db,"SELECT * FROM employee_info WHERE employee_id = '$id' AND employee_position != 'supervisor' ");
	
} elseif (isset($_GET['select_dtr'])) {
	$id = $_GET['select_dtr'];
	$sql = mysqli_query($db,"SELECT * FROM employee_dtr WHERE employee_id = '$id' AND employee_status = 'time-out' LIMIT 15 ");
} elseif (isset($_GET['payroll_dtr'])) {
	$id = $_GET['payroll_dtr'];
	$sql = mysqli_query($db,"SELECT * FROM employee_dtr WHERE employee_id = '$id' AND employee_status = 'paid'  LIMIT 15 ");
} elseif (isset($_GET['select_tax'])) {
	$id = $_GET['select_tax'];
	$sql = mysqli_query($db,"SELECT * FROM employee_tax WHERE employee_id = '$id' ");
}elseif (isset($_GET['deduction_employee'])) {
	$id = $_GET['deduction_employee'];
	$sql = mysqli_query($db,"SELECT * FROM employee_tax WHERE employee_id = '$id' ");
} elseif (isset($_GET['salary_report'])) {
	if(isset($_GET['from'])) {
		$from = $_GET['from'];
		$to = $_GET['to'];
		$sql = mysqli_query($db,"SELECT * FROM `employee_reports` WHERE (payroll_date >= '$from' AND payroll_date <= '$to')");
	} else {
		$sql = mysqli_query($db,"SELECT * FROM employee_reports");
	}
}
else {
	$sql = mysqli_query($db,"SELECT * FROM employee_info WHERE employee_position != 'supervisor' ");	
} 
while($rows = mysqli_fetch_assoc($sql)) {
	$data[] = $rows;
} 
echo json_encode($data);

?>
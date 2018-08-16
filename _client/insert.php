<?php
include('connect.php');
$date_now = date('Y-m-d');
$time_now = date('H:i:s');
$dt = new DateTime;
$dt->setTime(9,0);
$late =  $dt->format('H:i:s');
$ct = new DateTime;
$ct->setTime(17,0);
$ot =  $ct->format('H:i:s');
$now = date('H:i:s');
$lt = new DateTime;
$lt->setTime(16	,0);
if($_POST['action'] == 'insert_dtr') {
	$data = array();
	$id = $_POST['employee_id'];
	$select = mysqli_query($db,"SELECT * FROM employee_info WHERE employee_id = '$id' ");
	$employee = mysqli_fetch_assoc($select);
	if($employee['employee_status'] == 'time-out') {
		if($now > $late){
			$difference = round(abs(strtotime($late) - strtotime($now)) / 3600,2);
			$total_late = (int)$difference;
			$insert_timein = mysqli_query($db,"INSERT INTO employee_dtr(employee_id,employee_date,employee_timein,employee_timeout,employee_late,employee_status) VALUES('$id','$date_now','$time_now','','$total_late','time-in') ");
			$update_timein = mysqli_query($db,"UPDATE employee_info SET employee_status = 'time-in' WHERE employee_id = '$id' ");
		} else {
			$insert_timein = mysqli_query($db,"INSERT INTO employee_dtr(employee_id,employee_date,employee_timein,employee_timeout,employee_status) VALUES('$id','$date_now','$time_now','','time-in') ");
			$update_timein = mysqli_query($db,"UPDATE employee_info SET employee_status = 'time-in' WHERE employee_id = '$id' ");
		}
	} elseif($employee['employee_status'] == 'time-in') {
		if($now == $lt) {
			$difference = round(abs(strtotime($ot) - strtotime($now)) / 3600,2);
			$total_ot= (int)$difference;
			$update_timeout = mysqli_query($db,"UPDATE employee_dtr SET employee_timeout = '$time_now', employee_overtime = '$total_ot' ,employee_status = 'time-out' WHERE employee_id = '$id' AND DATE(employee_date) = CURDATE() ");
			$update_timeout_employee = mysqli_query($db,"UPDATE employee_info SET employee_status = 'time-out' WHERE employee_id = '$id' ");
		} else {
			$update_timeout = mysqli_query($db,"UPDATE employee_dtr SET employee_timeout = '$time_now' ,employee_status = 'time-out' WHERE employee_id = '$id' AND DATE(employee_date) = CURDATE() ");
			$update_timeout_employee = mysqli_query($db,"UPDATE employee_info SET employee_status = 'time-out' WHERE employee_id = '$id' ");	
		}
	}
	$sql = mysqli_query($db, "SELECT * FROM employee_dtr WHERE employee_id = '$id' ORDER BY time_sheet_id DESC LIMIT 1");
	while ($rows = mysqli_fetch_assoc($sql)) {
		$data[] = $rows;
	} echo json_encode($data);
}
elseif ($_POST['action'] == 'add_employee_action') {
	$add_employee_position = $_POST['add_employee_position'];
	$add_employee_fname = $_POST['add_employee_fname'];
	$add_employee_lname = $_POST['add_employee_lname'];
	$add_employee_age = $_POST['add_employee_age'];
	$add_employee_bday = $_POST['add_employee_bday'];
	$add_employee_address = $_POST['add_employee_address'];
	$sql = "INSERT INTO employee_info(employee_position,employee_fname,employee_lname,employee_bday,employee_age,employee_address) VALUES('$add_employee_position','$add_employee_fname','$add_employee_lname','$add_employee_bday','$add_employee_age','$add_employee_address')";
	if(mysqli_query($db,$sql)) {
		$employee =mysqli_query($db,"SELECT * FROM employee_info ORDER BY employee_id DESC LIMIT 1");
		$row = mysqli_fetch_assoc($employee);
		$employee_id = $row['employee_id'];
		$deduction_query = "INSERT INTO employee_tax(employee_id,employee_deduction) VALUES('$employee_id','pag-ibig');";
		$deduction_query .= "INSERT INTO employee_tax(employee_id,employee_deduction) VALUES('$employee_id','sss');";
		$deduction_query .= "INSERT INTO employee_tax(employee_id,employee_deduction) VALUES('$employee_id','philhealth');";
		$deduction_query .= "INSERT INTO employee_tax(employee_id,employee_deduction) VALUES('$employee_id','others');";
		if(mysqli_multi_query($db,$deduction_query)) {
			echo json_encode(array('response' => 'Succefully ADD'));
		}
	}
?>
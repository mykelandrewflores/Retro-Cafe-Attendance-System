<?php
include('connect.php');
$sql = "";
$data = json_decode(file_get_contents("php://input"));
foreach ($data as $key => $value) {
	$sql .= "INSERT INTO employee_tax(employee_id,employee_deduction,deduction_amount) VALUES('".$data[0]->employee_id."','".$data[$key]->employee_deduction."','".$data[$key]->deduction_amount."' );";
}  if(mysqli_multi_query($db,$sql)) {
	echo json_encode(array("status" => "inserted successfully"),JSON_PRETTY_PRINT);
}
?>
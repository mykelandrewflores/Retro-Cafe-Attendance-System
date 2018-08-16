<?php
include('connect.php');
$data = array();
$condition = "";
$where = json_decode(stripslashes($_POST['payroll_dtr']));
print_r($where);
foreach ($where as $key => $value) {
	$condition .= $key . "='" .$value."' AND ";
}
echo $condition;
/*
while($rows = mysqli_fetch_assoc($sql)) {
	$data[] = $rows;
} 
echo json_encode($data);*/

?>
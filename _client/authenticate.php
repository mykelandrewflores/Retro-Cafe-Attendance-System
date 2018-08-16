<?php
session_start();
include('connect.php');
if(!empty($_SESSION['session_account'])) {
	echo json_encode($_SESSION['session_account']);
} else {
 	echo json_encode(array('response' => 'Session Expired!'));
}


?>
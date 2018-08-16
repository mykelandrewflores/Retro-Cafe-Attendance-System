<?php
date_default_timezone_set('Asia/Manila');
$ct = new DateTime;
$lt = new DateTime;
$ct->setTime(17,0);
$lt->setTime(16	,0);
$ot =  $ct->format('H:i:s');
$wow = $lt->format('H:i:s');
$now = date('H:i:s');
if($ot > $wow) {
	$difference = round(abs(strtotime($ot) - strtotime($wow)) / 3600,2);
	echo (int)$difference;
} else {

}

?>
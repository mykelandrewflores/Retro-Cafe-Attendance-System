<?php
session_start();
session_unset();
session_destroy();
header('location:http://localhost/RestoCafe/include/supervisor/login.html');
?>
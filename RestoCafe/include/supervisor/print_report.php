<?php
session_start();
date_default_timezone_set('Asia/Manila');
$db = mysqli_connect('localhost','root','','db_client');
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Retro Throwback Cafe</title>
	<link rel="icon" href="../../assets/logo.png"/>
	<link rel="stylesheet" href="../../vendor/css/bulma.css">
	<link rel="stylesheet" href="../../vendor/css/main.css">
	<script defer src="../../vendor/js/fontawesome.js"></script>
	<script defer src="../../vendor/js/jquery.js"></script>
	<script defer src="../../vendor/js/print_report.js"></script>
</head>
<body >
	<main>
		<div class="container mt-1" align="center">
			<img src="../../assets/logo.png" width="20%" />
			<?php 
			if(!isset($_GET['from'])) {
				?>
				<h1 class="title font-weight-low">Summary Reports</h1>
				<?php
			} else {
				?>
				<h1 class="mt-br subtitle font-weight-low">Summary Report: <?php echo date("M d, Y", strtotime($_GET['from'])); ?> and <?php echo date("M d, Y", strtotime($_GET['to'])); ?></h1>
				<?php } ?>
				<div class="columns mt-br">
					<div class="column">
						<table class="table text-capitalize">
							<thead>
								<th>Payroll ID</th>
								<th>Payroll Date</th>
								<th>Employee ID</th>
								<th>Employee Name</th>
								<th>Employee Position</th>
								<th>Total Salary</th>
							</thead>
							<tbody>
								<?php
								$total = 0;
								if(!isset($_GET['from'])) {
									$sql = mysqli_query($db, "SELECT * FROM employee_reports");
								} else {
									$arr = array();
									$from = $_GET['from'];
									$to = $_GET['to'];
									$sql = mysqli_query($db,"SELECT * FROM `employee_reports` WHERE (payroll_date >= '$from' AND payroll_date <= '$to')");
								}
								while($row = mysqli_fetch_array($sql)) {
									$arr[] = $row[2];
									$condition = implode(',',array_values($arr)); 
									$total = $total + $row[5];
									?>
									<tr>
										<td><?php echo $row[0]; ?></td>
										<td><?php echo date("M d, Y", strtotime($row[1])); ?></td>
										<td><?php echo $row[2]; ?></td>
										<td><?php echo $row[3]; ?> <?php echo $row[4]; ?></td>
										<td><?php echo $row[6]; ?></td>
										<td>P <?php echo number_format($row[5],2); ?></td>
									</tr>
									<?php 
								}
								?>
									<input type="hidden" id="employee_id" value="<?php echo $condition; ?>" />
								<tr><td></td><td></td><td></td><td></td><td></td>
									<td ><h1 class="font-weight-low">Total: P <?php echo number_format($total,2); ?></h1></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="columns" align="center">
					<div class="column">
						<h1>_______________________________________</h1>
						<span class="text-capitalize"><?php echo $_SESSION['session_account']['employee_fname']; ?> <?php echo $_SESSION['session_account']['employee_lname']; ?><br>(Supervisor)</span>
					</div>
					<div class="column">
					</div>
				</div>
			</main>
		</body>
		</html>
<?php
session_start()
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
	<script defer src="../../vendor/js/payroll.js"></script>
</head>
<body onload="window.print()">
	<main>
		<div class="container mt-1" align="center">
			<img src="../../assets/logo.png" width="20%" />
			<div class="columns">
				<div class="column">
					<table class="table centered bordered" style="width: 100%">
						<tbody>
							<tr>
								<td>Name: </td>
								<td class="text-capitalize" id="employee_name"></td>
							</tr>
							<tr>
								<td>From-To </td>
								<td id="coverage_date"></td>
							</tr>
							<tr>
								<td>Total Hours </td>
								<td id="output_total_hours"></td>
							</tr>
							<tr>
								<td>Overtime</td>
								<td id="output_total_overtime"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="column" align="right">
					<table class="table  bordered" style="width: 50%">
						<tbody>
							<tr>
								<td>Date: </td>
								<td id="date_now"></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<table class="table centered bordered" style="width: 100%">
						<thead>
							<tr>
								<th colspan="3"><h4><b>Deduction</h4></th>
								</tr>
							</thead>
							<tbody id="employee_deduction" style="text-transform: uppercase;">
								<tr>
									<td>Philhealth</td>
									<td >0.00</td>
								</tr>
								<tr>
									<td>Pag-ibig</td>
									<td >0.00</td>
								</tr>
								<tr>
									<td>SSS</td>
									<td>0.00</td>
								</tr>
								<tr><td></td><td><b>0.00</td></tr>
								</tbody>
							</table>
						</div>
						<div class="column">
							<table class="table centered" style="width: 100%">
								<thead>
									<tr>
										<th colspan="3"><h4><b>Salary</h4></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Total</td>
											<td id="total_ouput"><b>0.00</td>
											</tr>
											<tr>
												<td>Total Deduction</td>
												<td id="total_tax_output2"><b>0.00</td>
												</tr>
												<tr>
													<td>Total Salary</td>
													<td><h5 id="total_salary_output">Total Salary: P0.00</h5></td>
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
							</div>
						</main>
					</body>
					</html>
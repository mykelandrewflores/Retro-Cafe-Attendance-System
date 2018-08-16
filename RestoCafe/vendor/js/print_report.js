getEmployeePayroll();
function getEmployeePayroll() {
	var arr = [];
	var employee_id = $('#employee_id').val();
	var info = JSON.stringify(employee_id);
	$.post('http://localhost/_client/master_payroll.php',  {payroll_dtr: info} ,
		function(data) {

		});
}
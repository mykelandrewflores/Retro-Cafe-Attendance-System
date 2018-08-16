$(document).ready(function(){
	$('.close-modal').click(function() {
		$('#view_modal').removeClass('is-active');
	});
});
fetchReports();
var link = 'http://localhost/RestoCafe/include/supervisor/print_report.php';
function fetchReports() {
	$.getJSON('http://localhost/_client/select.php?salary_report', function(data){
		var body = '';
		var total_salary = 0;
		for(var i = 0;i<data.length; i++) {
			body+='<tr>';
			body+='<td>'+data[i].payroll_id+'</td>';
			body+='<td>'+formatDate(new Date(data[i].payroll_date))+'</td>';
			body+='<td>'+data[i].employee_id+'</td>';
			body+='<td>'+data[i].employee_fname+ ' ' + data[i].employee_lname +'</td>';
			body+='<td>'+data[i].employee_position +'</td>';
			body+='<td>P '+parseInt(data[i].total_salary).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ) +'</td>';
			body+='<td><a href="#!" onclick="checkPayroll('+data[i].employee_id+',\''+data[i].payroll_date + '\',\''+data[i].employee_fname + ' ' +data[i].employee_lname+'\',\''+data[i].employee_position + '\')">View</a></td>';
			body+='</tr>';
			total_salary += parseInt(data[i].total_salary);
		} $('#fetch_reports_data').html(body);
		$('#total_output').html(total_salary.toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
		link = 'http://localhost/RestoCafe/include/supervisor/print_report.php';
	});
}
function filterData(from,to) {
	$.getJSON('http://localhost/_client/select.php?salary_report&from='+from+'&to='+to, function(data){
		var body = '';
		var total_salary = 0;
		for(var i = 0;i<data.length; i++) {
			body+='<tr>';
			body+='<td>'+data[i].payroll_id+'</td>';
			body+='<td>'+formatDate(new Date(data[i].payroll_date))+'</td>';
			body+='<td>'+data[i].employee_id+'</td>';
			body+='<td>'+data[i].employee_fname+ ' ' + data[i].employee_lname +'</td>';
			body+='<td>'+data[i].employee_position +'</td>';
			body+='<td>P '+parseInt(data[i].total_salary).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ) +'</td>';
			body+='<td><a href="#!" onclick="checkPayroll('+data[i].employee_id+',\''+data[i].payroll_date + '\',\''+data[i].employee_fname + '\')">View</a></td>';
			body+='</tr>';
			total_salary += parseInt(data[i].total_salary);
		} $('#fetch_reports_data').html(body);
		$('#total_output').html(total_salary.toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
		link = 'http://localhost/RestoCafe/include/supervisor/print_report.php?from='+from+'&to='+to;
	});
}
function checkPayroll(id,date,name,position) {
	Indeduction(id);
	$('#view_modal').addClass('is-active');
	$.getJSON('http://localhost/_client/select.php?payroll_dtr='+id, function(data){
		var body = '';
		var total_salary = 0;
		var total_hours = 0;
		for(var i = 0;i<data.length; i++) {
			var total_ot = parseInt(data[i].employee_overtime);
			var hours = 0;
			var total_money = 47;
			var start = data[i].employee_timein;
			var end = data[i].employee_timeout;
			start = start.split(":");
			end = end.split(":");
			var startDate = new Date(0, 0, 0, start[0], start[1], 0);
			var endDate = new Date(0, 0, 0, end[0], end[1], 0);
			var diff = endDate.getTime() - startDate.getTime();
			var hours = Math.floor(diff / 1000 / 60 / 60);
			diff -= hours * 1000 * 60 * 60;
			var minutes = Math.floor(diff / 1000 / 60);
			if (hours < 0) {
				hours = hours + 12 - 1;
			}
			body+='<tr>';
			body+='<td>'+ formatDate(new Date(data[i].employee_date))+'</td>';
			body+='<td>'+hours+'</td>';
			body+='<td>'+total_ot+'</td>';
			total_hours += hours;
			body+='<td>P'+(total_money * hours ).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
			body+='</tr>';
		} $('#fetch_dtr').html(body);
		$('#employee_fname').val(name);
		$('#employee_position').val(position);
		$('#total_money_hours').html('P '+(total_hours * total_money).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
		$('#total_deduction').html('P '+total_deduction.toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
		$('#total_salary').html('P '+( (total_hours * total_money) - total_deduction).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
		$('#pay_check').html(formatDate(new Date(date)));
	});
}
function Indeduction(id) {
	$.getJSON('http://localhost/_client/select.php?select_tax='+id, function(tax){
		if(tax == '') {
			alert('No Data Found');
		} else {
			var body_tax = '';
			for(var j = 0; j<tax.length; j++){
				body_tax += '<tr>';
				body_tax += '<td>'+tax[j].employee_deduction+'</td>';
				body_tax += '<td>P '+parseInt(tax[j].deduction_amount).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body_tax += '</tr>';
				total_deduction += parseInt(tax[j].deduction_amount);
			} body_tax += '<tr><td></td><td><b>P '+total_deduction.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td></tr>';
			$('#employee_deduction').html(body_tax);
		}
	});
}


function printReport() {
	window.open(link, '_blank', 'toolbar=yes,top=150,left=300,width=1080,height=720');
}

function formatDate(date) {
	var monthNames = [
	"January", "February", "March",
	"April", "May", "June", "July",
	"August", "September", "October",
	"November", "December"
	];
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0'+minutes : minutes;
	return monthNames[monthIndex] + ' ' + day + ', ' + year;
}
var total_deduction = 0;
var url  = window.location.href;
var id = url.substring(url.lastIndexOf('?') + 1);
getTimeSheet(id);
function getTimeSheet(id) {	
	$.ajax({
		url: 'http://localhost/_client/select.php?select_dtr='+id+'',
		method: 'GET',
		dataType: 'JSON',
		success: function(data) {
			var body = '';
			var total_hours = 0;
			var total_ot = 0;
			var SSS = 100;
			var pagibig = 100;
			var phil = 100;
			for(var i = 0; i<data.length; i++) {
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
				total_hours += hours;
				body+='<tr>';
				body+='<td>'+ formatDate(new Date(data[i].employee_date))+'</td>';
				body+='<td>'+data[i].employee_timein+'</td>';
				body+='<td>'+data[i].employee_timeout+'</td>';
				body+='<td>'+hours+'</td>';
				body+='<td>'+total_ot+'</td>';
				body+='<td>P'+(total_money * hours ).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				body+='</tr>';
			} 
			$('#total_payslip').html('Total: P'+(total_hours * total_money).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
			$('#fetch_timesheet').html(body);
			$('#phil_output').html('P'+phil.toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
			$('#sss_ouput').html('P'+SSS.toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
			$('#pagibig_output').html('P'+pagibig.toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
			$('#total_tax_output').html('<b>P'+(phil+SSS+pagibig).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
			$('#total_ouput').html('<b>P'+(total_hours * total_money).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
			$('#total_tax_output2').html('<b>P'+(phil+SSS+pagibig).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
			$('#total_salary_output').html('Total Salary: P'+((total_hours * total_money) - (phil+SSS+pagibig)).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
		}
	});
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
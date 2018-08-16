$(document).ready(function(){
	$('#searc_employee').click(function(){
		var input = $('#input_search').val();
		if(input == '') {
			alert('Fields are Required');
		} else {
			$.getJSON('http://localhost/_client/select.php?select_info='+input, function(data){
				if(data == '') {
					alert('No Data Found');
				} else {
					for(var i = 0;i<data.length; i++) {
						$('#employee_fname').val(data[i].employee_fname);
						$('#employee_lname').val(data[i].employee_lname);
						$('#employee_age').val(data[i].employee_age);
						$('#employee_address').val(data[i].employee_address);
						$('#employee_id').val(data[i].employee_id);
						$('#employee_position').val(data[i].employee_position);
						$('#ot_input').removeAttr('disabled');
						$('#submitPayslip').prop('disabled', false);
						getTimeSheet(input,0);
						getDeduction();
					}

				}
			});
		}
	});
	$('#submitPayslip').click(function(){
		var employee_id = $('#input_search').val();
		var action = 'update_dtr_pay';
		$.post('http://localhost/_client/update.php', { update_dtr_pay: action, employee_id: employee_id, total_salary:total_total_salary  },
			function(data_updated) {
				window.location.href = 'http://localhost/RestoCafe/include/supervisor/payroll.html';
			});
	});
});
var token_id = 0;
function getDeduction() {
	var id = $('#input_search').val();
	token_id = id;
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
	})
}

function getTimeSheet(id,OT) {
	$.ajax({
		url: 'http://localhost/_client/select.php?select_dtr='+id+'',
		method: 'GET',
		dataType: 'JSON',
		success: function(data) { 
			var body = '';
			var total_hours = 0;
			if(OT == '') {
				OT = 0;
			}
			for(var i = 0; i<data.length; i++) {
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
				body+='<td>'+data[i].employee_timein+'</td>';
				if(data[i].employee_timeout == '') {
					body+='<td>Not Out</td>';
					body+='<td>'+0+'</td>';	
					body+='<td>'+total_ot+'</td>';
					hours += 0;
					body+='<td>P'+(0).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				} else {
					body+='<td>'+data[i].employee_timeout+'</td>';
					body+='<td>'+hours+'</td>';
					body+='<td>'+total_ot+'</td>';
					total_hours += hours;
					body+='<td>P'+(total_money * hours ).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
				}
				body+='</tr>';
				from = data[0].employee_date;
				to = data[i].employee_date;
			} 
			hours_total = total_hours;
			ot_hours = parseInt(OT);
			total_hours += parseInt(OT);
			hours_total = total_hours;
			total_total_salary = total_hours * total_money;
			$('#total_payslip').html('<b>Total: P'+(total_hours * total_money).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
			$('#fetch_timesheet').html(body);
			$('#total_ouput').html('P '+(total_hours * total_money).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
			$('#total_tax_output2').html('P '+total_deduction.toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
			$('#total_salary_output').html('<b>Total Salary: P'+((total_hours * total_money) - (total_deduction)).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
		}
	});
}
function payEmployee() {
	var input =$('#input_search').val();
	var fname = $('#employee_fname').val();
	var lname =$('#employee_lname').val();
	window.open('print_payslip.php?employee_id='+token_id+'&employee_name='+fname+' '+lname+'&from='+from+'&to='+to+'&hours='+hours_total+'&ot='+ot_hours+'&deduction='+total_deduction,'_blank');
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
function OTime(e) {
	OT = e;
	var id = $('#input_search').val();
	getTimeSheet(id,OT) 
}
function payslipOutput() {
	var url_string = '';	
	var rate = 47;
	url_string = window.location.href;
	var url = new URL(url_string);
	var id = url.searchParams.get("employee_id");
	var from = url.searchParams.get("from");
	var to = url.searchParams.get("to");
	var hours = url.searchParams.get("hours");
	var ot = url.searchParams.get("ot");
	var deduction = url.searchParams.get("deduction");
	var employee_name = url.searchParams.get("employee_name");
	$('#employee_name').html(employee_name);
	$('#output_total_hours').html(hours);
	$('#output_total_overtime').html(ot);
	$('#coverage_date').html(formatDate(new Date(from))+ ' - '+formatDate(new Date(to)));
	$('#date_now').html(formatDate(new Date()));
	outputDeduction(id)
	var total_salary =parseInt(rate) * parseInt(hours);
	$('#total_ouput').html('P '+total_salary.toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
	$('#total_tax_output2').html('P ' + parseInt(deduction).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
	$('#total_salary_output').html('P ' + (total_salary - deduction).toLocaleString(undefined,  { minimumFractionDigits: 2 }  ));
}
function outputDeduction(id) {
	$.getJSON('http://localhost/_client/select.php?select_tax='+id, function(tax){
		var body_tax = '';
		for(var j = 0; j<tax.length; j++){
			body_tax += '<tr>';
			body_tax += '<td>'+tax[j].employee_deduction+'</td>';
			body_tax += '<td>P '+parseInt(tax[j].deduction_amount).toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td>';
			body_tax += '</tr>';
			total_deduction += parseInt(tax[j].deduction_amount);
		} 
		body_tax += '<tr><td></td><td><b>P '+total_deduction.toLocaleString(undefined,  { minimumFractionDigits: 2 }  )+'</td></tr>';
		$('#employee_deduction').html(body_tax);
	});
}
payslipOutput();
var from = '';
var to = '';
var hours_total = 0;
var ot_hours = 0;
var total_deduction = 0;
var total_total_salary = 0;
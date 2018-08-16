authenticate();
setName();
function authenticate() {
	$.getJSON('http://localhost/_client/authenticate.php', function(data){
		if(data.response == 'Session Expired!') {
			window.location.href = 'http://localhost/RestoCafe/include/supervisor/login.html';
		} else {
			$('#employee_name').html('<span style="color: #A55540" class="text-capitalize">' + data.employee_fname + ' ' + data.employee_lname);
		}	
	});
}
function setName() {
	$.getJSON('http://localhost/_client/authenticate.php', function(data){
		if(data.response == 'Session Expired!') {
			window.location.href = 'http://localhost/RestoCafe/include/supervisor/login.html';
		} else {
			$('#employee_id').val(data.employee_id);
			$('#hidden_id').val(data.employee_id);
			$('#employee_fname').val(data.employee_fname);
			$('#employee_lname').val(data.employee_lname);
			$('#employee_bday').val(data.employee_bday);
			$('#employee_age').val(data.employee_age);
			$('#employee_address').val(data.employee_address);
		}	
	});
}
function changePassword(current,pass) {
	var id = $('#employee_id').val();
	if(current == '' && pass == '' ) {
		alert('Fields Password Required!');
	} else {
		if(current == pass) {
			$.post('http://localhost/_client/update.php',  {id:id,current:current, pass:pass, changepassword: 'changepassword'} ,
				function(data) {
					if(data.response == 'Successfully update') {
						alert('Successfully Change! Required to Automatically Logout');
						logout();
					}
				});
		} else {
			alert('Mismatch Password')
		}
	}
}
function birthdayMoto(birthday) {
	var formated = 0;
	var  bago = new Date();
	var d = birthday.slice(0,10).split('-');
	formated = parseInt(d[0]);
	var total = bago.getUTCFullYear() - formated;
	$('#employee_age').val(total);
}
function logout(){
	window.location.href = 'http://localhost/_client/session_out.php';
}

$(document).ready(function(){	
	$('#editInfo').submit(function(e){
		e.preventDefault();
		var forms =$(this).serialize();
		$.post('http://localhost/_client/update.php',  forms ,
			function(data_inserted) {
				alert('Successfully Change! Required to Automatically Logout');
				logout();
			});
	});		
});
$(document).ready(function(){
	$('#login_form').submit(function(e){
		e.preventDefault()
		var form = $(this).serialize();
		$.post('http://localhost/_client/login.php',  form ,
			function(data) {
				if(data.response == 'Invalid Account') {
					alert(data.response);
				} else {
					window.location.href = 'http://localhost/RestoCafe/include/supervisor/employees.html';
				}
			});
	});	
});	
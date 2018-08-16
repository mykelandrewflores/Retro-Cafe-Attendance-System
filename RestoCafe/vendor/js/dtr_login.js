$(document).ready(function() {
	$('#dtr_form').submit(function(e){
		var form = $('#dtr_form').serialize();
		var employee_id = $('#employee_id').val();
		var body = '';
		e.preventDefault();
		$.getJSON('http://localhost/_client/select.php?select_info='+employee_id, function(data){
			if(data == '') {
				alert('No Data Found');
				document.getElementById("dtr_form").reset();
			} else {
				$.post('http://localhost/_client/insert.php', { action: 'insert_dtr', employee_id: employee_id  },
					function(data_inserted) {
						for(var i = 0;i<data_inserted.length; i++) {
							body+='<tr>';
							body+='<td>'+formatDate(new Date(data_inserted[i].employee_date))+'</td>';
							body+='<td>'+data_inserted[i].employee_timein+'</td>';
							body+='<td>'+data_inserted[i].employee_timeout+'</td>';
							body+='</tr>';
						} $('#fetch_employee').html(body);
					});
				for(var i = 0;i<data.length; i++) {
					$('#employee_name').html(data[i].employee_fname + ' ' + data[i].employee_lname);
					$('#status-provider').html('Successfully '+ data[i].employee_status);
				}
				document.getElementById("dtr_form").reset();
				$('#box1').addClass('is-invisible	');
				$('#box2').removeClass('is-invisible');
			}
		});
	});

	setInterval(function(){NowTime(); },10);
	function NowTime() {
		var currentTime = new Date(),
		hours = currentTime.getHours(),
		minutes = currentTime.getMinutes();
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		var suffix = "AM";
		if (hours >= 12) {
			suffix = "PM";
			hours = hours - 12;
		}
		if (hours == 0) {
			hours = 12;
		}
		$('#date-part').html(formatDate(new Date()) + '   ' + hours + ":" + minutes+ suffix);
		$('#time-part').html()
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
	$('#next_log').click(function(){
		$('#box1').removeClass('is-invisible');
		$('#box2').addClass('is-invisible');
	});
});

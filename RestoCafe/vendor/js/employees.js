$(document).ready(function(){
	$('#edit_employee').submit(function(e){
		e.preventDefault();
		var forms = $('#edit_employee').serialize();
		$.post('http://localhost/_client/update.php',  forms ,
			function(data_inserted) {
				alert('Successfully Update');
				loadData();
			});
	});
	$('#add_form_employee').submit(function(e){
		e.preventDefault();
		var add_forms = $('#add_form_employee').serialize();

		$.post('http://localhost/_client/insert.php',  add_forms ,
			function(data_inserted) {
				loadData();
				$('#add_modal').removeClass('is-active');
				alert('Successfully ADD');
			});
	});
	$('#add_toggle_employee').click(function(){
		$('#add_modal').addClass('is-active');
	});
	$('.close-modal').click(function(){
		$('#add_modal').removeClass('is-active');
	});
});
loadData();
function loadData() {
	var body = '';
	$.getJSON('http://localhost/_client/select.php', function(data){
		if(data == '') {
			alert('No Data Found');
		} else {
			var employee_id = 0;
			for(var i = 0; i<data.length; i++) {
				body+='<tr>';
				body+='<td>'+data[i].employee_id+'</td>'
				body+='<td>'+data[i].employee_fname+'</td>'
				body+='<td>'+data[i].employee_lname+'</td>'
				body+='<td><a href="#!" onclick="editButton('+data[i].employee_id+')" class="primary-color-text"><i class="fas fa-pencil-alt"></i></a>|<a href="#!" class="primary-color-text" onclick="DeductionOption('+data[i].employee_id+')"> <b>D</b></a> |<a href="#!" class="primary-color-text" onclick="deleteEmployee('+data[i].employee_id+')"> <i class="fas fa-trash-alt"></i></a> </td>';
				body+='</tr>';
				employee_id = parseInt(data[i].employee_id)
			}
			$('#add_employee_id').val(employee_id + 1);
			$('#fetch_employees').html(body);
		}
	});
}
function deleteEmployee(id) {
	var r = confirm('Are you sure?');
	if(r == true){
		$.post('http://localhost/_client/delete.php',  {employee_id:id} ,
			function(data_inserted) {
				alert('Deleted Successfully');
				location.reload();
			});
	}
}
var employee_id = 0;
var assets = [];
function DeductionOption(id) {
	employee_id = parseInt(id);
	var body = '';
	assets = [ {'employee_id': employee_id,'employee_deduction' : 'pag-ibig','deduction_amount' : 300}, {'employee_id': employee_id,'employee_deduction' : 'sss','deduction_amount' : 300 },{'employee_id': employee_id,'employee_deduction' : 'philhealth','deduction_amount' : 300},{'employee_id': employee_id,'employee_deduction' : 'others','deduction_amount' : 300} ];
	$.getJSON('http://localhost/_client/select.php?deduction_employee='+id, function(data){
		if(data == '') {
			alert('Attention: First Click the Save Button. After Refreshing the Page, You Can Now Update The Dedcution of Employee');
			$('#click_logo').removeClass('mt-2');
			$('#click_logo').addClass('is-invisible');
			for(var i = 0;i<assets.length; i++) {
				body+='<tr>';
				body+='<td>'+assets[i].employee_deduction+'</td>';
				body+='<td><div class="control has-icons-left has-icons-right"><input type="text"   name="deduction_name" class="input" value="'+parseInt(assets[i].deduction_amount)+'" /><span class="icon is-small is-left">P</span></div></td>';
				body+='</tr>';
			} 
			$('#change_save2').css('display','block');
			$('#change_save').css('display','none');
			$('#fetch_deduction').html(body);
			$('#deduction_profile').show();
			$('#profile_employees').hide();
			$('#deduction_profile').removeClass('is-invisible');
		} else {
			$('#click_logo').removeClass('mt-2');
			$('#click_logo').addClass('is-invisible');
			for(var i = 0;i<data.length; i++) {
				body+='<tr>';
				body+='<td>'+data[i].employee_deduction+'</td>';
				body+='<td><div class="control has-icons-left has-icons-right"><input type="text" class="input" id="amount'+i+'" value="'+parseInt(data[i].deduction_amount)+'" /><span class="icon is-small is-left">P</span></div></td>';
				body+='</tr>';

			}
			$('#change_save').css('display','block');
			$('#change_save2').css('display','none');
			$('#fetch_deduction').html(body);
			$('#deduction_profile').show();
			$('#profile_employees').hide();
			$('#deduction_profile').removeClass('is-invisible');
		}
	});
}
function editButton(id) {
	var body = '';
	$.getJSON('http://localhost/_client/select.php?select_info='+id, function(data){
		if(data == '') {
			alert('No Data Found');
		} else {
			$('#click_logo').removeClass('mt-2');
			$('#click_logo').addClass('is-invisible');
			for(var i = 0;i<data.length; i++) {
				$('#employee_fname').val(data[i].employee_fname);
				$('#employee_lname').val(data[i].employee_lname);
				$('#employee_age').val(data[i].employee_age);
				$('#employee_bday').val(data[i].employee_bday);
				$('#employee_position').val(data[i].employee_position);
				$('#employee_address').val(data[i].employee_address);
				$('#employee_id').val(data[i].employee_id);
			}
			$('#profile_employees').show();
			$('#deduction_profile').hide();
			$('#profile_employees').removeClass('is-invisible');
		}
	});
}
function updateDeduction() {
	var amount1 = $('#amount0').val();
	var amount2 = $('#amount1').val();
	var amount3 = $('#amount2').val();
	var amount4 = $('#amount3').val();
	$.post('http://localhost/_client/update.php',  {'employee_id':employee_id,'pag-ibig':amount1,'sss':amount2,'philhealth':amount3,'others':amount4, 'update_deduction':'update_deduction' } ,
		function(data_inserted) {
			alert('Successfully Updated!');
			loadData();
		});	
}
function birthdayMoto(birthday) {
	var formated = 0;
	var  bago = new Date();
	var d = birthday.slice(0,10).split('-');
	formated = parseInt(d[0]);
	var total = bago.getUTCFullYear() - formated;
	$('#add_employee_age').val(total);
	$('#employee_age').val(total);
}
function addDeduction() {
	assets = JSON.stringify(assets)
	$.post('http://localhost/_client/insert_multiple.php',  assets ,
		function(data_inserted) {
			alert('Success! Now You Can Edit now the Deduction of Employee');
			location.reload();
		});
}
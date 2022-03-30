function doSignup()
{
	
	var name = document.getElementById("name").value;
// School dropdown here
	var school = document.getElementById("school").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("signupPassword").value;
	var hash = md5( password );
	let xhr = new XMLHttpRequest();
//	Need to edit the url based on the php files given to us
	let url = 'api/RegisterUser.php';

	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-Type", "application/json");
	var jsonPayload = '{"name" : "' + name + '", "school" : "' + school + '", "schoolEmail" : "' + email + '", "Password" : "' + hash + '"}';
	xhr.send(jsonPayload);	
	
}

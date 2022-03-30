function doSchoolSignup()
{

	var schoolName = document.getElementById("schoolName").value;
	var schoolDomain = document.getElementById("schoolDomain").value;
	var signupUsername = document.getElementById("signupUsername").value;
	var password = document.getElementById("signupPassword").value;
	var hash = md5( password );
	let xhr = new XMLHttpRequest();
//	Need to edit the url based on the php files given to us
	let url = 'api/RegisterUser.php';

	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-Type", "application/json");
	var jsonPayload = '{"schoolName" : "' + schoolName + '", "schoolDomain" : "' + schoolDomain + '", "schoolEmail" : "' + signupUsername + '", "Password" : "' + hash + '"}';
	xhr.send(jsonPayload);	
	
}

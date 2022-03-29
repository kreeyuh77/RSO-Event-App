function doSignup()
{
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var login = document.getElementById("signupUsername").value;
	var password = document.getElementById("signupPassword").value;
	var hash = md5( password );
	let xhr = new XMLHttpRequest();
	//Need to edit the url based on the php files given to us
	let url = 'api/RegisterUser.php';

	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-Type", "application/json");
	//var jsonPayload = JSON.stringify({"FirstName" : firstName, "LastName" : lastName, "Login" : login, "Password" : hash});
	var jsonPayload = '{"FirstName" : "' + firstName + '", "LastName" : "' + lastName + '", "Login" : "' + login + '", "Password" : "' + hash + '"}';
	xhr.send(jsonPayload);
}

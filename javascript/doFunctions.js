function doCreateAnEvent()
{
	
	var title = document.getElementById("title").value;
	var description = document.getElementById("lastName").value; //might want to change id in main.html
	var location = document.getElementById("email").value;
	var when = document.getElementById("when").value;
	var type = document.getElementById("type").value;
	
	let xhr = new XMLHttpRequest();
//	Need to edit the url based on the php files given to us
	let url = 'api/RegisterUser.php';

	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-Type", "application/json");
	var jsonPayload = '{"title" : "' + title + '", "description" : "' + description + '", "location" : "' + location + '", "when" : "' + when + '", "type" : "' + type + '"}';
	xhr.send(jsonPayload);	
	
}


function doCreateAnRSO()
{
	var RSOName = document.getElementById("RSOName").value;
	
	let xhr = new XMLHttpRequest();
//	Need to edit the url based on the php files given to us
	let url = 'api/RegisterUser.php';

	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-Type", "application/json");
	var jsonPayload = '{"RSOName" : "' + RSOName + '"}';
	xhr.send(jsonPayload);	
}
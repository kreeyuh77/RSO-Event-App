function doCreateEvent()
{
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var address = document.getElementById("address").value;
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
	var zipcode = document.getElementById("zipcode").value;
	var phonenumber = document.getElementById("phonenumber").value;
	var email = document.getElementById("email").value;
	document.getElementById("addResult").innerHTML = "";
	
	var jsonPayload = '{"ID" : "' + userId + '","FirstName" : "' + firstName + '", "LastName" : "' + lastName + '", "StreetAddress" : "' + address + '", "City" : "' + city + '", "State" : "' + state + '", "ZipCode" : "' + zipcode + '", "PhoneNumber" : "' + phonenumber + '", "Email" : "' + email + '"}';
	var url = '../api/AddContact.php';
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addResult").innerHTML = firstName + " " + lastName +  " has been added!";
				updateTable(att, text);
				
			} 			
		}		
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("addResult").innerHTML = err.message;
	}
}
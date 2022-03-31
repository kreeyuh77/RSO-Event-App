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



// Searching for Domains that exist in the database
function doSchoolSearch()
{
	// for testing purposes - delete later
	
	var jsonData = '["ucf", "fsu", "valencia", "Seminole"]';
	
	
	// console.log(jsonData);
	// var mydata = JSON.parse(jsonData);
	
	// end test
	
	var jsonPayload = '';
	var isearch = "domain";
	
	var url = '../api/SearchContact.php';
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	//  payload depending on searchBy
	jsonPayload =  '{"domain" : "' + isearch + '"}';
	try
	{
		console.log("This is the payload: " + jsonPayload);
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				//var jsonObject = JSON.parse(xhr.responseText);
				var jsonObject = JSON.parse(jsonData);
				
				console.log("This is the result: " + JSON.stringify(jsonObject));

				if (jsonObject.error == "")
				{
					document.getElementById("searchResult").innerHTML = "Contact(s) have been retrieved";
				}
					else	
				{
					document.getElementById("searchResult").innerHTML = jsonObject.error;
					document.getElementById("searchList").innerHTML = "";
					return;
				}	
			  
				array = new Array(jsonObject.results.length);

			   // array = localArray;

				for (var i = 0; i < array.length; i++)
				{
					array[i] = new Array(9);
				}

				for (var i = 0; i < jsonObject.results.length; i++)
				{
				  array[i] = jsonObject.result[i].school
				}
				popSchoolDropdown(array);
			}
		};
	}
	catch(err)
	{
		document.getElementById("searchResult").innerHTML = err.message;
	}
	
}


function popSchoolDropdown(array)
{
	var select = document.getElementById("school"); 
	var options = array; 

	for(var i = 0; i < options.length; i++) 
	{
		var opt = options[i];

		var el = document.createElement("option");
		el.text = opt;
		el.value = opt;

		select.add(el);
	}
}





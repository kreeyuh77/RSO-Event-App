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



// Searching for Domains that exist in the database
function doSchoolSearch()
{
	// for testing purposes - delete later
	
	const jsonData = require('./testschool.json'); 
	console.log(jsonData);
	var mydata = JSON.parse(jsonData);
	
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
				var jsonObject = JSON.parse(xhr.responseText);
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




// ------ Code Utalizing -------- Delete Later -------
function doSearch()
{
	var jsonPayload = '';
	var isearch = "";
	// get search attritbute
	var searchText = document.getElementById('search').value;
	if(searchText == "")
	{
		document.getElementById("searchResult").innerHTML = "Start a search to view your contacts!";
		document.getElementById("searchList").innerHTML = "";
		return;
	}

	// the list will be put here
	var contactList = "";
	var url = '../api/SearchContact.php';

	document.getElementById('searchResult').innerHTML = "";

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	//  payload depending on searchBy

	var e = document.getElementById("searchType");
	var searchAtt = e.options[e.selectedIndex].text;
	att = searchAtt;
	text = searchText;
	console.log("This is the attribute to search by: " + searchAtt);
	switch (searchAtt)
	{
	  case "First Name":
	    isearch = "FirstName";
	    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "FirstName" : "' + searchText + '"}';
	    break;
	  case "Last Name":
	    isearch = "LastName";
	    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "LastName" : "' + searchText + '"}';
	    break;
	  case "Address":
	    isearch = "StreetAddress";
	    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "StreetAddress" : "' + searchText + '"}';
	    break;
	  case "City":
	    isearch = "City";
	    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "City" : "' + searchText + '"}';
	    break;
	  case "State":
	    isearch = "State";
	    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "State" : "' + searchText + '"}';
	    break;
	  case "Zip Code":
	    isearch = "ZipCode";
	    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "ZipCode" : "' + searchText + '"}';
	    break;
	  case  "Phone Number":
	    isearch = "PhoneNumber";
	    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "PhoneNumber" : "' + searchText + '"}';
	    break;
	  case  "Email":
	    isearch = "Email";
	    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "Email" : "' + searchText + '"}';
	    break;
	}
	try
	{
		console.log("This is the payload: " + jsonPayload);
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse(xhr.responseText);
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
				  for (var j = 0; j < 9; j++)
				  {
					if (j == 0)
					{
					  array[i][j] = jsonObject.results[i].FirstName;
					}
					if (j == 1)
					{
					  array[i][j] = jsonObject.results[i].LastName;
					}
					if (j == 2)
					{
					  array[i][j] = jsonObject.results[i].StreetAddress;
					}
					if (j == 3)
					{
					  array[i][j] = jsonObject.results[i].City;
					}
					if (j == 4)
					{
					  array[i][j] = jsonObject.results[i].State;
					}
								if (j == 5)
					{
					  array[i][j] = jsonObject.results[i].ZipCode;
					}
					if (j == 6)
					{
					  array[i][j] = jsonObject.results[i].PhoneNumber;
					}
							if (j == 7)
					{
					  array[i][j] = jsonObject.results[i].Email;
					}
					if (j == 8)
					{
						array[i][j] = jsonObject.results[i].ContactID;
					}
				  }
				}
				createTable(array);
			}
		};
  }
  catch(err)
  {
	document.getElementById("searchResult").innerHTML = err.message;
  }
}

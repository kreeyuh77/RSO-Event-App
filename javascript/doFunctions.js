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

function doSchoolDropdown()
{
	// Lets create a function that reads from a json file
	// https://stackoverflow.com/questions/9991805/javascript-how-to-parse-json-array
	
	// parse json file for a string
	var url = '../api/SchoolDropdown.php'; // THIS WILL REPLACE WITH THE API JULIAN MAKES

	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	xhr.send(null);
	xhr.onreadystatechange = function() {
		// var jsonObject = JSON.parse(xhr.responseText);
		if (this.readyState == 4 && this.status == 200)
		{
			var jsonObject = JSON.parse(xhr.responseText);
			console.log("This is the result: " + JSON.stringify(jsonObject));
			var schoolArray = new Array(Object.keys(jsonObject).length);
			var schoolIDArray = new Array(Object.keys(jsonObject).length);
			var select =  document.getElementById("school");
			
			// print to console 
			//console.log("This is the school result: " + $result);
			
			
			for ( var i = 0 ; i < schoolArray.length ; i++)
			{
				schoolArray[i] = jsonObject[i].Name;
				schoolIDArray[i] = jsonObject[i].SchoolID;
				var choice = document.createElement("option");
				choice.textContent = schoolArray[i];
				choice.value = schoolIDArray[i];
				select.appendChild(choice)
			}	
		}
			
	}
	
}


// holds array of events returned for home page
var array = '';
var arraySchool = '';
// var att = '';
// var text ='';

// function updateTable(searchAtt, searchText)
// {
// 	var jsonPayload = '';
// 	var isearch = "";

// 	if(searchText == ""){
// 		document.getElementById("searchResult").innerHTML = "Start a search to view Events!";
// 		document.getElementById("searchList").innerHTML = "";
// 		return;
// 	}

// 	var url = '../api/SearchContact.php';

// 	document.getElementById('searchResult').innerHTML = "";

// 	var xhr = new XMLHttpRequest();	
// 	xhr.open("POST", url, true);
// 	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
// 	//  payload depending on searchBy

// 	switch (searchAtt)
// 	{
// 		case "title":
// 			isearch = "title";
// 			jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "title" : "' + searchText + '"}';
// 			break;	
// 		case "description":
// 			isearch = "description";
// 			jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "description" : "' + searchText + '"}';
// 			break;	
// 		case "location":
// 			isearch = "location";
// 			jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "location" : "' + searchText + '"}';
// 			break;
// 		case "when":
// 			isearch = "when";
// 			jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "when" : "' + searchText + '"}';
// 			break;	
// 		case "type":
// 			isearch = "type";
// 			jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "type" : "' + searchText + '"}';
// 			break;

// 	}
//    try
//    {
// 		console.log("This is the payload: " + jsonPayload);
// 		xhr.send(jsonPayload);
// 		xhr.onreadystatechange = function()
// 		{
// 			if (this.readyState == 4 && this.status == 200)
// 			{
// 				var jsonObject = JSON.parse(xhr.responseText);
// 				console.log("This is the result: " + JSON.stringify(jsonObject));

// 			if (jsonObject.error == "")
//   		{
//  	  		document.getElementById("searchResult").innerHTML = "Event(s) have been retrieved";
//    		}
//    	 	else
//    	 	{
//     		document.getElementById("searchResult").innerHTML = jsonObject.error;
// 				document.getElementById("searchList").innerHTML = "";
// 	  		return;
//       }

// 			array = new Array(jsonObject.results.length);
// 			for (var i = 0; i < array.length; i++)
// 			{
// 				array[i] = new Array(5);
// 			}
// 			for (var i = 0; i < jsonObject.results.length; i++)
// 			{
// 			  for (var j = 0; j < 5; j++)
// 			  {
// 			    if (j == 0)
// 			    {
// 			      array[i][j] = jsonObject.results[i].title;
// 			    }
// 			    if (j == 1)
// 			    {
// 			      array[i][j] = jsonObject.results[i].description;
// 			    }
// 			    if (j == 2)
// 			    {
// 			      array[i][j] = jsonObject.results[i].location;
// 			    }
// 			    if (j == 3)
// 			    {
// 			      array[i][j] = jsonObject.results[i].when;
// 			    }
// 			    if (j == 4)
// 			    {
// 			      array[i][j] = jsonObject.results[i].type;
// 			    }
// 	       }
// 	     }
// 	     createTable(array);
// 			}
// 		};
// 	}
//   catch(err)
//   {
// 		document.getElementById("searchResult").innerHTML = err.message;
//   }
// }

// function doSearch()
// {
// 	var jsonPayload = '';
// 	var isearch = "";
// 	// get search attritbute
// 	var searchText = document.getElementById('search').value;
// 	if(searchText == "")
// 	{
// 		document.getElementById("searchResult").innerHTML = "Start a search to view your Events!";
// 		document.getElementById("searchList").innerHTML = "";
// 		return;
// 	}

// 	// the list will be put here
// 	var contactList = "";
// 	var url = '../api/SearchContact.php';

// 	document.getElementById('searchResult').innerHTML = "";

// 	var xhr = new XMLHttpRequest();
// 	xhr.open("POST", url, true);
// 	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
// 	//  payload depending on searchBy

// 	var e = document.getElementById("searchType");
// 	var searchAtt = e.options[e.selectedIndex].text;
// 	att = searchAtt;
// 	text = searchText;
// 	console.log("This is the attribute to search by: " + searchAtt);
// 	switch (searchAtt)
// 	{
// 	  case "title":
// 			isearch = "title";
// 			jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "title" : "' + searchText + '"}';
// 			break;	
// 		case "description":
// 			isearch = "description";
// 			jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "description" : "' + searchText + '"}';
// 			break;	
// 		case "location":
// 			isearch = "location";
// 			jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "location" : "' + searchText + '"}';
// 			break;
// 		case "when":
// 			isearch = "when";
// 			jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "when" : "' + searchText + '"}';
// 			break;	
// 		case "type":
// 			isearch = "type";
// 			jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "type" : "' + searchText + '"}';
// 			break;
// 	}
//   try
//   {
// 		console.log("This is the payload: " + jsonPayload);
// 		xhr.send(jsonPayload);
// 		xhr.onreadystatechange = function()
// 		{
// 			if (this.readyState == 4 && this.status == 200)
// 			{
// 				var jsonObject = JSON.parse(xhr.responseText);
// 				console.log("This is the result: " + JSON.stringify(jsonObject));

// 				if (jsonObject.error == "")
// 				{
// 					document.getElementById("searchResult").innerHTML = "Event(s) have been retrieved";
// 				}
// 				else
// 				{
// 					document.getElementById("searchResult").innerHTML = jsonObject.error;
// 					document.getElementById("searchList").innerHTML = "";
// 					return;
// 				}

// 				array = new Array(jsonObject.results.length);

// 				for (var i = 0; i < array.length; i++)
// 				{
// 					array[i] = new Array(5);
// 				}

// 				for (var i = 0; i < jsonObject.results.length; i++)
// 				{
// 					for (var j = 0; j < 5; j++)
// 					{
// 						if (j == 0)
// 						{
// 							array[i][j] = jsonObject.results[i].title;
// 						}
// 						if (j == 1)
// 						{
// 							array[i][j] = jsonObject.results[i].description;
// 						}
// 						if (j == 2)
// 						{
// 							array[i][j] = jsonObject.results[i].location;
// 						}
// 						if (j == 3)
// 						{
// 							array[i][j] = jsonObject.results[i].when;
// 						}
// 						if (j == 4)
// 						{
// 							array[i][j] = jsonObject.results[i].type;
// 						}
// 					}
// 				}
// 				createTable(array);
// 			}
// 		};
//   }
//   catch(err)
//   {
// 	document.getElementById("searchResult").innerHTML = err.message;
//   }
// }

function doFindEvents()
{
		var jsonPayload = '';
		// the list will be put here
		var eventList = "";
		var url = '../api/StudentEventView.php'; // REPLACE WITH PROPER PHP 
	
		document.getElementById('eventResult').innerHTML = "";
	
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		
		jsonPayload =  '{"ID" : "' + userId  + '"}';
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
	
					// if (jsonObject.error == "")
					// {
					// 	document.getElementById("eventResult").innerHTML = "Event(s) have been retrieved";
					// }
					// else
					// {
					// 	document.getElementById("eventResult").innerHTML = jsonObject.error;
					// 	document.getElementById("eventList").innerHTML = "";
					// 	return;
					// }
					console.log("about to create array");
					var numElements = Object.keys(jsonObject).length;
					array = new Array(numElements);
	
					for (var i = 0; i < array.length; i++)
					{
						array[i] = new Array(5);
					}
	
					for (var i = 0; i < numElements; i++)
					{
						for (var j = 0; j < 5; j++)
						{
							if (j == 0)
							{
								array[i][j] = jsonObject[i].Name;
							}
							if (j == 1)
							{
								array[i][j] = jsonObject[i].Description;
							}
							if (j == 2)
							{
								array[i][j] = jsonObject[i].Location;
							}
							if (j == 3)
							{
								array[i][j] = jsonObject[i].Datetime;
							}
							if (j == 4)
							{
								array[i][j] = jsonObject[i].Type;
							}
						}
					}
					console.log(array);
					createTable(array);
				}
			};
	  }
	  catch(err)
	  {
		document.getElementById("eventResult").innerHTML = err.message;
	  }
}


/// **************** 'when' will change to date and time ****************

function createTable(array)
{
	//var table = document.createElement('table');
	// string to create table in html
	var table = "<table><tr>";
	table += "<th>" + "Title" + "</th>";
	table += "<th>" + "Description" + "</th>";
	table += "<th>" + "Location" + "</th>";
	table += "<th>" + "When" + "</th>";
	table += "<th>" + "Type" + "</th>";
	table += "<th>" + "" + "</th>";

	for (var i = 0; i < array.length; i++)
	{
	  table+="<tr>";
	  for (var j = 0; j < 5; j++)
	  {
	  	table+= "<td>" + array[i][j] + "</td>";
	  }
	  //table +="<td style='word-wrap:break-word;'><span id='editContactButton' style='width:auto;height:30px;padding:10px' onclick='doEdit(" + i + ")';><i class='fas fa-edit'></i></span><span id='deleteContactButton' style='width:auto;height:30px;padding:10px' onclick='doDelete(" + i + ")';><i class='fas fa-trash-alt'></i></span></td>";
	  table+="</tr>";
	}
	table+="</table>";
	document.getElementById("eventList").innerHTML = table;
}

function doFindEventsSchool()
{
		var jsonPayload = '';
		// the list will be put here
		var eventList = "";
		var url = '../api/StudentEventView.php'; // REPLACE WITH PROPER PHP 
	
		document.getElementById('eventResult').innerHTML = "";
	
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		
		jsonPayload =  '{"ID" : "' + userId  + '"}';
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
	
					// if (jsonObject.error == "")
					// {
					// 	document.getElementById("eventResult").innerHTML = "Event(s) have been retrieved";
					// }
					// else
					// {
					// 	document.getElementById("eventResult").innerHTML = jsonObject.error;
					// 	document.getElementById("eventList").innerHTML = "";
					// 	return;
					// }
					console.log("about to create array");
					var numElements = Object.keys(jsonObject).length;
					arraySchool = new Array(numElements);
	
					for (var i = 0; i < arraySchool.length; i++)
					{
						arraySchool[i] = new Array(5);
					}
	
					for (var i = 0; i < numElements; i++)
					{
						for (var j = 0; j < 6; j++)
						{
							if (j == 0)
							{
								arraySchool[i][j] = jsonObject[i].Name;
							}
							if (j == 1)
							{
								arraySchool[i][j] = jsonObject[i].Description;
							}
							if (j == 2)
							{
								arraySchool[i][j] = jsonObject[i].Location;
							}
							if (j == 3)
							{
								arraySchool[i][j] = jsonObject[i].Datetime;
							}
							if (j == 4)
							{
								arraySchool[i][j] = jsonObject[i].Type;
							}
							if (j == 5)
							{
								arraySchool[i][j] = jsonObject[i].ID;
							}
						}
					}
					console.log(arraySchool);
					createTableSchool(arraySchool);
				}
			};
	  }
	  catch(err)
	  {
		document.getElementById("eventResult").innerHTML = err.message;
	  }
}

function createTableSchool(arraySchool)
{
	//var table = document.createElement('table');
	// string to create table in html
	var table = "<table><tr>";
	table += "<th>" + "Title" + "</th>";
	table += "<th>" + "Description" + "</th>";
	table += "<th>" + "Location" + "</th>";
	table += "<th>" + "When" + "</th>";
	table += "<th>" + "Type" + "</th>";
	table += "<th>" + "" + "</th>";

	for (var i = 0; i < arraySchool.length; i++)
	{
	  table+="<tr>";
	  for (var j = 0; j < 5; j++)
	  {
		// can add if j = 3 that uses .toLocaleString, to format the date/time better
	  	table+= "<td>" + arraySchool[i][j] + "</td>";
	  }
	  table +="<td style='word-wrap:break-word;'><span id='disapproveButton' style='width:auto;height:30px;padding:10px' onclick='doApproval(" + i + "," + 0 + ")';><i class='fa-regular fa-square-xmark'></i></span><span id='approveButton' style='width:auto;height:30px;padding:10px' onclick='doApproval(" + i + "," + 1 + ")';><i class='fa-regular fa-square-check'></i></span></td>";
	  table+="</tr>";
	}
	table+="</table>";
	document.getElementById("eventList").innerHTML = table;
}

function doApproval(i, val)
{
	var eventID = schoolArray[i][5];
	var eventName = schoolArray[i][0];
	var jsonPayload = '';
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");	
	jsonPayload =  '{"eventID" : "' + eventID + '", "ApprovalCode" : "' + val  + '"}';

	try 
	{
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse(xhr.responseText);
				console.log("This is the result: " + JSON.stringify(jsonObject));

				// display success message
				if (val == 0)
				{
					document.getElementById("eventResult").innerHTML = eventName + " has been denied";
				}
				if (val == 1)
				{
					document.getElementById("eventResult").innerHTML = eventName + " has been approved";
				}
			}
		}
	}
	catch(err)
	{
		document.getElementById("eventResult").innerHTML = err.message;
	}
	


}

// function doDelete(i)
// {
// 	var contactID = array[i][8];
// 	var fname = array[i][0];
// 	var lname = array[i][1];
// 	document.getElementById('deleteContact').style.display='block';
// 	document.getElementById("deleteResult").innerHTML = "";
// 	document.getElementById("deleteName").innerHTML = "Are you sure you want to remove " + fname + " " + lname + " from your event list?";
// 	document.getElementById("deleteButton").addEventListener("click", function() {
// 		var jsonPayload = '{"ContactID" : "' + contactID + '"}';
// 		//Need to edit the url based on the php files given to us
// 		var url = '../api/RemoveContact.php';

// 		var xhr = new XMLHttpRequest();
// 		xhr.open("DELETE", url, true);
// 		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
// 		try
// 		{
// 			xhr.onreadystatechange = function()
// 			{
// 				if (this.readyState == 4 && this.status == 200)
// 				{
// 					document.getElementById("deleteResult").innerHTML = fname + " " + lname + " has been deleted!";
// 					updateTable(att, text);
					
// 				}
// 			}
// 			xhr.send(jsonPayload);
			
// 		}
// 		catch(err)
// 		{
// 			document.getElementById("deleteResult").innerHTML = err.message;
// 		}
		
// 	});
	
// }




// function doEdit(i){
// 	var contactID = array[i][8];
// 	var fname = array[i][0];
// 	var lname = array[i][1];
// 	document.getElementById('editContact').style.display='block';
// 	document.getElementById("editResult").innerHTML = "";
// 	document.getElementById("editName").innerHTML = "Currently editing " + fname + " " + lname;

// 	document.getElementById("editType").addEventListener("change", function() {
// 		var d = document.getElementById("editType");
// 		var editAtt = d.options[d.selectedIndex].text;
// 		console.log("This is the attribute to search by: " + editAtt);

// 		switch (editAtt)
// 		{
// 			case "title":
// 				document.getElementById("newinfo").value = array[i][0];
// 				break;
// 			case "description":
// 				document.getElementById("newinfo").value = array[i][1];
// 				break;
// 			case "location":
// 				document.getElementById("newinfo").value = array[i][2];
// 				break;
// 			case "when":
// 				document.getElementById("newinfo").value = array[i][3];
// 				break;
// 			case "type":
// 				document.getElementById("newinfo").value = array[i][4];
// 				break;
// 			case "comment":
// 				document.getElementById("newinfo").value = array[i][5];
// 				break;
// 			case  "rate":
// 				document.getElementById("newinfo").value = array[i][6];
// 				break;
// 	});

// 	document.getElementById("editButton").addEventListener("click", function() {
// 		var jsonPayload = '';
// 		var iedit = "";
// 		var newinfo = document.getElementById('newinfo').value;
// 		console.log("info to add: " + newinfo);
// 		var url = '../api/EditContact.php';

// 		var xhr = new XMLHttpRequest();
// 		xhr.open("POST", url, true);
// 		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
// 		var d = document.getElementById("editType");
// 		var editAtt = d.options[d.selectedIndex].text;
// 		console.log("This is the attribute to search by: " + editAtt);


// 		switch (editAtt)
// 		{
// 			case "title":
// 				iedit = "title";
// 				jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "title" : "' + newinfo + '"}';
// 				break;
// 			case "description":
// 				iedit = "description";
// 				jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "description" : "' + newinfo + '"}';
// 				break;
// 			case "location":
// 				iedit = "location";
// 				jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "location" : "' + newinfo + '"}';
// 				break;
// 			case "when":
// 				iedit = "when";
// 				jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "when" : "' + newinfo + '"}';
// 				break;
// 			case "type":
// 				iedit = "type";
// 				jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "type" : "' + newinfo + '"}';
// 				break;
// 			case "comment":
// 				iedit = "comment";
// 				jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "comment" : "' + newinfo + '"}';
// 				break;
// 			case  "rate":
// 				iedit = "rate";
// 				jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "rate" : "' + newinfo + '"}';
// 				break;
// 		}
// 		try
// 		{	
// 	 		console.log("This is the EDIT payload: " + jsonPayload);
// 			xhr.send(jsonPayload);
// 			xhr.onreadystatechange = function()
// 			{
// 				if (this.readyState == 4 && this.status == 200)
// 				{
// 					var jsonObject = JSON.parse(xhr.responseText);
// 					console.log("This is the result: " + JSON.stringify(jsonObject));

// 					if (jsonObject.error == "")
// 	        	{
// 	          	document.getElementById("editResult").innerHTML =  fname + " " + lname + " was succesfully edited!";
// 				updateTable(att, text);
			
							
// 						}
// 		        else
// 		        {
// 		          document.getElementById("editResult").innerHTML = jsonObject.error;
// 			  		return;
// 		        }
					
// 				}
// 			}
		
// 		}
// 		catch(err)
// 		{
// 			document.getElementById("editResult").innerHTML = err.message;
// 		}
		
// 	});
	
// }


function doAdd()
{
	var title = document.getElementById("title").value;
	var description = document.getElementById("description").value;
	var location = document.getElementById("location").value;
	var when = document.getElementById("when").value;
	var state = document.getElementById("state").value;
	var type = document.getElementById("type").value;
	document.getElementById("addResult").innerHTML = "";
	
	var jsonPayload = '{"ID" : "' + userId + '","title" : "' + title + '", "description" : "' + description + '", "location" : "' + location + '", "when" : "' + when + '", "type" : "' + type + '"}';
	var url = '../api/AddEvent.php';
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addResult").innerHTML = title + " " +  " has been added!";
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
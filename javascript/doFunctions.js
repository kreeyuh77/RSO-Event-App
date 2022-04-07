function doCreateEvent()
{
	var title = document.getElementById("title").value;
	var description = document.getElementById("description").value; //might want to change id in main.html
	var location = document.getElementById("location").value;
	var when = document.getElementById("when").value;
	var type = document.getElementById("type").value;
	
	let xhr = new XMLHttpRequest();
	let url = '../api/CreateEvent.php'; // CHANGE PHP NAME
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	var jsonPayload = '{"title" : "' + title + '", "description" : "' + description + '", "location" : "' + location + '", "when" : "' + when + '", "type" : "' + type + '", "ID" : "' + userId +'"}';
	xhr.send(jsonPayload);
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse(xhr.responseText);
				if (jsonObject.error == "")
				{
					document.getElementById("addResult").innerHTML = "Successfully created event";
				}
				else
				{
					document.getElementById("addResult").innerHTML = "Error creating event";
					return;
				}
			} 			
		}		
	}
	catch(err)
	{
		document.getElementById("addResult").innerHTML = err.message;
	}	
}


function doCreateRSO()
{
	var RSOName = document.getElementById("RSOName").value;
	
	let xhr = new XMLHttpRequest();
	let url = '../api/CreateRSO.php'; // CHANGE PHP NAME
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	var jsonPayload = '{"RSOName" : "' + RSOName + '", "ID" : "' + userId + '"}';
	xhr.send(jsonPayload);
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse(xhr.responseText);
				if (jsonObject.error == "")
				{
					document.getElementById("createRSOResult").innerHTML = "Successfully created RSO";
				}
				else
				{
					document.getElementById("createRSOResult").innerHTML = "You are already an admin of an RSO, you cannot create another.";
					return;
				}
			} 			
		}		
	}
	catch(err)
	{
		document.getElementById("createRSOResult").innerHTML = err.message;
	}	
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
				select.appendChild(choice);
			}	
		}
			
	}
	
}


// holds array of events returned for home page
var array = '';
var arraySchool = '';


function doFindEvents()
{
		var jsonPayload = '';
		// the list will be put here
		var eventList = "";
		var url = '../api/StudentEventView.php'; // REPLACE WITH PROPER PHP 
	
		//document.getElementById('eventResult').innerHTML = "";
	
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
					// console.log("about to create array");
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
	  //table +="<td style='word-wrap:break-word;'><span id='editContactButton' style='width:auto;height:30px;padding:10px' onclick='doGoToEventPage(" + i + ")';>MORE</span></td>";
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
		var url = '../api/SchoolEventView.php'; // REPLACE WITH PROPER PHP 
	
		//document.getElementById('eventResult').innerHTML = "";
	
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
					//console.log("about to create array");
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
								arraySchool[i][j] = jsonObject[i].id;
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
	  table +="<td style='word-wrap:break-word;'><span id='disapproveButton' style='width:auto;height:30px;padding:10px' onclick='doApproval(" + i + "," + 0 + ")';>DENY</span><span id='approveButton' style='width:auto;height:30px;padding:10px' onclick='doApproval(" + i + "," + 1 + ")';>APPROVE</span></td>";
	  table+="</tr>";
	}
	table+="</table>";
	document.getElementById("eventList").innerHTML = table;
}

function doApproval(i, val)
{
	var eventID = arraySchool[i][5];
	var eventName = arraySchool[i][0];
	var jsonPayload = '';
	var xhr = new XMLHttpRequest();
	var url = '../api/ApproveEvents.php';
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");	
	jsonPayload =  '{"eventID" : "' + eventID + '", "ApprovalCode" : "' + val  + '"}';
	console.log("This is the payload: " + jsonPayload);
	try 
	{
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				//var jsonObject = JSON.parse(xhr.responseText);
				//console.log("This is the result: " + JSON.stringify(jsonObject));

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
			doFindEventsSchool();
		}
	}
	catch(err)
	{
		document.getElementById("eventResult").innerHTML = err.message;
	}
}

// function doGoToEventPage(i)
// {
// 	var eventID = array[i][5];
// 	var eventName = array[i][0];
// 	// update the cookie to store the eventID and name as well. 
// 	document.cookie = "userId=" + userId + ",userName=" + userName + ",eventId" + eventID + ",eventName" + eventName + ";expires=" + date.toGMTString();

// 	// go to event page
// 	location.href ="eventpage.html";
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
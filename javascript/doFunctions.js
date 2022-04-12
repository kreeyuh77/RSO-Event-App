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

function doCreateEvent()
{
	var title = document.getElementById("title").value;
	var description = document.getElementById("description").value; 
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
				// TEST IF THIS WORKS
				else if (jsonObject.error == "Not an RSO Admin")
				{
					document.getElementById("addResult").innerHTML = "You are not an RSO admin so you cannot create events. Create an RSO to access this function.";
				}
				else if (jsonObject.error == "Taken time slot at location")
				{
					document.getElementById("addResult").innerHTML = "Error creating event, conflicting time/location";
				}
				else if (jsonObject.error == "Not enough members")
				{
					document.getElementById("addResult").innerHTML = "RSO must have 5 members to be active and create events";
				}
				else
				{
					document.getElementById("addResult").innerHTML = "Error creating event";
					return;
				}
			doFindEvents();
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

function doJoin()
{
	var RSO = document.getElementById("RSO").value;
	
	let xhr = new XMLHttpRequest();
	let url = '../api/JoinRSO.php'; // CHANGE PHP NAME
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	var jsonPayload = '{"RSO" : "' + RSO + '", "ID" : "' + userId + '"}';
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
					document.getElementById("joinResult").innerHTML = "Successfully joined RSO";
				}
				else
				{
					document.getElementById("joinResult").innerHTML = "Error joining RSO";
					return;
				}
			} 			
		}		
	}
	catch(err)
	{
		document.getElementById("joinResult").innerHTML = err.message;
	}	
}



function doRSODropdown()
{
	// Lets create a function that reads from a json file
	// https://stackoverflow.com/questions/9991805/javascript-how-to-parse-json-array
	
	// parse json file for a string
	var jsonPayload = '';
	var url = '../api/FindRSO.php'; // THIS WILL REPLACE WITH THE API JULIAN MAKES

	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	jsonPayload =  '{"ID" : "' + userId  + '"}';
	//xhr.onreadystatechange = function() {
	try
	{
		console.log("This is the payload for RSO dropdown: " + jsonPayload);
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function()
		{
			// var jsonObject = JSON.parse(xhr.responseText);
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse(xhr.responseText);
				console.log("This is the result for RSO dropdown: " + JSON.stringify(jsonObject));
				var RSOArray = new Array(Object.keys(jsonObject).length);
				var RSOIDArray = new Array(Object.keys(jsonObject).length);
				var select =  document.getElementById("RSO");
				
				for ( var i = 0 ; i < RSOArray.length ; i++)
				{
					RSOArray[i] = jsonObject[i].Name;
					RSOIDArray[i] = jsonObject[i].id;
					var choice = document.createElement("option");
					choice.textContent = RSOArray[i];
					choice.value = RSOIDArray[i];
					select.appendChild(choice);
				}	
			}
		};
	  }
	  catch(err)
	  {
		document.getElementById("joinResult").innerHTML = err.message;
	  }
	//}	
}



var array = '';
function doFindEvents()
{
	var jsonPayload = '';
	var url = '../api/StudentEventView.php'; // REPLACE WITH PROPER PHP 
	
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

				var numElements = Object.keys(jsonObject).length;
				array = new Array(numElements);

				for (var i = 0; i < array.length; i++)
				{
					array[i] = new Array(5);
				}

				for (var i = 0; i < numElements; i++)
				{
					for (var j = 0; j < 6; j++)
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
						if (j == 5)
						{
							array[i][j] = jsonObject[i].id;
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
	  table +="<td style='word-wrap:break-word;'><span id='editContactButton' style='width:auto;height:30px;padding:10px' onclick='doGoToEventPage(" + i + ")';>MORE</span></td>";
	  table+="</tr>";
	}
	table+="</table>";
	document.getElementById("eventList").innerHTML = table;
}

var arraySchool = '';
function doFindEventsSchool()
{
	var jsonPayload = '';
	var url = '../api/SchoolEventView.php'; // REPLACE WITH PROPER PHP 

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
				// var jsonObject = JSON.parse(xhr.responseText);
				// console.log("This is the result: " + JSON.stringify(jsonObject));

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

function doGoToEventPage(i)
{
	var eventID = array[i][5];
	var eventName = array[i][0];
	// update the cookie to store the eventID and name as well. 
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "userId=" + userId + ",userName=" + userName + ",eventId=" + eventID + ",eventName=" + eventName + ";expires=" + date.toGMTString();

	// go to event page
	location.href ="eventpage.html";
}

var comments = '';
function doFindComments() {
	var jsonPayload = '';
	var url = '../api/FindComments.php'; // REPLACE WITH PROPER PHP 
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		
	jsonPayload =  '{"ID" : "' + eventId  + '"}';
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

				var numElements = Object.keys(jsonObject).length;
				comments = new Array(numElements);

				for (var i = 0; i < comments.length; i++)
				{
					comments[i] = new Array(2);
				}

				for (var i = 0; i < numElements; i++)
				{
					for (var j = 0; j < 2; j++)
					{
						if (j == 0)
						{
							comments[i][j] = jsonObject[i].StudentName;
						}
						if (j == 1)
						{
							comments[i][j] = jsonObject[i].Comment;
						}
					}
				}
				console.log(comments);
				document.getElementById("eventResult").innerHTML = "";
				createTableComments(comments);
			}
		};
	  }
	  catch(err)
	  {
		document.getElementById("eventResult").innerHTML = err.message;
	  }
}

function createTableComments(comments)
{
	// string to create table in html
	var table = "<table><tr>";
	table += "<th>" + "Student" + "</th>";
	table += "<th>" + "Comment" + "</th>";

	for (var i = 0; i < comments.length; i++)
	{
	  table+="<tr>";
	  for (var j = 0; j < 2; j++)
	  {
	  	table+= "<td>" + comments[i][j] + "</td>";
	  }
	  table+="</tr>";
	}
	table+="</table>";
	document.getElementById("eventList").innerHTML = table;
}

function doCreateComment()
{
	var comment = document.getElementById("comment").value;
	
	let xhr = new XMLHttpRequest();
	let url = '../api/CreateComment.php'; // CHANGE PHP NAME
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	var jsonPayload = '{"comment" : "' + comment + '", "eventId" : "' + eventId + '", "ID" : "' + userId +'"}';
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
					document.getElementById("createCommentResult").innerHTML = "Successfully created comment";
				}
				else
				{
					document.getElementById("createCommentResult").innerHTML = "Error creating comment";
					return;
				}
				doFindComments();
			} 			
		}		
	}
	catch(err)
	{
		document.getElementById("createCommentResult").innerHTML = err.message;
	}	
}

function doRate()
{
	var rate = document.getElementById("rate").value;
	
	let xhr = new XMLHttpRequest();
	let url = '../api/PLACEHOLDER.php'; // CHANGE PHP NAME
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	var jsonPayload = '{"rate" : "' + rate + '", "eventId" : "' + eventId + '", "ID" : "' + userId +'"}';
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
					document.getElementById("rateResult").innerHTML = "Successfully rated event";
				}
				else
				{
					document.getElementById("rateResult").innerHTML = "Error rating event";
					return;
				}
				doFindRate();
			} 			
		}		
	}
	catch(err)
	{
		document.getElementById("rateResult").innerHTML = err.message;
	}	
}

function doFindRate() {
	var jsonPayload = '';
	var url = '../api/PLACEHOLDER.php'; // REPLACE WITH PROPER PHP 
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		
	jsonPayload =  '{"ID" : "' + eventId  + '"}';
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
				document.getElementById("eventRating").innerHTML = "Event Rating" + JSON.stringify(jsonObject);
			}
		};
	  }
	  catch(err)
	  {
		document.getElementById("eventRating").innerHTML = err.message;
	  }
}
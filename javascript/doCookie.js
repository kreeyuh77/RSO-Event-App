var urlBase = 'http://wownice.club/api';
var extension = 'php';

var userId = 0;
var userName = "";
// var lastName = "";
// var address = "";
// var city = ""; 
// var state = "";
// var zipCode = 0;
// var phoneNumber = 0;
// var email = "";

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "userId=" + userId + ",userName=" + userName + ";expires=" + date.toGMTString();
}



function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "userName" )
		{
			userName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "../index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + userName;
	}
}
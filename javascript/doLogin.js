	var userId = 0;
	var firstName = "";
	var lastName = "";

	function saveCookie()
	{
		var minutes = 20;
		var date = new Date();
		date.setTime(date.getTime()+(minutes*60*1000));
		document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
	}

	function doLogin()
	{

		var login = document.getElementById("loginName").value;
		var password = document.getElementById("loginPassword").value;

		var hash = md5( password );
		let xhr = new XMLHttpRequest();

		//Need to edit the url based on the php files given to us
		let url = '/api/LoginAPI.php';
		xhr.open("POST", url, false);
		xhr.setRequestHeader("Content-Type", "application/json");
		//var jsonPayload = JSON.stringify({"FirstName" : firstName, "LastName" : lastName, "Login" : login, "Password" : hash});
		var jsonPayload = '{"Login" : "' + login + '", "Password" : "' + hash + '"}';
		xhr.send(jsonPayload);
		console.log(xhr.responseText);

	  var jsonObject = JSON.parse( xhr.responseText );
		userId = jsonObject.ID;
	  firstName = jsonObject.FirstName;
	  lastName = jsonObject.LastName;
	  if (userId < 1 || jsonObject.error != "")
	  {
	    document.getElementById("loginResult").style.color = "red";
	    document.getElementById("loginResult").innerHTML = "Incorrect username or password";
	  }
	  else
	  {
	  	saveCookie();
			location.assign("https://wownice.club/html/main.html");
	  }
	}

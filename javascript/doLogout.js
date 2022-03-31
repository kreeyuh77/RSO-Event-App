	function doLogout()
	{
		var userId = 0;
		var firstName = "";
		var lastName = "";
		document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
		window.location.href = "../index.html";
	}

var baseURL = "http://sofar.000webhostapp.com/wordpress/wordpress/wp-json/wp/v2/";
function getAllPost(){
	  $.get(baseURL + "posts", function(data, status){
        alert("Data: " +  data[0]["id"]+ "\nStatus: " + status);
		alert("Data: " +  $('<p>' + data[0]["title"]["rendered"] + '</p>').text() + "\nStatus: " + status);
		alert("Data: " +  data[0]["content"]["rendered"]+ "\nStatus: " + status);
    });
}

getAllPost();
function update(){
	var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
	var target_url = "http://witswap.napierport.co.nz/witswap/(S(32tc1h2yg0hzxcbdg1qxgomg))/MobileWebForm1.aspx"

	$(document).ready(function() {
		var market = document.getElementById("market").value;
	    $.ajax({
	        url: cors_api_url + target_url,
	        type: 'get',
	    }).then(function(data) {
	    	console.log(data)
	    	$('.greeting-id').empty()
	    	$('.greeting-content').empty()
	       	$('.greeting-id').append('data from the site: ' + data);
	       	$('.greeting-content').append('data from the site: ' + data);
	    });
	});
}

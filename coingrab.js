function update(){
	var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
	var target_url = "https://bittrex.com/api/v1.1/public/getticker"

	$(document).ready(function() {
		var market = document.getElementById("market").value;
	    $.ajax({
	        url: cors_api_url + target_url,
	        type: 'get',
	        data: {'market':  market}
	    }).then(function(data) {
	    	console.log(data)
	    	$('.greeting-id').empty()
	    	$('.greeting-content').empty()
	       	$('.greeting-id').append('The Bid price is: ' + data.result.Bid);
	       	$('.greeting-content').append('The Ask price is: ' + data.result.Ask);
	    });
	});
}

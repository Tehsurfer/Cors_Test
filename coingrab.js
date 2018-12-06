var surfsite;
var regex = /[+-]?\d+(\.\d+)?/g;
var waveheightlist = [];
var fullList = undefined;
var titles = [];
var firstUpdate = true;
var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
var target_url = "http://witswap.napierport.co.nz/witswap/(S(32tc1h2yg0hzxcbdg1qxgomg))/MobileWebForm1.aspx"


function initialise(){
// 	fs.readFile('surfheights.json', 'utf8', function readFileCallback(err, data){
//     if (err){
//         console.log(err);
//     } else {
//     waveheightlist = JSON.parse(data); //now it an object
// 	}
// });
// 	button = document.getElementById('surfButton');
// 	button.onclick = update;
}

function readFile(){
	
	fullList = get_json_data();
	console.log('fullList:' + fullList);

}

function callPort(){
	console.log(fullList)
	$(document).ready(function() {
	    $.ajax({
	        url: cors_api_url + target_url,
	        type: 'get',
	    }).then(function(data) {
	    	console.log(data)
	    	$('.greeting-id').empty()
	    	$('.greeting-content').empty()
	       	$('.greeting-id').append('data from the site: ' + data);
	       	
	       	surfsite = document.createElement( 'html' );
	       	surfsite.innerHTML = data;
	       	table = surfsite.getElementsByTagName('tr');

	       	tablestring = 'table from the site: ' 
	       	titles = []
	       	var foundValues = []
	       	for (var i in table){
	       		tablestring += table[i].innerText;
	       		if (i >= 1){
	       			foundValues.push(table[i].innerText.match(regex).map(function(v) { return parseFloat(v); })[0]);
	       			titles.push(table[i].innerText.split(':',1)[0]);
	       		}
	       	}
	       	if (fullList === undefined) {
				get_json_data()
			}else{
				for (var j in foundValues){
					fullList[j].push(foundValues[j]);
					chartString = 'chartDiv'+ j;
					createChart(chartString, fullList[j], titles[j])
				}
			}
			if (fullList.length > 1000){
				fullList.shift();
			}
			writetofile(fullList);


	       	// $('.greeting-content').append(tablestring);


	  //      	waveheight = table[6].innerText.match(regex).map(function(v) { return parseFloat(v); })[0];
			// waveheightlist.push(waveheight);
			// if (waveheightlist.length > 100 ){
			// 	waveheightlist.splice(0,1);
			// }
			// createChart(waveheightlist);
			// writetofile(waveheightlist);
	    });
	});
}


function get_json_data(){
	let req = new XMLHttpRequest();

	req.onreadystatechange = () => {
	  if (req.readyState == XMLHttpRequest.DONE) {
	    console.log(req.responseText);
	    fullList = JSON.parse(req.responseText);
	    return req.responseText;
	  }
	};

	req.open("GET", "https://api.jsonbin.io/b/5c099ef01deea01014bea7df", true);
	req.setRequestHeader("secret-key", "$2a$10$j4tbSmRiOZs7Tx5qwRw1ounMt8CIA1vfwnS146CFpe0RFzrCU9ENq");
	req.send();
}



setInterval(readFile, 60000)
setTimeout(setInterval(callPort, 60000), 3000)




var createChart = function(div, data, title){

var times = []
for (var i in data){
	times.push(i - data.length + 1);
}

var trace1 = {
  type: "scatter",
  name: 'Electrode 1',
  mode: "lines",
  x: times,
  y: data,
  line: {color: '#'+(Math.random()*0xFFFFFF<<0).toString(16)}
}


var data = [trace1];
    
var layout = {
  title: title, 
  xaxis: {
    type: 'minutes',
    title: 'minutes ago'
  }, 
  yaxis: {
    autorange: true, 
    type: 'linear'
  },
};

Plotly.newPlot(div, data, layout);

}

var writetofile =  function(data){
	console.log('in writetofile')

	var jsondata = JSON.stringify(data)
	console.log(jsondata)

	req = new XMLHttpRequest();

	req.onreadystatechange = () => {
	  if (req.readyState == XMLHttpRequest.DONE) {
	    console.log(req.responseText);
	  }
	};

	req.open("PUT", "https://api.jsonbin.io/b/5c099ef01deea01014bea7df", true);
	req.setRequestHeader("Content-type", "application/json");
	req.setRequestHeader("secret-key", "$2a$10$j4tbSmRiOZs7Tx5qwRw1ounMt8CIA1vfwnS146CFpe0RFzrCU9ENq");
	req.setRequestHeader("versioning", false);

	req.send(jsondata);

		// fs.writeFile('surfheights.json', json, 'utf8', callback);
	}

initialise();
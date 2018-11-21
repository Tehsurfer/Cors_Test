var surfsite;
var regex = /[+-]?\d+(\.\d+)?/g;
var waveheightlist = [];
var fullList = undefined;
var titles = [];
var firstUpdate = true;

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

function update(){
	var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
	var target_url = "http://witswap.napierport.co.nz/witswap/(S(32tc1h2yg0hzxcbdg1qxgomg))/MobileWebForm1.aspx"

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
	       		fullList = []
				for (var j in foundValues){
					fullList.push([foundValues[j]])
					chartString = 'chartDiv'+ j;
					createChart(chartString, fullList[j], titles[j])
				}
			}else{
				for (var j in foundValues){
					fullList[j].push(foundValues[j]);
					chartString = 'chartDiv'+ j;
					createChart(chartString, fullList[j], titles[j])
				}
			}

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

setInterval(update, 60000)


var createChart = function(div, data, title){

var times = []
for (var i in data){
	times.push(i);
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
    title: 'minutes'
  }, 
  yaxis: {
    autorange: true, 
    type: 'linear'
  },
};

Plotly.newPlot(div, data, layout);

}

var writetofile =  function(data){

	// var jsondata = JSON.stringify(obj)

	// fs.writeFile('surfheights.json', json, 'utf8', callback);
}

initialise();
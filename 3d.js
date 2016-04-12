// Create and populate a data table.
var data_mountain = new vis.DataSet();
var data_wave = new vis.DataSet();
// create some nice looking data with sin/cos
var counter = 0;
var steps = 50;  // number of datapoints will be steps*steps
var axisMin = -5;
var axisMax = 5;
var axisStep = (axisMax - axisMin) / steps;
for (var x = axisMin; x < axisMax; x+=axisStep) {
	for (var y = axisMin; y < axisMax; y+=axisStep) {
		var value = Math.exp(-(Math.pow(x,2)+Math.pow(y,2))/2) * 3;
		data_mountain.add({id:counter++,x:x,y:y,z:value,style:value,group:0});
	}
}

for (var x = axisMin; x < axisMax; x+=axisStep) {
	for (var y = axisMin; y < axisMax; y+=axisStep) {
		var value = (Math.sin(x) * Math.cos(y) * 1)+1;
		data_wave.add({id:counter++,x:x,y:y,z:value,style:value,group:0});
	}
}

// specify options
var options = {
	width:  '500px',
	height: '500px',
	style: 'surface',
	showPerspective: true,
	showGrid: true,
	showShadow: false,
	keepAspectRatio: true,
	verticalRatio: 0.5
};

// Instantiate our graph object.
var container_mountain = document.getElementById('visualization_mountain');
var graph3d_mountain = new vis.Graph3d(container_mountain, data_mountain, options);

var container_wave = document.getElementById('visualization_wave');
var graph3d_wave = new vis.Graph3d(container_wave, data_wave, options);

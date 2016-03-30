// Create and populate a data table.
var data = new vis.DataSet();
// create some nice looking data with sin/cos
var counter = 0;
var steps = 50;  // number of datapoints will be steps*steps
var axisMin = -5;
var axisMax = 5;
var axisStep = (axisMax - axisMin) / steps;
for (var x = axisMin; x < axisMax; x+=axisStep) {
	for (var y = axisMin; y < axisMax; y+=axisStep) {
		var value = (Math.sin(x) * Math.cos(y) * 1);
		//value += (Math.random()-0.5)/2;
		data.add({id:counter++,x:x,y:y,z:value,style:value,group:0});
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
var container = document.getElementById('visualization');
var graph3d = new vis.Graph3d(container, data, options);

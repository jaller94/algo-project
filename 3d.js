// Create and populate a data table.
const data_mountain = new vis.DataSet();
const data_wave = new vis.DataSet();
// create some nice looking data with sin/cos
let counter = 0;
const steps = 50;  // number of datapoints will be steps*steps
const axisMin = -5;
const axisMax = 5;
const axisStep = (axisMax - axisMin) / steps;
for (let x = axisMin; x < axisMax; x+=axisStep) {
	for (let y = axisMin; y < axisMax; y+=axisStep) {
		const value = Math.exp(-(Math.pow(x,2)+Math.pow(y,2))/2) * 3;
		data_mountain.add({id:counter++,x:x,y:y,z:value,style:value,group:0});
	}
}

for (let x = axisMin; x < axisMax; x+=axisStep) {
	for (let y = axisMin; y < axisMax; y+=axisStep) {
		const value = (Math.sin(x) * Math.cos(y) * 1)+1;
		data_wave.add({id:counter++,x:x,y:y,z:value,style:value,group:0});
	}
}

// specify options
const options = {
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
const container_mountain = document.getElementById('visualization_mountain');
const graph3d_mountain = new vis.Graph3d(container_mountain, data_mountain, options);

const container_wave = document.getElementById('visualization_wave');
const graph3d_wave = new vis.Graph3d(container_wave, data_wave, options);

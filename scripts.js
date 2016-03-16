"use strict";

function drawOnCanvas() {
	firedisplay.clear();
	firedisplay.grid();
	firedisplay.drawFireflies( fireflies );
}

function nextStep() {
	firesimulation.act();
	
	//document.getElementById("mytext1").value = JSON.stringify(fireflies);
}

var func = function(x, y) {
	return (Math.sin(x) * Math.cos(y) * 1);
}

var c = document.getElementById( "canvas1" );
var firesimulation = new FireSimulation( func, c, 10 );

firesimulation.draw( );


var c = document.getElementById( "canvas2" );
var firesimulation2 = new FireSimulation( func, c, 10 );

firesimulation2.draw( );


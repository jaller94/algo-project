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

var fireflies = generateFireflies(10, -2.5, -2.5, 2.5, 2.5);

var c = document.getElementById( "canvas1" );
var firesimulation = new FireSimulation( func, c, 10 );

firesimulation.draw( );

var fireflies2 = generateFireflies(10, -2.5, -2.5, 2.5, 2.5);
var c2 = document.getElementById("canvas2" );
var firedisplay2 = new FireDisplay( c2 );

firedisplay2.drawGrid( );
firedisplay2.drawFireflies( fireflies );


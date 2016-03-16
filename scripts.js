"use strict";

function drawOnCanvas() {
	firedisplay.clear();
	firedisplay.grid();
	firedisplay.drawFireflies( fireflies );
}

function nextStep() {
	//console.log("nextStep");
	
	levy2D( func, fireflies );
	drawOnCanvas();
	
	document.getElementById("mytext").value = JSON.stringify(fireflies);
}

var func = function(x, y) {
	return (Math.sin(x) * Math.cos(y) * 1);
}

var fireflies = generateFireflies(10, -2.5, -2.5, 2.5, 2.5);

var c = document.getElementById( "canvas1" );
var firedisplay = new FireDisplay( c );

firedisplay.grid( );
firedisplay.drawFireflies( fireflies );

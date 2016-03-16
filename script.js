"use strict";

//document.getElementById("mytext0").value = JSON.stringify(fireflies);

var func = function(x, y) {
	return (Math.sin(x) * Math.cos(y) * 1);
}

var c = document.getElementById( "canvas0" );
var firesimulation0 = new FireSimulation( func, c, 10 );

firesimulation0.draw( );


var c = document.getElementById( "canvas1" );
var firesimulation1 = new FireSimulation( func, c, 10 );

firesimulation1.draw( );

FireSimulation.insertIntoHTML( $("#simulations") );


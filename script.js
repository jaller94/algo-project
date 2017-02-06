"use strict";

//document.getElementById("mytext0").value = JSON.stringify(fireflies);

const func = function(x, y) {
	// graussian function
	return Math.exp(-(Math.pow(x,2)+Math.pow(y,2))/2) * 3;
	
	//return Math.exp(-(Math.pow(x^2+y^2)/2);

	//return (Math.sin(x) * Math.cos(y) * 1);
}

FireSimulation.insertIntoHTML( $("#simulations") );
//FireSimulation.insertIntoHTML( $("#simulations") );
//FireSimulation.insertIntoHTML( $("#simulations") );


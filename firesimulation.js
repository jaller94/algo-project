"use strict";

class FireSimulation {
	constructor( func, canvas, amount ) {
		this.func = func;
		this.canvas = canvas;
		this.display = new FireDisplay( this.canvas );
		
		this.fireflies = generateFireflies(10, -2.5, -2.5, 2.5, 2.5);
	}

	act( ) {
		levy2D( this.func, this.fireflies );
		this.draw();
	}
	
	draw( ) {
		this.display.clear( );
		this.display.drawGrid( );
		this.display.drawFireflies( this.fireflies );
	}
}

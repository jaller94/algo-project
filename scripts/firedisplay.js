"use strict";

class FireDisplay {
	constructor( canvas ) {
		this.c = canvas;
		this.ctx = canvas.getContext("2d");
	}
	
	clear( ) {
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
	}

	drawFirefly( x, y ) {
		//console.log("drawFirefly");
		var screen_x = (x+2.5) * 100;
		var screen_y = (y+2.5) * 100;
		
		this.ctx.fillStyle = "rgba(255,0,0,1)";
		this.ctx.fillRect( screen_x-1, screen_y-1, 3, 3 );
	}

	drawFireflies( fireflies ) {
		//console.log("drawFireflies");
		var self = this;
		
		fireflies.forEach( function(fly) { 
			self.drawFirefly(fly["x"], fly["y"]);
		} );
	}

	drawGrid( ) {
		var x_grid = 10;
		var x_size = this.c.width / x_grid;
		this.ctx.beginPath();
		for (var i = 0; i <= x_grid; i++) {
			// vertical lines
			this.ctx.moveTo(i * x_size, 0);
			this.ctx.lineTo(i * x_size, x_size * x_grid);
			// horizontal lines
			this.ctx.moveTo(  0, i * x_size);
			this.ctx.lineTo(x_size * x_grid, i * x_size);
		}
		this.ctx.stroke();
	}
}

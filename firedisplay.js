class FireDisplay {
	constructor( canvas ) {
		this.c = canvas;
		this.ctx = canvas.getContext("2d");
	}
	
	clear( ) {
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
	}

	drawFirefly( x, y ) {
		console.log("drawFirefly");
		var screen_x = (x+2.5) * 100;
		var screen_y = (y+2.5) * 100;
		
		this.ctx.fillStyle = "rgba(255,0,0,1)";
		this.ctx.fillRect( screen_x-1, screen_y-1, 3, 3 );
	}

	drawFireflies( fireflies ) {
		console.log("drawFireflies");
		var self = this;
		
		fireflies.forEach( function(fly) { 
			self.drawFirefly(fly["x"], fly["y"]);
		} );
	}

	grid( ) {
		for (var i = 0; i <= 5; i++) {
			// vertical lines
			this.ctx.moveTo(i * 100,   0);
			this.ctx.lineTo(i * 100, 500);
			this.ctx.stroke();
			// horizontal lines
			this.ctx.moveTo(  0, i * 100);
			this.ctx.lineTo(500, i * 100);
			this.ctx.stroke();
		}
	}
}

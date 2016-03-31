"use strict";

class FireDisplay {
	constructor( canvas ) {
		this.c = canvas;
		this.ctx = canvas.getContext("2d");
		this.x1 = -5;
		this.y1 = -5;
		this.x2 = 5;
		this.y2 = 5;
	}
	
	clear( ) {
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
	}

	drawFirefly( x, y ) {
		//console.log("drawFirefly");
		var screen_x = this.XtoCanvasX( x );
		var screen_y = this.YtoCanvasY( y );
		
		this.ctx.fillStyle = "rgba(255,0,255,1)";
		this.ctx.fillRect( screen_x-1, screen_y-1, 3, 3 );
	}

	drawFireflies( fireflies ) {
		//console.log("drawFireflies");
		var self = this;
		
		fireflies.flies.forEach( function(fly) { 
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

	drawImage( image ) {
		this.ctx.putImageData(image, 0, 0);
	}
	
	generateHeightMap( func, minval, maxval ) {
		var imageData = this.ctx.getImageData(0,0,this.c.width, this.c.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			var x = (i/4) % this.c.width;
			var y = Math.floor((i/4) / this.c.width);
			x = this.CanvasYtoY(x);
			y = this.CanvasYtoY(y);

			var avg = (func(x,y) + minval) / (maxval - minval);

			//console.log(x,y,func(x,y),avg);

			var color = this.toRGBGradient(avg);

			data[i]	    = color[0]; // red
			data[i + 1] = color[1]; // green
			data[i + 2] = color[2]; // blue
			data[i + 3] = 255; // alpha
		}
		this.ctx.putImageData(imageData, 0, 0);
		return imageData;
	}

	setViewport( x1, y1, x2, y2 ) {
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
	}

	toBWGradient(a) {
		var a = a * 145 + 110;
		return [a, a, a];
	}

	toRGBGradient(a) {
		if (a < 0.25) {
			//blue to cyan
			var g = (a*4*255);
			return [0, g, 255];
			
		} else if (a < 0.5) {
			//cyan to green
			a = a - 0.25;
			var b = 255-(a*4*255);
			return [0, 255, b];

		} else if (a < 0.75) {		
			//green to yellow
			a = a - 0.5;
			var r = (a*4*255);
			return [r, 255, 0];

		} else {		
			//yellow to red
			a = a - 0.75;
			var g = 255-(a*4*255);
			return [255, g, 0];
		}
	}

	XtoCanvasX( x ) {
		var all = this.x2 - this.x1;
		return ((x - this.x1) / all) * this.c.width;
	}

	YtoCanvasY( y ) {
		var all = this.y2 - this.y1;
		return ((y - this.y1) / all) * this.c.height;
	}

	CanvasXtoX( x ) {
		var all = this.x2 - this.x1;
		return (x/this.c.width) * all + this.x1;
	}

	CanvasYtoY( y ) {
		var all = this.y2 - this.y1;
		return (y/this.c.height) * all + this.y1;
	}
}

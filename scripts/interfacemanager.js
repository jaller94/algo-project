'use strict';

var func = function(x, y) {
	// graussian function
	return Math.exp(-(Math.pow(x,2)+Math.pow(y,2))/2) * 3;
	
	//return Math.exp(-(Math.pow(x^2+y^2)/2);

	//return (Math.sin(x) * Math.cos(y) * 1);
}

class InterfaceManager {
	constructor( ) {
		this.func = func;
		this.canvas = $('#canvas0')[0];
		console.log( this.canvas );
		this.display = new FireDisplay( this.canvas );
		this.layerheightmap = false;
		
		this.xoffset = 0;
		this.yoffset = 0;
		this.zoom = 5;
		var that = this;
		this.canvas.onmousewheel = function (event) {
			console.log('canvas mousewheel');
			if (event.wheelDelta > 1) {
				that.setZoom( this.zoom+1 );
			} else {
				that.setZoom( this.zoom-1 );
			}
		}
		
		this.reset();
	}

	reset( ) {
		this.fireflies = new Fireflies(this.getAmount(), -2.5, -2.5, 2.5, 2.5);
		this.fireflies.setRandomness(this.getRandomness());
		this.display.setViewport(-2.5, -2.5, 2.5, 2.5);
		//this.fireflies = new Fireflies(30, -5, -5, 5, 5);
		//this.fireflies.setRandomness(0.05);
		//this.display.setViewport(-6, -6, 6, 6);
		this.y = 2;
		this.heightmap_color = this.display.generateHeightMap( this.func, 0, 3, FireDisplay.toRGBGradient );
		this.heightmap_bw = this.display.generateHeightMap( this.func, 0, 3, FireDisplay.toBWGradient );
		this.draw();
	}

	act( ) {
		this.fireflies = this.fireflies.levy2D( this.func, this.y );
		this.draw();
		this.printBest();
	}

	alertBest( ) {
		var best = this.fireflies.getBest( this.func );
		var x = best.x.toFixed(3);
		var y = best.y.toFixed(3);
		var value = best['value'].toFixed(3);
		alert( 'x: '+x+'; y: '+y+'; f(): '+value );
	}

	draw( ) {
		this.display.clear( );
		if (this.layerheightmap) {
			this.display.drawImage( this.heightmap );
		}
		this.display.drawGrid( );
		this.display.drawFireflies( this.fireflies );
	}

	getAmount( ) {
		if (this.input_amount) {
			return this.input_amount.value;
		}
		return 40;
	}

	getAbsorb( ) {
		if (this.input_absorb) {
			return this.input_absorb.value;
		}
		return 0;
	}
	
	getRandomness( ) {
		if (this.input_randomness) {
			return this.input_randomness.value;
		}
		return 0.01;
	}

	printBest( ) {
		var best = this.fireflies.getBest( this.func );
		console.log( best );
	}

	setBackground( ) {
		console.log('setBackground');
		if (this.select_background) {
			this.layerheightmap = this.select_background.value;
		} else {
			this.layerheightmap = 'none';
		}
		this.draw();
	}
	
	setOffset( x, y ) {
		this.xoffset = x;
		this.yoffset = y;
	}
	
	setZoom( zoom ) {
		this.zoom = zoom;
		var x1 = -(this.zoom / 2) + this.xoffset;
		var y1 = -(this.zoom / 2) + this.yoffset;
		var x2 =  (this.zoom / 2) + this.xoffset;
		var y2 =  (this.zoom / 2) + this.yoffset;
		console.log('draw with ' + this.zoom);
		this.display.setViewport(x1, y1, x2, y2);
		this.draw();
	}
}

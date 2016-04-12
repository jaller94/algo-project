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

		this.initializeHandlers();
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
		this.fireflies.setAbsorbtion( this.getGamma() );
		this.fireflies = this.fireflies.act( this.func );
		this.draw();
		this.printBest();
	}

	alertBest( ) {
		console.log( this.fireflies.getSortet( this.func ) );
		//var best = this.fireflies.getBest( this.func );
		//var x = best.x.toFixed(3);
		//var y = best.y.toFixed(3);
		//var value = best['value'].toFixed(3);
		//alert( 'x: '+x+'; y: '+y+'; f(): '+value );
	}

	draw( ) {
		this.display.clear( );
		switch (this.layerheightmap) {
			case 'color':
				this.display.drawImage( this.heightmap_color );
				break;
			case 'bw':
				this.display.drawImage( this.heightmap_bw );
				break;
		}
		this.display.drawGrid( );
		this.display.drawFireflies( this.fireflies );
	}

	getAmount( ) {
		var input = this.input_amount;
		if (input && !isNaN(input.value) && input.value != '') {
			return this.input_amount.value;
		}
		return this.getDefaultAmount();
	}
	
	getDefaultAmount() {
		return 40;
	}

	getGamma( ) {
		var input = this.input_gamma;
		if (input && !isNaN(input.value) && input.value != '') {
			return this.input_gamma.value;
		}
		return this.getDefaultGamma();
	}
	
	getDefaultGamma( ) {
		return 1.0;
	}
	
	getRandomness( ) {
		var input = this.input_randomness;
		if (input && !isNaN(input.value) && input.value != '') {
			return this.input_randomness.value;
		}
		return this.getDefaultRandomness();
	}
	
	getDefaultRandomness( ) {
		return 0.2;
	}

	printBest( ) {
		var best = this.fireflies.getBest( this.func );
		console.log( best );
	}

	updateBackground( ) {
		console.log('updateBackground');
		if (this.select_background) {
			this.layerheightmap = this.select_background.value;
		} else {
			this.layerheightmap = 'none';
		}
		this.draw();
	}

	initializeHandlers() {
		this.input_amount = $('#param_amount')[0];
		this.button_initialize = $('#button_initialize')[0];
		
		this.input_gamma = $('#param_gamma')[0];
		this.input_randomness = $('#param_randomness')[0];

		this.select_background = $('#param_background')[0];
		this.select_background.addEventListener('change', this.updateBackground.bind(this));

		this.button_reset = $('#control_reset')[0];
		this.button_next = $('#control_next')[0];
		this.button_best = $('#control_best')[0];

		this.button_initialize.addEventListener('click', this.reset.bind(this));
		this.button_reset.addEventListener('click', this.reset.bind(this));
		this.button_next.addEventListener('click', this.act.bind(this));
		this.button_best.addEventListener('click', this.alertBest.bind(this));
	}
}

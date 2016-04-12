'use strict';

var func1 = {
	'viewport': [-2.5, -2.5, 2.5, 2.5],
	'min': 0,
	'max': 1,
	'function': function(x, y) {
		// graussian function
		return Math.exp(-(Math.pow(x,2)+Math.pow(y,2))/2);
	}
}

var func2 = {
	'viewport': [-5, -5, 5, 5],
	'min': 0,
	'max': 2,
	'function': function(x, y) {
		return (Math.sin(x) * Math.cos(y) * 1)+1;
	}
}

class InterfaceManager {
	constructor( ) {
		this.canvas = $('#canvas0')[0];
		console.log( this.canvas );
		this.display = new FireDisplay( this.canvas );
		this.layerheightmap = false;

		this.initializeHandlers();
		this.loadExample1();
	}

	reset( ) {
		var f = this.func;
		var viewport = f['viewport'];
		var x1 = viewport[0];
		var y1 = viewport[1];
		var x2 = viewport[2];
		var y2 = viewport[3];

		this.fireflies = new Fireflies(this.getAmount(), x1, y1, x2, y2);
		this.fireflies.setRandomness(this.getRandomness());
		this.display.setViewport(x1, y1, x2, y2);

		// generate colorful heightmap
		this.heightmap_color = this.display.generateHeightMap(
			f['function'], f['min'], f['max'], FireDisplay.toRGBGradient
		);
		// generate grayscale heightmap
		this.heightmap_bw = this.display.generateHeightMap(
			f['function'], f['min'], f['max'], FireDisplay.toGrayGradient
		);
		this.draw();
	}

	loadExample1() {
		this.func = func1;
		this.reset();
	}
	
	loadExample2() {
		this.func = func2;
		this.reset();
	}

	act( ) {
		this.fireflies.setAbsorbtion( this.getGamma() );
		this.fireflies = this.fireflies.act( this.func['function'] );
		this.draw();
		//this.printBest();
	}

	alertBest( ) {
		var best = this.fireflies.getBest( this.func['function'] );
		var x = best.x.toFixed(3);
		var y = best.y.toFixed(3);
		var value = best['value'].toFixed(3);
		alert( 'x: '+x+'; y: '+y+'; f(): '+value );
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
		var best = this.fireflies.getBest( this.func['function'] );
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
		// Initialisation
		this.input_amount = $('#param_amount')[0];

		// Load Example Functions
		this.button_example1 = $('#button_example1')[0];
		this.button_example2 = $('#button_example2')[0];

		this.button_example1.addEventListener('click', this.loadExample1.bind(this));
		this.button_example2.addEventListener('click', this.loadExample2.bind(this));

		// Run Time Parameter
		this.input_gamma = $('#param_gamma')[0];
		this.input_randomness = $('#param_randomness')[0];

		// Layers
		this.select_background = $('#param_background')[0];
		this.select_background.addEventListener('change', this.updateBackground.bind(this));

		// Playback Control
		this.button_reset = $('#control_reset')[0];
		this.button_next = $('#control_next')[0];
		this.button_best = $('#control_best')[0];

		this.button_reset.addEventListener('click', this.reset.bind(this));
		this.button_next.addEventListener('click', this.act.bind(this));
		this.button_best.addEventListener('click', this.alertBest.bind(this));
	}
}

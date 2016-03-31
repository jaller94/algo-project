'use strict';

function createButton( label, root ) {
	var btn = $('<button type="button">' + label + '</button>')
		.addClass('btn btn-default')
		.appendTo( $(root) );
	return btn[0];
}

class FireSimulation {
	constructor( func, canvas, amount ) {
		this.func = func;
		this.canvas = canvas;
		console.log(canvas);
		this.display = new FireDisplay( this.canvas );
		this.layerheightmap = false;
		
		this.reset();
	}

	reset( ) {
		this.fireflies = new Fireflies(30, -2.5, -2.5, 2.5, 2.5);
		this.fireflies.setRandomness(0.01);
		this.display.setViewport(-2.5, -2.5, 2.5, 2.5);
		//this.fireflies = new Fireflies(30, -5, -5, 5, 5);
		//this.fireflies.setRandomness(0.05);
		//this.display.setViewport(-6, -6, 6, 6);
		this.y = 2;
		this.heightmap = this.display.generateHeightMap( this.func, 0, 3 );
		this.draw();
	}

	act( ) {
		this.fireflies = this.fireflies.levy2D( this.func, this.y );
		this.draw();
		this.printBest();
	}

	draw( ) {
		this.display.clear( );
		if (this.layerheightmap) {
			this.display.drawImage( this.heightmap );
		}
		this.display.drawGrid( );
		this.display.drawFireflies( this.fireflies );
	}

	printBest( ) {
		var best = this.fireflies.getBest( this.func );
		console.log( best );
	}

	toogleHeightmap( ) {
		console.log('toogleHeightmap');
		if (this.checkbox_heightmap) {
			this.layerheightmap = this.checkbox_heightmap.checked;
		} else {
			this.layerheightmap = !this.layerheightmap;
		}
		this.draw();
	}

	setScaling( ) {
		
	}

	static insertIntoHTML( root ) {
		/// Create main wrappers
		var wrapper = document.createElement('div');
		$(wrapper).addClass('col-xs-12 col-sm-6 col-sm-6');
		var wrapper2 = document.createElement('div');
		$(wrapper2).addClass('col-xs-12 col-sm-6 col-sm-6');
		var wrapper_canvas = document.createElement('div');

		/// Create section wrappers
		$(wrapper_canvas).addClass('canvas-wrapper')
			.appendTo( $(wrapper) );
		var wrapper_buttons = document.createElement('div');
		$(wrapper_buttons).addClass('btn-group form-group')
			.appendTo( $(wrapper) );
		var wrapper_layers = $('<div><h3>Layers</h3></div>')
		$(wrapper_layers).addClass('form-group')
			.appendTo( $(wrapper2) );
		var wrapper_params = $('<div><h3>Parameter</h3></div>');
		$(wrapper_params).addClass('form-group')
			.appendTo( $(wrapper2) );

		/// Create Canvas
		var canvas_id = 'canvas' + $('canvas').length;
		var canvas = $('<canvas></canvas>', {
			id: canvas_id,
			//class: 'embed-responsive-item'
		}).attr({
			width: '500',
			height: '500'
		});
		canvas.innerHTML = 'Sorry, your browser doesn\'t support the &lt;canvas&gt; element.';

		canvas.appendTo( $(wrapper_canvas) );

		/// Create playback buttons
		var button_reset = createButton('Reset', $(wrapper_buttons) );

		var button_next = createButton('Next', $(wrapper_buttons) );
		
		var button_best = createButton('Print Best', $(wrapper_buttons) );

		/// Layer Buttons
		// Heightmap Layer
		var label_heightmap = $('<label></label>')
			.addClass('checkbox-inline')
			.appendTo( $(wrapper_layers) );

		var checkbox_heightmap = $('<input type="checkbox" value="">')
			.appendTo( $(label_heightmap) );

		$(label_heightmap).append('Heightmap');

		/// Insert into document
		$(wrapper).appendTo( $(root) );
		$(wrapper2).appendTo( $(root) );

		/// Create a Firefly Simulation
		var sim = new FireSimulation( func, canvas[0], 10 );
		canvas.simulation = sim;

		/// Buttons for Playback
		button_reset.addEventListener('click', sim.reset.bind(sim));
		button_next.addEventListener('click', sim.act.bind(sim));
		button_best.addEventListener('click', sim.printBest.bind(sim));

		/// Checkboxes for layers
		sim.checkbox_heightmap = checkbox_heightmap[0];
		sim.checkbox_heightmap.addEventListener('change', sim.toogleHeightmap.bind(sim));
	}
}

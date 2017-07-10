'use strict';

import $ from 'jquery';
import FireDisplay from './FireDisplay.js';
import Fireflies from './Fireflies.js';

function createButton( label, root ) {
	const btn = $('<button type="button">' + label + '</button>')
		.addClass('btn btn-default')
		.appendTo( $(root) );
	return btn[0];
}

export default class FireSimulation {
	constructor( func, canvas, amount ) {
		this.func = func;
		this.canvas = canvas;
		console.log(canvas);
		this.display = new FireDisplay( this.canvas );
		this.layerheightmap = false;

		this.xoffset = 0;
		this.yoffset = 0;
		this.zoom = 5;

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
		this.heightmap = this.display.generateHeightMap( this.func, 0, 3 );
		this.draw();
	}

	act( ) {
		this.fireflies.setAbsorbtion( this.gamma );
		this.fireflies = this.fireflies.act( this.func );
		this.draw();
		this.printBest();
	}

	alertBest( ) {
		const best = this.fireflies.getBest( this.func );
		const x = best.x.toFixed(3);
		const y = best.y.toFixed(3);
		const value = best['value'].toFixed(3);
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
		return 1.0;
	}

	getRandomness( ) {
		if (this.input_randomness) {
			return this.input_randomness.value;
		}
		return 0.2;
	}

	printBest( ) {
		const best = this.fireflies.getBest( this.func );
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

	setOffset( x, y ) {
		this.xoffset = x;
		this.yoffset = y;
	}

	setZoom( zoom ) {
		this.zoom = zoom;
		const x1 = -(this.zoom / 2) + this.xoffset;
		const y1 = -(this.zoom / 2) + this.yoffset;
		const x2 =  (this.zoom / 2) + this.xoffset;
		const y2 =  (this.zoom / 2) + this.yoffset;
		console.log('draw with ' + this.zoom);
		this.display.setViewport(x1, y1, x2, y2);
		this.draw();
	}

	static insertIntoHTML( root, func ) {
		/// Create main wrappers
		const wrapper = document.createElement('div');
		$(wrapper).addClass('col-xs-12 col-sm-6 col-sm-6');
		const wrapper2 = document.createElement('div');
		$(wrapper2).addClass('col-xs-6 col-sm-3 col-sm-3');
		const wrapper_canvas = document.createElement('div');

		/// Create section wrappers
		$(wrapper_canvas).addClass('canvas-wrapper')
			.appendTo( $(wrapper) );
		const wrapper_buttons = document.createElement('div');
		$(wrapper_buttons).addClass('btn-group form-group')
			.appendTo( $(wrapper) );
		const wrapper_layers = $('<div><h3>Layers</h3></div>')
		$(wrapper_layers).addClass('form-group')
			.appendTo( $(wrapper2) );
		const wrapper_params = $('<div><h3>Initialisation</h3></div>');
		$(wrapper_params).addClass('form-group')
			.appendTo( $(wrapper2) );

		const wrapper_amount = $('<div></div>');
		$(wrapper_amount).addClass('form-group')
			.appendTo( $(wrapper2) );
		$('<label for="amount"># of fireflies:</label>').appendTo( $(wrapper_amount) );
		$('<input type="text" class="form-control" id="amount">').appendTo( $(wrapper_amount) );
		const wrapper_absorb = $('<div></div>');
		$(wrapper_absorb).addClass('form-group')
			.appendTo( $(wrapper2) );
		$('<label for="absorb">Absorption coefficient:</label>').appendTo( $(wrapper_absorb) );
		$('<input type="text" class="form-control" id="absorb">').appendTo( $(wrapper_absorb) );

		/// Create Canvas
		const canvas_id = 'canvas' + $('canvas').length;
		const canvas = $('<canvas></canvas>', {
			id: canvas_id,
			//class: 'embed-responsive-item'
		}).attr({
			width: '500',
			height: '500'
		});
		canvas.innerHTML = 'Sorry, your browser doesn\'t support the &lt;canvas&gt; element.';

		canvas.appendTo( $(wrapper_canvas) );

		/// Create playback buttons
		const button_reset = createButton('Reset', $(wrapper_buttons) );

		const button_next = createButton('Next', $(wrapper_buttons) );

		const button_best = createButton('Alert Best', $(wrapper_buttons) );

		/// Layer Buttons
		// Heightmap Layer
		const label_heightmap = $('<label></label>')
			.addClass('checkbox-inline')
			.appendTo( $(wrapper_layers) );

		const checkbox_heightmap = $('<input type="checkbox" value="">')
			.appendTo( $(label_heightmap) );

		$(label_heightmap).append('Heightmap');

		/// Insert into document
		$(wrapper).appendTo( $(root) );
		$(wrapper2).appendTo( $(root) );

		/// Create a Firefly Simulation
		const sim = new FireSimulation( func, canvas[0], 10 );
		canvas.simulation = sim;

		/// Buttons for Playback
		button_reset.addEventListener('click', sim.reset.bind(sim));
		button_next.addEventListener('click', sim.act.bind(sim));
		button_best.addEventListener('click', sim.alertBest.bind(sim));

		/// Checkboxes for layers
		sim.checkbox_heightmap = checkbox_heightmap[0];
		sim.checkbox_heightmap.addEventListener('change', sim.toogleHeightmap.bind(sim));
	}
}

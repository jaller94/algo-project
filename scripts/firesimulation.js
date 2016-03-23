"use strict";

class FireSimulation {
	constructor( func, canvas, amount ) {
		this.func = func;
		this.canvas = canvas;
		console.log(canvas);
		this.display = new FireDisplay( this.canvas );
		this.heightmap = this.display.generateHeightMap( this.func, 0, 2 );
		
		this.reset();
	}

	reset( ) {
		this.fireflies = generateFireflies(10, -2.5, -2.5, 2.5, 2.5);
		this.draw();
	}

	act( ) {
		this.fireflies = levy2D( this.func, this.fireflies );
		this.draw();
	}
	
	draw( ) {
		this.display.clear( );
		this.display.drawImage( this.heightmap );
		this.display.drawGrid( );
		this.display.drawFireflies( this.fireflies );
	}
	
	static insertIntoHTML( root ) {
		

		var wrapper = document.createElement('div');
		$(wrapper).addClass('col-xs-12 col-sm-6 col-sm-4');
		var wrapper_canvas = document.createElement('div');
		$(wrapper_canvas).addClass('embed-responsive embed-responsive-4by3')
			.appendTo( $(wrapper) );
		var wrapper_button = document.createElement('div');
		$(wrapper_button).addClass('btn-group form-group')
			.appendTo( $(wrapper) );

		var canvas_id = 'canvas' + $('canvas').length;
		var canvas = $('<canvas></canvas>', {
			id: canvas_id,
			//class: 'embed-responsive-item'
		}).attr({
			width: '500',
			height: '500'
		});

		canvas.appendTo( $(wrapper_canvas) );

		var button_reset = $('<button type="button">Reset</button>')
			.addClass('btn btn-default')
			.appendTo( $(wrapper_button) );

		var button_next = $('<button type="button">Next</button>')
			.addClass('btn btn-default')
			.appendTo( $(wrapper_button) );
		
		$(wrapper).appendTo( $(root) );

		var sim = new FireSimulation( func, canvas[0], 10 );
		canvas.simulation = sim;

		button_reset[0].addEventListener("click", sim.reset.bind(sim));
		button_next[0].addEventListener("click", sim.act.bind(sim));
	}
}

'use strict';

function distanceApprox(p1,p2){
	// Approximation by using octagons approach
	const x = p2.x-p1.x;
	const y = p2.y-p1.y;
	return 1.426776695*Math.min(0.7071067812*(Math.abs(x)+Math.abs(y)), Math.max (Math.abs(x), Math.abs(y)));	
}

class Fireflies {
	constructor( amount, x1, y1, x2, y2 ) {
		this.alpha = 0.2;  // Randomness 0--1 (highly random)
		this.gamma = 1.0;  // Absorption coefficient
		this.delta = 0.97; // Randomness reduction
		                   // (similar to an annealing schedule)

		// set defaults
		this.iteration = 0;  // # of iterations

		// create flies
		this.flies = [];
		for (let i = 0; i < amount; i++) {
			const x = (Math.random() * (x2-x1)) + x1;
			const y = (Math.random() * (y2-y1)) + y1;
			const fly = {"x": x, "y": y};
			this.flies.push( fly );
			console.log("pushed Fly");
		}
	}

	copyFireflies() {
		// create instance
		const copies = new Fireflies(0, 0, 0, 0, 0);
		
		// transfer variables
		copies.alpha = this.alpha;
		copies.gamma = this.gamma;
		copies.delta = this.delta;
		
		// transfer flies
		this.flies.forEach( function(fly) {
			const newfly = {"x": fly.x, "y": fly.y};
			copies.flies.push( newfly );
		});
		return copies;
	}

	setRandomness( randomness ) {
		this.alpha = randomness;
	}

	setAbsorbtion( absorbtion ) {
		this.gamma = absorbtion;
	}

	setRandomnessReduction( reduction ) {
		this.delta = reduction;
	}

	act( func ) {
		this.updateLightIntesity(func);

		const copies = this.copyFireflies();
		copies.iteration = copies.iteration + 1;

		//fireflies.forEach( function(fly) {
			//fireflies.forEach( function(other) {
				//if (fly != other) {
		for (let i1 = 0; i1 < this.flies.length; i1++) {
			const fly = this.flies[i1];
			const newstate = copies.flies[i1];
			for (let i2 = 0; i2 < this.flies.length; i2++) {
				const other = this.flies[i2];
				if (other.intensity > fly.intensity) {
					const r = distanceApprox(fly, other);
					const beta0 = 1; // source: Matlab code by Xin-She Yang
					const beta = beta0 * Math.exp(-this.gamma * r);

					//console.log( this.gamma );
					newstate.x = fly.x * (1 - beta) + other.x * beta + this.alpha * (Math.random() - 0.5);
					newstate.y = fly.y * (1 - beta) + other.y * beta + this.alpha * (Math.random() - 0.5);
				}
			}
		}

		return copies;
		/*
		Objective function f(x), x = (x1,..., xd )^T
		Generate initial population of fireflies x[i] (i = 1,2,...,n)
		Light intensity Ii at x[i] is determined by f(xi)
		Define light absorption coefficient γ
		while (t <MaxGeneration)
			for i = 1 : n all n fireflies
				for j = 1 : i all n fireflies
					if (Ij > Ii)
						Move firefly i towards j in d-dimension via Lévy flights
					end if
					Attractiveness varies with distance r via exp[−γr]
					Evaluate new solutions and update light intensity
				end for j
			end for i
			Rank the fireflies and find the current best
		end while
		Postprocess results and visualization
		*/
	}

	getBest( func ) {
		let x, y;
		let best = 0;

		this.updateLightIntesity( func );

		this.flies.forEach( function(fly) {
			if (fly.intensity > best) {
				x = fly.x;
				y = fly.y;
				best = fly.intensity;
			}
		});
		return {'x': x, 'y': y, 'value': best};
	}

	getSortet( func ) {
		this.updateLightIntesity( func );

		const sortable = [];
		this.flies.forEach( function(fly) {
			sortable.push([fly, fly.intensity]);
		});

		sortable.sort(function(a, b) {return b[1] - a[1]});

		const result = [];
		for (let i in sortable) {
			result.push( sortable[i][0] );
		}
		return result;
	}

	updateLightIntesity( func ) {
		this.flies.forEach( function(fly) {
			fly.intensity = func(fly.x, fly.y);
		});
	}
}

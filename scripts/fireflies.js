'use strict';

function distanceApprox(p1,p2){
	// Approximation by using octagons approach
	var x = p2.x-p1.x;
	var y = p2.y-p1.y;
	return 1.426776695*Math.min(0.7071067812*(Math.abs(x)+Math.abs(y)), Math.max (Math.abs(x), Math.abs(y)));	
}

class Fireflies {
	constructor(amount, x1, y1, x2, y2) {
		// set defaults
		this.randomness = 0; // max possible random delta each iteration
		this.iteration = 0;  // # of iterations

		// create flies
		this.flies = [];
		for (var i = 0; i < amount; i++) {
			var x = (Math.random() * (x2-x1)) + x1;
			var y = (Math.random() * (y2-y1)) + y1;
			var fly = {"x": x, "y": y};
			this.flies.push( fly );
			console.log("pushed Fly");
		}
	}

	copyFireflies() {
		// create instanze
		var copies = new Fireflies(0, 0, 0, 0, 0);
		
		// transfer variables
		copies.setRandomness( this.randomness );
		
		// transfer flies
		this.flies.forEach( function(fly) {
			// slice(0) creates a copy
			// this does not perform a "deep" copy on included references!
			copies.flies.push( {"x": fly.x, "y": fly.y} );
		});
		return copies;
	}

	setRandomness(randomness) {
		this.randomness = randomness;
	}

	levy2D(f) {
		this.flies.forEach( function(fly) {
			fly.intensity = f(fly.x, fly.y);
		});

		var copies = this.copyFireflies();
		copies.iteration = copies.iteration + 1;

		//fireflies.forEach( function(fly) {
			//fireflies.forEach( function(other) {
				//if (fly != other) {
		for (var i1 = 0; i1 < this.flies.length; i1++) {
			var fly = this.flies[i1];
			var newstate = copies.flies[i1];
			for (var i2 = 0; i2 < this.flies.length; i2++) {
				if (i1 != i2) {
					var other = this.flies[i2];
					var distance = distanceApprox(fly, other);
					var y = 2;
					//var itensity = fly.intensity / Math.pow(r,2);
					var visiblelight = fly.intensity * Math.exp(-y * distance);
					//console.log("visiblelight: " + visiblelight);

					//fly.x = fly.x + ((other.x - fly.x) * visiblelight);
					//fly.y = fly.y + ((other.y - fly.y) * visiblelight);
					newstate.x = fly.x + ((other.x - fly.x) * visiblelight);
					newstate.y = fly.y + ((other.y - fly.y) * visiblelight);

					var deltax = ((other.x - fly.x) * visiblelight);
					//console.log(i1 + " zog es zu " + i2 + " light:" + visiblelight*10000);
					//if (other["intensity"] > fly["intensity"]) {
						//fly["x"] = fly["x"] + ((other["x"] - fly["x"]) * 0.1);
						//fly["y"] = fly["y"] + ((other["y"] - fly["y"]) * 0.1);
					//}
				}
			}
			var randomx = (Math.random() * this.randomness*2) - this.randomness;
			var randomy = (Math.random() * this.randomness*2) - this.randomness;
			newstate.x = newstate.x + randomx;
			newstate.y = newstate.y + randomy;
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

	getBest(f) {
		var x,y
		var best = 0;
		this.flies.forEach( function(fly) {
			var intensity = f(fly.x, fly.y);
			if (intensity > best) {
				x = fly.x;
				y = fly.y;
				best = intensity;
			}
		});
		return {'x': x, 'y': y, 'best': best};
	}
}

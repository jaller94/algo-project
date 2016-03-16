function generateFireflies(amount, x1, y1, x2, y2) {
	var fireflies = [];
	for (i = 0; i < amount; i++) {
		x = (Math.random() * (x2-x1)) + x1;
		y = (Math.random() * (y2-y1)) + y1;
		var fly = {"x": x, "y": y};
		fireflies.push( fly );
		console.log("pushed Fly");
	}
	return fireflies;
}

function levy2D(f, fireflies) {
	fireflies.forEach( function(fly) {
		fly.intensity = f(fly.x, fly.y);
	});

	fireflies.forEach( function(fly) {
		fireflies.forEach( function(other) {
			if (fly != other) {
				var distance = distanceApprox(fly, other);
				var y = 2;
				var visiblelight = Math.exp(-y * distance);
				//console.log("visiblelight: " + visiblelight);

				fly.x = fly.x + ((other.x - fly.x) * visiblelight);
				fly.y = fly.y + ((other.y - fly.y) * visiblelight);
				//if (other["intensity"] > fly["intensity"]) {
					//fly["x"] = fly["x"] + ((other["x"] - fly["x"]) * 0.1);
					//fly["y"] = fly["y"] + ((other["y"] - fly["y"]) * 0.1);
				//}
			}
		});
		fly.x = fly.x + (Math.random() * 0.2) - 0.1;
		fly.y = fly.y + (Math.random() * 0.2) - 0.1;
	});
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

function distanceApprox(p1,p2){
	// Approximation by using octagons approach
	var x = p2.x-p1.x;
	var y = p2.y-p1.y;
	return 1.426776695*Math.min(0.7071067812*(Math.abs(x)+Math.abs(y)), Math.max (Math.abs(x), Math.abs(y)));	
}

function levy(f, fireflies) {
	fireflies.forEach( function(fly) { 
		if (fly.x > 250) {
			fly.x = fly.x - 20;
		} else {
			fly.x = fly.x + 20;
		}
	} );
}

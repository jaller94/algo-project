function generateFireflies(amount, x1, y1, x2, y2) {
	var fireflies = [];
	for (i = 0; i < amount; i++) {
		x = (Math.random() * 500);
		y = (Math.random() * 500);
		var fly = {"x": x, "y": y};
		fireflies.push( fly );
		console.log("pushed Fly");
	}
	return fireflies;
}

function levy(f, fireflies) {
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

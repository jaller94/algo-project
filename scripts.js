function grid( ctx ) {
	for (i = 0; i <= 5; i++) {
		// vertical lines
		ctx.moveTo(i * 100,   0);
		ctx.lineTo(i * 100, 500);
		ctx.stroke();
		// horizontal lines
		ctx.moveTo(  0, i * 100);
		ctx.lineTo(500, i * 100);
		ctx.stroke();
	}
}

function drawFirefly( x, y ) {
	console.log("drawFirefly");
	ctx.fillStyle = "rgba(255,0,0,1)";
	ctx.fillRect( x-1, y-1, 3, 3 );
}

function drawFireflies( fireflies ) {
	console.log("drawFireflies");
	fireflies.forEach( function(fly) { 
		drawFirefly(fly["x"], fly["y"]);
	} );
}

var c = document.getElementById( "canvas1" );
var ctx = c.getContext( "2d" );
grid( ctx );

var fireflies = generateFireflies(40, 0, 0, 500, 500);
drawFireflies( fireflies );

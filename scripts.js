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

function drawFirefly(x, y) {
	ctx.fillStyle = "rgba(255,0,0,1)";
	ctx.fillRect( x-1, y-1, 3, 3 );
}

var c = document.getElementById( "canvas1" );
var ctx = c.getContext( "2d" );
grid( ctx );

for (i = 0; i < 40 ; i++) {
	x = (Math.random() * 500);
	y = (Math.random() * 500);
	drawFirefly(x, y);
}

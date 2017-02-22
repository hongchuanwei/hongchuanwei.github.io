

function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
 
    this.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
}
 
function PointCollection() {
    this.mousePos = new Vector(0, 0);
    this.pointCollectionX = 0;
    this.pointCollectionY = 0;
    this.points = [];
 
    this.update = function (reset) {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
 
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var dd = (dx * dx) + (dy * dy);
            var d = Math.sqrt(dd);
 
			if(reset !== true) {
				point.targetPos.x = d < 150 ? point.curPos.x - dx : point.originalPos.x;
				point.targetPos.y = d < 150 ? point.curPos.y - dy : point.originalPos.y;
			} else {
				point.targetPos.x = point.originalPos.x;
				point.targetPos.y = point.originalPos.y;
			}
            
 
            point.update();
        }
    };
 
    this.draw = function ( reset) {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
 
            if (point === null)
                continue;
 
            if (window.reset) {
                this.pointCollectionX = 0;
                this.pointCollectionY = 0;
                this.mousePos = new Vector(0, 0);
            }
 
            point.draw(this.pointCollectionX, this.pointCollectionY, reset);
        }
    };
 
}
 
function Point(x, y, z, fontSize, color, letter) {
    this.curPos = new Vector(x, y, z);
    this.color = color;
 
    this.friction = document.Friction;
    this.rotationForce = document.rotationForce;
    this.springStrength = 0.1;
 
    this.originalPos = new Vector(x, y, z);
    this.fontSize = fontSize;
	this.originalFontSize = fontSize;
    this.targetPos = new Vector(x, y, z);
    this.velocity = new Vector(0.0, 0.0, 0.0);
 
	this.letter = letter;
	
    this.update = function () {
        var dx = this.targetPos.x - this.curPos.x;
        var dy = this.targetPos.y - this.curPos.y;
        // Orthogonal vector is [-dy,dx]
        var ax = dx * this.springStrength - this.rotationForce * dy;
        var ay = dy * this.springStrength + this.rotationForce * dx;
 
        this.velocity.x += ax;
        this.velocity.x *= this.friction;
        this.curPos.x += this.velocity.x;
 
        this.velocity.y += ay;
        this.velocity.y *= this.friction;
        this.curPos.y += this.velocity.y;
 
        var dox = this.originalPos.x - this.curPos.x;
        var doy = this.originalPos.y - this.curPos.y;
        var dd = (dox * dox) + (doy * doy);
        var d = Math.sqrt(dd);
 
        this.targetPos.z = d / 100 + 1;
        var dz = this.targetPos.z - this.curPos.z;
        var az = dz * this.springStrength;
        this.velocity.z += az;
        this.velocity.z *= this.friction;
        this.curPos.z += this.velocity.z;
 
        this.fontSize = this.originalFontSize * this.curPos.z;
        if (this.fontSize < this.originalFontSize) this.fontSize =  this.originalFontSize;
    };
 
    this.draw = function (dx, dy, reset) {
		//ctx.fillStyle = this.color;
		
		if(this.curPos.z>1.1) {
			var colorIndex = (Math.floor(this.curPos.z*3))%numColor; 
			ctx.fillStyle = letterColors[colorIndex];
		} else {
			ctx.fillStyle = "#000000";
		}
				
		ctx.font = this.fontSize +"px" + " Courier new";
		ctx.fillText(this.letter, this.curPos.x + dx, this.curPos.y + dy);   
    };
}


function makeColor(hslList, fade) {
    var hue = hslList[0] /*- 17.0 * fade / 1000.0*/ ;
    var sat = hslList[1] /*+ 81.0 * fade / 1000.0*/ ;
    var lgt = hslList[2] /*+ 58.0 * fade / 1000.0*/ ;
    return "hsl(" + hue + "," + sat + "%," + lgt + "%)";
}
 
function phraseToHex(phrase) {
    var hexphrase = "";
    for (var i = 0; i < phrase.length; i++) {
        hexphrase += phrase.charCodeAt(i).toString(16);
    }
    return hexphrase;
}
 
function initEventListeners() {
    $(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);
 
    canvas.ontouchmove = function (e) {
        e.preventDefault();
        onTouchMove(e);
    };
 
    canvas.ontouchstart = function (e) {
        e.preventDefault();
    };
}
 
function updateCanvasDimensions() {
	
	can = canvas[0]; // Get the DOM object in the jQuery object
	
	canvasWidth = this.div.width();
    canvasHeight = this.div.height();
	
	can.width = canvasWidth * PIXEL_RATIO;
	can.height = canvasHeight * PIXEL_RATIO;
	
	can.style.width = canvasWidth + "px";
    can.style.height = canvasHeight + "px";
	can.getContext("2d").setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
	
	
	
    draw();
}
 
function onMove(e) {
    if (pointCollection) {
        pointCollection.mousePos.set(e.pageX - canvas.offset().left, e.pageY - canvas.offset().top);
    }
}
 
function onTouchMove(e) {
    if (pointCollection) {
        pointCollection.mousePos.set(e.targetTouches[0].pageX - canvas.offset().left, e.targetTouches[0].pageY - canvas.offset().top);
    }
}
 

function bounceBubbles() {
    draw();
    update(reset);
    setTimeout(bounceBubbles, 30);
}
 
function draw(reset) {
    var tmpCanvas = canvas.get(0);
 
    if (tmpCanvas.getContext === null) {
        return;
    }
 
    ctx = tmpCanvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    if (pointCollection) {
        pointCollection.draw( reset);
    }
}
 

function update(reset) {
    if (pointCollection)
        pointCollection.update(reset);
}
 

/*
 * Draw letters in the description in the canvas
 * @param {string} description The description to be displayed
 * @param {number} fontSize Font size
 * @param {number} letterSpace Empty space between letters
 * @param {number} lineSpace Empty space between lines
 */
function drawDescription(description, fontSize, letterSpace, lineSpace) {
    updateCanvasDimensions();
    var g = [];
	var hPadding = 100;
	var vPadding = 100;
    var xPos = hPadding; // horizontal position of letter
	var yPos = vPadding; // vertical position of letter
	
	
	// Split the description into words 
	var words = description.split(" ");
	
	// Loop through all words
	for(var word of words ) {
		if(xPos + word.length*letterSpace > canvasWidth - hPadding) {
			xPos = hPadding;
			yPos += lineSpace;
		} 
		
		// Put all letters in a word in the canvas
		for(var letter of word) {
			xPos += letterSpace;
			g.push(new Point(xPos, yPos, 0.0, fontSize, "black", letter));
		}
		xPos += letterSpace;
		g.push(new Point(xPos, yPos, 0, fontSize, "black", " "));
	}
 
    pointCollection = new PointCollection();
    pointCollection.points = g;
    initEventListeners();
}
 
window.reset = false;
 
$(window).mouseleave(function () {
    window.reset = true;
});

$("#canvas-description").mouseleave(function() {
	window.reset = true;
});
 
$(window).mouseenter(function () {
    window.reset = false;
});

// Pixel ration for high definition screen
var PIXEL_RATIO = (function () {
    var ctxTmp = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctxTmp.webkitBackingStorePixelRatio ||
              ctxTmp.mozBackingStorePixelRatio ||
              ctxTmp.msBackingStorePixelRatio ||
              ctxTmp.oBackingStorePixelRatio ||
              ctxTmp.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

var div = $("#div-canvas"); 
var canvas = $("#canvas-description");

var canvasHeight;
var canvasWidth;
var ctx;
var pointCollection;

var pink = "#ff66b3";
var pink2 = "#ff0066";
var orange = "#ffcc66";
var green = "#669900";
var blue = "#6699ff";
var purple = "#cc66ff";
//var letterColors = [black, pink, pink2, orange, green, blue, purple];
var letterColors = [pink2, orange, green, blue, purple];
var numColor = letterColors.length;
	
document.rotationForce = 0.0;
document.Friction = 0.85;

 
setTimeout(updateCanvasDimensions, 30);


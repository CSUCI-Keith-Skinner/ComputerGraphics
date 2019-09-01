var InitDemo = function() {
	// loctions of files to import
	var urls = [
		"shaders/vert.glsl",
		"shaders/frag.glsl",
	];

	// names / keys for files (repsective to urls)
	//"filemap" in the "RunDemo" is a map:
		// name --> file
		// so filemap["vertShadertext"] will return the text from the file at "shaders/vert.glsl"
	var names = [
		"vertShaderText",
		"fragShaderText"
	];

	// what type of data we're reading ("text" or "json")
	// again, respective to urls
	var types = [
		"text",
		"text"
	];

	var importer = new resourceImporter(urls, names, types, RunDemo);
}

var InitOpenGL = function() {
	var canvas = document.getElementById("the_canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var gl = canvas.getContext("webgl");
	if (!gl) {
		console.log("WebGL context not found; checking for experimental WebGL");
		gl = canvas.getContext("experimental-webgl");
	}
	if (!gl) {
		alert("No WebGL context found; this demo requires a browswer which supports WebGL");
		return; // no WebGL means we're done, nothing to do...
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);
	gl.enable(gl.CULL_FACE);

	return gl;
}

var CreateShader = function(gl, shaderType, shaderText) {
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader, shaderText);

	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error("Cannot compile shader.", gl.getShaderInfoLog(shader));
		return;
	}

	return shader;
}

var CreateProgram = function(gl, vertShader, fragShader) {
	if (!vertShader || !fragShader) {
		return;
	}
	var program = gl.createProgram();
	gl.attachShader(program, vertShader);
	gl.attachShader(program, fragShader);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error("Cannot link GL program.", gl.getProgramInfoLog(program));
		return;
	}

	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error("Cannot validate GL program.", gl.getProgramInfoLog(program));
		return;
	}
	return program;
}

var SetBufferData = function(gl, buffer, data, DRAW_TYPE, BUFFER_TYPE, ArrayType) {
	gl.bindBuffer(BUFFER_TYPE, buffer);
	gl.bufferData(BUFFER_TYPE, new ArrayType(data), DRAW_TYPE);
	gl.bindBuffer(BUFFER_TYPE, null);
}

var CreateBuffer = function(gl, data, DRAW_TYPE, BUFFER_TYPE, ArrayType) {
	var buffer = gl.createBuffer();
	SetBufferData(gl, buffer, data, DRAW_TYPE, BUFFER_TYPE, ArrayType);
	return buffer;
}

var SetAttributeValue = function(gl, attribute, dataBuffer) {
	gl.enableVertexAttribArray(attribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
	gl.vertexAttribPointer(
		attribute, 								// Attribute location; "where to plug in data"
		3, 										// Number of elements for each vertex (1 position has 3 elements, <XYZ> or <RGB>)
		gl.FLOAT, 								// Data type for each element
		gl.FALSE, 								// Do we want the data to be normalized before use? No, we don't.
		3 * Float32Array.BYTES_PER_ELEMENT, 	// Number of bytes for each vertex (3 floats)
		0 										// Number of bytes to skip at the beginning
												// 	this is used if you put multiple attributes (say, position and color) in one buffer
	);
}

var EnableAttribute = function(gl, program, name, dataBuffer) {
	gl.useProgram(program);
	var attribute = gl.getAttribLocation(program, name);
	SetAttributeValue(gl, attribute, dataBuffer);
	return attribute;
}

var CreateCircleVertices = function(x, y, z, r, slices) {
	var vertices = [ x, y, z ];
	var portion = 2*Math.PI / slices; //angle of 1 portion
	for (i=0; i<slices; ++i) {
		vertices.push(
			x + r*Math.cos(i*portion),
			y + r*Math.sin(i*portion),
			z
		);
	}
	vertices.push(
		x + r*Math.cos(0),
		y + r*Math.sin(0),
		z
	);
	//total of 1 (origin) + slices + 1 (end spot) vertices
	return vertices;
}

var CreateElipseVertices = function(x, y, z, a, b, slices) {
	if (slices <= 0) {
		return new Array();
	}
	var vertices = [ x, y, z ];
	var portion = 2*Math.PI / slices;
	for (i=0; i<slices; ++i) {
		vertices.push(
			x + a*Math.cos(i*portion),
			y + b*Math.sin(i*portion),
			z
		);
	}
	vertices.push(
		x + a*Math.cos(0),
		y + b*Math.sin(0),
		z
	);
	//total of 1 (origin) + slices + 1 (end spot) vertices
	return vertices;
}

var CreateElipseColors = function(rcenter, gcenter, bcenter, r, g, b, sections) {
	var elipseColors = [ rcenter, gcenter, bcenter ];
	for (i=0; i<=sections; ++i) {
		elipseColors.push(r, g, b);
	}
	return elipseColors;
}

const TRIANGLES =
{
	"position": // X, Y, Z
	[
		0.0, 0.5, -0.0,
		-0.5, -0.5, -0.0,
		0.5, -0.5, -0.0,

		0.0, 0.4, -0.4,
		-0.4, -0.4, -0.4,
		0.4, -0.4, -0.4
	],
	"color": // R, G, B
	[
		1.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 0.0, 1.0,

		0.0, 0.0, 0.0,
		0.0, 0.0, 0.0,
		0.0, 0.0, 0.0
	],
	"index":
	[
		0, 1, 2,
		3, 4, 5
	]
}

var RunDemo = function(filemap)
{
	console.log("Getting an OpenGL context");
	gl = InitOpenGL();
	if (!gl) {
		return;
	}

	console.log("Creating shader program");
	var program = CreateProgram( gl,
		CreateShader(gl, gl.VERTEX_SHADER, filemap["vertShaderText"]), 
		CreateShader(gl, gl.FRAGMENT_SHADER, filemap["fragShaderText"]));
	if (!program) {
		return;
	}

	console.log("Creating buffers");
	var positionBuffer = CreateBuffer(gl, TRIANGLES.position, gl.STATIC_DRAW, gl.ARRAY_BUFFER, Float32Array);
	var colorBuffer = CreateBuffer(gl, TRIANGLES.color, gl.STATIC_DRAW, gl.ARRAY_BUFFER, Float32Array);
	var indexBuffer = CreateBuffer(gl, TRIANGLES.index, gl.STATIC_DRAW, gl.ELEMENT_ARRAY_BUFFER, Uint16Array);
	
	console.log("Enabling attributes in shader program");
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	var positionAttribLocation = EnableAttribute(gl, program, "vertPosition", positionBuffer);
	var colorAttribLocation = EnableAttribute(gl, program, "vertColor", colorBuffer);


	console.log("Drawing the triangles");
	gl.drawElements(
		gl.TRIANGLES, // type of objects we're drawing, google "WebGL drawElements" for more details
		TRIANGLES.index.length, // number of elements to cycle through
		gl.UNSIGNED_SHORT, // data type in the ELEMENT_ARRAY_BUFFER (UNSIGNED_SHORT == Uint16)
		0 // Offset (number of elements to skip at start)
	);

	console.log("Creating Data for elipse");
	const sections = 160;
	var elipseVertices = CreateElipseVertices(0, -0.1, -0.5, 0.25, 0.2, sections);
	var elipseColors = CreateElipseColors(0, 0, 0, 1, 1, 1, sections);

	console.log("Creating buffers for elipse");
	positionBuffer = CreateBuffer(gl, elipseVertices, gl.STATIC_DRAW, gl.ARRAY_BUFFER, Float32Array);
	colorBuffer = CreateBuffer(gl, elipseColors, gl.STATIC_DRAW, gl.ARRAY_BUFFER, Float32Array);
	
	console.log("Setting Attribute values to new buffers");
	gl.useProgram(program);
	SetAttributeValue(gl, positionAttribLocation, positionBuffer);
	SetAttributeValue(gl, colorAttribLocation, colorBuffer);
	
	console.log("Drawing elipse");
	gl.drawArrays(gl.TRIANGLE_FAN, 0, sections+2);

	

	console.log("Creating Data for circle");
	var circleVertices = CreateCircleVertices(0, -0.1, -1, 0.15, sections);
	var circleColors = CreateElipseColors(102/255, 140/255, 255/255, 0,0,0, sections);

	console.log("Creating buffers for circle");
	positionBuffer = CreateBuffer(gl, circleVertices, gl.STATIC_DRAW, gl.ARRAY_BUFFER, Float32Array);
	colorBuffer = CreateBuffer(gl, circleColors, gl.STATIC_DRAW, gl.ARRAY_BUFFER, Float32Array);
	
	gl.disableVertexAttribArray(positionAttribLocation);
	gl.disableVertexAttribArray(colorAttribLocation);
	console.log("Setting Attribute values to new buffers");
	gl.useProgram(program);
	SetAttributeValue(gl, positionAttribLocation, positionBuffer);
	SetAttributeValue(gl, colorAttribLocation, colorBuffer);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, sections+2);

	console.log("Done");
}
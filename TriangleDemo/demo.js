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

	if (!gl.getProgramParameter(program, gl.LINK_STATUS))
	{
		console.error("Cannot link GL program.", gl.getProgramInfoLog(program));
		return;
	}

	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
	{
		console.error("Cannot validate GL program.", gl.getProgramInfoLog(program));
		return;
	}
	return program;
}

var CreateBuffer = function(gl, data, drawType, bufferType) {
	var buffer = gl.createBuffer();
	gl.bindBuffer(bufferType, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new ArrayType(data), drawType);
	return buffer;
}

var createHeadVertices = function(numVertices, xoff = 0.0, yoff = 0.0) {
	var verts = [xoff, yoff, 0.0];
	for (i=0; i<=numVertices; ++i) {
		var degrees = i*(360/numVertices);
		var radians = degrees * Math.PI / 180;
		verts.push(xoff + Math.cos(radians));
		verts.push(yoff + Math.sin(radians));
		verts.push(0);
	}
	return verts;
}

var RunDemo = function(filemap)
{
	console.log("Initializing Triangle Demo");

	gl = InitOpenGL();
	if (!gl) {
		return;
	}

	var program = CreateProgram( gl,
		CreateShader(gl, gl.VERTEX_SHADER, filemap["vertShaderText"]), 
		CreateShader(gl, gl.FRAGMENT_SHADER, filemap["fragShaderText"]));

	var headVertices = createHeadVertices(5);

// SET UP TRIANGLE DATA

	// set up position data for a triangle
	var trianglePositions = [
		// X, Y, Z
		0.0, 0.5, 0.0,		// top
		-0.5, -0.5, 0.0, 	// bottom left
		0.5, -0.5, 0.0, 	// bottom right
		-0.5, 1.0, 0.5, 	// top
		-1, 0.0, 0.5, 		// bottom left
		0.0, 0.0, 0.5	 	// bottom right
	];


	// set up color date for the same triangle
		// respective to positions
	var triangleColors = [
		// R, G, B
		1.0, 0.0, 0.0, // top (Red)
		0.0, 1.0, 0.0, // bottom left (Green)
		0.0, 0.0, 1.0, // bottom right (Blue)
		0.0, 0.0, 1.0, // top (Red)
		0.0, 0.0, 1.0, // bottom left (Green)
		0.0, 0.0, 1.0  // bottom right (Blue)
	];

	// set up index array
	var triangleIndex = [
		0, 1, 2,
		3, 4, 5
	];

	// create buffers
	var trianglePositionBuffer = CreateBuffer(gl, trianglePositions, gl.STATIC_DRAW, gl.ARRAY_BUFFER, Float32Array);
	var triangleColorBuffer = CreateBuffer(gl, triangleColors, gl.STATIC_DRAW, gl.ARRAY_BUFFER, Float32Array);
	var triangleIndexBuffer = CreateBuffer(gl, triangleIndexBuffer, gl.STATIC_DRAW, gl.ELEMENT_ARRAY_BUFFER, Uint16Array);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	
	// get position of attibutes in shaderprogram
	var trianglePositionAttribLocation = gl.getAttribLocation(program, "vertPosition");
	var triangleColorAttribLocation = gl.getAttribLocation(program, "vertColor");


	// DRAW TRIANGLES
	gl.useProgram(program);

	// WebGL also needs to know which index buffer it should use
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);
	gl.enableVertexAttribArray(trianglePositionAttribLocation);
	gl.enableVertexAttribArray(triangleColorAttribLocation);

	gl.bindBuffer(gl.ARRAY_BUFFER, trianglePositionBuffer);
	gl.vertexAttribPointer(
		trianglePositionAttribLocation, 		// Attribute location; "where to plug in data"
		3, 										// Number of elements for each vertex (1 position has 3 elements, X Y Z)
		gl.FLOAT, 								// Data type for each element
		gl.FALSE, 								// Do we want the data to be normalized before use? No, we don't.
		3 * Float32Array.BYTES_PER_ELEMENT, 	// Number of bytes for each vertex (3 floats)
		0 										// Number of bytes to skip at the beginning
												// 	this is used if you put multiple attributes (say, position and color) in one buffer
	);

	// repeat for color
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBuffer);
	gl.vertexAttribPointer(
		triangleColorAttribLocation,
		3,
		gl.FLOAT,
		gl.FALSE,
		3 * Float32Array.BYTES_PER_ELEMENT,
		0
	);

	// finally, we can draw our triangle
	gl.drawElements(
		gl.TRIANGLES, // type of objects we're drawing, google "WebGL drawElements" for more details
		triangleIndex.length, // number of elements to cycle through
		gl.UNSIGNED_SHORT, // data type in the ELEMENT_ARRAY_BUFFER (UNSIGNED_SHORT == Uint16)
		0 // Offset (number of elements to skip at start)
	);


}

var InitDemo = function()
{
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
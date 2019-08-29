var RunDemo = function(filemap)
{
	console.log("Initializing Triangle Demo");

	// get reference to the canvas (made in the HTML file)
	var canvas = document.getElementById("the_canvas");

	// resize canvas to fill window
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// get reference to the WebGL context
	var gl = canvas.getContext("webgl");

	// check that WebGL context was succesfully referenced
	// try to fix if not
	if (!gl)
	{
		console.log("WebGL context not found; checking for experimental WebGL");
		gl = canvas.getContext("experimental-webgl");
	}

	if (!gl)
	{
		alert("No WebGL context found; this demo requires a browswer which supports WebGL");
		return; // no WebGL means we're done, nothing to do...
	}

	// set WebGL's viewport (i.e. "where it can draw") to cover the canvas
	gl.viewport(0, 0, canvas.width, canvas.height);

	// set background color of canvas (to black)
			   // Red Green Blue Alpha
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	// apply the clear color set above
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// enable the "depth test" to not render objects which are behind others
	gl.enable(gl.DEPTH_TEST);

	// set the front face of each triangle to the counterclockwise side
	gl.frontFace(gl.CCW);

	// tell WebGL that the back face is the face that should be culled (i.e. not shown)
	gl.cullFace(gl.BACK);

	// enable gl to cull faces so it can cull the back faces from above
	gl.enable(gl.CULL_FACE);

	// get vertex and fragment shader text from the importer
	var vertShaderText = filemap["vertShaderText"]; // see "InitDemo" at bottom for keys/names
	var fragShaderText = filemap["fragShaderText"];

	// create empty vertex and fragment shader objects
	var vertShader = gl.createShader(gl.VERTEX_SHADER);
	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

	// populate the two empty shaders with the text from our imported glsl files
	gl.shaderSource(vertShader, vertShaderText);
	gl.shaderSource(fragShader, fragShaderText);

	// compile the vertex shader and check that it compiled correctly
	gl.compileShader(vertShader);
	if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS))
	{
		// if it didn't compile correctly, log the reason in the console
		console.error("Cannot compile vertex shader.", gl.getShaderInforLog(vertexShader));
		return; // we can't continue without a working vertex shader
	}

	// compile the fragment shader and check that it compiled correctly
	gl.compileShader(fragShader);
	if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS))
	{
		console.error("Cannot compile fragment shader.", gl.getShaderInfoLoc(fragmentShader));
		return;
	}

	// create an empty program (these two shaders together make one program)
	var program = gl.createProgram();

	// attach both shaders to the program
	gl.attachShader(program, vertShader);
	gl.attachShader(program, fragShader);

	// link the two shaders together
		// the vertex shader feeds "varying" variables to the fragment shader
	gl.linkProgram(program);

	// check that the program linked correctly
		// if it didn't link correctly, the two shaders "don't match"
		// which most likely means their "varying" variables don't match
		// or that the vertex shader doesn't assign value to one of them
	if (!gl.getProgramParameter(program, gl.LINK_STATUS))
	{
		console.error("Cannot link GL program.", gl.getProgramInfoLog(program));
		return;
	}

	// validate the program, check if it is valid in current WebGL context
		// this is redundant after checking the LINK_STATUS
		// I only include it here to show how to do it
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
	{
		console.error("Cannot validate GL program.", gl.getProgramInfoLog(program));
		return;
	}

// SET UP TRIANGLE DATA

	// set up position data for a triangle
	var trianglePositions = [
		// X, Y, Z

		// top
		0.0, 0.5, 0.0,

		// bottom left
		-0.5, -0.5, 0.0,

		// bottom right
		0.5, -0.5, 0.0

		// X is -1 to +1, left to right on canvas
		// Y is -1 to +1 bottom to top on canvas
		// Z is -1 to +1 front to back
	];


	// set up color date for the same triangle
		// respective to positions
	var triangleColors = [
		// R, G, B

		// top (Red)
		1.0, 0.0, 0.0,

		// bottom left (Green)
		0.0, 1.0, 0.0,

		// bottom right (Blue)
		0.0, 0.0, 1.0
	];

	// set up index array
		// the index array is a list of indices
		// each index references a single vertex
		// right now we have 3 vertices:
			// the "top" vertex came first in our arrays above, so it's index is 0
			// the "bottom left" vertex came second, so it has index 1
			// the "bottom right" vertex came third, so it has index 2
		// if group of 3 indices describes a triangle;
			// if they trace the triangle in a counterclockwise direction, we'll see it
			// because the "front face" is the counterclockwise face
			// and we're culling the back face
	var triangleIndex = [
		0, 1, 2
		// i.e. top, then bottom left, the bottom right - counterclockwise!
		// if we had more vertices, we could draw multiple triangles here
	];


	// next, we will set up buffers to store triangle data
		// why? we've already stored the data in arrays, right?
		// the buffer will store the data in the format that the shader can easily read
		// (or, more accurately, a format that we can easily assign pointers to
		// so that WebGL can read it into the shader)

	// create buffers
	var trianglePositionBuffer = gl.createBuffer();
	var triangleColorBuffer = gl.createBuffer();
	var triangleIndexBuffer = gl.createBuffer();

	// assign the data from "trianglePositions" array to our "trianglePositionBuffer" object
	// this is done in two steps:
		// 1. bind the position buffer to gl's ARRAY_BUFFER slot
	gl.bindBuffer(gl.ARRAY_BUFFER, trianglePositionBuffer);
		// 2. assign the data in our "trianglePositions" array to
			// "whatever buffer object is bound to the ARRAY_BUFFER"
			// which in this case is "tranglePositionBuffer" since we just bound it above
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trianglePositions), gl.STATIC_DRAW);
		// we'll discuss "gl.STATIC_DRAW" at a later time; for now, trust.

	// assign the data from the "triangleColors" array to our "triangleColorBuffer" object
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleColors), gl.STATIC_DRAW);

	// unbind the ARRAY_BUFFER since we're done using it for now
		// omitting this step won't break anything
		// it is good practice, to avoid giving one object's data to the next object when drawing
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	// assigning the data for the index array is different
	// index arrays have a special buffer, called the ELEMENT_ARRAY_BUFFER
		// think of the individual vertices as elements
		// this buffer is used to decide which element to draw next
		// we always "index" arrays with integers; hence "Uint16Array"
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleIndex), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


	// next, we'll get the locations of the vertex attributes
		// there are two attributes in the vertex shader "vert.glsl" named:
			// "vertPosition"
			// "vertColor"
		// we want to plug our data, for each vertex, into these attributes
		// we need to know "where in the GPU memory are these attributes"
		// then, later, we'll know where the data from our buffers should go
	var trianglePositionAttribLocation = gl.getAttribLocation(program, "vertPosition");
	var triangleColorAttribLocation = gl.getAttribLocation(program, "vertColor");


// DRAW TRIANGLE
	// the rest of these steps would need to be repeated each time we draw the triangle
	// the ones above are "setup" and only need to happen once, even if we draw many times

	// we need to tell WebGL which program to use to draw this triangle
	// (even though we only have 1 program for now)
	gl.useProgram(program);

	// WebGL also needs to know which index buffer it should use
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);

	// we also need to "enable attribute arrays" at these locations
		// this roughly means "enable webgl to plug values into the attributes"
	gl.enableVertexAttribArray(trianglePositionAttribLocation);
	gl.enableVertexAttribArray(triangleColorAttribLocation);


	// next, we'll set up pointers to get the info from out buffers
		// they will use this index to decide "where is this vertex's data in each buffer"
	gl.bindBuffer(gl.ARRAY_BUFFER, trianglePositionBuffer);
	gl.vertexAttribPointer(
		trianglePositionAttribLocation, // Attribute location; "where to plug in data"
		3, // Number of elements for each vertex (1 position has 3 elements, X Y Z)
		gl.FLOAT, // Data type for each element
		gl.FALSE, // Do we want the data to be normalized before use? No, we don't.
		3 * Float32Array.BYTES_PER_ELEMENT, // Number of bytes for each vertex (3 floats)
		0 // Number of bytes to skip at the beginning
			// this is used if you put multiple attributes (say, position and color) in one buffer
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

// let's set up and draw another triangle!
	
	// SETUP
	var triangle1Positions = [
		-0.5, 1.0, 0.5, // top
		-1, 0.0, 0.5, // bottom left
		0.0, 0.0, 0.5
		// the z axis goes into the screen, so the "0.5" z values are "behind" the "0.0" z values from the first triangle
		// if we change them to something less than 0.0, the new triangle will be in front of the old one
	];


	var triangle1Colors = [
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0
		// all three colors are set to blue
	];

	var triangle1Index = [
		0, 1, 2
	];

	var triangle1PositionBuffer = gl.createBuffer();
	var triangle1ColorBuffer = gl.createBuffer();
	var triangle1IndexBuffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, triangle1PositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle1Positions), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, triangle1ColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle1Colors), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangle1IndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangle1Index), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	var triangle1PositionAttribLocation = gl.getAttribLocation(program, "vertPosition");
	var triangle1ColorAttribLocation = gl.getAttribLocation(program, "vertColor");

	// DRAW
	gl.useProgram(program);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangle1IndexBuffer);

	gl.enableVertexAttribArray(triangle1PositionAttribLocation);
	gl.enableVertexAttribArray(triangle1ColorAttribLocation);

	gl.bindBuffer(gl.ARRAY_BUFFER, triangle1PositionBuffer);
	gl.vertexAttribPointer(
		triangle1PositionAttribLocation,
		3,
		gl.FLOAT,
		gl.FALSE,
		3 * Float32Array.BYTES_PER_ELEMENT,
		0
	);

	gl.bindBuffer(gl.ARRAY_BUFFER, triangle1ColorBuffer);
	gl.vertexAttribPointer(
		triangle1ColorAttribLocation,
		3,
		gl.FLOAT,
		gl.FALSE,
		3 * Float32Array.BYTES_PER_ELEMENT,
		0
	);

	gl.drawElements(
		gl.TRIANGLES, 
		triangle1Index.length,
		gl.UNSIGNED_SHORT,
		0
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
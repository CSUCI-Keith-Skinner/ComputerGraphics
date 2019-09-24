var RunDemo = function (filemap)
{
	console.log("Initializing Demo");

	// get canvas, set dimensions to fill browser window
	var canvas = document.getElementById('the_canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// get WebGL context, confirm...
	var gl = canvas.getContext('webgl');

	if (!gl)
	{
		console.log('Browser is using experimental webgl.');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('This requires a browser which supports WebGL; Yours does not.');
	}

	// set background color and clear
	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// set up culling via depth and back face, set front face to CCW
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	// create shader program
	var rgbProgram = createProgram(
		gl, 
		filemap['rgbVertexShaderText'],
		filemap['rgbFragShaderText']
	);

	// set up view matrix
	var viewMatrix = new Float32Array(16);
	var cameraPosition = [0,10,-10];
	var lookAtPosition = [0,0,0];
	var cameraUpDirection = [0,1,0];
	mat4.lookAt(
		viewMatrix,       // target matrix to apply values to
		cameraPosition,   // where is the camera
		lookAtPosition,   // what point is the camera looking at
		cameraUpDirection // which direction is upward from the cameras PoV
	);

	// apply view matrix to corresponding location in shader
	gl.useProgram(rgbProgram);
	var matViewUniformLocation = gl.getUniformLocation(rgbProgram, 'mView');
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

	// set up (perspective) projection matrix
	var projMatrix = new Float32Array(16);
	var fieldOfView = Math.PI / 4;
	var aspect = canvas.width / canvas.height;
	var near = 0.01;
	var far = 1000.0;
	mat4.perspective(
		projMatrix,  // target matrix
		fieldOfView, // vertical field of view, in radians
		aspect,      // aspect ratio
		near,        // distance to near clip plane
		far          // distance to far clip plane
	);
	var matProjUniformLocation = gl.getUniformLocation(rgbProgram, 'mProj');
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	// set ambient light
	var ambientLight = [0.2, 0.3, 0.2];
	var ambientLightUniformLocation = gl.getUniformLocation(rgbProgram, 'ambientLight');
	gl.uniform3fv(ambientLightUniformLocation, ambientLight);

	// set up directional light
	var lightDirection = [1, -1, 0];
	var lightIntensity = [0.9, 0.8, 0.6];
	var lightDirectionUniformLocation = gl.getUniformLocation(rgbProgram, 'lightDirection');
	var lightIntensityUniformLocation = gl.getUniformLocation(rgbProgram, 'lightIntensity');
	gl.uniform3fv(lightDirectionUniformLocation, lightDirection);
	gl.uniform3fv(lightIntensityUniformLocation, lightIntensity);

	// set up position and index arrays for a cube
	var cubePositionArray = [
		// top			
		-0.5, 0.5, -0.5,
		0.5, 0.5, -0.5, 
		0.5, 0.5, 0.5,  
		-0.5, 0.5, 0.5, 
		// bottom
		-0.5, -0.5, -0.5,
		-0.5, -0.5, 0.5,
		0.5, -0.5, 0.5,
		0.5, -0.5, -0.5,
		// right
		-0.5, -0.5, -0.5,
		-0.5, 0.5, -0.5, 
		-0.5, 0.5, 0.5,		 
		-0.5, -0.5, 0.5, 
		// left
		0.5, -0.5, -0.5,
		0.5, -0.5, 0.5, 
		0.5, 0.5, 0.5,		 
		0.5, 0.5, -0.5, 
		// back
		-0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, 0.5, -0.5, 
		-0.5, 0.5, -0.5,
		// front
		-0.5, -0.5, 0.5,
		-0.5, 0.5, 0.5, 
		0.5, 0.5, 0.5, 		
		0.5, -0.5, 0.5
	];

	var cubeIndexArray = [
		// top
		0, 2, 1,
		0, 3, 2,
		// bottom
		4, 6, 5,
		4, 7, 6,
		// right
		8, 10, 9,
		8, 11, 10,
		// left
		12, 14, 13,
		12, 15, 14,
		// back
		16, 18, 17,
		16, 19, 18,
		// front
		20, 22, 21,
		20, 23, 22
	];

	// create cube using Mesh class
	var meshCube = new Mesh(
		gl, // WebGL context
		rgbProgram, // shader program to use to draw this
		cubePositionArray, // position attribute array
		cubeIndexArray // index array
	);

	meshCube.translate(new Vector(5,0,0));

	var cubeNormalArray = [	
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,

		0, -1, 0,
		0, -1, 0,
		0, -1, 0,
		0, -1, 0,

		-1, 0, 0,
		-1, 0, 0,
		-1, 0, 0,
		-1, 0, 0,

		1, 0, 0,
		1, 0, 0,
		1, 0, 0,
		1, 0, 0,

		0, 0, -1,
		0, 0, -1,
		0, 0, -1,
		0, 0, -1,

		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
	];

	var cubeColorArray = [
		// top / bottom is green
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		// left / right is red
		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
 		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
		
		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
 		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
		// front / back is blue
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
 		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,

		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
 		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0
	];

	var rgbCube = new RGBMesh(
		gl, // WebGL context
		rgbProgram, // shader program to use to draw this
		cubePositionArray, // position attribute array
		cubeIndexArray, // index array
		cubeNormalArray,
		cubeColorArray
	);

	rgbCube.translate(new Vector(-5,0,0));

	var angle = Math.PI / 100;
	var origin = new Vector();
	var orbit = new Quaternion(angle/2, 0, 1, 0);
	var localRot = new Quaternion(4*angle, 0, 0, 1);

	var main = function()
	{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		meshCube.rotateAround(origin, orbit);
		meshCube.localRotate(localRot);
		meshCube.draw();

		rgbCube.localRotate(localRot);
		rgbCube.rotateAround(origin, orbit);
		rgbCube.draw();
		requestAnimationFrame(main);
	}
	requestAnimationFrame(main);
}

var InitDemo = function()
{
	// locations of imported files
	var urls = [
		'/shaders/vert.rgb.glsl',
		'/shaders/frag.rgb.glsl'
	];

	// imported file keys for file key-value map, respective
	var names = [
		'rgbVertexShaderText',
		'rgbFragShaderText'
	];

	// file types, respective (text or JSON)
	var types = [
		'text',
		'text'
	];

	/* 
		pass urls, names, types, and "what to run after importing"
		to new importer
	*/
	var importer = new resourceImporter(urls, names, types, RunDemo);
}
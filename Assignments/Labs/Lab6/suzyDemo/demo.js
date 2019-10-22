
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

	// create shaders
	var uvProgram = createProgram(
		gl, 
		filemap['uvVertShaderText'],
		filemap['uvFragShaderText']
	);

	var rgbProgram = createProgram(
		gl, 
		filemap['rgbVertShaderText'],
		filemap['rgbFragShaderText']
	);

	// set up view matrix
	var viewMatrix = new Float32Array(16);
	var cameraPosition = [0,3,7];
	var lookAtPosition = [0,0,0];
	var cameraUpDirection = [0,1,0];
	mat4.lookAt(
		viewMatrix,       // target matrix to apply values to
		cameraPosition,   // where is the camera
		lookAtPosition,   // what point is the camera looking at
		cameraUpDirection // which direction is upward from the cameras PoV
	);

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

	// set ambient light
	var ambientLight = [0.2, 0.3, 0.2];

	// set up directional light
	var lightDirection = [1, 1, -1];
	var lightIntensity = [0.9, 0.8, 0.6];

	// apply view and projection matrices and light to uv shader
	gl.useProgram(uvProgram);

	var uvMatViewUniformLocation = gl.getUniformLocation(uvProgram, 'mView');
	gl.uniformMatrix4fv(uvMatViewUniformLocation, gl.FALSE, viewMatrix);

	var uvMatProjUniformLocation = gl.getUniformLocation(uvProgram, 'mProj');
	gl.uniformMatrix4fv(uvMatProjUniformLocation, gl.FALSE, projMatrix);

	var uvAmbientLightUniformLocation = gl.getUniformLocation(uvProgram, 'ambientLight');
	gl.uniform3fv(uvAmbientLightUniformLocation, ambientLight);

	var uvLightDirectionUniformLocation = gl.getUniformLocation(uvProgram, 'lightDirection');
	var uvLightIntensityUniformLocation = gl.getUniformLocation(uvProgram, 'lightIntensity');
	gl.uniform3fv(uvLightDirectionUniformLocation, lightDirection);
	gl.uniform3fv(uvLightIntensityUniformLocation, lightIntensity);

	// apply view and projection matrices and light to rgb shader
	gl.useProgram(rgbProgram);

	var rgbMatViewUniformLocation = gl.getUniformLocation(rgbProgram, 'mView');
	gl.uniformMatrix4fv(rgbMatViewUniformLocation, gl.FALSE, viewMatrix);

	var rgbMatProjUniformLocation = gl.getUniformLocation(rgbProgram, 'mProj');
	gl.uniformMatrix4fv(rgbMatProjUniformLocation, gl.FALSE, projMatrix);

	var rgbAmbientLightUniformLocation = gl.getUniformLocation(rgbProgram, 'ambientLight');
	gl.uniform3fv(rgbAmbientLightUniformLocation, ambientLight);

	var rgbLightDirectionUniformLocation = gl.getUniformLocation(rgbProgram, 'lightDirection');
	var rgbLightIntensityUniformLocation = gl.getUniformLocation(rgbProgram, 'lightIntensity');
	gl.uniform3fv(rgbLightDirectionUniformLocation, lightDirection);
	gl.uniform3fv(rgbLightIntensityUniformLocation, lightIntensity);

	// use imported JSONs / textures to create models
	var suzy = ThreeJSToUVMesh(filemap['suzyJSON'], 'suzy-texture', gl, uvProgram, true);
	var cube = ThreeJSToUVMesh(filemap['cubeJSON'], 'cube-texture', gl, uvProgram, true);
	var untitled = ThreeJSToUVMesh(filemap['untitledJSON'], 'untitled-texture', gl, uvProgram, true);
	var bounce = ThreeJSToUVMesh(filemap['bounceJSON'], 'bounce-texture', gl, uvProgram, true);

	suzy.translate(new Vector(-2, 0, 0));
	cube.translate(new Vector(2, 0, 0));
	untitled.translate(new Vector(-2, 0, -4));
	untitled.translate(new Vector(2, 0, -4));

	// set up some arbitrary constants for motion
	var angle = Math.PI / 100;
	var rotation = new Quaternion(angle, 0, 1, 0);

	var main = function()
	{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		suzy.rotate(rotation);
		suzy.draw();

		cube.rotate(rotation);
		cube.draw();

		untitled.rotate(rotation);
		untitled.draw();

		bounce.rotate(rotation);
		bounce.draw();

		requestAnimationFrame(main);
	}
	requestAnimationFrame(main);
}

var InitDemo = function()
{
	// locations of imported files
	var urls = [
		'shaders/vert.uv.glsl',
		'shaders/frag.uv.glsl',
		'shaders/vert.uv.glsl',
		'shaders/frag.uv.glsl',
		'models/suzy.json',
		'models/cube.json',
		'models/untitled.json',
		'models/bounce.json'
	];

	// imported file keys for file key-value map, respective
	var names = [
		'uvVertShaderText',
		'uvFragShaderText',
		'rgbVertShaderText',
		'rgbFragShaderText',
		'suzyJSON',
		'cubeJSON',
		'untitledJSON',
		'bounceJSON'
	];

	// file types, respective (text or JSON)
	var types = [
		'text',
		'text',
		'text',
		'text',
		'json',
		'json',
		'json',
		'json'
	];
	
	var importer = new resourceImporter(urls, names, types, RunDemo);
}
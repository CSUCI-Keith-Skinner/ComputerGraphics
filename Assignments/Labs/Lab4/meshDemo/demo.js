import Quaternion from './core/quaternion.js';
import Vector from './core/vector.js';
import Cube from './shapes.js';
import { createProgram } from './utils/shaderUtils.js';
import { resourceImporter } from './utils/importUtils.js';
import { mat4 } from './node_modules/gl-matrix/src/gl-matrix.js'

var RunDemo = function (filemap) {
	console.log("Initializing Demo");

	// get canvas, set dimensions to fill browser window
	var canvas = document.getElementById('the_canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// get WebGL context, confirm...
	var gl = canvas.getContext('webgl');

	if (!gl) {
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
	var cameraPosition = [0, 10, -10];
	var lookAtPosition = [0, 0, 0];
	var cameraUpDirection = [0, 1, 0];
	// eslint-disable-next-line no-undef
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
	// eslint-disable-next-line no-undef
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
	var ambientLight = [0.2, 0.2, 0.2];
	var ambientLightUniformLocation = gl.getUniformLocation(rgbProgram, 'ambientLight');
	gl.uniform3fv(ambientLightUniformLocation, ambientLight);

	// set up directional light
	var lightDirection = [1, -1, 0];
	var lightIntensity = [0.7, 0.7, 0.7];
	var lightDirectionUniformLocation = gl.getUniformLocation(rgbProgram, 'lightDirection');
	var lightIntensityUniformLocation = gl.getUniformLocation(rgbProgram, 'lightIntensity');
	gl.uniform3fv(lightDirectionUniformLocation, lightDirection);
	gl.uniform3fv(lightIntensityUniformLocation, lightIntensity);

	// set up position and index arrays for a cube


	// create cube using Mesh class
	var meshCube = Cube.create(
		gl, // WebGL context
		rgbProgram, // shader program to use to draw this
		[200.0/255.0, 34.0/255.0, 17.0/255.0],
		new Vector(5, 0, 0)
	);


	var rgbCube = Cube.create(
		gl, // WebGL context
		rgbProgram, // shader program to use to draw this
		[1.0, 1.0, 1.0],
		new Vector(-5, 0, 0)
	);

	var angle = Math.PI / 100;
	var origin = new Vector();
	var orbit = new Quaternion(angle / 2, 0, 1, 0);
	var localRot = new Quaternion(4 * angle, 0, 0, 1);

	var main = function () {
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

var InitDemo = function () {
	// locations of imported files
	var urls = [
		'shaders/vert.rgb.glsl',
		'shaders/frag.rgb.glsl'
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
	new resourceImporter(urls, names, types, RunDemo);
}

window.onload = function() {
	InitDemo();
}
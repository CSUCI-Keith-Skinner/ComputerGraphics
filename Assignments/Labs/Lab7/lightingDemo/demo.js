
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
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
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

	// set ambient light parameters
	var ambientLight = new Vector(0.4, 0.5, 0.4);

	// set up point lights' parameters
	var pointLightPosition = new Vector(0, 0, 0);
	var pointLightDiffuse = new Vector(4, 4, 4);
	var pointLightSpecular = new Vector(2, 2, 2);

	// use light manager to create lights
	var lightManager = new LightManager(gl, [rgbProgram, uvProgram], ambientLight);
	lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);
	lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);
	lightManager.update();

	// apply view and projection matrices ro uv shader
	gl.useProgram(uvProgram);

	var uvMatViewUniformLocation = gl.getUniformLocation(uvProgram, 'mView');
	gl.uniformMatrix4fv(uvMatViewUniformLocation, gl.FALSE, viewMatrix);

	var uvMatProjUniformLocation = gl.getUniformLocation(uvProgram, 'mProj');
	gl.uniformMatrix4fv(uvMatProjUniformLocation, gl.FALSE, projMatrix);

	// apply view and projection matrices to rgb shader
	gl.useProgram(rgbProgram);

	var rgbMatViewUniformLocation = gl.getUniformLocation(rgbProgram, 'mView');
	gl.uniformMatrix4fv(rgbMatViewUniformLocation, gl.FALSE, viewMatrix);

	var rgbMatProjUniformLocation = gl.getUniformLocation(rgbProgram, 'mProj');
	gl.uniformMatrix4fv(rgbMatProjUniformLocation, gl.FALSE, projMatrix);

	// rgb emerald material properties
	var emeraldDiffuse = new Vector(0.07568, 0.61424, 0.07568);
	var emeraldSpecular = new Vector(0.633, 0.727811, 0.633);
	var emeraldAmbient = new Vector(0.0215, 0.1745, 0.0215);
	var emeraldShininess = 0.6;

	// create material with emerald properties
	var emeraldMaterial = new RGBMaterial(
		gl,
		rgbProgram,
		emeraldDiffuse,
		emeraldSpecular,
		emeraldAmbient,
		emeraldShininess
	);

	// create emerald monkey head
	emeraldSuzy = JSONtoRGBMesh(
		filemap['suzyJSON'],
		gl,
		rgbProgram,
		emeraldMaterial
	);

	emeraldSuzy.translate(new Vector(-2, 0, 0));

	// textured earth material properties
	var earthDiffuse = 0.7;
	var earthSpecular = 0.3;
	var earthAmbient = 0.2;
	var earthShininess = 0.1;

	// create material for earth
	var earthMaterial = new UVMaterial(
		gl,
		uvProgram,
		'earth-texture',
		false,
		earthDiffuse,
		earthSpecular,
		earthAmbient,
		earthShininess
	);

	// create textured earth (sphere)
	uvEarth = new UVMesh(
		gl,
		uvProgram,
		Sphere.positionArray(30,30),
		Sphere.indexArray(30,30),
		Sphere.positionArray(30,30),
		Sphere.uvArray(30,30),
		earthMaterial
	);

	uvEarth.translate(new Vector(2, 0, 0));

	// set up models to follow point lights
	lightSuzy1 = JSONtoRGBMesh(
		filemap['suzyJSON'],
		gl,
		rgbProgram,
		emeraldMaterial
	);

	lightSuzy1.setScale(new Vector(0.1, 0.1, 0.1));

	lightSuzy2 = JSONtoRGBMesh(
		filemap['suzyJSON'],
		gl,
		rgbProgram,
		emeraldMaterial
	);

	lightSuzy2.setScale(new Vector(0.1, 0.1, 0.1));

	// set up some arbitrary constants for motion
	var startTime = Date.now();
	var time;
	let k_theta = 1/1000;
	let k_alpha = 1/3101;
	let hr = 5;
	let vr = 2;
	var theta;
	var alpha;
	var cosTheta;
	var lightPosition;

	var main = function()
	{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		time = Date.now() - startTime;
		theta = time * k_theta;
		alpha = time * k_alpha;
		cosTheta = Math.cos(theta);

		lightPosition = new Vector(
			hr*cosTheta*Math.sin(alpha),
			vr*Math.sin(2*theta),
			vr*cosTheta*Math.cos(alpha)
		);

		lightManager.pointLights[0].setPosition(lightPosition);
		lightManager.pointLights[1].setPosition(lightPosition.inverse())
		lightManager.update();

		lightSuzy1.setPosition(lightPosition);
		lightSuzy2.setPosition(lightPosition.inverse());

		lightSuzy1.draw();
		lightSuzy2.draw();

		emeraldSuzy.rotate(new Quaternion(Math.PI/1000, 0, 1, 0));
		emeraldSuzy.draw();

		uvEarth.rotate(new Quaternion(Math.PI/1000, 0, 1, 0));
		uvEarth.draw();

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
		'shaders/vert.rgb.glsl',
		'shaders/frag.rgb.glsl',
		'models/suzy.json'
	];

	// imported file keys for file key-value map, respective to locations
	var names = [
		'uvVertShaderText',
		'uvFragShaderText',
		'rgbVertShaderText',
		'rgbFragShaderText',
		'suzyJSON'
	];

	// file types, respective to locations (text or JSON)
	var types = [
		'text',
		'text',
		'text',
		'text',
		'json'
	];
	
	var importer = new resourceImporter(urls, names, types, RunDemo);
}
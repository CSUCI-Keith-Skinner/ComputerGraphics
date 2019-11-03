class PerspectiveCamera extends Transform
{
	constructor(gl, programArray=[], aspect=1, viewRadians=Math.PI/4, near=0.01, far=1000.0, position=new Vector(), rotation=new Quaternion())
	{
		super(position, rotation);

		// WebGL references / locations
		this.gl = gl;
		this.programs = programArray;
		this.positionAttribLocations = [];
		this.mProjViewAttribLocations = [];

		for (var i = 0; i < programArray.length; i++)
		{
			// TODO	
			// tell WebGL context to use shader program at index i of the programArray field.
			// push the location of "cam.mProjView" from that program into the "this.mProjViewAttribLocations" array
			// push the location of "cam.position" in that shader into the "this.positionAttribLocations" array
		}

		// Position updates for each shader
		this.updatePositions();

		// View matrix via local directions
		this.localRight = new Vector(-1, 0, 0).rotate(rotation, false);
		this.localUp = new Vector(0,1,0).rotate(rotation, false);
		this.forward = new Vector(0,0,1).rotate(rotation, false);
		this.mView = new Float32Array(16);
		this.updateViewMatrix();

		// Projection matrix
		this.fov = viewRadians;
		this.aspect = aspect;
		this.near = near;
		this.far = far;
		this.mProj = new Float32Array(16);
		this.needsProjectionUpdate = false;
		this.updateProjectionMatrix();

		// product of proj and view
		this.mProjView = new Float32Array(16);
		this.updateProjViewMatrix();
	}

	setFov(fov) // FoV = "Field of View" i.e. angle from top of vision to bottom
	{
		// TODO
		// set the "this.fov" field to the input value
		// set "this.needsProjectionUpdate" to true
		// NOTE (unrelated to what needs to be done in this method): fov is in radians
	}

	setAspect(ratio)
	{
		// TODO
		// set "this.aspect" field to input
		// set "this.needsProjectionUpdate" to true
	}

	setNearClip(distance)
	{
		// TODO
		// set "this.near" to input
		// set "this.needsProjectionUpdate" to true
	}

	setFarClip(distance)
	{
		// TODO
		// set "this.far" to input
		// set "this.needsProjectionUpdate" to true
	}

	setPerspective(fov, aspect, near, far)
	{
		// TODO
		// set all 4 perspective variables (like in above 4 methods)
		// set "this.needsProjectionUpdate" to true
	}

	// converting from local directions to quaternion is a huge pain, so I did this one.
	lookAt(target, up=this.localUp)
	{
		// set local directions
		this.forward = target.subtract(this.position, false);
		this.forward.normalize();

		this.localRight = Vector.cross(this.forward, up);
		this.localRight.normalize();

		this.localUp = Vector.cross(this.localRight, this.forward);
		this.localUp.normalize();

		// derive "this.rotation" quaternion values from local directions
		let tr = -this.localRight.x + this.localUp.y + this.forward.z;

		var S;
		var w;
		var x;
		var y;
		var z;

		if (tr > 0)
		{ 
			S = Math.sqrt(tr+1) * 2;
			w = S / 4;
			x = (this.localUp.z - this.forward.y) / S;
			y = (this.forward.x + this.localRight.z) / S; 
			z = (-this.localRight.y - this.localUp.x) / S; 
		}
		else if ((-this.localRight.x > this.localUp.y)&(-this.localRight.x > this.forward.z))
		{ 
			S = Math.sqrt(1 - this.localRight.x - this.localUp.y - this.forward.z) * 2;
			w = (this.localUp.z - this.forward.y) / S;
			x = S / 4;
			y = (this.localUp.x - this.localRight.y) / S; 
			z = (this.forward.x - this.localRight.z) / S; 
		}
		else if (this.localUp.y > this.forward.z)
		{ 
			S = Math.sqrt(1 + this.localUp.y + this.localRight.x - this.forward.z) * 2;
			w = (this.forward.x + this.localRight.z) / S;
			x = (this.localUp.x - this.localRight.y) / S; 
			y = S / 4;
			z = (this.forward.y + this.localUp.z) / S; 
		}
		else
		{ 
			S = Math.sqrt(1 + this.forward.z + this.localRight.x - this.localUp.y) * 2;
			w = (-this.localRight.y - this.localUp.x) / S;
			x = (this.forward.x - this.localRight.z) / S;
			y = (this.forward.y + this.localUp.z) / S;
			z = S / 4;
		}

		// set rotation, redundantly update local directions to be sure everythin is synced
		this.rotation.set(w, x, y, z);
		this.updateLocalDirections();

		// update view matrix and (projection * view) matrix
		this.updateViewMatrix();
		this.updateProjViewMatrix();
	}

	updateLocalDirections()
	{
		// TODO
		// update "this.forward", "this.localUp", and "this.localRight" to match "this.rotation"
		// see Constructor
	}

	updateViewMatrix()
	{
		// TODO
		// update "this.mView" to reflect the position, forward direction, and local up direction
			// how do we get the "target" location from the camera position and it's forward vector?
		// set "this.needsUpdate" to false (it is set to "true" by the transform when we move or rotate)
	}

	updateProjectionMatrix()
	{
		// TODO
		// update the projection matrix with the FoV, aspect, near, far field variables
		// set "this.needsProjectionUpdate" to false
	}

	updateProjViewMatrix()
	{
		// TODO
		// set "this.mProjView" to the product of the projection and view matrices (this.mProj and this.mView)
		// loop through "this.programs"; in each iteration:
			// tell the WebGL context to use the program at the current index
			// update the "mProjView" matrix in the program to match "this.mProjView"
				// something like "this.gl.uniformMatrix4fv( your location, this.gl.FALSE, mProjView matrix );"
				// here "this.gl.FALSE" means "don't transpose it before inputting"
				// use the locations you stored in the Constructor
	}

	updatePositions()
	{
		// TODO
		// iterate through "this.programs"
			// tell the WebGL context to use the program at the current index
			// update each program's "cam.position" with "this.position.toArray()"
			// use the locations you stored in the Constructor
			// what WebGL method do we use to pass in 3 floats as a single array / vector?
	}

	update()
	{
		let flag = this.needsUpdate || this.needsProjectionUpdate;
		if (this.needsUpdate)
		{
			if (this.hasRotated)
			{
				this.updateLocalDirections();
			}
			if (this.hasMoved)
			{
				this.updatePositions();
			}
			this.updateViewMatrix();
		}
		if (this.needsProjectionUpdate)
		{
			this.updateProjectionMatrix();
		}
		if (flag)
		{
			this.updateProjViewMatrix();
		}
	}
}
class UVMesh extends Mesh
{
	// constructor(gl, program, positionArray, indexArray, normalArray, uvArray, imageID, flipTexture, diffuse, specular, ambient, shininess, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	// {
	// 	var material = new UVMaterial(gl, program, imageID, flipTexture, diffuse, specular, ambient, shininess);
	// 	super(gl, program, positionArray, indexArray, normalArray, material, position, rotation, scale);

	// 	this.texCoordAttribLocation = gl.getAttribLocation(this.program, 'vertTexCoord');

	// 	this.vertTexCoords = new Float32Array(uvArray);
	// 	this.texCoordBufferObject = gl.createBuffer();
	// 	gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBufferObject);
	// 	gl.bufferData(gl.ARRAY_BUFFER, this.vertTexCoords, gl.STATIC_DRAW);
	// 	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	// }

	constructor(gl, program, positionArray, indexArray, normalArray, uvArray, material, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(gl, program, positionArray, indexArray, normalArray, material, position, rotation, scale);

		this.texCoordAttribLocation = gl.getAttribLocation(this.program, 'vertTexCoord');

		this.vertTexCoords = new Float32Array(uvArray);
		this.texCoordBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, this.vertTexCoords, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	activate()
	{
		super.activate();

		this.gl.enableVertexAttribArray(this.texCoordAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBufferObject);
		this.gl.vertexAttribPointer(
			this.texCoordAttribLocation,
			2,
			this.gl.FLOAT,
			this.gl.FALSE,
			2 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
	}

	draw()
	{
		super.draw();
		this.material.post_draw();
	}
}
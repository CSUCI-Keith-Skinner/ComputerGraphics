class RGBMesh extends Mesh
{
	constructor(gl, program, positionArray, indexArray, normalArray, colorArray, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(gl, program, positionArray, indexArray, position, rotation, scale);

		this.colorAttribLocation = gl.getAttribLocation(this.program, 'vertColor')
		this.normalAttribLocation = gl.getAttribLocation(this.program, 'vertNormal');

		this.vertColors = new Float32Array(colorArray);
		this.colorBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, this.vertColors, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		this.vertNormals = new Float32Array(normalArray);
		this.normalBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, this.vertNormals, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	activate()
	{
		super.activate();
		this.gl.enableVertexAttribArray(this.colorAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBufferObject);
		this.gl.vertexAttribPointer(
			this.colorAttribLocation,
			3,
			this.gl.FLOAT,
			this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);

		this.gl.enableVertexAttribArray(this.normalAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBufferObject);
		this.gl.vertexAttribPointer(
			this.normalAttribLocation,
			3,
			this.gl.FLOAT,
			this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
	}
}
class Mesh extends Transform
{
	constructor(gl, program, positionArray, indexArray, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(position, rotation, scale);

		// WebGL references / locations
		this.gl = gl;
		this.program = program
		this.positionAttribLocation = gl.getAttribLocation(this.program, 'vertPosition');
		this.mWorldUniformLocation = gl.getUniformLocation(this.program, 'mWorld');

		this.vertPositions = new Float32Array(positionArray);
		this.positionBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, this.vertPositions, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		this.indexArray = new Uint16Array(indexArray);
		this.indexBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indexArray, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}

	activate()
	{
		this.update();
		this.gl.useProgram(this.program);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);

		this.gl.enableVertexAttribArray(this.positionAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBufferObject);
		this.gl.vertexAttribPointer(
			this.positionAttribLocation,
			3,
			this.gl.FLOAT,
			this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);

		this.gl.uniformMatrix4fv(this.mWorldUniformLocation, this.gl.FALSE, this.mWorld);
	}

	draw()
	{
		this.activate();
		this.gl.drawElements(
			this.gl.TRIANGLES,
			this.indexArray.length,
			this.gl.UNSIGNED_SHORT,
			0
		);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	}
}
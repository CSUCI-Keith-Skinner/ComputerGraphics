import Vector from '../core/vector.js';
import Quaternion from '../core/quaternion.js';
import Transform from '../core/transform.js';

export default class Mesh extends Transform
{
	/*
		Set up transform
		Set up WebGL references
		Create and populate position and index buffer objects
	*/
	constructor(gl, program, positionArray, indexArray, position=new Vector(),
		rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(position, rotation, scale);

		this.gl = gl;
		this.program = program;
		this.constructor_position(positionArray);
		this.constructor_index(indexArray);
		this.mWorldUniformLocation = this.gl.getUniformLocation(this.program, 'mWorld');
	}

	constructor_position(positionArray) {
		this.positionArray = new Float32Array(positionArray);
		this.positionAttribLocation = this.gl.getAttribLocation(this.program, 'vertPosition');
		this.positionBufferObject = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBufferObject);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positionArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	}

	constructor_index(indexArray) {
		this.indexArray = new Uint16Array(indexArray);
		this.indexBufferObject = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indexArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	}

	/*
		Update transform
		Use correct shader program
		Bind position attribute array to element array buffer
		Set up vertex attribute array / pointer for position attribute
	*/
	activate()
	{
		this.update();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBufferObject);

		this.gl.useProgram(this.program);
		this.gl.enableVertexAttribArray(this.positionAttribLocation);
		this.gl.vertexAttribPointer(this.positionAttribLocation, 3, this.gl.FLOAT, false,
			3 * Float32Array.BYTES_PER_ELEMENT, 0);
		this.gl.uniformMatrix4fv(this.mWorldUniformLocation, this.gl.FALSE, this.mWorld);
	}

	/*
		Call activate
		Draw elements
		Unbind buffers
	*/
	draw()
	{
		this.activate();
		this.gl.drawElements(this.gl.TRIANGLES, this.indexArray.length, this.gl.UNSIGNED_SHORT, 0);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	}
}
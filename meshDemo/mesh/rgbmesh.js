import Vector from '../core/vector.js';
import Quaternion from '../core/quaternion.js';
import Mesh from './mesh.js';

export default class RGBMesh extends Mesh
{
	/*
		Set up Mesh with appropriate args
		Set location references for color, normal attributes
		Create and populate buffers for color, normal attributes
	*/ 
	constructor(gl, program, positionArray, indexArray, normalArray, colorArray, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(gl, program, positionArray, indexArray, position, rotation, scale);
		this.constructor_normal(normalArray);
		this.constructor_color(colorArray);
	}
	constructor_normal(normalArray) {
		this.normalArray = new Float32Array(normalArray);
		this.normalAttribLocation = this.gl.getAttribLocation(this.program, 'vertNormal');
		this.normalBufferObject = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBufferObject);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.normalArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	}
	constructor_color(colorArray) {
		this.colorArray = new Float32Array(colorArray);
		this.colorAttribLocation = this.gl.getAttribLocation(this.program, 'vertColor');
		this.colorBufferObject = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBufferObject);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.colorArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	}

	/*
		Call Mesh's activate
		Set up attribute arrays / pointers for color and normal attributes
	*/
	activate()
	{
		super.activate();

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBufferObject);
		this.gl.enableVertexAttribArray(this.normalAttribLocation);
		this.gl.vertexAttribPointer(this.normalAttribLocation, 3, this.gl.FLOAT, false, 
			3 * Float32Array.BYTES_PER_ELEMENT, 0);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBufferObject);
		this.gl.enableVertexAttribArray(this.colorAttribLocation);
		this.gl.vertexAttribPointer(this.colorAttribLocation, 3, this.gl.FLOAT, false, 
			3 * Float32Array.BYTES_PER_ELEMENT, 0);
	}
}
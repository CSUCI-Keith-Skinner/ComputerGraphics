// MATRIX CLASS DESCRIPTION:
/*
	The Matrix class will contain utilities for generating and manipulating
	any 4x4 matrices needed for our purposes in graphics.

	Resulting matrices will be represented in column-major form as 1D
	Float32Arrays with 16 elements.

	This means the first 4 elements are the 1st column, the next 4 are the
	second column, and so on...

	This class will have no fields; it will contain only static methods to
	to generate and manipulate matrices in this form.
*/

import { Vector } from './vector';

export class Matrix
{
	// returns the identity matrix
	static identity()
	{
		// TODO: done
		return new Float32Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);
	}

	// given a 3d vector, returns the corresponding translation matrix
	static translation(vector)
	{
		// TODO: done
		return new Float32Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			vector.x, vector.y, vector.z, 1
		]);
	}

	// given a quaternion, returns the corresponding rotation matrix
	// REQUIRES QUATERNIONS
	static rotation(quat)
	{
		//TODO: done
		//Shamelessly copied from:
		//	https://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToMatrix/index.htm

		return new Float32Array([
			//COLUMN 1
			1 - 2*quat.y*quat.y - 2*quat.z*quat.z, 
				2*quat.x*quat.y + 2*quat.z*quat.w, 
				2*quat.x*quat.z - 2*quat.y*quat.w,
				0,
			//COLUMN 2
				2*quat.x*quat.y - 2*quat.z*quat.w,
			1 - 2*quat.x*quat.x - 2*quat.z*quat.z,
				2*quat.y*quat.z + 2*quat.x*quat.w,
				0,
			//COLUMN 3
				2*quat.x*quat.z + 2*quat.y*quat.w,
				2*quat.y*quat.z - 2*quat.x*quat.w,
			1 - 2*quat.x*quat.x - 2*quat.y*quat.y,
				0,
			//COLUMN 4
				0, 0, 0, 1
		]);
	}

	// given a 3d vector, returns the corresponding scale matrix
	static scale(vector)
	{
		// TODO: done
		return new Float32Array([
			vector.x, 0, 0, 0,
			0, vector.y, 0, 0,
			0, 0, vector.z, 0,
			0, 0, 0, 1
		]);
	}

	// given two matrices (as Float32Arrays), multiplies them together and returns the result
	// don't forget, the inputs and result are in column-major form!
	static mul(mat1, mat2)
	{
		// TODO: done
		var mul_helper = function(row, col, mat1, mat2) {
			var temp = 0;
			for (var i=0; i<4; ++i) {
				temp += mat1[col+4*i] * mat2[4*row+i];
			}
			return temp;
		}
		var result = new Float32Array(16);
		for (var row=0; row<4; ++row) { //row of result
			for (var col=0; col<4; ++col) { //col of result
				result[col + 4*row] = mul_helper(row, col, mat1, mat2);
			}
		}
		return new Float32Array(result);
	}

	// given an array or list of matrices, multiplies them all (in order) and returns the result
	static prod(mats)
	{
		// TODO: done
		if (mats.length == 0) {
			return Matrix.identity();
		}
		var result = mats[0];
		for (var i=1; i<mats.length; ++i) {
			result = Matrix.mul(result, mats[i]);
		}
		return result;
	}

	// given a position (vector), rotation (quaternion) and scale (vector)
	// returns the corresponding world matrix
	static world(position, rotation, scale)
	{
		// TODO: done
		return this.prod([
			Matrix.translation(position), 
			Matrix.rotation(rotation), 
			Matrix.scale(scale)
		]);
	}

	// THE MATRICES BELOW WILL BE DONE IN THE 2ND HALF OF THE SEMESTER
	// but feel free to do some research to do them early!

	// takes 3 vectors, eye target and up
	// returns the view matrix for an object at position "eye", looking at "target"
	// with local upward direction "up"
	static view(eye, target, up)
	{
		// TODO: done
		//Shamelessly taken from:
		//  https://stackoverflow.com/questions/6030933/get-eye-target-and-up-vectors-from-view-matrix
		//LookAt(Eye, At, Up);
		
		var zaxis = Vector.normalization(target.subract(eye, false));
		var xaxis = Vector.normalization(Vector.cross(up, zaxis));
		var yaxis = Vector.cross(zaxis, xaxis);

		return new Float32Array([
			xaxis.x,   xaxis.y,   xaxis.z,   -Vector.dot(xaxis, eye),
			yaxis.x,   yaxis.y,   yaxis.z,   -Vector.dot(yaxis, eye),
			zaxis.x,   zaxis.y,   zaxis.z,   -Vector.dot(zaxis, eye),
			0, 0, 0, 1
		]);
	}

	// "viewRadians" = vertical field of view, in radians
	// "aspect" = aspect ratio (i.e. width/height of display)
	// "near" = the closest something can be and still be seen
	// "far" = the furthest something can be and still be seen
	// returns corresponding perspective projection matrix
	static perspective(viewRadians=Math.PI/4, aspect=1, near=0.1, far=1000.0)
	{
		// TODO: done
		// Shamelessly stolen from:
		//	https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix/opengl-perspective-projection-matrix
		//	http://learnwebgl.brown37.net/08_projections/create_perspective/create_perspective.html

		var top = near * Math.tan(viewRadians/2);
		var bottom = -top;
		var right = top * aspect;
		var left = -right;
		
		var tmb = top-bottom;
		var fmn = far-near;
		var rml = right-left;
		var rpl = right+left;
		var tpb = top+bottom;
		var fpn = far+near;

		return new Float32Array([
			2*near/rml, 0,          0,                0,
			0,          2*near/tmb, 0,                0,
			rpl/rml,    tpb/tmb,    -fpn/fmn,        -1,
			0,          0,          -2*far*near/fmn,  0
		]);
	}

	// given left, right, bottom, top bounds of view and near / far distances
	// returns corresponding orthographic projection matrix
	static orthographic(left=-2, right=2, bottom=-2, top=2, near=0.1, far=1000.0)
	{
		// TODO: done
		// Shamelessly stolen from:
		//  https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix/orthographic-projection-matrix

		var tmb = top-bottom;
		var fmn = far-near;
		var rml = right-left;
		var rpl = right+left;
		var tpb = top+bottom;
		var fpn = far+near;

		return new Float32Array([
			2/rml,     0,         0,         0,
			0,         2/tmb,     0,         0,
			0,         0,         -2/fmn,    0,
			-rpl/rml,  -tpb/tmb,  -fpn/fmn,  1
		]);
	}
}

module.exports = Matrix;

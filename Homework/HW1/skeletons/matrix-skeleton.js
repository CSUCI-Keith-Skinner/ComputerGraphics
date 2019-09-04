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

class Matrix
{
	// returns the identity matrix
	static identity()
	{
		
	}

	// given a 3d vector, returns the corresponding translation matrix
	static translation(vector)
	{
		
	}

	// given a quaternion, returns the corresponding rotation matrix
	// REQUIRES QUATERNIONS
	static rotation(quat)
	{
		
	}

	// given a 3d vector, returns the corresponding scale matrix
	static scale(vector)
	{
		
	}

	// given two matrices (as Float32Arrays), multiplies them together and returns the result
	// don't forget, the inputs and result are in column-major form!
	static mul(mat1, mat2)
	{
		
	}

	// given an array or list of matrices, multiplies them all (in order) and returns the result
	static prod(mats)
	{
		
	}

	// given a position (vector), rotation (quaternion) and scale (vector)
	// returns the corresponding world matrix
	static world(position, rotation, scale)
	{
		
	}

	// THE MATRICES BELOW WILL BE DONE IN THE 2ND HALF OF THE SEMESTER
	// but feel free to do some research to do them early!

	// takes 3 vectors, eye target and up
	// returns the view matrix for an object at position "eye", looking at "target"
	// with local upward direction "up"
	static view(eye, target, up)
	{
		
	}

	// "viewRadians" = vertical field of view, in radians
	// "aspect" = aspect ratio (i.e. width/height of display)
	// "near" = the closest something can be and still be seen
	// "far" = the furthest something can be and still be seen
	// returns corresponding perspective projection matrix
	static perspective(viewRadians=Math.PI/4, aspect=1, near=0.1, far=1000.0)
	{
		
	}

	// given left, right, bottom, top bounds of view and near / far distances
	// returns corresponding orthographic projection matrix
	static orthographic(left=-2, right=2, bottom=-2, top=2, near=0.1, far=1000.0)
	{
		
	}
}
// VECTOR CLASS DESCRIPTION:
/* 
	The Vector class will be a simple 3D vector
*/

// VECTOR CLASS FIELDS:
// 		x (numerical) : component in x direction
// 		y (numerical) : component in y direction
//		z (numerical) : component in z direction

class Vector
{
	// sets up a vector with xyz components "this.x, this.y. this.z"
	constructor (x=0, y=0, z=0)
	{
		
	}

	// resets this vectos xyz components to the input values
	set(x, y, z)
	{
		
	}

	// takes vector "v", and adds it to this vector.
	// if "inplace" is true, this vector updates itself
	// otherwise, a new vector is created and returned
	// this is what "inplace" means in all other functions as well
	add(v, inplace=true)
	{
		
	}

	// subtracts vector "v" from this vector
	subtract(v, inplace=true)
	{
		
	}

	// scales this vector by vector "v"
	// that is, multiplies this vectors x component by that of "v"
	// and y by y and so on
	scale(v, inplace=true)
	{
		
	}

	// returns a new vector whose x, y and z components are opposite this ones
	// (additive opposite, so negation)
	inverse()
	{
		
	}

	// returns the magnitude of this vector
	// i.e. euclidean length or distance formula
	magnitude()
	{
		
	}

	// rotates this vector by quaternion "q"
	// REQUIRES QUATERNIONS
	rotate(q, inplace=true)
	{
		
	}

	// unit vector in the same direction as this vector
	// if this vectors magnitude is 0, this function should leave it as is
	normalize(inplace=true)
	{
		
	}

	// returns a string representing this vector
	// something along the lines of "Vector (x, y, z)"
	// (with "x, y, z" replaced by their actual values, of course)
	toString()
	{
		
	}

	// returns this vector in array form
	// something like [x, y, z]
	toArray()
	{
		
	}

	// takes a list or array of vectors
	// returns their sum (i.e. add up all x components to get x... and so on)
	static sum(vectors)
	{
		
	}

	// returns the cross product of the two input vectors "v1" and "v2"
	static cross(v1, v2)
	{
		
	}

	// returns the dot product of the two input vectors "v1" and "v2"
	static dot(v1, v2)
	{
		
	}

	// given quaternion "q", returns a vector with the same x, y and z components as q
	// REQUIRES QUATERNIONS
	static fromQuaternion(q)
	{
		
	}
}
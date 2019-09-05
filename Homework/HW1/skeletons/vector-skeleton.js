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
		this.set(x, y, z);
	}

	// resets this vectos xyz components to the input values
	set(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	// takes vector "v", and adds it to this vector.
	// if "inplace" is true, this vector updates itself
	// otherwise, a new vector is created and returned
	// this is what "inplace" means in all other functions as well
	add(v, inplace=true)
	{
		if (!inplace) {
			return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
		}
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	}

	// subtracts vector "v" from this vector
	subtract(v, inplace=true)
	{
		if (!inplace) {
			return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
		}
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	}

	// scales this vector by vector "v"
	// that is, multiplies this vectors x component by that of "v"
	// and y by y and so on
	scale(v, inplace=true)
	{
		if (!inplace) {
			return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
		}
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		return this;
	}

	// returns a new vector whose x, y and z components are opposite this ones
	// (additive opposite, so negation)
	inverse()
	{
		return new Vector(-this.x, -this.y, -this.z);
	}

	// returns the magnitude of this vector
	// i.e. euclidean length or distance formula
	magnitude()
	{
		return Math.sqrt(this.x*this.x + this.y*this.y, this.z*this.z);
	}

	// rotates this vector by quaternion "q"
	// REQUIRES QUATERNIONS
	rotate(q, inplace=true)
	{
		//TODO: This

	}

	// unit vector in the same direction as this vector
	// if this vectors magnitude is 0, this function should leave it as is
	normalize(inplace=true)
	{
		if (!inplace) {
			return new Vector(this.x/this.magnitude(), this.y/this.magnitude(), this.z/this.magnitude());
		}
		this.x /= this.magnitude();
		this.y /= this.magnitude();
		this.z /= this.magnitude();
		return this;
	}

	// returns a string representing this vector
	// something along the lines of "Vector (x, y, z)"
	// (with "x, y, z" replaced by their actual values, of course)
	toString()
	{
		return `<${this.x}, ${this.y}, ${this.z}>`;
	}

	// returns this vector in array form
	// something like [x, y, z]
	toArray()
	{
		return [this.x, this.y, this.z];
	}

	// takes a list or array of vectors
	// returns their sum (i.e. add up all x components to get x... and so on)
	static sum(vectors)
	{
		return this.x + this.y + this.z;
	}

	// returns the cross product of the two input vectors "v1" and "v2"
	static cross(v1, v2)
	{
		return new Vector(
			v1.y*v2.z - v1.z*v2.y,
			v1.z*v2.x - v1.x*v2.z,
			v1.x*v2.y - v1.y*v2.x
		);
	}

	// returns the dot product of the two input vectors "v1" and "v2"
	static dot(v1, v2)
	{
		return v1.x*v2.x 
			 + v1.y*v2.y
			 + v1.z*v2.z;
	}

	// given quaternion "q", returns a vector with the same x, y and z components as q
	// REQUIRES QUATERNIONS
	static fromQuaternion(q)
	{
		//TODO: this
	}
}
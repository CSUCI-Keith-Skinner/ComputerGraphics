/**
 * The Vector class will be a simple 3D vector
 */
const Vector = require('vector');
const Quaternion = require('quaternion');
module.exports = Vector;
export class Vector
{
	/**
	 * VECTOR CLASS FIELDS
	 * @constructor
	 * @param {Number} x component in x direction
	 * @param {Number} y component in y direction
	 * @param {Number} z component in z direction
	 */
	constructor (x=0, y=0, z=0)
	{
		//TODO: done
		this.set(x, y, z);
	}

	/**
	 * Resets this vectors xyz components to the input values
	 * @param {Number} x component in x direction
	 * @param {Number} y component in y direction
	 * @param {Number} z component in z direction
	 */
	set(x, y, z)
	{
		//TODO: done
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	/**
	 * Takes vector "v", and adds it to this vector.
	 * if "inplace" is true, this vector updates itself
	 * otherwise, a new vector is created and returned
	 * this is what "inplace" means in all other functions as well.
	 * @param {Vector} v 
	 * @param {Boolean} inplace 
	 */
	add(v, inplace=true)
	{
		//TODO: done
		if (!inplace) {
			return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
		}
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	}

	/**
	 * Subtracts vector "v" from this vector
	 * @param {Vector} v 
	 * @param {Boolean} inplace 
	 */
	subtract(v, inplace=true)
	{
		//TODO: done
		if (!inplace) {
			return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
		}
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	}

	
	
	/**
	 * Scales this vector by vector "v" that is, multiplies this vectors x component
	 * by that of "v" and y by y and so on
	 * @param {Vector} v 
	 * @param {Boolean} inplace
	 * @returns {Vector} "this" if inplace, a new vector otherwise
	 */
	scale(v, inplace=true)
	{
		//TODO: done
		if (!inplace)
			return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		return this;
	}

	
	/**
	 * returns a new vector whose x, y and z components are opposite this ones
	 * (additive opposite, so negation)
	 * @returns {Vector}
	 */
	inverse()
	{
		//TODO: done
		return new Vector(-this.x, -this.y, -this.z);
	}

	
	/**
	 * returns the magnitude of this vector
	 * i.e. euclidean length or distance formula
	 * @returns {Number}
	 */
	magnitude()
	{
		//TODO: done
		return Math.sqrt(
			  this.x*this.x + this.y*this.y + this.z*this.z
		);
	}

	
	/**
	 * rotates this vector by quaternion "q"
	 * REQUIRES QUATERNIONS
	 * @param {Quaternion} q 
	 * @param {Boolean} inplace
	 */
	rotate(q, inplace=true)
	{
		//TODO: done
		var u = new Vector(q.x, q.y, q.z);
		var t1 = 2 * Vector.dot(u, this);
		var t2 = q.w*q.w - Vector.dot(u, u);
		var t3 = 2*q.w;

		var result = u.scale(new Vector(t1, t1, t1), false)
			.add(this.scale(new Vector(t2, t2, t2), false), false)
			.add(Vector.cross(u, this).scale(new Vector(t3, t3, t3)));

		if (!inplace)
			return result;
		return this.set(result.x, result.y, result.z);
	}

	// unit vector in the same direction as this vector
	// if this vectors magnitude is 0, this function should leave it as is
	normalize(inplace=true)
	{
		//TODO: done
		var magnitude = this.magnitude();
		if (!inplace)
			return new Vector(this.x/magnitude, this.y/magnitude, this.z/magnitude);
		this.x /= magnitude;
		this.y /= magnitude;
		this.z /= magnitude;
		return this;
	}

	// returns a string representing this vector
	// something along the lines of "Vector (x, y, z)"
	// (with "x, y, z" replaced by their actual values, of course)
	toString()
	{
		//TODO: done
		return `Vector(${this.x}, ${this.y}, ${this.z})`;
	}

	// returns this vector in array form
	// something like [x, y, z]
	toArray()
	{
		//TODO: done
		return [this.x, this.y, this.z];
	}

	// takes a list or array of vectors
	// returns their sum (i.e. add up all x components to get x... and so on)
	static sum(vectors)
	{
		//TODO: done
		var result = vectors[0];
		for (var i=1; i<vectors.length; ++i)
			result.add(vectors[i]);
		return result;
	}

	// returns the cross product of the two input vectors "v1" and "v2"
	static cross(v1, v2)
	{
		//TODO: done
		return new Vector(
			v1.y*v2.z - v1.z*v2.y,
			v1.z*v2.x - v1.x*v2.z,
			v1.x*v2.y - v1.y*v2.x
		);
	}

	// returns the dot product of the two input vectors "v1" and "v2"
	static dot(v1, v2)
	{
		//TODO: done
		return v1.x*v2.x 
			 + v1.y*v2.y
			 + v1.z*v2.z;
	}

	// given quaternion "q", returns a vector with the same x, y and z components as q
	// REQUIRES QUATERNIONS
	static fromQuaternion(q)
	{
		//TODO: done
		return new Vector(q.x, q.y, q.z);
	}
}

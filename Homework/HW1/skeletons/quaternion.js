// QUATERNION CLASS DESCRIPTION
/**
 * The Quaternion class will 4-component structure to represent and apply rotations.
 */
export class Quaternion
{

	/**
	 * Create a Quaternion with an axis of rotation and an angle of rotation
	 * @param {Number} theta angle in radians
	 * @param {Number} x i scalar for the x-axis component 
	 * @param {Number} y j scalar for the y-axis component
	 * @param {Number} z k scalar for the z-axis component
	 * @param {Number} normalized whether or not the values need to be normalized
	 */
	constructor(theta=0, x=1, y=0, z=0, normalized=false)
	{

		if (!normalized) {
			var len = Math.sqrt(x*x + y*y + z*z);
			x /= len;
			y /= len;
			z /= len;
		}

		var half = theta/2;
		var s = Math.sin(half);
		this.w = Math.cos(half);
		this.x = x*s;
		this.y = y*s;
		this.z = z*s;
	}

	/**
	 * sets this quaternion's components to the inputs
	 * @param {Number} w 
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} z 
	 * @todo done
	 */
	set(w, x, y, z)
	{
		this.w = w;
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}


	/**
	 * returns the inverse quaternion as detailed in slides
	 * @note may assume that this quaternion is already normalized
	 */
	inverse()
	{
		//TODO: done
		var ret = new Quaternion();
		ret.set(this.w, -this.x, -this.y, -this.z);
		return ret;
	}

	
	/**
	 * scale w x y z components by  to normalize 
	 * @note this is to ensure that floating point rounding errors don't slowly add up
	 */
	renormalize()
	{
		//TODO: done
		var length = Math.sqrt(this.w*this.w + this.x*this.x + this.y*this.y + this.z*this.z);
		this.w /= length;
		this.x /= length;
		this.y /= length;
		this.z /= length;
		return this;
	}
	
	/**
	 * multiply the input quaternion "q" on the left (i.e. get q * this)
	 * @param {Quaternion} q the quaternion to continue rotating by
	 * @param {Boolean} inplace use this or new instance
	 * @param {Boolean} renormalize normalize the result
	 */
	compose(q, inplace=true, renormalize=true)
	{
		//TODO: done
		var ret = this;
		if (!inplace)
			ret = new Quaternion();

		ret.set(
			q.w*this.w - q.x*this.x - q.y*this.y - q.z*this.z, 
			q.x*this.w + q.w*this.x + q.y*this.z - q.z*this.y, 
			q.w*this.y - q.x*this.z + q.y*this.w + q.z*this.x, 
			q.w*this.z + q.x*this.y - q.y*this.x + q.z*this.w
		);

		if (renormalize)
			ret.renormalize();

		return ret;
	}

	/**
	 * apply the rotation represented by this quaternion to the input quaternion "q"
	 * @param {Quaternion} q 
	 * @note this * q * this.inverse()
	 */
	applyRotation(q) // this * q * this.inverse(), i.e. apply this quaternion to another
	{
		//TODO: done
		return Quaternion.composition([this.inverse(), q, this]);
	}

	/**
	 * rotate by quaternion "q", but in local space
	 * treat q's axis as if it is in local space
	 * rotate q's axis by this quaternion to find it in world space
	 * then compose the rotated q with this quaternion
	 * @param {Quaternion} q 
	 * @param {Boolean} inplace 
	 */
	localCompose(q, inplace=true)
	{
		//TODO: done
		var t = this.applyRotation(q);
		return this.compose(t, inplace);
	}

	// return a string representation of this quaternion
	// something like "Quaternion (w, x, y, z)" but with the numerical values...
	toString()
	{
		//TODO: done
		return `Quaternion(${this.w},  ${this.x}, ${this.y}, ${this.z})`;
	}

	// input vector "v"
	// returns a pure quaternion (i.e. one with w-value 0) and with x y z values equal to v's
	// HINT: don't use "new Quaternion(0, v.x, v.y, v.z)", w does not equal the input angle
	// instead make a new quaternion and then use its "set" function before returning it
	static fromVector(v)
	{
		//TODO: done
		var ret = new Quaternion();
		return ret.set(0, v.x, v.y, v.z);
	}

	// given a list of quaternions, compose them chronologically
	// i.e. given [q1, q2, q3] return q3 * q2 * q1
	// HINT1: the "compose" function multiplies a new quaternion in from the left
	// HINT2: make sure the "renormalize" input for any "compose" calls is false
	// because we might be rotating a non-normalized pure quaternion if we're rotating a vector!
	static composition(quats) // given q1, q2, q3 returns q3 * q2 * q1
	{
		//TODO: done
		var q = quats[0];
		for (var i=1; i<quats.length; ++i)
			q = q.compose(quats[i], false, false);
		return q;
	}
}

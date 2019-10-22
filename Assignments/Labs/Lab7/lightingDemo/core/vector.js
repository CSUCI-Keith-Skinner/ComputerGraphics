class Vector
{
	constructor (x=0, y=0, z=0)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	set(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	add(v, inplace=true)
	{
		if (inplace)
		{
			this.x += v.x;
			this.y += v.y;
			this.z += v.z;
		}
		else
		{
			return new Vector(this.x+v.x, this.y+v.y, this.z+v.z);
		}
	}

	subtract(v, inplace=true)
	{
		if (inplace)
		{
			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;
		}
		else
		{
			return new Vector(this.x-v.x, this.y-v.y, this.z-v.z);
		}
	}

	scale(v, inplace=true)
	{
		if (inplace)
		{
			this.x *= v.x;
			this.y *= v.y;
			this.z *= v.z;
		}
		else
		{
			return new Vector(this.x*v.x, this.y*v.y, this.z*v.z);
		}
	}

	inverse()
	{
		return new Vector(-this.x, -this.y, -this.z);
	}

	magnitude()
	{
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	}

	rotate(q, inplace=true)
	{
		var pureQuat = Quaternion.fromVector(this);
		pureQuat = q.applyRotation(pureQuat);
		if (inplace)
		{
			this.x = pureQuat.x;
			this.y = pureQuat.y;
			this.z = pureQuat.z;
		}
		else
		{
			return Vector.fromQuaternion(pureQuat);
		}
	}

	normalize(inplace=true)
	{
		var mag = this.magnitude();
		if (mag==0)
		{
			return this;
		}
		if (inplace)
		{
			this.x /= mag;
			this.y /= mag;
			this.z /= mag;
		}
		else
		{
			return new Vector(this.x/mag, this.y/mag, this.z/mag);
		}
	}

	toString()
	{
		return "Vector("+this.x.toString() + "," + this.y.toString() + "," + this.z.toString() + ")";
	}

	toArray()
	{
		return [this.x, this.y, this.z];
	}

	static sum(vectors)
	{
		var x = 0;
		var y = 0;
		var z = 0;
		for (var i = 0; i < vectors.length; i++)
		{
			x += vectors[i].x;
			y += vectors[i].y;
			z += vectors[i].z;
		}
		return new Vector(x, y, z);
	}

	static cross(v1, v2)
	{
		return new Vector(v1.y*v2.z - v1.z*v2.y, v1.z*v2.x - v1.x*v2.z, v1.x*v2.y - v1.y*v2.x);
	}

	static dot(v1, v2)
	{
		return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
	}

	// returns vector axis of quaternion
	static fromQuaternion(q)
	{
		return new Vector(q.x, q.y, q.z);
	}
}
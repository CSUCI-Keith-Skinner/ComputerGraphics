class Matrix
{
	static identity()
	{
		return new Float32Array([1, 0, 0, 0,
								 0, 1, 0, 0,
								 0, 0, 1, 0,
								 0, 0, 0, 1]);
	}

	static translation(vector)
	{
		return new Float32Array([1,        0,        0,        0,
								 0,        1,        0,        0,
								 0,        0,        1,        0, 
								 vector.x, vector.y, vector.z, 1]);
	}

	static rotation(quat)
	{
		var v1 = new Vector(1, 0, 0);
		var v2 = new Vector(0, 1, 0);
		var v3 = new Vector(0, 0, 1);

		v1.rotate(quat);
		v2.rotate(quat);
		v3.rotate(quat);

		return new Float32Array([v1.x, v1.y, v1.z, 0,
								 v2.x, v2.y, v2.z, 0,
								 v3.x, v3.y, v3.z, 0,
								 0,    0,    0,    1]);
	}

	static scale(vector)
	{
		return new Float32Array([vector.x, 0,        0,        0,
								 0,        vector.y, 0,        0,
								 0,        0,        vector.z, 0,
								 0,        0,        0,        1]);
	}

	static mul(mat1, mat2)
	{
		return new Float32Array([mat1[0]*mat2[0] + mat1[4]*mat2[1] + mat1[8]*mat2[2] + mat1[12]*mat2[3],
			                     mat1[1]*mat2[0] + mat1[5]*mat2[1] + mat1[9]*mat2[2] + mat1[13]*mat2[3],
			                     mat1[2]*mat2[0] + mat1[6]*mat2[1] + mat1[10]*mat2[2] + mat1[14]*mat2[3],
			                     mat1[3]*mat2[0] + mat1[7]*mat2[1] + mat1[11]*mat2[2] + mat1[15]*mat2[3],
			                     mat1[0]*mat2[4] + mat1[4]*mat2[5] + mat1[8]*mat2[6] + mat1[12]*mat2[7],
			                     mat1[1]*mat2[4] + mat1[5]*mat2[5] + mat1[9]*mat2[6] + mat1[13]*mat2[7],
			                     mat1[2]*mat2[4] + mat1[6]*mat2[5] + mat1[10]*mat2[6] + mat1[14]*mat2[7],
			                     mat1[3]*mat2[4] + mat1[7]*mat2[5] + mat1[11]*mat2[6] + mat1[15]*mat2[7],
			                     mat1[0]*mat2[8] + mat1[4]*mat2[9] + mat1[8]*mat2[10] + mat1[12]*mat2[11],
			                     mat1[1]*mat2[8] + mat1[5]*mat2[9] + mat1[9]*mat2[10] + mat1[13]*mat2[11],
			                     mat1[2]*mat2[8] + mat1[6]*mat2[9] + mat1[10]*mat2[10] + mat1[14]*mat2[11],
			                     mat1[3]*mat2[8] + mat1[7]*mat2[9] + mat1[11]*mat2[10] + mat1[15]*mat2[11],
			                     mat1[0]*mat2[12] + mat1[4]*mat2[13] + mat1[8]*mat2[14] + mat1[12]*mat2[15],
			                     mat1[1]*mat2[12] + mat1[5]*mat2[13] + mat1[9]*mat2[14] + mat1[13]*mat2[15],
			                     mat1[2]*mat2[12] + mat1[6]*mat2[13] + mat1[10]*mat2[14] + mat1[14]*mat2[15],
			                     mat1[3]*mat2[12] + mat1[7]*mat2[13] + mat1[11]*mat2[14] + mat1[15]*mat2[15]]);
	}

	static prod(mats)
	{
		var mat = mats[0];
		for (var i = 1; i < mats.length; i++)
		{
			mat = Matrix.mul(mat, mats[i]);
		}
		return mat;
	}

	static world(position, rotation, scale)
	{
		var mat = Matrix.translation(position);
		mat = Matrix.mul(mat, Matrix.rotation(rotation));
		mat = Matrix.mul(mat, Matrix.scale(scale));
		return mat;
	}

	static view(eye, target, up)
	{
		var Z = eye.subtract(target, false);
		Z.normalize();
		var X = Vector.cross(up, Z);
		X.normalize();
		var Y = Vector.cross(Z, X);
		Y.normalize();

		return new Float32Array([
			X.x,                 Y.x,                 Z.x,                   0,
			X.y,                 Y.y,                 Z.y,                   0,
			X.z,                 Y.z,                 Z.z,                   0,
			-Vector.dot(X, eye), -Vector.dot(Y, eye), -Vector.dot(Z, eye),   1
		]);
	}

	static perspective(viewRadians=Math.PI/4, aspect=1, near=0.1, far=1000.0)
	{
		var f = 1 / Math.tan(viewRadians/2);
		var n = 1 / (near - far);
		return new Float32Array([
			f/aspect, 0, 0,             0,
			0,        f, 0,             0,
			0,        0, (near+far)*n,  -1,
			0,        0, 2*near*far*n,  0
		]);
	}

	static orthographic(left=-2, right=2, bottom=-2, top=2, near=0.1, far=1000.0)
	{
		var lr = 1/(left-right);
		var bt = 1/(bottom-top);
		var nf = 1/(near-far);
		return new Float32Array([
			-2*lr,           0,               0,             0,
			0,               -2*bt,           0,             0,
			0,               0,               2*nf,          0,
			(left+right)*lr, (top+bottom)*bt, (near+far)*nf, 1
		]);
	}
}
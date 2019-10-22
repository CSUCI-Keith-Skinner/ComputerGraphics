class Cube
{
	// type is 'RGB', 'textureRepeat', 'textureCube', or 'cubeMap'
	// fill is 'axis', an RGB vector, or a function deriving color from position xyz and/or normal xyz, or a custom array if RGB type
	// otherwise fill is the image ID
	static create(gl, program, type='RGB', fill='axis', flip=false)
	{
		var pos = Cube.positionArray();
		var ind;
		var norm = Cube.normalArray();
		var col;
		if (type=='RGB')
		{
			ind = Cube.indexArray();
			if (fill=='axis')
			{
				col = Cube.axisColorArray();
			}
			else if (fill instanceof Vector)
			{
				col = Cube.constColorArray(fill.x, fill.y, fill.z);
			}
			else if (typeof(fill)=='function')
			{
				col = Cube.derivedColorArray(fill, pos, norm);
			}
			else
			{
				col = fill;
			}
			return new RGBMesh(gl, program, pos, ind, norm, col);
		}
		else if (type=='textureRepeat')
		{
			ind = Cube.indexArray();
			col = Cube.uvRepeatArray();
			return new UVMesh(gl, program, pos, ind, norm, col, fill, flip);
		}
		else if (type=='cubeMap')
		{
			ind = Cube.cubeMapIndexArray();
			col = Cube.cubeMapUVArray();
			return new UVMesh(gl, program, pos, ind, norm, col, fill, flip);
		}
	}

	static positionArray()
	{
		return [
			// top			
			-0.5, 0.5, -0.5,
			0.5, 0.5, -0.5, 
			0.5, 0.5, 0.5,  
			-0.5, 0.5, 0.5, 
			// bottom
			-0.5, -0.5, -0.5,
			-0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,
			0.5, -0.5, -0.5,
			// right
			-0.5, -0.5, -0.5,
			-0.5, 0.5, -0.5, 
			-0.5, 0.5, 0.5,		 
			-0.5, -0.5, 0.5, 
			// left
			0.5, -0.5, -0.5,
			0.5, -0.5, 0.5, 
			0.5, 0.5, 0.5,		 
			0.5, 0.5, -0.5, 
			// back
			-0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,
			0.5, 0.5, -0.5, 
			-0.5, 0.5, -0.5,
			// front
			-0.5, -0.5, 0.5,
			-0.5, 0.5, 0.5, 
			0.5, 0.5, 0.5, 		
			0.5, -0.5, 0.5
		];
	}

	static indexArray()
	{
		return [
			// top
			0, 2, 1,
			0, 3, 2,
			// bottom
			4, 6, 5,
			4, 7, 6,
			// right
			8, 10, 9,
			8, 11, 10,
			// left
			12, 14, 13,
			12, 15, 14,
			// back
			16, 18, 17,
			16, 19, 18,
			// front
			20, 22, 21,
			20, 23, 22
		];
	}

	static cubeMapIndexArray()
	{
		return [
			// top
			0, 1, 2,
			0, 2, 3,
			// bottom
			4, 5, 6,
			4, 6, 7,
			// right
			8, 9, 10,
			8, 10, 11,
			// left
			12, 13, 14,
			12, 14, 15,
			// back
			16, 17, 18,
			16, 18, 19,
			// front
			20, 21, 22,
			20, 22, 23
		];
	}

	static normalArray()
	{
		return [	
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,

			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,

			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,

			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];
	}

	static axisColorArray() 
	{
		return [
			// top / bottom is green
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			// left / right is red
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
	 		1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
	 		1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			// front / back is blue
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
	 		0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,

			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
	 		0.0, 0.0, 1.0,
			0.0, 0.0, 1.0
		];
	}

	static constColorArray(R,G,B)
	{
		var arr = [];
		for (var i = 0; i < 24; i++)
		{
			arr.push(R);
			arr.push(G);
			arr.push(B);
		}
		return arr;
	}

	// func should take 6 numbers and return a list of 3 numbers
	static derivedColorArray(func, pos, norm)
	{
		var colArray = [];
		var px;
		var py;
		var pz;
		var nx;
		var ny;
		var nz;
		var RGB;
		for (var i = 0; i < pos.length; i+=3)
		{
			px = pos[i];
			py = pos[i+1];
			pz = pos[i+2];
			nx = norm[i];
			ny = norm[i+1];
			nz = norm[i+2];
			RGB = func(px,py,pz,nx,ny,nz);
			colArray.push(RGB[0]);
			colArray.push(RGB[1]);
			colArray.push(RGB[2]);
		}
		return colArray;
	}

	static uvRepeatArray()
	{
		return [
			// top
			0, 1,
			1, 1,
			1, 0,
			0, 0,
			// bottom
			0, 0,
			0, 1,
			1, 1,
			1, 0,
			// right
			0, 0,
			0, 1,
			1, 1,
			1, 0,
			// left
			1, 0,
			0, 0,
			0, 1,
			1, 1,
			// back
			1, 0,
			0, 0,
			0, 1,
			1, 1,
			// front
			0, 0,
			0, 1,
			1, 1,
			1, 0
		];
	}

	static cubeMapUVArray()
	{
		return [
			// top
			0.5, 1,
			0.25, 1,
			0.25, 0.66,
			0.5, 0.66,
			// bottom
			0.5, 0,
			0.5, 0.34,
			0.25, 0.34,
			0.25, 0,
			// right
			0.75, 0.34,
			0.75, 0.66,
			0.5, 0.66,
			0.5, 0.34,
			// left
			0, 0.34,
			0.25, 0.34,
			0.25, 0.66,
			0, 0.66,
			// back
			0.75, 0.34,
			1, 0.34,
			1, 0.66,
			0.75, 0.66,
			// front
			0.5, 0.34,
			0.5, 0.66,
			0.25, 0.66,
			0.25, 0.34
		];
	}
}

class Sphere
{
	static create(gl, program, latBands=30, longBands=30, type='RGB', fill='axis', flip=false)
	{
		var pos = Sphere.positionArray(latBands, longBands);
		var nVert = pos.length / 3;
		var ind = Sphere.indexArray(latBands, longBands);
		var norm = pos;//Sphere.normalArray(latBands, longBands);
		var col;
		if (type=='RGB')
		{
			if (fill=='axis')
			{
				col = Sphere.axisColorArray();
			}
			else if (fill instanceof Vector)
			{
				col = Sphere.constColorArray(fill.x, fill.y, fill.z, nVert);
			}
			else if (typeof(fill)=='function')
			{
				col = Sphere.derivedColorArray(fill, pos, norm);
			}
			else
			{
				col = fill;
			}
			return new RGBMesh(gl, program, pos, ind, norm, col);
		}
		else if (type=='UV')
		{
			col = Sphere.uvArray(latBands, longBands);
			return new UVMesh(gl, program, pos, ind, norm, col, fill, flip);
		}
	}

	static positionArray(latBands, longBands)
	{
		var pos = [];
		for (var lat = 0; lat <= latBands; lat++)
		{
			var theta = lat * Math.PI / latBands;
			var sinTheta = Math.sin(theta);
			var cosTheta = Math.cos(theta);

			for (var long = 0; long <= longBands; long++)
			{
				var phi = long * 2 * Math.PI / longBands;
				var sinPhi = Math.sin(phi);
				var cosPhi = Math.cos(phi);

				var x = sinTheta * cosPhi;
				var y = cosTheta;
				var z = sinTheta * sinPhi;

				pos.push(x);
				pos.push(y);
				pos.push(z);
			}
		}
		return pos;
	}

	static indexArray(latBands, longBands)
	{
		var ind = [];
		for (var lat = 0; lat < latBands; lat++)
		{
			for (var long = 0; long < longBands; long++)
			{
				var topLeftIndex = lat * (longBands + 1) + long;
				var topRightIndex = topLeftIndex + 1;
				var bottomLeftIndex = topLeftIndex + longBands + 1;
				var bottomRightIndex = bottomLeftIndex + 1;

				// top left triangle
				ind.push(topLeftIndex);
				ind.push(topRightIndex);
				ind.push(bottomLeftIndex);

				// bottom right triangle
				ind.push(bottomLeftIndex);
				ind.push(topRightIndex);
				ind.push(bottomRightIndex);
			}
		}
		return ind;
	}

	static axisColorArray(posArray)
	{
		col = [];
		for (var i = 0; i < pos.length; i+=3)
		{
			col.push(abs(posArray[i]));
			col.push(abs(posArray[i+1]));
			col.push(abs(posArray[i+2]));
		}
		return col;
	}

	static constColorArray(R,G,B,nVert)
	{
		var col = [];
		for (var i = 0; i < nVert; i++)
		{
			col.push(R);
			col.push(G);
			col.push(B);
		}
		return col;
	}

	static derivedColorArray(func, pos, norm)
	{
		var colArray = [];
		var px;
		var py;
		var pz;
		var nx;
		var ny;
		var nz;
		var RGB;
		for (var i = 0; i < pos.length; i+=3)
		{
			px = pos[i];
			py = pos[i+1];
			pz = pos[i+2];
			nx = norm[i];
			ny = norm[i+1];
			nz = norm[i+2];
			RGB = func(px,py,pz,nx,ny,nz);
			colArray.push(RGB[0]);
			colArray.push(RGB[1]);
			colArray.push(RGB[2]);
		}
		return colArray;
	}

	static uvArray(latBands, longBands)
	{
		var uvArray = [];
		var u;
		var v;
		for (var lat = 0; lat <= latBands; lat++)
		{
			v = lat / latBands;
			for (var long = 0; long <= longBands; long++)
			{
				u = long / longBands;
				uvArray.push(u);
				uvArray.push(v);
			}
		}
		return uvArray;
	}
}
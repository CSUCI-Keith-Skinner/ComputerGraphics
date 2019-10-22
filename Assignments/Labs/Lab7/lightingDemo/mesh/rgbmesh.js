class RGBMesh extends Mesh
{
	// constructor(gl, program, positionArray, indexArray, normalArray, diffuse, specular, ambient, shininess, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	// {
	// 	var material = new RGBMaterial(gl, program, diffuse, specular, ambient, shininess);
	// 	super(gl, program, positionArray, indexArray, normalArray, material, position, rotation, scale);
	// }

	constructor(gl, program, positionArray, indexArray, normalArray, material, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(gl, program, positionArray, indexArray, normalArray, material, position, rotation, scale);
	}
}
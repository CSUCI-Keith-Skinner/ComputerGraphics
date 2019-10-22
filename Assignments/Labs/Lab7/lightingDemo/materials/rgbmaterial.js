class RGBMaterial
{
	constructor(gl, program, diffuse=new Vector(1,1,1), specular=new Vector(1,1,1), ambient=new Vector(1,1,1), shininess=0.3)
	{
		// TODO store gl and program as fields


		// TODO store material attributes (diffuse, specular, ambient, shininess) as fields
		// HINT the attributes (other than shininess) are provided as vectors, but we want to store them as Float32Arrays.
		// The Vector class has a toArray() function for this purpose.


		// TODO store locations of Uniforms holding material attributes in the shader (look in the shader for their names)


	}

	activate()
	{
		// TODO update set the values of material uniforms in the shader program
		// HINT: diffuse, specular, and ambient are all 3 floats stored in a single array,
		// so use the webgl context's uniform3fv function.
		// shininess is a single float, so use uniform1f.

		
	}
}
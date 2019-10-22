class UVMaterial
{
	// unlike RGBMaterial, diffuse speculart and ambient are all floats
	constructor(gl, program, imageID, flipTexture, diffuse=1.0, specular=1.0, ambient=1.0, shininess=1.0)
	{
		// TODO store gl and program as fields


		// TODO store material attributes (diffuse, specular, ambient, shininess) as fields


		// TODO store locations of Uniforms holding material attributes in the shader (look in the shader for their names)


		// TODO create, bind, set paramaters for texture object (see UVMesh from previous labs)
		// don't forget to unbind the texture when you're done!


	}

	activate()
	{
		// TODO update set the values of material uniforms in the shader program
		// HINT: material parameters here are single floats, so use the gl context's uniform1f function


		// TODO bind the texture


	}

	post_draw()
	{
		// TODO unbind the texture

		
	}
}
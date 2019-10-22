class UVMaterial
{
	// unlike RGBMaterial, diffuse speculart and ambient are all floats
	constructor(gl, program, imageID, flipTexture, diffuse=1.0, specular=1.0, ambient=1.0, shininess=1.0)
	{
		// TODO : DONE : store gl and program as fields
		this.gl = gl;
		this.program = program;

		// TODO : DONE : store material attributes (diffuse, specular, ambient, shininess) as fields
		this.diffuse = diffuse;
		this.specular = specular;
		this.ambient = ambient;
		this.shininess = shininess;

		// TODO : DONE : store locations of Uniforms holding material attributes in the shader (look in the shader for their names)
		this.diffuseUniformLocation = this.gl.getUniformLocation(program, 'material.diffuse');
		this.specularUniformLocation = this.gl.getUniformLocation(program, 'material.specular');
		this.ambientUniformLocation = this.gl.getUniformLocation(program, 'material.ambient');
		this.shininessUniformLocation = this.gl.getUniformLocation(program, 'material.shininess');

		// TODO : DONE : create, bind, set paramaters for texture object (see UVMesh from previous labs)
		// don't forget to unbind the texture when you're done!
		this.textureObject = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.textureObject);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById(imageID));
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	}

	activate()
	{
		// TODO : DONE : update set the values of material uniforms in the shader program
		// HINT: material parameters here are single floats, so use the gl context's uniform1f function
		this.gl.uniform1f(this.diffuseUniformLocation, this.diffuse);
		this.gl.uniform1f(this.specularUniformLocation, this.specular);
		this.gl.uniform1f(this.ambientUniformLocation, this.ambient);
		this.gl.uniform1f(this.shininessUniformLocation, this.shininess);

		// TODO : DONE : bind the texture
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureObject);
	}

	post_draw()
	{
		// TODO unbind the texture
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
		
	}
}

// TRANSFORM CLASS DESCRIPTION:
/*
	The Transform class will embody and manipulate position, rotation and scale
	(and the corresponding transformation matrices).
*/

// TRANSFORM CLASS FIELDS:
// 		position (Vector) : the position of the transform in a 3D space
// 		rotation (Quaternion) : the rotation of the transform
// 		scale (Vector) : the scale of the transform
// 		mTranslate (Float32Array(16)) : the translation matrix corresponding to the position vector
// 		mRotate (Float32Array(16)) : the rotation matrix corresponding to the rotation quaternion
// 		mScale (Float32Array(16)) : the scale matrix corresponding to the scale vector
// 		mWorld (Float32Array(16)) : the world transform, i.e. mTranslate * mRotate * mScale
// 		hasMoved (boolean) : has the position changed since the translation matrix was last updated?
// 		hasRotated (boolean) : ...
// 		hasScaled (boolean) : ...
// 		needsUpdate (boolean) : have the position, rotation or scale changed since the world matrix was last updated?

const Vector = require('./vector');
const Matrix = require('./matrix');
const Quaternion = require('./quaternion');
class Transform
{
	// set up a transform with the desired position, rotation and scale.
	// calculate and store the corresponding matrices (mTranslate, mRotate, and mScale).
	// calculate and store the world matrix (mWorld).
	// initiate the booleans (hasMoved, hasRotated, hasScaled, needsUpate) to false.
	constructor (position=new Vector(), rotation=new Quaternion(), scale=new Vector(1, 1, 1))
	{
		//TODO: Done
		this.position = position;
		this.rotation = rotation;
		this.scale = scale;
		this.updateTranslationMatrix()
			.updateRotationMatrix()
			.updateScaleMatrix()
			.updateWorldMatrix();
	}

	// set this transform's position to the input vector.
	// set the necessary booleans (hasMoved and needsUpdate) to true.
	setPosition(vector)
	{
		//TODO: Done
		this.position = vector;
		this.hasMoved = true;
		this.needsUpdate = true;
		return this;
	}

	// set this transform's rotation to the input quaternion.
	// set the necessary booleans (hasRotated and needsUpdate) to true.
	setRotation(quat)
	{
		//TODO: Done
		this.rotation = quat;
		this.hasRotated = true;
		this.needsUpdate = true;
		return this;
	}

	// set this transform's scale to the input vector.
	// set the necessary booleans (hasScaled and needsUpdate) to true.
	setScale(scale)
	{
		//TODO: done
		this.scale = scale;
		this.hasScaled = true;
		this.needsUpdate = true;
		return this;
	}

	// translate by the input vector (i.e. add the input vector to the position)
	// update necessary booleans...
	translate(vector)
	{
		//TODO: done
		return this.setPosition(this.position.add(vector, false));
	}

	// rotate by the input quaternion (i.e. compose the input quaternion with the rotation)
	// update necessary booleans...
	rotate(quat)
	{
		//TODO: done
		return this.setRotation(this.rotation.compose(quat));
	}

	// rotate by the input quaternion in local space
	// update necessary booleans...
	localRotate(quat)
	{
		//TODO: done
		return this.setRotation(this.rotation.localCompose(quat));
	}

	// rotate the position vector about the vector "point" by the input quaternion "quat"
	// also compose "quat" with the rotation
	// update necessary booleans...
	rotateAround(point, quat)
	{
		//TODO:
		this.rotation.compose(quat, true);
		this.position.subtract(point, true);
		this.position.rotate(quat, true);
		this.hasRotated;
		this.hasMoved;
		this.needsUpdate;
		
	}

	// scale the x, y and z components of this transform's scale by those of the input vector
	// update necessary booleans...
	scaleBy(vector)
	{
		//TODO: done
		return this.scale.scale(vector);
	}

	// update mTranslate so it reflects this transform's position
	// set hasMoved to false, as any movements have now been incorporated
	updateTranslationMatrix()
	{
		//TODO: done
		this.mTranslate = Matrix.translation(this.position);
		this.hasMoved = false;
		return this;
	}

	// update mRotate so it reflects the transform's rotation
	// update necessary boolean(s)
	updateRotationMatrix()
	{
		//TODO: done
		this.mRotate = Matrix.rotation(this.rotation);
		this.hasRotated = false;
		return this;
	}

	// update mScale so it reflects the transform's scale
	// update necessary booleans...
	updateScaleMatrix()
	{
		//TODO: done
		this.mScale = Matrix.scale(this.scale);
		this.hasScaled = false;
		return this;
	}

	// update the world matrix to the product mTranslate * mRotate * mScale
	// set needsUpdate to false, as all transformation changes are now incorporated
	updateWorldMatrix()
	{
		//TODO: done
		this.mWorld = Matrix.world(this.position, this.rotation, this.scale);
		this.needsUpdate = false;
		return this;
	}

	// if needsUpdate is false, don't do anything; no update is needed
	// if needsUpdate is true, then:
	// 		if necessary, update mTranslate
	//		if necessary, update mRotate
	//		if necessary, update mScale
	//		update the mWorld
	// HINTS: how do we know if each update is necessary?
	//		  what methods do we need to call to update them?
	//		  do we need to update any booleans explicitly here?
	update()
	{
		//TODO: done
		if (!this.needsUpdate)
			return this;
		if (this.hasMoved)
			this.updateTranslationMatrix();
		if (this.hasRotated)
			this.updateRotationMatrix();
		if (this.hasScaled)
			this.updateScaleMatrix();
		return this.updateWorldMatrix();
	}
}
module.exports = Transform;

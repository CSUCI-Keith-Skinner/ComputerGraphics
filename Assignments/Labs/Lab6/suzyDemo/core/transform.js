class Transform
{
	constructor (position=new Vector(), rotation=new Quaternion(), scale=new Vector(1, 1, 1))
	{
		this.position = position;
		this.rotation = rotation;
		this.scale = scale;

		this.mTranslate = Matrix.translation(position);
		this.mRotate = Matrix.rotation(rotation);
		this.mScale = Matrix.scale(scale);

		this.mWorld = Matrix.prod([this.mTranslate, this.mRotate, this.mScale]);

		this.hasMoved = false;
		this.hasRotated = false;
		this.hasScaled = false;
		this.needsUpdate = false;
	}

	setPosition(vector)
	{
		this.position = vector;
		this.hasMoved = true;
		this.needsUpdate = true;
	}

	setRotation(quat)
	{
		this.rotation = quat;
		this.hasRotated = true;
		this.needsUpdate = true;
	}

	setScale(scale)
	{
		this.scale = scale;
		this.hasScaled = true;
		this.needsUpdate = true;
	}

	translate(vector)
	{
		this.position.add(vector);
		this.hasMoved = true;
		this.needsUpdate = true;
	}

	rotate(quat)
	{
		this.rotation.compose(quat);
		this.hasRotated = true;
		this.needsUpdate = true;
	}

	localRotate(quat)
	{
		this.rotation.localCompose(quat);
		this.hasRotated = true;
		this.needsUpdate = true;
	}

	rotateAround(point, quat)
	{
		this.position.subtract(point);
		this.position.rotate(quat);
		this.position.add(point);
		this.hasMoved = true;

		this.rotation.compose(quat);
		this.hasRotated = true;
		this.needsUpdate = true;
	}

	scaleBy(vector)
	{
		this.scale.scale(vector);
	}

	updateTranslationMatrix()
	{
		this.mTranslate = Matrix.translation(this.position);
		this.hasMoved = false;
	}

	updateRotationMatrix()
	{
		this.mRotate = Matrix.rotation(this.rotation);
		this.hasRotated = false;
	}

	updateScaleMatrix()
	{
		this.mScale = Matrix.scale(this.scale);
		this.hasScaled = false;
	}

	updateWorldMatrix()
	{
		this.mWorld = Matrix.prod([this.mTranslate, this.mRotate, this.mScale]);
		this.needsUpdate = false;
	}

	update()
	{
		if (this.needsUpdate)
		{
			if (this.hasMoved)
			{
				this.updateTranslationMatrix();
			}
			if (this.hasRotated)
			{
				this.updateRotationMatrix();
			}
			if (this.hasScaled)
			{
				this.updateScaleMatrix();
			}
			this.updateWorldMatrix();
		}
	}
}
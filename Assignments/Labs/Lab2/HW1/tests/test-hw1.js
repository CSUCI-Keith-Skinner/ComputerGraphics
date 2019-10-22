// TRANSFORM

console.log("Testing Transform.constructor with default values");

console.log("	Constructing a new Transform...");
var t = new Transform();
var id = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

console.log("	Position is",t.position.toString());
console.log("	Position should be a vector with components (0,0,0)");
console.log("	Rotation is",t.rotation.toString());
console.log("	Rotation should be a quaternion with components (1,0,0,0)");
console.log("	Scale is",t.scale.toString());
console.log("	Scale should be a vector with components (1,1,1)");
console.log("	Translation matrix is",t.mTranslate);
console.log("	Translation matrix should be",id);
console.log("	Rotation matrix is",t.mRotate);
console.log("	Rotation matrix should be",id);
console.log("	Scale matrix is",t.mScale);
console.log("	Scale matrix should be",id);
console.log("	World matrix is",t.mWorld);
console.log("	World matrix should be",id);
console.log("	hasMoved is",t.hasMoved,"(should be false)");
console.log("	hasRotated is",t.hasRotated,"(should be false)");
console.log("	hasScaled is",t.hasScaled,"(should be false)");
console.log("	needsUpdate is",t.needsUpdate,"(should be false)");


console.log("Testing constructor with custom values");

var position = new Vector(1,2,3);
var rotation = new Quaternion(5*Math.PI/3,3,4,5);
var scale = new Vector(8,5,2);

console.log("Constructing a new Transform...");
t = new Transform(position, rotation, scale);

console.log("	Position is",t.position.toString());
console.log("	Position should be a vector with components (1,2,3)");
console.log("	Rotation is",t.rotation.toString());
console.log("	Rotation should be a quaternion with components (-0.866, 0.212, 0.282, 0.353)");
console.log("	Scale is",t.scale.toString());
console.log("	Scale should be a vector with components (8,5,2)");
console.log("	Translation matrix is",t.mTranslate);
console.log("	Translation matrix should be",new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1]));
console.log("	Rotation matrix is",t.mRotate);
console.log("	Rotation matrix should be",new Float32Array([0.5899999737739563, -0.49237242341041565, 0.6398979425430298, 0, 0.7323724627494812, 0.6600000262260437, -0.16742345690727234, 0, -0.3398979604244232, 0.5674234628677368, 0.75, 0, 0, 0, 0, 1]));
console.log("	Scale matrix is",t.mScale);
console.log("	Scale matrix should be",new Float32Array([8, 0, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1]));
console.log("	World matrix is",t.mWorld);
console.log("	World matrix should be",new Float32Array([4.71999979019165, -3.938979387283325, 5.119183540344238, 0, 3.661862373352051, 3.3000001907348633, -0.8371173143386841, 0, -0.6797959208488464, 1.1348469257354736, 1.5, 0, 1, 2, 3, 1]));
console.log("	hasMoved is",t.hasMoved,"(should be false)");
console.log("	hasRotated is",t.hasRotated,"(should be false)");
console.log("	hasScaled is",t.hasScaled,"(should be false)");
console.log("	needsUpdate is",t.needsUpdate,"(should be false)");


console.log("Testing Transform.setPosition");

t = new Transform();
position = new Vector(1,2,3);
console.log("	Setting position...");
t.setPosition(position);

console.log("	Position is",t.position.toString());
console.log("	Position should be a vector with components (1,2,3)");
console.log("	Translation matrix is",t.mTranslate);
console.log("	Translation matrix should be the identity (it should not have updated yet)");
console.log("	hasMoved is",t.hasMoved,"(should be true)");
console.log("	needsUpdate is",t.needsUpdate,"(should be true)");


console.log("Testing Transform.translate");

t = new Transform();
position = new Vector(1,2,3);
console.log("	Translating...");
t.translate(position);

console.log("	Position is",t.position.toString());
console.log("	Position should be a vector with components (1,2,3)");
console.log("	Translation matrix is",t.mTranslate);
console.log("	Translation matrix should be the identity (it should not have updated yet)");
console.log("	hasMoved is",t.hasMoved,"(should be true)");
console.log("	needsUpdate is",t.needsUpdate,"(should be true)");


console.log("Testing Transform.updateTranslationMatrix");

t = new Transform();
position = new Vector(1,2,3);
t.translate(position);
console.log("	Updating the translation matrix...");
t.updateTranslationMatrix();

console.log("	Translation matrix is",t.mTranslate);
console.log("	Translation matrix should be",new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1]));
console.log("	hasMoved is",t.hasMoved,"(should be false)");
console.log("	needsUpdate is",t.needsUpdate,"(should still be true)");


console.log("Testing Transform.setRotation");

t = new Transform();
rotation = new Quaternion(Math.PI/2,1,0,0);
console.log("	Setting Rotation...");
t.setRotation(rotation);

console.log("	Rotation is",t.rotation.toString());
console.log("	Rotation should be a quaternion with components (0.7071067811865476, 0.7071067811865475, 0, 0)");
console.log("	Rotation matrix is",t.mRotate);
console.log("	Rotation matrix should be the identity (it should not have updated yet)");
console.log("	hasRotated is",t.hasRotated,"(should be true)");
console.log("	needUpdate is",t.needsUpdate,"(should be true)");


console.log("Testing Transform.rotate");

t = new Transform();
rotation = new Quaternion(Math.PI/2,1,0,0);
console.log("	Rotating...");
t.rotate(rotation);

console.log("	Rotation is",t.rotation.toString());
console.log("	Rotation should be a quaternion with components (0.7071067811865476, 0.7071067811865475, 0, 0)");
console.log("	Rotation matrix is",t.mRotate);
console.log("	Rotation matrix should be the identity (it should not have updated yet)");
console.log("	hasRotate is",t.hasRotated,"(should be true)");
console.log("	needUpdate is",t.needsUpdate,"(should be true)");


console.log("Testing Transform.localRotate");

t = new Transform();
rotation = new Quaternion(Math.PI/2,1,0,0);
t.rotate(rotation);
rotation = new Quaternion(Math.PI/2,0,1,0);
console.log("	Rotating about local axis...");
t.localRotate(rotation)

console.log("	Rotation is",t.rotation.toString());
console.log("	Rotation should be a quaternion with components (0.5, 0.5, 0.5, 0.5)");
console.log("	Rotation matrix is",t.mRotate);
console.log("	Rotation matrix should be the identity (it should not have updated yet)");
console.log("	hasRotate is",t.hasRotated,"(should be true)");
console.log("	needUpdate is",t.needsUpdate,"(should be true)");


console.log("Testing Transform.updateRotationMatrix");

t = new Transform();
rotation = new Quaternion(Math.PI/2,1,0,0);
t.setRotation(rotation);
console.log("	Updating rotation matrix...");
t.updateRotationMatrix();

console.log("	Rotation matrix is",t.mRotate);
console.log("	Rotation matrix should be approximately",new Float32Array([1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1]));
console.log("	hasRotated is",t.hasRotated,"(should be false)");
console.log("	needsUpdate is",t.needsUpdate,"(should still be true)");


console.log("Testing Transform.rotateAround");

t = new Transform();
position = new Vector(1,1,1);
rotation = new Quaternion(Math.PI/2,0,0,1);
console.log("	Rotating around a specified point and axis...");
t.rotateAround(position, rotation);

console.log("	Position is",t.position.toString());
console.log("	Position should be a vector with components (2, 0, 0)");
console.log("	Rotation is", t.rotation.toString());
console.log("	Rotation should be a quatenion with components (0.707, 0, 0, 0.707)");
console.log("	hasMoved is",t.hasMoved,"(should be true)");
console.log("	hasRotated is",t.hasRotated,"(should be true)");
console.log("	needsUpdate is",t.needsUpdate,"(should be true)");


console.log("Testing Transform.setScale");

t = new Transform();
scale = new Vector(2,3,4);
console.log("	Setting scale...");
t.setScale(scale);

console.log("	Scale is",t.scale.toString());
console.log("	Scale should be a vector with components (2,3,4)");
console.log("	Scale matrix is",t.mScale);
console.log("	Scale matrix should be the identity (it should not have updated yet)");
console.log("	hasScaled is",t.hasScaled,"(should be true)");
console.log("	needsUpdate is",t.needsUpdate,"(should be true)");


console.log("Testing Transform.scaleBy");

t = new Transform();
scale = new Vector(2,3,4);
t.setScale(scale);
console.log("	Scaling...");
t.scaleBy(scale);

console.log("	Scale is",t.scale.toString());
console.log("	Scale should be a vector with components (4,9,16)");
console.log("	Scale matrix is",t.mScale);
console.log("	Scale matrix should be the identity (it should not have updated yet)");
console.log("	hasScaled is",t.hasScaled,"(should be true)");
console.log("	needsUpdate is",t.needsUpdate,"(should be true)");


console.log("Testing Transform.updateScaleMatrix");

t = new Transform();
scale = new Vector(2,3,4);
t.setScale(scale);
console.log("	Updating scale matrix...");
t.updateScaleMatrix();

console.log("	Scale matrix is",t.mScale);
console.log("	Scale matrix should be",new Float32Array([2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1]));
console.log("	hasScaled is",t.hasScaled,"(should be false)");
console.log("	needsUpdate is",t.needsUpdate,"(should still be true)");


console.log("Testing Transform.updateWorldMatrix");

t = new Transform();
position = new Vector(2, 3, 4);
rotation = new Quaternion(Math.PI/2, 0, 0, 1);
scale = new Vector(5, 6, 7);
t.setPosition(position);
t.setRotation(rotation);
t.setScale(scale);
t.updateTranslationMatrix();
t.updateRotationMatrix();
t.updateScaleMatrix();
console.log("	Updating world matrix...");
t.updateWorldMatrix();

console.log("	World matrix is",t.mWorld);
console.log("	World matrix should be",new Float32Array([0, 5, 0, 0, -6, 0, 0, 0, 0, 0, 7, 0, 2, 3, 4, 1]));
console.log("	needsUpdate is",t.needsUpdate,"(should be false)");


console.log("Testing Transform.update");

t = new Transform();
position = new Vector(2, 3, 4);
rotation = new Quaternion(Math.PI/2, 0, 0, 1);
scale = new Vector(5, 6, 7);
t.setPosition(position);
t.setRotation(rotation);
t.setScale(scale);
console.log("	Running update...");
t.update();

console.log("	World matrix is",t.mWorld);
console.log("	World matrix should be",new Float32Array([0, 5, 0, 0, -6, 0, 0, 0, 0, 0, 7, 0, 2, 3, 4, 1]));
console.log("	needsUpdate is",t.needsUpdate,"(should be false)");

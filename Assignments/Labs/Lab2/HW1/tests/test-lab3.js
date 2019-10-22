// QUATERNION ONLY
console.log("Testing Quaternion.constructor (normalized)");

console.log("	Creating Quaternion for 120 degree rotation about x axis.");
q = new Quaternion(2*Math.PI/3, 1, 0, 0, true);

console.log("	w is",q.w,"(should be about 0.5)");
console.log("	x is",q.x,"(should be about 0.866)");
console.log("	y is",q.y,"(should be 0)");
console.log("	z is",q.z,"(should be 0)");


console.log("Testing Quaternion.constructor (not normalized)");

console.log("	Creating Quaternion for 60 degree rotation about the axis (3,-4,0)");
q = new Quaternion(Math.PI/3, 3, -4, 0);

console.log("	w is",q.w,"(should be about 0.866)");
console.log("	x is",q.x,"(should be about 0.3)");
console.log("	y is",q.y,"(should be about -0.4)");
console.log("	z is",q.z,"(should be 0)");


console.log("Testing Quaternion.set");

console.log("	Setting values (1,2,3,4)");
q.set(1,2,3,4);

console.log("	w is",q.w,"(should be 1)");
console.log("	x is",q.x,"(should be 2)");
console.log("	y is",q.y,"(should be 3)");
console.log("	z is",q.z,"(should be 4)");


console.log("Testing Quaternion.inverse");

q = new Quaternion(Math.PI/3, 3, -4, 0);
console.log("	Inverting the quaternion (Pi/3, 3, -4, 0)");
q = q.inverse();

console.log("	w is",q.w,"(should be about 0.866)");
console.log("	x is",q.x,"(should be about -0.3)");
console.log("	y is",q.y,"(should be about 0.4)");
console.log("	z is",q.z,"(should be about 0)");


console.log("Testing Quaternion.renormalize");

q = new Quaternion();
q.set(0.5, 1, 0, 0);
console.log("	Renormalizing quaterion set to (0.5, 1, 0, 0)");
q.renormalize();

console.log("	w is",q.w,"(should be 0.5)");
console.log("	x is",q.x,"(should be about 0.866)");
console.log("	y is",q.y,"(should be 0)");
console.log("	z is",q.z,"(should be 0)");


console.log("Testing Quaternion.compose (not in place)");

console.log("	Creating Quaternion for 90 degree rotation about x axis");
q = new Quaternion(Math.PI/2, 1, 0, 0);

console.log("	Creating Quaternion for 60 degree rotation about negative z axis");
q2 = new Quaternion(Math.PI/3, 0, 0, -1);

console.log("	Composing quaternions as if applied chronologically...");
q3 = q.compose(q2, false);

console.log("	original w is",q.w,"(should be about 0.707)");
console.log("	original x is",q.x,"(should be about 0.707)");
console.log("	original y is",q.y,"(should be about 0)");
console.log("	original z is",q.z,"(should be about 0)");
console.log("	resulting w is",q3.w,"(should be about 0.612)");
console.log("	resulting x is",q3.x,"(should be about 0.612)");
console.log("	resulting y is",q3.y,"(should be about -0.353)");
console.log("	resulting z is",q3.z,"(should be about -0.353)");



console.log("Testing Quaternion.compose (in place)");

console.log("	Composing same Quaternions in place");
q.compose(q2);

console.log("	w is",q.w,"(should be about 0.612)");
console.log("	x is",q.x,"(should be about 0.612)");
console.log("	y is",q.y,"(should be about -0.353)");
console.log("	z is",q.z,"(should be about -0.353)");


console.log("Testing Quaternion.composition");

console.log("	Composing three Quaternions...");
qz = Quaternion.fromVector(new Vector(0,0,1));
qc = Quaternion.composition([q.inverse(), qz, q]);

console.log("	w is",qc.w,"(should be about 0)");
console.log("	x is",qc.x,"(should be about -0.866)");
console.log("	y is",qc.y,"(should be about -0.5)");
console.log("	z is",qc.z,"(should be about 0)");


console.log("Testing Quaternion.applyRotation");

console.log("	Applying a composite Quaternion to pure Quaternion on z-axis");
qc = q.applyRotation(qz);

console.log("	w is",qc.w,"(should be about 0)");
console.log("	x is",qc.x,"(should be about -0.866)");
console.log("	y is",qc.y,"(should be about -0.5)");
console.log("	z is",qc.z,"(should be about 0)");


console.log("Testing Quaternion.localCompose (not in place)");

console.log("	Composing local rotation into global rotation.");
q = new Quaternion(Math.PI/2, 1, 0, 0);
qr = q.localCompose(new Quaternion (Math.PI/2, 0, 0, 1), false);

console.log("	w of result is",qr.w,"(should be about 0.5)");
console.log("	x of result is",qr.x,"(should be about 0.5)");
console.log("	y of result is",qr.y,"(should be about -0.5)");
console.log("	z of result is",qr.z,"(should be about 0.5)");

console.log("	w of original is",q.w,"(should be about 0.707)");
console.log("	x of original is",q.x,"(should be about 0.707)");
console.log("	y of original is",q.y,"(should be about 0)");
console.log("	z of original is",q.z,"(should be about 0)");


console.log("Testing Quaternion.localCompose (in place)");
console.log("	Composing local rotation into global rotation.");
q = new Quaternion(Math.PI/2, 1, 0, 0);
q.localCompose(new Quaternion (Math.PI/2, 0, 0, 1));

console.log("	w is",q.w,"(should be about 0.5)");
console.log("	x is",q.x,"(should be about 0.5)");
console.log("	y is",q.y,"(should be about -0.5)");
console.log("	z is",q.z,"(should be about 0.5)");


console.log("Testing Quaternion.toString");

q = new Quaternion(Math.PI/2, 1, 0, 0);
console.log("	Printing string form of quaternion for 90 degree rotation about x axis");
console.log("	Result is",q.toString(),"(should be something like \"Quaternion (0.707, 0.707, 0, 0)\")");


// VECTOR / QUATERNION 
console.log("Testing Quaternion.fromVector");

console.log("	Creating Quaternion from Vector (0, 0, 1)");
qz = Quaternion.fromVector(new Vector(0,0,1));

console.log("	w is",qz.w,"(should be 0)");
console.log("	x is",qz.x,"(should be 0)");
console.log("	y is",qz.y,"(should be 0)");
console.log("	z is",qz.z,"(should be 1)");


console.log("Testing Vector.fromQuaternion");

console.log("	Creating a Vector from a Quaternion with values (0,1,2,3)");
v = Vector.fromQuaternion(Quaternion.fromVector(new Vector(1,2,3)));

console.log("	x value is",v.x,"(should be 1)");
console.log("	y value is",v.y,"(should be 2)");
console.log("	z value is",v.z,"(should be 3)");


console.log("Testing Vector.rotate (not in place)");
v = new Vector(0, 1, 0);

console.log("	Rotating Vector (0, 1, 0) 90 degrees about z axis");
q = new Quaternion(Math.PI/2, 0, 0, 1);
v2 = v.rotate(q, false);

console.log("	original x value is",v.x,"(should be 0)");
console.log("	original y value is",v.y,"(should be 1)");
console.log("	original z value is",v.z,"(should be 0)");
console.log("	resulting x value is",v2.x,"(should be about -1)");
console.log("	resulting y value is",v2.y,"(should be about 0)");
console.log("	resulting z value is",v2.z,"(should be about 0)");


console.log("Testing Vector.rotate (in place) with the same rotation");
v = new Vector(0, 1, 0);
v.rotate(q);

console.log("	x value is",v.x,"(should be about -1)");
console.log("	y value is",v.y,"(should be about 0)");
console.log("	z value is",v.z,"(should be about 0)");

// MATRIX // QUAT
console.log("Testing Matrix.rotation");

var q = new Quaternion(Math.PI/2, 1,2,3);
console.log("	Creating rotation matrix for 90 degrees about axis (1,2,3)");
M = Matrix.rotation(q);
console.log("	Rotation matrix is:");
console.log("	",M);
console.log("	Rotation matrix should be:");
console.log("	",new Float32Array([0.0714285746216774, 0.9446408748626709, -0.32023677229881287, 0,-0.6589266061782837, 0.2857142984867096, 0.6958326697349548, 0, 0.7488082051277161, 0.16131018102169037, 0.6428571343421936, 0, 0, 0, 0, 1]));

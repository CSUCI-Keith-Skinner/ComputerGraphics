// VECTOR ONLY
console.log("Testing Vector.constructor")

console.log("	Creating Vector with coords (1,2,3)");
v = new Vector(1,2,3);

console.log("	x coordinate is",v.x,"(should be 1)");
console.log("	y coordinate is",v.y,"(should be 2)");
console.log("	z coordinate is",v.z,"(should be 3)");


console.log("Testing Vector.set");

console.log("	Setting vector coords to (4,5,6)");
v.set(4,5,6);

console.log("	x coordinate is",v.x,"(should be 4)");
console.log("	y coordinate is",v.y,"(should be 5)");
console.log("	z coordinate is",v.z,"(should be 6)");


console.log("Testing Vector.add (in place)")

console.log("	Adding vector with coords (1, -1, -2)");
v.add(new Vector(1, -1, -2));

console.log("	x coordinate is",v.x,"(should be 5)");
console.log("	y coordinate is",v.y,"(should be 4)");
console.log("	z coordinate is",v.z,"(should be 4)");


console.log("Testing Vector.add (not in place)");

console.log("	Adding vector with coords (-1, 1, 2)");
v2 = v.add(new Vector(-1, 1, 2), false);

console.log("	x coordinate of result is",v2.x,"(should be 4)");
console.log("	y coordinate of result is",v2.y,"(should be 5)");
console.log("	z coordinate of result is",v2.z,"(should be 6)");
console.log("	x coordinate of original is",v.x,"(should be 5)");
console.log("	y coordinate of original is",v.y,"(should be 4)");
console.log("	z coordinate of original is",v.z,"(should be 4)");


console.log("Testing Vector.subtract (in place)");

v = new Vector(1,1,1);
console.log("	Subtracting a vector from itself...");
v.subtract(v);

console.log("	x coordinate of result is",v.x,"(should be 0)");
console.log("	y coordinate of result is",v.y,"(should be 0)");
console.log("	z coordinate of result is",v.z,"(should be 0)");


console.log("Testing Vector.subtract (not in place)");

v = new Vector(1,1,1);
console.log("	Subtracting (1,2,3) from (1,1,1)");
v2 = v.subtract(new Vector(1,2,3), false);

console.log("	x coordinate of result is",v2.x,"(should be 0)");
console.log("	y coordinate of result is",v2.y,"(should be -1)");
console.log("	z coordinate of result is",v2.z,"(should be -2)");
console.log("	x coordinate of original is",v.x,"(should be 1)");
console.log("	y coordinate of original is",v.y,"(should be 1)");
console.log("	z coordinate of original is",v.z,"(should be 1)");


console.log("Testing Vector.scale (not in place)");

v = new Vector(1,-1,1);
console.log("	Scaling vector (1,-1,1) by vector (-1,7,3.5)");
v2 = v.scale(new Vector(-1, 7, 3.5), false);

console.log("	x coordinate of result is",v2.x,"(should be -1)");
console.log("	y coordinate of result is",v2.y,"(should be -7)");
console.log("	z coordinate of result is",v2.z,"(should be 3.5)");
console.log("	x coordinate of original is",v.x,"(should be 1)");
console.log("	y coordinate of original is",v.y,"(should be -1)");
console.log("	z coordinate of original is",v.z,"(should be 1)");


console.log("Testing Vector.scale (in place) with the same two vectors...");

v = new Vector(1,-1,1);
console.log("	Scaling vector...");
v.scale(new Vector(-1, 7, 3.5));

console.log("	x coordinate is",v.x,"(should be -1");
console.log("	y coordinate is",v.y,"(should be -7");
console.log("	z coordinate is",v.z,"(should be 3.5");


console.log("Testing Vector.inverse");

console.log("	Inverting vector (1,-1,0)");
v = new Vector(1, -1, 0);
v2 = v.inverse();
console.log("	x coordinate of inverse is",v2.x,"(should be -1)");
console.log("	y coordinate of inverse is",v2.y,"(should be 1)");
console.log("	z coordinate of inverse is",v2.z,"(should be -0)");


console.log("Testing Vector.magnitude");

v = new Vector(3,4,0);
console.log("	Finding magnitude of vector (3,4,0)");
var m = v.magnitude();
console.log("	Result is",m,"(should be 5)");


console.log("Testing Vector.normalize (not in place)");

v = new Vector(3,4,0);
console.log("	Getting normalized vector in (3,4,0) direction");
v2 = v.normalize(false);

console.log("	x coordinate of result is",v2.x,"(should be 0.6)");
console.log("	y coordinate of result is",v2.y,"(should be 0.8)");
console.log("	z coordinate of result is",v2.z,"(should be 0)");
console.log("	x coordinate of original is",v.x,"(should be 3)");
console.log("	y coordinate of original is",v.y,"(should be 4)");
console.log("	z coordinate of original is",v.z,"(should be 0)");


console.log("Testing Vector.normalize (in place)");

v = new Vector(3,4,0);
console.log("	Normalizing (3,4,0)");
v.normalize();

console.log("	x coordinate of result is",v.x,"(should be 0.6)");
console.log("	y coordinate of result is",v.y,"(should be 0.8)");
console.log("	z coordinate of result is",v.z,"(should be 0)");


console.log("Testing Vector.toString");

v = new Vector(1,2,3);
console.log("	Printing vector with coords (1,2,3)");
console.log("	Result is",v.toString());
console.log("	Result should be something like \"Vector(1,2,3)\"");


console.log("Testing Vector.toArray");

v = new Vector(1,2,3);
console.log("	Getting vector (1,2,3) as an array...");
v = v.toArray();

console.log("	Result is",v,"(should be [1, 2, 3])");


console.log("Testing Vector.sum");

console.log("	Summing vectors (1,-1,2) (-4, -2, -1) (3,3,-1)");
v = Vector.sum([new Vector(1,-1,2), new Vector(-4, -2, -1), new Vector(3,3,-1)]);

console.log("	x coordinate is",v.x,"(should be 0)");
console.log("	y coordinate is",v.y,"(should be 0)");
console.log("	z coordinate is",v.z,"(should be 0)");


console.log("Testing Vector.dot");

console.log("	Getting cross product of two vectors...");
var d = Vector.dot(new Vector(2,0,3), new Vector(0,-1,4));
console.log("	Cross product is",d,"(should be 12)");


console.log("Testing Vector.cross");

console.log("	Getting cross product of two vectors...");
v = Vector.cross(new Vector(1,2,3), new Vector(3,2,1));
console.log("	x coordinate is",v.x,"(should be -4)");
console.log("	y coordinate is",v.y,"(should be 8)");
console.log("	z coordinate is",v.z,"(should be -4)");


// MATRIX (basics, no quats and no perspective / projection)

console.log("Testing Matrix.identity");

console.log("	Construction identity matrix...");
M = Matrix.identity();

console.log("	Matrix.identity() result is:");
console.log("	",M);
console.log("	Matrix.identity() result should be:");
console.log("	",new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));


console.log("Testing Matrix.translation");

var v = new Vector(1,2,3);
console.log("	Creating translation matrix for vector (1,2,3)");
M = Matrix.translation(v);
console.log("	Translation matrix is:");
console.log("	",M);
console.log("	Translation matrix should be:");
console.log("	",new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1]));


console.log("Testing Matrix.scale");

var v = new Vector(2,3,4);
console.log("	Creating scale matrix for vector (2,3,4)");
M = Matrix.scale(v);
console.log("	Scale matrix is:");
console.log("	",M);
console.log("	Scale matrix should be:");
console.log("	",new Float32Array([2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1]));


console.log("Testing Matrix.mul");

console.log("	Multiplying two matrices...");
m1 = new Float32Array([1, 2, 3, 4,
					   5, 6, 7, 8,
					   9, 10,11,12,
					   13,14,15,16]);
m2 = new Float32Array([17,18,19,20,
					   21,22,23,24,
					   25,26,27,28,
					   29,30,31,32]);
M = Matrix.mul(m1,m2);
console.log("	Multiplication result is:");
console.log("	",M);
console.log("	Multiplication result should be:");
console.log("	",new Float32Array([538, 612, 686, 760, 650, 740, 830, 920, 762, 868, 974, 1080, 874, 996, 1118, 1240]));


console.log("Testing Matrix.prod");

console.log("	Getting product of list of matrices...");
M = Matrix.prod([m1, m2]);
console.log("	Product is:");
console.log("	",M);
console.log("	Product should be:");
console.log("	",new Float32Array([538, 612, 686, 760, 650, 740, 830, 920, 762, 868, 974, 1080, 874, 996, 1118, 1240]));

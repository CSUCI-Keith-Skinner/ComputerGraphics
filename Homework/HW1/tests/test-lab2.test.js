const Vector = require('../skeletons/vector');
const Matrix = require('../skeletons/matrix');

describe ('Testing Vector', () => 
{
    describe('Testing Vector.constructor', () => {
        var v = new Vector(1, 2, 3);
        test('x coordinate should be 1', () => { expect(v.x).toBe(1); });
        test('y coordinate should be 2', () => { expect(v.y).toBe(2); });
        test('z coordinate should be 3', () => { expect(v.z).toBe(3); });
    });

    describe('Testing Vector.set', () => {
        var v = new Vector(1, 2, 3).set(4, 5, 6);
        test('x coord should be 4', () => { expect(v.x).toBe(4); });
        test('y coord should be 5', () => { expect(v.y).toBe(5); });
        test('z coord should be 6', () => { expect(v.z).toBe(6); });
    });

    describe('Testing Vector.add (in place)', () => {
        var v = new Vector(1, 2, 3).set(4, 5, 6).add(new Vector(1, -1, -2), true);
        test('x coordinate should be 5', () => { expect(v.x).toBe(5); });
        test('y coordinate should be 4', () => { expect(v.y).toBe(4); });
        test('z coordinate should be 4', () => { expect(v.z).toBe(4); });
    });

    describe('Testing Vector.add (not in place)', () => {
        var v = new Vector(1, 2, 3).set(4, 5, 6).add(new Vector(1, -1, -2), true);
        var res = v.add(new Vector(-1, 1, 2), false);
        test('x coordinate of result is 4', () => { expect(res.x).toBe(4); });
	    test('y coordinate of result is 5', () => { expect(res.y).toBe(5); });
	    test('z coordinate of result is 6', () => { expect(res.z).toBe(6); });
	    test('x coordinate of original is 5', () => { expect(v.x).toBe(5); });
	    test('y coordinate of original is 4', () => { expect(v.y).toBe(4); });
	    test('z coordinate of original is 4', () => { expect(v.z).toBe(4); });
    });

    describe('Testing Vector.subract (in place)', () => {
        var v = new Vector(1, 2, 3);
        v.subtract(v, true);
        test('x coordinate of result is 0', () => { expect(v.x).toBe(0) });
	    test('y coordinate of result is 0', () => { expect(v.y).toBe(0) });
	    test('z coordinate of result is 0', () => { expect(v.z).toBe(0) });
    });

    describe('Testing Vector.subtract (not in place)', () => {
        var o = new Vector(1, 1, 1);
        var r = o.subtract(new Vector(1, 2, 3), false);
        test('x coordinate of result is 0', () => { expect(r.x).toBe(0) });
        test('y coordinate of result is -1', () => { expect(r.y).toBe(-1) });
        test('z coordinate of result is -2', () => { expect(r.z).toBe(-2) });
        test('x coordinate of original is 1', () => { expect(o.x).toBe(1) });
        test('y coordinate of original is 1', () => { expect(o.y).toBe(1) });
        test('z coordinate of original is 1', () => { expect(o.z).toBe(1) });
    });

    describe('Testing Vector.scale (not in place)', () => {
        //Scaling vector (1,-1,1) by vector (-1,7,3.5)
        var o = new Vector(1, -1, 1);
        var r = o.scale(new Vector(-1, 7, 3.5), false);
        test('x coordinate of result is -1', () => { expect(r.x).toBe(-1) });
        test('y coordinate of result is -7', () => { expect(r.y).toBe(-7) });
        test('z coordinate of result is 3.5', () => { expect(r.z).toBe(3.5) });
        test('x coordinate of original is 1', () => { expect(o.x).toBe(1) });
        test('y coordinate of original is -1', () => { expect(o.y).toBe(-1) });
        test('z coordinate of original is 1', () => { expect(o.z).toBe(1) });
    });

    describe('Testing Vector.scale (in place) with the same two vectors...', () =>{
        var v = new Vector(1, -1, 1).scale(new Vector(-1, 7, 3.5));
        test('x coordinate is -1', () => { expect(v.x).toBe(-1) });
        test('y coordinate is -7', () => { expect(v.y).toBe(-7) });
        test('z coordinate is 3.5', () => { expect(v.z).toBe(3.5) });
    });

    describe('Testing Vector.inverse', () => {
        var v = new Vector(1, -1, 0).inverse();
        test('x coordinate of inverse is -1', () => { expect(v.x).toBe(-1) });
        test('y coordinate of inverse is 1', () => { expect(v.y).toBe(1) });
        test('z coordinate of inverse is -0', () => { expect(v.z).toBe(-0) });
    });

    describe('Testing Vector.magnitude', () => {
        var m = new Vector(3, 4, 0).magnitude();
        test('Result is 5', () => { expect(m).toBe(5) });
    });

    describe('Testing Vector.normalize (not in place)', () => {
        var o = new Vector(3, 4, 0);
        var r = o.normalize(false);
        test('x coordinate of result is 0.6', () => { expect(r.x).toBe(0.6) });
        test('y coordinate of result is 0.8', () => { expect(r.y).toBe(0.8) });
        test('z coordinate of result is 0', () => { expect(r.z).toBe(0) });
        test('x coordinate of original is 3', () => { expect(o.x).toBe(3) });
        test('y coordinate of original is 4', () => { expect(o.y).toBe(4) });
        test('z coordinate of original is 0', () => { expect(o.z).toBe(0) });
    });

    describe('Testing Vector.normalize (in place)', () => {
        var v = new Vector(3, 4, 0).normalize(true);
        test('x coordinate of result is 0.6', () => { expect(v.x).toBe(0.6) });
        test('y coordinate of result is 0.8', () => { expect(v.y).toBe(0.8) });
        test('z coordinate of result is 0', () => { expect(v.z).toBe(0) });
    });

    describe('Testing Vector.toString', () => {
        var v = new Vector(1, 2, 3);
        test('Printing vector with coords (1,2,3)', () => {  });
    });

    describe('Testing Vector.toArray', () => {
        var v = new Vector(1, 2, 3);
        test('Getting vector (1,2,3) as an array', () => { });
    });

    describe('Testing Vector.sum', () => {
        var v = Vector.sum([ new Vector(1, -1, 2), new Vector(-4, -2, -1), new Vector(3, 3, -1) ]);
        test('x coordinate is 0', () => { expect(v.x).toBe(0) });
        test('y coordinate is 0', () => { expect(v.y).toBe(0) });
        test('z coordinate is 0', () => { expect(v.z).toBe(0) });
    });

    describe('Testing Vector.dot', () => {
        var d = Vector.dot(new Vector(2,0,3), new Vector(0,-1,4));
        test('Cross product is 12', () => { expect(d).toBe(12) });
    });

    describe('Testing Vector.cross', () => {
        var v = Vector.cross(new Vector(1,2,3), new Vector(3,2,1));
        test('x coordinate is -4', () => { expect(v.x).toBe(-4) });
        test('y coordinate is 8', () => { expect(v.y).toBe(8) });
        test('z coordinate is -4', () => { expect(v.z).toBe(-4) });
    });
});

describe('Testing Matrix', () => {
    describe('Testing Matrix.identity', () => {
        var mi = Matrix.identity();
        var mo = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
        test('Translation matrix is ', () => {
            expect(mi.length).toBe(mo.length);
            for (var i = 0; i < mi.length; ++i) {
                expect(mi[i]).toBe(mo[i]);
            }
        });
    });

    describe('Testing Matrix.scale', () => {
        var mi = Matrix.scale(new Vector(2, 3, 4));
        var mo = new Float32Array([ 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1 ]);
        test('Scale matrix is ', () => {
            expect(mi.length).toBe(mo.length);
            for (var i=0; i< mi.length; ++i)
                expect(mi[i]).toBe(mo[i]);
        });
    });

    describe('Testing Matrix.mul', () => {
        var m1 = new Float32Array([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
        var m2 = new Float32Array([ 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]);
        var mi = Matrix.mul(m1,m2);
        var mo = new Float32Array([ 538, 612, 686, 760, 650, 740, 830, 920, 762, 868, 974, 1080, 874, 996, 1118, 1240 ]);
        test('Multiplication result is ', () => {
            expect(mi.length).toBe(mo.length);
            for (var i=0; i< mi.length; ++i)
                expect(mi[i]).toBe(mo[i]);
        });
    });

    describe('Testing Matrix.prod', () => {
        var m1 = new Float32Array([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
        var m2 = new Float32Array([ 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]);
        var mi = Matrix.prod([m1,m2]);
        var mo = new Float32Array([ 538, 612, 686, 760, 650, 740, 830, 920, 762, 868, 974, 1080, 874, 996, 1118, 1240 ]);
        test('Product is ', () => {
            expect(mi.length).toBe(mo.length);
            for (var i=0; i< mi.length; ++i)
                expect(mi[i]).toBe(mo[i]);
        });
    });

});
const Vector = require('../skeletons/vector');
const Quaternion = require('../skeletons/quaternion');
const Transform = require('../skeletons/transform');

/**
 * Tests to make sure 2 matrices are equivalent
 * @param {Float32Array[16]} actual The value we have
 * @param {Float32Array[16]} expected The value we want
 */
const testMatrix = function(actual, expected) {
    expect(actual.length).toBe(expected.length);
    for (var i=0; i<expected.length; ++i) {
        expect(actual[i]).toBeCloseTo(expected[i]);
    }
}

const testVector = function(v, x, y, z) {
    expect(v.x).toBe(x);
    expect(v.y).toBe(y);
    expect(v.z).toBe(z);
}
const testVectorDelta = function(v, x, y, z) {
    expect(v.x).toBeCloseTo(x);
    expect(v.y).toBeCloseTo(y);
    expect(v.z).toBeCloseTo(z);
}
const testQuaternion = function(q, w, x, y, z) {
    expect(q.w).toBe(w);
    expect(q.x).toBe(x);
    expect(q.y).toBe(y);
    expect(q.z).toBe(z);
}
const testQuaternionDelta = function(q, w, x, y, z) {
    expect(q.w).toBeCloseTo(w);
    expect(q.x).toBeCloseTo(x);
    expect(q.y).toBeCloseTo(y);
    expect(q.z).toBeCloseTo(z);
}

//Identity Matrix
const id = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

var t;

describe('Testing Transform', () => {
    describe('Testing Transform.constructor with default values', () => {
        beforeEach( () => { t = new Transform(); })
        test('Position should be a vector with components (0,0,0)', () => { testVector(t.position, 0, 0, 0) })
        test('Rotation should be a quaternion with components (1,0,0,0)', () => { testQuaternion(t.rotation, 1, 0, 0, 0) })
        test('Scale should be a vector with components (1,1,1)', () => {testVector(t.scale, 1, 1, 1); })
        test('Translation matrix should be identity matrix', () => { testMatrix(t.mTranslate, id); })
        test('Rotation matrix should be identity matrix', () => { testMatrix(t.mRotate, id); })
        test('Scale matrix should be identity matrix', () => { testMatrix(t.mScale, id) })
        test('World matrix should be identity matrix', () => { testMatrix(t.mWorld, id) })
        test('hasMoved should be false', () => { expect(t.hasMoved).toBe(false) })
        test('hasRotated should be false', () => { expect(t.hasRotated).toBe(false) })
        test('hasScaled should be false', () => { expect(t.hasScaled).toBe(false) })
        test('needsUpdate should be false', () => { expect(t.needsUpdate).toBe(false) })
    })

    describe('Testing constructor with custom values', () => {
        beforeEach( () => { 
            var position = new Vector(1, 2, 3);
            var rotation = new Quaternion(5*Math.PI/3, 3, 4, 5);
            var scale = new Vector(8, 5, 2)
            t = new Transform(position, rotation, scale); 
        })

        test('Position should be a vector with components (1, 2, 3)', () => { testVector(t.position, 1, 2, 3) })
        test('Rotation should be a quaternion with components (-0.866, 0.212, 0.282, 0.353)', () => { testQuaternionDelta(t.rotation, -0.866, 0.212, 0.282, 0.353) })
        test('Scale should be a vector with components (8,5,2)', () => {testVector(t.scale, 8,5,2) })
        test('Translation matrix test', () => { testMatrix(t.mTranslate, new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1])) })
        test('Rotation matrix test', () => { testMatrix(t.mRotate, new Float32Array([0.5899999737739563, -0.49237242341041565, 0.6398979425430298, 0, 0.7323724627494812, 0.6600000262260437, -0.16742345690727234, 0, -0.3398979604244232, 0.5674234628677368, 0.75, 0, 0, 0, 0, 1])) })
        test('Scale matrix should be identity matrix', () => { testMatrix(t.mScale, new Float32Array([8, 0, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1])) })
        test('World matrix should be identity matrix', () => { testMatrix(t.mWorld, new Float32Array([4.71999979019165, -3.938979387283325, 5.119183540344238, 0, 3.661862373352051, 3.3000001907348633, -0.8371173143386841, 0, -0.6797959208488464, 1.1348469257354736, 1.5, 0, 1, 2, 3, 1])) })
        test('hasMoved should be false', () => { expect(t.hasMoved).toBe(false) })
        test('hasRotated should be false', () => { expect(t.hasRotated).toBe(false) })
        test('hasScaled should be false', () => { expect(t.hasScaled).toBe(false) })
        test('needsUpdate should be false', () => { expect(t.needsUpdate).toBe(false) })
    })
});
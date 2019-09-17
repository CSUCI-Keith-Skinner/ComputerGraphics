const Quaternion = require('../skeletons/quaternion');
const Vector = require("../skeletons/vector.js");

describe('Testing Quaternion', () => {
    
    describe('Testing Quaternion.constructor (normalized)', ()=> {
        var q = new Quaternion(2*Math.PI/3, 1, 0, 0, true);
        test('w should be about 0.5', () => { expect(q.w).toBeCloseTo(0.5) });
        test('x should be about 0.866', () => { expect(q.x).toBeCloseTo(0.866) });
        test('y should be 0', () => { expect(q.y).toBe(0) });
        test('z should be 0', () => { expect(q.z).toBe(0) });
    });

    describe('Testing Quaternion.constructor (not normalized)', () => {
        var q = new Quaternion(Math.PI/3, 3, -4, 0, false);
        test('w should be about 0.866', () => { expect(q.w).toBeCloseTo(0.866) });
        test('x should be about 0.3', () => { expect(q.x).toBeCloseTo(0.3) });
        test('y should be about -0.4', () => { expect(q.y).toBeCloseTo(-0.4) });
        test('z should be 0', () => { expect(q.z).toBe(0) });
    });

    describe('Testing Quaternion.set', () => {
        var q = new Quaternion();
        q.set(1,2,3,4);
        test('w should be 1', () => { expect(q.w).toBe(1)});
        test('x should be 2', () => { expect(q.x).toBe(2)});
        test('y should be 3', () => { expect(q.y).toBe(3)});
        test('z should be 4', () => { expect(q.z).toBe(4)});
    });

    describe('Testing Quaternion.inverse', () => {
        var q = new Quaternion(Math.PI/3, 3, -4, 0).inverse();
        test('w should be about 0.866', () => { expect(q.w).toBeCloseTo(0.866) });
        test('x should be about -0.3', () => { expect(q.x).toBeCloseTo(-0.3) });
        test('y should be about 0.4', () => { expect(q.y).toBeCloseTo(0.4) });
        test('z should be about 0', () => { expect(q.z).toBeCloseTo(0) });
    });

    describe('Testing Quaternion.renormalize', () => {
        var q = new Quaternion();
        q.set(0.5, 1, 0, 0);
        q.renormalize();
        test('w should be 0.447', () => { expect(q.w).toBeCloseTo(0.447) });
        test('x should be about 0.894', () => { expect(q.x).toBeCloseTo(0.894) });
        test('y should be 0', () => { expect(q.y).toBe(0) });
        test('z should be 0', () => { expect(q.z).toBe(0) });
    });

    describe('Testing Quaternion.compose (not in place)', () => {
        var q = new Quaternion(Math.PI/2, 1, 0, 0);
        var q2 = new Quaternion(Math.PI/3, 0, 0, -1);
        var q3 = q.compose(q2, false);

        test('original w should be about 0.707', () => { expect(q.w).toBeCloseTo(0.707) });
        test('original x should be about 0.707', () => { expect(q.x).toBeCloseTo(0.707) });
        test('original y should be about 0', () => { expect(q.y).toBeCloseTo(0) });
        test('original z should be about 0', () => { expect(q.z).toBeCloseTo(0) });
        test('resulting w should be about 0.612', () => { expect(q3.w).toBeCloseTo(0.612) });
        test('resulting x should be about 0.612', () => { expect(q3.x).toBeCloseTo(0.612) });
        test('resulting y should be about -0.353', () => { expect(q3.y).toBeCloseTo(-0.353) });
        test('resulting z should be about -0.353', () => { expect(q3.z).toBeCloseTo(-0.353) });
    });

    describe('Testing Quaternion.compose (in place)', () =>{
        var q = new Quaternion(Math.PI/2, 1, 0, 0);
        var q2 = new Quaternion(Math.PI/3, 0, 0, -1);
        q.compose(q2);
        test('w should be about 0.612', () => { expect(q.w).toBeCloseTo(0.612) });
        test('x should be about 0.612', () => { expect(q.x).toBeCloseTo(0.612) });
        test('y should be about -0.353', () => { expect(q.y).toBeCloseTo(-0.353) });
        test('z should be about -0.353', () => { expect(q.z).toBeCloseTo(-0.353) });
    });

    describe('Testing Quaternion.composition', () => {
        var q = new Quaternion(Math.PI/2, 1, 0, 0);
        var q2 = new Quaternion(Math.PI/3, 0, 0, -1);
        q.compose(q2);
        var qz = Quaternion.fromVector(new Vector(0,0,1));
        var qc = Quaternion.composition([q.inverse(), qz, q]);

        test('w should be about 0', () => { expect(qc.w).toBeCloseTo(0) });
        test('x should be about -0.866', () => { expect(qc.x).toBeCloseTo(-0.866) });
        test('y should be about -0.5', () => { expect(qc.y).toBeCloseTo(-0.5) });
        test('z should be about 0', () => { expect(qc.z).toBeCloseTo(0) });
    });

    describe('Testing Quaternion.applyRotation', () => {
        var q = new Quaternion(Math.PI/2, 1, 0, 0);
        var q2 = new Quaternion(Math.PI/3, 0, 0, -1);
        q.compose(q2);
        var qz = Quaternion.fromVector(new Vector(0,0,1));
        var qc = q.applyRotation(qz);
        test('w should be about 0', () => { expect(qc.w).toBeCloseTo(0) });
        test('x should be about -0.866', () => { expect(qc.x).toBeCloseTo(-0.866) });
        test('y should be about -0.5', () => { expect(qc.y).toBeCloseTo(-0.5) });
        test('z should be about 0', () => { expect(qc.z).toBeCloseTo(0) });
    });

    describe('Testing Quaternion.localCompose (not in place)', () => {
        var o = new Quaternion(Math.PI/2, 1, 0, 0);
        var r = o.localCompose(new Quaternion (Math.PI/2, 0, 0, 1), false);

        test('w of result should be about 0.5', () => { expect(r.w).toBeCloseTo(0.5) });
        test('x of result should be about 0.5', () => { expect(r.x).toBeCloseTo(0.5) });
        test('y of result should be about -0.5', () => { expect(r.y).toBeCloseTo(-0.5) });
        test('z of result should be about 0.5', () => { expect(r.z).toBeCloseTo(0.5) });
        test('w of original should be about 0.707', () => { expect(o.w).toBeCloseTo(0.707) });
        test('x of original should be about 0.707', () => { expect(o.x).toBeCloseTo(0.707) });
        test('y of original should be about 0', () => { expect(o.y).toBeCloseTo(0) });
        test('z of original should be about 0', () => { expect(o.z).toBeCloseTo(0) });
    });

    describe('Testing Quaternion.localCompose (in place)', () => {
        var q = new Quaternion(Math.PI/2, 1, 0, 0);
        q.localCompose(new Quaternion (Math.PI/2, 0, 0, 1));
        test('w should be about 0.5', () => { expect(q.w).toBeCloseTo(0.5) });
        test('x should be about 0.5', () => { expect(q.x).toBeCloseTo(0.5) });
        test('y should be about -0.5', () => { expect(q.y).toBeCloseTo(-0.5) });
        test('z should be about 0.5', () => { expect(q.z).toBeCloseTo(0.5) });
    });

    describe('', () => {
        
    });
    
});
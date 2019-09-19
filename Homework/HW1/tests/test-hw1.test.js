const Vector = require('../skeletons/vector');
const Quaternion = require('../skeletons/quaternion');
const Transform = require('../skeletons/transform');

const testMatrix = function(expected, actual) {
    expect(expected.length).toBe(actual.length);
    for (var i=0; i<expected.length; ++i) {
        
    }
}


describe('Testing Transform', () => {
    describe('Testing Transform.constructor with default values', () => {
        var t = new Transform();
        var id = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        test('Position should be a vector with components (0,0,0)', () => {
            expect(t.position.x).toBe(0);
            expect(t.position.y).toBe(0);
            expect(t.position.z).toBe(0);
        })

        test('Rotation should be a quaternion with components (1,0,0,0)', () => {
            expect(t.rotation.w).toBe(1);
            expect(t.rotation.x).toBe(0);
            expect(t.rotation.y).toBe(0);
            expect(t.rotation.z).toBe(0);
        })

        test('Scale should be a vector with components (1,1,1)', () => {
            expect(t.scale.x).toBe(1);
            expect(t.scale.y).toBe(1);
            expect(t.scale.z).toBe(1);
        })

        test('Translation matrix should be Float32Array', () => {
            
        })
    })
});
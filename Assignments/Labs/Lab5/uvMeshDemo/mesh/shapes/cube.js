import Vector from "../../core/vector.js";
import Quaternion from "../../core/quaternion.js";
import RGBMesh from "../rgbmesh.js";
import UVMesh from "../uvmesh.js";

export
class Cube 
{
    static positionArray() {
        return [
            // top			
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,
            // bottom
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            // right
            -0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            // left
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,
            // back
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,
            // front
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5
        ];
    }

    static indexArray() {
        return [
            // top
            0, 2, 1,
            0, 3, 2,
            // bottom
            4, 6, 5,
            4, 7, 6,
            // right
            8, 10, 9,
            8, 11, 10,
            // left
            12, 14, 13,
            12, 15, 14,
            // back
            16, 18, 17,
            16, 19, 18,
            // front
            20, 22, 21,
            20, 23, 22
        ];
    }

    static normalArray() {
        return [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
    
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
    
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
    
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
    
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
    
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];
    }

    static solidColorArray(color) {
        var r = color[0];
        var g = color[1];
        var b = color[2];
            
        return [
            // top / bottom
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,
    
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,
            // left / right
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,
    
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,

            // front / back
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,
    
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b
        ];
    }

    static uvArray() {
        return  [
            0,1,        1,1,        1,0,            0,0,
            0,0,        0,1,        1,1,            1,0,
            0,0,        0,1,        1,1,            1,0,
            1,0,        0,0,        0,1,            1,1,
            1,0,        0,0,        0,1,            1,1,
            0,0,        0,1,        1,1,            1,0
        ];
    }

    static createRGB(gl, program, fill, position = new Vector(), rotation = new Quaternion(), scale = new Vector(1, 1, 1)) {
        console.log(fill);
        return new RGBMesh(
            gl, // WebGL context
            program, // shader program to use to draw this
            Cube.positionArray(), // position attribute array
            Cube.indexArray(), // index array
            Cube.normalArray(), //normal array
            Cube.solidColorArray(fill) ,//color array
            position,
            rotation,
            scale
        );
    }

    static createUV(gl, program, imageID, flipTexture, position = new Vector(), rotation = new Quaternion(), scale = new Vector(1,1,1)) {
        return new UVMesh(
            gl,
            program,
            Cube.positionArray(),
            Cube.indexArray(),
            Cube.normalArray(),
            Cube.uvArray(),
            imageID,
            flipTexture,
            position,
            rotation,
            scale
        );
    }

}
import Vector from "../../core/vector.js";
import Quaternion from "../../core/quaternion.js";
import RGBMesh from "../rgbmesh.js";
import UVMesh from "../uvmesh.js";

export
class Sphere {
    static positionArray(latitudeBands, longitudeBands) {
        if (latitudeBands < 1 || longitudeBands < 1)
            return [];
        
        let vertexPosition = [];
        for (let lat = 0; lat <= latitudeBands; ++lat) {
            let theta = lat * Math.PI / latitudeBands;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let long = 0; long <= longitudeBands; ++long) {
                let phi = long * 2 * Math.PI / longitudeBands;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                vertexPosition.push(x, y, z);
            }
        }
        return vertexPosition;
    }

    static indexArray(latitudeBands, longitudeBands) {
        if (latitudeBands < 1 || longitudeBands < 1)
            return [];
        let indexData = [];
        for (let lat = 0; lat < latitudeBands; ++lat) {
            for (let long = 0; long < longitudeBands; ++long) {
                let first = (lat * (longitudeBands + 1)) + long;
                let second = first + longitudeBands + 1;

                indexData.push(first);
                indexData.push(second);
                indexData.push(first + 1);

                indexData.push(second);
                indexData.push(second + 1);
                indexData.push(first + 1);
            }
        }
        return indexData;
    }

    static normalArray(latitudeBands, longitudeBands) {
        if (latitudeBands < 1 || longitudeBands < 1)
            return [];
        return Sphere.positionArray(latitudeBands, longitudeBands);
    }

    static solidColorArray(latitudeBands, longitudeBands, color) {
        if (latitudeBands < 1 || longitudeBands < 1)
            return [];
        let colorData = [];
        for (let latNumber = 0; latNumber <= latitudeBands; ++latNumber)
            for (let longNumber = 0; longNumber <= longitudeBands; ++longNumber)
                colorData.push(color[0], color[1], color[2]);
        return colorData;
    }

    static uvArray(latitudeBands, longitudeBands) {
        if (latitudeBands < 1 || longitudeBands < 1)
            return [];
        let textureCoord = [];
        for (let lat = 0; lat <= latitudeBands; ++lat)
            for (let long = 0; long <= longitudeBands; ++long)
                textureCoord.push(
                    1 - (long / longitudeBands),
                    1 - (lat / latitudeBands));
        return textureCoord;
    }
    
    static createRGB(gl, program, fill, position = new Vector(), rotation = new Quaternion(), scale = new Vector(1, 1, 1), latitudeBands = 30, longitudeBands = 30) {
        console.log(fill);
        return new RGBMesh(
            gl, // WebGL context
            program, // shader program to use to draw this
            Sphere.positionArray(latitudeBands, longitudeBands), // position attribute array
            Sphere.indexArray(latitudeBands, longitudeBands), // index array
            Sphere.normalArray(latitudeBands, longitudeBands), //normal array
            Sphere.solidColorArray(latitudeBands, longitudeBands, fill) ,//color array
            position,
            rotation,
            scale
        );
    }

    static createUV(gl, program, imageID, flipTexture, position = new Vector(), rotation = new Quaternion(), scale = new Vector(1,1,1), latitudeBands = 30, longitudeBands = 30) {
        return new UVMesh(
            gl,
            program,
            Sphere.positionArray(latitudeBands, longitudeBands),
            Sphere.indexArray(latitudeBands, longitudeBands),
            Sphere.normalArray(latitudeBands, longitudeBands),
            Sphere.uvArray(latitudeBands, longitudeBands),
            imageID,
            flipTexture,
            position,
            rotation,
            scale
        );
    }

}
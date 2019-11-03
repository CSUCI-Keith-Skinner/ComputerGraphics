precision mediump float;

struct Camera
{
	vec3 position;
	mat4 mProjView;
};

attribute vec3 vertPosition;
attribute vec3 vertNormal;

varying vec3 fragPosition;
varying vec3 fragNormal;

uniform mat4 mWorld;
uniform mat4 mNormal;

uniform Camera cam;

void main()
{
	fragPosition = (mWorld * vec4(vertPosition, 1.0)).xyz;
	fragNormal = normalize((mWorld * vec4(vertNormal, 0.0)).xyz);
	gl_Position = cam.mProjView * mWorld * vec4(vertPosition, 1.0);
}

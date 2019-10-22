precision mediump float;

varying vec3 fragPosition;
varying vec3 fragColor;
varying vec3 fragNormal;

// ambient light
uniform vec3 ambientLight;

// directional light
uniform vec3 lightDirection;
uniform vec3 lightIntensity;

void main()
{
	vec3 light = ambientLight + lightIntensity * max(-dot(fragNormal,normalize(lightDirection)), 0.0);

	gl_FragColor = vec4(light * fragColor, 1.0);
}
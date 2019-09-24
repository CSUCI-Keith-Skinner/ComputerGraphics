
precision mediump float;

varying vec3 fragPosition;
varying vec3 fragColor;
varying vec3 fragNormal;

uniform vec4 ambientLight;
uniform vec4 lightDirection;
uniform vec4 lightIntensity;

void main( )
{
    vec3 light = ambientLight + lightIntensity * max( -1 * dot(fragNormal, normalize(lightDirection)), 0.0)
    gl_FragColor = vec4(light * fragColor, 1.0)
}
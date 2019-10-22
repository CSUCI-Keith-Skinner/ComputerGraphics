precision mediump float;

varying vec3 fragPosition;
varying vec3 fragNormal;

varying vec2 fragTexCoord;
uniform sampler2D sampler;

uniform vec3 ambientLight;
uniform vec3 lightDirection;
uniform vec3 lightIntensity;

void main()
{
	vec4 texel = texture2D(sampler, fragTexCoord);

	vec3 light = ambientLight + lightIntensity * max( -dot( fragNormal,normalize(lightDirection) ), 0.0);
	
	gl_FragColor = vec4(texel.rgb * light, texel.a);
}
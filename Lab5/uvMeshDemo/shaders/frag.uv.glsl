precision mediump float;

varying vec3 fragPosition;
varying vec2 fragTexCoord;
varying vec3 fragNormal;

uniform sampler2D sampler;

uniform vec3 ambientLight;
uniform vec3 lightDirection;
uniform vec3 lightIntensity;

void main()
{
	vec4 texel = texture2D(sampler, fragTexCoord);

	vec3 light = ambientLight + lightIntensity * max( 0.0, -dot( normalize(lightDirection), fragNormal ) );

	gl_FragColor = vec4(texel.rgb * light, texel.a);
}

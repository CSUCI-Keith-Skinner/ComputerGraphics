precision mediump float;

// data type definitions
struct DirectionalLight
{
	vec3 direction; // xyz direction of light
	vec3 ambient; // rgb contribution to scene ambient light
	vec3 diffuse; // rgb intensity of diffuse 
	vec3 specular; // rgb intensity of specular
};

struct PointLight
{
	vec3 position; // xyz position of source
	vec3 ambient; // rgb contribution to scene ambient light
	vec3 diffuse; // rgb intensity of diffuse
	vec3 specular; // rgb intensity of specular
};

struct Material
{
	float diffuse;
	float specular;
	float ambient;
	float shininess;
};

// lights
uniform vec3 ambientLight;
uniform DirectionalLight directionalLights[16];
uniform PointLight pointLights[16];

// model parameters
uniform Material material;

// camera
uniform vec3 cameraPosition;

// surface parameters
varying vec3 fragPosition;
varying vec3 fragNormal;

// texture parameters
varying vec2 fragTexCoord;
uniform sampler2D sampler;

vec3 ambient = vec3(0.0);
vec3 diffuse = vec3(0.0);
vec3 specular = vec3(0.0);

void ambientLightCalc(DirectionalLight directional, PointLight point) 
{
	ambient += directional.ambient + point.ambient;
}

void directionalLightCalc(DirectionalLight directional, vec3 V)
{
	vec3 surfaceToLight = -directional.direction;
	float d = dot(surfaceToLight, fragNormal);
	if (d > 0.0) {
		float rad = length(directional.direction - fragPosition);
		diffuse += d * directional.diffuse;

		float r = dot(V, reflect(surfaceToLight, fragNormal));
		if (r > 0.0) {
			specular += pow(r, material.shininess) * directional.specular / (rad * rad + 1.0);
		}
	}
}

void pointLightCalc(PointLight point, vec3 V)
{
	vec3 surfaceToLight = normalize(point.position - fragPosition);
	float d = dot(surfaceToLight, fragNormal);
	if (d > 0.0) {
		float rad = length(point.position - fragPosition);
		diffuse += d * point.diffuse / (rad * rad + 1.0);

		vec3 Rl = reflect(surfaceToLight, fragNormal);
		float r = dot(Rl, V);
		if (r > 0.0) {		
			specular += pow(r, material.shininess) * point.specular / (rad * rad + 1.0);
		}
	}
}

void main()
{
	vec4 texel = texture2D(sampler, fragTexCoord);	
	// TODO complete the main method (determine what color the fragment should be, assign to gl_FragColor)
	ambient = ambientLight;
	diffuse = vec3(0.0);
	specular = vec3(0.0);
	vec3 V = normalize(cameraPosition - fragPosition);
	for (int i = 0; i < 16; i++)
	{
		ambientLightCalc(directionalLights[i], pointLights[i]);
		directionalLightCalc(directionalLights[i], V);
		pointLightCalc(pointLights[i], V);
	}

	vec3 light = (material.ambient * ambient) 
		+ (material.diffuse * diffuse) 
		+ (material.specular * specular);

	gl_FragColor = vec4(light * texel.rgb, texel.a);
}


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
	vec3 diffuse; // diffuse reflection color
	vec3 specular; // specular reflection color
	vec3 ambient; // ambient reflection color
	float shininess; // "shininess / glossiness" constant
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

void main()
{
	// TODO decide what color the fragment should be, assign to gl_FragColor	
	vec3 ambient = ambientLight;
	vec3 diffuse = vec3(0.0, 0.0, 0.0);
	vec3 specular = vec3(0.0, 0.0, 0.0);

	for (int i = 0; i < 16; i++)
	{
		ambient += directionalLights[i].ambient;
		ambient += pointLights[i].ambient;

		vec3 Sl = -directionalLights[i].direction;
		diffuse += max(dot(Sl, fragNormal), 0.0) * directionalLights[i].diffuse;

		vec3 Rl = reflect(Sl, fragNormal);
		vec3 V = normalize(cameraPosition - fragPosition);
		specular += pow(max(dot(Rl, V), material.shininess), 0.0) * directionalLights[i].specular;

		Sl = normalize(pointLights[i].position - fragPosition);
		float rad = length(pointLights[i].position - fragPosition);
		diffuse += max(dot(Sl, fragNormal), 0.0) * pointLights[i].diffuse / (rad * rad + 1.0); 

		Rl = reflect(Sl, fragNormal);
		specular += pow(max(dot(Rl, V), material.shininess), 0.0) * pointLights[i].specular / (rad * rad + 1.0);
	}

	vec3 light = (material.ambient * ambient) + (material.diffuse * diffuse) + (material.specular * specular);

	gl_FragColor = vec4(light, 1.0);
}
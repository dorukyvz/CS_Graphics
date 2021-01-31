//final color passed onto fragment shader in gouraud shading
varying vec4 V_Color;

//weights
uniform float kAmbient, kDiffuse, kSpecular, shininess;

//material properties
uniform vec3 lightColor, ambientColor, lightPosition;

void main() {
	// COMPUTE COLOR ACCORDING TO GOURAUD HERE
	
	vec3 normalVect = normalize(normalMatrix * normal);
	//vec3 normalVect = normalize(normal * normalMatrix);

	vec3 viewVect = normalize((-(modelViewMatrix * vec4(position, 1.0))).xyz);
    vec3 lightVect = normalize(vec3(viewMatrix * vec4(lightPosition, 0.0)));
    vec3 reflectionVect = normalize(reflect(-lightVect, normalVect));
	float diffuse = max(dot(normalVect, lightVect), 0.0);
    float phong = pow(max(dot(reflectionVect, viewVect), 0.0), shininess); //specular
    
    V_Color = vec4(
		(kAmbient * ambientColor) 
		+ (kDiffuse * diffuse * lightColor) 
		+ (kSpecular * phong * lightColor), 1.0);

	//V_Color = vec4(
	// (kAmbient * ambientColor) 
	// + (kDiffuse * diffuse * ambientColor) 
	// + (kSpecular * phong * ambientColor), 1.0);

	// Position
	gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 1.0);
}
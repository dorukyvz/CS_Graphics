// Create shared variable. The value is given as the interpolation between normals computed in the vertex shader
// Texture combined with shading
uniform sampler2D texture2;
varying vec2 tCoords;
varying vec4 V_Normal_VCS, V_ViewPosition;

//weights
uniform float kAmbient, kDiffuse, kSpecular, shininess;
//material properties
uniform vec3 lightColor, ambientColor, lightPosition;

varying mat3 normalMatrix1;

void main() {
    
    //vec3 normalVect = normalize(normal * normalMatrix);
    vec3 normalVect = normalize(normalMatrix1 * vec3(V_Normal_VCS)); 
	vec3 viewVect = normalize(-V_ViewPosition.xyz);
    vec3 lightVect = normalize(vec3(viewMatrix * vec4(lightPosition, 0.0)));
    vec3 reflectionVect = normalize(reflect(-lightVect, normalVect));
	float diffuse = max(dot(normalVect, lightVect), 0.0);
    float phong = pow(max(dot(reflectionVect, viewVect), 0.0), shininess);

     vec4 tColor = texture2D(texture2, tCoords);
    
    vec3 V_color = 
    (kAmbient * ambientColor)
    + (kDiffuse * diffuse * lightColor)
    + (kSpecular * phong * lightColor);
    

	// COMPUTE LIGHTING HERE
	gl_FragColor = tColor * vec4(V_color, 1.0);
}

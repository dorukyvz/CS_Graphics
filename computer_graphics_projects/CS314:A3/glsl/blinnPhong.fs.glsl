varying vec4 V_Normal_VCS;
varying vec4 V_ViewPosition;

//weights
uniform float kAmbient, kDiffuse, kSpecular, shininess;

//material properties
uniform vec3 lightColor, lightPosition, ambientColor;

varying mat3 normalMatrix1;

void main() {
    vec3 normalVect = normalize(normalMatrix1 * vec3(V_Normal_VCS)); 
	vec3 viewVect = normalize(-V_ViewPosition.xyz);
    vec3 lightVect = normalize(vec3(viewMatrix * vec4(lightPosition, 0.0)));
    vec3 halfVect = normalize((lightVect + viewVect)/2.0); //half vector introduced for easier calculation of blinn (specular) value
    float diffuse = max(dot(normalVect, lightVect), 0.0);
    float blinn = pow(max(dot(halfVect,normalVect), 0.0),shininess); //specular value
    
    // COMPUTE LIGHTING HERE
    gl_FragColor = vec4(
        (kAmbient * ambientColor) 
        + (kDiffuse * diffuse * lightColor) 
        + (kSpecular * blinn * lightColor), 1.0);

}
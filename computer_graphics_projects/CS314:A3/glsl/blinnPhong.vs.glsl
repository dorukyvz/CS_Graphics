//same as phong on the vertex shader level

varying vec4 V_Normal_VCS;
varying vec4 V_ViewPosition;
//weights
uniform float kAmbient, kDiffuse, kSpecular, shininess;

//material properties
uniform vec3 lightColor, ambientColor, lightPosition;


// in order to pass projectionMatrix, viewMatrix and normalMatrix to fs, create varying matrix variables
varying mat3 normalMatrix1;

void main() {

	// ADJUST THESE VARIABLES TO PASS PROPER DATA TO THE FRAGMENTS
	V_Normal_VCS = vec4(normal, 1.0);
    V_ViewPosition = modelViewMatrix * vec4(position, 1.0);

    normalMatrix1 = normalMatrix;

	gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 1.0);
}
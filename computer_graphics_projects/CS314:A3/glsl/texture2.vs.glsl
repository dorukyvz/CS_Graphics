uniform sampler2D texture2;
varying vec2 tCoords;

varying vec4 V_Normal_VCS;
varying vec4 V_ViewPosition;
//weights
uniform float kAmbient, kDiffuse, kSpecular, shininess;

//material properties
uniform vec3 lightColor, ambientColor, lightPosition;

// in order to pass projectionMatrix, viewMatrix and normalMatrix to fs, 
// create varying matrix variables
varying mat3 normalMatrix1;

void main() {

	// ADJUST THESE VARIABLES TO PASS PROPER DATA TO THE FRAGMENTS
	V_Normal_VCS = vec4(normal, 1.0);
    V_ViewPosition = modelViewMatrix * vec4(position, 1.0);

    normalMatrix1 = normalMatrix;
	
	//ADJUST THIS FILE TO SEND PROPER DATA TO THE FRAGMENT SHADER
    tCoords = uv;

        //  vec3 textureCoords = new THREE.Vector3(1.0,1.0,1.0)

   
    // Multiply each vertex by the model-view matrix and the projection matrix to get final vertex position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

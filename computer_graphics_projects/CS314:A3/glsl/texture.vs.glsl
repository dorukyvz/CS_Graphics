uniform sampler2D texture;
varying vec2 tCoords;
void main() {
	
	//ADJUST THIS FILE TO SEND PROPER DATA TO THE FRAGMENT SHADER
    tCoords = uv;

        //  vec3 textureCoords = new THREE.Vector3(1.0,1.0,1.0)

   
    // Multiply each vertex by the model-view matrix and the projection matrix to get final vertex position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

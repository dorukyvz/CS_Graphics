// Create shared variable. The value is given as the interpolation between normals computed in the vertex shader
uniform sampler2D texture;
varying vec2 tCoords;

void main() {
  
	// LOOK UP THE COLOR IN THE TEXTURE
vec4 tColor = texture2D(texture, tCoords);
// vec3 textureColor = texture(textureCoords, texture)
  // Set final rendered color according to the surface normal
  gl_FragColor = tColor;
}

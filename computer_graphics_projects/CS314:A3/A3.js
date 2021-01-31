/**
 * UBC CPSC 314 (2016_W1)
 * Assignment 3
 */

// CREATE SCENE
var scene = new THREE.Scene();

// SETUP RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xcdcdcd);
document.body.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(25.0,(window.innerWidth/window.innerHeight), 0.1, 10000);
camera.position.set(0.0,15.0,40.0);
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

// FLOOR 
var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4,4);

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(30.0, 30.0), floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

//TEXTURES
var rocksTexture =  new THREE.ImageUtils.loadTexture('images/gravel-rocks-texture.jpg');
var basketballTexture = new THREE.ImageUtils.loadTexture('images/basketball.jpg');
var soccerBallTexture = new THREE.ImageUtils.loadTexture('images/6wO2i.png');
var texture = {type: 't', value: rocksTexture};
var texture2 = {type: 't', value: basketballTexture}; // texture taken from https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freevector.com%2Fvector-basketball-ball-texture-19065&psig=AOvVaw04jX9zV8ETIoZw55id6vwH&ust=1605569138872000&source=images&cd=vfe&ved=0CA0QjhxqFwoTCJCXzKTZhe0CFQAAAAAdAAAAABAD
var texture3 = {type: 't', value: soccerBallTexture}; // texture taken from https://www.google.com/url?sa=i&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F48303335%2Fproject-texture-onto-scnsphere&psig=AOvVaw20OoE7shDo5gUEkhDz6Sj9&ust=1605569192861000&source=images&cd=vfe&ved=0CA0QjhxqFwoTCPin-L7Zhe0CFQAAAAAdAAAAABAD
var texture4 = {type: 't', value: basketballTexture};


//LIGHTING PROPERTIES
var lightColor = {type: "c", value: new THREE.Color(1.0,1.0,1.0)};
var ambientColor = {type: "c", value: new THREE.Color(0.4,0.4,0.4)};
var lightPosition = {type: "v3", value: new THREE.Vector3(0.49,0.79,0.49)};

//MATERIAL PROPERTIES 
var kAmbient = {type: "f", value: 0.4 };
var kDiffuse = {type: "f", value: 0.8 };
var kSpecular = {type: "f", value: 0.8 };
var shininess = {type: "f", value: 10.0 };

// SHADER MATERIALS (Remember to change this, in order to use uniform variables.)
var gouraudMaterial = new THREE.ShaderMaterial({
  uniforms: {
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess,
    lightColor: lightColor,
    ambientColor: ambientColor,
    lightPosition: lightPosition,
  },
});

var phongMaterial = new THREE.ShaderMaterial({
  uniforms: {
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess,
    lightColor: lightColor,
    ambientColor: ambientColor,
    lightPosition: lightPosition,
 },
});

var blinnPhongMaterial = new THREE.ShaderMaterial({
  uniforms: {
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess,
    lightColor: lightColor,
    ambientColor: ambientColor,
    lightPosition: lightPosition,
 },
});

var textureMaterial = new THREE.ShaderMaterial({
  uniforms: {
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess,
    lightColor: lightColor,
    ambientColor: ambientColor,
    lightPosition: lightPosition,
    texture: texture,
  },
});

var texture2Material = new THREE.ShaderMaterial({
  uniforms: {
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess,
    lightColor: lightColor,
    ambientColor: ambientColor,
    lightPosition: lightPosition,
    texture2: texture4,
  },
});

// LOAD SHADERS
var shaderFiles = [
  'glsl/gouraud.fs.glsl','glsl/gouraud.vs.glsl',
  'glsl/phong.vs.glsl','glsl/phong.fs.glsl',
  'glsl/blinnPhong.vs.glsl','glsl/blinnPhong.fs.glsl',
  'glsl/texture.fs.glsl','glsl/texture.vs.glsl',
  'glsl/texture2.fs.glsl','glsl/texture2.vs.glsl',
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
 gouraudMaterial.vertexShader = shaders['glsl/gouraud.vs.glsl'];
 gouraudMaterial.fragmentShader = shaders['glsl/gouraud.fs.glsl'];
 phongMaterial.vertexShader = shaders['glsl/phong.vs.glsl'];
 phongMaterial.fragmentShader = shaders['glsl/phong.fs.glsl'];
 blinnPhongMaterial.vertexShader = shaders['glsl/blinnPhong.vs.glsl'];
 blinnPhongMaterial.fragmentShader = shaders['glsl/blinnPhong.fs.glsl'];
 textureMaterial.fragmentShader = shaders['glsl/texture.fs.glsl'];
 textureMaterial.vertexShader = shaders['glsl/texture.vs.glsl'];
 texture2Material.fragmentShader = shaders['glsl/texture2.fs.glsl'];
 texture2Material.vertexShader = shaders['glsl/texture2.vs.glsl'];
})

// CREATE SPHERES
var sphereRadius = 2.0;
var sphere = new THREE.SphereGeometry(sphereRadius, 16, 16);

var gouraudSphere = new THREE.Mesh(sphere, gouraudMaterial); 
gouraudSphere.position.set(-7.5, sphereRadius, 0);
scene.add(gouraudSphere);

var phongSphere = new THREE.Mesh(sphere, phongMaterial); 
phongSphere.position.set(-2.5, sphereRadius, 0);
scene.add(phongSphere);

var blinnPhongSphere = new THREE.Mesh(sphere, blinnPhongMaterial); 
blinnPhongSphere.position.set(2.5, sphereRadius, 0);
scene.add(blinnPhongSphere);

var textureSphere = new THREE.Mesh(sphere, textureMaterial); 
textureSphere.position.set(7.5, sphereRadius, 0);
scene.add(textureSphere);

var texture2Sphere = new THREE.Mesh(sphere, texture2Material); 
texture2Sphere.position.set(12.5, sphereRadius, 0);
scene.add(texture2Sphere);

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("L")) {
    lightColor.value = new THREE.Color(1.0,Math.random(),Math.random());
  }
  else if (keyboard.pressed("M")) {
    kAmbient.value = Math.random();
    kDiffuse.value = Math.random();
  }
  else if (keyboard.pressed("F")) {
    texture4.value = texture3.value;
  }

  else if (keyboard.pressed("B")) {
    texture4.value = texture2.value;
  }
}

// SETUP UPDATE CALL-BACK
var render = function() {
  checkKeyboard();
  textureMaterial.needsUpdate = true;
  texture2Material.needsUpdate = true;
	phongMaterial.needsUpdate = true;
	blinnPhongMaterial.needsUpdate = true;
	gouraudMaterial.needsUpdate = true;
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

render();
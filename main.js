import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

//luke code
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera );

//drawing lines:
//material
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
//geometry
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
//adding them together
const line = new THREE.Line( geometry, material );
//adding to scene
//scene.add( line );
//call renderer
renderer.render( scene, camera );


const geometry2 = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material2 = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const torus = new THREE.Mesh( geometry2, material2 );

scene.add(torus);

//floods the scene with light
const ambientLight = new THREE.AmbientLight( 0xffffff );
//or classic point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20 , 20, 20);
scene.add(pointLight);
//scene.add(ambientLight);

//light helper shows a wireframe
//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

//stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spareTexture = new THREE.TextureLoader().load('perfectDarkEyes.png');
scene.background = spareTexture;

const lukeTexture = new THREE.TextureLoader().load('byMtCook.jpg');

const luke = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: lukeTexture })
);
scene.add(luke);


//adding textures to materials
//renderer.outputEncoding = THREE.sRGBEncoding;
//texture.encoding = THREE.sRGBEncoding;

const loader = new GLTFLoader();
loader.load(function ( gltf ) {
  scene.add( gltf.scene );
  

const skateTexture = new THREE.TextureLoader().load('textures/skate_diffuse.png');
const skateNormal = new THREE.TextureLoader().load('textures/skate_normal.png');
const skateRoughness = new THREE.TextureLoader().load('textures/skate_specularGlossiness.png');
const skateMaterial = new THREE.MeshBasicMaterial({
  map: skateTexture,
  normalMap: skateNormal,
  roughnessMap: skateRoughness,
});
scene.add(skateMaterial);
}
);


function animate() {
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

//for mouse/orbit controls
  controls.update();

  renderer.render( scene, camera );
}

//text test (html id="info"; css .info)


animate();






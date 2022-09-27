/* #region  Imports */
import { FBXLoader } from './three.js-master/examples/jsm/loaders/FBXLoader.js';
import { FontLoader } from './three.js-master/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from './three.js-master/examples/jsm/geometries/TextGeometry.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from './three.js-master/build/three.module.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'
import { DoubleSide} from './three.js-master/build/three.module.js';
/* #endregion */
var portalParticles = [];
//                                                                   EVENT LISTENERS     
/* #region  Event listers */
//                                                                          SCENES
/* #region  Scenes */
//                                                      HOME
const home = createScene('home');
addOrbitControls(home);
const pointLight = new THREE.PointLight(0xffffff, 2, 500); // Create a point light and add to scene
home.scene.add(pointLight);
home.camera.position.set(0, 12, 15); // Position camera back enough to see the sphere
home.camera.rotation.set(-.8, 0, 0);

//                                                      SKILLS
const skills = createFullScreenScene('skills');
const directionalLight = new THREE.DirectionalLight(0xffffff, 18); // Create a directional light and add to scene
skills.scene.add(directionalLight);
skills.camera.position.set(-2, 0, 12); // Position camera back enough to see the sphere
const rectAreaLight = new THREE.RectAreaLight( 0xffffff, 10, 5, 5 );
rectAreaLight.position.set(10, 4.2, 1.1)
rectAreaLight.color.r = 1.1
rectAreaLight.color.g = 1
rectAreaLight.color.b = 1.5
skills.scene.add(rectAreaLight);

//                                                    PROJECTS
const projects = createFullScreenScene('projects');
const projectsDirectionalLight = new THREE.DirectionalLight(0xffffff, .3);
projects.scene.add(projectsDirectionalLight);
projectsDirectionalLight.position.set(0, 0, 1);
projects.camera.position.set(0, 0, 1000); // Position camera back enough to see the sphere
var portalLight = new THREE.PointLight(0x062d89, 30, 500, 1.2);
portalLight.position.set(0, 0, 250);
projects.scene.add(portalLight);


/* #endregion */

//                                                                       3D MODELS
/* #region  3D model */
//                                                                  HOME MODELS
/* #region   Sun*/

/*        Sun
Create sphere geometry (radius, width segments, height segments)
Create mesh for sphere assign sphere and import material from images */
const sunSphere = new THREE.Mesh(
  new THREE.SphereGeometry(3.25, 50, 50),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./images/sun.jpg')
  }));
// Add to scene
home.scene.add(sunSphere);


/* #endregion */

/* #region  Planets */

// Mercury
const mercury = createPlanet(1, './images/mercury.jpg', 4.95);

// Venus
const venus = createPlanet(1.2, './images/venus.jpg', 6.95);

// /*        Earth
// // Create sphere geometry (radius, width segments, height segments)
// // Create mesh for sphere assign sphere and import material from glsl files */
const earthSphere = new THREE.Mesh(
  new THREE.SphereGeometry(2, 50, 50),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./images/globe.jpg')
  }));
// Create earth object 
const earthObject = new THREE.Object3D();
earthObject.add(earthSphere);

earthSphere.position.x = 9.55;
earthSphere.scale.set(0.8, 0.8, 0.8);
// Add to scene
home.scene.add(earthObject);

// /*        Moon
// Create sphere geometry (radius, width segments, height segments)
// Create mesh for sphere assign sphere and import material from glsl files */
const earthMoonSphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 50, 50),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./images/moon.jpg')
  }));
// Create moon object 
const earthMoonObject = new THREE.Object3D();
earthMoonObject.add(earthMoonSphere);

earthMoonSphere.position.x = 2.3;
earthMoonSphere.position.y = 1.5;
earthMoonSphere.scale.set(0.45, 0.45, 0.45);
// Add to scene
earthSphere.add(earthMoonObject);

// Mars
const mars = createPlanet(1, './images/mars.jpg', 13.75);

// Jupiter
const jupiter = createPlanet(2.5, './images/jupiter.jpg', 19);

// Saturn
const saturn = createPlanet(2, './images/saturn.jpg', 24.5, {
  innerRadius: 2.2,
  outerRadius: 2.7,
  texture: './images/saturnRing.jpg'
});

// Uranus
const uranus = createPlanet(1.1, './images/saturnRing.jpg', 28.15);

// Neptune
const neptune = createPlanet(1.1, './images/neptune.jpg', 29.55);


/* #endregion */

/* #region  Stars */
// Create stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
});

// Populate stars
const starVertices = [];
for (let i = 0; i < 10000; i++) {
  // -0.5 gives random numbers on positive and negative side
  const x = (Math.random() - .5) * 2000;
  const y = (Math.random() - .5) * 2000;
  // -Math.random() makes sure stars are pushed behind the planets on the z axis
  const z = (Math.random() - .5) * 3500;
  starVertices.push(x, y, z);
}

// Set star positions and add to the scene
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
home.scene.add(stars);

// /* #endregion */

//                                                                   SKILLS MODELS
/* #region  Skills books */
//                              C SHARP BOOK
const cSharpBook = createBook('cSharp.png', skills);
cSharpBook.bookObject.position.set(-15, 2.5, 2);
cSharpBook.book.rotateY(.2);

//                            JAVASCRIPT BOOK
const jsBook = createBook('jsfront.png', skills);
jsBook.bookObject.position.set(-15, -4.5, 2);
jsBook.book.rotateY(.2);

//                               ASP.NET BOOK
const aspBook = createBook('aspfront.png', skills);
aspBook.bookObject.position.set(-10, 2.5, 1);
aspBook.book.rotateY(.2);

//                              THREE JS BOOK
const threeBook = createBook('threefront.png', skills);
threeBook.bookObject.position.set(-10, -4.5, 1);
threeBook.book.rotateY(.2);

//                                   SQL BOOK
const sqlBook = createBook('sqlfront.png', skills);
sqlBook.bookObject.position.set(-5, 2.5, 0);
sqlBook.book.rotateY(.2);

//                                 UNITY BOOK
const unityBook = createBook('unityfront.png', skills);
unityBook.bookObject.position.set(-5, -4.5, 0);
unityBook.book.rotateY(.2);

//                                    CSS BOOK
const cssBook = createBook('cssfront.png', skills);
cssBook.bookObject.position.set(0, 2.5, -1);
cssBook.book.rotateY(.2);

//                                  HTML BOOK
const htmlBook = createBook('htmlfront.png', skills);
htmlBook.bookObject.position.set(0, -4.5, -1);
htmlBook.book.rotateY(.2);
/* #endregion */
//                                                                 PROJECTS MODELS


/* #region  Project cards */
//                                     CHESS
const chessGame = createProject('chessGame.png', projects);
chessGame.projectMesh.position.set(-1500, -500, 0);
chessGame.projectMesh.name = 'Chess Game'
chessGame.projectMesh.userData = { URL: '', name: 'Chess Game'}

//                               3D PORTFOLIO
const threeD = createProject('threeD.png', projects);
threeD.projectMesh.position.set(-1500, 500, 0);
threeD.projectMesh.name = '3D'
threeD.projectMesh.userData = { URL: 'https://mikenichols1371.github.io/3DPortfolio/', name: '3D'}

//                             HIGH TECH LABS
const highTechProject = createProject('highTechProject.png', projects);
highTechProject.projectMesh.position.set(1500, 500, 0);
highTechProject.projectMesh.name = 'High Tech'
highTechProject.projectMesh.userData = { URL: 'https://hightechlabs.azurewebsites.net/', name: 'High Tech'};
console.log(highTechProject.projectMesh)

//                          REGULAR PORTFOLIO
const regPortProject = createProject('regPortProject.png', projects);
regPortProject.projectMesh.position.set(1500, -500, 0);
regPortProject.projectMesh.name = 'Regular Portfolio'
regPortProject.projectMesh.userData = { URL: 'https://mikenichols1371.github.io/Portfolio-Website/', name: 'Regular Portfolio'};
console.log(regPortProject.projectMesh)

/* #endregion */

//                                                                       FBX / GLB
/* #region  FBX / GLB */

var laptopGLB = createGLB(skills, 'laptop.glb', 2.2, 10, -1, 0, .5, -.6, 0);


/* #endregion */

//                                                                          3D TEXT
/* #region  3D text */
//                                           SKILLS
//                                    TITLE SECTION    (scene, text content, size, color, rotateY, x, y, z, rotateX?)
const skillsTitleSection = createText(skills, 'Skills', 2, 0xffffff, 5.7, 16, -5, -15, .05, -.2);

//                                        PROJECTS
//                                      TITLE SECTION
const projectsPortal = particleSetUp(projects);
const projectsTitle = createText(projects, 'Projects', 150, 0xffffff, 0, -380, -55, 150);

//                                        DIRECTIONS

const directionsText2 = createText(projects, 'Click project to be redirected to its site', 40, 0xffffff, 0, -475, -850, 0)

//                                            TOP
const threeDPortfolioTitle = createText(projects, '3D Portfolio Website Three.js', 40, 0xffffff, 0, -1825, 150, 0)
const highTechMVCTitle = createText(projects, 'High Tech Labs MVC', 40, 0xffffff, 0, 1250, 150, 0)

//                                        BOTTOM
const chessGameTitle = createText(projects, 'Chess Game  Unity', 40, 0xffffff, 0, -1700, -850, 0)
const regularPortfolioTitle = createText(projects, 'Regular Portfolio Website', 40, 0xffffff, 0, 1150, -850, 0)

/* #endregion */


//                                                                        FUNCTIONS
/* #region  Functions */
function createScene(id) {

  // Create a scene
  const scene = new THREE.Scene();
  // Create a container for canvas so i can use flex colums
  const canvasContainer = document.querySelector(`#${id}-canvas-container`);
  // Create a camera (field of view, aspect ratio, near clipping, far clipping)
  const camera = new THREE.PerspectiveCamera(90, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 2000);
  // Create a renderer   antialias helps smooth image
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    // Apply canvas
    canvas: document.querySelector(`#${id}-canvas`)
  });
  // Set renderer to full size of browser window 
  renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
  // Set renderer pixel ratio to smooth image and add extra details
  renderer.setPixelRatio(devicePixelRatio);
  return { scene, camera, renderer, canvasContainer }

}
function createFullScreenScene(id) {

  // Create a scene
  const scene = new THREE.Scene();
  // Create a container for canvas so i can use flex colums
  const canvasContainer = document.querySelector(`#${id}-canvas-container`);
  // Create a camera (field of view, aspect ratio, near clipping, far clipping)
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 2000);
  // Create a renderer   antialias helps smooth image
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    // Apply canvas
    canvas: document.querySelector(`#${id}-canvas`)
  });
  // Set renderer to full size of browser window 
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Set renderer pixel ratio to smooth image and add extra details
  renderer.setPixelRatio(devicePixelRatio);
  return { scene, camera, renderer, window }
}

function createGLB(whatScene, whatGLB, scale, posX, posY, posZ, rotateX, rotateY, rotateZ, rotationY = 0) {
  const glftLoader = new GLTFLoader();
  glftLoader.load(`./3d/${whatGLB}`, function (glb) {
    whatScene.scene.add(glb.scene);
    glb.scene.position.set(posX, posY, posZ);
    glb.scene.scale.set(scale, scale, scale);
    glb.scene.rotateX(rotateX);
    glb.scene.rotateY(rotateY);
  })
}
const clock = new THREE.Clock(true);
//                                                ANIMATE (calls 60 fps)
function animate() {
  requestAnimationFrame(animate);

  // Home modes
  /* #region  Home */
  sunSphere.rotation.y += .004;
  mercury.mesh.rotateY(.004);
  mercury.object.rotateY(.0091);
  venus.mesh.rotateY(- .002);
  venus.object.rotateY(.008);
  earthSphere.rotation.y += 0.01;
  earthObject.rotation.y += .01;
  earthMoonSphere.rotation.y += 0.002;
  earthMoonObject.rotation.y += .015;
  mars.mesh.rotateY(.0019);
  mars.object.rotateY(.01);
  jupiter.mesh.rotateY(.0045);
  jupiter.object.rotateY(.0035);
  neptune.mesh.rotateY(.0055);
  neptune.object.rotateY(.0028);
  uranus.mesh.rotateY(-.035);
  uranus.object.rotateY(.0025);
  saturn.mesh.rotateY(.00385);
  saturn.object.rotateY(.002);
 
  /* #endregion */

  // Skills Models
  /* #region  Skills */
  aspBook.bookObject.rotateY(.01);
  cSharpBook.bookObject.rotateY(.01);
  htmlBook.bookObject.rotateY(.01);
  threeBook.bookObject.rotateY(.01);
  cssBook.bookObject.rotateY(.01);
  jsBook.bookObject.rotateY(.01);
  sqlBook.bookObject.rotateY(.01);
  unityBook.bookObject.rotateY(.01);
  /* #endregion */

  /* #region  Renderers */
  home.renderer.render(home.scene, home.camera);
  skills.renderer.render(skills.scene, skills.camera);
  projects.renderer.render(projects.scene, projects.camera);
  /* #endregion */

  onWindowResize(home);
  onWindowResizeFullScreen(skills);
  onWindowResizeFullScreen(projects);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  requestAnimationFrame(raycast);

  portalParticles.forEach(p => {
    p.rotation.z -= delta * 1.5;
  })
  if(Math.random() > 0.9) {
    portalLight.power = 350 + Math.random() * 500;
  }
}
// // Create Planets
function createPlanet(size, texture, position, ring) {
  const sphere = new THREE.SphereGeometry(size, 50, 50);
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(texture)
  });

  const mesh = new THREE.Mesh(sphere, material);
  const object = new THREE.Object3D();
  object.add(mesh);

  if (ring) {
    const ringGeometry = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 100);
    const saturnRingMaterial = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(ring.texture),
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeometry, saturnRingMaterial);
    object.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotateY(4.5);
    ringMesh.rotateX(8.3)
  }

  mesh.position.x = position;
  home.scene.add(object);

  return { mesh, object };
}
// Home page text animation
function textLoad() {
  var text;
  var delay = 0;
  var textList = ['I know C#', 'I know SQL', 'I know ASP.NET', 'I know JavaScript', 'I know Three.js', 'I know HTML', 'I know CSS', 'I know Unity'];
  text = document.querySelector('.text');
    for (let i = 0; i < textList.length; i++)
    {
      setInterval(() => {
        text.textContent = textList[i];
      }, delay += 2000);
    }
}
//                                                          CREATE TEXT
function createText(whatScene, textContent, size, color, rotateY, posX, posY, posZ, rotateX = 0, rotateZ = 0) {
  const textLoader = new FontLoader();
  textLoader.load('./fonts/Oswald_Bold.json', function (font) {
    const textGeometry = new TextGeometry(textContent, {
      font: font,
      size: size,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5

    });

    const textMesh = new THREE.Mesh(textGeometry, [
      new THREE.MeshBasicMaterial({
        color: color
      })
    ]);
    textMesh.rotateY(rotateY);
    textMesh.rotateX(rotateX);
    textMesh.rotateZ(rotateZ);
    textMesh.position.set(posX, posY, posZ);
    whatScene.scene.add(textMesh);
  })
}
//                                                          CREATE FBX
var mixer;
function createFBX(whatScene, fbxCharacter, fbxAnim, posX, posY, posZ, scale) {
  const fbxLoader = new FBXLoader();
  fbxLoader.load(`./3d/${fbxCharacter}`, function (object) {

    const animation = new FBXLoader();
    animation.load(`./3d/${fbxAnim}`, (animation) => {
      mixer = new THREE.AnimationMixer(object);
      const action = mixer.clipAction(animation.animations[0]);
      action.play();
    })
    object.scale.set(scale, scale, scale);
    object.position.set(posX, posY, posZ);
    whatScene.scene.add(object);
  });
}
function createBook(image, whatScene) {
  const book = new THREE.Mesh(new THREE.BoxGeometry(3.5, 5, .5),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`./book/${image}`) }));
  const bookObject = new THREE.Object3D();
  bookObject.add(book)
  whatScene.scene.add(bookObject);
  return { book, bookObject }
}
function addOrbitControls(whatScene) {
  const cameraOrbit = new OrbitControls(whatScene.camera, whatScene.renderer.domElement); // Camera orbit more info @ https://threejs.org/docs/#examples/en/controls/OrbitControls
  cameraOrbit.enableZoom = false;
  cameraOrbit.update();
}
function createProject(image, whatScene) {
  const projectBox = new THREE.PlaneGeometry(10, 6 );
  const projectMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(`./images/${image}`),
    side: DoubleSide
  });
  const projectMesh = new THREE.Mesh(projectBox, projectMaterial);
  const projectObject = new THREE.Object3D();
  projectObject.add(projectMesh);
  projectMesh.scale.set(75, 75, 75);
  whatScene.scene.add(projectMesh);
  return { projectMesh, projectObject };
}
function onWindowResize(whatScene) {
  whatScene.camera.aspect = whatScene.canvasContainer.offsetWidth / whatScene.canvasContainer.offsetHeight;
  whatScene.camera.updateProjectionMatrix();
  whatScene.renderer.setSize(whatScene.canvasContainer.offsetWidth, whatScene.canvasContainer.offsetHeight);
}
function onWindowResizeFullScreen(whatScene) {
  whatScene.camera.aspect = whatScene.window.innerWidth / whatScene.window.innerHeight;
  whatScene.camera.updateProjectionMatrix();
  whatScene.renderer.setSize(whatScene.window.innerWidth, whatScene.window.innerHeight);
}
/* #endregion */

animate();
textLoad();

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {
	pointer.x = ( event.clientX / projects.window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / projects.window.innerHeight ) * 2 + 1;
}
function raycast() {

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, projects.camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( projects.scene.children, true );
  
	for ( let i = 0; i < intersects.length; i ++ ) {
    if(intersects[i].object.userData.URL && intersects[i].object.userData.name){
    window.open(intersects[i].object.userData.URL)
    
	}
}};
window.addEventListener( 'click', onPointerMove );

function particleSetUp(whatScene) {
  var portalLoader = new THREE.TextureLoader();
  portalLoader.load('./images/smoke.png', function (texture) {
    var portalGeometry = new THREE.PlaneGeometry(350, 350);
    var portalMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true
    });
    var smokeGeometry = new THREE.PlaneGeometry(800, 800);
    var smokeMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true
    });
    for (var p = 880; p > 250;  p--) {
    var portal = new THREE.Mesh(portalGeometry, portalMaterial);
    portal.position.set(
      0.5 * p * Math.cos((4 * p * Math.PI) / 180),
      0.5 * p * Math.sin((4 * p * Math.PI) / 180),
      0.1 * p
    )
    portal.rotation.z = Math.random() * 360;
    portalParticles.push(portal);
    whatScene.scene.add(portal);
    }
    for (var p = 0; p < 40;  p++) {
      var portal = new THREE.Mesh(smokeGeometry, smokeMaterial);
      portal.position.set(
        Math.random() * 1000-600,
        Math.random() * 400-200,
        25
      )
      portal.rotation.z = Math.random() * 360;
      portal.material.opacity = .4;
      portalParticles.push(portal);
      whatScene.scene.add(portal);
      }
  })
};

console.log(projects.scene)

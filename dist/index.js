/* #region  Imports */
import { FBXLoader } from './three.js-master/examples/jsm/loaders/FBXLoader.js';
import { FontLoader } from './three.js-master/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from './three.js-master/examples/jsm/geometries/TextGeometry.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { FirstPersonControls } from './three.js-master/examples/jsm/controls/FirstPersonControls.js';
import * as THREE from 'https://unpkg.com/three@0.144.0/build/three.module.js';
import sunTexture from './images/sun.jpg';
import mercuryTexture from './images/mercury.jpg';
import venusTexture from './images/venus.jpg';
import earthTexture from './images/globe.jpg';
import moonTexture from './images/moon.jpg';
import marsTexture from './images/mars.jpg';
import jupiterTexture from './images/jupiter.jpg';
import saturnTexture from './images/saturn.jpg';
import saturnRingTexture from './images/saturnRing.jpg';
import uranusTexture from './images/uranus.jpg';
import neptuneTexture from './images/neptune.jpg';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'
import { DoubleSide, TubeBufferGeometry } from 'three';
/* #endregion */

//                                                                   EVENT LISTENERS     
/* #region  Event listers */
// Event listeners




/* #endregion */

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
const skills = createScene('skills');
addOrbitControls(skills);
const ambientLight = new THREE.AmbientLight(0xffffff, 1.8); // Create a ambient light and add to scene
skills.scene.add(ambientLight);
skills.camera.position.set(-2, 0, 12); // Position camera back enough to see the sphere

//                                                  SKILLS TITLE
const skillsText = createScene('skills-text');
const skillsTextCameraOrbit = new OrbitControls(skillsText.camera, skillsText.renderer.domElement); // Camera orbit more info @ https://threejs.org/docs/#examples/en/controls/OrbitControls
skillsTextCameraOrbit.update();
const directionalLight = new THREE.DirectionalLight(0xffffff, 16);
skillsText.scene.add(directionalLight);
skillsText.camera.position.set(40, 35, 300); // Position camera back enough to see the sphere

//                                                    PROJECTS
const projects = createScene('projects');
addOrbitControls(projects);
projects.scene.add(ambientLight);
projects.camera.position.set(2, 300, 500); // Position camera back enough to see the sphere
const firstPersonControls = new FirstPersonControls(projects.camera, projects.canvasContainer);
firstPersonControls.constrainVertical = true;
firstPersonControls.movementSpeed = 8;
firstPersonControls.rollSpeed = 0;
firstPersonControls.heightMin = 1;
firstPersonControls.verticalMin = Math.PI / 1.7;
firstPersonControls.verticalMax = Math.PI / 2.3;

//                                              PROJECTS TITLE
const projectsText = createScene('projects-text');
projectsText.scene.add(ambientLight);
projectsText.camera.position.set(120, 35, 300); // Position camera back enough to see the sphere
projectsText.canvasContainer.addEventListener('resize', onWindowResize, false);

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
    map: new THREE.TextureLoader().load(sunTexture)
  }));
// Add to scene
home.scene.add(sunSphere);


/* #endregion */

/* #region  Planets */

// Mercury
const mercury = createPlanet(1, mercuryTexture, 4.95);

// Venus
const venus = createPlanet(1.2, venusTexture, 6.95);

// /*        Earth
// // Create sphere geometry (radius, width segments, height segments)
// // Create mesh for sphere assign sphere and import material from glsl files */
const earthSphere = new THREE.Mesh(
  new THREE.SphereGeometry(2, 50, 50),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(earthTexture)
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
    map: new THREE.TextureLoader().load(moonTexture)
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
const mars = createPlanet(1, marsTexture, 13.75);

// Jupiter
const jupiter = createPlanet(2.5, jupiterTexture, 19);

// Saturn
const saturn = createPlanet(2, saturnTexture, 24.5, {
  innerRadius: 2.2,
  outerRadius: 2.7,
  texture: saturnRingTexture
});

// Uranus
const uranus = createPlanet(1.1, uranusTexture, 28.15);

// Neptune
const neptune = createPlanet(1.1, neptuneTexture, 29.55);


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
cSharpBook.bookObject.position.set(-9, 2.5, 2);
cSharpBook.book.rotateY(.2);

//                            JAVASCRIPT BOOK
const jsBook = createBook('jsfront.png', skills);
jsBook.bookObject.position.set(-9, -4.5, 2);
jsBook.book.rotateY(.2);

//                               ASP.NET BOOK
const aspBook = createBook('aspfront.png', skills);
aspBook.bookObject.position.set(-4, 2.5, 1);
aspBook.book.rotateY(.2);

//                              THREE JS BOOK
const threeBook = createBook('threefront.png', skills);
threeBook.bookObject.position.set(-4, -4.5, 1);
threeBook.book.rotateY(.2);

//                                   SQL BOOK
const sqlBook = createBook('sqlfront.png', skills);
sqlBook.bookObject.position.set(1, 2.5, 0);
sqlBook.book.rotateY(.2);

//                                 UNITY BOOK
const unityBook = createBook('unityfront.png', skills);
unityBook.bookObject.position.set(1, -4.5, 0);
unityBook.book.rotateY(.2);

//                                    CSS BOOK
const cssBook = createBook('cssfront.png', skills);
cssBook.bookObject.position.set(6, 2.5, -1);
cssBook.book.rotateY(.2);

//                                  HTML BOOK
const htmlBook = createBook('htmlfront.png', skills);
htmlBook.bookObject.position.set(6, -4.5, -1);
htmlBook.book.rotateY(.2);
/* #endregion */

//                                                                 PROJECTS MODELS

/* #region  Floor */
const floor = new THREE.Mesh(new THREE.PlaneGeometry(1500, 1500),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./images/floor.jpg'), 
    side: THREE.DoubleSide
  }));
floor.rotation.set(30, 0, 0)
floor.position.set(0, -10, 0)
const floorObject = new THREE.Object3D();
floorObject.add(floor)
floor.name = 'floor';
console.log(floor.userData)
projects.scene.add(floor);
/* #endregion */

/* #region  Project cards */
// wwwwwww
//                                     CHESS
const chessGame = createProject('chessGame.png', projects);
chessGame.projectMesh.position.set(-380, 200, -740);
chessGame.projectMesh.rotateY(.6);
chessGame.projectMesh.name = 'Chess Game'
chessGame.projectMesh.userData = { URL: ''}

//                               3D PORTFOLIO
const threeD = createProject('threeD.png', projects);
threeD.projectMesh.position.set(-380, 160, -50);
threeD.projectMesh.rotateY(.6);
threeD.projectMesh.name = '3D'
threeD.projectMesh.userData = { URL: 'https://mikenichols1371.github.io/3DPortfolio/'}

//                             HIGH TECH LABS
const highTechProject = createProject('highTechProject.png', projects);
highTechProject.projectMesh.position.set(380, 160, -50);
highTechProject.projectMesh.rotateY(-.6);
highTechProject.projectMesh.name = 'High Tech'
highTechProject.projectMesh.userData = { URL: 'https://hightechlabs.azurewebsites.net/'};
console.log(highTechProject.projectMesh)

//                          REGULAR PORTFOLIO
const regPortProject = createProject('regPortProject.png', projects);
regPortProject.projectMesh.position.set(380, 200, -740);
regPortProject.projectMesh.rotateY(-.6);
regPortProject.projectMesh.name = 'Regular Portfolio'
regPortProject.projectMesh.userData = { URL: 'https://mikenichols1371.github.io/Portfolio-Website/'};
console.log(regPortProject.projectMesh)

/* #endregion */

//                                                                       FBX / GLB
/* #region  FBX / GLB */
//        Skills Title Section (scene, glb, scale, posX, posY, posZ rotateX, rotateY, rotationY)
var beltGLB = createGLB(skillsText, 'belt.glb', 100, 25, 20, 35, 6, .05);
//                                                                       (scene, fbxChar, fbxAnim, posX, posY, posZ, scale)
const projectsTitleSectionCharacter = createFBX(projectsText, 'boss.fbx', 'dance1.fbx', 120, -40, 15, 1);

/* #endregion */

//                                                                          3D TEXT
/* #region  3D text */
//                                           SKILLS
//                                    TITLE SECTION    (scene, text content, rotateY, x, y, z, rotationY?)
const skillsTitleSection = createText(skillsText, 'Skills', 50, 0xffffff, -.6, -55, -25, 35, .05)

//                                        PROJECTS
//                                      TITLE SECTION
const projectsTitleSection = createText(projectsText, 'Projects', 60, 0xffffff, .6, 0, -220, 0);


//                                          FRONT
const threeDPortfolioTitle = createText(projects, '3D Portfolio Website Three.js', 22, 0xffffff, .6, -500, 50, 70)
const highTechMVCTitle = createText(projects, 'High Tech Labs MVC', 22, 0xffffff, -.6, 260, 50, -100)

//                                           BACK
const chessGameTitle = createText(projects, 'Chess Game  Unity', 22, 0xffffff, .6, -460, 110, -570)
const regularPortfolioTitle = createText(projects, 'Regular Portfolio Website', 22, 0xffffff, -.6, 200, 110, -700)

//                                        DIRECTIONS
const directionsText = createText(projects, 'Move Controls: WASD', 40, 0xffffff, 0, -300, 950, -1000)

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

function createGLB(whatScene, whatGLB, scale, posX, posY, posZ, rotateX, rotateY, rotationY = 0) {
  const glftLoader = new GLTFLoader();
  glftLoader.load(`./3d/${whatGLB}`, function (glb) {
    whatScene.scene.add(glb.scene);
    glb.scene.position.set(posX, posY, posZ);
    glb.scene.scale.set(scale, scale, scale);
    glb.scene.rotateX(rotateX);
    glb.scene.rotateY(rotateY);
    glb.scene.rotateY = rotateY;
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
  skillsText.renderer.render(skillsText.scene, skillsText.camera);
  projects.renderer.render(projects.scene, projects.camera);
  projectsText.renderer.render(projectsText.scene, projectsText.camera);
  /* #endregion */

  // raycast.setFromCamera(moveMouse, projects.camera);
  // const intersects = raycast.intersectObjects(clickableLinks);
  onWindowResize(home);
  onWindowResize(skills);
  onWindowResize(skillsText);
  onWindowResize(projects);
  onWindowResize(projectsText);
  firstPersonControls.update(.3);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  requestAnimationFrame(raycast)
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
function createText(whatScene, textContent, size, color, rotateY, posX, posY, posZ, rotationY = 0) {
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
    textMesh.rotateY(rotateY)
    textMesh.rotation.y += rotationY;
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
  cameraOrbit.update();
}
function createProject(image, whatScene) {
  const projectBox = new THREE.PlaneGeometry(10, 7 );
  const projectMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(`./images/${image}`),
    side: DoubleSide
  });
  const projectMesh = new THREE.Mesh(projectBox, projectMaterial);
  const projectObject = new THREE.Object3D();
  projectObject.add(projectMesh);
  projectMesh.scale.set(25, 25, 25);
  whatScene.scene.add(projectMesh);
  return { projectMesh, projectObject };
}
function onWindowResize(whatScene) {
  whatScene.camera.aspect = whatScene.canvasContainer.offsetWidth / whatScene.canvasContainer.offsetHeight;
  whatScene.camera.updateProjectionMatrix();
  whatScene.renderer.setSize(whatScene.canvasContainer.offsetWidth, whatScene.canvasContainer.offsetHeight);
}
/* #endregion */





animate();
textLoad();

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {
	pointer.x = ( event.offsetX / projects.canvasContainer.offsetWidth ) * 2 - 1;
	pointer.y = - ( event.offsetY / projects.canvasContainer.offsetHeight ) * 2 + 1;
}
function raycast() {

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, projects.camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( projects.scene.children, true );
  
	for ( let i = 0; i < intersects.length; i ++ ) {
    if(intersects[i].object.userData.URL)

		// console.log(intersects[ i].children)
    // console.log(intersects[i].object)
    window.open(intersects[i].object.userData.URL)
   
	}
  
	

}
window.addEventListener( 'click', onPointerMove );
console.log(projects.scene.children)


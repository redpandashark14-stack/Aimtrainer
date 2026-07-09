import * as THREE from "three";

const scene=new THREE.Scene();

scene.background=new THREE.Color(0x2d2d2d);

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.y=2;

const renderer=new THREE.WebGLRenderer({antialias:true});

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const light=new THREE.DirectionalLight(0xffffff,2);

light.position.set(5,10,5);

scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,.5));

const floor=new THREE.Mesh(

new THREE.PlaneGeometry(100,100),

new THREE.MeshStandardMaterial({

color:0x606060

})

);

floor.rotation.x=-Math.PI/2;

scene.add(floor);

const wall=new THREE.Mesh(

new THREE.BoxGeometry(40,15,1),

new THREE.MeshStandardMaterial({

color:0x888888

})

);

wall.position.set(0,7,-28);

scene.add(wall);

const target=new THREE.Mesh(

new THREE.SphereGeometry(.5),

new THREE.MeshStandardMaterial({

color:"red"

})

);

target.position.set(0,5,-27.4);

scene.add(target);

const keys={};

document.addEventListener("keydown",e=>{

keys[e.key.toLowerCase()]=true;

});

document.addEventListener("keyup",e=>{

keys[e.key.toLowerCase()]=false;

});

let yaw=0;

let pitch=0;

document.body.onclick=()=>{

document.body.requestPointerLock();

};

document.addEventListener("mousemove",e=>{

if(document.pointerLockElement!==document.body)return;

yaw-=e.movementX*.002;

pitch-=e.movementY*.002;

pitch=Math.max(-1.5,Math.min(1.5,pitch));

camera.rotation.order="YXZ";

camera.rotation.y=yaw;

camera.rotation.x=pitch;

});

function move(){

const speed=.15;

if(keys.w){

camera.position.x-=Math.sin(yaw)*speed;

camera.position.z-=Math.cos(yaw)*speed;

}

if(keys.s){

camera.position.x+=Math.sin(yaw)*speed;

camera.position.z+=Math.cos(yaw)*speed;

}

if(keys.a){

camera.position.x-=Math.cos(yaw)*speed;

camera.position.z+=Math.sin(yaw)*speed;

}

if(keys.d){

camera.position.x+=Math.cos(yaw)*speed;

camera.position.z-=Math.sin(yaw)*speed;

}

}

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});

function animate(){

requestAnimationFrame(animate);

move();

renderer.render(scene,camera);

}

animate();

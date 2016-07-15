window.onload=init;

var keys={
	'UP':87,
	'RIGHT':68,
	'DOWN':83,
	'LEFT':65,

}

var camera,scene,renderer;
var width=window.innerWidth,height=window.innerHeight;
var canvas;


var player;
var terrain;
var terrain2;

function init(){
	scene=new THREE.Scene();
	camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
	renderer=new THREE.WebGLRenderer();
	renderer.setSize(width,height);
	canvas=renderer.domElement;
	document.body.appendChild( canvas );
	console.log("Hello1");
	camera.position.z=24;
	camera.position.y=6;
	var geom=new THREE.BoxGeometry(1,1,1);
	var mat=new THREE.MeshBasicMaterial({color:0x00ff00});

	player=new Player(geom,mat);
	player.addToScene(scene);

	terrain=new Terrain(new THREE.Vector3(0,0,-300));
	terrain.addToScene(scene);

	terrain2=new Terrain(new THREE.Vector3(0,0,0));
	terrain2.addToScene(scene);

	document.onkeydown=press_keyboard;
	document.onkeyup=up_keyboard;

	render();
}

function render(){
	renderer.render(scene,camera);

	cameraUpdate();
	player.update();
	terrain.update();
	terrain2.update();

	if(isKeyDown('DOWN')) player.move(2);
	if(isKeyDown('UP')) player.move(0);
	if(isKeyDown('LEFT')) player.move(3);
	if(isKeyDown('RIGHT')) player.move(1);


	requestAnimationFrame(render);
}



var Player=function(g,m){
	this.geometry=g;
	this.material=m;
	this.position=new THREE.Vector3(0,0,0);
	this.speed=new THREE.Vector3(0,0,0);
	this.mesh=new THREE.Mesh(this.geometry,this.material);
};




Player.prototype.addToScene = function(scene) {
	scene.add(this.mesh);
};

Player.prototype.move = function(dir) {
	console.log("dir "+dir);
	switch(dir){
		case 0:
		this.speed.set(0,0.2,0);
		//console.log("speed "+this.speed);
		break;

		case 1:
		this.speed.set(0.2,0,0);
		break;

		case 2:
		this.speed.set(0,-0.2,0);
		break;

		case 3:
		this.speed.set(-0.2,0,0);
		break;

	}

	this.position.add(this.speed);
	
	//this.speed.set(0,0,0);
	//console.log(this.position);
};

Player.prototype.update = function() {
	this.mesh.position.x=this.position.x;
	this.mesh.position.y=this.position.y;
	this.mesh.position.z=this.position.z;
};

var cameraUpdate=function(){
	camera.position.x=player.mesh.position.x;
}
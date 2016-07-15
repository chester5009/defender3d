window.onload=init;

var keys={
	'UP':87,
	'RIGHT':68,
	'DOWN':83,
	'LEFT':65,
	'SPACE':32
}

var camera,scene,renderer;
var width=window.innerWidth,height=window.innerHeight;
var canvas;

var clock

var global_speed=6.5;
var player;

var enemyGeom;
var enemyMaterial;

var bulletGeom1;
var bulletMaterial1;

var enemys=[];
var playerBullets=[];

var terrain;
var terrain2;

var rayCaster;
var mouse=new THREE.Vector2();

function init(){
	scene=new THREE.Scene();
	camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
	renderer=new THREE.WebGLRenderer();
	renderer.setSize(width,height);
	canvas=renderer.domElement;
	document.body.appendChild( canvas );
	console.log("Hello1");

	clock=new THREE.Clock();

	camera.position.z=20;
	camera.position.y=6;
	var geom=new THREE.BoxGeometry(1,1,1);
	var mat=new THREE.MeshBasicMaterial({color:0x00ff00});

	enemyGeom=new THREE.SphereGeometry(2,16,16);
	enemyMaterial=new THREE.MeshBasicMaterial({color:Math.random()*0xffffff});

	bulletGeom1=new THREE.SphereGeometry(0.4,8,8);
	bulletMaterial1=new THREE.MeshBasicMaterial({color:Math.random()*0xffffff});

	player=new Player(geom,mat);
	player.addToScene(scene);

	terrain=new Terrain(new THREE.Vector3(0,0,-1000));
	terrain.addToScene(scene);

	terrain2=new Terrain(new THREE.Vector3(0,0,0));
	terrain2.addToScene(scene);



	document.onkeydown=press_keyboard;
	document.onkeyup=up_keyboard;
	document.onmousemove=mouse_move;
	clock.start();
	render();

}
var time=50,timer=0;
function render(){
	
	renderer.render(scene,camera);

	cameraUpdate();
	player.update();
	terrain.update();
	terrain2.update();
	for (var i = 0; i < enemys.length; i++) {
		enemys[i].update();
		if(enemys[i].isLife==false) {
			enemys[i].removeFromScene(scene);
			enemys.splice(i,1);
		}
	}
	for (var i = 0; i < playerBullets.length; i++) {
		playerBullets[i].update();
		if(playerBullets[i].isLife==false) {
			playerBullets[i].removeFromScene(scene);
			playerBullets.splice(i,1);
		}
	}
	if(isKeyDown('DOWN')) player.move(2);
	if(isKeyDown('UP')) player.move(0);
	if(isKeyDown('LEFT')) player.move(3);
	if(isKeyDown('RIGHT')) player.move(1);
	
	if(isKeyDown('SPACE')) playerShoot();
	timer+=1;
	//createEnemy();
	if(timer-time>0){
		createEnemy();
		//time=timer;
		timer=0;
	}
	//console.log("TIME "+timer);

	
	intersectBulletsEnemys();
	requestAnimationFrame(render);
}


var cameraUpdate=function(){

	camera.position.x=player.position.x;
	camera.position.y=player.position.y+5;
};

var createEnemy=function(){
	var position=new THREE.Vector3(Math.random()*200-100,Math.random()*100,-1000);
	var newEnemy=new Enemy(enemyGeom,enemyMaterial,position);
	newEnemy.addToScene(scene);
	enemys.push(newEnemy);

};
var createBullet=function(from,toPush,speed,acc){
	var newBullet=new Bullet(bulletGeom1,bulletMaterial1,from,speed,acc);
	newBullet.addToScene(scene);
	toPush.push(newBullet);
}
var playerShoot=function(){
	if(player.reloadTime<player.reloadTimer){
		var pos=new THREE.Vector3(0,0,0); 
		pos.add(player.position);
		pos.add(new THREE.Vector3(0,0,-3));
		createBullet(pos,playerBullets,new THREE.Vector3(0,0,-1),16);

		player.reloadTimer=0;
	}
	
};

var intersectBulletsEnemys=function(){
	rayCaster=new THREE.Raycaster();
	rayCaster.setFromCamera(mouse,camera);
	//rayCaster=new THREE.Raycaster(camera.position,new THREE.Vector3(0,0,-1),0.1,1000);
	var intersects=rayCaster.intersectObjects(scene.children);

	for (var i = 0; i < intersects.length; i++) {
		//intersects[i].object.material.color.set(Math.random()*0xffffff);
	}
	//console.log("MOUSE "+mouse.x+" "+mouse.y);
};
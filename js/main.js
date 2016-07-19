window.onload=preloader;

var keys={
	'UP':87,
	'RIGHT':68,
	'DOWN':83,
	'LEFT':65,
	'SPACE':32
}

var isPlaing=true;

var camera,scene,renderer;
var width=window.innerWidth,height=window.innerHeight;
var canvas;

var clock

var text2;
var totalLife=2;
var currentLife=totalLife;

var global_speed=6.5;
var player;

var playerModel;
var geom,mat;

var enemyModel;
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

var _loaded=0;_total=0;

var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
	_loaded=loaded;
	_total=total+3;
	console.log( item, _loaded, _total );

};
manager.onLoad=function () {
	console.log("All loaded!!");
	console.log("MODEL LOADED",playerModel);
	if(_loaded>=_total)
	init();
}

var snd,snd2,snd3;
var loader;



function preloader() {
	loadSound();
	_total=1;
	console.log(playerModel);
	loader=new THREE.OBJLoader(manager);

	loader.load('assets/Su-27_Flanker.obj',function(object){
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				child.material=new THREE.MeshNormalMaterial();
			}
		});
		console.log("OBJ ",object);
		playerModel=object;
		
	},onProgress,onError);

	loader.load('assets/B-52H_Stratofortress_highpoly.obj',function(object){
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				child.material=new THREE.MeshNormalMaterial();
			}
		});
		console.log("OBJ ",object);
		enemyModel=object;
		
	},onProgress,onError);
	//loader.load('assets/')
	
}

function onProgress(xhr){
	
}
function onError(){

}

function init(){

	text2 = document.createElement('div');
	text2.style.position = 'absolute';
	//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
	text2.style.width = 100;
	text2.style.height = 100;
	text2.style.backgroundColor = "white";
	text2.innerHTML = "hi there!";
	text2.style.top = 100 + 'px';
	text2.style.left = 100 + 'px';
	document.body.appendChild(text2);

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
	geom=new THREE.BoxGeometry(1,1,1);
	mat=new THREE.MeshBasicMaterial({color:0x00ff00});

	enemyGeom=new THREE.SphereGeometry(2,16,16);
	enemyMaterial=new THREE.MeshBasicMaterial({color:Math.random()*0xffffff});

	bulletGeom1=new THREE.SphereGeometry(0.4,8,8);
	bulletMaterial1=new THREE.MeshBasicMaterial({color:Math.random()*0xffffff});

	//loadFiles();

	console.log("Modell ",playerModel);
	
	player=new Player(geom,mat,playerModel);
			player.addToScene(scene);
			player.isReady=true;
	

	terrain=new Terrain(new THREE.Vector3(0,0,-1000));
	terrain.addToScene(scene);

	terrain2=new Terrain(new THREE.Vector3(0,0,0));
	terrain2.addToScene(scene);



	document.onkeydown=press_keyboard;
	document.onkeyup=up_keyboard;
	document.onmousemove=mouse_move;

	
	/*while(_loaded<_total){
		console.log("loading :",_loaded," of ",_total);
	}*/
	clock.start();
	render();

}


/*var loadFiles=function(){

	var ambient=new THREE.AmbientLight(0xf3f3f3);
	scene.add(ambient);

	var dirl=new THREE.DirectionalLight(0xEAE983);
	dirl.position.set(0,15,4);
	scene.add(dirl);

	var ld=new THREE.ImageLoader(manager);
	var texture=new THREE.Texture();
	ld.load('assets/Su-27_Flanker_N.png',function(image){
		texture.image=image;
		texture.needsUpdate=true;
	});
	loader = new THREE.OBJLoader();

	// load a resource
	loader.load(
		// resource URL
		'assets/Su-27_Flanker.obj',
		// Function when resource is loaded
		function ( object ) {
			object.traverse(function(child){
				if(child instanceof THREE.Mesh){
					child.material.map=texture;
				}
			});
			playerModel=object;
			player=new Player(geom,mat,playerModel);
			player.addToScene(scene);
			player.isReady=true;
			//scene.add( object );
		}
		);
	loader=new THREE.OBJLoader(manager);
	loader.load('assets/Su-27_Flanker.obj',function(object){
		object.traverse(function(child){
			if(child instanceof THREE.Mesh ){
				child.material.map=texture;
				//console.log(child);
			}

		})
		object.position.y=10;
		object.position.z=-20;
		object.rotation.x=-Math.PI/2;
		
		console.log("Object ",object);
		playerModel=object;
		player=new Player(geom,mat,playerModel);
		console.log("Pla Model! ",playerModel);
		player.addToScene(scene);
		scene.add(object);
	},function(xhr){
		console.log("LOADED!!!!",xhr);
		
	});

};*/

var time=150,timer=0;
function render(){
	
	renderer.render(scene,camera);

	if(isPlaing){
		if(player!=null){
		cameraUpdate();
		player.update();
		}
		
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
		checkOnLose();
	}
	
	requestAnimationFrame(render);
}


var cameraUpdate=function(){

	camera.position.x=player.position.x;
	camera.position.y=player.position.y+5;
	camera.position.z=player.position.z+20;
};

var createEnemy=function(){
	var position=new THREE.Vector3(Math.random()*200-100,Math.random()*80+20,-1100);
	var newEnemy=new Enemy(enemyGeom,enemyMaterial,position,enemyModel.clone());
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
	
	var meshList=[];
	for(var j=0;j<enemys.length;j++){

	}
	//console.log("Bullets len ",playerBullets.length);
	for(var i=0;i<playerBullets.length;i++){

		var originPoint=playerBullets[i].position;

		for(var vertexIndex=0;vertexIndex<playerBullets[i].mesh.geometry.vertices.length;vertexIndex++){


			var localVertex=playerBullets[i].mesh.geometry.vertices[vertexIndex].clone();
			var globalVertex=localVertex.applyMatrix4(playerBullets[i].mesh.matrix);
			var directionVector=globalVertex.sub(playerBullets[i].mesh.position);

			//console.log(directionVector.length());
			for(var j=0;j<enemys.length;j++){

				meshList=enemys[j].boundingMeshes.children;
				var ray=new THREE.Raycaster(originPoint,directionVector.clone().normalize() );
				var collisionResults=ray.intersectObjects(meshList);
				if(collisionResults.length>0 && collisionResults[0].distance<directionVector.length()) {
					//console.log(collisionResults[0].distance," ",directionVector.length());
					enemys[j].setSpeedPostDead();
					playerBullets[i].isLife=false;
					snd2.play('boom');
					//enemys[j].isLife=false;

				}
				
				
			}
		}
		
	}
	//console.log("MOUSE "+mouse.x+" "+mouse.y);
};

var loadSound=function() {
	snd=new Howl({
		urls:['assets/Sevnty - Return.mp3'],
		volume:0.1,
		loop:true,
		onload:function(){
			console.log("Loaded sound");
			_loaded++;
			if(_loaded>=_total)
			init();
		}
	}).play();

	snd2=new Howl({
		urls:['assets/045.mp3'],
		volume:0.01,
		loop:false,
		sprite:{
			boom:[0,2000]
		},
		onload:function(){
			console.log("Loaded sound");
			_loaded++;
			if(_loaded>=_total)
			init();
		},
		onend:function(){
			//snd2.stop();
		}
	});

	snd3=new Howl({
		urls:['assets/sirena.mp3'],
		volume:0.4,
		loop:false,
		sprite:{
			sirena:[0,2000]
		},
		onload:function(){
			console.log("Loaded sound");
			_loaded++;
			if(_loaded>=_total)
			init();
		},
		onend:function(){
			//snd2.stop();
		}
	});
}

var checkOnLose=function() {
	text2.innerHTML="Life "+currentLife+"/"+totalLife;
	if(currentLife<=0) {
		isPlaing=false;
		alert("ПРОЁБАНО!");
	}
}
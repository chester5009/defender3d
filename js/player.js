var Player=function(g,m,model){
	this.geometry=g;
	this.material=m;
	this.position=new THREE.Vector3(0,0,0);
	this.acceleration=1.5;
	this.speed=new THREE.Vector3(0,0,0);
	//this.mesh=new THREE.Group();
	this.mesh=model;
	this.mesh.rotation.x=-Math.PI/2;
	this.mesh.scale.x=0.5;
	this.mesh.scale.y=0.5;
	this.mesh.scale.z=0.5;

	console.log("Mesh ! ",this.mesh);
	this.reloadTime=10;
	this.reloadTimer=50;
	this.isReady=false;
};




Player.prototype.addToScene = function(scene) {
	scene.add(this.mesh);
};
Player.prototype.removeFromScene = function(scene) {
	scene.remove(this.mesh);
};

Player.prototype.move = function(dir) {
	console.log("dir "+dir);
	switch(dir){
		case 0:
		this.speed.set(0,this.acceleration,0);
		this.mesh.rotation.x=-Math.PI/2.5;
		//console.log("speed "+this.speed);
		break;

		case 1:
		this.speed.set(this.acceleration,0,0);
		this.mesh.rotation.y=Math.PI/4;
		break;

		case 2:
		this.speed.set(0,-this.acceleration,0);
		this.mesh.rotation.x=-Math.PI/1.5;
		break;

		case 3:
		this.speed.set(-this.acceleration,0,0);
		this.mesh.rotation.y=-Math.PI/4;
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

	if(this.position.x>100)this.position.x=100;
	if(this.position.y>100)this.position.y=100;

	if(this.position.x<-100)this.position.x=-100;
	if(this.position.y<10)this.position.y=10;

	this.reloadTimer++;
	this.mesh.rotation.y=0;
	this.mesh.rotation.x=-Math.PI/2;
};
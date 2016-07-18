var Enemy=function(g,m,position,model) {
	this.geometry=g;
	this.material=m;
	this.position=position;
	this.acceleration=3.5;
	this.speed=new THREE.Vector3(0,0,this.acceleration);
	this.mesh=model;
	this.mesh.position.x=position.x;
	this.mesh.position.y=position.y;
	this.mesh.position.z=position.z;
	this.mesh.rotation.x=-Math.PI/2;
	this.mesh.scale.x=2;
	this.mesh.scale.z=2;
	this.mesh.scale.y=2;
	this.isLife=true;
}

Enemy.prototype.addToScene = function(scene) {
	scene.add(this.mesh);
};

Enemy.prototype.removeFromScene = function(scene) {
	scene.remove(this.mesh);
};
Enemy.prototype.update = function() {
	this.position.add(this.speed);
	this.mesh.position.x=this.position.x;
	this.mesh.position.y=this.position.y;
	this.mesh.position.z=this.position.z;
	if(this.position.z>10)this.isLife=false;
};

Enemy.prototype.createBoundingBox = function()) {
	
};
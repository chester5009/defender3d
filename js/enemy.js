var Enemy=function(g,m,position) {
	this.geometry=g;
	this.material=m;
	this.position=position;
	this.acceleration=3.5;
	this.speed=new THREE.Vector3(0,0,this.acceleration);
	this.mesh=new THREE.Mesh(this.geometry,this.material);
	this.mesh.position.x=position.x;
	this.mesh.position.y=position.y;
	this.mesh.position.z=position.z;
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
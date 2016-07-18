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
	this.createBoundingBox();
}

Enemy.prototype.addToScene = function(scene) {
	scene.add(this.mesh);
	scene.add(this.boundingBox);
};

Enemy.prototype.removeFromScene = function(scene) {
	scene.remove(this.mesh);
};
Enemy.prototype.update = function() {
	this.position.add(this.speed);
	this.mesh.position.x=this.position.x;
	this.mesh.position.y=this.position.y;
	this.mesh.position.z=this.position.z;

	this.boundingBox.position.x=this.position.x;
	this.boundingBox.position.y=this.position.y;
	this.boundingBox.position.z=this.position.z;

	if(this.position.z>10)this.isLife=false;

	//this.mesh.children[0].rotation.x+=0.02;
};

Enemy.prototype.createBoundingBox = function() {
	var geom=new THREE.BoxGeometry(5,5,5);
	var mat=new THREE.MeshNormalMaterial();
	this.boundingBox=new THREE.Mesh(geom,mat);
	this.boundingBox.position.x=this.position.x;
	this.boundingBox.position.y=this.position.y;
	this.boundingBox.position.z=this.position.z;
	this.boundingBox.scale.x=15;
	this.boundingBox.scale.y=2;
	this.boundingBox.scale.z=2;
	this.boundingBox.rotation.y=Math.PI/2;
};
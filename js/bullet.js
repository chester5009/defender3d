var Bullet=function(g,m,pos,speed,acc) {
	this.geometry=g;
	this.material=m;
	this.position=pos;
	this.acceleration=acc;
	this.speed=speed;
	this.mesh=new THREE.Mesh(this.geometry,this.material);
	this.mesh.position.x=pos.x;
	this.mesh.position.y=pos.y;
	this.mesh.position.z=pos.z;

	this.speed.multiplyScalar(this.acceleration);

	this.isLife=true;
}
Bullet.prototype.addToScene = function(scene) {
	scene.add(this.mesh);
};

Bullet.prototype.removeFromScene = function(scene) {
	scene.remove(this.mesh);
};
Bullet.prototype.update = function() {
	this.position.add(this.speed);
	this.mesh.position.x=this.position.x;
	this.mesh.position.y=this.position.y;
	this.mesh.position.z=this.position.z;
	if(this.position.z>10 || this.position.z<-1000)this.isLife=false;
};
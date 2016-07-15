var Terrain=function(position) {
	this.geometry;
	this.material;
	this.mesh;

	this.init(position);
}

Terrain.prototype.init = function(position) {
	this.geometry=new THREE.PlaneGeometry(300,300,32,32);
	this.material=new THREE.MeshBasicMaterial({color:Math.random()*0xffffff,wireframe:true});

	this.mesh=new THREE.Mesh(this.geometry,this.material);
	this.mesh.rotation.x=-Math.PI/2;

	this.mesh.position.x=position.x;
	this.mesh.position.y=position.y;
	this.mesh.position.z=position.z;
};

Terrain.prototype.addToScene = function(scene) {
	scene.add(this.mesh);
};

Terrain.prototype.update = function() {
	this.mesh.position.z+=1.15;
	if(this.mesh.position.z>200)this.mesh.position.z=-400;
};
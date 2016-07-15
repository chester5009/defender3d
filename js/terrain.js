var Terrain=function(position) {
	this.geometry;
	this.material;
	this.mesh;

	this.init(position);
}

Terrain.prototype.init = function(position) {
	this.geometry=new THREE.PlaneGeometry(1000,1000,100,30);
	this.material=new THREE.MeshBasicMaterial({color:Math.random()*0xffffff,wireframe:true});

	for (var i = 0; i < this.geometry.vertices.length; i++) {
		if(i>0){
			this.geometry.vertices[i].z=Math.random()*6;
		}
										
	}
	this.geometry.verticesNeedUpdate=true;


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
	this.mesh.position.z+=global_speed;
	if(this.mesh.position.z>600)this.mesh.position.z=-1400;
};
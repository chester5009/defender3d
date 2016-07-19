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
	this.boundingMeshes=[];
	this.createBoundingBox();
	this.speedPostDead=[];

	this.deadingTime=50;
	this.deadingTimer=0;
}

Enemy.prototype.addToScene = function(scene) {
	scene.add(this.mesh);
	scene.add(this.boundingMeshes);
};

Enemy.prototype.removeFromScene = function(scene) {
	scene.remove(this.mesh);
};
Enemy.prototype.update = function() {
	this.position.add(this.speed);
	this.mesh.position.x=this.position.x;
	this.mesh.position.y=this.position.y;
	this.mesh.position.z=this.position.z;

	this.boundingMeshes.position.x=this.position.x;
	this.boundingMeshes.position.y=this.position.y;
	this.boundingMeshes.position.z=this.position.z;

	if(this.position.z>10){
		snd3.play('sirena');
		this.isLife=false;
	}

	//this.mesh.children[0].rotation.x+=0.02;
	if(this.speedPostDead.length>0){
		this.deadingTimer++;
		var N=this.speedPostDead.length;
		for(var i=0;i<this.mesh.children.length;i++){
			this.mesh.children[i].position.add(this.speedPostDead[i]);
		}
		if(this.deadingTimer>this.deadingTime){
			this.isLife=false;
		}
	}
	
};

Enemy.prototype.createBoundingBox = function() {
	this.boundingMeshes=new THREE.Object3D();

	this.geom=new THREE.BoxGeometry(5,5,5);
	this.mat=new THREE.MeshNormalMaterial();
	this.mat.visible=false;
	this.boundingBox=new THREE.Mesh(this.geom,this.mat);
	//this.boundingBox.position.x=this.position.x;
	//this.boundingBox.position.y=this.position.y;
	//this.boundingBox.position.z=this.position.z;
	this.boundingBox.scale.x=15;
	this.boundingBox.scale.y=2;
	this.boundingBox.scale.z=2;
	this.boundingBox.rotation.y=Math.PI/2;
	//this.boundingBox.material.visible=false;
	this.boundingMeshes.add(this.boundingBox);

	this.geom2=new THREE.BoxGeometry(5,5,5);
	this.mat2=new THREE.MeshNormalMaterial();
	this.mat2.visible=false;
	this.boundingBox2=new THREE.Mesh(this.geom2,this.mat2);
	this.boundingBox2.scale.x=15;
	this.boundingBox2.scale.y=2;
	this.boundingBox2.scale.z=2;
	//this.boundingBox2.rotation.y=Math.PI/2;

	this.boundingMeshes.add(this.boundingBox2);

};

Enemy.prototype.setSpeedPostDead = function() {
	var N=this.mesh.children.length;
	for(var i=0;i<N;i++){
		this.speedPostDead.push(new THREE.Vector3(Math.random()*4-2,Math.random()*4-2,Math.random()*4-2));
	}

};
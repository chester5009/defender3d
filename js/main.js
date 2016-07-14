window.onload=init;

var camera,scene,renderer;
var width=window.innerWidth,height=window.innerHeight;
function init(){
	scene=new THREE.Scene();
	camera=new THREE.PerspectiveCamera(65,window.innerWidth/window.innerHeight,0.1,1000);
	renderer=new THREE.WebGLRenderer();
	renderer.setSize(width,height);
	document.body.appendChild( renderer.domElement );
	console.log("Hello1");
	camera.position.z=4;
	var geom=new THREE.BoxGeometry(1,1,1);
	var mat=new THREE.MeshBasicMaterial({color:0x00ff00});
	var player=new Player(geom,mat);
	player.addToScene(scene);

	render();
}

function render(){
	renderer.render(scene,camera);
	requestAnimationFrame(render);
}

var Player=function(g,m){
	this.geometry=g;
	this.material=m;
	this.mesh=new THREE.Mesh(this.geometry,this.material);
};

Player.prototype.addToScene = function(scene) {
	scene.add(this.mesh);
};
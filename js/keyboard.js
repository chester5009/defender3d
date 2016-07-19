var keyDown={};

var setKey=function(keyCode){
	keyDown[keyCode]=true;
}
var disableKey=function(keyCode){
	keyDown[keyCode]=false;
}
var clearKeys=function(){
	keyDown={};
}
var isKeyDown=function(keyName){
	return keyDown[keys[keyName]]==true;
}
var press_keyboard=function(event){
	var kcode=event.keyCode;
	setKey(kcode);
	//console.log(kcode);
	
}
var up_keyboard=function(e) {
	disableKey(e.keyCode);
}

var mouse_move=function(e){
	//console.log(e.x);
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
	
}
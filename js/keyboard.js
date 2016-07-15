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
	
}
var up_keyboard=function(e) {
	disableKey(e.keyCode);
}
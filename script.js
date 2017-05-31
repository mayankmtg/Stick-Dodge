var canvas=document.getElementById("mainCanvas");
var context=canvas.getContext("2d");

//document variables
var height=400, width=500, speed=4;
var enemySpeed=2;
var keys=[];


window.addEventListener("keydown",function(e){
	keys[e.keyCode]=true;
}, false);

window.addEventListener("keyup",function(e){
	delete keys[e.keyCode];
}, false);

//left=37 l t r d

var player = {
	x: 10,
	y: 10,
	width: 10,
	height: 10
}

var enemy = {
	x: width-20,
	y: 0,
	width: 20,
	height: 200
}
var enemy1 = {
	x: width-20+100,
	y: 200,
	width: 20,
	height: 200
}
var enemy2 = {
	x: width-20+200,
	y: -50,
	width: 20,
	height: 200
}
var enemy3 = {
	x: width-20+300,
	y: 250,
	width: 20,
	height: 200
}
var enemy4 = {
	x: width-20+400,
	y: 300,
	width: 20,
	height: 200
}
var scoreElem=document.getElementById("score");
var score=0;
var scoreUpdate=true;


function game(){
	update();
	render();
}
function update(){
	if(keys[37]){
		player.x=player.x-speed;
	}
	if(keys[39]){
		player.x=player.x+speed;
	}
	if(keys[38]){
		player.y=player.y-speed;
	}
	if(keys[40]){
		player.y=player.y+speed;
	}
	enemy.x-=enemySpeed;
	enemy1.x-=enemySpeed;
	enemy2.x-=enemySpeed;
	enemy3.x-=enemySpeed;
	enemy4.x-=enemySpeed;
	if(player.x<0){
		player.x=0;
	}
	if(player.x>=width-player.width){
		player.x=width-player.width;
	}

	if(player.y<0){
		player.y=0;
	}
	if(player.y>=height-player.height){
		player.y=height-player.height;
	}

	if(enemy.x+enemy.width<0){
		enemy.x=width;
	}
	if(enemy1.x+enemy1.width<0){
		enemy1.x=width;
	}
	if(enemy2.x+enemy2.width<0){
		enemy2.x=width;
	}
	if(enemy3.x+enemy3.width<0){
		enemy3.x=width;
	}
	if(enemy4.x+enemy4.width<0){
		enemy4.x=width;
	}

	if(collision(player, enemy) || collision(player,enemy1) || collision(player,enemy2) || collision(player,enemy3) || collision(player,enemy4)){
		clearInterval(gameLoop);
	}
	if(pass(player,enemy1) && scoreUpdate){
		score++;
		enemySpeed++;
		scoreUpdate=false;
	}
}

function render(){
	context.clearRect(0,0, width, height);
	scoreElem.innerHTML=score;
	context.fillStyle="white";
	context.fillRect(player.x, player.y, player.width, player.height);
	generateEnemy(enemy.x, enemy.y, enemy.width, enemy.height );
	generateEnemy(enemy1.x, enemy1.y, enemy1.width, enemy1.height );
	generateEnemy(enemy2.x, enemy2.y, enemy2.width, enemy2.height );
	generateEnemy(enemy3.x, enemy3.y, enemy3.width, enemy3.height );
	generateEnemy(enemy4.x, enemy4.y, enemy4.width, enemy4.height );

}
function collision(first, second){
	return !(first.x > second.x + second.width ||
		first.x + first.width < second.x ||
		first.y > second.y + second.height ||
		first.y + first.height < second.y);
}
function pass(first, second){
	if(first.x > second.x + second.width){
		return true;
	}
	else{
		scoreUpdate=true;
		return false;
	}
}

function generateEnemy(x,y,w,h){
	context.fillRect(x, y, w, h);
}
var gameLoop;
function reset(){
	score=0;
	scoreUpdate=true;
	enemySpeed=2;
	player.x=10;
	player.y=10;
	enemy.x=width-20;
	enemy.y=0;
	enemy1.x=width-20+100;
	enemy1.y=200;
	enemy2.x=width-20+200;
	enemy2.y=-50;
	enemy3.x=width-20+300;
	enemy3.y=250;
	enemy4.x=width-20+400;
	enemy4.y=300;
	gameLoop = setInterval(function(){
		game();

	}, 1000/30);
}


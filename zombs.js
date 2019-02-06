/*
TODOS:
1.character circle DONE
2.start button DONE
3.line for a gun
4.leader board
Working 5.control charecters DONE
6.gameboard DONE
7.shoot everyone to win
8.aim with mouse
9.chests DONE
  A.make it give you stuff
  B.chest not on trees
10.health DONE
11.building
12.multiplier
13.world shrinks
14.map DONE
15.airdops
16.zombies
*/
/* ADD VARIABLES HERE */
var canvas = document.querySelector('canvas');
var tools = canvas.getContext('2d');
var tile='capture/load/uNqbBknOrI5cDJlxfTJI3tze.png'
var gameWorld = new World();
var panda = new Character();
var bushes = [];
var crates=[];
var buildings=[];
var kits=[];
var health= new Score(50,50);
var test=0;
var g=1;
var yoffset=-0.3;
var xoffset=0.39;
var distancex=0.1;
var distancey=0.2;
panda.bodyRadius=health.number/4000;
panda.handRadius=health.number/16000;
while(bushes.length < 50) {
    bushes.push(new Bush());
  //  console.log(bushes[bushes.length-1].x,bushes[bushes.length-1].y)
}
while(crates.length < 25) {
    crates.push(new Crate());
  //  console.log(bushes[bushes.length-1].x,bushes[bushes.length-1].y)
}
//while(kits.length < 25) {
 //   kits.push(new Med());
  //  console.log(bushes[bushes.length-1].x,bushes[bushes.length-1].y)
//}
while(buildings.length < 5) {
    buildings.push(new Building());
  //  console.log(bushes[bushes.length-1].x,bushes[bushes.length-1].y)
}
var resources=[gameWorld,panda].concat(bushes);
resources.push(health);
for(var i=0;i<crates.length;i++){
resources.push(crates[i]);
}
for(var i=0;i<buildings.length;i++){
//resources.push(buildings[i]);
}
//for(var i=0;i<kits.length;i++){
//resources.push(kits[i]);
//}
//test=1;
/* ADD FUNCTIONS HERE */
function World() {
    this.width = 3;
    this.height = 3;
    this.x = this.width / 2;
    this.y = this.height / 2;
    this.imageUrl = tile;
    this.image = new Image();
    
    var tileWidth = 0.05;
    var tileHeight = 0.05;
    this.screenX = 0;
    this.screenY = 0;
    
    this.speed = 0.005;
    this.velocity = {
        x:0,
        y:0
    }
    
    this.move = function(){
        this.screenX += this.velocity.x;
        this.screenY += this.velocity.y;
             this.x += this.velocity.x;
        this.y += this.velocity.y;
         if(this.screenX > 0){
             this.screenX= -tileWidth;
         }
         if(this.screenY > 0){
             this.screenY= -tileHeight;
         }
         if(this.x < 0 || this.x > this.width){
			this.x -= this.velocity.x;
			this.screenX -= this.velocity.x;
		}
		if(this.y < 0 || this.y > this.width){
			this.y -= this.velocity.y;
			this.screenY -= this.velocity.y;
		}
    }
    this.draw = function(){
        
        // infaninte
        tools.globalAlpha=1;
        tileHeight = tileWidth*canvas.width/canvas.height;
        for(var x =this.screenX*canvas.width;x<canvas.width;x+=tileWidth*canvas.width){
            for(var y=this.screenY*canvas.height;y<canvas.height;y+=tileHeight*canvas.height){
                tools.drawImage(this.image,x,y,tileWidth*canvas.width,tileHeight*canvas.height);
            }
        }
    //     if(this.x > this.width) {
    //         tools.beginPath();
    //         tools.strokeStyle = 'red';
    //         tools.fillStyle = '#ff111150';
    //         tools.fillRect(0, 0, this.x*canvas.width, canvas.height);
    //         tools.closePath();
            
    //   }
    var cx = this.width - this.x;  
var cy = this.height - this.y;
var wallLeft = Math.min(canvas.width, canvas.width*(1/2 - cx));
var wallTop = Math.min(canvas.height, canvas.height*(1/2 - cy));
var wallRight =  Math.min(canvas.width, canvas.width*(this.x + 1/2));
var wallBottom = Math.min(canvas.height, canvas.height*(this.y + 1/2));

if(wallLeft > 0) {

    tools.beginPath();
    tools.fillStyle = '#AFDA55';
    tools.fillRect(0, 0, wallLeft, canvas.height);
    tools.closePath();

}

if(wallTop > 0) {

    tools.beginPath();
    tools.fillStyle = '#AFDA55';
    tools.fillRect(0, 0, canvas.width, wallTop);
    tools.closePath();

}

if(wallRight > 0) {

    tools.beginPath();
    tools.fillStyle = '#AFDA55';
    tools.fillRect(wallRight, 0, Math.ceil(canvas.width-wallRight), canvas.height);
    tools.closePath();	

}

if(wallBottom > 0) {

    tools.beginPath();
    tools.fillStyle = '#AFDA55';
    tools.fillRect(0, wallBottom, canvas.width, canvas.height);
    tools.closePath();	

}

    
    }
    
}
function Bush() {

	this.x = /*1.5*/Math.random()/**1*/*gameWorld.width-0.5;
	this.y = /*1.5*/Math.random()/**1*/*gameWorld.height-0.5;
    this.trans=0;
	this.bodyRadius = 0.1;
	this.imageUrl = 'https://mrlera.wisen.space/capture/load/kjFJM9XwclT7aYeLa_ka2p8R.png';
	this.image = new Image();
	
	this.move = function () {
        
    };
	
	this.draw = function() {
	    
    
	    if(this.trans===1){
	        tools.globalAlpha=0.5;
	        //console.log(tools.globalAlpha+" in");
	    }else{
	        tools.globalAlpha=1;
	        //console.log(tools.globalAlpha+" out");
	    }
        var r = this.bodyRadius*canvas.width;
        var x = (gameWorld.x-this.x)*canvas.width;
        var y = (gameWorld.y-this.y)*canvas.height;
        var right = this.x - this.bodyRadius*2;
        var bottom = this.y - this.bodyRadius*2;
        
        if(right < -0.5 || bottom < -0.30 || this.y > 2.5 || this.x >2.5) {//console.log(right);
        return;};
        tools.drawImage(this.image, x, y, r*2, r*2)
        //setTimeout(function(){
            //this.trans=0;//},0.1)
	}
}
function Crate() {

	this.x = Math.random()*gameWorld.width-0.5;
	this.y = Math.random()*gameWorld.height-0.5;
	this.imageUrl = 'https://ryan1.wisen.space/capture/load/IayJH9Z0iwlXnocWAHe3T870.png';
	this.image = new Image();
    this.height=50;
    this.width=50;
    this.radius=0.01;
    var x = (gameWorld.x-this.x)*canvas.width;
    var y = (gameWorld.y-this.y)*canvas.height;
	this.move = function () {
        //  if(absdiff((gameWorld.x-xoffset),this.x)<this.width && absdiff((gameWorld.y-xoffset),this.y)<this.height){
        //      console.log("touch");
        //      this.height=0;
        //      this.width=0;
        //  }

           var pandax=canvas.width/2-(panda.bodyRadius*canvas.width);
           var panday=canvas.height/2-(panda.bodyRadius*canvas.height);
           if(doHitBoxesCollide({x:x,y:y,width:this.width,height:this.height},{x:pandax,y:panday,width:panda.bodyRadius*2*canvas.width,height:panda.bodyRadius*2*canvas.height})){
                this.height=0;
                this.width=0;
                //console.log("touch");
           }
           
           
    };
         
	this.draw = function() {
        
    x = (gameWorld.x-this.x)*canvas.width;
    y = (gameWorld.y-this.y)*canvas.height;
        //setTimeout(function(){
            //this.trans=0; var right = this.x - this.bodyRadius*2;
        var bottom = this.y - this.radius*2;
        var right = this.x - this.radius*2;
        if(right < -0.5 || bottom < -0.30 || this.y > 2.5 || this.x >2.5) {//console.log(right);
        this.width=0;
        return;};//},0.1)
        tools.drawImage(this.image, x,y, this.width, this.height);
	}
}
function Med() {

	this.x = Math.random()*gameWorld.width
	this.y = Math.random()*gameWorld.height
	this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Medkit_font_awesome-red.svg/512px-Medkit_font_awesome-red.svg.png';
	this.image = new Image();
    this.height=0;
    this.width=0;
    this.image.src=this.imageUrl;
    var x = (gameWorld.x-this.x)*canvas.width;
    var y = (gameWorld.y-this.y)*canvas.height;
	this.move = function () {
        //  if(absdiff((gameWorld.x-xoffset),this.x)<this.width && absdiff((gameWorld.y-xoffset),this.y)<this.height){
        //      console.log("touch");
        //      this.height=0;
        //      this.width=0;
        //  }

           var pandax=canvas.width/2-(panda.bodyRadius*canvas.width);
           var panday=canvas.height/2-(panda.bodyRadius*canvas.height);
           if(doHitBoxesCollide({x:x,y:y,width:this.width,height:this.height},{x:pandax,y:panday,width:panda.bodyRadius*2*canvas.width,height:panda.bodyRadius*2*canvas.height})){
                this.height=0;
                this.width=0;
                health.number+=50;
                if(health.number>100){
                    health.number=100;
                }
                console.log("touch");
           }
           
           
    };
         
	this.draw = function() {
        
    x = (gameWorld.x-this.x)*canvas.width;
    y = (gameWorld.y-this.y)*canvas.height;
        tools.drawImage(this.image, x,y, this.width, this.height);
        //setTimeout(function(){
            //this.trans=0;//},0.1)
	}
}
function Building() {

	this.x = Math.random()*gameWorld.width;
	this.y = Math.random()*gameWorld.height;
	this.bodyRadius = 0.1;
	this.imageUrl = 'https://ryan1.wisen.space/capture/load/eX2A4yhc1S_1CgLxzMWcPv9W.png';
	this.image = new Image();
	
	this.move = function () {
        
    };
         
	this.draw = function() {
	var x = (gameWorld.x-this.x)*canvas.width;
    var y = (gameWorld.y-this.y)*canvas.height;
        

        tools.fillRect(x,y,700,400)
        //setTimeout(function(){
            //this.trans=0;//},0.1)
	}
}
function Character(){
    this.bodyRadius = 0.035;
    this.handRadius = this.bodyRadius/4;
    this.color = "#ffffff";
    this.handcolor="black"
    this.outlineColor= "black";
    this.angle=Math.PI / 4;
    this.direction = { x: 0, y: 0, theta: 0 }
    this.health = 100;
    this.move = function () {
        
    }
    this.rotate = function(mouseX,mouseY) {
         this.direction.x =  mouseX - canvas.width/2;
    this.direction.y = mouseY - canvas.height/2;
    
    var atan = Math.atan(this.direction.y/this.direction.x);
    atan += this.direction.x >= 0 ? Math.PI/2 : 3*Math.PI/2;
    this.direction.theta = atan;

    }
   this.draw = function() {
tools.globalAlpha=1;
    var r = this.bodyRadius*canvas.width;
    var cx = canvas.width/2;
    var cy = canvas.height/2;
    var b = r*Math.cos(this.angle);
    var d = r*Math.sin(this.angle);
    var ct = Math.cos(this.direction.theta);
    var st = Math.sin(this.direction.theta);
    
    function rotateCircle(px, py, radius) {
        var rx = px*ct - py*st;
        var ry = px*st + py*ct;
        tools.arc(canvas.width/2+rx,canvas.height/2+ry, radius*canvas.width, 0,Math.PI*2);
    }
    
    /* LEFT HAND */ 
    tools.beginPath();
    tools.lineWidth=2;
    tools.strokeStyle = this.outlineColor;
    tools.fillStyle = this.handcolor;
    rotateCircle(-d, -b, this.handRadius);
    tools.fill();
    tools.stroke();
    tools.closePath();
    
    /* RIGHT HAND */
    tools.beginPath();
    rotateCircle(d, -b, this.handRadius);
    tools.fill();
    tools.stroke();
    tools.closePath();
    tools.fillStyle = this.color;
    /* BODY */
    tools.beginPath();
    tools.arc(cx,cy, r, 0,Math.PI*2);
    tools.fill();
    tools.stroke();
    tools.closePath();

}
}

function doHitBoxesCollide(box1, box2) {
    // console.log("crate"+" x:"+box1.x+" y:"+box1.y+" width:"+box1.width+" height:"+box1.height);
    // console.log("panda"+" x:"+box2.x+" y:"+box2.y+" width:"+box2.width+" height:"+box2.height);
    if((box1.x + box1.width) < box2.x) {
        return false;
    }
    if((box2.x + box2.width) < box1.x) {
        return false;
    }
    if((box1.y + box1.height) < box2.y) {
        return false;
    }
    if((box2.y + box2.height) < box1.y) {
        return false;
    }
    return true;
}
function absdiff(x,y){
    if((x-y)>0){
        return x-y;
    }else{
        return y-x;
    }
}
function animate() {
    tools.clearRect(0,0,canvas.width, canvas.height);

    resources.forEach(function(resource) {
        resource.move();
        resource.draw();
    });
    
    
    window.requestAnimationFrame(animate);
}
function resizeCanvas() {

    var bodySize = document.body.getBoundingClientRect();
    canvas.width = bodySize.width;
    canvas.height = bodySize.height;

}
function startGame() {
    animate();
}
function loadResources() {

    var loadedResourceCount = 0;
    resources.forEach(function(resource) {
        if(!resource.image){
            loadedResourceCount++;
            return;
        }
        resource.image.onload = function() {
            loadedResourceCount++;
            if(loadedResourceCount === resources.length) {
                startGame();
            }
        }
        resource.image.src = resource.imageUrl;  
    })

}

function changeDirection(key) {

    // CHALLENGE: WHAT DO WE MODIFY HERE TO MOVE THE WORLD?
    if(key.keyCode === 37) {
        // LEFT
        gameWorld.velocity.x=gameWorld.speed;
    }
    else if(key.keyCode === 38) {
        gameWorld.velocity.y=gameWorld.speed;
    }
    else if(key.keyCode === 39) {
        gameWorld.velocity.x=-gameWorld.speed;
    }
    else if(key.keyCode === 40) {
        gameWorld.velocity.y=-gameWorld.speed;
    }

}
function stopCharacter(e) {

    if(e.keyCode === 38 || e.keyCode === 87 || e.direction === 8) {
        gameWorld.velocity.x = 0;
        gameWorld.velocity.y = 0;
    }
    if(e.keyCode === 37 || e.keyCode === 65 || e.direction === 2) {
        gameWorld.velocity.x = 0;
        gameWorld.velocity.y = 0;
        
    }
    if(e.keyCode === 40 || e.keyCode === 83 || e.direction === 16) {
        gameWorld.velocity.x = 0;
        gameWorld.velocity.y = 0;
    }
    if(e.keyCode === 39 || e.keyCode === 68 || e.direction === 4) {
        gameWorld.velocity.x = 0;
        gameWorld.velocity.y = 0;
    }

}
function rotate(e) {
     panda.rotate(e.clientX, e.clientY);
}
function moveCharacter(e) { 

    gameWorld.velocity.x = -gameWorld.speed*Math.sin(panda.direction.theta);
    gameWorld.velocity.y = gameWorld.speed*Math.cos(panda.direction.theta);  

}
function Score(x,y){
    this.x=x;
    this.y=y;
    this.number=100;
    this.draw=function(){
        tools.globalAlpha=1;
        tools.font="30px Arial";
        tools.fillStyle="white";
        tools.fillText(this.number,this.x,this.y)
    }
    this.move=function(){
        
    }
}



setInterval(function(){
    panda.color="rgb(255,255,255)"
    for(i=0;i<bushes.length;i++){

        //if((((gameWorld.x-xoffset)-bushes[i].x)<0.08 || ((gameWorld.x-xoffset)-bushes[i].x) > -0.08) && (((gameWorld.y-yoffset)-bushes[i].y)<0.08 || ((gameWorld.y-yoffset)-bushes[i].y) > -0.08 )){
        if(absdiff((gameWorld.x-xoffset),bushes[i].x)<distancex && absdiff((gameWorld.y-xoffset),bushes[i].y)<distancey){
            //panda.color="rgb(10,200,10)"
            bushes[i].trans=1;
            if(test===0 ){
            health.number-=2;
            }
            g=0;
            if(health.number<0){health.number++;alert("game over");health=100}else{
            panda.bodyRadius=health.number/4000;
            panda.handRadius=health.number/16000;
            
            }
        }
        else{
          bushes[i].trans=0;  
        }
    }
    if(gameWorld.x > gameWorld.width) {
        if(test===0){
                health.number--;
        }
                
                if(health.number<0){health.number++;alert("game over");health=100}else{
                    panda.bodyRadius=health.number/4000;
                    panda.handRadius=health.number/16000;
                }
            }
            else{
                if(health.number===100 || g===0){}else{
                health.number++;
                panda.bodyRadius=health.number/4000;
                panda.handRadius=health.number/16000;
                }
            }
            g=1;
},200)
/* ADD EVENT LISTENERS HERE */
window.addEventListener('resize', resizeCanvas);
window.addEventListener('keydown', changeDirection);
window.addEventListener('keyup', stopCharacter);
window.addEventListener('mousemove', rotate);
window.addEventListener('click', moveCharacter);
/* CODE TO RUN WHEN PAGE LOADS */
resizeCanvas();
loadResources();

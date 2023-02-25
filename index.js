var canvas=document.getElementById('canvas').getContext('2d');
var spx=80;
var spy=80;
var nspx=0;
var nspy=0;
var fpx=140;
var fpy=180;
var snake=[];
var snakebody=1;
var score=0;
var status='Ready';


window.onload=()=>{
    document.addEventListener('keydown',inputcontrol);
    play = setInterval(game, 200);
}



function game(){
    document.getElementById('status').innerHTML= status;
    document.getElementById('score').innerHTML=score;

    spx+=nspx;
    spy+=nspy;

    if(spx>400){
        spx=0;
    }
    if(spy>400){
        spy=0;
    }
    if(spx<0){
        spx=400;
    }
    if(spy<0){
        spy=400;
    }


    canvas.fillStyle="black";
    canvas.fillRect(0,0,400,400);
    for(cl=0;cl<400;cl+=20){
        canvas.moveTo(cl,0);
        canvas.lineTo(cl,400);
    }
    for(cl=0;cl<400;cl+=20){
        canvas.moveTo(0,cl);
        canvas.lineTo(400,cl);
    }
    canvas.strokeStyle = "gray";
    canvas.stroke();
    
    canvas.fillStyle="yellow";
    //CREATED SNAKE AT THE BEGINNING=====> canvas.fillRect(spx,spy,20,20);
    //LATER CHANGED TO============>
    for(var i=0;i<snake.length;i++){
       canvas.fillRect(
        snake[i].x,snake[i].y,20,20
       ) 
       if(spx==snake[i].x && spy==snake[i].y && snakebody > 1){
        clearInterval(play);
        var sound = new Audio('sounds/biting.mp3');
        sound.play();
        status="GAME OVER";
        document.getElementById('status').innerHTML= status;
       }
    }


    canvas.fillStyle="red";
    canvas.fillRect(fpx,fpy,20,20);


    if(spx == fpx && spy == fpy){
        var audio = new Audio('sounds/eating.wav');
        audio.play();
        snakebody++;
        score+=10;
        fpx=(Math.floor(Math.random()*20))*20;
        fpy=(Math.floor(Math.random()*20))*20;
    }

    snake.push({x: spx, y: spy})
    while(snake.length > snakebody){
        snake.shift();
    }

}


function inputcontrol(e){
    switch(e.keyCode){
        case 87:
            nspy-=20;
            nspx=0;
            break;
        case 83:
            nspy+=20;
            nspx=0;
            break;
        case 68:
            nspx+=20;
            nspy=0;
            break;
        case 65:
            nspx-=20;
            nspy=0;
            break;
    }
    if(e.keyCode==87||e.keyCode==83||e.keyCode==68||e.keyCode==65){
        status = "Game Started"
    }
}
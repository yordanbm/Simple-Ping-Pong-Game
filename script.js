var canvas;
var canvasContext;
var ballPositionX = 50;
var ballSpeedX = 12;
var ballPositionY = 50;
var ballSpeedY = 6;

var leftPlayerY = 150;
var rightPlayerY = 150;
const PLAYER_HEIGHT = 100;
const PLAYER_THICKNESS = 10;

var leftPlayerScore = 0;
var rightPlayerScore = 0;
const GAME_OVER_SCORE = 2;
var win = false;

function calculateMousePosition(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left -root.scrollLeft;
    var mouseY = evt.clientY - rect.top -root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    }
}

window.onload = function() {
    canvas = document.getElementById('gameBoard');
    canvasContext = canvas.getContext('2d');

    var framePerSecond = 30;
    setInterval(function () {
        move();
        draw();   
    },1000/framePerSecond);
    
    canvas.addEventListener('mousedown',mouseclick);
    
    canvas.addEventListener('mousemove', function(evt){
        var mousePosition = calculateMousePosition(evt);
        leftPlayerY = mousePosition.y - (PLAYER_HEIGHT/2);
    })
}

function mouseclick(evt) {
    if(win){
        leftPlayerScore = 0;
        rightPlayerScore = 0;
        win = false;
    }
}

function resetBall(){
    if(leftPlayerScore >= GAME_OVER_SCORE ||
       rightPlayerScore >= GAME_OVER_SCORE){
           win = true;
       }
    
    ballSpeedX = -ballSpeedX;
    ballPositionX = canvas.width/2;
    ballPositionY = canvas.height/2;
}

function rightPlayerMovement() {
    var rightPlayerYCenter = rightPlayerY +(PLAYER_HEIGHT/2);
    if(rightPlayerYCenter < ballPositionY - 40){
        rightPlayerY += 7;
    } else if (rightPlayerYCenter > ballPositionY + 40) {
        rightPlayerY -= 7;
    }
}

function move(){
        if(win) {
            return;
        }
    
        rightPlayerMovement();
    
        ballPositionX += ballSpeedX;
        ballPositionY += ballSpeedY;
        
        if(ballPositionX > canvas.width-10){
              if(ballPositionY > rightPlayerY && 
                ballPositionY < rightPlayerY + PLAYER_HEIGHT){
                    ballSpeedX = -ballSpeedX;
                    
                    var deltaY = ballPositionY 
                                - (rightPlayerY + PLAYER_HEIGHT/2);
                    ballSpeedY = deltaY * 0.3;
                } else {
                     leftPlayerScore ++;
                     resetBall();

                }
        }
         if(ballPositionX < 10){
             if(ballPositionY > leftPlayerY && 
                ballPositionY < leftPlayerY + PLAYER_HEIGHT){
                    ballSpeedX = -ballSpeedX;
                    
                    var deltaY = ballPositionY 
                                - (leftPlayerY + PLAYER_HEIGHT/2);
                    ballSpeedY = deltaY * 0.3;
                } else {
                     rightPlayerScore ++;
                     resetBall();
                     
                }
        }
        if(ballPositionY > canvas.height-10){
            ballSpeedY = -ballSpeedY;
        }
         if(ballPositionY < 10){
            ballSpeedY = -ballSpeedY;
        }
}

function draw() {
    //paint the board
    drawRect(0,0,canvas.width,canvas.height,'black');
    
        if(win) {
                canvasContext.fillStyle = 'white';
                if(leftPlayerScore >= GAME_OVER_SCORE){
                   canvasContext.fillText("Left Player Won!", 370, 100); 
                }else if(rightPlayerScore >= GAME_OVER_SCORE){
                   canvasContext.fillText("Right Player Won!", 370, 100);
                }
                canvasContext.fillText("Click to continue", 370, 200);
            return;
        }
    //paint the left player
    drawRect(0,leftPlayerY,PLAYER_THICKNESS,PLAYER_HEIGHT,'red');
    
    //paint the right player
    drawRect(canvas.width - PLAYER_THICKNESS,rightPlayerY,PLAYER_THICKNESS,PLAYER_HEIGHT,'red');
    
    //paint the ball
    drawCircle(ballPositionX, ballPositionY, 10, 'green')
    
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('Score:' + leftPlayerScore, 100, 10);
    canvasContext.fillText('Score:' + rightPlayerScore, 
                            canvas.width - 100, 10);
}
        //function foor drawing rectangles
function drawRect(positionX,positionY,width,height,drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(positionX,positionY,width,height);
}
        //function for drawing circles
function drawCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill();
}
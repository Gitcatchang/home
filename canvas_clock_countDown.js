var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var RADIUS;
var MARGIN_LEFT;
var MARGIN_TOP;

const endTime = new Date(2016, 4, 29, 10, 23, 23);
var curShowTime = 0;

var ball=[];

const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];


window.onload = function(){

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

    curShowTime = getCurShowTime();

    setInterval(function(){
        
        render(context);
        update();

    },50);
	
};

function getCurShowTime(){
    
    var nowDate = new Date();
    var ret = endTime.getTime()-nowDate.getTime();
    ret = Math.round(ret/1000);

    return ret>=0?ret : 0;
};

function update(){
    
    var nextShowTime = getCurShowTime();
    
    var nextHours = parseInt(nextShowTime/3600);
    var nextMinutes = parseInt((nextShowTime-nextHours*3600)/60);
    var nextSeconeds = nextShowTime%60;

    var curHours = parseInt(curShowTime/3600);
    var curMinutes = parseInt((curShowTime-curHours*3600)/60);
    var curSeconeds = curShowTime%60;

    if(nextSeconeds !== curSeconeds){
        if(parseInt(curHours/10) !== parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours/10))
        }
        if(parseInt(curHours%10) !== parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10))
        }
        if(parseInt(curMinutes/10) !== parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10))
        }
        if(parseInt(curMinutes%10) !== parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10))
        }
        if(parseInt(curSeconeds/10) !== parseInt(nextSeconeds/10)){
            addBalls(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconeds/10))
        }
        if(parseInt(curSeconeds%10) !== parseInt(nextSeconeds%10)){
            addBalls(MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconeds%10))
        }

        curShowTime = nextShowTime;
    }

    updateBall();

    console.log(ball.length);
};

function updateBall(){
    
    for(var i=0; i<ball.length; i++){
        ball[i].x += ball[i].vx;
        ball[i].y += ball[i].vy;
        ball[i].vy += ball[i].g;

        if(ball[i].y >= WINDOW_HEIGHT-RADIUS){
            ball[i].y = WINDOW_HEIGHT-RADIUS;
            ball[i].vy = -ball[i].vy*0.75;
        }
    }
    
    var cnt = 0;
    for(var i=0; i<ball.length; i++){
        if(ball[i].x+RADIUS>0 && ball[i].x-RADIUS<WINDOW_WIDTH)
            ball[cnt++] = ball[i]
    }
    while(ball.length>Math.min(300, cnt)){
        ball.pop();
    }
};

function addBalls(x, y, num){
    
    for(var i=0; i<digit[num].length; i++){
        for(var j=0; j<digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
                var Balls = {
                    x: x+j*2*(RADIUS+1)+(RADIUS+1),
                    y: y+i*2*(RADIUS+1)+(RADIUS+1),
                    g: 1.5+Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random()*100))*4,
                    vy: Math.random()*-10,
                    color: colors[Math.floor(Math.random()*colors.length)]
                }
                ball.push( Balls);
            }
        }
    }
};

function render(cxt){

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)

	var hours = parseInt(curShowTime/3600);
	var minutes = parseInt((curShowTime-hours*3600)/60);
    var seconeds = curShowTime%60;

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);
    renderDigit(15*(RADIUS+1)+MARGIN_LEFT, MARGIN_TOP, parseInt(hours%10), cxt);
    renderDigit(30*(RADIUS+1)+MARGIN_LEFT, MARGIN_TOP, parseInt(10), cxt);
    renderDigit(39*(RADIUS+1)+MARGIN_LEFT, MARGIN_TOP, parseInt(minutes/10), cxt);
    renderDigit(54*(RADIUS+1)+MARGIN_LEFT, MARGIN_TOP, parseInt(minutes%10), cxt);
    renderDigit(69*(RADIUS+1)+MARGIN_LEFT, MARGIN_TOP, parseInt(10), cxt);
    renderDigit(78*(RADIUS+1)+MARGIN_LEFT, MARGIN_TOP, parseInt(seconeds/10), cxt);
    renderDigit(93*(RADIUS+1)+MARGIN_LEFT, MARGIN_TOP, parseInt(seconeds%10), cxt);

    for(var i=0; i<ball.length; i++){

        cxt.fillStyle = ball[i].color;

        cxt.beginPath();
        cxt.arc( ball[i].x, ball[i].y, RADIUS, 2*Math.PI, false);
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit(x, y, num, cxt){
    
    cxt.fillStyle = "rgb(0, 102, 153)"
    for(var i=0; i<digit[num].length; i++){
    	for(var j=0; j<digit[num][i].length; j++){
    		if(digit[num][i][j] == '1'){
    			
    			cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS), RADIUS, 2*Math.PI, false);
                cxt.closePath();

                cxt.fill();
    		}
    	}
    }
}

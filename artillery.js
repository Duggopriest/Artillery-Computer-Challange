var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var deltaTime = 0;
var STATE_GAME = 0;

var splashTimer = .5;

var SHELL = {
	image: document.createElement("img"),
	x: 0.0,
	y: 0.0,
	Accx: 0.0,
	Accy: 0.0,
	width: 50,
	height: 50,
	fired: false
};
SHELL.image.src = "Shell.png";

var Cannon = document.createElement("img");
Cannon.src = "Cannon.png";

var Grass = document.createElement("img");
Grass.src = "Grass.png";

var Tree = document.createElement("img");
Tree.src = "trees.png";

var Mountans = document.createElement("img");
Mountans.src = "mountans.png";

var Stars = document.createElement("img");
Stars.src = "stars.jpg";

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

function getDeltaTime()
{
    endFrameMillis = startFrameMillis;
    startFrameMillis = Date.now();
    var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
    if (deltaTime > 1.0)
    {
        deltaTime = 1.0;
    }
    return deltaTime;
}  

function drawGround()
{
	if (SHELL.y < 500)
		return false;
	var x = SHELL.x;
	var y = SHELL.y;
	for (var i = -50; i < canvas.width + 50; i += 50)
	{
		context.drawImage(SHELL.image, 500, (i + x) % canvas.width, 50, 50);
	}
	console.log("working");
	return true;
}

function drawScene()
{
	for (var i = -600; i < canvas.width + 600; i += 600)
	{
		for (var j = -600; j < 1000; j += 600)
		{
			context.drawImage(Stars, -(SHELL.x % 600) + i, (SHELL.y % 600) + j, 600, 600);
		}
	}
	for (var i = -1921; i < canvas.width + 1921; i += 1921)
	{
		context.drawImage(Mountans, -(SHELL.x * 3 % 1921) + i, SHELL.y + 500, 1921, 500);
	}
	for (var i = -1500; i < canvas.width + 1500; i += 1500)
	{
		context.drawImage(Tree, -(SHELL.x * 6 % 1500) + i, SHELL.y + 710, 1500, 300);
	}
	for (var i = -150; i < canvas.width + 150; i += 150)
	{
		context.drawImage(Grass, -(SHELL.x * 10 % 150) + i, SHELL.y + 990, 150, 150);
	}
	
	// draw bullet
	if (SHELL.fired)
		context.drawImage(SHELL.image, 500, 500, 50, 50);
	else
	{
		//context.scale(-1,1);
		context.drawImage(Cannon, 500, SHELL.y + 950, -271, 81);
    
    	// always clean up -- reset transformations to default
    	context.setTransform(1,0,0,1,0,0);
	}
}

function runSplash(deltaTime)
    {
        splashTimer -= deltaTime;
        if(splashTimer <= 0)
        {
            STATE_GAME = 1;
            return;
        }
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#ffffff";

		context.font="30px Arial";
		context.fillText("Artillery Sim", 10, 30);
		
        context.font="14px Arial";
        context.fillText("By Jaymie Gobbett", 10, 60);
}

function runGame(deltaTime)
{
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

	drawScene();

	if (SHELL.fired)
	{
		SHELL.x += deltaTime * 100;
		SHELL.y += deltaTime * 50;
	}
	
}

function runGameOver(deltaTime)
{
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#ffffff";
	context.font="14px Arial";

	context.fillText("By Jaymie Gobbett", 300, 400);
}

function run() {
    deltaTime = getDeltaTime();

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
	

	switch(STATE_GAME)
	{
		case 0:
		runSplash(deltaTime);
		break;
		case 1:
		runGame(deltaTime);
		break;
		case 2:
		runGameOver(deltaTime);
		break;
	}
}

function fireGun()
{
	SHELL.fired = true;
}

//===========================================DO NOT EDIT BELOW THIS LINE =================================================
(function () {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.requestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.mozrequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                cb();
                window.mozRequestAnimationFrame(_cb);
            }
            _cb();
        };
    } else {
        onEachFrame = function (cb) {
            setInterval(cb, 1000 / 60);
        }
    }

    window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
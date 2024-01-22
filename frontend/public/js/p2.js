////////////////////////////////////////////////////////////
// P2
////////////////////////////////////////////////////////////
var worldArr = [];
var scaleX = 50, scaleY = -50;

var ballPhysics_arr = [];
var hitPhysics_arr = [];
var physicsData = {canvasW:0, canvasH:0, currentWorld:0, ballX:0, ballY:0, idleTime:10, idleTimeCount:0};
				
function initPhysics(){
	physicsData.canvasW = canvasW;
	physicsData.canvasH = canvasH;
	
	var n = 0;
	worldArr.push({world:'', paused:true})

	// Init p2.js	
	worldArr[n].world = new p2.World({gravity:[0,-40]});

	var ballVsObject = new p2.ContactMaterial(ballMaterial, pinMaterial, {
		// friction
		friction: .5,
		// bounce
		restitution: .4
	});
	worldArr[n].world.addContactMaterial(ballVsObject);

	worldArr[n].world.on('beginContact', function (evt){
		var contactVelocityA = getBodyVelocity(evt.bodyA);
		var contactVelocityB = getBodyVelocity(evt.bodyB);

		if(evt.bodyA.contactType === 'ball' || evt.bodyB.contactType === 'ball'){
			if(contactVelocityA > 5){
				playHitSound();
			}
			
			if(contactVelocityB > 5){
				playHitSound();
			}
		}

		if(evt.bodyA.contactType == 'ball' && evt.bodyB.contactType == 'pin'){
			animatePin(evt.bodyB.pinIndex);
		}else if(evt.bodyA.contactType == 'pin' && evt.bodyB.contactType == 'ball'){
			animatePin(evt.bodyA.pinIndex);
		}
	});

	pausedPhysics(n, true);
}

function getBodyVelocity(body){
	return Math.abs(body.velocity[0]) + Math.abs(body.velocity[1]);
}

var ballMaterial = new p2.Material();
var pinMaterial = new p2.Material();
var ball_group = 1;
var pin_group = 2;
var pin_idle_group = 3;

function createPhysicBall(radius, x, y){
	ballPhysics_arr.push({shape:'', body:'', material:'', property:{radius:(radius/scaleX)}, position:[0, 0]});
	var newIndex = ballPhysics_arr.length-1;
		
	ballPhysics_arr[newIndex].shape = new p2.Circle(ballPhysics_arr[newIndex].property);
	ballPhysics_arr[newIndex].material = ballMaterial;
	ballPhysics_arr[newIndex].shape.material = ballPhysics_arr[newIndex].material;
	ballPhysics_arr[newIndex].body = new p2.Body({
		mass:1,
		position:ballPhysics_arr[newIndex].position
	});
	ballPhysics_arr[newIndex].body.addShape(ballPhysics_arr[newIndex].shape);
	ballPhysics_arr[newIndex].body.damping = 0;
	ballPhysics_arr[newIndex].body.angularDamping = 0;
	
	ballPhysics_arr[newIndex].body.position[0] = ((x) - (physicsData.canvasW/2))/scaleX;
	ballPhysics_arr[newIndex].body.position[1] = ((y) - physicsData.canvasH)/scaleY;
	ballPhysics_arr[newIndex].body.contactType = 'ball';

	if(!gameSettings.ballCollision){
		ballPhysics_arr[newIndex].shape.collisionGroup = ball_group;
		ballPhysics_arr[newIndex].shape.collisionMask = pin_group;
	}
	
	worldArr[physicsData.currentWorld].world.addBody(ballPhysics_arr[newIndex].body);
}

function createPhysicCircle(radius, x, y){
	hitPhysics_arr.push({shape:'', body:'', material:'', property:{radius:(radius/scaleX)}, position:[0, 0]});
	var newIndex = hitPhysics_arr.length-1;
		
	hitPhysics_arr[newIndex].shape = new p2.Circle(hitPhysics_arr[newIndex].property);
	hitPhysics_arr[newIndex].material = pinMaterial;
	hitPhysics_arr[newIndex].shape.material = hitPhysics_arr[newIndex].material;
	hitPhysics_arr[newIndex].body = new p2.Body({
		mass:0,
		position:hitPhysics_arr[newIndex].position
	});
	hitPhysics_arr[newIndex].body.addShape(hitPhysics_arr[newIndex].shape);
	
	hitPhysics_arr[newIndex].body.position[0] = (x - (physicsData.canvasW/2))/scaleX;
	hitPhysics_arr[newIndex].body.position[1] = (y - physicsData.canvasH)/scaleY;
	hitPhysics_arr[newIndex].body.contactType = 'pin';
	hitPhysics_arr[newIndex].body.pinIndex = newIndex;

	if(!gameSettings.ballCollision){
		hitPhysics_arr[newIndex].shape.collisionGroup = pin_group;
		hitPhysics_arr[newIndex].shape.collisionMask = ball_group;
	}
	
	worldArr[physicsData.currentWorld].world.addBody(hitPhysics_arr[newIndex].body);
}

function setPhysicCircle(index, con){
	hitPhysics_arr[index].body.collisionResponse = con;
}

function removePhysicBall(index){
	worldArr[physicsData.currentWorld].world.removeBody(ballPhysics_arr[index].body);
}

function dropPhysicsBall(index, x, y){
	ballPhysics_arr[index].body.position[0] = (x - (physicsData.canvasW/2))/scaleX;
	ballPhysics_arr[index].body.position[1] = (y - physicsData.canvasH)/scaleY;
	ballPhysics_arr[index].body.velocity[0] = 0;
	ballPhysics_arr[index].body.velocity[1] = 0;
}

function resetPhysicBall(){
	ballPhysics_arr.length = 0;
}

function setBallVelocity(targetBody){
	var veloX = 0;
	
	if(targetBody.velocity[0] > 0){
		veloX = randomIntFromInterval(0,2);
	}else if(targetBody.velocity[0] < 0){
		veloX = randomIntFromInterval(0,2);
		veloX = -veloX;
	}else{
		veloX = randomIntFromInterval(-2,2);
	}
	
	targetBody.velocity[0] += veloX;
}

function renderPhysics(){
	for(var n=0; n<gameData.ballArray.length; n++){
		var x = ballPhysics_arr[n].body.position[0],
			y = ballPhysics_arr[n].body.position[1];
		
		var targetBall = gameData.ballArray[n];
		targetBall.x = (physicsData.canvasW/2) + (x * scaleX);
		targetBall.y = physicsData.canvasH + (y * scaleY);

		var checkIdle = true;
		if(gameData.dropCon){
			if(checkIdle){
				targetBall.idleMove = getDistanceByValue(targetBall.x, targetBall.y, targetBall.ballX, targetBall.ballY);
				if(targetBall.idleMove == 0){
					targetBall.idleTimeCount--;
					if(targetBall.idleTimeCount <= 0){
						setBallVelocity(ballPhysics_arr[n].body);
					}
				}else{
					targetBall.idleTimeCount = physicsData.idleTime;
				}
			}

			targetBall.ballX = targetBall.x;
			targetBall.ballY = targetBall.y;

			//min speed
			var maxSpeedX = 5;
			var maxSpeedY = 5;
			var dereaseSpeed = .2;
			if (ballPhysics_arr[n].body.velocity[0] > maxSpeedX) {
				ballPhysics_arr[n].body.velocity[0] -= dereaseSpeed;
			}
		
			if (ballPhysics_arr[n].body.velocity[0] < -maxSpeedX) {
				ballPhysics_arr[n].body.velocity[0] += dereaseSpeed;
			}
		
			if (ballPhysics_arr[n].body.velocity[1] > maxSpeedY) {
				ballPhysics_arr[n].body.velocity[1] -= dereaseSpeed;
			}
		
			if (ballPhysics_arr[n].body.velocity[1] < -maxSpeedY) {
				ballPhysics_arr[n].body.velocity[1] += dereaseSpeed;
			}
		}
	}
}

function pausedPhysics(index, con){
	worldArr[0].paused = con;
}

//p2 loop
function updatePhysics(){
	if(!worldArr[0].paused){
		worldArr[0].world.step(1/60);
		renderPhysics();
	}
}
////////////////////////////////////////////////////////////
// P2
////////////////////////////////////////////////////////////
import {World, ContactMaterial, Material, Circle, Body} from "p2";

import {canvasVars} from "@/components/game/GameCore/canvas";
import {gameVars} from "@/components/game/GameCore/game";
import {playHitSound, animatePin} from "@/components/game/GameCore/game";
import {randomIntFromInterval, getDistanceByValue} from "@/components/game/GameCore/plugins";
export let p2Vars = {
	worldArr : [],
	scaleX : 50,
	scaleY : -50,
	ballPhysics_arr : [],
	hitPhysics_arr : [],
	physicsData : {
		canvasW:0,
		canvasH:0,
		currentWorld:0,
		ballX:0,
		ballY:0,
		idleTime:10,
		idleTimeCount:0
	},
	ballMaterial : new Material(),
	pinMaterial : new Material(),
	ball_group : 1,
	pin_group : 2,
	pin_idle_group : 3,
};

// Экспортируем функцию для изменения переменных
export function setVarsP2(name, value) {
    // eslint-disable-next-line no-prototype-builtins
    if (p2Vars.hasOwnProperty(name)) {
        p2Vars[name] = value;
    } else {
        console.error(`Variable "${name}" does not exist in p2.js.`);
    }
}

				
export function initPhysics(){
	p2Vars.physicsData.canvasW = canvasVars.canvasW;
	p2Vars.physicsData.canvasH = canvasVars.canvasH;
	
	var n = 0;
	p2Vars.worldArr.push({world:'', paused:true})

	// Init p2.js	
	p2Vars.worldArr[n].world = new World({gravity:[0,-40]});

	var ballVsObject = new ContactMaterial(p2Vars.ballMaterial, p2Vars.pinMaterial, {
		// friction
		friction: .5,
		// bounce
		restitution: .4
	});
	p2Vars.worldArr[n].world.addContactMaterial(ballVsObject);

	p2Vars.worldArr[n].world.on('beginContact', function (evt){
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

		if(evt.bodyA.contactType === 'ball' && evt.bodyB.contactType === 'pin'){
			animatePin(evt.bodyB.pinIndex);
		}else if(evt.bodyA.contactType === 'pin' && evt.bodyB.contactType === 'ball'){
			animatePin(evt.bodyA.pinIndex);
		}
	});

	pausedPhysics(n, true);
}

function getBodyVelocity(body){
	return Math.abs(body.velocity[0]) + Math.abs(body.velocity[1]);
}

export function createPhysicBall(radius, x, y){
	p2Vars.ballPhysics_arr.push({shape:'', body:'', material:'', property:{radius:(radius/p2Vars.scaleX)}, position:[0, 0]});
	var newIndex = p2Vars.ballPhysics_arr.length-1;
		
	p2Vars.ballPhysics_arr[newIndex].shape = new Circle(p2Vars.ballPhysics_arr[newIndex].property);
	p2Vars.ballPhysics_arr[newIndex].material = p2Vars.ballMaterial;
	p2Vars.ballPhysics_arr[newIndex].shape.material = p2Vars.ballPhysics_arr[newIndex].material;
	p2Vars.ballPhysics_arr[newIndex].body = new Body({
		mass:1,
		position:p2Vars.ballPhysics_arr[newIndex].position
	});
	p2Vars.ballPhysics_arr[newIndex].body.addShape(p2Vars.ballPhysics_arr[newIndex].shape);
	p2Vars.ballPhysics_arr[newIndex].body.damping = 0;
	p2Vars.ballPhysics_arr[newIndex].body.angularDamping = 0;
	
	p2Vars.ballPhysics_arr[newIndex].body.position[0] = ((x) - (p2Vars.physicsData.canvasW/2))/p2Vars.scaleX;
	p2Vars.ballPhysics_arr[newIndex].body.position[1] = ((y) - p2Vars.physicsData.canvasH)/p2Vars.scaleY;
	p2Vars.ballPhysics_arr[newIndex].body.contactType = 'ball';

	if(!gameVars.gameSettings.ballCollision){
		p2Vars.ballPhysics_arr[newIndex].shape.collisionGroup = p2Vars.ball_group;
		p2Vars.ballPhysics_arr[newIndex].shape.collisionMask = p2Vars.pin_group;
	}
	
	p2Vars.worldArr[p2Vars.physicsData.currentWorld].world.addBody(p2Vars.ballPhysics_arr[newIndex].body);
}

export function createPhysicCircle(radius, x, y){
	p2Vars.hitPhysics_arr.push({shape:'', body:'', material:'', property:{radius:(radius/p2Vars.scaleX)}, position:[0, 0]});
	var newIndex = p2Vars.hitPhysics_arr.length-1;
		
	p2Vars.hitPhysics_arr[newIndex].shape = new Circle(p2Vars.hitPhysics_arr[newIndex].property);
	p2Vars.hitPhysics_arr[newIndex].material = p2Vars.pinMaterial;
	p2Vars.hitPhysics_arr[newIndex].shape.material = p2Vars.hitPhysics_arr[newIndex].material;
	p2Vars.hitPhysics_arr[newIndex].body = new Body({
		mass:0,
		position:p2Vars.hitPhysics_arr[newIndex].position
	});
	p2Vars.hitPhysics_arr[newIndex].body.addShape(p2Vars.hitPhysics_arr[newIndex].shape);
	
	p2Vars.hitPhysics_arr[newIndex].body.position[0] = (x - (p2Vars.physicsData.canvasW/2))/p2Vars.scaleX;
	p2Vars.hitPhysics_arr[newIndex].body.position[1] = (y - p2Vars.physicsData.canvasH)/p2Vars.scaleY;
	p2Vars.hitPhysics_arr[newIndex].body.contactType = 'pin';
	p2Vars.hitPhysics_arr[newIndex].body.pinIndex = newIndex;

	if(!gameVars.gameSettings.ballCollision){
		p2Vars.hitPhysics_arr[newIndex].shape.collisionGroup = p2Vars.pin_group;
		p2Vars.hitPhysics_arr[newIndex].shape.collisionMask = p2Vars.ball_group;
	}
	
	p2Vars.worldArr[p2Vars.physicsData.currentWorld].world.addBody(p2Vars.hitPhysics_arr[newIndex].body);
}

export function setPhysicCircle(index, con){
	p2Vars.hitPhysics_arr[index].body.collisionResponse = con;
}

export function removePhysicBall(index){
	p2Vars.worldArr[p2Vars.physicsData.currentWorld].world.removeBody(p2Vars.ballPhysics_arr[index].body);
}

// function dropPhysicsBall(index, x, y){
// 	p2Vars.ballPhysics_arr[index].body.position[0] = (x - (p2Vars.physicsData.canvasW/2))/p2Vars.scaleX;
// 	p2Vars.ballPhysics_arr[index].body.position[1] = (y - p2Vars.physicsData.canvasH)/p2Vars.scaleY;
// 	p2Vars.ballPhysics_arr[index].body.velocity[0] = 0;
// 	p2Vars.ballPhysics_arr[index].body.velocity[1] = 0;
// }

export function resetPhysicBall(){
	p2Vars.ballPhysics_arr.length = 0;
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
	for(var n=0; n<gameVars.gameData.ballArray.length; n++){
		var x = p2Vars.ballPhysics_arr[n].body.position[0],
			y = p2Vars.ballPhysics_arr[n].body.position[1];
		
		var targetBall = gameVars.gameData.ballArray[n];
		targetBall.x = (p2Vars.physicsData.canvasW/2) + (x * p2Vars.scaleX);
		targetBall.y = p2Vars.physicsData.canvasH + (y * p2Vars.scaleY);

		var checkIdle = true;
		if(gameVars.gameData.dropCon){
			if(checkIdle){
				targetBall.idleMove = getDistanceByValue(targetBall.x, targetBall.y, targetBall.ballX, targetBall.ballY);
				if(targetBall.idleMove === 0){
					targetBall.idleTimeCount--;
					if(targetBall.idleTimeCount <= 0){
						setBallVelocity(p2Vars.ballPhysics_arr[n].body);
					}
				}else{
					targetBall.idleTimeCount = p2Vars.physicsData.idleTime;
				}
			}

			targetBall.ballX = targetBall.x;
			targetBall.ballY = targetBall.y;

			//min speed
			var maxSpeedX = 5;
			var maxSpeedY = 5;
			var dereaseSpeed = .2;
			if (p2Vars.ballPhysics_arr[n].body.velocity[0] > maxSpeedX) {
				p2Vars.ballPhysics_arr[n].body.velocity[0] -= dereaseSpeed;
			}
		
			if (p2Vars.ballPhysics_arr[n].body.velocity[0] < -maxSpeedX) {
				p2Vars.ballPhysics_arr[n].body.velocity[0] += dereaseSpeed;
			}
		
			if (p2Vars.ballPhysics_arr[n].body.velocity[1] > maxSpeedY) {
				p2Vars.ballPhysics_arr[n].body.velocity[1] -= dereaseSpeed;
			}
		
			if (p2Vars.ballPhysics_arr[n].body.velocity[1] < -maxSpeedY) {
				p2Vars.ballPhysics_arr[n].body.velocity[1] += dereaseSpeed;
			}
		}
	}
}

export function pausedPhysics(index, con){
	p2Vars.worldArr[0].paused = con;
}

//p2 loop
export function updatePhysics(){
	if(!p2Vars.worldArr[0].paused){
		p2Vars.worldArr[0].world.step(1/60);
		renderPhysics();
	}
}
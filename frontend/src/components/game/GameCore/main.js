////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////
import {initGameCanvas, buildGameCanvas, resizeCanvas} from "@/components/game/GameCore/canvas";
import {buildGameButton, setupGames, goPage} from "@/components/game/GameCore/game";
import {initPhysics} from "@/components/game/GameCore/p2";
import {checkMobileOrientation} from "@/components/game/GameCore/mobile";
import {checkContentWidth, checkContentHeight, checkIfMobile} from "@/components/game/GameCore/plugins";
import {initVars} from "@/components/game/GameCore/init";


export let mainVars = {
	stageW: 1280,
	stageH: 768,
	contentW : 1024,
	contentH : 576,
	viewport : {
		isLandscape:true
	},
	landscapeSize :{
		w: 1280,
		h: 768,
		cW:1024,
		cH:576,
	},
	portraitSize: {
		w:768,
		h:1024,
		cW:576,
		cH:900
	},
	windowW: 0,
	windowH: 0,
	scalePercent: 0,
	offset : {
		x:0,
		y:0,
		left:0,
		top:0
	},
};

export function setVarsMain(name, value) {
    // eslint-disable-next-line no-prototype-builtins
    if (mainVars.hasOwnProperty(name)) {
        mainVars[name] = value;
    } else {
        console.error(`Variable "${name}" does not exist in main.js.`);
    }
}


/*!
 * 
 * START BUILD GAME - This is the function that runs build game
 * 
 */
export function initMain(){
	if(!checkIfMobile() || !initVars.isTablet){
		document.getElementById('canvasHolder').style.display = 'block';
	}
	
	initGameCanvas(mainVars.stageW,mainVars.stageH);
	buildGameCanvas();
	buildGameButton();
	
	initPhysics();
	setupGames();
	
	goPage('main');
	checkMobileOrientation();
	resizeCanvas();
}

/*!
 * 
 * GAME RESIZE - This is the function that runs to resize and centralize the game
 * 
 */
export function resizeGameFunc(){
	setTimeout(function() {
		document.getElementById('mobileRotate').style.left = checkContentWidth(document.getElementById('mobileRotate'));
		document.getElementById('mobileRotate').style.top = checkContentHeight(document.getElementById('mobileRotate'));
		
		mainVars.windowW = window.innerWidth;
		mainVars.windowH = window.innerHeight;
		
		mainVars.scalePercent = mainVars.windowW/mainVars.contentW;
		if((mainVars.contentH*mainVars.scalePercent)>mainVars.windowH){
			mainVars.scalePercent = mainVars.windowH/mainVars.contentH;
		}
		
		mainVars.scalePercent = mainVars.scalePercent > 1 ? 1 : mainVars.scalePercent;
		
		if(mainVars.windowW > mainVars.stageW && mainVars.windowH > mainVars.stageH){
			if(mainVars.windowW > mainVars.stageW){
				mainVars.scalePercent = mainVars.windowW/mainVars.stageW;
				if((mainVars.stageH*mainVars.scalePercent)>mainVars.windowH){
					mainVars.scalePercent = mainVars.windowH/mainVars.stageH;
				}	
			}
		}
		
		var newCanvasW = ((mainVars.stageW)*mainVars.scalePercent);
		var newCanvasH = ((mainVars.stageH)*mainVars.scalePercent);
		
		mainVars.offset.left = 0;
		mainVars.offset.top = 0;
		
		if(newCanvasW > mainVars.windowW){
			mainVars.offset.left = -((newCanvasW) - mainVars.windowW);
		}else{
			mainVars.offset.left = mainVars.windowW - (newCanvasW);
		}
		
		if(newCanvasH > mainVars.windowH){
			mainVars.offset.top = -((newCanvasH) - mainVars.windowH);
		}else{
			mainVars.offset.top = mainVars.windowH - (newCanvasH);
		}
		
		mainVars.offset.x = 0;
		mainVars.offset.y = 0;
		
		if(mainVars.offset.left < 0){
			mainVars.offset.x = Math.abs((mainVars.offset.left/mainVars.scalePercent)/2);
		}
		if(mainVars.offset.top < 0){
			mainVars.offset.y = Math.abs((mainVars.offset.top/mainVars.scalePercent)/2);
		}
		
		document.getElementById('gameCanvas').style.width = newCanvasW;
		document.getElementById('gameCanvas').style.height = newCanvasH;
		
		document.getElementById('gameCanvas').style.left = mainVars.offset.left/2;
		document.getElementById('gameCanvas').style.top =mainVars.offset.top/2;
		
		window.scrollTop(0);
		
		resizeCanvas();
	}, 100);	
}
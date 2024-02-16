////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////
import { LoadQueue } from "createjs-module";
import { Sound } from "createjs-module";

import {initVars} from "@/components/game/GameCore/init";
import {checkMobileEvent} from "@/components/game/GameCore/mobile";
import {resizeGameFunc, initMain} from "@/components/game/GameCore/main";
import {soundVars, setVarsSound} from "@/components/game/GameCore/sound";
import {checkIfMobile} from "@/components/game/GameCore/plugins";
/*!
*
* START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
*
*/
export let loaderVars = {
	loader: null,
	manifest: null,
}

export function setVarsLoader(name, value) {
    // eslint-disable-next-line no-prototype-builtins
    if (loaderVars.hasOwnProperty(name)) {
        loaderVars[name] = value;
    } else {
        console.error(`Variable "${name}" does not exist in loader.js.`);
    }
}


export function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	window.addEventListener('resize', resizeGameFunc);
	resizeGameFunc();
	
	loaderVars.loader = new LoadQueue(false);
	loaderVars.manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/background_p.png', id:'backgroundP'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/logo_p.png', id:'logoP'},
			{src:'assets/button_start.png', id:'buttonStart'},
			
			{src:'assets/item_ball.png', id:'itemBall'},
			{src:'assets/button_arrow_left.png', id:'buttonArrowL'},
			{src:'assets/button_arrow_right.png', id:'buttonArrowR'},
			{src:'assets/button_bet_half.png', id:'buttonBetHalf'},
			{src:'assets/button_bet_multiply.png', id:'buttonBetMultiply'},
			{src:'assets/button_blank.png', id:'buttonBlank'},
			{src:'assets/item_drag_bar.png', id:'itemDragBar'},
			{src:'assets/item_drag.png', id:'itemDrag'},
			{src:'assets/item_stat_display.png', id:'itemStatDisplay'},
			{src:'assets/item_plinko.png', id:'itemPlinko'},
			{src:'assets/item_plinko_p.png', id:'itemPlinkoP'},

			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/item_exit.png', id:'itemExit'},
			{src:'assets/item_exit_p.png', id:'itemExitP'},
		
			{src:'assets/button_continue.png', id:'buttonContinue'},
			
			{src:'assets/item_result.png', id:'itemResult'},
			{src:'assets/item_result_p.png', id:'itemResultP'},
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}
	];
	
	soundVars.soundOn = true;
	if(checkIfMobile || initVars.isTablet){
		if(!soundVars.enableMobileSound){
			setVarsSound('soundOn', false);
		}
	}else{
		if(!soundVars.enableDesktopSound){
			setVarsSound('soundOn', false);
		}
	}
	
	if(soundVars.soundOn){
		loaderVars.manifest.push({src:'assets/sounds/sound_result.ogg', id:'soundResult'});
		loaderVars.manifest.push({src:'assets/sounds/sound_button.ogg', id:'soundClick'});
		loaderVars.manifest.push({src:'assets/sounds/sound_start.ogg', id:'soundStart'});
		loaderVars.manifest.push({src:'assets/sounds/sound_win.ogg', id:'soundWin'});
		loaderVars.manifest.push({src:'assets/sounds/sound_nowin.ogg', id:'soundLose'});
		loaderVars.manifest.push({src:'assets/sounds/sound_score.ogg', id:'soundScore'});
		loaderVars.manifest.push({src:'assets/sounds/sound_noscore.ogg', id:'soundNoScore'});
		loaderVars.manifest.push({src:'assets/sounds/sound_change.ogg', id:'soundChange'});
		loaderVars.manifest.push({src:'assets/sounds/sound_ball.ogg', id:'soundBall'});
		loaderVars.manifest.push({src:'assets/sounds/sound_hit.ogg', id:'soundHit'});
		
		Sound.alternateExtensions = ["mp3"];
		loaderVars.loader.installPlugin(Sound);
	}
	
	loaderVars.loader.addEventListener("complete", handleComplete);
	loaderVars.loader.addEventListener("fileload", fileComplete);
	loaderVars.loader.addEventListener("error",handleFileError);
	loaderVars.loader.on("progress", handleProgress, this);
	loaderVars.loader.loadManifest(loaderVars.manifest);
}


/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	document.querySelector('#mainLoader span').innerHTML = Math.round(loaderVars.loader.progress / 1 * 100) + '%';
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
}

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		document.getElementById('mainLoader').style.display = 'block';
	}else{
		document.getElementById('mainLoader').style.display = 'hide';
	}
}
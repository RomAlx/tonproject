////////////////////////////////////////////////////////////
// MOBILE
////////////////////////////////////////////////////////////
import {mainVars, setVarsMain, resizeGameFunc} from "@/components/game/GameCore/main";
import {initVars} from "@/components/game/GameCore/init";
import {changeViewport} from "@/components/game/GameCore/canvas"
import {checkIfMobile} from "@/components/game/GameCore/plugins";
let mobileVars = {
	resizeTimer: null,
}

export function setVariableMobile(name, value) {
    // eslint-disable-next-line no-prototype-builtins
    if (mobileVars.hasOwnProperty(name)) {
        mobileVars[name] = value;
    } else {
        console.error(`Variable "${name}" does not exist in loader.js.`);
    }
}

/*!
 * 
 * START MOBILE CHECK - This is the function that runs for mobile event
 * 
 */
export function checkMobileEvent(){
	if(checkIfMobile() || initVars.isTablet){
		window.onorientationchange = null;
		window.onorientationchange = function() {
			document.getElementById('canvasHolder').style.display = 'none';
			document.getElementById('rotateHolder').style.display = 'none';

			clearTimeout(mobileVars.resizeTimer);
			mobileVars.resizeTimer = setTimeout(checkMobileOrientation, 1000);
		};

		checkMobileOrientation();
	}
}

/*!
 * 
 * MOBILE ORIENTATION CHECK - This is the function that runs to check mobile orientation
 * 
 */
export function checkMobileOrientation() {

	
	mainVars.isLandscape = window.innerWidth > window.innerHeight;
	setVarsMain('isLandscape', mainVars.isLandscape);
	
	changeViewport(mainVars.viewport.isLandscape);
	resizeGameFunc();
	document.getElementById('canvasHolder').style.display = 'block';
}

/*!
 * 
 * TOGGLE ROTATE MESSAGE - This is the function that runs to display/hide rotate instruction
 * 
 */
export function toggleRotate(con){
	if(con){
		document.getElementById('rotateHolder').fadeIn();
	}else{
		document.getElementById('rotateHolder').fadeOut();
	}
	resizeGameFunc();
}
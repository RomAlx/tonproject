////////////////////////////////////////////////////////////
// INIT
////////////////////////////////////////////////////////////
import {checkContentWidth, checkContentHeight, getDeviceVer} from "@/components/game/GameCore/plugins"
import {initPreload} from "./loader";

export let initVars = {
    stageWidth: 0,
    stageHeight: 0,
    isLoaded: false,
    browserSupport: false,
    isTablet: null,
    deviceVer: null,
};


/*!
 * 
 * LOADER RESIZE - This is the function that runs to centeralised loader when resize
 * 
 */
export function resizeLoaderFunc() {
    initVars.stageWidth = window.width;
    initVars.stageHeight = window.height;

    document.getElementById('mainLoader').style.left = checkContentWidth(document.getElementById('mainLoader'));
    document.getElementById('mainLoader').style.top = checkContentHeight(document.getElementById('mainLoader'));
}

/*!
 * 
 * BROWSER DETECT - This is the function that runs for browser and feature detection
 * 
 */

export function checkBrowser() {
    initVars.isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
    initVars.deviceVer = getDeviceVer();

    let canvasEl = document.createElement('canvas');
    if (canvasEl.getContext) {
        initVars.browserSupport = true;
    }

    if (initVars.browserSupport) {
        if (!initVars.isLoaded) {
            initVars.isLoaded = true;
            initPreload();
        }
    } else {
        //browser not support
        document.getElementById('mainLoader').show();
    }
}
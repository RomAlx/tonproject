////////////////////////////////////////////////////////////
// INIT
////////////////////////////////////////////////////////////
import {World, ContactMaterial, Material, Circle, Body} from "p2";
import { LoadQueue } from "createjs-module";
import { Sound } from "createjs-module";
import { Stage, Container, Ticker, Bitmap, Text, Shape, Graphics } from 'createjs-module';
import {TweenMax} from "gsap/gsap-core";
import {Bounce, Circ, Sine} from "gsap/gsap-core";
export let initVars = {
    stageWidth: 0,
    stageHeight: 0,
    isLoaded: false,
    browserSupport: false,
    isTablet: null,
    deviceVer: null,
};

export let loaderVars = {
	loader: null,
	manifest: null,
}

/*!
 *
 * GAME SETTING CUSTOMIZATION START
 *
 */
export let gameVars = {
    gameSettings : {
		enableFixedResult:false, //option to have fixed result by API, enabling this will disable 2D physics engine
		enablePercentage:false, //option to have result base on percentage, enabling this will disable 2D physics engine
		ballCollision:true, //ball collision for 2D physics engine
		gamePlayType:false, //game play type; true for chance, false for bet
		credit:1000, //start credit
		chances:100, //start chances
		chancesPoint:10, //chances bet point
		minBet:10, //bet minimum
		maxBet:1000, //bet maximum
		maxBalls:100, //maximum balls
		nextBallDelay:0.4, //multiple ball drop delay
		history:10, //total history
		board:{
			size:45,
			ballSize:12,
			pinSize:5,
			pinColor:'#fff',
			pinMoveColor:'#FFBF00',
			startPin:3,
			notiFontSize:22,
			notiColor:["#13BC5B","#CC0D0D"]
		},
		rows:[
			{
				total:8,
				even:false,
				prizes:[
					{value:[0.5, 0.4, 0.2], text:["0.5x", "0.4x", "0.2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#FFBF00", bgWinColor:"#F4A800", percent:0},
					{value:[1, 0.7, 0.3], text:["1x", "0.7x", "0.3x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF7C11", bgWinColor:"#FC7E15", percent:0},
					{value:[1.1, 1.3, 1.5], text:["1.1x", "1.3x", "1.5x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[2.1, 3, 4], text:["2.1x", "3x", "4x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF282C", bgWinColor:"#FC1521", percent:0},
					{value:[5.6, 13, 29], text:["5.6x", "13x", "29x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#ED0000", bgWinColor:"#FF0000", percent:0},
				]
			},
			{
				total:9,
				even:true,
				prizes:[
					{value:[0.7, 0.5, 0.2], text:["0.5x", "0.5x", "0.2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#FFBF00", bgWinColor:"#F4A800", percent:0},
					{value:[1, 0.9, 0.6], text:["1x", "0.9x", "0.6x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF7C11", bgWinColor:"#FC7E15", percent:0},
					{value:[1.6, 1.7, 2], text:["1.6x", "1.7x", "2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[2, 4, 7], text:["2x", "4x", "7x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF282C", bgWinColor:"#FC1521", percent:0},
					{value:[5.6, 18, 43], text:["5.6x", "18x", "43x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#ED0000", bgWinColor:"#FF0000", percent:0},
				]
			},
			{
				total:10,
				even:false,
				prizes:[
					{value:[0.5, 0.4, 0.2], text:["0.5x", "0.4x", "0.2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#FFBF00", bgWinColor:"#F4A800", percent:0},
					{value:[1, 0.6, 0.3], text:["1x", "0.6x", "0.3x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF7C11", bgWinColor:"#FC7E15", percent:0},
					{value:[1.1, 1.4, 0.9], text:["1.1x", "1.4x", "0.9x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[1.4, 2, 3], text:["1.4x", "2x", "3x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[3, 5, 10], text:["3x", "5x", "10x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF282C", bgWinColor:"#FC1521", percent:0},
					{value:[8.9, 22, 76], text:["8.9x", "22x", "76x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#ED0000", bgWinColor:"#FF0000", percent:0},
				]
			},
			{
				total:11,
				even:true,
				prizes:[
					{value:[0.7, 0.5, 0.2], text:["0.7x", "0.5x", "0.2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#FFBF00", bgWinColor:"#F4A800", percent:0},
					{value:[1, 0.7, 0.4], text:["1x", "0.7x", "0.4x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF7C11", bgWinColor:"#FC7E15", percent:0},
					{value:[1.3, 1.8, 1.4], text:["1.3x", "1.8x", "1.4x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[1.9, 3, 5.2], text:["1.9x", "3x", "5.2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[3, 6, 14], text:["3x", "6x", "14x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF282C", bgWinColor:"#FC1521", percent:0},
					{value:[8.4, 24, 120], text:["8.4x", "24x", "120x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#ED0000", bgWinColor:"#FF0000", percent:0},
				]
			},
			{
				total:12,
				even:false,
				prizes:[
					{value:[0.5, 0.3, 0.2], text:["0.5x", "0.3x", "0.2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#FFBF00", bgWinColor:"#F4A800", percent:0},
					{value:[1, 0.6, 0.2], text:["1x", "0.6x", "0.2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF7C11", bgWinColor:"#FC7E15", percent:0},
					{value:[1.1, 1.1, 0.7], text:["1.1x", "1.1x", "0.7x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[1.4, 2, 2], text:["1.4x", "2x", "2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[1.6, 4, 8.1], text:["1.6x", "4x", "8.1x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[3, 11, 24], text:["3x", "11x", "24x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF282C", bgWinColor:"#FC1521", percent:0},
					{value:[10, 33, 170], text:["10x", "33x", "170x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#ED0000", bgWinColor:"#FF0000", percent:0},
				]
			},
			{
				total:13,
				even:true,
				prizes:[
					{value:[0.7, 0.4, 0.2], text:["0.7x", "0.4x", "0.2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#FFBF00", bgWinColor:"#F4A800", percent:0},
					{value:[0.9, 0.7, 0.2], text:["0.9x", "0.7x", "0.2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF7C11", bgWinColor:"#FC7E15", percent:0},
					{value:[1.2, 1.3, 1], text:["1.2x", "1.3x", "1x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[1.9, 3, 4], text:["1.9x", "3x", "4x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[3, 6, 1], text:["3x", "6x", "1x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[4, 13, 37], text:["4x", "13x", "37x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF282C", bgWinColor:"#FC1521", percent:0},
					{value:[8.1, 43, 280], text:["8.1x", "43x", "200x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#ED0000", bgWinColor:"#FF0000", percent:0},
				]
			},
			{
				total:14,
				even:false,
				prizes:[
					{value:[0.5, 0.2, 0.2], text:["0.5x", "0.2x", "0.2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#FFBF00", bgWinColor:"#F4A800", percent:0},
					{value:[1, 0.5, 0.2], text:["1x", "0.5x", "0.2x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF7C11", bgWinColor:"#FC7E15", percent:0},
					{value:[1.1, 1, 0.3], text:["1.1x", "1x", "0.3x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF7C11", bgWinColor:"#FC7E15", percent:0},
					{value:[1.3, 1.9, 1.9], text:["1.3x", "1.9x", "1.9x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[1.4, 4, 5], text:["1.4x", "4x", "5x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[1.9, 7, 18], text:["1.9x", "7x", "18x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF521E", bgWinColor:"#FF4A1A", percent:0},
					{value:[4, 15, 56], text:["4x", "15x", "56x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#EF282C", bgWinColor:"#FC1521", percent:0},
					{value:[7.1, 58, 420], text:["7.1x", "58x", "420x"], fontSize:12, lineHeight:10, x:0, y:3, color:"#fff", bgColor:"#ED0000", bgWinColor:"#FF0000", percent:0},
				]
			}
		],
	},
	textDisplay : {
					creditLabel:"CREDIT",
					credit:"$[NUMBER]",
					betLabel:"BET AMOUNT",
					bet:"$[NUMBER]",
					chanceLabel:"CHANCES",
					chance:"X[NUMBER]",
					riskLabel:"RISK LEVEL",
					risk:["LOW","MID","HIGH"],
					rowsLabel:"ROWS",
					ballsLabel:"BALLS",
					buttonPlay:"PLAY",
					buttonPlaying:"PLAYING...",
					playBet:"PLAY $[NUMBER]",
					playChance:"x[NUMBER] CHANCES ($[TOTAL])",
					betInsufficient:"NOT ENOUGH CREDIT",
					chanceInsufficient:"NOT ENOUGH CHANCES",
					won:"YOU WON $[NUMBER]",
					lose:"BETTER LUCK NEXT TIME",
					playing:'PLAYING...',
					playingMultiple:'PLAYING... ([NUMBER] BALLS)',
					gameOver:'GAME OVER',
					collectPrize:"[NUMBER]",
					exitTitle:"EXIT GAME",
					exitMessage:"ARE YOU SURE YOU WANT\nTO QUIT GAME?",
					share:"SHARE YOUR SCORE",
					resultTitle:"GAME OVER",
					resultDesc:"YOU WON",
					resultScore:"$[NUMBER]"
	},
	shareEnable: true,
	shareTitle : "Highscore on Extreme Plinko Game at $[SCORE].",
	shareMessage : "$[SCORE] is mine new highscore on Extreme Plinko Game! Try it now!",
	playerData : {
		chance: 0,
		score: 0,
		point: 0,
		bet: 0
	},
	gameData : {
		paused:true,
		dropCon:false,
		ballArray:[],
		historyArray:[],
		historyObj:[],
		pinObj:[],
		totalBet:0,
		totalBalls:0,
		totalRows:0,
		lastRows:-1,
		riskLevel:0,
		boardW:0,
		winAmount:0,
		moveArray:[],
		finalMoveArray:[],
		fixedResult:[]
	},
	tweenData : {
		score:0,
		scoreTarget:0,
		resultScore:0
	},
	curPage:'',
	enable:false,
	pin: [],
	move: [],
	prize: [],
};

////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////

export let canvasVars = {
    stage : null,
	canvasW : 0,
	canvasH : 0,
	guide : false,
	guideline: new Shape(),
	bg: null, //new Bitmap(loaderVars.loader.getResult('background')),
	bgP: null, //new Bitmap(loaderVars.loader.getResult('backgroundP')),
	logo: null, //new Bitmap(loaderVars.loader.getResult('logo')),
	logoP: null, //new Bitmap(loaderVars.loader.getResult('logoP')),
	// containers //
	canvasContainer: undefined, //new Container(),
	mainContainer: undefined, //new Container(),
	gameContainer: undefined, //new Container(),
	stateContainer: undefined, //new Container(),
	plinkoContainer: undefined, //new Container(),
	plinkoItemContainer: undefined, //new Container(),
	plinkoPrizesContainer: undefined, //new Container(),
	plinkoWinContainer: undefined, //new Container(),
	plinkoBallsContainer: undefined, //new Container(),
	plinkoGuideContainer: undefined, //new Container(),
	historyContainer: undefined, //new Container(),
	statsCreditContainer: undefined, //new Container(),
	statsBetChanceContainer: undefined, //new Container(),
	statsRiskContainer: undefined, //new Container(),
	statsRowsContainer: undefined, //new Container(),
	statsBallsContainer: undefined, //new Container(),
	statsPlayContainer:undefined, //new Container(),
	resultContainer: undefined, //new Container(),
	confirmContainer: undefined, //new Container(),
	optionsContainer: undefined, //new Container(),
	// buttons //
	buttonStart: null, //new Bitmap(loaderVars.loader.getResult('buttonStart')),
	buttonRestart: null,
	// buttonFacebook: null,
	// buttonTwitter: null,
	// buttonWhatsapp: null,
	buttonFullscreen: null, //new Bitmap(loaderVars.loader.getResult('buttonFullscreen')),
	buttonSoundOn: null, //new Bitmap(loaderVars.loader.getResult('buttonSoundOn')),
	buttonSoundOff: null, //new Bitmap(loaderVars.loader.getResult('buttonSoundOff')),
	buttonMusicOn: null,
	buttonMusicOff: null,
	buttonBetHalf: null, //new Bitmap(loaderVars.loader.getResult('buttonBetHalf')),
	buttonBetMultiply: null, //new Bitmap(loaderVars.loader.getResult('buttonBetMultiply')),
	buttonRiskL: null, //new Bitmap(loaderVars.loader.getResult('buttonArrowL')),
	buttonRiskR: null, //new Bitmap(loaderVars.loader.getResult('buttonArrowR')),
	buttonBlank: null, //new Bitmap(loaderVars.loader.getResult('buttonBlank')),
	buttonContinue: null, //new Bitmap(loaderVars.loader.getResult('buttonContinue')),
	buttonExit: null, //new Bitmap(loaderVars.loader.getResult('buttonExit')),
	buttonSettings: null, //new Bitmap(loaderVars.loader.getResult('buttonSettings')),
	buttonConfirm: null, //new Bitmap(loaderVars.loader.getResult('buttonConfirm')),
	buttonCancel: null, //new Bitmap(loaderVars.loader.getResult('buttonCancel')),
	// txt //
	statCreditTxt: new Text(),
	statCreditLabelTxt: new Text(),
	statBetChanceLabelTxt: new Text(),
	statBetChanceTxt: new Text(),
	statRiskLabelTxt: new Text(),
	statRiskTxt: new Text(),
	statRowsLabelTxt: new Text(),
	statRowsTxt: new Text(),
	statBallsLabelTxt: new Text(),
	statBallsTxt: new Text(),
	buttonBlankTxt: new Text(),
	statusTxt: new Text(),
	resultShareTxt: new Text(),
	resultTitleTxt: new Text(),
	resultDescTxt: new Text(),
	resultScoreTxt: new Text(),
	exitTitleTxt: new Text(),
	popDescTxt: new Text(),
	// items //
	itemStatBetChance: null, //new Bitmap(loaderVars.loader.getResult('itemStatDisplay')),
	itemStatCredit: null, //new Bitmap(loaderVars.loader.getResult('itemStatDisplay')),
	itemStatRisk: null, //new Bitmap(loaderVars.loader.getResult('itemStatDisplay')),
	itemStatRows: null, //new Bitmap(loaderVars.loader.getResult('itemStatDisplay')),
	itemRowsDragBar: null, //new Bitmap(loaderVars.loader.getResult('itemDragBar')),
	itemRowsDrag: null, //new Bitmap(loaderVars.loader.getResult('itemDrag')),
	itemStatBalls: null, //new Bitmap(loaderVars.loader.getResult('itemStatDisplay')),
	itemBallsDragBar: null, //new Bitmap(loaderVars.loader.getResult('itemDragBar')),
	itemBallsDrag: null, //new Bitmap(loaderVars.loader.getResult('itemDrag')),
	itemPlinko: null, //new Bitmap(loaderVars.loader.getResult('itemPlinko')),
	itemPlinkoP: null, //new Bitmap(loaderVars.loader.getResult('itemPlinkoP')),
	itemResult: null, //new Bitmap(loaderVars.loader.getResult('itemResult')),
	itemResultP: null, //new Bitmap(loaderVars.loader.getResult('itemResultP')),
	itemExit: null, //new Bitmap(loaderVars.loader.getResult('itemExit')),
	itemExitP: null, //new Bitmap(loaderVars.loader.getResult('itemExitP')),
};

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

let mobileVars = {
	resizeTimer: null,
}

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

////////////////////////////////////////////////////////////
// SOUND
////////////////////////////////////////////////////////////

export let soundVars = {
	enableDesktopSound: true, //sound for dekstop
	enableMobileSound : true, //sound for mobile and tablet
	soundOn: null,
	soundMute : false,
	musicMute : false,
	soundID : 0,
	soundPushArr : [],
	soundLoopPushArr : [],
	musicPushArr : [],
	audioFile : null,
    sound: {},
}

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

////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

/*!
*
* START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
*
*/

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
			soundVars.soundOn = false;
		}
	}else{
		if(!soundVars.enableDesktopSound){
			soundVars.soundOn = false;
		}
	}

	// if(soundVars.soundOn){
	// 	loaderVars.manifest.push({src:'assets/sounds/sound_result.ogg', id:'soundResult'});
	// 	loaderVars.manifest.push({src:'assets/sounds/sound_button.ogg', id:'soundClick'});
	// 	loaderVars.manifest.push({src:'assets/sounds/sound_start.ogg', id:'soundStart'});
	// 	loaderVars.manifest.push({src:'assets/sounds/sound_win.ogg', id:'soundWin'});
	// 	loaderVars.manifest.push({src:'assets/sounds/sound_nowin.ogg', id:'soundLose'});
	// 	loaderVars.manifest.push({src:'assets/sounds/sound_score.ogg', id:'soundScore'});
	// 	loaderVars.manifest.push({src:'assets/sounds/sound_noscore.ogg', id:'soundNoScore'});
	// 	loaderVars.manifest.push({src:'assets/sounds/sound_change.ogg', id:'soundChange'});
	// 	loaderVars.manifest.push({src:'assets/sounds/sound_ball.ogg', id:'soundBall'});
	// 	loaderVars.manifest.push({src:'assets/sounds/sound_hit.ogg', id:'soundHit'});
    //
	// 	Sound.alternateExtensions = ["mp3"];
	// 	loaderVars.loader.installPlugin(Sound);
	// }

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

// Экспортируем функцию для изменения переменных
export function setVarsCanvas(name, value) {
    // eslint-disable-next-line no-prototype-builtins
    if (canvasVars.hasOwnProperty(name)) {
        canvasVars[name] = value;
    } else {
        console.error(`Variable "${name}" does not exist in canvas.js.`);
    }
}

/*!
 *
 * START GAME CANVAS - This is the function that runs to setup game canvas
 *
 */
export function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;

	canvasVars.canvasW=w;
	canvasVars.canvasH=h;
	canvasVars.stage = new Stage("gameCanvas");

	Touch.enable(canvasVars.stage);
	canvasVars.stage.enableMouseOver(20);
	canvasVars.stage.mouseMoveOutside = true;

	Ticker.framerate = 60;
	Ticker.addEventListener("tick", tick);
}
// gameVars.pin = {};
// gameVars.move = {};
// gameVars.prize = {};

/*!
 *
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 *
 */
export function buildGameCanvas(){
    canvasVars.canvasContainer = new Container();
	canvasVars.mainContainer = new Container();
	canvasVars.gameContainer = new Container();
	canvasVars.stateContainer = new Container();
	canvasVars.plinkoContainer = new Container();
	canvasVars.plinkoItemContainer = new Container();
	canvasVars.plinkoPrizesContainer = new Container();
	canvasVars.plinkoWinContainer = new Container();
	canvasVars.plinkoBallsContainer = new Container();
	canvasVars.plinkoGuideContainer = new Container();
	canvasVars.historyContainer = new Container();
	canvasVars.statsCreditContainer = new Container();
	canvasVars.statsBetChanceContainer = new Container();
	canvasVars.statsRiskContainer = new Container();
	canvasVars.statsRowsContainer = new Container();
	canvasVars.statsBallsContainer = new Container();
	canvasVars.statsPlayContainer = new Container();
	canvasVars.resultContainer = new Container();
	canvasVars.confirmContainer = new Container();
	canvasVars.optionsContainer = new Container();

	centerReg(canvasVars.buttonStart);
	canvasVars.buttonStart.x = canvasVars.canvasW/2;
	canvasVars.buttonStart.y = canvasVars.canvasH/100 * 65;

	//game
	canvasVars.itemStatCredit = new Bitmap(loaderVars.loader.getResult('itemStatDisplay'));
	// canvasVars.statCreditLabelTxt = new Text();
	// canvasVars.statCreditLabelTxt.font = "20px azonixregular";
	canvasVars.statCreditLabelTxt.color = '#fff';
	canvasVars.statCreditLabelTxt.textAlign = "left";
	canvasVars.statCreditLabelTxt.textBaseline='alphabetic';
	canvasVars.statCreditLabelTxt.text = gameVars.textDisplay.creditLabel;
	canvasVars.statCreditLabelTxt.x = 20;
	canvasVars.statCreditLabelTxt.y = -5;

	// canvasVars.statCreditTxt = new Text();
	canvasVars.statCreditTxt.font = "30px azonixregular";
	canvasVars.statCreditTxt.color = '#fff';
	canvasVars.statCreditTxt.textAlign = "left";
	canvasVars.statCreditTxt.textBaseline='alphabetic';
	canvasVars.statCreditTxt.text = gameVars.textDisplay.creditLabel;
	canvasVars.statCreditTxt.x = 20;
	canvasVars.statCreditTxt.y = 33;

	canvasVars.statsCreditContainer.addChild(canvasVars.itemStatCredit, canvasVars.statCreditLabelTxt, canvasVars.statCreditTxt);

	canvasVars.itemStatBetChance = new Bitmap(loaderVars.loader.getResult('itemStatDisplay'));
	// canvasVars.statBetChanceLabelTxt = new Text();
	canvasVars.statBetChanceLabelTxt.font = "20px azonixregular";
	canvasVars.statBetChanceLabelTxt.color = '#fff';
	canvasVars.statBetChanceLabelTxt.textAlign = "left";
	canvasVars.statBetChanceLabelTxt.textBaseline='alphabetic';
	canvasVars.statBetChanceLabelTxt.text = gameVars.textDisplay.betLabel;
	canvasVars.statBetChanceLabelTxt.x = 20;
	canvasVars.statBetChanceLabelTxt.y = -5;

	// canvasVars.statBetChanceTxt = new Text();
	canvasVars.statBetChanceTxt.font = "30px azonixregular";
	canvasVars.statBetChanceTxt.color = '#fff';
	canvasVars.statBetChanceTxt.textAlign = "left";
	canvasVars.statBetChanceTxt.textBaseline='alphabetic';
	canvasVars.statBetChanceTxt.text = gameVars.textDisplay.creditLabel;
	canvasVars.statBetChanceTxt.x = 20;
	canvasVars.statBetChanceTxt.y = 33;

	canvasVars.buttonBetHalf = new Bitmap(loaderVars.loader.getResult('buttonBetHalf'));
	centerReg(canvasVars.buttonBetHalf);
	canvasVars.buttonBetMultiply = new Bitmap(loaderVars.loader.getResult('buttonBetMultiply'));
	centerReg(canvasVars.buttonBetMultiply);

	canvasVars.buttonBetHalf.x = 160;
	canvasVars.buttonBetMultiply.x = 205;
	canvasVars.buttonBetMultiply.y = canvasVars.buttonBetHalf.y = 20;

	canvasVars.statsBetChanceContainer.addChild(canvasVars.itemStatBetChance, canvasVars.statBetChanceLabelTxt, canvasVars.statBetChanceTxt, canvasVars.buttonBetHalf, canvasVars.buttonBetMultiply);

	canvasVars.itemStatRisk = new Bitmap(loaderVars.loader.getResult('itemStatDisplay'));
	// canvasVars.statRiskLabelTxt = new Text();
	canvasVars.statRiskLabelTxt.font = "20px azonixregular";
	canvasVars.statRiskLabelTxt.color = '#fff';
	canvasVars.statRiskLabelTxt.textAlign = "left";
	canvasVars.statRiskLabelTxt.textBaseline='alphabetic';
	canvasVars.statRiskLabelTxt.text = gameVars.textDisplay.riskLabel;
	canvasVars.statRiskLabelTxt.x = 20;
	canvasVars.statRiskLabelTxt.y = -5;

	// canvasVars.statRiskTxt = new Text();
	canvasVars.statRiskTxt.font = "30px azonixregular";
	canvasVars.statRiskTxt.color = '#fff';
	canvasVars.statRiskTxt.textAlign = "center";
	canvasVars.statRiskTxt.textBaseline='alphabetic';
	canvasVars.statRiskTxt.text = gameVars.textDisplay.creditLabel;
	canvasVars.statRiskTxt.x = 120;
	canvasVars.statRiskTxt.y = 33;

	canvasVars.buttonRiskL = new Bitmap(loaderVars.loader.getResult('buttonArrowL'));
	centerReg(canvasVars.buttonRiskL);
	canvasVars.buttonRiskR = new Bitmap(loaderVars.loader.getResult('buttonArrowR'));
	centerReg(canvasVars.buttonRiskR);

	canvasVars.buttonRiskR.x = 205;
	canvasVars.buttonRiskL.x = 30;
	canvasVars.buttonRiskL.y = canvasVars.buttonRiskR.y = 20;

	canvasVars.statsRiskContainer.addChild(canvasVars.itemStatRisk, canvasVars.statRiskLabelTxt, canvasVars.statRiskTxt, canvasVars.buttonRiskL, canvasVars.buttonRiskR);

	canvasVars.itemStatRows = new Bitmap(loaderVars.loader.getResult('itemStatDisplay'));
	// canvasVars.statRowsLabelTxt = new Text();
	canvasVars.statRowsLabelTxt.font = "20px azonixregular";
	canvasVars.statRowsLabelTxt.color = '#fff';
	canvasVars.statRowsLabelTxt.textAlign = "left";
	canvasVars.statRowsLabelTxt.textBaseline='alphabetic';
	canvasVars.statRowsLabelTxt.text = gameVars.textDisplay.rowsLabel;
	canvasVars.statRowsLabelTxt.x = 20;
	canvasVars.statRowsLabelTxt.y = -5;

	// canvasVars.statRowsTxt = new Text();
	canvasVars.statRowsTxt.font = "30px azonixregular";
	canvasVars.statRowsTxt.color = '#fff';
	canvasVars.statRowsTxt.textAlign = "left";
	canvasVars.statRowsTxt.textBaseline='alphabetic';
	canvasVars.statRowsTxt.text = gameVars.textDisplay.creditLabel;
	canvasVars.statRowsTxt.x = 20;
	canvasVars.statRowsTxt.y = 33;

	canvasVars.itemRowsDragBar = new Bitmap(loaderVars.loader.getResult('itemDragBar'));
	centerReg(canvasVars.itemRowsDragBar);
	canvasVars.itemRowsDrag = new Bitmap(loaderVars.loader.getResult('itemDrag'));
	centerReg(canvasVars.itemRowsDrag);

	canvasVars.itemRowsDragBar.x = 150;
	canvasVars.itemRowsDrag.x = 100;
	canvasVars.itemRowsDrag.y = 20;
	canvasVars.itemRowsDragBar.y = 25;

	canvasVars.statsRowsContainer.addChild(canvasVars.itemStatRows, canvasVars.statRowsLabelTxt, canvasVars.statRowsTxt, canvasVars.itemRowsDragBar, canvasVars.itemRowsDrag);

	canvasVars.itemStatBalls = new Bitmap(loaderVars.loader.getResult('itemStatDisplay'));
	// canvasVars.statBallsLabelTxt = new Text();
	canvasVars.statBallsLabelTxt.font = "20px azonixregular";
	canvasVars.statBallsLabelTxt.color = '#fff';
	canvasVars.statBallsLabelTxt.textAlign = "left";
	canvasVars.statBallsLabelTxt.textBaseline='alphabetic';
	canvasVars.statBallsLabelTxt.text = gameVars.textDisplay.ballsLabel;
	canvasVars.statBallsLabelTxt.x = 20;
	canvasVars.statBallsLabelTxt.y = -5;

	// canvasVars.statBallsTxt = new Text();
	canvasVars.statBallsTxt.font = "30px azonixregular";
	canvasVars.statBallsTxt.color = '#fff';
	canvasVars.statBallsTxt.textAlign = "left";
	canvasVars.statBallsTxt.textBaseline='alphabetic';
	canvasVars.statBallsTxt.text = gameVars.textDisplay.creditLabel;
	canvasVars.statBallsTxt.x = 20;
	canvasVars.statBallsTxt.y = 33;

	canvasVars.itemBallsDragBar = new Bitmap(loaderVars.loader.getResult('itemDragBar'));
	centerReg(canvasVars.itemBallsDragBar);
	canvasVars.itemBallsDrag = new Bitmap(loaderVars.loader.getResult('itemDrag'));
	centerReg(canvasVars.itemBallsDrag);

	canvasVars.itemBallsDragBar.x = 150;
	canvasVars.itemBallsDrag.x = 100;
	canvasVars.itemBallsDrag.y = 20;
	canvasVars.itemBallsDragBar.y = 25;

	canvasVars.statsBallsContainer.addChild(canvasVars.itemStatBalls, canvasVars.statBallsLabelTxt, canvasVars.statBallsTxt, canvasVars.itemBallsDragBar, canvasVars.itemBallsDrag);

	canvasVars.buttonBlank = new Bitmap(loaderVars.loader.getResult('buttonBlank'));
	// canvasVars.buttonBlankTxt = new Text();
	canvasVars.buttonBlankTxt.font = "30px azonixregular";
	canvasVars.buttonBlankTxt.color = '#fff';
	canvasVars.buttonBlankTxt.textAlign = "center";
	canvasVars.buttonBlankTxt.textBaseline='alphabetic';
	canvasVars.buttonBlankTxt.text = gameVars.textDisplay.play;
	canvasVars.buttonBlankTxt.x = 120;
	canvasVars.buttonBlankTxt.y = 33;

	canvasVars.statsPlayContainer.addChild(canvasVars.buttonBlank, canvasVars.buttonBlankTxt);

	// canvasVars.statusTxt = new Text();
	canvasVars.statusTxt.font = "30px azonixregular";
	canvasVars.statusTxt.color = '#fff';
	canvasVars.statusTxt.textAlign = "center";
	canvasVars.statusTxt.textBaseline='alphabetic';
	canvasVars.statusTxt.text = '';
	canvasVars.statusTxt.y = -10;

	canvasVars.itemPlinko = new Bitmap(loaderVars.loader.getResult('itemPlinko'));
	centerReg(canvasVars.itemPlinko);
	canvasVars.itemPlinkoP = new Bitmap(loaderVars.loader.getResult('itemPlinkoP'));
	centerReg(canvasVars.itemPlinkoP);

	//result
	canvasVars.itemResult = new Bitmap(loaderVars.loader.getResult('itemResult'));
	canvasVars.itemResultP = new Bitmap(loaderVars.loader.getResult('itemResultP'));

	// canvasVars.resultShareTxt = new Text();
	canvasVars.resultShareTxt.font = "20px azonixregular";
	canvasVars.resultShareTxt.color = '#A00D49';
	canvasVars.resultShareTxt.textAlign = "center";
	canvasVars.resultShareTxt.textBaseline='alphabetic';
	canvasVars.resultShareTxt.text = gameVars.textDisplay.share;

	// canvasVars.resultTitleTxt = new Text();
	canvasVars.resultTitleTxt.font = "50px azonixregular";
	canvasVars.resultTitleTxt.color = '#fff';
	canvasVars.resultTitleTxt.textAlign = "center";
	canvasVars.resultTitleTxt.textBaseline='alphabetic';
	canvasVars.resultTitleTxt.text = gameVars.textDisplay.resultTitle;

	// canvasVars.resultDescTxt = new Text();
	canvasVars.resultDescTxt.font = "30px azonixregular";
	canvasVars.resultDescTxt.color = '#fff';
	canvasVars.resultDescTxt.textAlign = "center";
	canvasVars.resultDescTxt.textBaseline='alphabetic';
	canvasVars.resultDescTxt.text = gameVars.textDisplay.resultDesc;

	// canvasVars.resultScoreTxt = new Text();
	canvasVars.resultScoreTxt.font = "80px azonixregular";
	canvasVars.resultScoreTxt.color = '#fff';
	canvasVars.resultScoreTxt.textAlign = "center";
	canvasVars.resultScoreTxt.textBaseline='alphabetic';

	// canvasVars.buttonFacebook = new Bitmap(loaderVars.loader.getResult('buttonFacebook'));
	// canvasVars.buttonTwitter = new Bitmap(loaderVars.loader.getResult('buttonTwitter'));
	// canvasVars.buttonWhatsapp = new Bitmap(loaderVars.loader.getResult('buttonWhatsapp'));
	// centerReg(canvasVars.buttonFacebook);
	// createHitarea(canvasVars.buttonFacebook);
	// centerReg(canvasVars.buttonTwitter);
	// createHitarea(canvasVars.buttonTwitter);
	// centerReg(canvasVars.buttonWhatsapp);
	// createHitarea(canvasVars.buttonWhatsapp);

	canvasVars.buttonContinue = new Bitmap(loaderVars.loader.getResult('buttonContinue'));
	centerReg(canvasVars.buttonContinue);

	//option
	canvasVars.buttonFullscreen = new Bitmap(loaderVars.loader.getResult('buttonFullscreen'));
	centerReg(canvasVars.buttonFullscreen);
	canvasVars.buttonSoundOn = new Bitmap(loaderVars.loader.getResult('buttonSoundOn'));
	centerReg(canvasVars.buttonSoundOn);
	canvasVars.buttonSoundOff = new Bitmap(loaderVars.loader.getResult('buttonSoundOff'));
	centerReg(canvasVars.buttonSoundOff);
	canvasVars.buttonSoundOn.visible = false;
	canvasVars.buttonExit = new Bitmap(loaderVars.loader.getResult('buttonExit'));
	centerReg(canvasVars.buttonExit);
	canvasVars.buttonSettings = new Bitmap(loaderVars.loader.getResult('buttonSettings'));
	centerReg(canvasVars.buttonSettings);

	createHitarea(canvasVars.buttonFullscreen);
	createHitarea(canvasVars.buttonSoundOn);
	createHitarea(canvasVars.buttonSoundOff);
	createHitarea(canvasVars.buttonExit);
	createHitarea(canvasVars.buttonSettings);

	//exit
	canvasVars.itemExit = new Bitmap(loaderVars.loader.getResult('itemExit'));
	canvasVars.itemExitP = new Bitmap(loaderVars.loader.getResult('itemExitP'));

	canvasVars.buttonConfirm = new Bitmap(loaderVars.loader.getResult('buttonConfirm'));
	centerReg(canvasVars.buttonConfirm);

	canvasVars.buttonCancel = new Bitmap(loaderVars.loader.getResult('buttonCancel'));
	centerReg(canvasVars.buttonCancel);

	// canvasVars.exitTitleTxt = new Text();
	canvasVars.exitTitleTxt.font = "50px azonixregular";
	canvasVars.exitTitleTxt.color = "#fff";
	canvasVars.exitTitleTxt.textAlign = "center";
	canvasVars.exitTitleTxt.textBaseline='alphabetic';
	canvasVars.exitTitleTxt.text = gameVars.textDisplay.exitTitle;

	// canvasVars.popDescTxt = new Text();
	canvasVars.popDescTxt.font = "30px azonixregular";
	canvasVars.popDescTxt.lineHeight = 35;
	canvasVars.popDescTxt.color = "#fff";
	canvasVars.popDescTxt.textAlign = "center";
	canvasVars.popDescTxt.textBaseline='alphabetic';
	canvasVars.popDescTxt.text = gameVars.textDisplay.exitMessage;

	canvasVars.confirmContainer.addChild(
		canvasVars.itemExit,
		canvasVars.itemExitP,
		canvasVars.exitTitleTxt,
		canvasVars.popDescTxt,
		canvasVars.buttonConfirm,
		canvasVars.buttonCancel);
	canvasVars.confirmContainer.visible = false;

	if(canvasVars.guide){
		// canvasVars.guideline = new Shape();
		canvasVars.guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((mainVars.stageW-mainVars.contentW)/2, (mainVars.stageH-mainVars.contentH)/2, mainVars.contentW, mainVars.contentH);
	}

	canvasVars.mainContainer.addChild(canvasVars.logo, canvasVars.logoP, canvasVars.buttonStart);
	canvasVars.stateContainer.addChild(canvasVars.statusTxt);

	canvasVars.plinkoContainer.addChild(
		canvasVars.plinkoGuideContainer,
		canvasVars.plinkoItemContainer,
		canvasVars.stateContainer,
		canvasVars.plinkoBallsContainer,
		canvasVars.plinkoPrizesContainer,
		canvasVars.plinkoWinContainer
	);
	canvasVars.gameContainer.addChild(
		canvasVars.itemPlinko,
		canvasVars.itemPlinkoP,
		canvasVars.plinkoContainer,
		canvasVars.statsCreditContainer,
		canvasVars.statsBetChanceContainer,
		canvasVars.statsRiskContainer,
		canvasVars.statsRowsContainer,
		canvasVars.statsBallsContainer,
		canvasVars.statsPlayContainer,
		canvasVars.historyContainer
	);
	canvasVars.resultContainer.addChild(
		canvasVars.itemResult,
		canvasVars.itemResultP,
		canvasVars.resultShareTxt,
		canvasVars.resultTitleTxt,
		canvasVars.resultScoreTxt,
		canvasVars.resultDescTxt,
		canvasVars.buttonContinue
	);
	canvasVars.optionsContainer.addChild(
		canvasVars.buttonExit,
		canvasVars.buttonFullscreen,
		canvasVars.buttonSoundOn,
		canvasVars.buttonSoundOff);
	canvasVars.optionsContainer.visible = false;

	// if(gameVars.shareEnable){
	// 	canvasVars.resultContainer.addChild(
	// 		canvasVars.buttonFacebook,
	// 		canvasVars.buttonTwitter,
	// 		canvasVars.buttonWhatsapp
	// 	);
	// }

	canvasVars.canvasContainer.addChild(
		canvasVars.bg,
		canvasVars.bgP,
		canvasVars.mainContainer,
		canvasVars.gameContainer,
		canvasVars.resultContainer,
		canvasVars.confirmContainer,
		canvasVars.optionsContainer,
		canvasVars.buttonSettings,
		canvasVars.guideline);
	canvasVars.stage.addChild(canvasVars.canvasContainer);

	changeViewport(mainVars.viewport.isLandscape);
	resizeCanvas();
}

export function changeViewport(isLandscape){
	if(isLandscape){
		//landscape
		setVarsMain('stageW', mainVars.landscapeSize.w)
		setVarsMain('stageH', mainVars.landscapeSize.h)
		setVarsMain('contentW', mainVars.landscapeSize.cW)
		setVarsMain('contentH', mainVars.landscapeSize.cH)
	}else{
		//portrait
		setVarsMain('stageW', mainVars.portraitSize.w)
		setVarsMain('stageH', mainVars.portraitSize.h)
		setVarsMain('contentW', mainVars.portraitSize.cW)
		setVarsMain('contentH', mainVars.portraitSize.cH)
	}
	var gameCanvas = document.getElementById('gameCanvas');
	gameCanvas.width = mainVars.stageW;
	gameCanvas.height = mainVars.stageH;

	canvasVars.canvasW=mainVars.stageW;
	canvasVars.canvasH=mainVars.stageH;

	changeCanvasViewport();
}

function changeCanvasViewport(){
	if(canvasVars.canvasContainer!==undefined){

		if(mainVars.viewport.isLandscape){
			canvasVars.bg.visible = true;
			canvasVars.bgP.visible = false;

			canvasVars.logo.visible = true;
			canvasVars.logoP.visible = false;

			canvasVars.buttonStart.x = canvasVars.canvasW/2;
			canvasVars.buttonStart.y = canvasVars.canvasH/100 * 77;

			//game

			//result
			canvasVars.itemResult.visible = true;
			canvasVars.itemResultP.visible = false;

			canvasVars.buttonFacebook.x = canvasVars.canvasW/100*43;
			canvasVars.buttonFacebook.y = canvasVars.canvasH/100*58;
			canvasVars.buttonTwitter.x = canvasVars.canvasW/2;
			canvasVars.buttonTwitter.y = canvasVars.canvasH/100*58;
			canvasVars.buttonWhatsapp.x = canvasVars.canvasW/100*57;
			canvasVars.buttonWhatsapp.y = canvasVars.canvasH/100*58;

			canvasVars.buttonContinue.x = canvasVars.canvasW/2;
			canvasVars.buttonContinue.y = canvasVars.canvasH/100 * 75;

			canvasVars.resultShareTxt.x = canvasVars.canvasW/2;
			canvasVars.resultShareTxt.y = canvasVars.canvasH/100 * 52;

			canvasVars.resultDescTxt.x = canvasVars.canvasW/2;
			canvasVars.resultDescTxt.y = canvasVars.canvasH/100 * 38;

			canvasVars.resultScoreTxt.x = canvasVars.canvasW/2;
			canvasVars.resultScoreTxt.y = canvasVars.canvasH/100 * 47;

			canvasVars.resultTitleTxt.x = canvasVars.canvasW/2;
			canvasVars.resultTitleTxt.y = canvasVars.canvasH/100 * 29;

			//exit
			canvasVars.itemExit.visible = true;
			canvasVars.itemExitP.visible = false;

			canvasVars.buttonConfirm.x = (canvasVars.canvasW/2) + 110;
			canvasVars.buttonConfirm.y = (canvasVars.canvasH/100 * 75);

			canvasVars.buttonCancel.x = (canvasVars.canvasW/2) - 110;
			canvasVars.buttonCancel.y = (canvasVars.canvasH/100 * 75);

			canvasVars.popDescTxt.x = canvasVars.canvasW/2;
			canvasVars.popDescTxt.y = canvasVars.canvasH/100 * 47;

			canvasVars.exitTitleTxt.x = canvasVars.canvasW/2;
			canvasVars.exitTitleTxt.y = canvasVars.canvasH/100 * 29;

		}else{
			canvasVars.bg.visible = false;
			canvasVars.bgP.visible = true;

			canvasVars.logo.visible = false;
			canvasVars.logoP.visible = true;

			canvasVars.buttonStart.x = canvasVars.canvasW/2;
			canvasVars.buttonStart.y = canvasVars.canvasH/100 * 70;

			//game

			//result
			canvasVars.itemResult.visible = false;
			canvasVars.itemResultP.visible = true;

			canvasVars.buttonFacebook.x = canvasVars.canvasW/100*39;
			canvasVars.buttonFacebook.y = canvasVars.canvasH/100*57;
			canvasVars.buttonTwitter.x = canvasVars.canvasW/2;
			canvasVars.buttonTwitter.y = canvasVars.canvasH/100*57;
			canvasVars.buttonWhatsapp.x = canvasVars.canvasW/100*61;
			canvasVars.buttonWhatsapp.y = canvasVars.canvasH/100*57;

			canvasVars.buttonContinue.x = canvasVars.canvasW/2;
			canvasVars.buttonContinue.y = canvasVars.canvasH/100 * 70;

			canvasVars.resultShareTxt.x = canvasVars.canvasW/2;
			canvasVars.resultShareTxt.y = canvasVars.canvasH/100 * 52;

			canvasVars.resultDescTxt.x = canvasVars.canvasW/2;
			canvasVars.resultDescTxt.y = canvasVars.canvasH/100 * 41;

			canvasVars.resultScoreTxt.x = canvasVars.canvasW/2;
			canvasVars.resultScoreTxt.y = canvasVars.canvasH/100 * 48;

			canvasVars.resultTitleTxt.x = canvasVars.canvasW/2;
			canvasVars.resultTitleTxt.y = canvasVars.canvasH/100 * 34;

			//exit
			canvasVars.itemExit.visible = false;
			canvasVars.itemExitP.visible = true;

			canvasVars.buttonConfirm.x = (canvasVars.canvasW/2) - 110;
			canvasVars.buttonConfirm.y = (canvasVars.canvasH/100 * 68);

			canvasVars.buttonCancel.x = (canvasVars.canvasW/2) + 110;
			canvasVars.buttonCancel.y = (canvasVars.canvasH/100 * 68);

			canvasVars.popDescTxt.x = canvasVars.canvasW/2;
			canvasVars.popDescTxt.y = canvasVars.canvasH/100 * 49;

			canvasVars.exitTitleTxt.x = canvasVars.canvasW/2;
			canvasVars.exitTitleTxt.y = canvasVars.canvasH/100 * 34;
		}
	}
}


/*!
 *
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 *
 */
export function resizeCanvas(){
	if(canvasVars.canvasContainer!==undefined){
		canvasVars.buttonSettings.x = (canvasVars.canvasW - mainVars.offset.x) - 60;
		canvasVars.buttonSettings.y = mainVars.offset.y + 60;

		var distanceNum = 105;
		var nextCount = 0;
		if(gameVars.curPage !== 'game'){
			canvasVars.buttonExit.visible = false;
			canvasVars.buttonSoundOn.x = canvasVars.buttonSoundOff.x = canvasVars.buttonSettings.x;
			canvasVars.buttonSoundOn.y = canvasVars.buttonSoundOff.y =canvasVars. buttonSettings.y+distanceNum;
			canvasVars.buttonSoundOn.x = canvasVars.buttonSoundOff.x;
			canvasVars.buttonSoundOn.y = canvasVars.buttonSoundOff.y = canvasVars.buttonSettings.y+distanceNum;

			if (typeof canvasVars.buttonMusicOn != "undefined") {
				canvasVars.buttonMusicOn.x = canvasVars.buttonMusicOff.x = canvasVars.buttonSettings.x;
				canvasVars.buttonMusicOn.y = canvasVars.buttonMusicOff.y = canvasVars.buttonSettings.y+(distanceNum*2);
				canvasVars.buttonMusicOn.x = canvasVars.buttonMusicOff.x;
				canvasVars.buttonMusicOn.y = canvasVars.buttonMusicOff.y = canvasVars.buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}

			canvasVars.buttonFullscreen.x = canvasVars.buttonSettings.x;
			canvasVars.buttonFullscreen.y = canvasVars.buttonSettings.y+(distanceNum*(nextCount+1));
		}else{
			canvasVars.buttonExit.visible = true;
			canvasVars.buttonSoundOn.x = canvasVars.buttonSoundOff.x = canvasVars.buttonSettings.x;
			canvasVars.buttonSoundOn.y = canvasVars.buttonSoundOff.y = canvasVars.buttonSettings.y+distanceNum;
			canvasVars.buttonSoundOn.x = canvasVars.buttonSoundOff.x;
			canvasVars.buttonSoundOn.y = canvasVars.buttonSoundOff.y = canvasVars.buttonSettings.y+distanceNum;

			if (typeof canvasVars.buttonMusicOn != "undefined") {
				canvasVars.buttonMusicOn.x = canvasVars.buttonMusicOff.x = canvasVars.buttonSettings.x;
				canvasVars.buttonMusicOn.y = canvasVars.buttonMusicOff.y = canvasVars.buttonSettings.y+(distanceNum*2);
				canvasVars.buttonMusicOn.x = canvasVars.buttonMusicOff.x;
				canvasVars.buttonMusicOn.y = canvasVars.buttonMusicOff.y = canvasVars.buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}

			canvasVars.buttonFullscreen.x = canvasVars.buttonSettings.x;
			canvasVars.buttonFullscreen.y = canvasVars.buttonSettings.y+(distanceNum*(nextCount+1));

			canvasVars.buttonExit.x = canvasVars.buttonSettings.x;
			canvasVars.buttonExit.y = canvasVars.buttonSettings.y+(distanceNum*(nextCount+2));
		}

		resizeGameLayout();
	}
}

/*!
 *
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 *
 */
export function removeGameCanvas(){
	canvasVars.stage.autoClear = true;
	canvasVars.stage.removeAllChildren();
	canvasVars.stage.update();
	Ticker.removeEventListener("tick", tick);
	Ticker.removeEventListener("tick", canvasVars.stage);
}

/*!
 *
 * CANVAS LOOP - This is the function that runs for canvas loop
 *
 */
function tick(event) {
	updateGame();
	canvasVars.stage.update(event);
}

/*!
 *
 * CANVAS MISC FUNCTIONS
 *
 */
export function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new Shape(new Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}

////////////////////////////////////////////////////////////
// GAME v1.1
////////////////////////////////////////////////////////////


//Social share, [SCORE] will replace with game score


/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */

/*!
 *
 * GAME BUTTONS - This is the function that runs to setup button event
 *
 */
export function buildGameButton(){
	window.focus(function() {
		if(!canvasVars.buttonSoundOn.visible){
			toggleSoundInMute(false);
		}

		if (typeof canvasVars.buttonMusicOn != "undefined") {
			if(!canvasVars.buttonMusicOn.visible){
				toggleMusicInMute(false);
			}
		}
	});

	window.blur(function() {
		if(!canvasVars.buttonSoundOn.visible){
			toggleSoundInMute(true);
		}

		if (typeof canvasVars.buttonMusicOn != "undefined") {
			if(!canvasVars.buttonMusicOn.visible){
				toggleMusicInMute(true);
			}
		}
	});

	gameVars.gameData.physicsEngine = !gameVars.gameSettings.enableFixedResult;

	if(gameVars.gameSettings.enablePercentage){
		gameVars.gameData.physicsEngine = false;
	}

	canvasVars.buttonStart.cursor = "pointer";
	canvasVars.buttonStart.addEventListener("click", function() {
		playSound('soundClick');
		goPage('game');
	});

	//game
	canvasVars.buttonBetHalf.cursor = "pointer";
	canvasVars.buttonBetHalf.addEventListener("click", function() {
		if(gameVars.gameData.dropCon){
			return;
		}

		playSound('soundClick');
		toggleTotalBet(false);
	});

	canvasVars.buttonBetMultiply.cursor = "pointer";
	canvasVars.buttonBetMultiply.addEventListener("click", function() {
		if(gameVars.gameData.dropCon){
			return;
		}

		playSound('soundClick');
		toggleTotalBet(true);
	});

	canvasVars.buttonRiskL.cursor = "pointer";
	canvasVars.buttonRiskL.addEventListener("click", function() {
		if(gameVars.gameData.dropCon){
			return;
		}

		playSound('soundClick');
		toggleRiskLevel(false);
	});

	canvasVars.buttonRiskR.cursor = "pointer";
	canvasVars.buttonRiskR.addEventListener("click", function() {
		if(gameVars.gameData.dropCon){
			return;
		}

		playSound('soundClick');
		toggleRiskLevel(true);
	});

	canvasVars.itemRowsDrag.dragType = "rows";
	canvasVars.itemBallsDrag.dragType = "balls";
	buildDragOption(canvasVars.itemRowsDrag);
	buildDragOption(canvasVars.itemBallsDrag);

	canvasVars.buttonBlank.cursor = "pointer";
	canvasVars.buttonBlank.addEventListener("click", function() {
		playSound('soundClick');
		dropBalls();
	});

	//exit
	canvasVars.buttonConfirm.cursor = "pointer";
	canvasVars.buttonConfirm.addEventListener("click", function() {
		playSound('soundClick');
		toggleConfirm(false);
		stopGame(true);
		goPage('main');
	});

	canvasVars.buttonCancel.cursor = "pointer";
	canvasVars.buttonCancel.addEventListener("click", function() {
		playSound('soundClick');
		toggleConfirm(false);
	});

	canvasVars.buttonContinue.cursor = "pointer";
	canvasVars.buttonContinue.addEventListener("click", function() {
		playSound('soundClick');
		goPage('main');
	});

	//result
	// canvasVars.buttonFacebook.cursor = "pointer";
	// canvasVars.buttonFacebook.addEventListener("click", function() {
	// 	share('facebook');
	// });
	//
	// canvasVars.buttonTwitter.cursor = "pointer";
	// canvasVars.buttonTwitter.addEventListener("click", function() {
	// 	share('twitter');
	// });
	//
	// canvasVars.buttonWhatsapp.cursor = "pointer";
	// canvasVars.buttonWhatsapp.addEventListener("click", function() {
	// 	share('whatsapp');
	// });

	//options
	canvasVars.buttonSoundOff.cursor = "pointer";
	canvasVars.buttonSoundOff.addEventListener("click", function() {
		toggleSoundMute(true);
	});

	canvasVars.buttonSoundOn.cursor = "pointer";
	canvasVars.buttonSoundOn.addEventListener("click", function() {
		toggleSoundMute(false);
	});

	if (typeof canvasVars.buttonMusicOff != "undefined") {
		canvasVars.buttonMusicOff.cursor = "pointer";
		canvasVars.buttonMusicOff.addEventListener("click", function() {
			toggleMusicMute(true);
		});
	}

	if (typeof canvasVars.buttonMusicOn != "undefined") {
		canvasVars.buttonMusicOn.cursor = "pointer";
		canvasVars.buttonMusicOn.addEventListener("click", function() {
			toggleMusicMute(false);
		});
	}

	canvasVars.buttonFullscreen.cursor = "pointer";
	canvasVars.buttonFullscreen.addEventListener("click", function() {
		toggleFullScreen();
	});

	canvasVars.buttonSettings.cursor = "pointer";
	canvasVars.buttonSettings.addEventListener("click", function() {
		playSound('soundClick');
		toggleOption();
	});

	canvasVars.buttonExit.cursor = "pointer";
	canvasVars.buttonExit.addEventListener("click", function() {
		playSound('soundClick');
		toggleConfirm(true);
		toggleOption();
	});
}

export function appendFocusFrame(){
	document.getElementById('mainLoader').prepend('<div id="focus" style="position:absolute; width:100%; height:100%; z-index:1000;"></div');
	document.getElementById('focus').click(function(){
		document.getElementById('#focus').remove();
	});
}


/*!
 *
 * DISPLAY PAGES - This is the function that runs to display pages
 *
 */
export function goPage(page){
	gameVars.curPage=page;

	canvasVars.mainContainer.visible = false;
	canvasVars.gameContainer.visible = false;
	canvasVars.resultContainer.visible = false;

	var targetContainer = null;
	switch(page){
		case 'main':
			targetContainer = canvasVars.mainContainer;
		break;

		case 'game':
			targetContainer = canvasVars.gameContainer;

			startGame();
		break;

		case 'result':
			targetContainer = canvasVars.resultContainer;
			stopGame();

			playSound('soundResult');

			gameVars.tweenData.resultScore = 0;
			TweenMax.to(gameVars.tweenData, 1, {resultScore:gameVars.playerData.score, overwrite:true, onUpdate:function(){
				canvasVars.resultScoreTxt.text = gameVars.textDisplay.resultScore.replace('[NUMBER]', addCommas(Math.round(gameVars.tweenData.resultScore)));
			}});

		break;
	}

	if(targetContainer != null){
		targetContainer.visible = true;
		targetContainer.alpha = 0;
		TweenMax.to(targetContainer, .5, {alpha:1, overwrite:true});
	}

	resizeCanvas();
}

function toggleConfirm(con){
	canvasVars.confirmContainer.visible = con;

	if(con){
		TweenMax.pauseAll(true, true);
		gameVars.gameData.paused = true;
	}else{
		TweenMax.resumeAll(true, true);
		if(gameVars.curPage === 'game'){
			gameVars.gameData.paused = false;
		}
	}
}

/*!
 *
 * SETUP GAME - This is the function that runs to setup game
 *
 */
export function setupGames(){
	//sortOnObject(gameSettings.rows, "total");

	var pos = {
		x:0,
		y:gameVars.gameSettings.board.size
	};
	var totalRow = gameVars.gameSettings.rows[gameVars.gameSettings.rows.length-1].total;
	var totalColumn = gameVars.gameSettings.board.startPin;
	var pinIndex = 0;

	for(var r=0; r<totalRow; r++){
		pos.x = -((gameVars.gameSettings.board.size * (totalColumn-1))/2);

		for(var c=0; c<totalColumn; c++){
			var pinMove = new Shape();
			pinMove.graphics.beginFill(gameVars.gameSettings.board.pinMoveColor).drawCircle(0, 0, gameVars.gameSettings.board.pinSize);
			pinMove.x = pos.x;
			pinMove.y = pos.y;

			gameVars.pin[r+'_'+c] = new Shape();
			gameVars.pin[r+'_'+c].graphics.beginFill(gameVars.gameSettings.board.pinColor).drawCircle(0, 0, gameVars.gameSettings.board.pinSize);
			gameVars.pin[r+'_'+c].x = pos.x;
			gameVars.pin[r+'_'+c].y = pos.y;
			gameVars.pin[r+'_'+c].pinIndex = pinIndex;
			gameVars.pin[r+'_'+c].pinMove = pinMove;

			pos.x += gameVars.gameSettings.board.size;
			gameVars.gameData.pinObj.push(pinMove);
			canvasVars.plinkoItemContainer.addChild(pinMove, gameVars.pin[r+'_'+c]);
			createPhysicCircle(gameVars.gameSettings.board.pinSize, gameVars.pin[r+'_'+c].x, gameVars.pin[r+'_'+c].y);

			pinIndex++;
		}
		pos.y += gameVars.gameSettings.board.size;
		totalColumn++;
	}

	gameVars.gameData.totalColumn = totalColumn;
	pos = {
		x:0,
		y:gameVars.gameSettings.board.size
	};
	for(r=0; r<totalRow+1; r++){
		pos.x = -((gameVars.gameSettings.board.size * (totalColumn-1))/2);
		pos.x -= gameVars.gameSettings.board.size;

		gameVars.gameData.moveArray.push([]);
		for(c=0; c<totalColumn; c++){
			gameVars.move[r+'_'+c] = new Shape();
			gameVars.move[r+'_'+c].graphics.beginFill('red').drawCircle(0, 0, gameVars.gameSettings.board.pinSize/2);
			gameVars.move[r+'_'+c].x = pos.x + (gameVars.gameSettings.board.size/2);
			if(isEven(r)){
				gameVars.move[r+'_'+c].x += gameVars.gameSettings.board.size/2;
			}
			gameVars.move[r+'_'+c].y = pos.y - ((gameVars.gameSettings.board.pinSize/2) + (gameVars.gameSettings.board.ballSize));

			canvasVars.plinkoGuideContainer.addChild(gameVars.move[r+'_'+c]);
			gameVars.gameData.moveArray[r].push(c);

			pos.x += gameVars.gameSettings.board.size;
		}
		pos.y += gameVars.gameSettings.board.size;
	}
}

function updateBoardRows(sound){
	if(gameVars.gameData.totalRows !== gameVars.gameData.lastRows){
		if(sound){
			playSound('soundChange');
		}
		gameVars.gameData.lastRows = gameVars.gameData.totalRows;

		var totalRow = gameVars.gameSettings.rows[gameVars.gameSettings.rows.length-1].total;
		var totalColumn = gameVars.gameSettings.board.startPin;
		gameVars.gameData.boardW = 0;
		for(var r=0; r<totalRow; r++){
			for(var c=0; c<totalColumn; c++){
				if(r < gameVars.gameData.totalRows){
					gameVars.pin[r+'_'+c].pinMove.visible = true;
					setPhysicCircle(gameVars.pin[r+'_'+c].pinIndex, true);
					gameVars.pin[r+'_'+c].visible = true;

					if(c === totalColumn-1){
						canvasVars.gameData.boardW = gameVars.pin[r+'_'+c].x - gameVars.pin[r+'_'+0].x;
					}
				}else{
					gameVars.pin[r+'_'+c].pinMove.visible = false;
					setPhysicCircle(gameVars.pin[r+'_'+c].pinIndex, false);
					gameVars.pin[r+'_'+c].visible = false;
				}
			}
			totalColumn++;
		}

		//prizes
		canvasVars.plinkoPrizesContainer.removeAllChildren();
		for(var n=0; n<gameVars.gameSettings.rows.length; n++){
			if(gameVars.gameData.totalRows === gameVars.gameSettings.rows[n].total){
				gameVars.gameData.rowIndex = n;
				gameVars.gameData.prizeArray = [];
				for(var p=gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes.length-1; p>=0; p--){
					gameVars.gameData.prizeArray.push(p);
				}

				var startP = 0;
				if(!gameVars.gameSettings.rows[gameVars.gameData.rowIndex].even){
					startP = 1;
				}

				for(p=startP; p<gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes.length; p++){
					gameVars.gameData.prizeArray.push(p);
				}

				var pos = {
					x:0,
					y:gameVars.gameData.totalRows * gameVars.gameSettings.board.size
				};
				pos.x = -((gameVars.gameSettings.board.size * (gameVars.gameData.prizeArray.length))/2);
				pos.x += (gameVars.gameSettings.board.size/2);
				pos.y += (gameVars.gameSettings.board.size + gameVars.gameSettings.board.ballSize);

				for(p=0; p<gameVars.ameData.prizeArray.length; p++){
					var prizeIndex = gameVars.gameData.prizeArray[p];
					gameVars.prize[p] = createPrize(prizeIndex);

					gameVars.prize[p].x = gameVars.prize[p].oriX = pos.x;
					gameVars.prize[p].y = gameVars.prize[p].oriY = pos.y;

					pos.x += gameVars.gameSettings.board.size;
					canvasVars.plinkoPrizesContainer.addChild(gameVars.prize[p]);
				}
			}
		}

		updateRiskLevel();
		resizeGameLayout();
	}
}

function createPrize(prizeIndex){
	var pos = {
		w:gameVars.gameSettings.board.size/1.2,
		h:gameVars.gameSettings.board.size,
		radius:10
	};
	var prizeContainer = new Container();

	var prizeBg = new Shape();
	prizeBg.graphics.beginFill(gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].bgColor).drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);

	var prizeShadowBg = new Shape();
	prizeShadowBg.graphics.beginFill(gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].bgColor).drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);
	prizeShadowBg.y = 10;

	var prizeShadowDimBg = new Shape();
	prizeShadowDimBg.graphics.beginFill("#000").drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);
	prizeShadowDimBg.alpha = .3;
	prizeShadowDimBg.y = 10;

	var bgWin = new Container();
	var prizeWinBg = new Shape();
	prizeWinBg.graphics.beginFill(gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].bgWinColor).drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);

	var prizeWinShadowBg = new Shape();
	prizeWinShadowBg.graphics.beginFill(gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].bgWinColor).drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);
	prizeWinShadowBg.y = 10;

	var prizeWinShadowDimBg = new Shape();
	prizeWinShadowDimBg.graphics.beginFill("#000").drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);
	prizeWinShadowDimBg.alpha = .3;
	prizeWinShadowDimBg.y = 10;

	bgWin.addChild(prizeWinShadowBg, prizeWinShadowDimBg, prizeWinBg);
	bgWin.alpha = 0;

	var prizeTxt = new Text();
	prizeTxt.font = gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].fontSize + "px azonixregular";
	prizeTxt.color = gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].color;
	prizeTxt.textAlign = "center";
	prizeTxt.textBaseline ='alphabetic';
	prizeTxt.lineHeight = gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].lineHeight;
	prizeTxt.x = gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].x;
	prizeTxt.y = gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].y;

	prizeContainer.prizeIndex = prizeIndex;
	prizeContainer.prizeText = prizeTxt;
	prizeContainer.bgWin = bgWin;
	prizeContainer.valueArray = [];
	prizeContainer.textArray = [];

	for(var v = 0; v<gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].value.length; v++){
		prizeContainer.valueArray.push(gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].value[v]);
		prizeContainer.textArray.push(gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[prizeIndex].text[v]);
	}
	prizeContainer.addChild(prizeShadowBg, prizeShadowDimBg, prizeBg, bgWin, prizeTxt);

	return prizeContainer;
}

export function animatePin(index){
	var targetPin = gameVars.gameData.pinObj[index];
	var tweenSpeed = .3;
	TweenMax.to(targetPin, tweenSpeed, {scaleX:2, scaleY:2, alpha:.5, overwrite:true, onComplete:function(){
		TweenMax.to(targetPin, tweenSpeed, {scaleX:1, scaleY:1, alpha:0, overwrite:true});
	}});
}

/*!
 *
 * START GAME - This is the function that runs to start play game
 *
 */

function startGame(){
	gameVars.gameData.paused = false;

	canvasVars.plinkoGuideContainer.visible = false;
	canvasVars.historyContainer.removeAllChildren();

	gameVars.gameData.totalBet = gameVars.gameSettings.minBet;
	gameVars.gameData.totalRows = gameVars.gameSettings.rows[0].total;
	gameVars.gameData.riskLevel = 0;
	gameVars.gameData.totalBalls = gameVars.gameData.lastTotalBalls = 1;
	gameVars.gameData.winAmount = 0;
	gameVars.gameData.historyArray = [];
	gameVars.gameData.historyObj = [];

	//memberpayment
	gameVars.playerData.chance = gameVars.gameData.startChance = gameVars.gameSettings.chances;
	gameVars.playerData.score = gameVars.playerData.point = 0;

	if(gameVars.gameSettings.gamePlayType){
		canvasVars.statBetChanceLabelTxt.text = gameVars.textDisplay.chanceLabel;
		canvasVars.buttonBetHalf.visible = canvasVars.buttonBetMultiply.visible = false;
	}else{
		gameVars.playerData.score = gameVars.playerData.point = gameVars.gameSettings.credit;
	}

	updateBoardRows(false);
	updateRiskLevel();
	updateStats();
	displayGameStatusAmount();
	playSound("soundStart");

	canvasVars.stateContainer.tween = {startSpeed:.3, endSpeed:.3, startDelay:0, endDelay:0, startAlpha:.3, endAlpha:1, loop:true};
	startAnimate(canvasVars.stateContainer);
	canvasVars.buttonBlankTxt.text = gameVars.textDisplay.buttonPlay;
}

 /*!
 *
 * STOP GAME - This is the function that runs to stop play game
 *
 */
function stopGame(){
	gameVars.gameData.paused = true;
	pausedPhysics(0, true);

	TweenMax.killAll();
}

/*!
 *
 * SAVE GAME - This is the function that runs to save game
 *
 */
// function saveGame(score){
// 	if ( typeof toggleScoreboardSave == 'function' ) {
// 		$.scoreData.score = score;
// 		if(typeof type != 'undefined'){
// 			$.scoreData.type = type;
// 		}
// 		toggleScoreboardSave(true);
// 	}
//
// 	/*$.ajax({
//       type: "POST",
//       url: 'saveResults.php',
//       data: {score:score},
//       success: function (result) {
//           console.log(result);
//       }
//     });*/
// }

/*!
 *
 * RESIZE GAME LAYOUT - This is the function that runs for resize game layout
 *
 */
export function resizeGameLayout(){
	var spaceX = 250;
	var spaceY = 90;
	var spaceButtonY = 75;
	var pos = {
		x:0,
		y:0,
		scaleX:1,
		scaleY:1,
		w:gameVars.gameData.boardW,
		h:gameVars.gameSettings.board.size * (gameVars.gameData.totalRows+1),
		maxW:1000,
		maxH:510,
		scalePercentX:1,
		scalePercentY:1};

	if(!mainVars.viewport.isLandscape){
		pos.maxW = 570;
		pos.maxH = 440;
	}

	if(pos.h > pos.maxH){
		pos.scalePercentY = pos.maxH/pos.h;
	}

	if(pos.w > pos.maxW){
		pos.scalePercentX = pos.maxW/pos.w;
	}

	if(pos.scalePercentX > pos.scalePercentY){
		pos.scaleX = pos.scalePercentY;
		pos.scaleY = pos.scalePercentY;
	}else{
		pos.scaleX = pos.scalePercentX;
		pos.scaleY = pos.scalePercentX;
	}

	canvasVars.itemPlinko.visible = canvasVars.itemPlinkoP.visible = false;

	if(mainVars.viewport.isLandscape){
		canvasVars.statsCreditContainer.x = canvasVars.canvasW/100 * 11;
		canvasVars.statsCreditContainer.y = canvasVars.canvasH/100 * 20;

		canvasVars.statsBetChanceContainer.x = canvasVars.statsCreditContainer.x;
		canvasVars.statsBetChanceContainer.y = canvasVars.statsCreditContainer.y + spaceY;

		canvasVars.statsRiskContainer.x = canvasVars.statsCreditContainer.x;
		canvasVars.statsRiskContainer.y = canvasVars.statsCreditContainer.y + (spaceY*2);

		canvasVars.statsRowsContainer.x = canvasVars.statsCreditContainer.x;
		canvasVars.statsRowsContainer.y = canvasVars.statsCreditContainer.y + (spaceY*3);

		canvasVars.statsBallsContainer.x = canvasVars.statsCreditContainer.x;
		canvasVars.statsBallsContainer.y = canvasVars.statsCreditContainer.y + (spaceY*4);

		canvasVars.statsPlayContainer.x = canvasVars.statsCreditContainer.x;
		canvasVars.statsPlayContainer.y = canvasVars.statsCreditContainer.y + ((spaceY*4) + spaceButtonY);

		pos.x = canvasVars.canvasW/100 * 57;
		pos.y = canvasVars.canvasH/2 - ((pos.h * pos.scaleX) /2);

		canvasVars.itemPlinko.x = canvasVars.canvasW/100 * 57;
		canvasVars.itemPlinko.y = canvasVars.canvasH/2;
		canvasVars.itemPlinko.visible = true;

		canvasVars.historyContainer.x = canvasVars.canvasW/100 * 86;
		canvasVars.historyContainer.y = canvasVars.canvasH/2;
	}else{
		canvasVars.statsBetChanceContainer.x = canvasVars.canvasW/100 * 18;
		canvasVars.statsBetChanceContainer.y = canvasVars.canvasH/100 * 68;canvasVars.

		canvasVars.statsRiskContainer.x = canvasVars.statsBetChanceContainer.x + spaceX;
		canvasVars.statsRiskContainer.y = canvasVars.statsBetChanceContainer.y;

		canvasVars.statsRowsContainer.x = canvasVars.statsBetChanceContainer.x;
		canvasVars.statsRowsContainer.y = canvasVars.statsBetChanceContainer.y + (spaceY);

		canvasVars.statsBallsContainer.x = canvasVars.statsRowsContainer.x + spaceX;
		canvasVars.statsBallsContainer.y = canvasVars.statsBetChanceContainer.y + (spaceY);

		canvasVars.statsCreditContainer.x = canvasVars.statsBetChanceContainer.x;
		canvasVars.statsCreditContainer.y = canvasVars.statsBetChanceContainer.y + (spaceY * 2);

		canvasVars.statsPlayContainer.x = canvasVars.statsCreditContainer.x + spaceX;
		canvasVars.statsPlayContainer.y = canvasVars.statsBetChanceContainer.y + (spaceY * 2);

		pos.x = canvasVars.canvasW/2;
		pos.y = (canvasVars.canvasH/100 * 39) - ((pos.h * pos.scaleX) /2);

		canvasVars.itemPlinkoP.x = canvasVars.canvasW/2;
		canvasVars.itemPlinkoP.y = canvasVars.canvasH/100 * 39;
		canvasVars.itemPlinkoP.visible = true;

		canvasVars.historyContainer.x = canvasVars.canvasW/2;
		canvasVars.historyContainer.y = canvasVars.canvasH/100 * 10;
	}

	TweenMax.to(canvasVars.plinkoContainer, .2, {x:pos.x, y:pos.y, scaleX:pos.scaleX, scaleY:pos.scaleY, overwrite:true});
	positionWinHistory();
}

/*!
 *
 * ANIMATION - This is the function that runs to animate
 *
 */
function startAnimate(obj){
	TweenMax.to(obj, obj.tween.startSpeed, {delay:obj.tween.startDelay, alpha:obj.tween.startAlpha, overwrite:true, onComplete:function(){
		TweenMax.to(obj, obj.tween.endSpeed, {delay:obj.tween.endDelay, alpha:obj.tween.endAlpha, overwrite:true, onComplete:function(){
			if(obj.tween.loop){
				startAnimate(obj)
			}
		}});
	}});
}

/*!
 *
 * TOGGLE GAME STATUS - This is the function that runs to toggle game status
 *
 */
function toggleGameStatus(stat, timer){
	TweenMax.killTweensOf(canvasVars.statusTxt);

	if(stat !== undefined){
		canvasVars.statusTxt.text = stat;

		if(!isNaN(timer)){
			TweenMax.to(canvasVars.statusTxt, timer, {doverwrite:true, onComplete:function(){
				displayGameStatusAmount();
			}});
		}
	}
}

function displayGameStatusAmount(){
	if(!gameVars.gameData.dropCon){
		if(gameVars.gameSettings.gamePlayType){
			var displayCalculate = gameVars.textDisplay.playChance.replace('[NUMBER]', addCommas(Math.floor(gameVars.gameData.totalBalls)));
			displayCalculate = displayCalculate.replace('[TOTAL]', addCommas(Math.floor(gameVars.gameData.totalBalls * gameVars.gameSettings.chancesPoint)));
			canvasVars.statusTxt.text = displayCalculate
		}else{
			canvasVars.statusTxt.text = gameVars.textDisplay.playBet.replace('[NUMBER]', addCommas(Math.floor(gameVars.gameData.totalBet * gameVars.gameData.totalBalls)));
		}
	}else{
		if(gameVars.gameData.totalBallsCount+1 === canvasVars.gameData.totalBalls){
			canvasVars.statusTxt.text = gameVars.textDisplay.playing;
		}else{
			canvasVars.statusTxt.text = gameVars.textDisplay.playingMultiple.replace('[NUMBER]', addCommas(Math.floor(gameVars.gameData.totalBalls - (gameVars.gameData.totalBallsCount+1))));
		}
	}
}

/*!
 *
 * BET AMOUNT - This is the function that runs to toggle bet amount
 *
 */
function toggleTotalBet(con){
	if(!con){
		gameVars.gameData.totalBet = gameVars.gameData.totalBet/2;
		gameVars.gameData.totalBet = gameVars.gameData.totalBet < gameVars.gameSettings.minBet ? gameVars.gameSettings.minBet : gameVars.gameData.totalBet;
	}else{
		gameVars.gameData.totalBet = gameVars.gameData.totalBet * 2;
		gameVars.gameData.totalBet = gameVars.gameData.totalBet > gameVars.gameSettings.maxBet ? gameVars.gameSettings.maxBet : gameVars.gameData.totalBet;
	}

	updateStats();
	displayGameStatusAmount();
}

/*!
 *
 * RISK LEVEL - This is the function that runs to toggle risk level
 *
 */
function toggleRiskLevel(con){
	if(!con){
		gameVars.gameData.riskLevel--;
		gameVars.gameData.riskLevel = gameVars.gameData.riskLevel < 0 ? 0 : gameVars.gameData.riskLevel;
	}else{
		gameVars.gameData.riskLevel++;
		gameVars.gameData.riskLevel = gameVars.gameData.riskLevel > 2 ? 2 : gameVars.gameData.riskLevel;
	}

	updateRiskLevel();
}

function updateRiskLevel(){
	canvasVars.statRiskTxt.text = gameVars.textDisplay.risk[gameVars.gameData.riskLevel];

	for(var p=0; p<gameVars.gameData.prizeArray.length; p++){
		gameVars.prize[p].prizeText.text = gameVars.prize[p].textArray[gameVars.gameData.riskLevel];
	}
}

/*!
 *
 * DRAG EVENTS - This is the function that runs to build drag events
 *
 */
function buildDragOption(drag){
	drag.dragCon = false;
	if(drag.dragType === "rows"){
		drag.x = drag.startX = canvasVars.itemRowsDragBar.x - (canvasVars.itemRowsDragBar.image.naturalWidth/2);
		drag.endX = canvasVars.itemRowsDragBar.x + (canvasVars.itemRowsDragBar.image.naturalWidth/2);
	}else{
		drag.x = drag.startX = canvasVars.itemBallsDragBar.x - (canvasVars.itemBallsDragBar.image.naturalWidth/2);
		drag.endX = canvasVars.itemBallsDragBar.x + (canvasVars.itemBallsDragBar.image.naturalWidth/2);
	}

	drag.cursor = "pointer";
	drag.addEventListener("mousedown", function(evt) {
		toggleDragEvent(evt, 'drag')
	});
	drag.addEventListener("pressmove", function(evt) {
		toggleDragEvent(evt, 'move')
	});
	drag.addEventListener("pressup", function(evt) {
		toggleDragEvent(evt, 'drop')
	});
}

function toggleDragEvent(obj, con){
	if(gameVars.gameData.dropCon){
		return;
	}

	var targetContainer;
	if(obj.target.dragType === "rows"){
		targetContainer = canvasVars.statsRowsContainer;
	}else{
		targetContainer = canvasVars.statsBallsContainer;
	}

	switch(con){
		case 'drag':
			var global = targetContainer.localToGlobal(obj.target.x, obj.target.y);
			obj.target.offset = {x:global.x-(obj.stageX), y:global.y-(obj.stageY)};
			obj.target.dragCon = true;
		break;

		case 'move':
			if(obj.target.dragCon){
				var local = targetContainer.globalToLocal(obj.stageX, obj.stageY);
				obj.target.x = ((local.x) + obj.target.offset.x);
				obj.target.x = obj.target.x < obj.target.startX ? obj.target.startX : obj.target.x;
				obj.target.x = obj.target.x > obj.target.endX ? obj.target.endX : obj.target.x;

				var dragPos = obj.target.x - obj.target.startX;
				var dragW = obj.target.endX - obj.target.startX;

				if(obj.target.dragType === "rows"){
					var rowIndex = Math.floor(dragPos/dragW * (gameVars.gameSettings.rows.length-1));
					gameVars.gameData.totalRows = gameVars.gameSettings.rows[rowIndex].total;
					updateBoardRows(true);
				}else{
					gameVars.gameData.totalBalls = Math.floor(dragPos/dragW * gameVars.gameSettings.maxBalls);
					gameVars.gameData.totalBalls = gameVars.gameData.totalBalls < 1 ? 1 : gameVars.gameData.totalBalls;
					if(gameVars.gameData.totalBalls !== gameVars.gameData.lastTotalBalls){
						gameVars.gameData.lastTotalBalls = gameVars.gameData.totalBalls;
						playSound("soundBall");
					}
				}
				updateStats();
				displayGameStatusAmount();
			}
		break;

		case 'drop':
			obj.target.dragCon = false;
		break;
	}
}

/*!
 *
 * DROP BALL - This is the function that runs to drop ball
 *
 */
function dropBalls(){

	if(gameVars.gameData.dropCon){
		return;
	}

	if(gameVars.gameSettings.gamePlayType){
		if(gameVars.playerData.chance < gameVars.gameData.totalBalls){
			toggleGameStatus(gameVars.textDisplay.chanceInsufficient, 2);
			return;
		}

		gameVars.playerData.chance -= gameVars.gameData.totalBalls;
		gameVars.playerData.chance = gameVars.playerData.chance < 0 ? 0 : gameVars.playerData.chance;
	}else{
		if(gameVars.playerData.point < Math.floor(gameVars.gameData.totalBet * gameVars.gameData.totalBalls)){
			toggleGameStatus(gameVars.textDisplay.betInsufficient, 2);
			return;
		}

		gameVars.playerData.score -= gameVars.gameData.totalBet * gameVars.gameData.totalBalls;
		gameVars.playerData.point = gameVars.playerData.score;
	}

	canvasVars.plinkoWinContainer.removeAllChildren();
	resetPhysicBall();
	gameVars.gameData.ballArray = [];
	gameVars.gameData.winPoint = 0;
	updateStats();
	if(gameVars.gameSettings.enablePercentage){
		createPercentage();
	}
	proceedDropBalls();
}

function proceedDropBalls(result){
	gameVars.gameData.path = [];
	if(result !== undefined){
		gameVars.gameData.path = result.path;
	}

	toggleGameStatus(gameVars.textDisplay.playing);
	canvasVars.buttonBlankTxt.text = gameVars.textDisplay.buttonPlaying;
	gameVars.gameData.dropCon = true;
	gameVars.gameData.totalBallsCount = 0;

	if(gameVars.gameData.physicsEngine){
		pausedPhysics(0, false);
	}

	loopDropBalls();
}

function loopDropBalls(){
	var tweenDelay = gameVars.gameData.totalBallsCount === 0 ? 0 : gameVars.gameSettings.nextBallDelay;
	TweenMax.to(gameVars.gameData, tweenDelay, {overwrite:true, onComplete:function(){
		displayGameStatusAmount()
		createBall();
		gameVars.gameData.totalBallsCount++;

		if(gameVars.gameData.totalBallsCount < gameVars.gameData.totalBalls){
			loopDropBalls();
		}
	}});
}

/*!
 *
 * CREATE BALL - This is the function that runs to create ball
 *
 */
function createBall(){
	var newBall = new Bitmap(loaderVars.loader.getResult('itemBall'));
	centerReg(newBall);
	newBall.active = true;
	newBall.ballIndex = gameVars.gameData.ballArray.length;
	newBall.idleMove = 0;
	newBall.idleTimeCount = 0;
	newBall.ballX = 0;
	newBall.ballY = 0;

	gameVars.gameData.ballArray.push(newBall);
	canvasVars.plinkoBallsContainer.addChild(newBall);

	var totalPin = gameVars.gameSettings.board.startPin-1;
	if(!gameVars.gameSettings.enableFixedResult){
		totalPin = totalPin < 1 ? 1 : totalPin;

		var rangeX = gameVars.gameSettings.board.size * totalPin;
		newBall.x = randomIntFromInterval(-(rangeX/2),(rangeX/2));
		createPhysicBall(gameVars.gameSettings.board.ballSize, newBall.x, newBall.y);
	}else{
		generateMovePath(newBall);
	}
}

function removeBall(index){
	var targetBall = gameVars.gameData.ballArray[index];
	targetBall.active = false;
	canvasVars.plinkoBallsContainer.removeChild(targetBall);

	if(!gameVars.gameSettings.enableFixedResult){
		removePhysicBall(index);
	}
}

/*!
 *
 * GENERATE PATH - This is the function that runs to generate path
 *
 */
function generateMovePath(targetBall){
	targetBall.finalMoveArray = [];

	var startPos = {x:targetBall.x, y:targetBall.y};
	targetBall.moveColumn = -1;
	targetBall.fixedResult = -1;
	targetBall.path = [];

	if(gameVars.gameData.path.length > 0 && targetBall.ballIndex < gameVars.gameData.path.length){
		targetBall.path = gameVars.gameData.path[targetBall.ballIndex];
		startPos.x = gameVars.move[0+'_'+targetBall.path[0].c].x;
	}else{
		var center_column = Math.floor((gameVars.gameData.totalColumn - gameVars.gameSettings.board.startPin)/2);
		var random_pos = [];
		var start_column = center_column;
		for (var n = 0; n < gameVars.gameSettings.board.startPin; n++) {
			random_pos.push(start_column);
			start_column++;
		}

		var prizeFixedResult = -1;
		if(targetBall.ballIndex < gameVars.gameData.fixedResult.length){
			prizeFixedResult = gameVars.gameData.fixedResult[targetBall.ballIndex];
		}

		if(prizeFixedResult === -1){
			if(gameVars.gameSettings.enablePercentage){
				prizeFixedResult = getResultOnPercent();
			}
		}

		if(prizeFixedResult !== -1){
			targetBall.fixedResult = (gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes.length-1) - prizeFixedResult;

			if(randomBoolean()){
				if(!gameVars.gameSettings.rows[gameVars.gameData.rowIndex].even){
					targetBall.fixedResult = (gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes.length-1) + prizeFixedResult;
				}else{
					targetBall.fixedResult = (gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes.length) + prizeFixedResult;
				}
			}

			var dropDistance = -1;
			// var drop_column;
			for (n = 0; n < random_pos.length; n++) {
				var checkDistance = Math.abs(random_pos[n] - targetBall.fixedResult);
				if(dropDistance === -1){
					dropDistance = checkDistance;
					// drop_column = random_pos[n];
				}

				if(dropDistance > checkDistance){
					dropDistance = checkDistance;
					// drop_column = random_pos[n];
				}
			}
		}else{
			shuffle(random_pos);
			startPos.x = gameVars.move[0+'_'+random_pos[0]].x;
			targetBall.moveColumn = random_pos[0];
		}
	}

	var targetMoveArray = gameVars.gameData.moveArray;
	for(n=0; n<targetMoveArray.length; n++){
		if(n < gameVars.gameData.totalRows+1){
			findMovePath(targetBall, n);
		}
	}

	targetBall.x = startPos.x;
	targetBall.y = startPos.y;
	targetBall.moveIndex = 0;
	startBallMove(targetBall);
}

function findMovePath(targetBall, row){
	var possibleMove = [];

	var targetMoveArray = gameVars.gameData.moveArray;
	var plinkoSize = gameVars.gameSettings.board.size;
	var ballSize = gameVars.gameSettings.board.ballSize;
	var thisMove = gameVars.move;

	for(var p=0; p<targetMoveArray[row].length; p++){
		var getDistance = getDistanceByValue(targetBall.x, targetBall.y, thisMove[row+'_'+p].x, thisMove[row+'_'+p].y);
		possibleMove.push({distance:getDistance, column:p});
	}

	sortOnObject(possibleMove, 'distance', false);

	var selectedColumn = possibleMove[0].column;
	if(targetBall.fixedResult !== -1 && targetBall.moveColumn === -1){
		var lastRow = gameVars.gameData.totalRows;
		var centerRow = Math.floor(targetMoveArray[lastRow].length/2);
		var centerPrize = Math.floor(gameVars.gameData.prizeArray.length/2);
		var targetColumn = 0;
		if(!gameVars.gameSettings.rows[gameVars.gameData.rowIndex].even){
			targetColumn = centerRow - (centerPrize - targetBall.fixedResult);
			targetColumn--;
		}else{
			targetColumn = centerRow - (centerPrize - targetBall.fixedResult);
			if(targetBall.fixedResult < centerPrize){
				targetColumn--;
			}
		}
		targetColumn++;
		targetBall.moveColumn = Math.abs(selectedColumn - targetColumn);
	}else if(row === 0){
		selectedColumn = targetBall.moveColumn;
	}

	var randomDirection = false;
	if(targetBall.fixedResult !== -1){
		var moveNum = gameVars.gameData.totalRows - row;
		var safeDistance = (targetBall.moveColumn * 2) + 1;
		if(safeDistance >= moveNum){
			randomDirection = true;
		}
	}

	if(possibleMove[0].distance === possibleMove[1].distance){
		if(targetBall.fixedResult !== -1 && randomDirection){
			var targetPrize = gameVars.prize[targetBall.fixedResult];

			var optionA = thisMove[row+'_'+possibleMove[0].column];
			var optionB = thisMove[row+'_'+possibleMove[1].column];

			var distanceA = getDistanceByValue(optionA.x, optionA.y, targetPrize.x, targetPrize.y);
			var distanceB = getDistanceByValue(optionB.x, optionB.y, targetPrize.x, targetPrize.y);

			if(distanceB > distanceA){
				selectedColumn = possibleMove[0].column;
			}else{
				selectedColumn = possibleMove[1].column;
			}
		}else{
			if(randomBoolean()){
				selectedColumn = possibleMove[1].column;
			}
		}
	}

	if(targetBall.fixedResult !== -1){
		lastRow = gameVars.gameData.totalRows;
		centerRow = Math.floor(targetMoveArray[lastRow].length/2);
		centerPrize = Math.floor(gameVars.gameData.prizeArray.length/2);
		targetColumn = 0;
		if(!gameVars.gameSettings.rows[gameVars.gameData.rowIndex].even){
			targetColumn = centerRow - (centerPrize - targetBall.fixedResult);
			targetColumn--;
		}else{
			targetColumn = centerRow - (centerPrize - targetBall.fixedResult);
			if(targetBall.fixedResult < centerPrize){
				targetColumn--;
			}
		}
		targetColumn++;
		targetBall.moveColumn = Math.abs(selectedColumn - targetColumn);
	}

	if(targetBall.path.length > 0){
		selectedColumn = targetBall.path[row].c;
		if(!isEven(row)){
			selectedColumn++;
		}
	}

	thisMove[row+'_'+selectedColumn].alpha = .2;
	targetBall.x = thisMove[row+'_'+selectedColumn].x;
	targetBall.y = thisMove[row+'_'+selectedColumn].y;
	targetBall.finalMoveArray.push({x:thisMove[row+'_'+selectedColumn].x, y:thisMove[row+'_'+selectedColumn].y});

	if(row === gameVars.gameData.totalRows){
		var bottomH = 0;
		var bottomY = plinkoSize + (plinkoSize/2);
		targetBall.finalMoveArray.push({x:thisMove[row+'_'+selectedColumn].x, y:thisMove[row+'_'+selectedColumn].y + (bottomY - (bottomH + ballSize))});
	}
}

/*!
 *
 * MOVE BALL - This is the function that runs to move ball
 *
 */
function startBallMove(targetBall){
	if(targetBall.moveIndex === targetBall.finalMoveArray.length-1 || targetBall.moveIndex === 0){
		setTimeout(function(){ playHitSound(); }, 250);
		TweenMax.to(targetBall, .5, {x:targetBall.finalMoveArray[targetBall.moveIndex].x, y:targetBall.finalMoveArray[targetBall.moveIndex].y, ease:Bounce.easeOut, overwrite:true, onComplete:ballMoveComplete, onCompleteParams:[targetBall]});
	}else{
		var path_arr = [
			{x:targetBall.x, y:targetBall.y},
			{x:targetBall.finalMoveArray[targetBall.moveIndex].x, y:targetBall.finalMoveArray[targetBall.moveIndex].y - (gameVars.gameSettings.board.size * 1.3)},
			{x:targetBall.finalMoveArray[targetBall.moveIndex].x, y:targetBall.finalMoveArray[targetBall.moveIndex].y - (gameVars.gameSettings.board.size * .2)},
			{x:targetBall.finalMoveArray[targetBall.moveIndex].x, y:targetBall.finalMoveArray[targetBall.moveIndex].y},
		];

		var randomSpeed = randomIntFromInterval(3,5)*.1;
		TweenMax.to(targetBall, randomSpeed, {bezier:{type:"cubic", values:path_arr}, ease:Circ.easeIn, overwrite:true, onComplete:ballMoveComplete, onCompleteParams:[targetBall]});
	}
}

function ballMoveComplete(targetBall){
	targetBall.moveIndex++;
	if(targetBall.moveIndex < targetBall.finalMoveArray.length){
		var nearestPin = [];
		for(var n=0; n<gameVars.gameData.pinObj.length; n++){
			var targetPin = gameVars.gameData.pinObj[n];
			var getDistance = getDistanceByValue(targetBall.x, targetBall.y, targetPin.x, targetPin.y);
			nearestPin.push({distance:getDistance, index:n});
		}

		sortOnObject(nearestPin, 'distance', false);
		animatePin(nearestPin[0].index);

		playHitSound();
		startBallMove(targetBall);
	}
}

export function playHitSound(){
	playSound('soundHit');
}

/*!
 *
 * PERCENTAGE - This is the function that runs to create result percentage
 *
 */
function createPercentage(){
	gameVars.gameData.percentageArray = [];

	//default
	for(var n=0; n<gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes.length; n++){
		if(!isNaN(gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[n].percent)){
			if(gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[n].percent > 0){
				for(var p=0; p<gameVars.gameSettings.rows[gameVars.gameData.rowIndex].prizes[n].percent; p++){
					gameVars.gameData.percentageArray.push(n);
				}
			}
		}
	}
}

function getResultOnPercent(){
	shuffle(gameVars.gameData.percentageArray);
	return gameVars.gameData.percentageArray[0];
}

/*!
 *
 * GET RESULT - This is the function that runs to get result
 *
 */
// function getResult(array){
// 	gameVars.gameData.fixedResult = array;
// }

/*!
 *
 * UPDATE STAT - This is the function that runs to update game stat
 *
 */
function updateStats(){
	canvasVars.statCreditTxt.text = gameVars.textDisplay.credit.replace('[NUMBER]', addCommas(Math.floor(gameVars.playerData.point)));

	if(gameVars.gameSettings.gamePlayType){
		canvasVars.statBetChanceTxt.text = gameVars.textDisplay.chance.replace('[NUMBER]', addCommas(Math.floor(gameVars.playerData.chance)));
	}else{
		canvasVars.statBetChanceTxt.text = gameVars.textDisplay.bet.replace('[NUMBER]', addCommas(Math.floor(gameVars.gameData.totalBet)));
	}

	canvasVars.statRowsTxt.text = gameVars.gameVars.gameData.totalRows;
	canvasVars.statBallsTxt.text = gameVars.gameVars.gameData.totalBalls;
}

function updateWinHistory(){
	if(gameVars.gameData.historyArray.length > gameVars.gameSettings.history){
		removeHistory(gameVars.gameData.historyObj[0]);
		gameVars.gameData.historyObj.splice(0,1);
		gameVars.gameData.historyArray.splice(0,1);
	}

	var prizeIndex = gameVars.gameData.historyArray[gameVars.gameData.historyArray.length-1];
	var newHistory = createPrize(prizeIndex);
	newHistory.prizeText.text = newHistory.textArray[gameVars.gameData.riskLevel];
	newHistory.alpha = 0;

	gameVars.gameData.historyObj.push(newHistory);
	canvasVars.historyContainer.addChild(newHistory);
	positionWinHistory();
	animateHistory(newHistory);
}

function removeHistory(obj){
	TweenMax.to(obj, .2, {onComplete:function(){
		canvasVars.historyContainer.removeChild(obj);
	}});
}

function positionWinHistory(){
	var pos = {x:0, y:0, w:0, h:0, spaceX:3, spaceY:13};
	if(mainVars.viewport.isLandscape){
		pos.h = (gameVars.gameData.historyObj.length-1) * gameVars.gameSettings.board.size;
		pos.h += (gameVars.gameData.historyObj.length-1) * pos.spaceY;
		pos.y = -(pos.h/2);
	}else{
		pos.w = (gameVars.gameData.historyObj.length-1) * gameVars.gameSettings.board.size;
		pos.w += (gameVars.gameData.historyObj.length-1) * pos.spaceX;
		pos.x = -(pos.w/2);
	}
	for(var p=0; p<gameVars.gameData.historyObj.length; p++){
		var targetPrize = gameVars.gameData.historyObj[p];

		if(targetPrize.alpha === 0){
			targetPrize.x = pos.x;
			targetPrize.y = pos.y;
		}else{
			TweenMax.to(targetPrize, .2, {x:pos.x, y:pos.y});
		}

		if(mainVars.viewport.isLandscape){
			pos.y += gameVars.gameSettings.board.size + pos.spaceY;
		}else{
			pos.x += gameVars.gameSettings.board.size + pos.spaceX;
		}
	}
}

function animateHistory(obj){
	var tweenSpeed = .2;
	TweenMax.to(obj, tweenSpeed, {scaleX:1.2, scaleY:1.2, alpha:1, ease:Sine.easeIn, onComplete:function(){
		TweenMax.to(obj, tweenSpeed, {scaleX:1, scaleY:1, ease:Sine.easeOut,  onComplete:function(){

		}});
	}});
}

/*!
 *
 * LOOP UPDATE GAME - This is the function that runs to update game loop
 *
 */
export function updateGame(){
	updatePhysics();

	if(!gameVars.gameData.paused){
		checkDropPrize();
	}
}

/*!
 *
 * CHECK DROP PRIZES - This is the function that runs to check prize
 *
 */
function checkDropPrize(){
	for(var b=0; b<gameVars.gameData.ballArray.length; b++){
		var targetBall = gameVars.gameData.ballArray[b];
		if(targetBall.y > gameVars.prize[0].y && targetBall.active){
			var distanceArray = [];
			for(var p=0; p<gameVars.gameData.prizeArray.length; p++){
				var thisPrize = gameVars.prize[p];
				var checkDistance = getDistance(thisPrize, targetBall);
				distanceArray.push({index:p, distance:checkDistance})
			}

			sortOnObject(distanceArray, "distance");
			removeBall(b);
			if(distanceArray[0].distance < gameVars.gameSettings.board.size){
				var collectPoint = 0;
				var isWinPoint = false;
				if(gameVars.gameSettings.gamePlayType){
					collectPoint = gameVars.gameSettings.chancesPoint * gameVars.prize[distanceArray[0].index].valueArray[gameVars.gameData.riskLevel];
					if(collectPoint > gameVars.gameSettings.chancesPoint){
						gameVars.gameData.winPoint += collectPoint - gameVars.gameSettings.chancesPoint;
						isWinPoint = true;
					}
				}else{
					collectPoint = gameVars.gameData.totalBet * gameVars.prize[distanceArray[0].index].valueArray[gameVars.gameData.riskLevel];
					if(collectPoint > gameVars.gameData.totalBet){
						gameVars.gameData.winPoint += collectPoint - gameVars.gameData.totalBet;
						isWinPoint = true;
					}
				}

				gameVars.gameData.historyArray.push(gameVars.prize[distanceArray[0].index].prizeIndex);
				updateWinHistory();
				animatePrize(gameVars.prize[distanceArray[0].index]);
				createWinText(gameVars.prize[distanceArray[0].index], collectPoint, isWinPoint);
			}
		}
	}

	if(gameVars.gameData.dropCon){
		var totalFinishBalls = 0;
		for(b=0; b<gameVars.gameData.ballArray.length; b++){
			targetBall = gameVars.gameData.ballArray[b];
			if(!targetBall.active){
				totalFinishBalls++;
			}
		}

		if(totalFinishBalls === gameVars.gameData.ballArray.length){
			gameVars.gameData.dropCon = false;
			checkWinPoint();
		}
	}
}

function animatePrize(obj){
	var tweenSpeed = .2;
	TweenMax.to(obj, tweenSpeed, {y:obj.oriY + gameVars.gameSettings.board.size/3, ease:Sine.easeIn, overwrite:true, onComplete:function(){
		TweenMax.to(obj, tweenSpeed, {y:obj.oriY, ease:Sine.easeOut, overwrite:true, onComplete:function(){

		}});
	}});

	tweenSpeed = .2;
	TweenMax.to(obj.bgWin, tweenSpeed, {alpha:1, ease:Sine.easeIn, overwrite:true, onComplete:function(){
		TweenMax.to(obj.bgWin, tweenSpeed, {delay:tweenSpeed, alpha:0, ease:Sine.easeOut, overwrite:true, onComplete:function(){

		}});
	}});
}

function createWinText(obj, value, isWinPoint){
	var newText = new Text();
	newText.font = gameVars.gameSettings.board.notiFontSize + "px azonixregular";
	if(isWinPoint){
		newText.color = gameVars.gameSettings.board.notiColor[0];
		playSound("soundScore");
	}else{
		newText.color = gameVars.gameSettings.board.notiColor[1];
		playSound("soundNoScore");
	}
	newText.textAlign = "center";
	newText.textBaseline='alphabetic';
	newText.text = gameVars.textDisplay.collectPrize.replace('[NUMBER]', addCommas(value));
	newText.x = obj.x;
	newText.y = obj.y - (gameVars.gameSettings.board.size/2);

	TweenMax.to(newText, .7, {y:newText.y-30, alpha:0, ease:Circ.easeIn, overwrite:true});
	canvasVars.plinkoWinContainer.addChild(newText);
}

/*!
 *
 * CHECK WIN POINT - This is the function that runs to check win point
 *
 */
function checkWinPoint(){
	if(gameVars.gameData.winPoint > 0){
		//win
		toggleGameStatus(gameVars.textDisplay.won.replace('[NUMBER]', addCommas(Math.floor(gameVars.gameData.winPoint))));
		gameVars.playerData.score += gameVars.gameData.winPoint;
		TweenMax.to(gameVars.playerData, 1, {point:gameVars.playerData.score, overwrite:true, onUpdate:updateStats});
		playSound('soundWin');
	}else{
		//no win
		toggleGameStatus(gameVars.textDisplay.lose);
		playSound('soundLose');
	}

	updateStats();
	checkGameEnd();
}

/*!
 *
 * CHECK GAME END - This is the function that runs to check game end
 *
 */
function checkGameEnd(){
	// //memberpayment
	// if(typeof memberData != 'undefined' && memberSettings.enableMembership){
	// 	if(!gameData.physicsEngine){
	// 		var returnPoint = {
	// 			chance:playerData.chance,
	// 			point:playerData.score,
	// 			score:playerData.score
	// 		};
	// 		matchUserResult(undefined, returnPoint);
	// 	}else{
	// 		var postData = {
	// 			bet:playerData.bet,
	// 			win:gameData.winPoint,
	// 			status:"drop_end",
	// 		}
	// 		updateUserPoint(undefined, postData);
	// 	}
	// }

	gameVars.gameData.fixedResult = [];
	gameVars.gameData.dropCon = false;
	canvasVars.buttonBlankTxt.text = gameVars.textDisplay.buttonPlay;

	if(gameVars.gameSettings.gamePlayType){
		if(gameVars.playerData.chance <= 0){
			toggleGameStatus(gameVars.textDisplay.gameOver);
			TweenMax.to(gameVars.gameData, 3, {overwrite:true, onComplete:function(){
				goPage('result');
			}});
		}
	}else{
		if(gameVars.playerData.score <= 0){
			toggleGameStatus(gameVars.textDisplay.gameOver);
			TweenMax.to(gameVars.gameData, 3, {overwrite:true, onComplete:function(){
				goPage('result');
			}});
		}
	}
}

/*!
 *
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 *
 */
// function millisecondsToTimeGame(milli) {
// 	var milliseconds = milli % 1000;
// 	var seconds = Math.floor((milli / 1000) % 60);
// 	var minutes = Math.floor((milli / (60 * 1000)) % 60);
//
// 	if(seconds<10){
// 		seconds = '0'+seconds;
// 	}
//
// 	if(minutes<10){
// 		minutes = '0'+minutes;
// 	}
//
// 	return minutes+':'+seconds;
// }

/*!
 *
 * OPTIONS - This is the function that runs to toggle options
 *
 */

function toggleOption(){
	canvasVars.optionsContainer.visible = !canvasVars.optionsContainer.visible;
}

/*!
 *
 * OPTIONS - This is the function that runs to mute and fullscreen
 *
 */
function toggleSoundMute(con){
	canvasVars.buttonSoundOff.visible = false;
	canvasVars.buttonSoundOn.visible = false;
	toggleSoundInMute(con);
	if(con){
		canvasVars.buttonSoundOn.visible = true;
	}else{
		canvasVars.buttonSoundOff.visible = true;
	}
}

function toggleMusicMute(con){
	canvasVars.buttonMusicOff.visible = false;
	canvasVars.buttonMusicOn.visible = false;
	toggleMusicInMute(con);
	if(con){
		canvasVars.buttonMusicOn.visible = true;
	}else{
		canvasVars.buttonMusicOff.visible = true;
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}


/*!
 *
 * SHARE - This is the function that runs to open share url
 *
 */
// function share(action){
// 	gtag('event','click',{'event_category':'share','event_label':action});
//
// 	var loc = location.href
// 	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
//
// 	var title = '';
// 	var text = '';
//
// 	title = shareTitle.replace("[SCORE]", addCommas(playerData.score));
// 	text = shareMessage.replace("[SCORE]", addCommas(playerData.score));
//
// 	var shareurl = '';
//
// 	if( action == 'twitter' ) {
// 		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
// 	}else if( action == 'facebook' ){
// 		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
// 	}else if( action == 'whatsapp' ){
// 		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
// 	}
//
// 	window.open(shareurl);
// }

////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////

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
		// document.getElementById('mobileRotate').style.left = checkContentWidth(document.getElementById('mobileRotate'));
		// document.getElementById('mobileRotate').style.top = checkContentHeight(document.getElementById('mobileRotate'));

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

		// window.scrollTop(0);
        resizeCanvas();
	}, 100);
}

////////////////////////////////////////////////////////////
// MOBILE
////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////
// P2
////////////////////////////////////////////////////////////

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

// Avoid `console` errors in browsers that lack a console.

(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
export function checkContentHeight(target) {
    var stageHeight = window.height;
    return (stageHeight / 2) - (target.height / 2);
}

export function checkContentWidth(target) {
    var stageWidth = window.width;
    return (stageWidth / 2) - (target.width / 2);
}

export function getDeviceVer() {
    var ua = navigator.userAgent;
    var uaindex;
    var userOS;
    var userOSver;

    // determine OS
    if (ua.match(/(iPad|iPhone|iPod touch)/)) {
        userOS = 'iOS';
        uaindex = ua.indexOf('OS ');
    } else if (ua.match(/Android/)) {
        userOS = 'Android';
        uaindex = ua.indexOf('Android ');
    } else {
        userOS = 'unknown';
    }

    // determine version
    if (userOS === 'iOS' && uaindex > -1) {
        userOSver = ua.substr(uaindex + 3, 3).replace('_', '.');
    } else if (userOS === 'Android' && uaindex > -1) {
        userOSver = ua.substr(uaindex + 8, 3);
    } else {
        userOSver = 'unknown';
    }
    return Number(userOSver)
}


export function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


export function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue
        , randomIndex
    ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export function randomBoolean() {
    return Math.random() < 0.5;
}

export function sortOnObject(array, object, rev) {
    if (rev) {
        array.sort(function (a, b) {
            var a1 = a[object], b1 = b[object];
            if (a1 === b1) return 0;
            return a1 < b1 ? 1 : -1;
        });
    } else {
        array.sort(function (a, b) {
            var a1 = a[object], b1 = b[object];
            if (a1 === b1) return 0;
            return a1 > b1 ? 1 : -1;
        });
    }
    return array;
}

export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isEven(num) {
    // if(num % 2 == 0){return true;}else{return false;} //<â€“old
    return !(num % 2);//shorter
    // return !(num & 1);//seems the fastest one
}

export function getDistance(objA, objB) {
    var deltaX = objA.x - objB.x;
    var deltaY = objA.y - objB.y;
    return Math.floor(Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)));
}

export function getDistanceByValue(x1, y1, x2, y2) {
    var deltaX = x1 - x2;
    var deltaY = y1 - y2;
    return Math.floor(Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)));
}

export function getDirectionByValue(x1, y1, x2, y2) {
    var radiance = 180 / Math.PI;
    var walkdirection = -(Math.atan2(x2 - x1, y2 - y1)) * radiance;
    return walkdirection + 90;
}

// export function unique(list) {
//     var result = [];
//     $.each(list, function (i, e) {
//         if ($.inArray(e, result) === -1) result.push(e);
//     });
//     return result;
// }

export function swapArray(input, index_A, index_B) {
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
}

export function getAnglePosition(x, y, radius, angle) {
    var pos = {x: 0, y: 0};
    pos.x = x + radius * Math.cos(angle * Math.PI / 180);
    pos.y = y + radius * Math.sin(angle * Math.PI / 180);

    return pos;
}

export function getCenterPosition(startX, startY, endX, endY) {
    var pos = {x: 0, y: 0};
    pos.x = (startX + endX) / 2;
    pos.y = (startY + endY) / 2;

    return pos;
}

export function checkIfMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /iPhone|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}



/////////////////////////////////
/// SOUND
//////////////////////////////////
export function playSound(soundName, vol){
	if(soundVars.soundOn){
		var thisSoundID = soundVars.soundID;
		soundVars.soundPushArr.push(thisSoundID);
		soundVars.soundID++;

		var defaultVol = vol === undefined ? 1 : vol;
		soundVars.sound[thisSoundID] = Sound.play(soundName);
		soundVars.sound[thisSoundID].defaultVol = defaultVol;
		setSoundVolume(thisSoundID);

		soundVars.sound[thisSoundID].removeAllEventListeners();
		soundVars.sound[thisSoundID].addEventListener ("complete", function() {
			var removeSoundIndex = soundVars.soundPushArr.indexOf(thisSoundID);
			if(removeSoundIndex !== -1){
				soundVars.soundPushArr.splice(removeSoundIndex, 1);
			}
		});
	}
}

export function playSoundLoop(soundName){
	if(soundVars.soundOn){
		if(soundVars.sound[soundName]==null){
			soundVars.soundLoopPushArr.push(soundName);

			soundVars.sound[soundName] = Sound.play(soundName);
			soundVars.sound[soundName].defaultVol = 1;
			setSoundLoopVolume(soundName);

			soundVars.sound[soundName].removeAllEventListeners();
			soundVars.sound[soundName].addEventListener ("complete", function() {
				soundVars.sound[soundName].play();
			});
		}
	}
}

export function toggleSoundLoop(soundName, con){
	if(soundVars.soundOn){
		if(soundVars.sound[soundName]!=null){
			if(con){
				soundVars.sound[soundName].play();
			}else{
				soundVars.sound[soundName].paused = true;
			}
		}
	}
}

export function stopSoundLoop(soundName){
	if(soundVars.soundOn){
		if(soundVars.sound[soundName]!=null){
			soundVars.sound[soundName].stop();
			soundVars.sound[soundName]=null;

			var soundLoopIndex = soundVars.soundLoopPushArr.indexOf(soundName);
			if(soundLoopIndex !== -1){
				soundVars.soundLoopPushArr.splice(soundLoopIndex, 1);
			}
		}
	}
}

export function playMusicLoop(soundName){
	if(soundVars.soundOn){
		if(soundVars.sound[soundName]==null){
			soundVars.musicPushArr.push(soundName);

			soundVars.sound[soundName] = Sound.play(soundName);
			soundVars.sound[soundName].defaultVol = 1;
			setMusicVolume(soundName);

			soundVars.sound[soundName].removeAllEventListeners();
			soundVars.sound[soundName].addEventListener ("complete", function() {
				soundVars.sound[soundName].play();
			});
		}
	}
}

export function toggleMusicLoop(soundName, con){
	if(soundVars.soundOn){
		if(soundVars.sound[soundName]!=null){
			if(con){
				soundVars.sound[soundName].play();
			}else{
				soundVars.sound[soundName].paused = true;
			}
		}
	}
}

export function stopMusicLoop(soundName){
	if(soundVars.soundOn){
		if(soundVars.sound[soundName]!=null){
			soundVars.sound[soundName].stop();
			soundVars.sound[soundName]=null;

			var soundLoopIndex = soundVars.musicPushArr.indexOf(soundName);
			if(soundLoopIndex !== -1){
				soundVars.musicPushArr.splice(soundLoopIndex, 1);
			}
		}
	}
}

export function stopSound(){
	Sound.stop();
}

export function toggleSoundInMute(con){
	if(soundVars.soundOn){
		soundVars.soundMute = con;
		for(var n=0; n<soundVars.soundPushArr.length; n++){
			setSoundVolume(soundVars.soundPushArr[n]);
		}
		for(n=0; n<soundVars.soundLoopPushArr.length; n++){
			setSoundLoopVolume(soundVars.soundLoopPushArr[n]);
		}
		setAudioVolume();
	}
}

export function toggleMusicInMute(con){
	if(soundVars.soundOn){
		soundVars.musicMute = con;
		for(var n=0; n<soundVars.musicPushArr.length; n++){
			setMusicVolume(soundVars.musicPushArr[n]);
		}
	}
}

export function setSoundVolume(id, vol){
	if(soundVars.soundOn){
		var soundIndex = soundVars.soundPushArr.indexOf(id);
		if(soundIndex !== -1){
			var defaultVol = vol === undefined ? soundVars.sound[soundVars.soundPushArr[soundIndex]].defaultVol : vol;
			soundVars.sound[soundVars.soundPushArr[soundIndex]].volume = soundVars.soundMute === false ? defaultVol : 0;
			soundVars.sound[soundVars.soundPushArr[soundIndex]].defaultVol = defaultVol;
		}
	}
}

export function setSoundLoopVolume(soundLoop, vol){
	if(soundVars.soundOn){
		var soundLoopIndex = soundVars.soundLoopPushArr.indexOf(soundLoop);
		if(soundLoopIndex !== -1){
			var defaultVol = vol === undefined ? soundVars.sound[soundVars.soundLoopPushArr[soundLoopIndex]].defaultVol : vol;
			soundVars.sound[soundVars.soundLoopPushArr[soundLoopIndex]].volume = soundVars.soundMute === false ? defaultVol : 0;
			soundVars.sound[soundVars.soundLoopPushArr[soundLoopIndex]].defaultVol = defaultVol;
		}
	}
}

export function setMusicVolume(soundLoop, vol){
	if(soundVars.soundOn){
		var musicIndex = soundVars.musicPushArr.indexOf(soundLoop);
		if(musicIndex !== -1){
			var defaultVol = vol === undefined ? soundVars.sound[soundVars.musicPushArr[musicIndex]].defaultVol : vol;
			soundVars.sound[soundVars.musicPushArr[musicIndex]].volume = soundVars.musicMute === false ? defaultVol : 0;
			soundVars.sound[soundVars.musicPushArr[musicIndex]].defaultVol = defaultVol;
		}
	}
}

/*!
 *
 * PLAY AUDIO - This is the function that runs to play questiona and answer audio
 *
 */
export function playAudio(audioName, callback){
	if(soundVars.soundOn){
		if(soundVars.audioFile==null){
			soundVars.audioFile = Sound.play(audioName);
			setAudioVolume();

			soundVars.audioFile.removeAllEventListeners();
			soundVars.audioFile.addEventListener ("complete", function() {
				soundVars.audioFile = null;

				if (typeof callback == "function")
					callback();
			});
		}
	}
}

export function stopAudio(){
	if(soundVars.soundOn){
		if(soundVars.audioFile != null){
			soundVars.audioFile.stop();
			soundVars.audioFile = null;
		}
	}
}

export function setAudioVolume(){
	if(soundVars.soundOn){
		if(soundVars.audioFile != null){
			soundVars.audioFile.volume = soundVars.soundMute === false ? 1 : 0;
		}
	}
}
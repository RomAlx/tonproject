////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
import { Stage, Ticker, Container, Bitmap, Text, Shape, Graphics } from 'createjs-module';
import {loaderVars} from "@/components/game/GameCore/loader";
import {gameVars, resizeGameLayout, updateGame} from "@/components/game/GameCore/game"
import {mainVars, setVarsMain} from "@/components/game/GameCore/main";
export let canvasVars = {
    stage : null,
	canvasW : 0,
	canvasH : 0,
	guide : false,
	guideline: new Shape(),
	bg: new Bitmap(loaderVars.loader.getResult('background')),
	bgP: new Bitmap(loaderVars.loader.getResult('backgroundP')),
	logo: new Bitmap(loaderVars.loader.getResult('logo')),
	logoP: new Bitmap(loaderVars.loader.getResult('logoP')),
	// containers //
	canvasContainer: new Container(),
	mainContainer: new Container(),
	gameContainer: new Container(),
	stateContainer: new Container(),
	plinkoContainer: new Container(),
	plinkoItemContainer: new Container(),
	plinkoPrizesContainer: new Container(),
	plinkoWinContainer: new Container(),
	plinkoBallsContainer: new Container(),
	plinkoGuideContainer: new Container(),
	historyContainer: new Container(),
	statsCreditContainer: new Container(),
	statsBetChanceContainer: new Container(),
	statsRiskContainer: new Container(),
	statsRowsContainer: new Container(),
	statsBallsContainer: new Container(),
	statsPlayContainer: new Container(),
	resultContainer: new Container(),
	confirmContainer: new Container(),
	optionsContainer: new Container(),
	// buttons //
	buttonStart: new Bitmap(loaderVars.loader.getResult('buttonStart')),
	buttonRestart: null,
	// buttonFacebook: null,
	// buttonTwitter: null,
	// buttonWhatsapp: null,
	buttonFullscreen: new Bitmap(loaderVars.loader.getResult('buttonFullscreen')),
	buttonSoundOn: new Bitmap(loaderVars.loader.getResult('buttonSoundOn')),
	buttonSoundOff: new Bitmap(loaderVars.loader.getResult('buttonSoundOff')),
	buttonMusicOn: null,
	buttonMusicOff: null,
	buttonBetHalf: new Bitmap(loaderVars.loader.getResult('buttonBetHalf')),
	buttonBetMultiply: new Bitmap(loaderVars.loader.getResult('buttonBetMultiply')),
	buttonRiskL: new Bitmap(loaderVars.loader.getResult('buttonArrowL')),
	buttonRiskR: new Bitmap(loaderVars.loader.getResult('buttonArrowR')),
	buttonBlank: new Bitmap(loaderVars.loader.getResult('buttonBlank')),
	buttonContinue: new Bitmap(loaderVars.loader.getResult('buttonContinue')),
	buttonExit: new Bitmap(loaderVars.loader.getResult('buttonExit')),
	buttonSettings: new Bitmap(loaderVars.loader.getResult('buttonSettings')),
	buttonConfirm: new Bitmap(loaderVars.loader.getResult('buttonConfirm')),
	buttonCancel: new Bitmap(loaderVars.loader.getResult('buttonCancel')),
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
	itemStatBetChance: new Bitmap(loaderVars.loader.getResult('itemStatDisplay')),
	itemStatCredit: new Bitmap(loaderVars.loader.getResult('itemStatDisplay')),
	itemStatRisk: new Bitmap(loaderVars.loader.getResult('itemStatDisplay')),
	itemStatRows: new Bitmap(loaderVars.loader.getResult('itemStatDisplay')),
	itemRowsDragBar: new Bitmap(loaderVars.loader.getResult('itemDragBar')),
	itemRowsDrag: new Bitmap(loaderVars.loader.getResult('itemDrag')),
	itemStatBalls: new Bitmap(loaderVars.loader.getResult('itemStatDisplay')),
	itemBallsDragBar: new Bitmap(loaderVars.loader.getResult('itemDragBar')),
	itemBallsDrag: new Bitmap(loaderVars.loader.getResult('itemDrag')),
	itemPlinko: new Bitmap(loaderVars.loader.getResult('itemPlinko')),
	itemPlinkoP: new Bitmap(loaderVars.loader.getResult('itemPlinkoP')),
	itemResult: new Bitmap(loaderVars.loader.getResult('itemResult')),
	itemResultP: new Bitmap(loaderVars.loader.getResult('itemResultP')),
	itemExit: new Bitmap(loaderVars.loader.getResult('itemExit')),
	itemExitP: new Bitmap(loaderVars.loader.getResult('itemExitP')),
};

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
	centerReg(canvasVars.buttonStart);
	canvasVars.buttonStart.x = canvasVars.canvasW/2;
	canvasVars.buttonStart.y = canvasVars.canvasH/100 * 65;
	
	//game
	// canvasVars.itemStatCredit = new Bitmap(loaderVars.loader.getResult('itemStatDisplay'));
	// canvasVars.statCreditLabelTxt = new Text();
	canvasVars.statCreditLabelTxt.font = "20px azonixregular";
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

	// canvasVars.itemStatBetChance = new Bitmap(loaderVars.loader.getResult('itemStatDisplay'));
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

	// canvasVars.buttonBetHalf = new Bitmap(loaderVars.loader.getResult('buttonBetHalf'));
	centerReg(canvasVars.buttonBetHalf);
	// canvasVars.buttonBetMultiply = new Bitmap(loaderVars.loader.getResult('buttonBetMultiply'));
	centerReg(canvasVars.buttonBetMultiply);

	canvasVars.buttonBetHalf.x = 160;
	canvasVars.buttonBetMultiply.x = 205;
	canvasVars.buttonBetMultiply.y = canvasVars.buttonBetHalf.y = 20;

	canvasVars.statsBetChanceContainer.addChild(canvasVars.itemStatBetChance, canvasVars.statBetChanceLabelTxt, canvasVars.statBetChanceTxt, canvasVars.buttonBetHalf, canvasVars.buttonBetMultiply);

	// canvasVars.itemStatRisk = new Bitmap(loaderVars.loader.getResult('itemStatDisplay'));
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

	// canvasVars.buttonRiskL = new Bitmap(loaderVars.loader.getResult('buttonArrowL'));
	centerReg(canvasVars.buttonRiskL);
	// canvasVars.buttonRiskR = new Bitmap(loaderVars.loader.getResult('buttonArrowR'));
	centerReg(canvasVars.buttonRiskR);

	canvasVars.buttonRiskR.x = 205;
	canvasVars.buttonRiskL.x = 30;
	canvasVars.buttonRiskL.y = canvasVars.buttonRiskR.y = 20;

	canvasVars.statsRiskContainer.addChild(canvasVars.itemStatRisk, canvasVars.statRiskLabelTxt, canvasVars.statRiskTxt, canvasVars.buttonRiskL, canvasVars.buttonRiskR);

	// canvasVars.itemStatRows = new Bitmap(loaderVars.loader.getResult('itemStatDisplay'));
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

	// canvasVars.itemRowsDragBar = new Bitmap(loaderVars.loader.getResult('itemDragBar'));
	centerReg(canvasVars.itemRowsDragBar);
	// canvasVars.itemRowsDrag = new Bitmap(loaderVars.loader.getResult('itemDrag'));
	centerReg(canvasVars.itemRowsDrag);

	canvasVars.itemRowsDragBar.x = 150;
	canvasVars.itemRowsDrag.x = 100;
	canvasVars.itemRowsDrag.y = 20;
	canvasVars.itemRowsDragBar.y = 25;

	canvasVars.statsRowsContainer.addChild(canvasVars.itemStatRows, canvasVars.statRowsLabelTxt, canvasVars.statRowsTxt, canvasVars.itemRowsDragBar, canvasVars.itemRowsDrag);

	// canvasVars.itemStatBalls = new Bitmap(loaderVars.loader.getResult('itemStatDisplay'));
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

	// canvasVars.itemBallsDragBar = new Bitmap(loaderVars.loader.getResult('itemDragBar'));
	centerReg(canvasVars.itemBallsDragBar);
	// canvasVars.itemBallsDrag = new Bitmap(loaderVars.loader.getResult('itemDrag'));
	centerReg(canvasVars.itemBallsDrag);

	canvasVars.itemBallsDragBar.x = 150;
	canvasVars.itemBallsDrag.x = 100;
	canvasVars.itemBallsDrag.y = 20;
	canvasVars.itemBallsDragBar.y = 25;

	canvasVars.statsBallsContainer.addChild(canvasVars.itemStatBalls, canvasVars.statBallsLabelTxt, canvasVars.statBallsTxt, canvasVars.itemBallsDragBar, canvasVars.itemBallsDrag);

	// canvasVars.buttonBlank = new Bitmap(loaderVars.loader.getResult('buttonBlank'));
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

	// canvasVars.itemPlinko = new Bitmap(loaderVars.loader.getResult('itemPlinko'));
	centerReg(canvasVars.itemPlinko);
	// canvasVars.itemPlinkoP = new Bitmap(loaderVars.loader.getResult('itemPlinkoP'));
	centerReg(canvasVars.itemPlinkoP);
	
	//result
	// canvasVars.itemResult = new Bitmap(loaderVars.loader.getResult('itemResult'));
	// canvasVars.itemResultP = new Bitmap(loaderVars.loader.getResult('itemResultP'));

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
	
	// canvasVars.buttonContinue = new Bitmap(loaderVars.loader.getResult('buttonContinue'));
	centerReg(canvasVars.buttonContinue);
	
	//option
	// canvasVars.buttonFullscreen = new Bitmap(loaderVars.loader.getResult('buttonFullscreen'));
	centerReg(canvasVars.buttonFullscreen);
	// canvasVars.buttonSoundOn = new Bitmap(loaderVars.loader.getResult('buttonSoundOn'));
	centerReg(canvasVars.buttonSoundOn);
	// canvasVars.buttonSoundOff = new Bitmap(loaderVars.loader.getResult('buttonSoundOff'));
	centerReg(canvasVars.buttonSoundOff);
	canvasVars.buttonSoundOn.visible = false;
	// canvasVars.buttonExit = new Bitmap(loaderVars.loader.getResult('buttonExit'));
	centerReg(canvasVars.buttonExit);
	// canvasVars.buttonSettings = new Bitmap(loaderVars.loader.getResult('buttonSettings'));
	centerReg(canvasVars.buttonSettings);
	
	createHitarea(canvasVars.buttonFullscreen);
	createHitarea(canvasVars.buttonSoundOn);
	createHitarea(canvasVars.buttonSoundOff);
	createHitarea(canvasVars.buttonExit);
	createHitarea(canvasVars.buttonSettings);
	
	//exit
	// canvasVars.itemExit = new Bitmap(loaderVars.loader.getResult('itemExit'));
	// canvasVars.itemExitP = new Bitmap(loaderVars.loader.getResult('itemExitP'));
	
	// canvasVars.buttonConfirm = new Bitmap(loaderVars.loader.getResult('buttonConfirm'));
	centerReg(canvasVars.buttonConfirm);
	
	// canvasVars.buttonCancel = new Bitmap(loaderVars.loader.getResult('buttonCancel'));
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
	if(canvasVars.canvasContainer!=undefined){

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
////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);	
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, resultContainer, confirmContainer;
var guideline, bg, logo, buttonStart, buttonRestart, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;

$.pin = {};
$.move = {};
$.prize = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	stateContainer = new createjs.Container();
	plinkoContainer = new createjs.Container();
	plinkoItemContainer = new createjs.Container();
	plinkoPrizesContainer = new createjs.Container();
	plinkoWinContainer = new createjs.Container();
	plinkoBallsContainer = new createjs.Container();
	plinkoGuideContainer = new createjs.Container();
	historyContainer = new createjs.Container();
	statsCreditContainer = new createjs.Container();
	statsBetChanceContainer = new createjs.Container();
	statsRiskContainer = new createjs.Container();
	statsRowsContainer = new createjs.Container();
	statsBallsContainer = new createjs.Container();
	statsPlayContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	optionsContainer = new createjs.Container();
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	bgP = new createjs.Bitmap(loader.getResult('backgroundP'));
	logo = new createjs.Bitmap(loader.getResult('logo'));
	logoP = new createjs.Bitmap(loader.getResult('logoP'));
	
	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);
	buttonStart.x = canvasW/2;
	buttonStart.y = canvasH/100 * 65;
	
	//game
	itemStatCredit = new createjs.Bitmap(loader.getResult('itemStatDisplay'));
	statCreditLabelTxt = new createjs.Text();
	statCreditLabelTxt.font = "20px azonixregular";
	statCreditLabelTxt.color = '#fff';
	statCreditLabelTxt.textAlign = "left";
	statCreditLabelTxt.textBaseline='alphabetic';
	statCreditLabelTxt.text = textDisplay.creditLabel;
	statCreditLabelTxt.x = 20;
	statCreditLabelTxt.y = -5;

	statCreditTxt = new createjs.Text();
	statCreditTxt.font = "30px azonixregular";
	statCreditTxt.color = '#fff';
	statCreditTxt.textAlign = "left";
	statCreditTxt.textBaseline='alphabetic';
	statCreditTxt.text = textDisplay.creditLabel;
	statCreditTxt.x = 20;
	statCreditTxt.y = 33;

	statsCreditContainer.addChild(itemStatCredit, statCreditLabelTxt, statCreditTxt);

	itemstatBetChance = new createjs.Bitmap(loader.getResult('itemStatDisplay'));
	statBetChanceLabelTxt = new createjs.Text();
	statBetChanceLabelTxt.font = "20px azonixregular";
	statBetChanceLabelTxt.color = '#fff';
	statBetChanceLabelTxt.textAlign = "left";
	statBetChanceLabelTxt.textBaseline='alphabetic';
	statBetChanceLabelTxt.text = textDisplay.betLabel;
	statBetChanceLabelTxt.x = 20;
	statBetChanceLabelTxt.y = -5;

	statBetChanceTxt = new createjs.Text();
	statBetChanceTxt.font = "30px azonixregular";
	statBetChanceTxt.color = '#fff';
	statBetChanceTxt.textAlign = "left";
	statBetChanceTxt.textBaseline='alphabetic';
	statBetChanceTxt.text = textDisplay.creditLabel;
	statBetChanceTxt.x = 20;
	statBetChanceTxt.y = 33;

	buttonBetHalf = new createjs.Bitmap(loader.getResult('buttonBetHalf'));
	centerReg(buttonBetHalf);
	buttonBetMultiply = new createjs.Bitmap(loader.getResult('buttonBetMultiply'));
	centerReg(buttonBetMultiply);

	buttonBetHalf.x = 160;
	buttonBetMultiply.x = 205;
	buttonBetMultiply.y = buttonBetHalf.y = 20;

	statsBetChanceContainer.addChild(itemstatBetChance, statBetChanceLabelTxt, statBetChanceTxt, buttonBetHalf, buttonBetMultiply);

	itemStatRisk = new createjs.Bitmap(loader.getResult('itemStatDisplay'));
	statRiskLabelTxt = new createjs.Text();
	statRiskLabelTxt.font = "20px azonixregular";
	statRiskLabelTxt.color = '#fff';
	statRiskLabelTxt.textAlign = "left";
	statRiskLabelTxt.textBaseline='alphabetic';
	statRiskLabelTxt.text = textDisplay.riskLabel;
	statRiskLabelTxt.x = 20;
	statRiskLabelTxt.y = -5;

	statRiskTxt = new createjs.Text();
	statRiskTxt.font = "30px azonixregular";
	statRiskTxt.color = '#fff';
	statRiskTxt.textAlign = "center";
	statRiskTxt.textBaseline='alphabetic';
	statRiskTxt.text = textDisplay.creditLabel;
	statRiskTxt.x = 120;
	statRiskTxt.y = 33;

	buttonRiskL = new createjs.Bitmap(loader.getResult('buttonArrowL'));
	centerReg(buttonRiskL);
	buttonRiskR = new createjs.Bitmap(loader.getResult('buttonArrowR'));
	centerReg(buttonRiskR);

	buttonRiskR.x = 205;
	buttonRiskL.x = 30;
	buttonRiskL.y = buttonRiskR.y = 20;

	statsRiskContainer.addChild(itemStatRisk, statRiskLabelTxt, statRiskTxt, buttonRiskL, buttonRiskR);

	itemStatRows = new createjs.Bitmap(loader.getResult('itemStatDisplay'));
	statRowsLabelTxt = new createjs.Text();
	statRowsLabelTxt.font = "20px azonixregular";
	statRowsLabelTxt.color = '#fff';
	statRowsLabelTxt.textAlign = "left";
	statRowsLabelTxt.textBaseline='alphabetic';
	statRowsLabelTxt.text = textDisplay.rowsLabel;
	statRowsLabelTxt.x = 20;
	statRowsLabelTxt.y = -5;

	statRowsTxt = new createjs.Text();
	statRowsTxt.font = "30px azonixregular";
	statRowsTxt.color = '#fff';
	statRowsTxt.textAlign = "left";
	statRowsTxt.textBaseline='alphabetic';
	statRowsTxt.text = textDisplay.creditLabel;
	statRowsTxt.x = 20;
	statRowsTxt.y = 33;

	itemRowsDragBar = new createjs.Bitmap(loader.getResult('itemDragBar'));
	centerReg(itemRowsDragBar);
	itemRowsDrag = new createjs.Bitmap(loader.getResult('itemDrag'));
	centerReg(itemRowsDrag);

	itemRowsDragBar.x = 150;
	itemRowsDrag.x = 100;
	itemRowsDrag.y = 20;
	itemRowsDragBar.y = 25;

	statsRowsContainer.addChild(itemStatRows, statRowsLabelTxt, statRowsTxt, itemRowsDragBar, itemRowsDrag);

	itemStatBalls = new createjs.Bitmap(loader.getResult('itemStatDisplay'));
	statBallsLabelTxt = new createjs.Text();
	statBallsLabelTxt.font = "20px azonixregular";
	statBallsLabelTxt.color = '#fff';
	statBallsLabelTxt.textAlign = "left";
	statBallsLabelTxt.textBaseline='alphabetic';
	statBallsLabelTxt.text = textDisplay.ballsLabel;
	statBallsLabelTxt.x = 20;
	statBallsLabelTxt.y = -5;

	statBallsTxt = new createjs.Text();
	statBallsTxt.font = "30px azonixregular";
	statBallsTxt.color = '#fff';
	statBallsTxt.textAlign = "left";
	statBallsTxt.textBaseline='alphabetic';
	statBallsTxt.text = textDisplay.creditLabel;
	statBallsTxt.x = 20;
	statBallsTxt.y = 33;

	itemBallsDragBar = new createjs.Bitmap(loader.getResult('itemDragBar'));
	centerReg(itemBallsDragBar);
	itemBallsDrag = new createjs.Bitmap(loader.getResult('itemDrag'));
	centerReg(itemBallsDrag);

	itemBallsDragBar.x = 150;
	itemBallsDrag.x = 100;
	itemBallsDrag.y = 20;
	itemBallsDragBar.y = 25;

	statsBallsContainer.addChild(itemStatBalls, statBallsLabelTxt, statBallsTxt, itemBallsDragBar, itemBallsDrag);

	buttonBlank = new createjs.Bitmap(loader.getResult('buttonBlank'));
	buttonBlankTxt = new createjs.Text();
	buttonBlankTxt.font = "30px azonixregular";
	buttonBlankTxt.color = '#fff';
	buttonBlankTxt.textAlign = "center";
	buttonBlankTxt.textBaseline='alphabetic';
	buttonBlankTxt.text = textDisplay.play;
	buttonBlankTxt.x = 120;
	buttonBlankTxt.y = 33;

	statsPlayContainer.addChild(buttonBlank, buttonBlankTxt);

	statusTxt = new createjs.Text();
	statusTxt.font = "30px azonixregular";
	statusTxt.color = '#fff';
	statusTxt.textAlign = "center";
	statusTxt.textBaseline='alphabetic';
	statusTxt.text = '';
	statusTxt.y = -10;

	itemPlinko = new createjs.Bitmap(loader.getResult('itemPlinko'));
	centerReg(itemPlinko);
	itemPlinkoP = new createjs.Bitmap(loader.getResult('itemPlinkoP'));
	centerReg(itemPlinkoP);
	
	//result
	itemResult = new createjs.Bitmap(loader.getResult('itemResult'));
	itemResultP = new createjs.Bitmap(loader.getResult('itemResultP'));

	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "20px azonixregular";
	resultShareTxt.color = '#A00D49';
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = textDisplay.share;
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "50px azonixregular";
	resultTitleTxt.color = '#fff';
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = textDisplay.resultTitle;

	resultDescTxt = new createjs.Text();
	resultDescTxt.font = "30px azonixregular";
	resultDescTxt.color = '#fff';
	resultDescTxt.textAlign = "center";
	resultDescTxt.textBaseline='alphabetic';
	resultDescTxt.text = textDisplay.resultDesc;

	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "80px azonixregular";
	resultScoreTxt.color = '#fff';
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	centerReg(buttonFacebook);
	createHitarea(buttonFacebook);
	centerReg(buttonTwitter);
	createHitarea(buttonTwitter);
	centerReg(buttonWhatsapp);
	createHitarea(buttonWhatsapp);
	
	buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonContinue);
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	itemExitP = new createjs.Bitmap(loader.getResult('itemExitP'));
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);

	exitTitleTxt = new createjs.Text();
	exitTitleTxt.font = "50px azonixregular";
	exitTitleTxt.color = "#fff";
	exitTitleTxt.textAlign = "center";
	exitTitleTxt.textBaseline='alphabetic';
	exitTitleTxt.text = textDisplay.exitTitle;
	
	popDescTxt = new createjs.Text();
	popDescTxt.font = "30px azonixregular";
	popDescTxt.lineHeight = 35;
	popDescTxt.color = "#fff";
	popDescTxt.textAlign = "center";
	popDescTxt.textBaseline='alphabetic';
	popDescTxt.text = textDisplay.exitMessage;
	
	confirmContainer.addChild(itemExit, itemExitP, exitTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
	confirmContainer.visible = false;
	
	if(guide){
		guideline = new createjs.Shape();
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}
	
	mainContainer.addChild(logo, logoP, buttonStart);
	stateContainer.addChild(statusTxt);
	
	plinkoContainer.addChild(plinkoGuideContainer, plinkoItemContainer, stateContainer, plinkoBallsContainer, plinkoPrizesContainer, plinkoWinContainer);
	gameContainer.addChild(itemPlinko, itemPlinkoP, plinkoContainer, statsCreditContainer, statsBetChanceContainer, statsRiskContainer, statsRowsContainer, statsBallsContainer, statsPlayContainer, historyContainer);
	resultContainer.addChild(itemResult, itemResultP, resultShareTxt, resultTitleTxt, resultScoreTxt, resultDescTxt, buttonContinue);
	optionsContainer.addChild(buttonExit, buttonFullscreen, buttonSoundOn, buttonSoundOff);
	optionsContainer.visible = false;
	
	if(shareEnable){
		resultContainer.addChild(buttonFacebook, buttonTwitter, buttonWhatsapp);
	}
	
	canvasContainer.addChild(bg, bgP, mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);
	
	changeViewport(viewport.isLandscape);
	resizeCanvas();
}

function changeViewport(isLandscape){
	if(isLandscape){
		//landscape
		stageW=landscapeSize.w;
		stageH=landscapeSize.h;
		contentW = landscapeSize.cW;
		contentH = landscapeSize.cH;
	}else{
		//portrait
		stageW=portraitSize.w;
		stageH=portraitSize.h;
		contentW = portraitSize.cW;
		contentH = portraitSize.cH;
	}
	
	gameCanvas.width = stageW;
	gameCanvas.height = stageH;
	
	canvasW=stageW;
	canvasH=stageH;
	
	changeCanvasViewport();
}

function changeCanvasViewport(){
	if(canvasContainer!=undefined){

		if(viewport.isLandscape){
			bg.visible = true;
			bgP.visible = false;

			logo.visible = true;
			logoP.visible = false;

			buttonStart.x = canvasW/2;
			buttonStart.y = canvasH/100 * 77;

			//game
			
			//result
			itemResult.visible = true;
			itemResultP.visible = false;
			
			buttonFacebook.x = canvasW/100*43;
			buttonFacebook.y = canvasH/100*58;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*58;
			buttonWhatsapp.x = canvasW/100*57;
			buttonWhatsapp.y = canvasH/100*58;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 75;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 52;
	
			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 38;

			resultScoreTxt.x = canvasW/2;
			resultScoreTxt.y = canvasH/100 * 47;

			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 29;
			
			//exit
			itemExit.visible = true;
			itemExitP.visible = false;

			buttonConfirm.x = (canvasW/2) + 110;
			buttonConfirm.y = (canvasH/100 * 75);
			
			buttonCancel.x = (canvasW/2) - 110;
			buttonCancel.y = (canvasH/100 * 75);
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 47;

			exitTitleTxt.x = canvasW/2;
			exitTitleTxt.y = canvasH/100 * 29;

		}else{
			bg.visible = false;
			bgP.visible = true;

			logo.visible = false;
			logoP.visible = true;
			
			buttonStart.x = canvasW/2;
			buttonStart.y = canvasH/100 * 70;

			//game
			
			//result
			itemResult.visible = false;
			itemResultP.visible = true;
			
			buttonFacebook.x = canvasW/100*39;
			buttonFacebook.y = canvasH/100*57;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*57;
			buttonWhatsapp.x = canvasW/100*61;
			buttonWhatsapp.y = canvasH/100*57;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 70;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 52;
	
			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 41;

			resultScoreTxt.x = canvasW/2;
			resultScoreTxt.y = canvasH/100 * 48;

			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 34;
			
			//exit
			itemExit.visible = false;
			itemExitP.visible = true;

			buttonConfirm.x = (canvasW/2) - 110;
			buttonConfirm.y = (canvasH/100 * 68);
			
			buttonCancel.x = (canvasW/2) + 110;
			buttonCancel.y = (canvasH/100 * 68);
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 49;

			exitTitleTxt.x = canvasW/2;
			exitTitleTxt.y = canvasH/100 * 34;
		}
	}
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		buttonSettings.x = (canvasW - offset.x) - 60;
		buttonSettings.y = offset.y + 60;
		
		var distanceNum = 105;
		var nextCount = 0;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*(nextCount+2));
		}
		
		resizeGameLayout();
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}
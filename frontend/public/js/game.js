////////////////////////////////////////////////////////////
// GAME v1.1
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */

var gameSettings = {
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
};

//game text display
var textDisplay = {
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
}

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = "Highscore on Extreme Plinko Game at $[SCORE].";//social share score title
var shareMessage = "$[SCORE] is mine new highscore on Extreme Plinko Game! Try it now!"; //social share score message
				
/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = {enable:false};
var playerData = {chance:0, score:0, point:0, bet:0};
var gameData = {paused:true, dropCon:false, ballArray:[], historyArray:[], historyObj:[], pinObj:[], totalBet:0, totalBalls:0, totalRows:0, lastRows:-1, riskLevel:0, boardW:0, winAmount:0, moveArray:[], finalMoveArray:[], fixedResult:[]};
var tweenData = {score:0, scoreTarget:0, resultScore:0};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	$(window).focus(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(false);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(false);
			}
		}
	});
	
	$(window).blur(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(true);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(true);
			}
		}
	});
	gameData.physicsEngine = true;
	if(gameSettings.enableFixedResult){
		gameData.physicsEngine = false;
	}

	if(gameSettings.enablePercentage){
		gameData.physicsEngine = false;	
	}

	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundClick');
		goPage('game');
	});
	
	//game
	buttonBetHalf.cursor = "pointer";
	buttonBetHalf.addEventListener("click", function(evt) {
		if(gameData.dropCon){
			return;
		}

		playSound('soundClick');
		toggleTotalBet(false);
	});

	buttonBetMultiply.cursor = "pointer";
	buttonBetMultiply.addEventListener("click", function(evt) {
		if(gameData.dropCon){
			return;
		}

		playSound('soundClick');
		toggleTotalBet(true);
	});

	buttonRiskL.cursor = "pointer";
	buttonRiskL.addEventListener("click", function(evt) {
		if(gameData.dropCon){
			return;
		}

		playSound('soundClick');
		toggleRiskLevel(false);
	});

	buttonRiskR.cursor = "pointer";
	buttonRiskR.addEventListener("click", function(evt) {
		if(gameData.dropCon){
			return;
		}

		playSound('soundClick');
		toggleRiskLevel(true);
	});

	itemRowsDrag.dragType = "rows";
	itemBallsDrag.dragType = "balls";
	buildDragOption(itemRowsDrag);
	buildDragOption(itemBallsDrag);

	buttonBlank.cursor = "pointer";
	buttonBlank.addEventListener("click", function(evt) {
		playSound('soundClick');
		dropBalls();
	});

	//exit
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleConfirm(false);
		stopGame(true);
		goPage('main');
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleConfirm(false);
	});
	
	buttonContinue.cursor = "pointer";
	buttonContinue.addEventListener("click", function(evt) {
		playSound('soundClick');
		goPage('main');
	});
	
	//result
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	
	buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	
	buttonWhatsapp.cursor = "pointer";
	buttonWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	
	//options
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleSoundMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleSoundMute(false);
	});

	if (typeof buttonMusicOff != "undefined") {
		buttonMusicOff.cursor = "pointer";
		buttonMusicOff.addEventListener("click", function(evt) {
			toggleMusicMute(true);
		});
	}
	
	if (typeof buttonMusicOn != "undefined") {
		buttonMusicOn.cursor = "pointer";
		buttonMusicOn.addEventListener("click", function(evt) {
			toggleMusicMute(false);
		});
	}
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleOption();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleConfirm(true);
		toggleOption();
	});
}

function appendFocusFrame(){
	$('#mainHolder').prepend('<div id="focus" style="position:absolute; width:100%; height:100%; z-index:1000;"></div');
	$('#focus').click(function(){
		$('#focus').remove();
	});	
}


/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible = false;
	gameContainer.visible = false;
	resultContainer.visible = false;
	
	var targetContainer = null;
	switch(page){
		case 'main':
			targetContainer = mainContainer;
		break;
		
		case 'game':			
			targetContainer = gameContainer;
			
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			stopGame();
			
			playSound('soundResult');

			tweenData.resultScore = 0;
			TweenMax.to(tweenData, 1, {resultScore:playerData.score, overwrite:true, onUpdate:function(){
				resultScoreTxt.text = textDisplay.resultScore.replace('[NUMBER]', addCommas(Math.round(tweenData.resultScore)));
			}});

			saveGame(playerData.score);
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
	confirmContainer.visible = con;
	
	if(con){
		TweenMax.pauseAll(true, true);
		gameData.paused = true;
	}else{
		TweenMax.resumeAll(true, true);
		if(curPage == 'game'){
			gameData.paused = false;
		}
	}
}

/*!
 * 
 * SETUP GAME - This is the function that runs to setup game
 * 
 */
function setupGames(){
	//sortOnObject(gameSettings.rows, "total");
	
	var pos = {x:0, y:gameSettings.board.size};
	var totalRow = gameSettings.rows[gameSettings.rows.length-1].total;
	var totalColumn = gameSettings.board.startPin;
	var pinIndex = 0;

	for(var r=0; r<totalRow; r++){
		pos.x = -((gameSettings.board.size * (totalColumn-1))/2);

		for(var c=0; c<totalColumn; c++){
			var pinMove = new createjs.Shape();
			pinMove.graphics.beginFill(gameSettings.board.pinMoveColor).drawCircle(0, 0, gameSettings.board.pinSize);
			pinMove.x = pos.x;
			pinMove.y = pos.y;
			
			$.pin[r+'_'+c] = new createjs.Shape();
			$.pin[r+'_'+c].graphics.beginFill(gameSettings.board.pinColor).drawCircle(0, 0, gameSettings.board.pinSize);
			$.pin[r+'_'+c].x = pos.x;
			$.pin[r+'_'+c].y = pos.y;
			$.pin[r+'_'+c].pinIndex = pinIndex;
			$.pin[r+'_'+c].pinMove = pinMove;

			pos.x += gameSettings.board.size;
			gameData.pinObj.push(pinMove);
			plinkoItemContainer.addChild(pinMove, $.pin[r+'_'+c]);
			createPhysicCircle(gameSettings.board.pinSize, $.pin[r+'_'+c].x, $.pin[r+'_'+c].y);

			pinIndex++;
		}
		pos.y += gameSettings.board.size;
		totalColumn++;
	}

	gameData.totalColumn = totalColumn;
	var pos = {x:0, y:gameSettings.board.size};
	for(var r=0; r<totalRow+1; r++){
		pos.x = -((gameSettings.board.size * (totalColumn-1))/2);
		pos.x -= gameSettings.board.size;
		
		gameData.moveArray.push([]);
		for(var c=0; c<totalColumn; c++){
			$.move[r+'_'+c] = new createjs.Shape();
			$.move[r+'_'+c].graphics.beginFill('red').drawCircle(0, 0, gameSettings.board.pinSize/2);
			$.move[r+'_'+c].x = pos.x + (gameSettings.board.size/2);
			if(isEven(r)){
				$.move[r+'_'+c].x += gameSettings.board.size/2;
			}
			$.move[r+'_'+c].y = pos.y - ((gameSettings.board.pinSize/2) + (gameSettings.board.ballSize));

			plinkoGuideContainer.addChild($.move[r+'_'+c]);
			gameData.moveArray[r].push(c);
			
			pos.x += gameSettings.board.size;
		}
		pos.y += gameSettings.board.size;
	}
}

function updateBoardRows(sound){
	if(gameData.totalRows != gameData.lastRows){
		if(sound){
			playSound('soundChange');
		}
		gameData.lastRows = gameData.totalRows;

		var totalRow = gameSettings.rows[gameSettings.rows.length-1].total;
		var totalColumn = gameSettings.board.startPin;
		gameData.boardW = 0;
		for(var r=0; r<totalRow; r++){
			for(var c=0; c<totalColumn; c++){
				if(r < gameData.totalRows){
					$.pin[r+'_'+c].pinMove.visible = true;
					setPhysicCircle($.pin[r+'_'+c].pinIndex, true);
					$.pin[r+'_'+c].visible = true;

					if(c == totalColumn-1){
						gameData.boardW = $.pin[r+'_'+c].x - $.pin[r+'_'+0].x;
					}
				}else{
					$.pin[r+'_'+c].pinMove.visible = false;
					setPhysicCircle($.pin[r+'_'+c].pinIndex, false);
					$.pin[r+'_'+c].visible = false;
				}
			}
			totalColumn++;
		}

		//prizes
		plinkoPrizesContainer.removeAllChildren();
		for(var n=0; n<gameSettings.rows.length; n++){
			if(gameData.totalRows == gameSettings.rows[n].total){
				gameData.rowIndex = n;
				gameData.prizeArray = [];
				for(var p=gameSettings.rows[gameData.rowIndex].prizes.length-1; p>=0; p--){
					gameData.prizeArray.push(p);
				}

				var startP = 0;
				if(!gameSettings.rows[gameData.rowIndex].even){
					startP = 1;
				}

				for(var p=startP; p<gameSettings.rows[gameData.rowIndex].prizes.length; p++){
					gameData.prizeArray.push(p);
				}

				var pos = {x:0, y:gameData.totalRows * gameSettings.board.size};
				pos.x = -((gameSettings.board.size * (gameData.prizeArray.length))/2);
				pos.x += (gameSettings.board.size/2);
				pos.y += (gameSettings.board.size + gameSettings.board.ballSize);

				for(var p=0; p<gameData.prizeArray.length; p++){
					var prizeIndex = gameData.prizeArray[p];
					$.prize[p] = createPrize(prizeIndex);

					$.prize[p].x = $.prize[p].oriX = pos.x;
					$.prize[p].y = $.prize[p].oriY = pos.y;
					
					pos.x += gameSettings.board.size;
					plinkoPrizesContainer.addChild($.prize[p]);
				}
			}
		}

		updateRiskLevel();
		resizeGameLayout();
	}
}

function createPrize(prizeIndex){
	var pos = {w:gameSettings.board.size/1.2, h:gameSettings.board.size, radius:10};
	var prizeContainer = new createjs.Container();

	var prizeBg = new createjs.Shape();
	prizeBg.graphics.beginFill(gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].bgColor).drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);

	var prizeShadowBg = new createjs.Shape();
	prizeShadowBg.graphics.beginFill(gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].bgColor).drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);
	prizeShadowBg.y = 10;

	var prizeShadowDimBg = new createjs.Shape();
	prizeShadowDimBg.graphics.beginFill("#000").drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);
	prizeShadowDimBg.alpha = .3;
	prizeShadowDimBg.y = 10;

	var bgWin = new createjs.Container();
	var prizeWinBg = new createjs.Shape();
	prizeWinBg.graphics.beginFill(gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].bgWinColor).drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);

	var prizeWinShadowBg = new createjs.Shape();
	prizeWinShadowBg.graphics.beginFill(gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].bgWinColor).drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);
	prizeWinShadowBg.y = 10;

	var prizeWinShadowDimBg = new createjs.Shape();
	prizeWinShadowDimBg.graphics.beginFill("#000").drawRoundRectComplex(-(pos.w/2), -(pos.h/2), pos.w, pos.h, pos.radius, pos.radius, pos.radius, pos.radius);
	prizeWinShadowDimBg.alpha = .3;
	prizeWinShadowDimBg.y = 10;

	bgWin.addChild(prizeWinShadowBg, prizeWinShadowDimBg, prizeWinBg);
	bgWin.alpha = 0;

	var prizeTxt = new createjs.Text();
	prizeTxt.font = gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].fontSize + "px azonixregular";
	prizeTxt.color = gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].color;
	prizeTxt.textAlign = "center";
	prizeTxt.textBaseline ='alphabetic';
	prizeTxt.lineHeight = gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].lineHeight;
	prizeTxt.x = gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].x;
	prizeTxt.y = gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].y;
	
	prizeContainer.prizeIndex = prizeIndex;
	prizeContainer.prizeText = prizeTxt;
	prizeContainer.bgWin = bgWin;
	prizeContainer.valueArray = [];
	prizeContainer.textArray = [];

	for(var v = 0; v<gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].value.length; v++){
		prizeContainer.valueArray.push(gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].value[v]);
		prizeContainer.textArray.push(gameSettings.rows[gameData.rowIndex].prizes[prizeIndex].text[v]);
	}
	prizeContainer.addChild(prizeShadowBg, prizeShadowDimBg, prizeBg, bgWin, prizeTxt);

	return prizeContainer;
}

function animatePin(index){
	var targetPin = gameData.pinObj[index];
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
	gameData.paused = false;

	plinkoGuideContainer.visible = false;
	historyContainer.removeAllChildren();

	gameData.totalBet = gameSettings.minBet;
	gameData.totalRows = gameSettings.rows[0].total;
	gameData.riskLevel = 0;
	gameData.totalBalls = gameData.lastTotalBalls = 1;
	gameData.winAmount = 0;
	gameData.historyArray = [];
	gameData.historyObj = [];
	
	//memberpayment
	playerData.chance = gameData.startChance = gameSettings.chances;
	playerData.score = playerData.point = 0;

	if(gameSettings.gamePlayType){		
		statBetChanceLabelTxt.text = textDisplay.chanceLabel;
		buttonBetHalf.visible = buttonBetMultiply.visible = false;

		//memberpayment
		if(typeof memberData != 'undefined' && memberSettings.enableMembership){
			playerData.point = playerData.score = memberData.point;
			playerData.chance = gameData.startChance = memberData.chance;
		}
	}else{
		playerData.score = playerData.point = gameSettings.credit;
		
		//memberpayment
		if(typeof memberData != 'undefined' && memberSettings.enableMembership){
			playerData.score = playerData.point = memberData.point;
			playerData.chance = gameData.startChance = memberData.chance;
		}
	}

	updateBoardRows(false);
	updateRiskLevel();
	updateStats();
	displayGameStatusAmount();
	playSound("soundStart");

	stateContainer.tween = {startSpeed:.3, endSpeed:.3, startDelay:0, endDelay:0, startAlpha:.3, endAlpha:1, loop:true};
	startAnimate(stateContainer);
	buttonBlankTxt.text = textDisplay.buttonPlay;
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	gameData.paused = true;
	pausedPhysics(0, true);

	TweenMax.killAll();
}

/*!
 * 
 * SAVE GAME - This is the function that runs to save game
 * 
 */
function saveGame(score){
	if ( typeof toggleScoreboardSave == 'function' ) { 
		$.scoreData.score = score;
		if(typeof type != 'undefined'){
			$.scoreData.type = type;	
		}
		toggleScoreboardSave(true);
	}

	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 * 
 * RESIZE GAME LAYOUT - This is the function that runs for resize game layout
 * 
 */
function resizeGameLayout(){
	var spaceX = 250;
	var spaceY = 90;
	var spaceButtonY = 75;
	var pos = {x:0, y:0, scaleX:1, scaleY:1, w:gameData.boardW, h:gameSettings.board.size * (gameData.totalRows+1), maxW:1000, maxH:510, scalePercentX:1, scalePercentY:1};

	if(!viewport.isLandscape){
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

	itemPlinko.visible = itemPlinkoP.visible = false;

	if(viewport.isLandscape){
		statsCreditContainer.x = canvasW/100 * 11;
		statsCreditContainer.y = canvasH/100 * 20;

		statsBetChanceContainer.x = statsCreditContainer.x;
		statsBetChanceContainer.y = statsCreditContainer.y + spaceY;

		statsRiskContainer.x = statsCreditContainer.x;
		statsRiskContainer.y = statsCreditContainer.y + (spaceY*2);

		statsRowsContainer.x = statsCreditContainer.x;
		statsRowsContainer.y = statsCreditContainer.y + (spaceY*3);

		statsBallsContainer.x = statsCreditContainer.x;
		statsBallsContainer.y = statsCreditContainer.y + (spaceY*4);

		statsPlayContainer.x = statsCreditContainer.x;
		statsPlayContainer.y = statsCreditContainer.y + ((spaceY*4) + spaceButtonY);

		pos.x = canvasW/100 * 57;
		pos.y = canvasH/2 - ((pos.h * pos.scaleX) /2);

		itemPlinko.x = canvasW/100 * 57;
		itemPlinko.y = canvasH/2;
		itemPlinko.visible = true;

		historyContainer.x = canvasW/100 * 86;
		historyContainer.y = canvasH/2;
	}else{
		statsBetChanceContainer.x = canvasW/100 * 18;
		statsBetChanceContainer.y = canvasH/100 * 68;

		statsRiskContainer.x = statsBetChanceContainer.x + spaceX;
		statsRiskContainer.y = statsBetChanceContainer.y;

		statsRowsContainer.x = statsBetChanceContainer.x;
		statsRowsContainer.y = statsBetChanceContainer.y + (spaceY);

		statsBallsContainer.x = statsRowsContainer.x + spaceX;
		statsBallsContainer.y = statsBetChanceContainer.y + (spaceY);

		statsCreditContainer.x = statsBetChanceContainer.x;
		statsCreditContainer.y = statsBetChanceContainer.y + (spaceY * 2);

		statsPlayContainer.x = statsCreditContainer.x + spaceX;
		statsPlayContainer.y = statsBetChanceContainer.y + (spaceY * 2);

		pos.x = canvasW/2;
		pos.y = (canvasH/100 * 39) - ((pos.h * pos.scaleX) /2);

		itemPlinkoP.x = canvasW/2;
		itemPlinkoP.y = canvasH/100 * 39;
		itemPlinkoP.visible = true;

		historyContainer.x = canvasW/2;
		historyContainer.y = canvasH/100 * 10;
	}

	TweenMax.to(plinkoContainer, .2, {x:pos.x, y:pos.y, scaleX:pos.scaleX, scaleY:pos.scaleY, overwrite:true});
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
	TweenMax.killTweensOf(statusTxt);

	if(stat != undefined){
		statusTxt.text = stat;

		if(!isNaN(timer)){
			TweenMax.to(statusTxt, timer, {doverwrite:true, onComplete:function(){
				displayGameStatusAmount();
			}});
		}
	}
}

function displayGameStatusAmount(){
	if(!gameData.dropCon){
		if(gameSettings.gamePlayType){
			var displayCalculate = textDisplay.playChance.replace('[NUMBER]', addCommas(Math.floor(gameData.totalBalls)));
			displayCalculate = displayCalculate.replace('[TOTAL]', addCommas(Math.floor(gameData.totalBalls * gameSettings.chancesPoint)));
			statusTxt.text = displayCalculate
		}else{
			statusTxt.text = textDisplay.playBet.replace('[NUMBER]', addCommas(Math.floor(gameData.totalBet * gameData.totalBalls)));
		}
	}else{
		if(gameData.totalBallsCount+1 == gameData.totalBalls){
			statusTxt.text = textDisplay.playing;
		}else{
			statusTxt.text = textDisplay.playingMultiple.replace('[NUMBER]', addCommas(Math.floor(gameData.totalBalls - (gameData.totalBallsCount+1))));
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
		gameData.totalBet = gameData.totalBet/2;
		gameData.totalBet = gameData.totalBet < gameSettings.minBet ? gameSettings.minBet : gameData.totalBet;
	}else{
		gameData.totalBet = gameData.totalBet * 2;
		gameData.totalBet = gameData.totalBet > gameSettings.maxBet ? gameSettings.maxBet : gameData.totalBet;
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
		gameData.riskLevel--;
		gameData.riskLevel = gameData.riskLevel < 0 ? 0 : gameData.riskLevel;
	}else{
		gameData.riskLevel++;
		gameData.riskLevel = gameData.riskLevel > 2 ? 2 : gameData.riskLevel;
	}

	updateRiskLevel();
}

function updateRiskLevel(){
	statRiskTxt.text = textDisplay.risk[gameData.riskLevel];

	for(var p=0; p<gameData.prizeArray.length; p++){
		$.prize[p].prizeText.text = $.prize[p].textArray[gameData.riskLevel];
	}
}

/*!
 * 
 * DRAG EVENTS - This is the function that runs to build drag events
 * 
 */
function buildDragOption(drag){
	drag.dragCon = false;
	if(drag.dragType == "rows"){
		drag.x = drag.startX = itemRowsDragBar.x - (itemRowsDragBar.image.naturalWidth/2);
		drag.endX = itemRowsDragBar.x + (itemRowsDragBar.image.naturalWidth/2);
	}else{
		drag.x = drag.startX = itemBallsDragBar.x - (itemBallsDragBar.image.naturalWidth/2);
		drag.endX = itemBallsDragBar.x + (itemBallsDragBar.image.naturalWidth/2);
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
	if(gameData.dropCon){
		return;
	}

	var targetContainer;
	if(obj.target.dragType == "rows"){
		targetContainer = statsRowsContainer;
	}else{
		targetContainer = statsBallsContainer;
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
				var moveX = ((local.x) + obj.target.offset.x);
				obj.target.x = moveX;
				obj.target.x = obj.target.x < obj.target.startX ? obj.target.startX : obj.target.x;
				obj.target.x = obj.target.x > obj.target.endX ? obj.target.endX : obj.target.x;

				var dragPos = obj.target.x - obj.target.startX;
				var dragW = obj.target.endX - obj.target.startX;

				if(obj.target.dragType == "rows"){
					var rowIndex = Math.floor(dragPos/dragW * (gameSettings.rows.length-1));
					gameData.totalRows = gameSettings.rows[rowIndex].total;
					updateBoardRows(true);
				}else{
					gameData.totalBalls = Math.floor(dragPos/dragW * gameSettings.maxBalls);
					gameData.totalBalls = gameData.totalBalls < 1 ? 1 : gameData.totalBalls;
					if(gameData.totalBalls != gameData.lastTotalBalls){
						gameData.lastTotalBalls = gameData.totalBalls;
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
	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership && !memberData.ready){
		return;
	}

	if(gameData.dropCon){
		return;
	}

	if(gameSettings.gamePlayType){
		if(playerData.chance < gameData.totalBalls){
			toggleGameStatus(textDisplay.chanceInsufficient, 2);
			return;	
		}

		playerData.chance -= gameData.totalBalls;
		playerData.chance = playerData.chance < 0 ? 0 : playerData.chance;
	}else{
		if(playerData.point < Math.floor(gameData.totalBet * gameData.totalBalls)){
			toggleGameStatus(textDisplay.betInsufficient, 2);
			return;	
		}

		playerData.score -= gameData.totalBet * gameData.totalBalls;
		playerData.point = playerData.score;
	}

	plinkoWinContainer.removeAllChildren();
	resetPhysicBall();
	gameData.ballArray = [];
	gameData.winPoint = 0;
	updateStats();
	
	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		if(!gameData.physicsEngine){
			var postData = {
				rows:gameData.rowIndex,
				balls:gameData.totalBalls,
				bet:gameData.totalBet,
				risk:gameData.riskLevel
			}
			getUserResult("proceedDropBalls", postData);
		}else{
			var postData = {
				rows:gameData.rowIndex,
				balls:gameData.totalBalls,
				bet:gameData.totalBet,
				risk:gameData.riskLevel,
				status:"drop_start",
			}
			updateUserPoint("proceedDropBalls", postData);
		}
	}else{
		if(gameSettings.enablePercentage){
			createPercentage();
		}
		proceedDropBalls();
	}
}

function proceedDropBalls(result){
	gameData.path = [];
	if(result != undefined){
		gameData.path = result.path;
	}
	
	toggleGameStatus(textDisplay.playing);
	buttonBlankTxt.text = textDisplay.buttonPlaying;
	gameData.dropCon = true;
	gameData.totalBallsCount = 0;

	if(gameData.physicsEngine){
		pausedPhysics(0, false);
	}

	loopDropBalls();
}

function loopDropBalls(){
	var tweenDelay = gameData.totalBallsCount == 0 ? 0 : gameSettings.nextBallDelay;
	TweenMax.to(gameData, tweenDelay, {overwrite:true, onComplete:function(){
		displayGameStatusAmount()
		createBall();
		gameData.totalBallsCount++;

		if(gameData.totalBallsCount < gameData.totalBalls){
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
	var newBall = new createjs.Bitmap(loader.getResult('itemBall'));
	centerReg(newBall);
	newBall.active = true;
	newBall.ballIndex = gameData.ballArray.length;
	newBall.idleMove = 0;
	newBall.idleTimeCount = 0;
	newBall.ballX = 0;
	newBall.ballY = 0;
	
	gameData.ballArray.push(newBall);
	plinkoBallsContainer.addChild(newBall);

	var totalPin = gameSettings.board.startPin-1;
	if(!gameSettings.enableFixedResult){
		totalPin = totalPin < 1 ? 1 : totalPin;

		var rangeX = gameSettings.board.size * totalPin;
		newBall.x = randomIntFromInterval(-(rangeX/2),(rangeX/2));
		createPhysicBall(gameSettings.board.ballSize, newBall.x, newBall.y);
	}else{
		generateMovePath(newBall);
	}
}

function removeBall(index){
	var targetBall = gameData.ballArray[index];
	targetBall.active = false;
	plinkoBallsContainer.removeChild(targetBall);

	if(!gameSettings.enableFixedResult){
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

	if(gameData.path.length > 0 && targetBall.ballIndex < gameData.path.length){
		targetBall.path = gameData.path[targetBall.ballIndex];
		startPos.x = $.move[0+'_'+targetBall.path[0].c].x;
	}else{
		var center_column = Math.floor((gameData.totalColumn - gameSettings.board.startPin)/2);
		var random_pos = [];
		var start_column = center_column;
		for (var n = 0; n < gameSettings.board.startPin; n++) {
			random_pos.push(start_column);
			start_column++;
		}
		
		var prizeFixedResult = -1;
		if(targetBall.ballIndex < gameData.fixedResult.length){
			prizeFixedResult = gameData.fixedResult[targetBall.ballIndex];
		}

		if(prizeFixedResult == -1){
			if(gameSettings.enablePercentage){
				prizeFixedResult = getResultOnPercent();
			}
		}

		if(prizeFixedResult != -1){
			targetBall.fixedResult = (gameSettings.rows[gameData.rowIndex].prizes.length-1) - prizeFixedResult;

			if(randomBoolean()){
				if(!gameSettings.rows[gameData.rowIndex].even){
					targetBall.fixedResult = (gameSettings.rows[gameData.rowIndex].prizes.length-1) + prizeFixedResult;
				}else{
					targetBall.fixedResult = (gameSettings.rows[gameData.rowIndex].prizes.length) + prizeFixedResult;
				}
			}

			var dropDistance = -1;
			var drop_column;
			for (var n = 0; n < random_pos.length; n++) {
				var checkDistance = Math.abs(random_pos[n] - targetBall.fixedResult);
				if(dropDistance == -1){
					dropDistance = checkDistance;
					drop_column = random_pos[n];
				}
				
				if(dropDistance > checkDistance){
					dropDistance = checkDistance;
					drop_column = random_pos[n];
				}
			}
		}else{
			shuffle(random_pos);
			startPos.x = $.move[0+'_'+random_pos[0]].x;
			targetBall.moveColumn = random_pos[0];
		}
	}

	var targetMoveArray = gameData.moveArray;
	for(var n=0; n<targetMoveArray.length; n++){
		if(n < gameData.totalRows+1){
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

	var targetMoveArray = gameData.moveArray;
	var plinkoSize = gameSettings.board.size;
	var ballSize = gameSettings.board.ballSize;
	var thisMove = $.move;
	
	for(var p=0; p<targetMoveArray[row].length; p++){
		var getDistance = getDistanceByValue(targetBall.x, targetBall.y, thisMove[row+'_'+p].x, thisMove[row+'_'+p].y);
		possibleMove.push({distance:getDistance, column:p});
	}

	sortOnObject(possibleMove, 'distance', false);
	
	var selectedColumn = possibleMove[0].column;
	if(targetBall.fixedResult != -1 && targetBall.moveColumn == -1){
		var lastRow = gameData.totalRows;
		var centerRow = Math.floor(targetMoveArray[lastRow].length/2);
		var centerPrize = Math.floor(gameData.prizeArray.length/2);
		var targetColumn = 0;
		if(!gameSettings.rows[gameData.rowIndex].even){
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
	}else if(row == 0){
		selectedColumn = targetBall.moveColumn;
	}

	var randomDirection = false;
	if(targetBall.fixedResult != -1){
		var moveNum = gameData.totalRows - row;
		var safeDistance = (targetBall.moveColumn * 2) + 1;
		if(safeDistance >= moveNum){
			randomDirection = true;
		}
	}

	if(possibleMove[0].distance == possibleMove[1].distance){
		if(targetBall.fixedResult != -1 && randomDirection){
			var targetPrize = $.prize[targetBall.fixedResult];

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

	if(targetBall.fixedResult != -1){
		var lastRow = gameData.totalRows;
		var centerRow = Math.floor(targetMoveArray[lastRow].length/2);
		var centerPrize = Math.floor(gameData.prizeArray.length/2);
		var targetColumn = 0;
		if(!gameSettings.rows[gameData.rowIndex].even){
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

	if(row == gameData.totalRows){
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
	if(targetBall.moveIndex == targetBall.finalMoveArray.length-1 || targetBall.moveIndex == 0){
		setTimeout(function(){ playHitSound(); }, 250);
		TweenMax.to(targetBall, .5, {x:targetBall.finalMoveArray[targetBall.moveIndex].x, y:targetBall.finalMoveArray[targetBall.moveIndex].y, ease:Bounce.easeOut, overwrite:true, onComplete:ballMoveComplete, onCompleteParams:[targetBall]});
	}else{
		var path_arr = [
			{x:targetBall.x, y:targetBall.y},
			{x:targetBall.finalMoveArray[targetBall.moveIndex].x, y:targetBall.finalMoveArray[targetBall.moveIndex].y - (gameSettings.board.size * 1.3)},
			{x:targetBall.finalMoveArray[targetBall.moveIndex].x, y:targetBall.finalMoveArray[targetBall.moveIndex].y - (gameSettings.board.size * .2)},
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
		for(var n=0; n<gameData.pinObj.length; n++){
			var targetPin = gameData.pinObj[n];
			var getDistance = getDistanceByValue(targetBall.x, targetBall.y, targetPin.x, targetPin.y);
			nearestPin.push({distance:getDistance, index:n});
		}
	
		sortOnObject(nearestPin, 'distance', false);
		animatePin(nearestPin[0].index);

		playHitSound();
		startBallMove(targetBall);
	}
}

function playHitSound(){
	playSound('soundHit');	
}

/*!
 * 
 * PERCENTAGE - This is the function that runs to create result percentage
 * 
 */
function createPercentage(){
	gameData.percentageArray = [];
	
	//default
	for(var n=0; n<gameSettings.rows[gameData.rowIndex].prizes.length; n++){
		if(!isNaN(gameSettings.rows[gameData.rowIndex].prizes[n].percent)){
			if(gameSettings.rows[gameData.rowIndex].prizes[n].percent > 0){
				for(var p=0; p<gameSettings.rows[gameData.rowIndex].prizes[n].percent; p++){
					gameData.percentageArray.push(n);
				}
			}
		}
	}
}

function getResultOnPercent(){
	shuffle(gameData.percentageArray);
	return gameData.percentageArray[0];
}

/*!
 * 
 * GET RESULT - This is the function that runs to get result
 * 
 */
function getResult(array){
	gameData.fixedResult = array;
}

/*!
 * 
 * UPDATE STAT - This is the function that runs to update game stat
 * 
 */
function updateStats(){
	statCreditTxt.text = textDisplay.credit.replace('[NUMBER]', addCommas(Math.floor(playerData.point)));

	if(gameSettings.gamePlayType){		
		statBetChanceTxt.text = textDisplay.chance.replace('[NUMBER]', addCommas(Math.floor(playerData.chance)));
	}else{
		statBetChanceTxt.text = textDisplay.bet.replace('[NUMBER]', addCommas(Math.floor(gameData.totalBet)));
	}

	statRowsTxt.text = gameData.totalRows;
	statBallsTxt.text = gameData.totalBalls;
}

function updateWinHistory(){
	if(gameData.historyArray.length > gameSettings.history){
		removeHistory(gameData.historyObj[0]);
		gameData.historyObj.splice(0,1);
		gameData.historyArray.splice(0,1);
	}

	var prizeIndex = gameData.historyArray[gameData.historyArray.length-1];
	var newHistory = createPrize(prizeIndex);
	newHistory.prizeText.text = newHistory.textArray[gameData.riskLevel];
	newHistory.alpha = 0;

	gameData.historyObj.push(newHistory);
	historyContainer.addChild(newHistory);
	positionWinHistory();
	animateHistory(newHistory);
}

function removeHistory(obj){
	TweenMax.to(obj, .2, {onComplete:function(){
		historyContainer.removeChild(obj);	
	}});
}

function positionWinHistory(){
	var pos = {x:0, y:0, w:0, h:0, spaceX:3, spaceY:13};
	if(viewport.isLandscape){
		pos.h = (gameData.historyObj.length-1) * gameSettings.board.size;
		pos.h += (gameData.historyObj.length-1) * pos.spaceY;
		pos.y = -(pos.h/2);
	}else{
		pos.w = (gameData.historyObj.length-1) * gameSettings.board.size;
		pos.w += (gameData.historyObj.length-1) * pos.spaceX;
		pos.x = -(pos.w/2);
	}

	for(var p=0; p<gameData.historyObj.length; p++){
		var targetPrize = gameData.historyObj[p];

		if(targetPrize.alpha == 0){
			targetPrize.x = pos.x;
			targetPrize.y = pos.y;
		}else{
			TweenMax.to(targetPrize, .2, {x:pos.x, y:pos.y});
		}
		
		if(viewport.isLandscape){
			pos.y += gameSettings.board.size + pos.spaceY;
		}else{
			pos.x += gameSettings.board.size + pos.spaceX;
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
function updateGame(){
	updatePhysics();
	
	if(!gameData.paused){
		checkDropPrize();	
	}
}

/*!
 * 
 * CHECK DROP PRIZES - This is the function that runs to check prize
 * 
 */
function checkDropPrize(){
	for(var b=0; b<gameData.ballArray.length; b++){
		var targetBall = gameData.ballArray[b];
		if(targetBall.y > $.prize[0].y && targetBall.active){
			var distanceArray = [];
			for(var p=0; p<gameData.prizeArray.length; p++){
				var thisPrize = $.prize[p];
				var checkDistance = getDistance(thisPrize, targetBall);
				distanceArray.push({index:p, distance:checkDistance})
			}

			sortOnObject(distanceArray, "distance");
			removeBall(b);
			if(distanceArray[0].distance < gameSettings.board.size){
				var collectPoint = 0;
				var isWinPoint = false;
				if(gameSettings.gamePlayType){
					collectPoint = gameSettings.chancesPoint * $.prize[distanceArray[0].index].valueArray[gameData.riskLevel];
					if(collectPoint > gameSettings.chancesPoint){
						gameData.winPoint += collectPoint - gameSettings.chancesPoint;
						isWinPoint = true;
					}
				}else{
					collectPoint = gameData.totalBet * $.prize[distanceArray[0].index].valueArray[gameData.riskLevel];
					if(collectPoint > gameData.totalBet){
						gameData.winPoint += collectPoint - gameData.totalBet;
						isWinPoint = true;
					}
				}
				
				gameData.historyArray.push($.prize[distanceArray[0].index].prizeIndex);
				updateWinHistory();
				animatePrize($.prize[distanceArray[0].index]);
				createWinText($.prize[distanceArray[0].index], collectPoint, isWinPoint);
			}
		}
	}

	if(gameData.dropCon){
		var totalFinishBalls = 0;
		for(var b=0; b<gameData.ballArray.length; b++){
			var targetBall = gameData.ballArray[b];
			if(!targetBall.active){
				totalFinishBalls++;
			}
		}

		if(totalFinishBalls == gameData.ballArray.length){
			gameData.dropCon = false;
			checkWinPoint();
		}
	}
}

function animatePrize(obj){
	var tweenSpeed = .2;
	TweenMax.to(obj, tweenSpeed, {y:obj.oriY + gameSettings.board.size/3, ease:Sine.easeIn, overwrite:true, onComplete:function(){
		TweenMax.to(obj, tweenSpeed, {y:obj.oriY, ease:Sine.easeOut, overwrite:true, onComplete:function(){
			
		}});
	}});

	var tweenSpeed = .2;
	TweenMax.to(obj.bgWin, tweenSpeed, {alpha:1, ease:Sine.easeIn, overwrite:true, onComplete:function(){
		TweenMax.to(obj.bgWin, tweenSpeed, {delay:tweenSpeed, alpha:0, ease:Sine.easeOut, overwrite:true, onComplete:function(){
			
		}});
	}});
}

function createWinText(obj, value, isWinPoint){
	var newText = new createjs.Text();
	newText.font = gameSettings.board.notiFontSize + "px azonixregular";
	if(isWinPoint){
		newText.color = gameSettings.board.notiColor[0];
		playSound("soundScore");
	}else{
		newText.color = gameSettings.board.notiColor[1];
		playSound("soundNoScore");
	}
	newText.textAlign = "center";
	newText.textBaseline='alphabetic';
	newText.text = textDisplay.collectPrize.replace('[NUMBER]', addCommas(value));
	newText.x = obj.x;
	newText.y = obj.y - (gameSettings.board.size/2);

	TweenMax.to(newText, .7, {y:newText.y-30, alpha:0, ease:Circ.easeIn, overwrite:true});
	plinkoWinContainer.addChild(newText);
}

/*!
 * 
 * CHECK WIN POINT - This is the function that runs to check win point
 * 
 */
function checkWinPoint(){
	if(gameData.winPoint > 0){
		//win
		toggleGameStatus(textDisplay.won.replace('[NUMBER]', addCommas(Math.floor(gameData.winPoint))));
		playerData.score += gameData.winPoint;
		TweenMax.to(playerData, 1, {point:playerData.score, overwrite:true, onUpdate:updateStats});
		playSound('soundWin');
	}else{
		//no win
		toggleGameStatus(textDisplay.lose);
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
	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		if(!gameData.physicsEngine){
			var returnPoint = {
				chance:playerData.chance,
				point:playerData.score,
				score:playerData.score
			};
			matchUserResult(undefined, returnPoint);
		}else{
			var postData = {
				bet:playerData.bet,
				win:gameData.winPoint,
				status:"drop_end",
			}
			updateUserPoint(undefined, postData);
		}
	}
	
	gameData.fixedResult = [];
	gameData.dropCon = false;
	buttonBlankTxt.text = textDisplay.buttonPlay;

	if(gameSettings.gamePlayType){
		if(playerData.chance <= 0){
			toggleGameStatus(textDisplay.gameOver);
			TweenMax.to(gameData, 3, {overwrite:true, onComplete:function(){
				goPage('result');
			}});
		}
	}else{		
		if(playerData.score <= 0){
			toggleGameStatus(textDisplay.gameOver);
			TweenMax.to(gameData, 3, {overwrite:true, onComplete:function(){
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
function millisecondsToTimeGame(milli) {
	var milliseconds = milli % 1000;
	var seconds = Math.floor((milli / 1000) % 60);
	var minutes = Math.floor((milli / (60 * 1000)) % 60);
	
	if(seconds<10){
		seconds = '0'+seconds;  
	}
	
	if(minutes<10){
		minutes = '0'+minutes;  
	}
	
	return minutes+':'+seconds;
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
}

/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleSoundMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleSoundInMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleMusicMute(con){
	buttonMusicOff.visible = false;
	buttonMusicOn.visible = false;
	toggleMusicInMute(con);
	if(con){
		buttonMusicOn.visible = true;
	}else{
		buttonMusicOff.visible = true;	
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
function share(action){
	gtag('event','click',{'event_category':'share','event_label':action});
	
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	
	var title = '';
	var text = '';
	
	title = shareTitle.replace("[SCORE]", addCommas(playerData.score));
	text = shareMessage.replace("[SCORE]", addCommas(playerData.score));

	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'whatsapp' ){
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
	}
	
	window.open(shareurl);
}
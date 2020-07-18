const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p").innerHTML;
const originTextReplace = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const changeButton = document.querySelector("#change");
const theTimer = document.querySelector(".timer");
var naslov = document.querySelector("#naslovTabele");

var userOne = document.querySelector(".user1");
var scoreOne = document.querySelector(".score1");
var userTwo = document.querySelector(".user2");
var scoreTwo = document.querySelector(".score2");
var userThree = document.querySelector(".user3");
var scoreThree = document.querySelector(".score3");

var l1 = new leaderBoard([99,0,0,0], "Test");
var l2 = new leaderBoard([99,0,0,0], "Test");
var l3 = new leaderBoard([99,0,0,0], "Test");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;


// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
	if (time <= 0){
		time = "0" + time;
	}
	return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
	let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
	theTimer.innerHTML = currentTime;
	timer[3]++;

	timer[0] = Math.floor((timer[3]/100)/60);
	timer[1] = Math.floor((timer[3]/100) - timer[0] * 60);
	timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck(){
	let textEntered = testArea.value;
	let originTextMatch = originText.substring(0, textEntered.length);

	if(textEntered == originText){
		clearInterval(interval);
		testWrapper.style.borderColor = "#429890";
		submit();
	} else{
		if(textEntered == originTextMatch){
			testWrapper.style.borderColor = "#65ccf3";
		} else{
			testWrapper.style.borderColor = "#E95D0F";
		}
	}

}

// Start the timer:
function start(){
	let textEnteredLength = testArea.value.length;
	if (textEnteredLength === 0 && !timerRunning){
		timerRunning = true;
		interval = setInterval(runTimer, 10);
	}
}

//Change text:
function change(){
	originText = prompt('Please enter new text to compete for:');
	originTextReplace.innerHTML = originText;

	naslov.innerHTML = 'Leaderboard for: ' + originText;

	l1 = new leaderBoard([99,0,0,0], "Test");
	l2 = new leaderBoard([99,0,0,0], "Test");
	l3 = new leaderBoard([99,0,0,0], "Test");
	printResults();

	reset();
}


// Reset everything:
function reset(){
	clearInterval(interval);
	interval = null;
	timer = [0,0,0,0];
	timerRunning = false;

	testArea.value = "";
	theTimer.innerHTML = "00:00:00";
	testWrapper.style.borderColor = "grey";
}

//Opens when win happens
function submit(){
	let finalTime = timer;
	let username = prompt('Please enter your username:');
	var newScore = new leaderBoard(finalTime, username);
	compareResults(newScore);
}

function compareResults(newS){

	if (JSON.stringify(l1.score) >= JSON.stringify(newS.score)){
		l3 = l2;
		l2 = l1;
		l1 = newS;
	} else if(JSON.stringify(l2.score) >= JSON.stringify(newS.score)){
		l3 = l2;
		l2 = newS;
	} else if (JSON.stringify(l3.score) >= JSON.stringify(newS.score)){
		l3 = newS;
	}

	printResults();
}

function leaderBoard(score, username){
	this.score = score;
	this.username = username;

}


function printResults(){
	userOne.innerHTML = l1.username;
	scoreOne.innerHTML = leadingZero(l1.score[0]) + ":" + leadingZero(l1.score[1]) + ":" + leadingZero(l1.score[2]);
	userTwo.innerHTML = l2.username;
	scoreTwo.innerHTML = leadingZero(l2.score[0]) + ":" + leadingZero(l2.score[1]) + ":" + leadingZero(l2.score[2]);
	userThree.innerHTML = l3.username;
	scoreThree.innerHTML = leadingZero(l3.score[0]) + ":" + leadingZero(l3.score[1]) + ":" + leadingZero(l3.score[2]);

}
printResults();

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
changeButton.addEventListener("click", change, false);
// Problem: 5 cards, need to be sorted in order from lowest to highest value.

/* 
Solution: Program that checks cards in pairs, and moves the higher value card in the pair to the right.
 		  Continually passes until it completes an entire pass with all cards sorted (none move).
*/


// Function to return a random integer. Max value is exclusive, i.e. to return values 1-10, use min 1, max 11

var getRandomInt = function(min, max) {
	return Math.floor( Math.random() * (max-min) ) + min;
}


// Create a variable that contains an array of 5 random values to be compared.

var cardSort = new Array();
var arrayLength = 5;
var i = 0;

for (; i < arrayLength; i++) {
	cardSort[i] = getRandomInt(1,11);
}

// Log the creation of the array of 5 integers in the console.

var logText = "";
i = 0;

for (; i < arrayLength; i++) {
	logText += cardSort[i] + ", ";
}

console.log("Starting Values: \t" + logText);


// Sort the array using a functions that compares values in pairs, shifting the higher value to the right.

i = 0;
var didSwap = true;
var temp;
for(; i < arrayLength && didSwap; i++) {
	didSwap = false;
	var j = 0;
	for(; j < (arrayLength - 1); j++) {
		if(cardSort[j] > cardSort[j+1]) {
			temp = cardSort[j];
			cardSort[j] = cardSort[j+1];
			cardSort[j+1] = temp;
			didSwap = true;
		}
	}

	logText = "New Order: \t\t";
	k = 0;
	for(; k < arrayLength; k++) {
		logText += cardSort[k] + ", ";
	}
	console.log(logText);
}



























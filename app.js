let calculatorContainer = document.querySelector('.calculator-container');
let display = document.querySelector('.display');
let currentNumber;
let previousNumber;
let chosenOperation;
let finalResult;



calculatorContainer.addEventListener('click', function(e) {

	// establish control flow based on button clicked inside calculator
	switch(true) {
		case e.target.classList.contains('number'):
			
			//check if the input has started
			if(currentNumber === undefined) {
				currentNumber = e.target.textContent;
				display.textContent = currentNumber;
				

			} else if(currentNumber !== undefined ) {

				//check if number length is about to be too long for the display screen
				if(currentNumber.length < 11) {
					currentNumber += e.target.textContent;
					display.textContent = currentNumber;
				} else {
					currentNumber += e.target.textContent;
					display.textContent = currentNumber.charAt(0) + 'e+' + (currentNumber.length - 1);
				}
				
			} 

			break;

		case e.target.classList.contains('operate'):
			
			//check if first number has been inputted if this is beginning of new equation
			if(currentNumber === undefined && finalResult === undefined) {
				alert('Please click a number first!')
			} else if(currentNumber === undefined && finalResult !== undefined){
				chosenOperation = e.target.textContent;
			}

			 else {
				chosenOperation = e.target.textContent;
				previousNumber = currentNumber;
				currentNumber = undefined;
			}

			break;
	
		case e.target.classList.contains('calculate'):
			// check if previous, chosenOperation, and current are defined
			if(currentNumber && previousNumber && chosenOperation) {

				finalResult = eval(previousNumber + chosenOperation + currentNumber);
				console.log(finalResult);
				//convert finalResult to string to check length and update display
				let finalResultString = finalResult.toString();



				//check if finalResult is too long of a number for the display 
				if(finalResultString.length >= 11) {

					if(finalResultString.includes('e-')){
						display.textContent = finalResultString.charAt(0) + 'e-' + (finalResultString.length - 1);
						previousNumber = finalResult;
						currentNumber = undefined;
						chosenOperation = undefined;
					} else if (finalResultString.includes('e+')) {
						display.textContent = finalResultString.charAt(0) + 'e+' + (finalResultString.length - 1);
						previousNumber = finalResult;
						currentNumber = undefined;
						chosenOperation = undefined;
					} else if (finalResult < 1 && finalResult > 0) {
						let search = /[1-9]/g;
						let result = finalResultString.match(search);
						let beginningDigit = result[0];
						let place = finalResultString.indexOf(beginningDigit)
						let decimalPlace = finalResultString.indexOf('.');

						display.textContent = beginningDigit + 'e-' + ((place - decimalPlace).toString());
						previousNumber = finalResult;
						currentNumber = undefined;
						chosenOperation = undefined;


						console.log(result);
						console.log(place);
						console.log(decimalPlace);
						console.log(place - decimalPlace);
					} else if(finalResult > -1 && finalResult < 0) {
						let search = /[1-9]/g;
						let result = finalResultString.match(search);
						let beginningDigit = result[0];
						let place = finalResultString.indexOf(beginningDigit)
						let decimalPlace = finalResultString.indexOf('.');

						display.textContent = '-' + beginningDigit + 'e-' + ((place - decimalPlace).toString());
						previousNumber = finalResult;
						currentNumber = undefined;
						chosenOperation = undefined;
					}
					
				} else {
					display.textContent = finalResult;
					previousNumber = finalResult;
					currentNumber = undefined;
					chosenOperation = undefined;
				}
			}

			break;

		case e.target.classList.contains('clear'):

			//clear display and reset all variables to undefined
			display.textContent = 0;
			previousNumber = undefined;
			currentNumber = undefined;
			chosenOperation = undefined;
			finalResult = undefined;
			break;

		case e.target.classList.contains('sign'):

			// toggle between positive and negative signs
			if(currentNumber) {
				currentNumber *= -1;
				display.textContent = currentNumber;
			} else if (finalResult) {
				finalResult *= -1;
				previousNumber = finalResult;
				currentNumber = undefined;
				chosenOperation = undefined;
				display.textContent = finalResult;
			} else {
				alert('Please enter a number first!')
			}
			break;

		case e.target.classList.contains('percent'):

			// convert number to percentage of itself
			if(currentNumber) {
				currentNumber /= 100;
				display.textContent = currentNumber;
			} else if(finalResult) {
				finalResult /= 100;
				previousNumber = finalResult;
				display.textContent = finalResult;
			} else {
				alert('Please enter a number first!')
			}
			break;

		case e.target.classList.contains('period'):

			// add decimal
			if(currentNumber && (currentNumber % 1) === 0 && !currentNumber.includes(".")) {
				currentNumber += '.';
				display.textContent = currentNumber;
			} else {
				alert('Please enter a preceding digit first!')
			}
	} 	


});



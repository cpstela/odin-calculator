const screen = document.querySelector('.item-screen');

let num1 = '';
let num2 = '';
let operator = '';
let result = '';
let displayValue = '';
screen.textContent = 0;

const buttons = Array.from(document.querySelectorAll('.btn-base'));
buttons.forEach(button => button.addEventListener('click', function(){processInput(button.getAttribute('id'))}));


function processInput(id) {
  switch (id) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9': 
    case '.': 
      if(!(id === '.' && displayValue.includes('.'))){ 
        displayValue += id;
        if(operator === ''){
        num1 = displayValue; 
        }else{
        num2 = displayValue; 
        }
        result = '';  
        display(displayValue);
      }
      break;
    case '+':
    case '-':
    case '*':
    case '/': 
      if(num1 !== '' && num2 !== '' && operator !== '') { //If we are concatenating operations, calculate what we already have
        operate(operator, num1, num2);
      }  
      operator = id;
      displayValue= '';
      if (result !== '') { //If there's a result it becomes num1 of the next operation
        num1 = result;
        result = ''; 
      }
      screen.textContent = operator;
      break;
    case 'equals':
      if(num1 !== '' && num2 !== '' && operator !== '') {
        operate(operator, num1, num2);
        display(result);
        num1 = '';
        num2 = '';
        operator = '';
        displayValue = result;
      };
      break;
    case 'backspace':
      backspace();
      break;
    case 'clear':    
      clear();
      break;
    default:
      alert("Can't process input.");
      break;    
  }
  toggleDot() //We enable or disable the button based on displayValue
}  


function operate(operator, num1, num2) {
  switch (operator) {
      case '+':
        result = +num1 + +num2; //The use of extra + prevents concatenation
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === '0') { //Prevent division by 0
          result = 0;
          alert("Are you crazy?");
        } else {
          result = num1 / num2;
        }
        break; 
      default:
        alert("Something went wrong.");
        break;
    }
}


function toggleDot() {
  if (displayValue.toString().includes('.')) {
    document.getElementById('.').classList.remove('btn-base'); //Disable . button
    document.getElementById('.').classList.add('btn-disabled');
    document.getElementById('.').disabled = true;
  } else {
    document.getElementById('.').classList.remove('btn-disabled'); //Enable . button
    document.getElementById('.').classList.add('btn-base');
    document.getElementById('.').disabled = false;
  }
}


function backspace() { 
  let withoutLast = displayValue.toString().slice(0, -1);  
  displayValue = withoutLast;

  if(result ==='' && operator ===''){ //is it num1?
    num1 = displayValue;
  } else if(result ==='' && num2 !== ''){ //or num2?
    num2 = displayValue
    if (num2 === ''){ 
      displayValue = operator;
    } 
  } else if(result ==='' && operator !=='' && num2 ==='') { //or operator?
    operator = displayValue;
    displayValue = num1;   
  } else { //or result?
    result = displayValue;
  }
  display(displayValue);
}


function clear() {
  num1 = '';
  num2 = '';
  operator = '';
  result = '';
  displayValue = '';
  screen.textContent = 0;
}


function display(number) {
  let shortenedNum= number.length > 9? number.slice(-9) : number; //Only show the last 9 digits so it doesn't overflow the screen
  
  if (shortenedNum.length === 0) { //If there are no digits, show a 0
    shortenedNum = 0;
  }


  if(number.toString().includes('.')){ //If it's a decimal show the first 9. We have to pad it first so we can use slice.
    let padded = number.toString().padEnd(9,' ');
    shortenedNum = padded.slice(0,9);
    shortenedNum = shortenedNum.trim();
  }

  screen.textContent = shortenedNum;
}


document.addEventListener('keydown', keySupport); //Keyboard suport
function keySupport(e) {
  switch(e.code) {
    case 'Numpad0':
    case 'Digit0':
      processInput('0');
      break
    case 'Numpad1':
    case 'Digit1':
      processInput('1');
      break
    case 'Numpad2':
    case 'Digit2':
      processInput('2');
      break   
    case 'Numpad3':
    case 'Digit3':
      processInput('3');
      break
    case 'Numpad4':
    case 'Digit4':
      processInput('4');
      break
    case 'Numpad5':
    case 'Digit5':
      processInput('5');
      break   
    case 'Numpad6':
    case 'Digit6':
      processInput('6');
      break
    case 'Numpad7':
    case 'Digit7':
      processInput('7');
      break
    case 'Numpad8':
    case 'Digit8':
      processInput('8');
      break   
    case 'Numpad9':
    case 'Digit9':
      processInput('9');
      break
    case 'NumpadAdd':
      processInput('+');
      break
    case 'NumpadSubtract':
      processInput('-');
      break   
    case 'NumpadMultiply':
      processInput('*');
      break
    case 'NumpadDivide':
      processInput('/');
      break
    case 'KeyE':
      processInput('equals');
      break   
    case 'Backspace':
      processInput('backspace');
      break
    case 'NumpadDecimal':
    case 'Period':
      processInput('.');
      break   
    case 'KeyC':
      processInput('clear');
      break                      
  }
}



//Pk porres pots posar diversos punts? Pk una cosa és deshabiltiat el botó i l'altra sumar els punts

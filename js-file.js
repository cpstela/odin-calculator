const screen = document.querySelector('.item-screen');

let num1 = '';
let num2 = '';
let operator = '';
let result = '';
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
      if(operator === ''){
        //add digit to num1
        if (id!== '.' || (id === '.' && num1.includes('.') )) { //If it's a . we check if there already was one
          num1 += id;
          num1 = parseInt(num1, 10).toString(); //We remove any leading 0 by turning it into an int, but then we turn it back to string
          display(num1);
        } 
      }else{
        //add digit to num2;
        if (id !== '.' || (id === '.' && num2.includes('.') )) { 
          num2 += id;
          num2 = parseInt(num2, 10).toString();
          display(num2);
        } 
      }
      result = '';  
      break;
    case '+':
    case '-':
    case '*':
    case '/':   
      operator = id;  
      screen.textContent = operator;
      if (result !== '') { //If there's a result it becomes num1 of the next operation
        num1 = result;
        result = ''; 
      }
      break;
    case 'equals':
      if(num1 !== '' && num2 !== '' && operator !== '') {
        operate(operator, num1, num2);
        console.log('ara result és ' + result)
        display(result);
        num1 = '';
        num2 = '';
        operator = '';
      };
      break;
    case '.': 
      addDot();
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
  document.getElementById(".").classList.remove("btn-disabled"); //We enable the . button again
  document.getElementById(".").classList.add("btn-base");
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
          alert('Are you crazy?');
        } else {
          result = num1 / num2;
        }
        break; 
      default:
        alert("Something went wrong.");
        break;
    }
}

function addDot() {
  if(result ==='' && operator ===''){ //is it num1?
    if (num1.includes(".")) {
      document.getElementById(".").classList.remove("btn-base");
      document.getElementById(".").classList.add("btn-disabled");
    }

  } else if(result ==='' && num2 !== ''){ //or num2?
    if (num2.includes(".")) {
      document.getElementById(".").classList.remove("btn-base");
      document.getElementById(".").classList.add("btn-disabled");
    }

  } else if(result ==='' && operator !=='' && num2 ==='') { //or operator?
    document.getElementById(".").classList.remove("btn-base");
    document.getElementById(".").classList.add("btn-disabled");

  } else { //or result?
    document.getElementById(".").classList.remove("btn-base");
    document.getElementById(".").classList.add("btn-disabled");
  }
}

function backspace() { 

  if(result ==='' && operator ===''){ //is it num1?
    let withoutLast = num1.slice(0, -1);  
    num1 = withoutLast;
    num1 === ''? display(0) : display (num1);

  } else if(result ==='' && num2 !== ''){ //or num2?
    let withoutLast= num2.slice(0, -1);  
    num2 = withoutLast;
    num2 === ''? display(symbol) : display (num2);

  } else if(result ==='' && operator !=='' && num2 ==='') { //or operator?
    let withoutLast= operator.slice(0, -1);  
    operator = withoutLast;
    display(num1);

  } else { //or result?
    let withoutLast= result.toString().slice(0, -1);  
    result= withoutLast;
    result === ''? display(0) : display (result);
  }
}


function clear() {
  num1 = '';
  num2 = '';
  operator = '';
  result = '';
  screen.textContent = 0;
}


function display(currentNumber) {
  let shortenedNum= currentNumber.length > 9? currentNumber.slice(-9) : currentNumber; //Only show the last 9 digits so it doesn't overflow the screen
  
  if (shortenedNum.length === 0) { //If there are no digits, show a 0
    screen.textContent = 0;
  }
  screen.textContent = shortenedNum;
}

//-Disable decimal si ja hi ha . I que torni a aparèixer quan toca.
//-Solucionar que els decimals de les divisions overflow the screen
//-Solucionar que encadenar diverses operacions et concatena strings
//-Solucionar que a partir de 17 (o sigui 18) surten 0 i e i coses rares
//-Simplificar l'if de display
//-Simplificar el codi duplicat d'afegir dígil a num1 i num2
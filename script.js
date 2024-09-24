let displayValue = '0';
let firstNumber = null;
let secondNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let temp;

function add(num1, num2){
    console.log(num1 + num2)
    return num1 + num2;
}
function subtract(num1, num2){
    return num1 - num2;
}
function multipy(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    if(num2 === 0){
        return 'Error, can\'t divide with 0'
    }
    return num1 / num2;
}
function operate(operator, num1, num2){
    switch(operator){
        case('+'):
            return add(num1, num2);
        case('-'):
            return subtract(num1, num2);
        case('*'):
            return multipy(num1, num2);
        case('/'):
            return divide(num1, num2)
        default:
            break
    } 
}

let display = document.querySelector('.display')

function updateDisplay(){
    console.log(displayValue)
    let rounded = Math.round(displayValue * 100) /100
    display.textContent = rounded;
}

function clearDisplay(){
    displayValue = '0';
    firstNumber = null;
    secondNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
}

function numberClicks(value){
    if (waitingForSecondNumber){
        displayValue = value
        waitingForSecondNumber = false;
    }else if(displayValue === '0'){
        displayValue = value
    }else{
        displayValue += value
    }
    updateDisplay()
}

function operatorClicks(op){
    operator = op;
    if(firstNumber === null){       //if first is null it takes the value of display
        firstNumber = parseFloat(displayValue)
    }else if(waitingForSecondNumber){     //if first number isnt default
        secondNumber = parseFloat(displayValue);    //second takes the display value after the operator
        firstNumber = operate(operator, firstNumber, secondNumber)  // result of the operation becomes the first number for the next operation
        displayValue = firstNumber.toString()
        updateDisplay()
    }
    waitingForSecondNumber = true;
}

const numberButtons = document.querySelectorAll('.number')
numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        numberClicks(e.target.getAttribute('id'))
    })
})

const decimalButton = document.querySelector('#decimal')
decimalButton.addEventListener('click', () => {
    if(displayValue.includes('.')){
        updateDisplay()
    }else{
        displayValue += '.'
        updateDisplay()
    }
})

const deleteButton = document.querySelector('#delete')
deleteButton.addEventListener('click', () => {
    displayValue = displayValue.slice(0,-1)
    updateDisplay()
})

const operatorButtons = document.querySelectorAll('.operator')
operatorButtons.forEach(button =>{
    button.addEventListener('click', (e) => {
        operatorClicks(e.target.getAttribute('id'))
    })
})

const equalsButton = document.querySelector('#equals')
equalsButton.addEventListener('click', () => {
    if(operator){
        secondNumber = parseFloat(displayValue); 
        firstNumber = operate(operator, firstNumber, secondNumber)  
        console.log(firstNumber)
        console.log(secondNumber)
        displayValue = firstNumber.toString()
        updateDisplay()
    };
})

const clearButton = document.querySelector('#clear')
clearButton.addEventListener('click', () => {
    clearDisplay()
})


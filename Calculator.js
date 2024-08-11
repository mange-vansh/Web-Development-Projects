let screen = document.querySelector("#screen");
let clear = document.querySelector("#clear");
let answer = document.querySelector("#answer");

let firstNumber = 0, secondNumber = 0, arithmeticOperation = null;

let buttons = {
    one: document.querySelector("#one"),
    two : document.querySelector("#two"),
    three: document.querySelector("#three"),
    four: document.querySelector("#four"),
    five: document.querySelector("#five"),
    six: document.querySelector("#six"),
    seven: document.querySelector("#seven"),
    eight: document.querySelector("#eight"),
    nine: document.querySelector("#nine"),
    zero: document.querySelector("#zero"),
    add: document.querySelector("#add"),
    subtract: document.querySelector("#subtract"),
    multiply: document.querySelector("#multiply"),
    divide: document.querySelector("#divide"),
    remainder: document.querySelector("#remainder"),
    delete: document.querySelector("#delete")
}

function handlingClicks(num){
    if(arithmeticOperation === null){
        if(num !== -1){
            firstNumber *= 10;
            firstNumber += num;
            screen.innerText = firstNumber;
        }
        else{
            let lastDigit = firstNumber % 10;
            firstNumber -= lastDigit;
            firstNumber /= 10;
            screen.innerText = firstNumber;
        }
    }
    else{
        if(num !== -1){
            secondNumber *= 10;
            secondNumber += num;
            screen.innerText = secondNumber;            
        }
        else{
            let lastDigit = secondNumber % 10;
            secondNumber -= lastDigit;
            secondNumber /= 10;
            screen.innerText = secondNumber;
        }
    }
}

buttons.one.addEventListener("click", function() {handlingClicks(1)});
buttons.two.addEventListener("click", function() {handlingClicks(2)});
buttons.three.addEventListener("click", function() {handlingClicks(3)});
buttons.four.addEventListener("click", function() {handlingClicks(4)});
buttons.five.addEventListener("click", function() {handlingClicks(5)});
buttons.six.addEventListener("click", function() {handlingClicks(6)});
buttons.seven.addEventListener("click", function() {handlingClicks(7)});
buttons.eight.addEventListener("click", function() {handlingClicks(8)});
buttons.nine.addEventListener("click", function() {handlingClicks(9)});
buttons.zero.addEventListener("click", function() {handlingClicks(0)});
buttons.add.addEventListener("click", function() {arithmeticOperation = "+"});
buttons.subtract.addEventListener("click", function() {arithmeticOperation = "-"});
buttons.multiply.addEventListener("click", function() {arithmeticOperation = "*"});
buttons.divide.addEventListener("click", function() {arithmeticOperation = "/"});
buttons.remainder.addEventListener("click", function() {arithmeticOperation = "%"});
buttons.delete.addEventListener("click", function() {handlingClicks(-1)});

answer.addEventListener("click", function(){
    let theAnswer = 0;

    switch(arithmeticOperation){
        case "+":
            theAnswer = firstNumber + secondNumber;
            break;
        case "-":
            theAnswer = firstNumber - secondNumber;
            break;
        case "*":
            theAnswer = firstNumber * secondNumber;
            break;
        case "/":
            if(secondNumber === 0){
                theAnswer = "Dividing by zero!?";
            }
            else{ 
                theAnswer = firstNumber / secondNumber;
            }
            break;
        case "%":
            theAnswer = firstNumber % secondNumber;
            break;
    }

    screen.innerText = theAnswer;
    firstNumber = (theAnswer === "Error") ? 0 : theAnswer;
    secondNumber = 0;
    arithmeticOperation = null;
});

clear.addEventListener("click", function(){
    screen.innerText = "";
    firstNumber = 0;
    secondNumber = 0;
    arithmeticOperation = null;
});
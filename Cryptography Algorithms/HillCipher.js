let encrypt = document.querySelector("#EncryptButton");
let decrypt = document.querySelector("#DecryptButton");
let div = document.querySelector("div");

let decryption = document.createElement("h2");
div.append(decryption);
let encryption = document.createElement("h2");
div.append(encryption);

let alphabets = [];

for(let i=97; i<123; i++){
    alphabets.push(String.fromCharCode(i));
}

encrypt.addEventListener("click", function(){
    let matrix = Array.from({ length: 3 }, () => Array(3).fill(0));

    let imp = giveMeTheKey(matrix);

    let message = document.querySelector("#message");
    let messageValue = message.value.toLowerCase();
    let lengthOfTheMessage = messageValue.length;
    let numberOfCols = 0;

    if(lengthOfTheMessage % imp[1] === 0){
        numberOfCols = lengthOfTheMessage / 3;
    }
    else{
        numberOfCols = Math.floor(lengthOfTheMessage/3) + 1;
    }

    console.log(matrix);

    let messageMatrix = Array.from({ length: imp[1] }, () => Array(numberOfCols).fill(0));

    creatingMessageMatrix(messageMatrix, messageValue, imp[1], numberOfCols);
});

function giveMeTheKey(matrix){
    let key = document.querySelector("#key");
    let keyValue = key.value.toLowerCase();
    let lengthOfTheKey = keyValue.length;
    let rows = lengthOfTheKey ** (1/2), cols = lengthOfTheKey ** (1/2);

    let index = 0;

    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            matrix[i][j] = alphabets.indexOf(keyValue[index]);
            index += 1;
        }
    }

    return [lengthOfTheKey, rows];
}

function creatingMessageMatrix(matrix, message, row, column){
    let messageLength = message.length;
    let index = 0;

    for(let i=0; i<row; i++){
        for(let j=0; j<column; j++){
            matrix[i][j] = message[index];
            index += 1;
        }
    }
}

function matrixMultiplication(matrix1, matrix2, matrix3, r1, c2){
    
}
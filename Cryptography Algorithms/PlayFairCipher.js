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

let rows = 5;
let cols = 5;

encrypt.addEventListener("click", function(){
    let matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
    PrepareTheMatrix(matrix);
    decryption.innerText = "";
    encryption.innerText = "";

    let encryptedText = finalAnswer(matrix, 0);

    let answer = encryptedText.join('');
    encryption.innerText = `The encrypted message is ${answer}`;

    createMatrixTable(matrix, 5, 5);
});

decrypt.addEventListener("click", function(){
    let matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
    PrepareTheMatrix(matrix);
    decryption.innerText = "";
    encryption.innerText = "";

    let decryptedText = finalAnswer(matrix, 1);

    let answer = decryptedText.join('');
    decryption.innerText = `The decrypted message is ${answer}`;

    createMatrixTable(matrix, 5, 5);
});

function PrepareTheMatrix(matrix){
    let keyword = document.querySelector("#keyword");

    let keywordValue = keyword.value.toLowerCase();
    let lengthOfTheKeyword = keywordValue.length;
    let r = 0, c = 0;

    for(let i=0; i<lengthOfTheKeyword; i++){
        let current = keywordValue[i];
        let existence = existsInTheArray(matrix, current);
        let needToIncrement = false;

        if(!existence){
            if(current === 'i'){
                matrix[r][c] = 'i';
                needToIncrement = true;
            }
            else if(current === 'j'){
                let doesIExist = existsInTheArray(matrix, 'i');
                if(!doesIExist){
                    matrix[r][c] = 'j';
                    needToIncrement = true;
                }
            }
            else{
                matrix[r][c] = current;
                needToIncrement = true;
            }

            if(needToIncrement){
                if(c === 4){
                    c = 0;
                    r += 1;
                }
                else{
                    c += 1;
                }
            }

            if (r >= rows) break;
        }
    }

    for(let k=0; k<26; k++){
        let currentChar = alphabets[k];
        let existence = existsInTheArray(matrix, currentChar);
        if(!existence && currentChar !== 'j'){
            matrix[r][c] = currentChar;

            if(c === 4){
                c = 0;
                r += 1;
            }
            else{
                c += 1;
            }

            if (r >= rows) break;
        }
    }
}

function existsInTheArray(arr, letter){
    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            if(arr[i][j] === letter){
                return true;
            }
        }
    }

    return false;
}

function createMatrixTable(matrix, rows, cols){
    let existingTable = document.querySelector("#matrixTable");
    if (existingTable) {
        existingTable.remove();
    }

    let table = document.createElement("table");
    table.setAttribute("id", "matrixTable");

    for (let i = 0; i < rows; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("td");
            cell.textContent = matrix[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    div.append(table);
}

function positionOfTheElement(matrix, element){
    let arr = [];
    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            if(matrix[i][j] === element){
                arr.push(i);
                arr.push(j);
                break;
            }
        }
    }

    return arr;
}

function finalAnswer(matrix, num){
    let message = document.querySelector("#message");
    let messageValue = message.value.toLowerCase();

    let theMessage = messageValue.split('');
    theMessage = theMessage.filter(function(el){
        return el !== ' ';
    });
    let lengthOfTheMessage = theMessage.length;
    let index = 0;

    while(index < lengthOfTheMessage){
        if(theMessage[index] === theMessage[index+1]){
            lengthOfTheMessage += 1;
            let toBeDeleted = theMessage[index+1];
            theMessage.splice(index+1,1,'x', toBeDeleted);
        }

        if(index === lengthOfTheMessage - 1){
            lengthOfTheMessage += 1;
            theMessage.push('x');
        }

        index += 2;
    }

    for(let i=0; i<lengthOfTheMessage; i+=2){
        let first = theMessage[i], second = theMessage[i+1];
        let firstPosition = positionOfTheElement(matrix, first), secondPosition = positionOfTheElement(matrix, second);
        let r1 = firstPosition[0], r2 = secondPosition[0], c1 = firstPosition[1], c2 = secondPosition[1];

        if(num === 0){
            if(r1 === r2){
                c1 = (c1+1) % 5;
                c2 = (c2+1) % 5;
            }
            else if(c1 === c2){
                r1 = (r1+1) % 5;
                r2 = (r2+1) % 5;
            }
            else{
                let temp = c1;
                c1 = c2;
                c2 = temp;
            }
        }
        else{
            if(r1 === r2){
                c1 = (c1-1+5) % 5;
                c2 = (c2-1+5) % 5;
            }
            else if(c1 === c2){
                r1 = (r1-1+5) % 5;
                r2 = (r2-1+5) % 5;
            }
            else{
                let temp = c1;
                c1 = c2;
                c2 = temp;
            }
        }

        theMessage[i] = matrix[r1][c1];
        theMessage[i+1] = matrix[r2][c2];
    }

    return theMessage;
}
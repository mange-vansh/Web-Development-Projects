let encrypt = document.querySelector("#EncryptButton");
let decrypt = document.querySelector("#DecryptButton");
let div = document.querySelector("div");

let encryption = document.createElement("h2");
let decryption = document.createElement("h2");

div.append(encryption);
div.append(decryption);

encrypt.addEventListener("click", function(){
    encryption.innerText = "";
    decryption.innerText = "";
    let depth = document.querySelector("#depth");
    let message = document.querySelector("#message");
    let depthValue = parseInt(depth.value);
    let messageValue = message.value;
    let lengthOfTheMessage = messageValue.length;

    let nonSpaceLength = 0;
    for(let q = 0; q < lengthOfTheMessage; q++){
        if(messageValue[q] !== ' '){
            nonSpaceLength++;
        }
    }

    let matrix = Array.from({ length: depthValue }, () => Array(nonSpaceLength).fill(0)); 
    let direction = 0;
    let index = 0;

    for(let i = 0, col = 0; i < lengthOfTheMessage; i++){
        let current = messageValue[i];
        if(current !== ' '){  
            matrix[index][col] = current;
            col++;  
            if(direction === 0){
                if(index === depthValue - 1){
                    direction = 1;
                    index -= 1;
                } else {
                    index += 1;
                }
            } else {
                if(index === 0){
                    direction = 0;
                    index += 1;
                } else {
                    index -= 1;
                }
            }
        }
    }

    let encryptmessage = [];

    for(let i = 0; i < depthValue; i++){
        for(let j = 0; j < nonSpaceLength; j++){
            if(matrix[i][j] !== 0){
                encryptmessage.push(matrix[i][j]);
            }
        }
    }

    let answer = encryptmessage.join('');

    encryption.innerText = `The encrypted message is ${answer}`;
    creatingTable(matrix, depthValue, nonSpaceLength);
});

decrypt.addEventListener("click", function(){
    encryption.innerText = "";
    decryption.innerText = "";
    let depth = document.querySelector("#depth");
    let message = document.querySelector("#message");
    let depthValue = parseInt(depth.value);
    let messageValue = message.value;
    let lengthOfTheMessage = messageValue.length;

    let matrix = Array.from({ length: depthValue }, () => Array(lengthOfTheMessage).fill(0));
    creatingEmptyMatrix(matrix, depthValue, lengthOfTheMessage);
    let answer = decryptingMatrix(matrix, depthValue, lengthOfTheMessage, messageValue);

    decryption.innerText = `The decrypted message is ${answer}`;
    creatingTable(matrix, depthValue, lengthOfTheMessage);
});

function creatingTable(matrix, depth, cols){
    let existingTable = document.querySelector("#myTable");
    if(existingTable){
        existingTable.remove();
    }

    let table = document.createElement("table");
    table.setAttribute("id", "myTable");

    for(let i = 0; i < depth; i++){
        let thisRow = document.createElement("tr");
        for(let j = 0; j < cols; j++){
            let thisColumn = document.createElement("td");
            if(matrix[i][j] !== 0){
                thisColumn.textContent = matrix[i][j];
            } else {
                thisColumn.innerHTML = '&nbsp;';
            }
            thisRow.appendChild(thisColumn);
        }
        table.appendChild(thisRow);
    }

    div.append(table);
}

function creatingEmptyMatrix(matrix, depth, cols){
    let index = 0, direction = 0;
    for(let i=0; i<cols; i++){
        matrix[index][i] = 1;
        if(direction === 0){
            if(index === depth - 1){
                direction = 1;
                index -= 1;
            }
            else{
                index += 1;
            }
        }
        else{
            if(index === 0){
                direction = 0;
                index += 1;
            }
            else{
                index -= 1;
            }
        }
    }
}

function decryptingMatrix(matrix, depth, cols, message){
    let index = 0;
    for(let i=0; i<depth; i++){
        for(let j=0; j<cols; j++){
            if(matrix[i][j] === 1){
                matrix[i][j] = message[index];
                index += 1;
            }
        }
    }

    index = 0;
    let direction = 0, decrypted = [];

    for(let k=0; k<cols; k++){
        decrypted.push(matrix[index][k]);
        if(direction === 0){
            if(index === depth - 1){
                direction = 1;
                index -= 1;
            }
            else{
                index += 1;
            }
        }
        else{
            if(index === 0){
                direction = 0;
                index += 1;
            }
            else{
                index -= 1;
            }
        }
    }

    let answer = decrypted.join('');

    return answer;
}
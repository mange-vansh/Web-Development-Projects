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
    decryption.innerText = "";
    encryption.innerText = "";
    let message = document.querySelector("#message");
    let key = document.querySelector("#key");
    let keyValue = parseInt(key.value);
    let messageValue = message.value.toLowerCase();
    let lengthOfTheMessage = messageValue.length;

    let encryptedMessage = [];

    for(let i=0; i<lengthOfTheMessage; i++){
        if(messageValue[i] !== ' '){
            let current = messageValue[i];
            let newCurrent = (alphabets.indexOf(current) + keyValue) % 26;

            encryptedMessage.push(alphabets[newCurrent]);
        }
        else{
            encryptedMessage.push(' ');
        }
    }

    let answer = encryptedMessage.join('');
    encryption.innerText = `The encrypted message is : ${answer}`;
});

decrypt.addEventListener("click", function(){
    decryption.innerText = "";
    encryption.innerText = "";
    let message = document.querySelector("#message");
    let key = document.querySelector("#key");
    let keyValue = parseInt(key.value);
    let messageValue = message.value.toLowerCase();
    let lengthOfTheMessage = messageValue.length;

    let decryptedMessage = [];

    for(let i=0; i<lengthOfTheMessage; i++){
        if(messageValue[i] !== ' '){
            let current = messageValue[i];
            let newCurrent = (alphabets.indexOf(current) - keyValue + 26) % 26;

            decryptedMessage.push(alphabets[newCurrent]);
        }
        else{
            decryptedMessage.push(' ');
        }
    }

    let answer = decryptedMessage.join('');
    decryption.innerText = `The decrypted message is : ${answer}`;
});
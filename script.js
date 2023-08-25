const lengthSlider= document.querySelector(".pass-length input"),

options= document.querySelectorAll(".option input"),

copyIcon=document.querySelector(".input-box span"),

passwordInput=document.querySelector(".input-box input"),

passIndicator=document.querySelector(".pass-indicator "),

generateBtn = document.querySelector(".generate-btn");

const characters= {//object of letter,num,symbols
    lowercase:  "abcdefghijklmnopqrstuvwxyz",
    uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*"
}

function updateSlider(){
    //passing slider value as counter text
    document.querySelector(".pass-length span").innerText=lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
function updatePassIndicator(){
    if (lengthSlider.value <= 8) {
        passIndicator.id="weak";
        
    } else if(lengthSlider.value <= 16) {
        passIndicator.id="medium";

    } else if(lengthSlider.value <= 24) {
        passIndicator.id="strong";

    }else{
        passIndicator.id="verystrong";
    }
}
function  generatePassword(){
    let staticPassword = "",
    randompassword="",
    excludeDuplicate=false,
    passlength=lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id !=="exc-duplicate"&&option.id !=="spaces") {
                staticPassword += characters[option.id];            

            }
            else  if (option.id === "spaces") {
                staticPassword += '  ${staticPassword} ';
            }
            else{
                excludeDuplicate= true;
 
            }
        }

    });

    for (let i = 0; i < passlength; i++) {
        let randomchar =  staticPassword[Math.floor(Math.random()*staticPassword.length)];
        if (excludeDuplicate) {
            if (!randompassword.includes(randomchar) ||  randomchar==" ") {
                randompassword += randomchar;
            }
            else{
                i--;
            }
        }
        else{
            randompassword += randomchar;
        }
    }
    passwordInput.value=randompassword;
}
updateSlider();
function copyPassword(){
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText="!";
    setTimeout(() => {
        copyIcon.innerText="[]";
    },1500);
}
copyIcon.addEventListener("click",copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);




























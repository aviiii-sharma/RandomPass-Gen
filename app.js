const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "0123456789";
const symbolSet = "!@#$%&*_";

const passBox = document.getElementById("pass-box");
const totalChar = document.getElementById("total-char");
const upperInput = document.getElementById("upper-case"); 
const lowerInput = document.getElementById("lower-case");
const numberInput = document.getElementById("numbers");
const symbolInput = document.getElementById("symbols");

const getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)]
}


const generatePassword = (password = "" ) => {
    if (upperInput.checked) {
        password += getRandomData(upperSet)
    }
    if (lowerInput.checked) {
        password += getRandomData(lowerSet)
    }
    if (numberInput.checked) {
        password += getRandomData(numberSet)
    }
    if (symbolInput.checked) {
        password += getRandomData(symbolSet)
    }
    if (password.length < totalChar.value) {
        return generatePassword(password);
    }

    var pass = (truncateString(password, totalChar.value));
    passBox.innerText = pass;
    navigator.clipboard.writeText(pass);

    passBox.value = pass;
    passBox.setAttribute("data-value", pass);
}

const button = document.getElementById("btn");

button.addEventListener("click", function(){
    generatePassword();
   
})

generatePassword();

function truncateString(str, num) {
    if (str.length > num) {
        let subStr = str.substring(0, num);
        return subStr;
    } else {
        return str;
    }
}
  
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

button.addEventListener('click', event => {
    let iterations = 0;
    const interval = setInterval(() => {
        passBox.innerText = passBox.innerText.split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return passBox.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iterations >= passBox.dataset.value.length) {
            clearInterval(interval);
        }
        iterations += 1 / 3;
    }, 30);
});
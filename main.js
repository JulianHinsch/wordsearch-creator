function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function generate2dNullArray(width, height) {
    return new Array(height).fill(new Array(width).fill(null));
}

function createCharArray(width, height, wordArr) {
    const result = generate2dNullArray(width, height);


    //word placement logic here...


    wordArr.forEach(function(word) {

    })


    return result;
}

function createWordSearch({ width, height, wordArr }) {
    const charArray = createCharArray(width, height, wordArr);
    const tbody = document.createElement('tbody');
    for (let i = 0; i < charArray.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < charArray[i].length; j++) {
            let td = document.createElement('td');
            td.innerHTML = charArray[i][j] || getRandomLetter();
            tr.appendChild(td);
        }
        tbody.appendChild(tr)
    }
    const table = document.createElement('table');    
    table.appendChild(tbody);
    const output = document.getElementById('output');    
    output.appendChild(table);
}

function validateWords(wordArr, maxDimension) {
    for(let i = 0; i < wordArr.length; i++) {
        if(wordArr[i].length > maxDimension) {
            alert('You entered a word that was too long.');
            return false;
        }
    }
    return true;
}

function validateDimensions(width, height) {
    if(width >= 15 && width <= 30 && height >= 15 && height <= 30;) {
        return true;
    } else {
        alert('You entered an invalid dimension.')
        return false;
    }
}

function validateForm({ width, height, wordArr }) {
    const maxDimension = Math.max(width, height);
    return validateDimensions(width, height) && validateWords(wordArr, maxDimension);
}

function parseWords(rawInput) {
    rawInput = rawInput.replace(/[^a-zA-Z]/g, ","); //remove non letters
    wordArr = rawInput.split(',');
    wordArr = wordArr.filter(word => word); //remove empty strings
    wordArr = wordArr.map(word => word.toLowerCase());
    return wordArr;
}

function handleFormSubmit(event) {
    event.preventDefault();
    const formData = {
        width: parseInt(event.target[0].value),
        height: parseInt(event.target[1].value),
        wordArr: [...parseWords(event.target[2].value)],
    }
    console.log(formData);
    if(validateForm(formData)) {
        createWordSearch(formData);
    }
}

document.onreadystatechange = function() {
    if(document.readyState === 'complete') {
        window.addEventListener('submit', handleFormSubmit)          
    }
}

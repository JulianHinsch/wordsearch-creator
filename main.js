function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function generate2dNullArray(width, height) {
    const result = [];
    for (let i = 0; i < height; i++) {
        result.push(new Array(width).fill(null));
    }
    return result;
}

function createCharArray(width, height, wordArr) {
    const result = generate2dNullArray(width, height);
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
    for(let word in wordArr) {
        if(word.length > maxDimension) {
            throw new Error('You entered a word that was too long.');
            return false;
        }
    }
    return true;
}

function validateDimensions(width, height) {
    return width >= 15 && width <= 30 && height >= 15 && height <= 30;
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
        width: event.target[0].value,
        height: event.target[1].value,
        words: [...parseWords(event.target[2].value)],
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

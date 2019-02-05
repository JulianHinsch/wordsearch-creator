function getRandomIndex(max) {
    return Math.floor(Math.random() * max)
}

function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet.charAt(getRandomIndex(alphabet.length));
}

function generate2dNullArray(width, height) {
    //callback instantiates a new array every time
    return Array(height).fill(null).map(row => Array(width).fill(null));
}

function getRandomIterators() {
    const iterators = [[-1,0],[1,0],[0,1],[0,-1],[-1,1],[-1,-1],[1,1],[1,-1]];
    return iterators[getRandomIndex(iterators.length)];
}

function placeWord(word, charArray) {
    randomX = getRandomIndex(charArray[0].length);
    randomY = getRandomIndex(charArray.length);
    iterators = getRandomIterators();
    for(let i=0; i < word.length; i++) {
        selectedChar = charArray[randomY + (iterators[0]*i)][randomX + (iterators[1]*i)];
        if(selectedChar === null || selectedChar == word.charAt(i)) {
            continue;
        } else {
            throw(new Error())
        }
    }
    for(let i=0; i < word.length; i++) {
        let yPos = randomY + (iterators[0]*i);
        let xPos = randomX + (iterators[1]*i);
        charArray[yPos][xPos] = word.charAt(i); 
    }
    return charArray;
}

function createCharArray({ width, height, wordArr }) {
    var charArray = generate2dNullArray(width, height);
    for (let i = 0; i < wordArr.length; i++) {
        let isPlaced = false;
        while(!isPlaced) {
            try {
                charArray = placeWord(wordArr[i], charArray);
                isPlaced = true;
            } catch(err) {
                continue;
            }
        }
    }
    return charArray;
}

function appendWordSearch(charArray) {
    const output = document.getElementById('output');    
    const table = document.createElement('table'); 
    const tbody = document.createElement('tbody');
    for (let i = 0; i < charArray.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < charArray[i].length; j++) {
            let td = document.createElement('td');
            if(charArray[i][j]) {
                td.innerHTML = charArray[i][j];
                td.className = 'flagged';
            } else {
                td.innerHTML = getRandomLetter();
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr)
    }
    table.appendChild(tbody);
    handleReset();
    output.appendChild(table);
}

function appendSolveButton() {
    const output = document.getElementById('output');    
    output.insertAdjacentHTML("beforeend","<button id='solve' type='button'>Reveal Words</button>");
    document.getElementById('solve').addEventListener('click', revealSolution);
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
    if(width >= 15 && width <= 30 && height >= 15 && height <= 30) {
        return true;
    } else {
        alert('You entered an invalid dimension.')
        return false;
    }
}

function validateFormData({ width, height, wordArr }) {
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
    if(validateFormData(formData)) {
        charArray = createCharArray(formData)
        appendWordSearch(charArray);
        appendSolveButton();
    }
}

function handleReset(event) {
    document.getElementById('output').innerHTML = '';
}

function revealSolution() {
    var all = document.getElementsByClassName('flagged');
    for (let i = 0; i < all.length; i++) {
      all[i].style.color = 'red';
    }
}

document.onreadystatechange = function() {
    if(document.readyState === 'complete') {
        window.addEventListener('submit', handleFormSubmit)
        window.addEventListener('reset', handleReset)         
    }
}
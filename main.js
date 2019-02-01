function getRandomIndex(max) {
    return Math.floor(Math.random() * max)
}

function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet.charAt(getRandomIndex(alphabet.length));
}

function generate2dNullArray(width, height) {
    return new Array(height).fill(new Array(width).fill(null));
}

function getIterators(direction) {
    return ({
        'l':[-1,0],
        'r':[1,0],
        'u':[0,1],
        'd':[0,-1],
        'lu':[-1,1],
        'ld':[-1,-1],
        'ru':[1,1],
        'rd':[1,-1],
    }[direction]);
}

function placeWord(word, charArray) {
    const directions = ['l','r','u','d','lu','ld','ru','rd'];
    randomDirection = directions[getRandomIndex(directions.length)];
    randomX = getRandomIndex(charArray[0].length);  //TODO test
    randomY = getRandomIndex(charArray.length); //TODO test
    iterators = getIterators(randomDirection);
    for(let i=0; i < word.length; i++) {
        selectedChar = charArray[randomY + (iterators[0]*i)][randomX + (iterators[1]*i)];
        if(selectedChar === null || selectedChar === word.charAt(i)) {
            continue;
        } else {
            throw(err)
        }
    }
    for(let i=0; i < word.length; i++) {
        charArray[randomY + (iterators[0]*i)][randomX + (iterators[1]*i)] = word.charAt(i);
    }
    console.log(charArray);
    return charArray;
}

function createCharArray({ width, height, wordArr }) {
    var charArray = generate2dNullArray(width, height);
    wordArr.forEach(function(word) {
        isPlaced = false;
        while(!isPlaced) {
            try {
                charArray = placeWord(word, charArray);
                isPlaced = true;
            } catch(err) {
                continue;
            }
        }
        console.log('Word placed');
    })
    return charArray;
}

function placeWordSearch(charArray) {
    const output = document.getElementById('output');    
    const table = document.createElement('table'); 
    const tbody = document.createElement('tbody');
    for (let i = 0; i < charArray.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < charArray[i].length; j++) {
            let td = document.createElement('td');
            //td.innerHTML = charArray[i][j] || getRandomLetter();
            td.innerHTML = charArray[i][j];
            tr.appendChild(td);
        }
        tbody.appendChild(tr)
    }
    table.appendChild(tbody);
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

//event handler
function handleFormSubmit(event) {
    event.preventDefault();
    const formData = {
        width: parseInt(event.target[0].value),
        height: parseInt(event.target[1].value),
        wordArr: [...parseWords(event.target[2].value)],
    }
    if(validateFormData(formData)) {
        charArray = createCharArray(formData)
        placeWordSearch(charArray);
    }
}

document.onreadystatechange = function() {
    if(document.readyState === 'complete') {
        window.addEventListener('submit', handleFormSubmit)          
    }
}

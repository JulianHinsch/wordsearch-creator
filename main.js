function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function createWordSearch(width, height, words) {
    const tbody = document.createElement('tbody');
    for (let i = 0; i < height; i++) {
        let tr = document.createElement('tr');
        for (let i = 0; i < array.length; i++) {
            let td = document.createElement('td');
            td.innerHTML = getRandomLetter();
            tr.appendChild(td);
        }
        tbody.appendChild(tr)
    }
    const table = document.createElement('table');    
    table.appendChild(tbody);
    const output = document.getElementById('output');    
    output.appendChild(table);
}

function validateWords(words, maxDimension) {
    for(let word in words) {
        if(word.length > maxDimension) {
            throw new Error('You entered a word that was too long.');
            return false;
        }
    }
    return true;
}

function validateDimensions(width, height) {
    return width >= 15 && width <= 45 && height >= 15 && height <= 45;
}

function validateForm({ width, height, words }) {
    const maxDimension = Math.max(width, height);
    return validateDimensions(width, height) && validateWords(words, maxDimension);
}

function parseWords(rawInput) {
    rawInput = rawInput.replace(/[^a-zA-Z]/g, ","); //remove non letters
    words = rawInput.split(',');
    words = words.filter(word => word); //remove empty strings
    words = words.map(word => word.toLowerCase());
    return words;
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
        console.log('form validated');
        createWordSearch(formData);
    }
}

function main() {
    window.addEventListener('submit', handleFormSubmit);
}

document.onreadystatechange = function() {
    if(document.readyState === 'complete') {
        try {
            main();            
        } catch (err) {
            alert('Error:', err.message);
        }
    }
}

const fs = require('fs');

function getWords(filename='/usr/share/dict/words') {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split('\n').map(word => word.toUpperCase());
}

function sortLetters(word) {
    return word.split('').sort().join('');
}

function createDict(words) {
    const Dict = {};
    for (let word of words) {
        const sortedWord = sortLetters(word);
        if (Dict[sortedWord]) {
            Dict[sortedWord].push(word);
        } else {
            Dict[sortedWord] = [word];
        }
    }
    return Dict;
}

function solveOneJumble(word, Dict) {
    const sortedWord = sortLetters(word);
    return Dict[sortedWord] || [];
}

function solveJumble(jumble, circles, final, Dict) {
    let finalLetters = '';
    for (let i = 0; i < jumble.length; i++) {
        const solutions = solveOneJumble(jumble[i], Dict);
        console.log(`Jumble ${i+1}: ${jumble[i]} => ${solutions.join(' or ')}`);
        for (let j = 0; j < solutions[0].length; j++) {
            if (circles[i][j] === 'O') {
                finalLetters += solutions[0][j];
            }
        }
    }
    const finalAns = solveOneJumble(finalLetters, Dict);
    console.log(`Final Jumble: ${finalLetters} => ${finalAns.join(' or ')}`);
}

// Test cases
const words = getWords();
const Dict = createDict(words);

const jumble1 = ['ACOME', 'FEROC', 'REDDEG', 'YURFIP'];
const circles1 = ['___O_', '__OO_', 'O_O___', 'O__O__'];
const final1 = ['OOOOOOO'];
console.log('=== WORD JUMBLE TEST CASE 1 ===');
solveJumble(jumble1, circles1, final1, Dict);

const jumble2 = ['TARFD', 'JOBUM', 'TENJUK', 'LETHEM'];
const circles2 = ['____O', '_OO__', '_O___O', 'O____O'];
const final2 = ['OOOO', 'OOO'];
console.log('\n=== WORD JUMBLE TEST CASE 2 ===');
solveJumble(jumble2, circles2, final2, Dict);

const jumble3 = ['LAISA', 'LAURR', 'BUREEK', 'PROUOT'];
const circles3 = ['_OOO_', 'O_O__', 'OO____', '__O_OO'];
const final3 = ['OOOOO', 'OOOOO'];
console.log('\n=== WORD JUMBLE TEST CASE 3 ===');
solveJumble(jumble3, circles3, final3, Dict);

const jumble4 = ['TEFON', 'SOKIK', 'NIUMEM', 'SICONU'];
const circles4 = ['__O_O', 'OO_O_', '____O_', '___OO_'];
const final4 = ['OO', 'OOOOOO'];
console.log('\n=== WORD JUMBLE TEST CASE 4 ===');
solveJumble(jumble4, circles4, final4, Dict);

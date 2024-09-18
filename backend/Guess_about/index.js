import fs from 'fs';
import readline from 'readline';

// Load data
const data = JSON.parse(fs.readFileSync('C:/GitHub/proyecto-3-geographle/data/Guess_about.json', 'utf8'));

// Create an interface for reading input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask a question and wait for the user's response
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// Function to get a random country
function getRandomCountry() {
    const countries = data.countries; // Access the countries array
    return countries[Math.floor(Math.random() * countries.length)];
}

// Function to get the country from the flag
function getCountryFromCountryId(country_id) {
    const country = data.countries.find(item => item.country_id === country_id);
    return country ? country.name : null;
}

// Function to get options for the given country
function getOptions(correctCountry) {
    const countries = data.countries.map(item => item.name);
    let options = new Set();

    // Add correct country
    options.add(correctCountry);

    // Add random countries
    while (options.size < 4) {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        options.add(randomCountry);
    }

    return Array.from(options).sort();
}

// Function to get the correct answer for the next round
function getCorrectAnswer(questionPrefix, country) {
    const info = data.countries.find(item => item.name === country);
    if (!info) return null;

    if (questionPrefix === 'What is the capital of ') {
        return info.capital;
    } else if (questionPrefix === 'What is the official language of ') {
        return info.language;
    }
    return null;
}

// Function to get options for the next round
function getOptionsForNextRound(questionPrefix, country) {
    const allOptions = [];
    const info = data.countries.find(item => item.name === country);
    if (!info) return [];

    if (questionPrefix === 'What is the capital of ') {
        allOptions.push(info.capital);
        // Add random capitals
        while (allOptions.length < 4) {
            const randomCountry = data.countries[Math.floor(Math.random() * data.countries.length)];
            if (randomCountry.name !== country && !allOptions.includes(randomCountry.capital)) {
                allOptions.push(randomCountry.capital);
            }
        }
    } else if (questionPrefix === 'What is the official language of ') {
        allOptions.push(info.language);
        // Add random languages
        while (allOptions.length < 4) {
            const randomCountry = data.countries[Math.floor(Math.random() * data.countries.length)];
            if (randomCountry.name !== country && !allOptions.includes(randomCountry.language)) {
                allOptions.push(randomCountry.language);
            }
        }
    }

    return allOptions.sort();
}

// Function to play the game
async function playGame() {
    let currentCountry = null;
    let countryGuessedCorrectly = false;

    // Continue looping until the user guesses the country correctly
    while (!countryGuessedCorrectly) {
        const country = getRandomCountry();
        const correctCountry = getCountryFromCountryId(country.country_id);

        if (!correctCountry) {
            console.error('Failed to get the correct country for the flag.');
            return;
        }

        const options = getOptions(correctCountry);
        if (!options || options.length === 0) {
            console.error('Failed to get options.');
            return;
        }

        const question = `Which country does this flag belong to?\nOptions: ${JSON.stringify(options)}\nYour answer: `;
        let answer = await askQuestion(question);

        // Normalize the answer
        answer = answer.trim().toLowerCase();

        if (answer === correctCountry.toLowerCase()) {
            console.log('Correct answer! Moving to the next round.');
            currentCountry = correctCountry;
            countryGuessedCorrectly = true;
        } else {
            console.log('Wrong answer! Try again.');
        }
    }

    // Proceed to next rounds with the correctly guessed country
    await askNextRound('What is the capital of ', currentCountry);
    await askNextRound('What is the official language of ', currentCountry);

    rl.close();
}

// Function to ask the next round of questions
async function askNextRound(questionPrefix, country) {
    const correctAnswer = getCorrectAnswer(questionPrefix, country);
    const options = getOptionsForNextRound(questionPrefix, country);

    if (!correctAnswer) {
        console.error('Failed to get the correct answer for the next round.');
        return;
    }

    if (!options || options.length === 0) {
        console.error('Failed to get options for the next round.');
        return;
    }

    const question = `${questionPrefix}${country}?\nOptions: ${JSON.stringify(options)}\nYour answer: `;
    let answer = await askQuestion(question);

    // Normalize the answer
    answer = answer.trim().toLowerCase();

    if (answer === correctAnswer.toLowerCase()) {
        console.log('Correct answer! Moving to the next round.');
    } else {
        console.log('Wrong answer! Try again.');
        await askNextRound(questionPrefix, country);  // Repeat until correct
    }
}

// Start the game
playGame();


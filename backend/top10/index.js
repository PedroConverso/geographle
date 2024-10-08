import fs from 'fs';
import readline from 'readline';

let top10Data;
try {
  const data = fs.readFileSync('../data/Top_10.json', 'utf8');
  top10Data = JSON.parse(data);
} catch (err) {
  console.error('Error reading top10.json:', err.message);
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function selectRandomTopic() {
  const randomIndex = Math.floor(Math.random() * top10Data.top10.length);
  return top10Data.top10[randomIndex];
}
console.log(selectRandomTopic);
function findTopicForCountry(countryName) {
  for (const topic of top10Data.top10) {
    for (const item of topic.items) {
      if (item.name.toLowerCase() === countryName) {
        return topic.topic;
      }
    }
  }
  return null;
}

function startGame() {
  const selectedTopic = selectRandomTopic();
  console.log(`\n--- ${selectedTopic.topic} ---`);
  console.log('Guess the 10 countries related to this topic. Type "q" to quit.\n');

  const correctAnswers = selectedTopic.items.map(item => item.name.toLowerCase());
  const guessedCountries = new Set();

  function handleUserInput(input) {
    const trimmedInput = input.trim().toLowerCase();

    if (trimmedInput === 'q') {
      console.log('Thanks for playing! Goodbye.');
      rl.close();
      return;
    }

    if (correctAnswers.includes(trimmedInput)) {
      if (guessedCountries.has(trimmedInput)) {
        console.log('You have already guessed this country. Try another one.');
      } else {
        guessedCountries.add(trimmedInput);
        const topic = findTopicForCountry(trimmedInput);
        console.log(`Correct! "${trimmedInput}" is in the topic: "${topic}". You have guessed: ${Array.from(guessedCountries).join(', ')}`);
      }
    } else {
      console.log('Incorrect country. Try again.');
    }

    if (guessedCountries.size === correctAnswers.length) {
      console.log('\nCongratulations! You have guessed all the countries.');
      rl.close();
    }
  }

  rl.on('line', (input) => {
    handleUserInput(input);
  });
}

startGame();

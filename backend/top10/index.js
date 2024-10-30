export function consignaAleatoria() {
  const randomTopicIndex = Math.floor(Math.random() * top10Data.top10.length);
  const selectedTopic = top10Data.top10[randomTopicIndex].topic; // Solo seleccionar el tema
  return selectedTopic;
}

export function verifyAnswerTop10(userAnswer) {
  const selectedTopic = consignaAleatoria();
  const topicData = top10Data.top10.find(item => item.topic === selectedTopic);

  if (topicData) {
    const correctAnswer = topicData.items.find(item => item.name === userAnswer);
    if (correctAnswer) {
      return true; // User's answer is correct
    } else {
      return false; // User's answer is incorrect
    }
  } else {
    return false; // No matching topic found
  }
}

export { verifyAnswer };
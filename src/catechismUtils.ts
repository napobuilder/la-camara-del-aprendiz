export const shuffleArray = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return [...array];
};

export const normalizeText = (text: string) => {
    if (!text) return '';
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,;:?¿!¡]/g, '');
};

export const evaluateAnswer = (userInput: string, correctAnswer: string) => {
    const normUserInput = normalizeText(userInput);
    const normCorrectAnswer = normalizeText(correctAnswer);
    if (normUserInput === normCorrectAnswer) return 100;
    const userWords = new Set(normUserInput.split(' ').filter(w => w.length > 1));
    const correctWords = normCorrectAnswer.split(' ').filter(w => w.length > 1);
    if (correctWords.length === 0) return 100;
    let matchCount = 0;
    correctWords.forEach(word => {
        if (userWords.has(word)) matchCount++;
    });
    return (matchCount / correctWords.length) * 100;
};

export const chunkArray = (array: any[], size: number) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
};
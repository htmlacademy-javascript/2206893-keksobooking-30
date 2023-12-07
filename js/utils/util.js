const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomNumber = (min, max) => (Math.random() * (max - min) + min).toFixed(5);
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, getRandomNumber, getRandomArrayElement};

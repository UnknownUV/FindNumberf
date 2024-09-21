const numbersContainer = document.getElementById('numbers');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');

let score = 0;
let targetNumber;
let numberArray = [];
let selectedNumbers = [];

const generateNumbers = () => {
    numberArray = [];
    
    let uniqueArray = [2, 3, 4, 5, 6, 7, 8];

    uniqueArray = uniqueArray.sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 7; i++) {
        numberArray.push(uniqueArray[i]);
    }
    numberArray.push(Math.floor(Math.random() * 7) + 2);

    numberArray.sort(() => Math.random() - 0.5);
};

const renderNumbers = () => {
    numbersContainer.innerHTML = '';
    numberArray.forEach((number, index) => {
        const numberDiv = document.createElement('div');
        numberDiv.textContent = number;
        numberDiv.classList.add('number');
        numberDiv.dataset.index = index;
        numberDiv.addEventListener('click', () => handleNumberClick(numberDiv, number));
        numbersContainer.appendChild(numberDiv);
    });
};

const handleNumberClick = (numberDiv, number) => {
    if (selectedNumbers.length < 2 && !numberDiv.classList.contains('selected')) {
        numberDiv.classList.add('selected');
        numberDiv.style.backgroundColor = '#4CAF50';
        selectedNumbers.push(number);
        
        if (selectedNumbers.length === 2) {
            checkForMatch();
        }
    }
};

const checkForMatch = () => {
    const selectedDivs = document.querySelectorAll('.number.selected');

    if (selectedNumbers[0] === selectedNumbers[1]) {
        score++;
        scoreDisplay.textContent = `Счет: ${score}`;
        selectedDivs.forEach(div => div.style.visibility = 'hidden'); // скрываем пары
        resetSelection();
        generateNumbers();
        renderNumbers();
    } else {
        score = 0;
        scoreDisplay.textContent = `Счет: ${score}`;
        setTimeout(() => {
            selectedDivs.forEach(div => {
                div.classList.remove('selected'); 
                div.style.backgroundColor = ''; // Сбрасываем цвет
            });
            resetSelection();
        }, 1000);
    }
};

const resetSelection = () => {
    selectedNumbers = [];
};

const startGame = () => {
    score = 0;
    scoreDisplay.textContent = `Счет: ${score}`;
    restartButton.style.display = 'none';
    generateNumbers();
    renderNumbers();
};

restartButton.addEventListener('click', startGame);
startGame();

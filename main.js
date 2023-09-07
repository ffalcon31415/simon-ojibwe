let sequence = [];
let humanSequence = [];
let round = 0;

const maxround = 7
const allTiles = ['baa', 'bii', 'boo', 'be',  'chaa', 'chii', 'choo', 'che', 'ba', 'bi', 'bo','cha', 'chi', 'cho', 'daa', 'dii', 'doo', 'de', 'da', 'di', 'do', 'gaa', 'gii', 'goo', 'ge', 'ga', 'gi', 'go', 'jaa', 'jii', 'joo', 'je', 'ja', 'ji', 'jo', 'kaa', 'kii', 'koo', 'ke', 'ka', 'ki', 'ko', 'naa', 'nii', 'noo', 'ne', 'na', 'ni', 'no', 'paa', 'pii', 'poo', 'pe', 'pa', 'pi', 'po', 'saa', 'sii', 'soo', 'se', 'sa', 'si', 'so', 'shaa', 'shii', 'shoo', 'she', 'sha', 'shi', 'sho', 'taa', 'tii', 'too', 'te', 'ta', 'ti', 'to', 'waa', 'wii', 'woo', 'we', 'wa', 'wi', 'wo', 'zaa', 'zii', 'zoo', 'ze', 'za', 'zi', 'zo', 'zhaa', 'zhii', 'zhoo', 'zhe', 'zha', 'zhi', 'zho'];
const numTilesInGame = 8;

let allTilesInGame = [];

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');


function pickTiles(allTiles, numTilesInGame) {
  if (numTilesInGame > allTiles.length) {
    throw new Error('Not enough tiles available');
  }

  // Shuffle the allTiles array
  const shuffledTiles = [...allTiles];
  shuffleArray(shuffledTiles);

  // Select the first numTilesInGame tiles from the shuffled array
  const tilesInGame = shuffledTiles.slice(0, numTilesInGame);

  return tilesInGame;
}

function handleClick(tile) {
    const index = humanSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();
  
    const remainingTaps = sequence.length - humanSequence.length;

    if (humanSequence[index] !== sequence[index]) {
        resetGame('Kaa! Gaawiin goyak.');
        return;
    }

    if (humanSequence.length === sequence.length) {
        if (humanSequence.length === maxround) {
            resetGame('Gigii bakanaage!');
            return
          }
        humanSequence = [];
        info.textContent = 'Nishin!';
        setTimeout(() => {
            nextRound();
        }, 1000);
        return;
    }
  
    // info.textContent = `Giin nitam: ${remainingTaps} geyaabi`;
  }

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function showHideTiles() {
      // Show only the selected tiles and hide the rest
      allTiles.forEach(tile => {
        const tileElement = document.querySelector(`[data-tile='${tile}']`);
        if (allTilesInGame.includes(tile)) {
            tileElement.classList.remove('hidden');
        } else {
            tileElement.classList.add('hidden');
        }
    });
}
function startGame() {
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    allTilesInGame = pickTiles(allTiles, numTilesInGame);
    shuffleArray(allTilesInGame);
    showHideTiles();
    info.textContent = 'Wait for the computer';
    nextRound();
}

function resetGame(text) {
    alert(text);
    sequence = [];
    humanSequence = [];
    round = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Kidwinensak Damnowin';
    info.classList.add('hidden');
    tileContainer.classList.add('unclickable');
  }

function humanTurn(round) {
    tileContainer.classList.remove('unclickable');
    // info.textContent = `Giin nitam: ${remainingTaps} geyaabi`;
}

function activateTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);
  
    tile.classList.add('activated');
    sound.play();
  
    setTimeout(() => {
      tile.classList.remove('activated');
    }, 300);
  }
  
function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
      setTimeout(() => {
        activateTile(color);
      }, (index + 1) * 600);
    });
  }
function nextStep(currentStep) {
    const tiles = allTilesInGame;
    let random = tiles[Math.floor(Math.random() * tiles.length)];
    while (random == currentStep) {
        random = tiles[Math.floor(Math.random() * tiles.length)];
    }
    
    return random;
  }
function nextRound() {
    round += 1;
    tileContainer.classList.add('unclickable');
    info.textContent = 'Baabii\'aan';
    heading.textContent = `round ${round} of ${maxround}`;
    // copy all the elements in the `sequence` array to `nextSequence`
    const nextSequence = [...sequence];
    nextSequence.push(nextStep(nextSequence[nextSequence.length - 1]));
    playRound(nextSequence)

    sequence = [...nextSequence];
    setTimeout(() => {
        humanTurn(round);
      }, round * 600 + 1000);
  }
startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
    const innerText = event.target.innerText;
  
    if (innerText) handleClick(innerText);
  });
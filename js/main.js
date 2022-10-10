//  Pseudo(pseudo)code

// randomly generate from state one of Jupiter's moons
// display the # of characters of the word
// based on length of word: minutes of oxygen remaining
// if correct # guesses < the length of the word, then the user must guess ->
// while minutes remaining > 0
// minutes remaining i-- upon incorrect guess and at 0, game over
// show game over sequence (message, audio(?))
// if correct # guesses === length of the word, mission success!


/*----- constants -----*/

// not currently using
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                  'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
                  'y', 'z'];

const moons = ['Io', 'Europa', 'Ganymede', 'Adrastea', 'Aitne', 'Amalthea',
               'Ananke', 'Arche', 'Autonoe', 'Aoede', 'Callirrhoe', 'Callisto',
               'Carme', 'Carpo', 'Chaldene', 'Cyllene', 'Dia', 'Eirene',
               'Elara', 'Erinome', 'Ersa', 'Euanthe', 'Eukelade', 'Eupheme',
               'Euporie', 'Eurydome', 'Harpalyke', 'Hegemone', 'Helike',
               'Hermippe', 'Herse', 'Himalia', 'Iocaste', 'Isonoe', 'Kale',
               'Kallichore', 'Kalyke', 'Kore', 'Leda', 'Lysithea', 'Megaclite',
               'Metis', 'Mneme', 'Orthosie', 'Pandia', 'Pasiphae', 'Pasithee',
               'Philophrosyne', 'Praxidike', 'Sinope', 'Sponde', 'Taygete',
               'Thebe', 'Thelxinoe', 'Themisto', 'Thyone', 'Valetudo'];

/*----- state variables -----*/

let guesses;        // = {
                    //   correct: [],  guesses (when correct.length = passcode.length => win)
                    //   wrong: [], lose when wrong.length = maxWrong
                    // }

let maxWrong;       // do I want to generate this dynamically based off # characters?

let passcode;       // generates passcode randomly from array of moons
                    // = moons[Math.floor(Math.random() * moons.length)];

let passcodeBoard;  // sets up "board" to display # characters in word (and eventually will display
                    // letters too)
                    // = [];

let missionOutcome; // 'Mission Success!' or 'Mission Failure' mission success
                    // if guesses[correct].length = passcode.length

/*----- cached elements  -----*/

const playBtn = document.querySelector('.play');


/*----- event listeners -----*/

document.getElementById('alphabet').addEventListener('click', letterSelect);
playBtn.addEventListener('click', init);
// alphabet click, but needs to be able to ignore repeated clicks
// audio
// play/reset

/*----- functions -----*/

init();

function init() {
  guesses = {
    correct: [],
    wrong: [],
  };
  maxWrong = 6;
  passcode = renderPasscode();
  passcodeBoard = '';
  missionOutcome = 'Mission in progress';
  render();
}

function render() {
  renderPasscodeBoard();
  renderMessage();
  renderControls();
  letterSelect();
}

function renderPasscode() {
  return moons[Math.floor(Math.random() * moons.length)].toUpperCase().split('');
}

function renderPasscodeBoard() {
 // want to render underscores that represent the number of letters in passcode
}

function renderMessage() {
  //
}

function renderControls() {

}

function letterSelect(evt) {
  const letterIdx = evt.target.id;
  console.log(letterIdx);
  // guards
    // clicks outside of board
    // clicks letter already chosen
  // updates state
  // num guesses left
  missionOutcome = getMissionOutcome();
  render()
}

function getMissionOutcome() {

}

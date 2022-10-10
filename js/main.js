//  Pseudo(pseudo)code

// randomly generate from state one of Jupiter's moons
// display the # of characters of the word
// based on length of word: minutes of oxygen remaining
// if correct # guesses < the length of the word, then the user must guess ->
// while minutes remaining > 0
// minutes remaining i-- upon incorrect guess and at 0, gameover
// show game over sequence (message, audio(?))
// if correct # guesses === length of the word, mission success!


/*----- constants -----*/

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
                    //   correct: 0,  guesses (when correct guesses = passcode.length => win)
                    //   wrong: 0,
                    // }

let maxWrong;       // do I want to generate this dynamically based off # characters?

let passcode;       // generates passcode randomly from array of moons
                    // = moons[Math.floor(Math.random() * moons.length)];

let passcodeBoard;  // sets up "board" to display # characters in word (and eventually will display
                    // letters too)
                    // = [];

let missionOutcome; // 'Mission Success!' or 'Mission Failure' mission success
                    // if guesses[correct] = passcode.length

/*----- cached elements  -----*/

// play/reset button


/*----- event listeners -----*/

// alphabet click, but needs to be able to ignore repeated clicks
// audio
// play/reset

/*----- functions -----*/

init();

function init() {
  guesses = {
    correct: 0,
    wrong: 0,
  };
  maxWrong = 6;
  passcode = moons[Math.floor(Math.random() * moons.length)];
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

function renderPasscodeBoard() {

}

function renderMessage() {

}

function renderControls() {

}

function letterSelect() {
  // guards
    // clicks outside of board
    // clicks letter already chosen
  // updates state
  // num guesses left
  // missionOutcome()
  // render()
}

//missionOutcome()

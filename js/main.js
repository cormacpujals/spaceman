/*----- constants -----*/

const moons = [
  'Io', 'Europa', 'Ganymede', 'Adrastea', 'Aitne', 'Amalthea', 'Ananke',
  'Arche', 'Autonoe', 'Aoede', 'Callirrhoe', 'Callisto', 'Carme', 'Carpo',
  'Chaldene', 'Cyllene', 'Dia', 'Eirene', 'Elara', 'Erinome', 'Ersa', 'Euanthe',
  'Eukelade', 'Eupheme', 'Euporie', 'Eurydome', 'Harpalyke', 'Hegemone',
  'Helike', 'Hermippe', 'Herse', 'Himalia', 'Iocaste', 'Isonoe', 'Kale',
  'Kallichore', 'Kalyke', 'Kore', 'Leda', 'Lysithea', 'Megaclite', 'Metis',
  'Mneme', 'Orthosie', 'Pandia', 'Pasiphae', 'Pasithee', 'Philophrosyne',
  'Praxidike', 'Sinope', 'Sponde', 'Taygete', 'Thebe', 'Thelxinoe', 'Themisto',
  'Thyone', 'Valetudo'
];

/*----- state variables -----*/

// Our game states. Set states with setState().
const InitialState = 'INITIAL';
const StartState = 'START';
const InPlayState = 'IN-PLAY';
const GameOverState = 'GAME-OVER';

const stateTransitions = {
  [InitialState]: [StartState],
  [StartState]: [InPlayState],
  [InPlayState]: [GameOverState],
  [GameOverState]: [InitialState],
}

let state;

// Starting timeout until game over.
const timeout = 1000 * 60;

// remaining seconds (not ms), initialized by startGameLoop()
let remaining;

// Update the screen every second.
const period = 1000;

// Interval created by startGameLoop().
let timer;

// Status is updated based on the timer.
let status;

// Passcode updated for each new round.
let passcode = '';

/*----- cached elements  -----*/

const activateBtn = document.getElementById('activate');
const timerEl = document.getElementById('timer');
const buttonsEl = document.getElementById('buttons');

/*----- event listeners -----*/

activateBtn.addEventListener('click', init);
// letter btn listener is in the function that initializes them

/*----- functions -----*/

/**
 * activate "starts" a new game and requires the user to guess a passcode.
 */
function init() {
  console.log('starting new game');
  setState(InitialState);
  initializePasscode();
  initializePasscodeDisplay(passcode);
  initializeButtons();
  startGameLoop();
}

function endGame() {
  // explicitly dispose timer
  clearInterval(timer);
  timer = undefined;

  setState(GameOverState);
  const win = remaining > 0 ? true : false;
  console.log('Win: ' + win); // clear control-panel and say 'MISSION SUCCESS
                              // EMERGENCY RETRIEVAL SYSTEM ACTIVATED'
}

function initializePasscode() {
  passcode = moons[Math.floor(Math.random() * moons.length)].toUpperCase();
}

function initializeButtons() {
  buttonsEl.replaceChildren();

  const iA = 'A'.charCodeAt(0);
  const iZ = 'Z'.charCodeAt(0);
  const chars = [];

  for (let i = iA; i <= iZ; i++) {
    chars.push(String.fromCharCode(i));
  }

  chars.forEach(ch => {
    const b = document.createElement('button');
    b.setAttribute('class', 'btn');
    b.innerText = ch;
    b.addEventListener('click', onPasscodeButton);
    buttonsEl.appendChild(b);
  });
}

function onPasscodeButton(evt) {
  const btn = evt.target;
  const ch = btn.innerText;

  setPasscodeDisplay(ch.toUpperCase());
  let cur = readPasscodeDisplay();
  console.log(`${cur} === ${passcode} => ${cur === passcode}`);

  if (cur === passcode) {
    endGame();
  }
}

/**
 * The game loop runs until either
 * -the player guesses the correct passcode and ends the game
 * -the timer times out
 * render updates the state determined by game loop
 */
function startGameLoop() {
  setState(StartState);
  remaining = timeout / 1000; // display seconds
  render();

  // Enter InPlayState and start game loop.
  setState(InPlayState);
  timer = setInterval(() => {
    --remaining;
    // console.log("seconds remaining:", remaining);
    if (remaining <= 0) {
      endGame();
    }
    render();
  }, period);
}

/**
 * Updates UI to reflect current state (set by startGameLoop)
 */
function render() {
  switch (state) {
    case InitialState:
    case StartState:
      timerEl.setAttribute('class', 'timer-normal');
      status = `${remaining} seconds`;
      break;

    case InPlayState:
      const seconds = remaining;
      status = '';

      if (seconds < 16) {
        timerEl.setAttribute('class', 'timer-warning');
      }

      if (seconds > 1) {
        status = `${seconds} seconds`;
      } else if (seconds === 1) {
        status = '1 second';
      }
      break;

    case GameOverState:
      status = 'TIME OUT!';
      break;

    default:
      console.error(`ERROR: unknown state: ${state}`);
  }

  // update time remaining display
  timerEl.textContent = status;
}

/**
 * Ensure valid state transitions.
 * @param newState
 */
function setState(newState) {
  if (!state) state = GameOverState;

  if (stateTransitions[state].includes(newState)) {
    state = newState;
  } else {
    throw new Error(`ERROR: invalid state transition attempted from ${state} to ${newState}`);
  }
}

/*----- Input Buffer Display -----*/


const passcodeEl = document.getElementById('passcode');

function initializePasscodeDisplay(passcode) {
  passcodeEl.replaceChildren();

  for (let i = 0; i < passcode.length; i++) {
    const el = document.createElement('button');
    el.setAttribute('class', 'passcode');
    passcodeEl.appendChild(el);
  }
  passcodeEl.removeAttribute('class');
}

function setPasscodeDisplay(letter) {
  if (!passcode.includes(letter)) return;

  let result = [];
  let i = -1
  do {
    i = passcode.indexOf(letter, ++i);
    if (i != -1) result.push(i);
  } while (i != -1);

  if (result.length) {
    const elements = Array.from(passcodeEl.children);

    result.forEach(i => {
      elements[i].textContent = letter;
      console.log(`*** ${i} => ${letter}`);
    });
  }
  render();
}

function readPasscodeDisplay() {
  let text = "";

  const elements = Array.from(passcodeEl.children);
  elements.forEach(el => {
    text += el.textContent;
  });

  return text;
}

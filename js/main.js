/*----- constants -----*/

/** The list of all possible passcodes (moons of Jupiter). */
const MOONS = [
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

/** Game states. Set current state with setState(). */
const GameState = {
  INITIAL: 'INITIAL',
  START: 'START',
  IN_PLAY: 'IN-PLAY',
  GAME_OVER: 'GAME-OVER',
}

/** Valid transitions (state => possible states array) used by setState(). */
const STATE_TRANSITIONS = {
  [GameState.INITIAL]: [GameState.START],
  [GameState.START]: [GameState.IN_PLAY],
  [GameState.IN_PLAY]: [GameState.GAME_OVER],
  [GameState.GAME_OVER]: [GameState.INITIAL],
}

/*----- state variables -----*/

/** Current game state. */
let state;

/** The status message (how many seconds remaining). */
let status;

/** Passcode randomly selected from MOONS list for each new round. */
let passcode;

/** The game timer (reset for each new game). */
let timer = {
  maxTime: 1000 * 120, // total game length (ms).
  period: 1000, // how often the game updates and renders (ms).
  remaining: undefined, // time remaining until game ends (seconds).
  intervalId: undefined, // the interval timer ID
}

/*----- cached elements  -----*/

/** button for starting a new game */
const activateBtn = document.getElementById('activate');

/** displays status (time remaining) */
const timerEl = document.getElementById('timer');

/** displays the alphabetic buttons panel for entering passcode */
const buttonsEl = document.getElementById('buttons');

/** displays letters in passcode, if present, as user clicks alphabet buttons */
const passcodeEl = document.getElementById('passcode');

/*----- event listeners -----*/

activateBtn.addEventListener('click', init);

/*----- functions -----*/

/**
 * initialize a new game and start game loop
 */
function init() {
  console.log('Initializing new game');
  setState(GameState.INITIAL);

  // Initialize game state.
  initializePasscode();
  initializePasscodeDisplay();
  initializeButtons();

  // Set the game interval to periodically re-render until either:
  // - player guesses the correct passcode and ends the game
  // - timer times out
  timer.intervalId = setInterval(() => {
    --timer.remaining;
    if (timer.remaining <= 0) {
      endGame();
    }
    render();
  }, timer.period);

  // Set start state and render
  setState(GameState.START);
  timer.remaining = timer.maxTime / 1000; // display seconds
  render();

  // Transition to play state now.
  setState(GameState.IN_PLAY);
}

/**
 * Update UI to reflect current state.
 */
function render() {
  switch (state) {
    case GameState.INITIAL:
    case GameState.START:
      timerEl.setAttribute('class', 'timer-normal');
      status = `${timer.remaining} seconds`;
      break;

    case GameState.IN_PLAY:
      const seconds = timer.remaining;
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

    case GameState.GAME_OVER:
      status = timer.remaining > 0 ? 'MISSION SUCCESS!' : 'MISSION FAILURE!';
      break;

    default:
      console.error(`ERROR: unknown state: ${state}`);
  }

  // update time remaining display
  timerEl.textContent = status;
}

/**
 * Update UI to indicate win/lose state and clear timer interval.
 */
function endGame() {
  // explicitly dispose timer
  clearInterval(timer.intervalId);
  timer.intervalId = undefined;

  setState(GameState.GAME_OVER);
  const win = timer.remaining > 0;
  console.log('Win: ' + win);

  render();
}

/** Randomly choose one of the moons of Jupiter. */
function initializePasscode() {
  passcode = MOONS[Math.floor(Math.random() * MOONS.length)].toUpperCase();
}

/** Clear previous display and add elements for displaying passcode letters. */
function initializePasscodeDisplay() {
  passcodeEl.replaceChildren();

  for (let i = 0; i < passcode.length; i++) {
    const el = document.createElement('span');
    el.setAttribute('class', 'passcode');
    el.textContent = '_';
    passcodeEl.appendChild(el);
  }
  passcodeEl.removeAttribute('class');
}

/** Dynamically create the alphabet buttons and attach click handler */
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

/** Handle alphabet button presses */
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
 * Ensure valid state transitions.
 * @param newState
 */
function setState(newState) {
  if (!state) state = GameState.GAME_OVER;

  if (STATE_TRANSITIONS[state].includes(newState)) {
    state = newState;
  } else {
    console.error(`ERROR: invalid state transition: ${state} => ${newState}`);
  }
}

/** If the letter is present in the passcode, this will display it. */
function setPasscodeDisplay(letter) {
  if (!passcode.includes(letter)) return;

  let result = [];
  let i = -1
  do {
    i = passcode.indexOf(letter, ++i);
    if (i !== -1) result.push(i);
  } while (i !== -1);

  if (result.length) {
    const elements = Array.from(passcodeEl.children);

    result.forEach(i => {
      elements[i].textContent = letter;
      console.log(`*** ${i} => ${letter}`);
    });
  }
}

/** Returns the current string value of the passcode display */
function readPasscodeDisplay() {
  let text = "";

  const elements = Array.from(passcodeEl.children);
  elements.forEach(el => {
    text += el.textContent;
  });

  return text;
}

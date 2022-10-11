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

// Our game states.
const InitialState = 'INITIAL';
const StartState = 'START';
const InPlayState = 'IN-PLAY';
const GameOverState = 'GAME-OVER';

let state = InitialState;

// Starting timeout until game over.
const timeout = 1000 * 60;

// remaining seconds (not ms), initialized by startGameLoop()
let remaining;

// Update the screen every second.
const period = 1000;

// Interval created by startGameLoop()
let timer;

// Status is updated based on the timer
let status;

// Buffer of keys entered since last cleared.
let buffer = [];
let passcode = '';
/*----- cached elements  -----*/

const activateBtn = document.getElementById('activate');
timerEl = document.getElementById('timer');
buttonsEl = document.getElementById('buttons');

/*----- event listeners -----*/

activateBtn.addEventListener('click', init);
// letter btn listener is in the function that initializes them

/*----- functions -----*/

/**
 * activate "starts" a new game and requires the user to guess a passcode.
 */
function init() {
  console.log('starting new game');
  state = StartState; // sets state to StartState
  initializePasscode();
  initializeButtons();
  startGameLoop();
}

function endGame() {
  // explicitly dispose timer
  clearInterval(timer);
  timer = undefined;

  state = GameOverState;
  const win = remaining > 0 ? true : false;
  console.log('Win: ' + win); // clear control-panel and say 'MISSION SUCCESS
                              // EMERGENCY RETRIEVAL SYSTEM ACTIVATED'
}

function initializePasscode() {
  // moons[Math.floor(Math.random() * moons.length)].toUpperCase();
  passcode = moons[0];
  buffer = [];
}

function initializeButtons() {
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

  buffer.push(ch);

  const buf = buffer.join('');
  const pc = passcode.toUpperCase();
  console.log(`${buf} === ${pc} => ${buf === pc}`);

  if (buf === pc) {
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
  // console.log("starting new countdown");
  remaining = timeout / 1000; // display seconds
  render();

  // Enter InPlayState and start game loop.
  state = InPlayState;
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

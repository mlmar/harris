/**
 * 
 *  This is a simple demo for a webpage with some js functionality for Harris
 * 
 */

// Global variables -- every function has access to these
let $main = null;
let $control = null;
let $textInput = null;
let $topLeft = null;
let $topRight = null;
let $bottomLeft = null;
let $bottomRight = null;

const positioningBasedOnNumber = {
  1: 'top left',
  2: 'top right',
  3: 'bottom left',
  4: 'bottom right',
}

// Waiting for the document (page) to be ready before doing anything to the page
$(document).ready(() => {
  init(); // Initialize page functionality
});


function init() {
  // Grab the elements from the page
  $main = $('#main');
  $control = $('#control'); // Element that contains the dog image and text input
  $textInput = $('#text-input');

  // Get random dog image
  fetch('https://dog.ceo/api/breeds/image/random')
  .then(res => res.json())
  .then(({ message }) => {
    $control.prepend(`<img src="${message}"/>`)
  });

  // Listen for input events from the text input
  $textInput.on('input', inputHandler);

  // Center the control element
  $control.addClass('center');

  // Create 4 squares
  initNumberSquares();
}


function inputHandler(event) {
  let userTextInput = event.target.value;
  let numericalUserInput = -1;
  try {
    numericalUserInput = parseInt(userTextInput);
  } catch(ex) {
    numericalUserInput = -1;
  }
  $control.removeClass('center');

  switch(numericalUserInput) {
    case 1:
    case 2:
    case 3:
    case 4:
      $control.addClass(positioningBasedOnNumber[numericalUserInput]);
      break;
    default:
      $control.removeClass('top');
      $control.removeClass('bottom');
      $control.removeClass('left');
      $control.removeClass('right');
      $control.addClass('center');
      break;
  }
}


function initNumberSquares() {
  $topLeft = new NumberSquare('left', 'top', '1').load();
  $topRight = new NumberSquare('right', 'top', '2').load();
  $bottomLeft = new NumberSquare('left', 'bottom', '3').load();
  $bottomRight = new NumberSquare('right', 'bottom', '4').load();
}

// OBJECT ORIENTED PROGRAMMING
// Generic function to create square at any corner position containing any text
function NumberSquare(xPos, yPos, text) {
  this.load = () => {
    let cssClasses = [xPos, yPos].join(' ');
    $main.append([
      `<div class="number-square ${cssClasses}">`,
        text,
      `</div>`
    ].join('\n'));
    return this;
  }
}
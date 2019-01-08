var socket;
var userColor = "w";

function setup() {
  createCanvas(1920, 1080);
  background(0);
  //replace port with hosting machine IP
  socket = io.connect('http://10.10.41.170:3000');  


  button = createButton('BLUE');
  button.position(0, 0);
  button.mousePressed(setColorBlue);

  button2 = createButton('RED');
  button2.position(0, button.y + button.height);
  button2.mousePressed(setColorRed);

  button3 = createButton('GREEN');
  button3.position(0, button2.y + button2.height);
  button3.mousePressed(setColorGreen);

  button4 = createButton('WHITE');
  button4.position(0, button3.y + button3.height);
  button4.mousePressed(setColorWhite);

  button5 = createButton('ERASER');
  button5.position(0, button4.y + button4.height);
  button5.mousePressed(setColorBlack);


  //message received
  socket.on('mouse',
    function (data) {
      console.log("Got: " + data.x + " " + data.y);
      var penSize = 10;
      switch (data.c) {
        case 'r':
          fill(255, 0, 0)
          break;
        case 'g':
          fill(0, 255, 0)
          break;
        case 'b':
          fill(0, 0, 255)
          break;
        case 'w':
          fill(255)
          break;
        case 'e':
          fill(0)
          break;
      }
      if (userColor === 'e') {
        penSize = 50;
      } else {
        penSize = 10;
      }
      noStroke();
      ellipse(data.x, data.y, penSize, penSize);
    }
  );
}

function setColorBlue() {
  userColor = 'b';
}

function setColorRed() {
  userColor = 'r';
}

function setColorGreen() {
  userColor = 'g';
}

function setColorWhite() {
  userColor = 'w';
}

function setColorBlack() {
  userColor = 'e';

}

function draw() {
  // Nothing
}

function mouseDragged() {
  var penSize = 10;
  switch (userColor) {
    case 'r':
      fill(255, 0, 0)
      break;
    case 'g':
      fill(0, 255, 0)
      break;
    case 'b':
      fill(0, 0, 255)
      break;
    case 'w':
      fill(255)
      break;
    case 'e':
      fill(0)
      break;
  }
  if (userColor === 'e') {
    penSize = 50;
  } else {
    penSize = 10;
  }

  noStroke();
  ellipse(mouseX, mouseY, penSize, penSize);
  // line(mouseX, mouseY, pmouseX, pmouseY);
  sendmouse(mouseX, mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  var data = {
    x: xpos,
    y: ypos,
    c: userColor,
  };
  socket.emit('mouse', data);
}
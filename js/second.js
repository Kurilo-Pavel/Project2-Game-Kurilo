'use strict'
let game = {
  size: 11,
  sizeRow: null,
  ship: ['1Small', '2Medium', '3Big', '4Huge'],
  rowNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  colLetter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  board: null,
  boardShips: null,
  battleBoard: null,
}
let boardGame = document.getElementById('boardGame');


function dowloadImg() {
  let img = document.createElement('img');
  img.setAttribute('src', 'image/Battleship-High-Cop.jpg')
  img.setAttribute('id', 'img')
  img.style.width = '100%'
  img.style.height = '100%'
  img.style.zIndex = '10';
  img.style.position = 'absolute';
  boardGame.appendChild(img);
}

dowloadImg()

function createButtonGame() {// создаем кнопку new game
  let buttonGame = document.createElement('input');
  boardGame.appendChild(buttonGame);
  buttonGame.setAttribute('type', 'button');
  buttonGame.setAttribute('value', 'New game');
  buttonGame.setAttribute('id', 'newGame');
  buttonGame.setAttribute('onclick', 'newGame()');

}

createButtonGame()

function createBoard() {
  let board = document.createElement('div');
  boardGame.appendChild(board);
  board.setAttribute('id', 'board');
}

createBoard()

function createBoardShips() {
  let boardShips = document.createElement('div');
  boardGame.appendChild(boardShips);
  boardShips.setAttribute('id', 'ship');
}

createBoardShips()

game.boardShips = document.getElementById('ship');
game.board = document.getElementById('board');

function createBord() { // отрисовываем поле 10х10

  if (game.board.offsetWidth < game.board.offsetHeight) {
    game.sizeRow = game.board.offsetWidth / 14;
  } else {
    game.sizeRow = game.board.offsetHeight / 14;
  }

  let tab = document.createElement('table');
  game.board.appendChild(tab);
  tab.style.borderCollapse = 'collapse';
  tab.style.marginTop = game.sizeRow + 'px';
  tab.style.marginLeft = game.sizeRow + game.boardShips.offsetLeft - game.board.offsetWidth + 'px';
  tab.style.height = game.sizeRow * game.size + 'px';
  tab.style.width = game.sizeRow * game.size + 'px';


  for (let i = 1; i <= game.size; i++) {
    let row = document.createElement('tr');
    tab.appendChild(row);

    for (let n = 1; n <= game.size; n++) {
      let col = document.createElement('td');
      row.appendChild(col);
      col.style.border = '1px solid black';

    }
  }
}

createBord()

function createBattleBoard() {
  let battleBoard = document.createElement('div');
  game.board.appendChild(battleBoard);
  battleBoard.setAttribute('id', 'battleBoard');
  battleBoard.style.width = game.board.offsetWidth + 'px';
  battleBoard.style.height = game.board.offsetHeight + 'px';
  battleBoard.style.border = '1px solid red';
  battleBoard.style.position = 'absolute';
  battleBoard.style.top = game.board.offsetTop + 'px';
  battleBoard.style.left = game.board.offsetLeft + 'px';
}

createBattleBoard()
game.battleBoard = document.getElementById('battleBoard');

let help
function createInform(){
  help = document.createElement('div');
  help
  help.style.width = '100%';
  game.boardShips.appendChild(help);
  let textHelp = document.createElement('p');
  help.appendChild(textHelp);
  textHelp.style.margin = game.sizeRow+'px';
  textHelp.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum exercitationem numquam officia optio veritatis! Assumenda beatae cupiditate delectus enim illo, officia quae quos temporibus! Adipisci alias amet aut ducimus eius est eum fugit illum minus mollitia, perferendis, repellendus reprehenderit repudiandae suscipit voluptas? Alias animi cumque nam praesentium quam quasi voluptatem!'


}
createInform()

function createShips() { // отрисовываем корабли
  for (let i = 0; i < game.ship.length; i++) {
    let posLeft = game.sizeRow
    for (let k = 0; k < game.ship.length - i; k++) {
      let ship = document.createElement('img');
      game.boardShips.appendChild(ship);
      ship.setAttribute('src', 'image/ship' + game.ship[i] + '.png');
      ship.setAttribute('class', game.ship[i]);
      ship.style.position = 'absolute';
      ship.style.width = game.ship[i][0] * game.sizeRow + 'px';
      ship.style.left = posLeft + 'px';
      posLeft += ship.offsetWidth + game.sizeRow
      ship.style.top = game.sizeRow * 2 * i + help.getBoundingClientRect().bottom+ game.sizeRow + 'px';
      ship.style.height = game.sizeRow + 'px';

    }
  }
}

createShips()

function createButtonBack() {// создаем кнопку back
  let buttonBack = document.createElement('input');
  boardGame.appendChild(buttonBack);
  buttonBack.setAttribute('type', 'button');
  buttonBack.setAttribute('value', 'Back');
  buttonBack.setAttribute('id', 'back');
  buttonBack.setAttribute('onclick', 'back()');
}

createButtonBack()

function createButtonPlay() {// создаем кнопку play
  if (game.boardShips.innerHTML === "") {
    let buttonPlay = document.createElement('input');
    boardGame.appendChild(buttonPlay);
    buttonPlay.setAttribute('type', 'button');
    buttonPlay.setAttribute('value', 'Play');
    buttonPlay.setAttribute('id', 'play');
    buttonPlay.setAttribute('onclick', 'play()');
  } else {
  }
}

function pullImage() {
  let DragImage = null;
  let table = document.getElementsByTagName('table');
  let clickInImgX;
  let clickInImgY;
  let image = game.boardShips.querySelector('img');
  let position = [];

  window.onload = save;

  function save() {
    for (let i = image.length - 1; i > -1; i--) {
      position[i] = {
        top: image[i].offsetTop + 'px',
        left: image[i].offsetLeft + 'px',
      }
    }

    function positions() {
      for (let p = position.length - 1; p > -1; p--) {
        image[p].style.top = position[p].top;
        image[p].style.left = position[p].left;
        image[p].style.position = 'absolute';
      }
    }

    positions();
  }

  document.addEventListener('mousedown', DragStart, false);
  let firstPositionLeft = 0;
  let firstPositionTop = 0;

  function DragStart(EO) {
    EO = EO || window.event;
    if (EO.target.tagName == 'IMG') {
      DragImage = EO.target;
      EO.preventDefault();
      firstPositionLeft = DragImage.style.left;
      firstPositionTop = DragImage.style.top;
      DragImage.style.cursor = 'grabbing';
      DragImage.style.position = 'absolute';
      DragImage.style.border = '1px solid black';
      DragImage.style.boxSizing = 'border-box';
      clickInImgX = EO.pageX - DragImage.offsetLeft;
      clickInImgY = EO.pageY - DragImage.offsetTop;
      window.onmousemove = DragMove;
      window.onmouseup = DragStop;
    }
  }

  function DragMove(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    let DragImageX;
    let DragImageY;
    DragImageY = EO.pageY - clickInImgY;
    let boardImage = game.board.children;
    if (DragImage.offsetParent != game.battleBoard) {
      DragImageX = EO.pageX - clickInImgX;
    } else {
      DragImageX = EO.pageX - clickInImgX + game.boardShips.offsetLeft - game.board.offsetWidth;

      console.log(boardImage[1])
      for (let n = 0; n < boardImage.length; n++) {
        if (DragImage.offsetLeft - game.sizeRow < boardImage[n].offsetLeft + boardImage[n].offsetWidth
          || DragImage.offsetLeft - game.sizeRow < boardImage[n].offsetLeft &&
          DragImage.offsetLeft + DragImage.offsetWidth + game.sizeRow > boardImage[n].offsetLeft + boardImage[n].offsetWidth
          || DragImage.offsetLeft + DragImage.offsetWidth + game.sizeRow > boardImage[n].offsetLeft) {
          DragImage.style.border = '2px solid red'
        }
      }

    }
    DragImage.style.left = DragImageX + 'px';
    DragImage.style.top = DragImageY + 'px';
    DragImage.style.cursor = 'grabbing';
    DragImage.style.position = 'absolute';
  }

  function DragStop(EO) {
    EO = EO || window.event;
    let DragImagePosition = DragImage.getBoundingClientRect();
    let tablePosition = table[0].getBoundingClientRect();
    if (DragImagePosition.left < tablePosition.left + game.sizeRow || DragImagePosition.right > tablePosition.right + game.sizeRow / 2
      || DragImagePosition.top < tablePosition.top + game.sizeRow || DragImagePosition.bottom > tablePosition.bottom) {
      DragImage.style.left = firstPositionLeft;
      DragImage.style.top = firstPositionTop;

    } else if
    (DragImage.offsetParent != game.battleBoard) {
      game.battleBoard.appendChild(DragImage);
      DragImage.style.left = Math.round(DragImage.style.left.replace('px', '') * 1 / game.sizeRow) * game.sizeRow
        + game.boardShips.offsetLeft + 'px';
      DragImage.style.top = Math.round(DragImage.style.top.replace('px', '') * 1 / game.sizeRow) * game.sizeRow + 'px';
    } else if (DragImage.offsetParent == game.battleBoard) {
      DragImage.style.top = Math.round(DragImagePosition.top / game.sizeRow) * game.sizeRow + 'px';
      DragImage.style.left = Math.ceil(DragImagePosition.left / game.sizeRow) * game.sizeRow
        - game.boardShips.offsetLeft + game.board.offsetWidth + game.board.offsetLeft + 'px';
      DragImage.style.border = '2px solid black'
    }
    if (game.boardShips.innerHTML === "") {
      createButtonPlay();
    }

    window.onmousemove = null;
    window.onmouseup = null;
    DragImage.style.cursor = 'auto';
  }

}

pullImage()

// поворот на 90
document.addEventListener("contextmenu", Rotate, false);

function Rotate(EO) {
  EO = EO || window.event;
  if (EO.target.tagName == 'IMG') {
    let ImageRotate = EO.target;
    EO.preventDefault();
    ImageRotate.style.transformOrigin = '0 0';
    if (ImageRotate.style.transform == '') {
      ImageRotate.style.transform = 'rotate(90deg)';
      ImageRotate.style.left = ImageRotate.style.left.replace('px', '') * 1 + game.sizeRow + 'px';
    } else {
      ImageRotate.style.transform = '';
      ImageRotate.style.left = ImageRotate.style.left.replace('px', '') * 1 - game.sizeRow + 'px';
    }
  }
}

// создание метки
document.addEventListener("contextmenu", NeutralCell, false);

function NeutralCell(EO) {
  EO = EO || window.event;
  if (EO.target.tagName == 'TD') {
    let cellImg = EO.target;
    EO.preventDefault();
    if (cellImg.style.background == '') {
      cellImg.style.background = 'orange';
    } else {
      cellImg.style.background = '';
    }
  }
}

function Letters() { // линейка координат
  let firstLetter = document.getElementsByTagName('td');

  for (let i = 0; i < firstLetter.length; i++) {
    firstLetter[i].style.width = game.sizeRow + 'px';
    firstLetter[i].style.textAlign = 'center';
    if (i < 11) {
      firstLetter[i].style.border = '0px';
      firstLetter[i].style.textAlign = 'center';
      firstLetter[i + 1].textContent = game.rowNumber[i]
    } else if (i % 11 == 0) {
      firstLetter[i].style.border = '0px';
      firstLetter[i].textContent = game.colLetter[(i + 9) % 10];
    }
  }
}

Letters()

function createButtonUpdate() {// создаем кнопку rotate
  var buttonReturn = document.createElement('input');
  game.board.appendChild(buttonReturn);
  buttonReturn.setAttribute('type', 'button');
  buttonReturn.setAttribute('value', 'Update');
  buttonReturn.setAttribute('onclick', 'Update()');
  buttonReturn.style.right = buttonReturn.offsetHeight / 2 + 'px'
  buttonReturn.style.bottom = buttonReturn.offsetHeight / 2 + 'px'
  buttonReturn.style.position = 'absolute';
}

createButtonUpdate()

function Update() {

  let ship = document.getElementsByTagName('img');
  for (let i = 0; i < ship.length; i++) {
    if (ship[i].offsetParent == game.battleBoard) {
      game.boardShips.appendChild(ship[i])
    }
  }
  createButtonPlay()
}

// попробовать привязать id корабля с его расположением
// спрятать кнопку play при нажатии кнопки update (display none)
// создать дистанцию кораблей
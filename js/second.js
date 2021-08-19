'use strict'
let game = {
  size: 11,
  sizeRow: null,
  shipPlayer: {Small: [4, 1], Medium: [3, 2], Big: [2, 3], Huge: [1, 4]},
  shipComputer: {Small: [4, 1], Medium: [3, 2], Big: [2, 3], Huge: [1, 4]},
  rowNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  colLetter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  board: null,
  boardShips: null,
  battleBoard: null,
  HomeShips: null,
  busy: [],
  randomPlayer: [],
  randomComputer: [],
  random(n){
    return Math.floor(Math.random()*(n+1))
  }
}
let boardGame = document.getElementById('boardGame');


function anketa(){
  let windowModal = document.createElement('div');
  windowModal.id = 'modal';
  windowModal.style.width = '40%';
  windowModal.style.height = '30%';
  windowModal.style.position = 'fixed';
  windowModal.style.display = 'inline-block';
  windowModal.style.background = 'grey';
  windowModal.style.zIndex = '50';
  windowModal.style.left = '50%';
  windowModal.style.top = '50%';
  windowModal.style.border = '3px solid darkblue';
  windowModal.style.transform = 'translate(-50%, -50%)';
  windowModal.style.textAlign = 'center';
  boardGame.appendChild(windowModal);
  let text = document.createElement('h3');
  text.style.margin = '10px';
  text.style.color = 'white';
  text.textContent = 'Укажите свое имя';
  windowModal.appendChild(text);
  let fieldName = document.createElement('input');
  fieldName.type = 'text';
  fieldName.value = 'name';
  fieldName.style.paddingLeft = '15px';
  fieldName.style.position = 'relative';
  fieldName.style.color = 'darkblue';
  fieldName.style.width = windowModal.offsetWidth-parseInt(fieldName.style.paddingLeft)*3+'px';

  fieldName.style.margin = '5px';
  windowModal.appendChild(fieldName);

  let buttonModalOk = document.createElement('input');
  buttonModalOk.type = 'button';
  buttonModalOk.value = 'OK';
  buttonModalOk.style.position = 'relative';
  buttonModalOk.style.fontSize = '13px';
  buttonModalOk.onclick = Modal;
  windowModal.appendChild(buttonModalOk)

  let buttonModalCancle = document.createElement('input');
  buttonModalCancle.type = 'button';
  buttonModalCancle.value = 'Cancle';
  buttonModalCancle.style.position = 'relative';
  buttonModalCancle.style.fontSize = '13px';
  buttonModalCancle.onclick = Cancle;

  windowModal.appendChild(buttonModalCancle)

}
anketa()
// создаем div для отображения поля расстановки кораблей
function createBoard() {

  let board = document.createElement('div');
  boardGame.appendChild(board);
  board.setAttribute('id', 'board');
}
createBoard()

game.board = document.getElementById('board');
//Создаем div для изначального расположения кораблей и поля вывода подсказок
function createBoardShips() {
  let boardShips = document.createElement('div');
  boardGame.appendChild(boardShips);
  boardShips.setAttribute('id', 'ship');
}
createBoardShips()

game.boardShips = document.getElementById('ship');

// создаем поле куда будем заносить корабли
function createBattleBoard() {
  let battleBoard = document.createElement('div');
  boardGame.appendChild(battleBoard);
  battleBoard.setAttribute('id', 'battleBoard');
  battleBoard.style.width = '50%';
  battleBoard.style.height = '70%';
  battleBoard.style.top = '0';
  battleBoard.style.border = '1px solid red';
  battleBoard.style.boxSizing = 'border-box';
  battleBoard.style.position = 'absolute';
  // battleBoard.style.top = game.board.offsetTop + 'px';
  // battleBoard.style.left = game.board.offsetLeft + 'px';
}
createBattleBoard()

game.battleBoard = document.getElementById('battleBoard');
if (game.board.offsetWidth < game.board.offsetHeight) {
  game.sizeRow = Math.round(game.board.offsetWidth / 14);
} else {
  game.sizeRow = Math.round(game.board.offsetHeight / 14);
}
function namePlayer(value, name){
  value = document.createElement('span');
  value.style.width = '50%';
  value.style.height = game.sizeRow*2+'px';
  value.style.border = '1px solid darkpink';
  value.style.display = 'inline-block';
  value.style.textAlign = 'center';
  value.style.position = 'relative';
  boardGame.appendChild(value);
  let text = document.createElement('h3');
  text.textContent = name;
  value.appendChild(text);
  text.style.verticalAlign = 'middle'
  text.style.fontSize = '25px'

}
namePlayer('player', 'player')
namePlayer('computer', 'computer')

// отрисовываем сетку 10х10
function createBord(field) {
    let tab = document.createElement('table');
  field.appendChild(tab);
  tab.style.borderCollapse = 'collapse';
  tab.style.marginTop = game.sizeRow * 2 + 'px';
  tab.style.position = 'absolute';
  tab.style.marginLeft = game.sizeRow +  'px';
  tab.style.height = game.sizeRow * game.size + 'px';
  tab.style.width = game.sizeRow * game.size + 'px';
  tab.style.zIndex = -1;
  tab.setAttribute('id', field.id+'Tab');
  for (let i = 1; i <= game.size; i++) {
    let row = document.createElement('tr');
    tab.appendChild(row);
    for (let n = 1; n <= game.size; n++) {
      let col = document.createElement('td');
      row.appendChild(col);
      col.style.border = '1px solid black';
      col.style.height = game.sizeRow + 'px';
      col.style.boxSizing = 'border-box';
    }
  }
  Letters(field)
}
createBord(game.board)
createBord(game.boardShips)
// отрисовываем сетку координат
function Letters(field) {
  let firstLetter = field.getElementsByTagName('td');
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

//создаем поле подсказки
function createInform() {
  let help = document.createElement('div');
  help.style.width = '100%';
  help.style.marginTop = game.sizeRow * 1.5 + 'px';
  help.setAttribute('id', 'help');
  help.id = 'help';
  game.boardShips.appendChild(help);
  let textHelp = document.createElement('p');
  help.appendChild(textHelp);
  textHelp.style.margin = game.sizeRow + 'px';
  textHelp.style.marginBottom = 0;

  textHelp.style.fontSize = '15px';
  textHelp.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum exercitationem numquam officia optio veritatis! Assumenda beatae cupiditate delectus enim illo, officia quae quos temporibus! Adipisci alias amet aut ducimus eius est eum fugit illum minus mollitia, perferendis, repellendus reprehenderit repudiandae suscipit voluptas? Alias animi cumque nam praesentium quam quasi voluptatem!'
}
createInform()

function createHomeShips(){
  let home = document.createElement('div');
  game.boardShips.appendChild(home);
  // home.style.top = help.getBoundingClientRect().bottom + 'px';
  home.style.border = '1px solid green';
  home.id = 'HomeShips';
  home.style.position = 'relative';
  home.style.height = 9 * game.sizeRow+ 'px';
  home.style.width = '100%';
}
createHomeShips()

// показываем корабли
function createShip(player, name) {
  game.HomeShips = document.getElementById('HomeShips')
  let posLeft = game.sizeRow;
  for (let shipType in player) {
    let countShip = player[shipType][0];
    let sizeShip = player[shipType][1];
    let posLeft = game.sizeRow;
    for (let i = 0; i < countShip; i++) {
      let ship = document.createElement('img');
      game.HomeShips.appendChild(ship);
      ship.setAttribute('src', 'image/ship' + sizeShip + shipType + '.png');
      ship.style.height = game.sizeRow + 'px';
      ship.style.width = game.sizeRow * sizeShip + 'px';
      ship.style.position = 'absolute';
      ship.style.display = 'block';
      ship.className = name;
      ship.style.left = posLeft + 'px';
      posLeft += ship.offsetWidth + game.sizeRow;
      ship.style.top = game.sizeRow * 2 * player[shipType][1] - game.sizeRow+ 'px';
    }
  }

}
createShip(game.shipPlayer, 'player')


//Отрисовываем главное изображение
function dowloadImg() {
  let img = document.createElement('img');
  img.setAttribute('src', 'image/Battleship-High-Cop.jpg');
  img.setAttribute('id', 'img');
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.zIndex = '10';
  img.style.position = 'fixed';
  boardGame.appendChild(img);
  }
dowloadImg()
// создаем кнопку new game
function createButtonGame() {
  let buttonGame = document.createElement('input');
  boardGame.appendChild(buttonGame);
  buttonGame.setAttribute('type', 'button');
  buttonGame.setAttribute('value', 'New game');
  buttonGame.setAttribute('id', 'newGame');
  buttonGame.setAttribute('onclick', 'newGame()');
}
createButtonGame()
// создаем кнопку back
function createButtonBack() {
  let buttonBack = document.createElement('input');
  boardGame.appendChild(buttonBack);
  buttonBack.style.left = 0
  buttonBack.setAttribute('type', 'button');
  buttonBack.setAttribute('value', 'Back');
  buttonBack.setAttribute('id', 'back');
  buttonBack.setAttribute('onclick', 'back()');
}
createButtonBack()
let buttonBack = document.getElementById('back')
// создаем кнопку play
function createButtonPlay() {
  let buttonPlay = document.createElement('input');
  boardGame.appendChild(buttonPlay);
  buttonPlay.style.display = 'block';
  buttonPlay.setAttribute('type', 'button');
  buttonPlay.setAttribute('value', 'Play');
  buttonPlay.setAttribute('id', 'play');
  buttonPlay.setAttribute('onclick', 'play()');
}
// создаем кнопку Update
function createButtonUpdate() {
  let buttonUpdate = document.createElement('input');
  game.battleBoard.appendChild(buttonUpdate);
  buttonUpdate.setAttribute('type', 'button');
  buttonUpdate.setAttribute('value', 'Update');
  buttonUpdate.setAttribute('onclick', 'Update()');
  buttonUpdate.setAttribute('id', 'Update');
  // buttonUpdate.style.right = buttonUpdate.offsetHeight / 2 + 'px'
  // buttonUpdate.style.bottom = buttonUpdate.offsetHeight / 2 + 'px'
  buttonUpdate.style.position = 'absolute';
}
createButtonUpdate()

// Создание кнопки random
function createButtonRandom(){
  let buttonRandom = document.createElement('input');
  game.battleBoard.appendChild(buttonRandom);
  buttonRandom.style.right = 0
  buttonRandom.setAttribute('type', 'button');
  buttonRandom.setAttribute('value', 'Random');
  buttonRandom.id = 'Random';
  buttonRandom.setAttribute('onclick', 'Random(game.battleBoard, game.randomPlayer, "player")');
}
createButtonRandom()

//создание выстрела
document.addEventListener('click', startBattle, false);
function startBattle(EO){

  EO = EO || window.event;
  EO.preventDefault();
  if(EO.target.tagName == 'TD') {

    let shotX = Math.round(EO.target.offsetLeft / game.sizeRow);
    let shotY = Math.round(EO.target.offsetTop / game.sizeRow);
    for (let i of game.busy) {
      if (shotX == i[0] && shotY == i[1]) {
        EO.target.style.background = 'green';
      } else {
        EO.target.style.background = 'black'
      }
    }
  }
}
// создание метки
document.addEventListener("contextmenu", NeutralCell, false);
function NeutralCell(EO) {
  EO = EO || window.event;
  if (EO.target.tagName == 'TD') {
    EO.preventDefault();
    let cellImg = EO.target;
    if (cellImg.style.background == '') {
      cellImg.style.background = 'orange';
    } else {
      cellImg.style.background = '';
    }
  }
}

function Cancle(){
  let modal = document.getElementById('modal');
  modal.style.display = 'none';
}
function Modal(){
  let modal = document.getElementById('modal');
  switchToList({page: 'second'});
  game.HomeShips.remove();
  Update()
  modal.style.display = 'none';
}
let table = document.getElementById('boardTab');
let tablePosition = table.getBoundingClientRect();

function createTotal(){
  let total = document.createElement('div');
  total.id= 'total';
  total.style.width= '100%';
  total.style.height= '10%';
  total.style.textAlign = 'center';
  total.style.border = '1px solid blue';
  total.style.position = 'absolute';
  total.style.top = game.boardShips.offsetHeight + game.boardShips.offsetTop +'px';
  boardGame.appendChild(total);
}
createTotal()
function totalPl(gamer, name){
  gamer = document.createElement('h4');
  gamer.style.position = 'absolute';
  gamer.style.margin= '10px';
  gamer.style.fontSize = '25px';
  if(name == 'player'){
    gamer.style.left = '15%'
    gamer.textContent = 'player';
  } else{
    gamer.style.right= '15%';
    gamer.textContent = 'computer'
  }
  document.getElementById('total').appendChild(gamer)
}
totalPl('human','player');
totalPl('machine','computer');
// function createShips() { // отрисовываем корабли
//   for (let i = 0; i < game.ship.length; i++) {
//     let posLeft = game.sizeRow
//     for (let k = 0; k < game.ship.length - i; k++) {
//       let ship = document.createElement('img');
//       game.boardShips.appendChild(ship);
//       ship.setAttribute('src', 'image/ship' + game.ship[i] + '.png');
//       ship.setAttribute('class', game.ship[i]);
//       ship.style.position = 'absolute';
//       ship.style.width = game.ship[i][0] * game.sizeRow + 'px';
//       ship.style.left = posLeft + 'px';
//       posLeft += ship.offsetWidth + game.sizeRow
//       ship.style.top = game.sizeRow * 2 * i + help.getBoundingClientRect().bottom + game.sizeRow + 'px';
//       ship.style.height = game.sizeRow + 'px';
//       ship.style.boxSizing = 'border-box';
//     }
//   }
// }
// createShips()

function pullImage() {
  let DragImage = null;
  let table = document.getElementsByTagName('table');
  let clickInImgX;
  let clickInImgY;
  let image = game.boardShips.querySelector('img');
  let position = [];
  let DragImagePosition;
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
      window.onmouseup = DragStop;
      window.onmousemove = DragMove;
    }
  }

  function DragMove(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    let DragImageX;
    let DragImageY;
    DragImageY = EO.pageY - clickInImgY;
    DragImageX = EO.pageX - clickInImgX;
    DragImage.style.left = DragImageX + 'px';
    DragImage.style.top = DragImageY + 'px';
    DragImage.style.cursor = 'grabbing';
    DragImage.style.position = 'absolute';
//-----------------------------------------------------------
    DragImagePosition = DragImage.getBoundingClientRect();

    let activeShip = [[0,0]];
      if (!DragImage.style.transform ) {
        for (let n = 0; n < Math.round(DragImage.offsetWidth / 10) * 10 / Math.round(game.sizeRow / 10 * 10); n++) {
          let activeShipX = Math.round((DragImagePosition.left - tablePosition.left) / game.sizeRow);
          let activeShipY = Math.round((DragImagePosition.top - tablePosition.top) / game.sizeRow);
          activeShipX += n;
          for (let i = 0; i < game.busy.length; i++){
          if(activeShipX == game.busy[i[0]]){
            console.log(game.busy[i[0]])
            DragImage.style.border = '4px solid pink';}
          }
          activeShip.push([activeShipX, activeShipY]);
          // console.log('x ' +activeShipX)
          // console.log('y '+activeShipY)
        }
      } else {
        for (let n = 0; n < Math.round(DragImage.offsetWidth / 10) * 10 / (Math.round(game.sizeRow / 10) * 10); n++) {
          let activeShipX = Math.floor((DragImagePosition.left - tablePosition.left) / game.sizeRow);
          let activeShipY = Math.ceil((DragImagePosition.top - tablePosition.top) / game.sizeRow);
          activeShipY += n;
          activeShip.push([activeShipX, activeShipY]);
        }
      }

    for (let arr of game.busy) {
      for (let p = 0; p < activeShip.length; p++) {
        if (activeShip[p][0]===arr[0] && activeShip[p][1]===arr[1]) {
          DragImage.style.border = '4px solid pink';
          // console.log(activeShip[p][0])
          // console.log(game.busy[i][0])
        } else {
          DragImage.style.border = '0';
        }
      }
    }
//---------------------------------------------------
//     let value = game.battleBoard.children
//     for (let v = 0; v < value.length; v++) {
//       if (value[v].offsetLeft < DragImagePosition.right + game.sizeRow && value[v].offsetLeft + value[v].offsetWidth > DragImagePosition.left - game.sizeRow
//         && value[v].offsetTop < DragImagePosition.bottom + game.sizeRow && value[v].offsetTop + value[v].offsetHeight > DragImagePosition.top - game.sizeRow) {
//         DragImage.style.border = '3px solid green';
//
//       } else {
//         DragImage.style.border = '0';
// //?????????????????????????
//       }console.log("v = "+v)
//     }
    // }
    // let ships = battleBoard.children;
    // for (let value of ships) {
    //   if (value === DragImage) {
    //     continue
    //   }
    //
    //   if (value.offsetLeft < DragImagePosition.right + game.sizeRow && value.offsetLeft+value.offsetWidth > DragImagePosition.left - game.sizeRow
    //     && value.offsetTop < DragImagePosition.bottom + game.sizeRow && value.offsetTop + value.offsetHeight > DragImagePosition.top - game.sizeRow) {
    //     console.log(value.offsetWidth)
    //     DragImage.style.border = '3px solid green';
    //   }
    //   else{DragImage.style.border = '1px solid blue'}
    // }
    window.onmouseup = DragStop;
  }

  function DragStop(EO) {
    EO = EO || window.event;
    DragImagePosition = DragImage.getBoundingClientRect();
    let tablePosition = table[0].getBoundingClientRect();
    if (DragImagePosition.left < tablePosition.left + game.sizeRow * 0.5 || DragImagePosition.right > tablePosition.right + game.sizeRow / 2
      || DragImagePosition.top < tablePosition.top + game.sizeRow * 0.5 || DragImagePosition.bottom > tablePosition.bottom + game.sizeRow / 2) {
      DragImage.style.left = firstPositionLeft;
      DragImage.style.top = firstPositionTop;
    } else if
    (DragImage.offsetParent != game.battleBoard) {
      game.battleBoard.appendChild(DragImage);
      let roundLeft = DragImagePosition.left / game.sizeRow;
      DragImage.style.left = Math.ceil(roundLeft) * game.sizeRow - roundLeft + Math.floor(roundLeft) + 'px';
      DragImage.style.top = Math.round(DragImagePosition.top / game.sizeRow) * game.sizeRow + 'px';
    } else if (DragImage.offsetParent == game.battleBoard) {
      DragImage.style.top = Math.round(DragImagePosition.top / game.sizeRow) * game.sizeRow + 'px';
      DragImage.style.left = Math.round(DragImagePosition.left / game.sizeRow) * game.sizeRow + 'px';  //????????????? при нажатии сдвигается за счет округления
      DragImage.style.border = '0';
    }
    if (game.battleBoard.children.length > 10) {
      createButtonPlay();

    }
    squareBusy(DragImage)
    window.onmousemove = null;
    window.onmouseup = null;
    DragImage.style.cursor = 'auto';
  }
}

pullImage()

//---------------------------------------------------------------

function squareBusy(activeShip) {
    if (activeShip.style.transform === '') {
      for (let n = 0; n < Math.round(activeShip.offsetWidth / 10) * 10 / (Math.round(game.sizeRow / 10) * 10); n++) {
        let squareX = Math.ceil((activeShip.offsetLeft - tablePosition.left) / game.sizeRow);
        let squareY = Math.ceil((activeShip.offsetTop - tablePosition.top) / game.sizeRow)
        squareX += n;
        if(activeShip.parentElement.id == 'battleBoard'){
          game.busy.push([squareX, squareY])
        }
      }
    } else {
      for (let n = 0; n < Math.round(activeShip.offsetWidth / 10) * 10 / (Math.round(game.sizeRow / 10) * 10); n++) {
        let squareX = Math.floor((activeShip.offsetLeft - tablePosition.left) / game.sizeRow);
        let squareY = Math.ceil((activeShip.offsetTop - tablePosition.top) / game.sizeRow);
        squareY += n;
        if(activeShip.parentElement.id == 'battleBoard'){
          game.busy.push([squareX, squareY])
        }
      }
    }
}
// -------------------------------------------------------------

// поворот на 90
document.addEventListener("contextmenu", Rotate, false);

function Rotate(EO) {
  EO = EO || window.event;
  if (EO.target.tagName == 'IMG') {
    EO.preventDefault();
    let ImageRotate = EO.target;
    ImageRotate.style.transformOrigin = '' + game.sizeRow + 'px' + ' ' + 0 + 'px' + '';
    if (!ImageRotate.style.transform) {
      ImageRotate.style.transform = 'rotate(90deg)';
      // ImageRotate.style.left = ImageRotate.style.left.replace('px', '') * 1 + game.sizeRow + 'px';
    } else {
      ImageRotate.style.transform = '';
      // ImageRotate.style.left = ImageRotate.style.left.replace('px', '') * 1 - game.sizeRow + 'px';
    }
  }
}


function Update() {
  game.HomeShips.remove();
  game.battleBoard.remove();
  createHomeShips();
  createShip(game.shipPlayer, 'player');
  createBattleBoard();
  game.battleBoard = document.getElementById('battleBoard');
  createButtonUpdate();
  createButtonRandom();
}
// Update()
function Random(field, bus, name) {
 bus=[];
  let table = document.getElementsByTagName('table');
  let ship = document.querySelectorAll('.'+name+'');
  let posRanShipX;
  let posRanShipY;
  for (let i = 0; i < ship.length; i++) {
    ship[i].style.transformOrigin = '0 0';
    let vertical = (game.random(1) == 1) ? (ship[i].style.transform = 'rotate(90deg)') : (ship[i].style.transform = '')
    field.appendChild(ship[i]);
    if (!ship[i].style.transform) {
      posRanShipX = game.random(9 - Math.floor(ship[i].offsetWidth) / Math.round(game.sizeRow));
      posRanShipY = game.random(9);
      ship[i].style.left = table[0].getBoundingClientRect().left + posRanShipX * game.sizeRow + game.sizeRow + 'px';
      ship[i].style.top = table[0].getBoundingClientRect().top + posRanShipY * game.sizeRow + game.sizeRow + 'px';
      for (let p = 1; p <= Math.round(ship[i].offsetWidth / 10) * 10 / (Math.round(game.sizeRow / 10) * 10); p++) {
        bus.push([posRanShipX + p, posRanShipY + 1]);
      }
    } else {
      posRanShipX = game.random(9);
      posRanShipY = game.random(9 - Math.floor(ship[i].offsetWidth) / Math.round(game.sizeRow));
      ship[i].style.left = table[0].getBoundingClientRect().left + posRanShipX * game.sizeRow + game.sizeRow * 2 + 'px';
      ship[i].style.top = table[0].getBoundingClientRect().top + posRanShipY * game.sizeRow + game.sizeRow + 'px';
      for (let p = 1; p <= Math.round(ship[i].offsetWidth / 10) * 10 / (Math.round(game.sizeRow / 10) * 10); p++) {
        bus.push([posRanShipX + 1, posRanShipY + 1]);
      }
    }
  }
}

function winner(){
let anim = document.createElement('img');
anim.src = '../youwin.gif';
  anim.style.position = 'absolute';
  anim.id = 'winner';
  anim.style.display = 'block';
  anim.style.left = '50%';
  anim.style.transform = 'translate(-50%, 0)' ;
  boardGame.appendChild(anim)
}


// создать дистанцию кораблей
// отработать поподания по кораблям
// создать рандомную расстановку кораблей
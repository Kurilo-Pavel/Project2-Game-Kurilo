'use strict'
let game = {
  size: 11, // число строк || столбцов
  sizeRow: null, // размер ячейки
  computerName:['Капитан', 'Матроскин', 'Пират', 'Профи', 'Новичок', 'Русалка', 'Гарри'],
  shipPlayer: {Small: [4, 1], Medium: [3, 2], Big: [2, 3], Huge: [1, 4]},
  shipComputer: {Small: [4, 1], Medium: [3, 2], Big: [2, 3], Huge: [1, 4]},
  rowNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  colLetter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  board: null,
  boardShips: null, // div для размещения кораблей компьютера
  battleBoard: null, // div  для размещения кораблей игрока
  homeShips: null,
  randomPlayer: [], // массив расположения кораблей игрока
  randomComputer: [], // массив расположения кораблей компьютера
  rezultPl:  {name: null, winner: 3, losing: 1}, // счет
  shotComputer: [[0,0]], // массив выстрелов
  random(n){
    return Math.floor(Math.random()*(n+1))
  }
}
let boardGame = document.getElementById('boardGame');
//------------------------------------------------
class Element{
  constructor(selector) {
    this.selector = document.createElement(selector)
  }
  hide(){
    this.selector.style.display = 'none'
  }
  show(){
    this.selector.style.display = 'inline-block'
  }
}
class Field extends Element{
  constructor(options){
    super(options.selector)
   const par = document.getElementById(options.parent)
   par.appendChild(this.selector)
    this.selector.id = options.id
    this.selector.style.width = options.width
    this.selector.style.height = options.height
    this.selector.style.position = options.position
    this.selector.style.border = options.border
    this.selector.style.left = options.left
    this.selector.style.right = options.right
    this.selector.style.top = options.top
    this.selector.style.margin = options.margin
    this.selector.style.background = options.background
    this.selector.style.zIndex = options.zIndex
    this.selector.style.transform = options.transform
    this.selector.style.textAlign = options.textAlign
    this.selector.style.fontSize = options.fontSize
    this.selector.style.display = options.display
  }
}
const modalWind = new Field({ // модалка
  parent: 'boardGame',
  selector: 'div',
  id: 'modal',
  width: '40%',
  height: '30%',
  position: 'fixed',
  background: 'grey',
  zIndex: '50',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  border: '2px solid white',
  display: 'none'
})
const modalRezult = new Field({
  parent: 'boardGame',
  selector: 'div',
  id: 'modalRez',
  width: '40%',
  height: '30%',
  position: 'fixed',
  background: 'grey',
  zIndex: '50',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  border: '2px solid white',
  display: 'none'
})

class  TextModal extends Field{ // текст модалки
  constructor(options) {
    super(options);
    this.selector.style.color = options.color
    this.selector.textContent = options.textContent
  }
}
const text = new TextModal({
  parent: 'modal',
  selector: 'h3',
  id: 'textMod',
  margin: '10px',
  color: 'white',
  textContent: 'Укажите свое имя'
})
class FieldName extends TextModal{
  constructor(options) {
    super(options);
    this.selector.style.paddingLeft = options.paddingLeft
    this.selector.value = options.value
    this.selector.type = options.type
  }
}
class Button extends FieldName{
  constructor(options) {
    super(options);
    this.selector.onclick = options.onclick
  }
}
const fName = new FieldName({ // поле ввода модалки
  parent: 'modal',
  selector: 'input',
  id: 'name',
  position: 'relative',
  type: 'text',
  value: 'name',
  paddingLeft: '15px',
  color: 'darkblue',
  width: '80%'
})
const buttonRezult = new Button({
  parent: 'boardGame',
  selector: 'input',
  id: 'Rezult',
  value: 'Rezult',
  type: 'button',
  right: '5%',
  zIndex: '2',
  onclick: rezult
})
const okRezult = new Button({ //кнопка Отмена
  parent: 'modalRez',
  selector: 'input',
  id: 'okRez',
  position: 'absolute',
  type: 'button',
  value: 'OK',
  fontSize: '13px',
  bottom: '0px',
  onclick: okRez
})
const butOk = new  Button({ // кнопка ОК
  parent: 'modal',
  selector: 'input',
  id: 'Ok',
  position: 'relative',
  type: 'button',
  value: 'Ok',
  fontSize: '13px',
  onclick: ok,

})
const butCancle = new Button({ //кнопка Отмена
  parent: 'modal',
  selector: 'input',
  id: 'Cancle',
  position: 'relative',
  type: 'button',
  value: 'Cancle',
  fontSize: '13px',
  onclick: cancle
})
const boardPlayer = new Field({ // поле игрока
  parent: 'boardGame',
  selector: 'div',
  id: 'board',
})
if (board.offsetWidth < board.offsetHeight) {
  game.sizeRow = Math.round(board.offsetWidth / 14);
} else {
  game.sizeRow = Math.round(board.offsetHeight / 14);
}
const boardShips = new Field({ //пoле компьютера
  parent: 'boardGame',
  selector: 'div',
  id: 'ship'
})
const battle = new Field({ // поле куда заносим корабли
  parent: 'boardGame',
  selector: 'div',
  id: 'battleBoard',
  width: '50%',
  height: '70%',
  top: '0',
  border: '1px solid red',
  position: 'absolute',
  boxSizing: 'border-box'//???????????????
})
const inform = new Field({ // поле подсказки
  parent: 'ship',
  selector: 'div',
  id: 'help',
  width: '100%',

})

let textH = new TextModal({ // текст в поле подсказке
  parent: 'help',
  selector: 'p',
  id: 'textHelp',
  margin: game.sizeRow + 'px',
  fontSize: '15px',
  textContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
    'Earum exercitationem numquam officia optio veritatis! Assumenda beatae ' +
    'cupiditate delectus enim illo, officia quae quos temporibus! Adipisci' +
    ' alias amet aut ducimus eius est eum fugit illum minus mollitia, ' +
    'perferendis, repellendus reprehenderit repudiandae suscipit voluptas?' +
    ' Alias animi cumque nam praesentium quam quasi voluptatem!'
})
const homeShips = new Field({
  parent: 'ship',
  selector: 'div',
  id: 'HomeShips',
  border: '1px solid green',
  position: 'absolute',
  // height: 9*game.sizeRow + 'px',
  width: '100%',
})
class Img extends Field{
  constructor(options) {
    super(options);
    this.selector.src = options.src
  }
}
const firstImg = new Img({ // Главное изображение
  parent: 'boardGame',
  selector: 'img',
  id: 'img',
  width: '100%',
  height: '100%',
  position: 'fixed',
  src: 'image/Battleship-High-Cop.jpg',
})

const buttonNewGame = new Button({ //кнопка New game
  parent: 'boardGame',
  selector: 'input',
  id: 'newGame',
  value: 'New game',
  type: 'button',
  onclick: newGame
})
const buttonBack = new Button({ //кнопка Back
  parent: 'boardGame',
  selector: 'input',
  id: 'back',
  value: 'Back',
  type: 'button',
  onclick: back
})
// const buttonUpdate = new Button({ //кнопка Update
//   parent: 'battleBoard',
//   selector: 'input',
//   id: 'update',
//   value: 'Update',
//   type: 'button',
//   onclick: Update,
//   position: 'absolute',
//   right: '5%'
// })
const buttonPlay = new Button({ //кнопка Play
  parent: 'boardGame',
  selector: 'input',
  id: 'play',
  value: 'Play',
  type: 'button',
  onclick: play,

})
const buttonRandom = new Button({ //кнопка Random
  parent: 'battleBoard',
  selector: 'input',
  id: 'Random',
  value: 'Random',
  type: 'button',
  onclick: wrapperRandom,//???????????????????????
  position: 'absolute'
})
const total = new Field({
  parent: 'boardGame',
  selector: 'div',
  id: 'total',
  width: '100%',
  height: '10%',
  top: boardPlayer.selector.offsetHeight + 'px',
  textAlign: 'center',
  dorder: '1px solid blue',
  position: 'absolute'
})
// const winner = new Img({
//   parent: 'boardGame',
//   selector: 'img',
//   id: 'winner',
//   position: 'absolute',
//   left: '50%',
//   transform: 'translate(-50%, 0)',
//   src: '../youwin.gif',
//   display: 'none'
// })
const totalPlayer = new TextModal({
  parent: 'total',
  selector: 'h4',
  margin: '10px',
  fontSize: '25px',
  position: 'absolute',
  left: '15%',
  textContent: 'player'
})
const totalComputer = new TextModal({
  parent: 'total',
  selector: 'h4',
  margin: '10px',
  fontSize: '25px',
  position: 'absolute',
  right: '15%',
  textContent: 'computer'
})

//------------------------------------------------
function newGame(){
  modalWind.show()
}
function rezult(){
  modalRezult.show()
}
function cancle(){
  modalWind.hide()
}
function okRez(){
  modalRezult.hide()
}
function ok() {
  if (fName.selector.value.length >= 5) {
    modalWind.hide();
     switchToList({page: 'second'});
    let name = document.getElementById('name')
    game.rezultPl.name = name.value;
    locStorage()
    // SendMessage()
  } else {
    alert('Имя должно содержать болеше 4 символов!!!')
  }
}

function locStorage(){
  let name = document.getElementById('name')
  let keyShip = JSON.stringify(name.value);
  for (let i=0; i< localStorage.length;i++){
    if (JSON.parse(localStorage.key(i)) == name.value){
      game.rezultPl.winner += JSON.parse(localStorage.getItem(keyShip)).winner;
      game.rezultPl.losing += JSON.parse(localStorage.getItem(keyShip)).losing;
    }
  }
  localStorage.setItem(keyShip, JSON.stringify(game.rezultPl));
// localStorage.clear();
}

function back() {
  let statePage = JSON.parse(decodeURIComponent(location.hash.substr(1))).page;
  if (statePage == 'second') {
    switchToList({page: 'first'});
  } else {
    switchToList({page: 'second'});
  }

}
function play() {
  switchToList({page: 'third'});
  namePlayer('player', 'player');
  namePlayer('computer', 'computer');
  createBord(game.boardShips);
  showShipComputer()
  random(HomeShips, 'computer');
  squareBusy(seach('computer'),'HomeShips',game.randomComputer)
  playComputer();
  console.log(game.shotComputer)
  console.log(game.randomPlayer)
  console.log(game.randomComputer)
}
//////////////////////////////////////////////////////////////////////
function random(field, name) {
  let search = [[]];
  let ship = document.querySelectorAll('.' + name + '');
  let table = document.getElementsByTagName('table');
  for (let i = 0; i < ship.length; i++) {
    ship[i].style.transformOrigin = '0 0';
    (game.random(1) === 1) ? (ship[i].style.transform = 'rotate(90deg)') : (ship[i].style.transform = '')

    // pos(ship[i], search)


const {posRanShipX, posRanShipY} = pos(ship[i], search);
    if (!ship[i].style.transform) {
      ship[i].style.left = table[0].getBoundingClientRect().left + posRanShipX * game.sizeRow + game.sizeRow + 'px';
      ship[i].style.top = table[0].getBoundingClientRect().top + posRanShipY * game.sizeRow + game.sizeRow + 'px';
      for (let p = 0; p < Math.round(ship[i].offsetWidth / game.sizeRow); p++) {
        search.push([posRanShipX + p, posRanShipY].toString());
        search.push([posRanShipX + p, posRanShipY + 1].toString());
        search.push([posRanShipX + p, posRanShipY + 2].toString());
        search.push([posRanShipX + p + 1, posRanShipY].toString());
        search.push([posRanShipX + p + 1, posRanShipY + 1].toString());
        search.push([posRanShipX + p + 1, posRanShipY + 2].toString());
        search.push([posRanShipX + p + 2,posRanShipY].toString());
        search.push([posRanShipX + p + 2, posRanShipY + 1].toString());
        search.push([posRanShipX + p + 2, posRanShipY + 2].toString());

        field.appendChild(ship[i]);

      }
    } else {
      ship[i].style.left = table[0].getBoundingClientRect().left + posRanShipY * game.sizeRow + game.sizeRow * 2 + 'px';
      ship[i].style.top = table[0].getBoundingClientRect().top + posRanShipX * game.sizeRow + game.sizeRow + 'px';
      for (let p = 0; p < Math.round(ship[i].offsetWidth / game.sizeRow); p++) {
        search.push([posRanShipY, posRanShipX + p].toString());
        search.push([posRanShipY, posRanShipX + p + 1].toString());
        search.push([posRanShipY, posRanShipX + p + 2].toString());
        search.push([posRanShipY + 1, posRanShipX + p].toString());
        search.push([posRanShipY + 1, posRanShipX + p + 1].toString());
        search.push([posRanShipY + 1, posRanShipX + p + 2].toString());
        search.push([posRanShipY + 2, posRanShipX + p].toString());
        search.push([posRanShipY + 2, posRanShipX + p + 1].toString());
        search.push([posRanShipY + 2, posRanShipX + p + 2].toString());

        field.appendChild(ship[i]);

      }
    }console.log(search)
  }
}

function pos(sh,sea) {

  let posRanShipX = game.random(9 - Math.floor(sh.offsetWidth) / Math.round(game.sizeRow));
  let posRanShipY = game.random(9);
  if (!sh.style.transform) {
    if (sea.indexOf([(posRanShipX + 1), (posRanShipY + 1)].toString()) !== -1) {
      console.log('aaaaaaaaaaaaaaaaaaaaa');
      pos(sh, sea);
    } else {
      console.log(sea.indexOf([(posRanShipX + 1), (posRanShipY + 1)].toString()));
      console.log((posRanShipX + 1) + '/' + (posRanShipY + 1));
      return {posRanShipX, posRanShipY};
    }
  } else {
    if (sea.indexOf([(posRanShipY + 1), (posRanShipX + 1)].toString()) !== -1) {
      console.log('aaaaaaaaaaaaaaaaaaaaa');
      pos(sh, sea);
    } else {
      console.log(sea.indexOf([(posRanShipY + 1), (posRanShipX + 1)].toString()));
      console.log((posRanShipY + 1) + '/' + (posRanShipX + 1));
      return {posRanShipX, posRanShipY};
    }

  }
}



// function pos(sh,sea) {
//   console.log(sea)
//   let posRanShipX = game.random(9 - Math.floor(sh.offsetWidth) / Math.round(game.sizeRow));
//   let posRanShipY = game.random(9);
//   for (let s = 0; s < sea.length; s++) {
//     if ((posRanShipX + 1) === sea[s][0] && (posRanShipY + 1) === sea[s][1]) {
//       console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
//       pos(sh,sea)
//     } else{
//       return {posRanShipX: posRanShipX, posRanShipY: posRanShipY}
//     }
//   }
// }
    // let tab = document.getElementById('boardTab')
    // for(let m = 0; m<search.length;m++){
    //   if(search[m][0]==1 ){
    //     tab.rows[search[m][1]].cells[(search[m][0])-1].style.background = 'red';
    //
    //   }
    //   if(search[m][1]==1){
    //     tab.rows[(search[m][1])+1].cells[search[m][0]].style.background = 'red';
    //
    //   }
    //   else{tab.rows[search[m][1]].cells[search[m][0]].style.background = 'red';
    // }
    // }


function showShipComputer(){
  game.randomComputer = []
  for (let i = 0; i < computerShip.length; i++) {
    if (computerShip[i].style.display === 'none') {
      computerShip[i].style.display = 'block';
    }
  }
}
function wrapperRandom() {
  game.randomPlayer = []
  random(battleBoard, 'player')
  squareBusy(seach('player'),'battleBoard',game.randomPlayer)
  console.log(game.randomPlayer)
}

//------------------------------------------------




game.board = document.getElementById('board');
game.boardShips = document.getElementById('ship');
game.battleBoard = document.getElementById('battleBoard');


function namePlayer(value, name){
  value = document.createElement('span');
  value.style.width = '50%';
  value.style.height = game.sizeRow*2+'px';
  value.style.border = '1px solid darkpink';
  value.style.display = 'inline-block';
  value.style.textAlign = 'center';
  value.style.position = 'relative';
value.className = 'Name';
  boardGame.appendChild(value);
  let text = document.createElement('h3');
  if(name == 'player'){
    text.textContent = document.getElementById('name').value
  }else {
    text.textContent = game.computerName[game.random(7)]
  }
  value.appendChild(text);
  text.style.verticalAlign = 'middle';
  text.style.fontSize = '25px';
}

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
  tab.style.zIndex = '-1';
  tab.setAttribute('id', field.id+'Tab');
  for (let i = 1; i <= game.size; i++) {
    let row = document.createElement('tr');
    row.className = 'i'+i;
    tab.appendChild(row);
    for (let n = 1; n <= game.size; n++) {
      let col = document.createElement('td');
      row.appendChild(col);
      col.className = 'n'+n;
      col.style.border = '1px solid black';
      col.style.height = game.sizeRow + 'px';
      col.style.boxSizing = 'border-box';
    }
  }
  Letters(field)
}
createBord(game.board)

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

// game.homeShips = document.getElementById('homeShips')
// показываем корабли
function createShip(player, name) {
  game.homeShips = document.getElementById('HomeShips')
    for (let shipType in player) {
    let countShip = player[shipType][0];
    let sizeShip = player[shipType][1];
    let posLeft = game.sizeRow;
    for (let i = 0; i < countShip; i++) {
      let ship = document.createElement('img');
      game.homeShips.appendChild(ship);
      ship.setAttribute('src', 'image/ship' + sizeShip + shipType + '.png');
      ship.style.height = game.sizeRow + 'px';
      ship.style.width = (game.sizeRow-1) * sizeShip + 'px';
      ship.style.position = 'absolute';
      ship.style.display = 'block';
      // ship.style.boxSizing = 'border-box';
      ship.className = name;
      ship.style.left = posLeft + 'px';
      posLeft += ship.offsetWidth + game.sizeRow;
      ship.style.top = game.sizeRow * 2 * player[shipType][1] - game.sizeRow+ 'px';
    }
  }
}
createShip(game.shipPlayer, 'player')
createShip(game.shipComputer, 'computer');

//создание выстрела
document.addEventListener('click', startBattle, false);
function startBattle(EO){

  EO = EO || window.event;
  EO.preventDefault();
  if(EO.target.tagName == 'TD') {
    let shotX = Math.round(EO.target.offsetLeft / game.sizeRow);
    let shotY = Math.round(EO.target.offsetTop / game.sizeRow);
    for (let i of game.randomPlayer) {
      if (shotX == i[0] && shotY == i[1]) {
        EO.target.style.background = 'green';
        return
      } else {
        EO.target.style.background = 'black';
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
    if ( cellImg.style.background == '' && cellImg.style.background != 'black' &&  cellImg.style.background != 'green') {
      cellImg.style.background = 'orange';
    }
    else if (cellImg.style.background == 'orange') {
      cellImg.style.background = '';
    }
  }
}
//--------------------------------------------------------
document.addEventListener('click', areaShip, false);
function  areaShip(EO){
  EO = EO||window.event;
  if(EO.target.className == 'player'){
    EO.preventDefault();
    game.randomPlayer = []
    let ship = document.getElementsByClassName('player');
squareBusy(ship,'battleBoard',game.randomPlayer)
    console.log(game.randomPlayer)
  }
}
//--------------------------------------------------------------
let table = document.getElementById('boardTab');
let tablePosition = table.getBoundingClientRect();



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
          for (let i = 0; i < game.randomPlayer.length; i++){
          if(activeShipX == game.randomPlayer[i[0]]){
            console.log(game.randomPlayer[i[0]])
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

    for (let arr of game.randomPlayer) {
      for (let p = 0; p < activeShip.length; p++) {
        if (activeShip[p][0]===arr[0] && activeShip[p][1]===arr[1]) {
          DragImage.style.border = '4px solid pink';
          return
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
      buttonPlay.show();

    }
    squareBusy(DragImage)
    window.onmousemove = null;
    window.onmouseup = null;
    DragImage.style.cursor = 'auto';
  }
}

pullImage()

//---------------------------------------------------------------

function squareBusy(activeShip, board, when) {
  for(let i=0; i<activeShip.length; i++){
  if (activeShip[i].style.transform == ''|| undefined) {
        for (let n = 0; n < Math.ceil(activeShip[i].offsetWidth  / game.sizeRow ); n++) {
      let squareX = Math.round(Math.round((activeShip[i].offsetLeft - tablePosition.left)) / game.sizeRow);
      let squareY = Math.round(Math.round((activeShip[i].offsetTop - tablePosition.top)) / game.sizeRow);
      squareX += n;
      if (activeShip[i].parentElement.id == board) {
       when.push([squareX, squareY])
      }
    }
  } else {
    for (let n = 0; n < Math.round(activeShip[i].offsetWidth / 10) * 10 / (Math.round(game.sizeRow / 10) * 10); n++) {
      let squareX = Math.round(Math.round((activeShip[i].offsetLeft - tablePosition.left)) / game.sizeRow);
      let squareY = Math.round(Math.round((activeShip[i].offsetTop - tablePosition.top)) / game.sizeRow);
      squareY += n;
      if (activeShip[i].parentElement.id == board) {
       when.push([(squareX-1), squareY])
      }}
    }
  }

}
// -------------------------------------------------------------

// поворот на 90
document.addEventListener("contextmenu", Rotate, false);

function Rotate(EO) {
  EO = EO || window.event;
  if (EO.target.className == 'player') {
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

//
// function Update() {
//   let ship = document.getElementsByClassName('player');
//   for(let i =0; i< ship.length; i++){
//     ship[i].remove()
//   }
//   // HomeShips.remove();
//   // battleBoard.remove();
//   // createHomeShips();
//   // createShip(game.shipPlayer, 'player');
//   // createBattleBoard();
//   // createButtonUpdate();
//   // createButtonRandom();
// }
// Update()

function seach(name){
  let shipName = document.getElementsByClassName(name)
  return shipName
}


// создать дистанцию кораблей
// отработать поподания по кораблям
// создать рандомную расстановку кораблей
//----------------------------------------------------------------
// const sendData = async (url, data) => {
//   const response = await fetch(url, {
//     method: 'POST', body: data
//   });
//
//   if (response.ok) {
//     throw new Error(`Ошибка ${url}, status${response}`)
//   }
//   return await response.json();
// }
//
// const sendCart = () => {
//   const data = {
//     Name: document.getElementById('name').value,
//     winner: 0,
//     losing:0
//   }
//
//   const cardList = JSON.stringify(data)
//   sendData('https://jsonplaceholder.typicode.com/posts', cardList)
// }
// sendCart()
//
// const get = async (url) =>{
//     const response = await fetch(url)
// return await  response.json()
// }
//  get('https://jsonplaceholder.typicode.com/posts')
//      .then((data)=> console.log(data))
// function notBak(){
//   let shipB = document.querySelectorAll('.computer');
//   console.log(shipB)
//   for( let i = 0; i < shipB.length; i++){
//     let shipX = shipB[i].style.left.slice(0,-2)
//     let shipY = shipB[i].style.top.slice(0,-2)
//     let squareX = Math.ceil((shipX - tablePosition.left) / game.sizeRow);
//     let squareY = Math.ceil((shipY - tablePosition.top) / game.sizeRow);
//   if(squareX > 10 && shipB[i].offsetWidth/game.sizeRow>1 &&  !shipB[i].style.transform){
//     random(HomeShips, game.randomPlayer, 'computer');
//   }
//     if(squareX >= 10 && shipB[i].offsetWidth/game.sizeRow>2 &&  !shipB[i].style.transform){
//       random(HomeShips, game.randomPlayer, 'computer');
//     }if(squareX >= 10 && shipB[i].offsetWidth/game.sizeRow>3 &&  !shipB[i].style.transform){
//       random(HomeShips, game.randomPlayer, 'computer');
//     }
//     if(squareY >= 10 && shipB[i].offsetWidth/game.sizeRow>1 && shipB[i].style.transform){
//       random(HomeShips, game.randomPlayer, 'computer');
//     }if(squareY >= 10 && shipB[i].offsetWidth/game.sizeRow>2 && shipB[i].style.transform){
//       random(HomeShips, game.randomPlayer, 'computer');
//     }if(squareY >= 10 && shipB[i].offsetWidth/game.sizeRow>3 && shipB[i].style.transform){
//       random(HomeShips, game.randomPlayer, 'computer');
//     }
// console.log(squareY)
// console.log(squareX)
//   }
//
// }
function playComputer() {
  let tab = document.getElementById('boardTab')
  let shotX = game.random(9);
  let shotY = game.random(9);
  let shotAr = [];
  for (let i = 0; i < game.shotComputer.length; i++) {
    if (shotX !== game.shotComputer[i][0] && shotY !== game.shotComputer[i][1]) {
      tab.rows[shotX+1].cells[shotY+1].style.background = 'red';
    }
  }
  shotAr.push((shotY+1), (shotX+1))
  game.shotComputer.push(shotAr);
}
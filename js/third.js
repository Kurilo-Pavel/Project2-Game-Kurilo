'use strict'
let AjaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
var Player;
var UpdatePassword;

function ShowMessages() {
  var Str = '';
  for (var i = 0; i < Player.length; i++) {
    var playerNew = Player[i];
    Str += "<b>" + EscapeHTML(playerNew.name) + ":</b> "
        + EscapeHTML(playerNew.winner) + ":</b> "
        + EscapeHTML(playerNew.losing) + "<br />";
  }
  document.getElementById('modalRez').innerHTML = Str;// appendChild
}

function EscapeHTML(text) {
  if (!text)
    return text;
  text = text.toString()
      .split("&").join("&amp;")
      .split("<").join("&lt;")
      .split(">").join("&gt;")
      .split('"').join("&quot;")
      .split("'").join("&#039;");
  return text;
}

function RefreshMessages() {
  $.ajax(
      {
        url: AjaxHandlerScript,
        type: 'POST',
        data: {f: 'READ', n: 'PAVEL_BATTLE_SHIP'},
        cache: false,
        success: ReadReady,
        error: ErrorHandler
      }
  );
}

function ReadReady(ResultH) {
  if (ResultH.error !== undefined)
    alert(ResultH.error);
  else {
    Player = [];
    if (ResultH.result !== "") {
      Player = JSON.parse(ResultH.result);
      if (!Player.length)
        Player = [];
    }
    ShowMessages();
  }
}

function SendMessage() {
  UpdatePassword = Math.random();

  $.ajax(
      {
        url: AjaxHandlerScript,
        type: 'POST',
        data: {
          f: 'LOCKGET', n: 'PAVEL_BATTLE_SHIP',
          p: UpdatePassword
        },
        cache: false,
        success: LockGetReady,
        error: ErrorHandler
      }
  );
}

function LockGetReady(ResultH) {
  if (ResultH.error !== undefined)
    alert(ResultH.error);
  else {
    Player = [];
    if (ResultH.result != "") //
    {
      Player = JSON.parse(ResultH.result);
      if (!Player.length)
        Player = [];
    }
    var PlayerName = document.getElementById('name').value;
    Player.push({name: PlayerName, winner: game.winner, losing: game.losing});
    if (Player.length > 10)
      Player = Player.slice(Player.length - 10);
    ShowMessages();
    $.ajax(
        {
          url: AjaxHandlerScript,
          type: 'POST',
          data: {
            f: 'UPDATE', n: 'PAVEL_BATTLE_SHIP',
            v: JSON.stringify(Player), p: UpdatePassword
          },
          cache: false,
          success: UpdateReady,
          error: ErrorHandler
        }
    );
  }
}

function UpdateReady(ResultH) {
  if (ResultH.error != undefined)
    alert(ResultH.error);
}

function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
  alert(StatusStr + ' ' + ErrorStr);
}

RefreshMessages()
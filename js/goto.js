function gotoBank() {
    window.location.href = 'bank.html';
}

function goToDemo() {
    window.location.href = 'demo.html';
}

function gotoMatch() {
    window.location.href = 'match3.html';
}

function gotoMatchDemo() {
    window.location.href = 'match.html';
}
function gotoTowerDemo() {
    window.location.href = 'tower.html';
}

function gotoCasino() {
    window.location = window.location.origin+'/telegram-web-app-bot-example/game/index.html';
}

function gotoGames() {
    window.location.href = 'games.html';
}

$(document).ready(function () {
    setTimeout(function () {
        $('.loader-overlay').addClass('d-none');
    },5000)

})
var valueContain = document.getElementsByClassName('value');

var flag1 = document.getElementById('flag1');
var flag2 = document.getElementById('flag2');
var currency1 = document.getElementById('currency1');
var currency1 = document.getElementById('currency2');
var currencyName1 = document.getElementById('currencyName1');
var currencyName2 = document.getElementById('currencyName2');

unfade(flag1);
fade(flag1);

function fade(element) {
    var op = 1;
    var timer = setInterval( () => {
        if (op <= 0.1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ')';
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    var op = 0.1;
    var timer = setInterval( () => {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ')';
        op += op * 0.1;
    }, 10);
}
var valueContain = document.getElementsByClassName('value');

var flag1 = document.getElementById('flag1');
var flag2 = document.getElementById('flag2');
var currency1 = document.getElementById('currency1');
var currency2 = document.getElementById('currency2');
var currencyName1 = document.getElementById('currencyName1');
var currencyName2 = document.getElementById('currencyName2');

CurrencyChanger();
 
function CurrencyChanger() {
    setTimeout(() => {
        fade(flag1);
        fade(flag2);
        fade(currency1);
        fade(currency2);
        fade(currencyName1);
        fade(currencyName2);
    }, 2000)
    setTimeout(() => {
        var random = parseInt(Math.random() * 148 + 5);
        var change1 = flagFormat[random];
        var change2 = flagFormat[random - 3];
        flag1.textContent = change1[0];
        flag2.textContent = change2[0];
        currency1.textContent = change1[1];
        currency2.textContent = change2[1];
        currencyName1.textContent = change1[2];
        currencyName2.textContent = change2[2];
        }, 1000)
    setTimeout(() => {
        unfade(flag1);
        unfade(flag2);
        unfade(currency1);
        unfade(currency2);
        unfade(currencyName1);
        unfade(currencyName2);
    }, 1000)
}

setInterval(CurrencyChanger, 3000);

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.visibility = 'hidden';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    var op = 0.1;
    element.style.visibility = 'visible';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}
//#region FLAGS

var urlGetCurrency = "https://api.exchangerate.host/symbols";
var available = new Array();
//[codigo, descripcion]

var request = new XMLHttpRequest();
request.open("GET", urlGetCurrency);
request.responseType = "json";
request.send();

request.onload = () => {
  var json = request.response;
  Object.keys(json["symbols"]).forEach(function (key) {
    available.push([
      json["symbols"][key]["code"],
      json["symbols"][key]["description"],
    ]);
  });
  available.forEach((element) => {
    var country = "flag: " + countryNames.of(element[0].substring(0, 2));
    finalArray.forEach((subelement) => {
      if (subelement.includes(country)) {
        var emojiCode = subelement.substring(0, 11);
        flagFormat.push([
          String.fromCodePoint(`0x${emojiCode.substring(0, 5)}`) +
            String.fromCodePoint(`0x${emojiCode.substring(6, 11)}`),
          element[0],
          element[1],
        ]);
      }
    });
  });
  runAfter();
};

//FUNCION CONVERTIR

var urlEmojiList = "../../assets/emoji-sequences.txt";
var emojiText = new String();
var flagFormat = new Array();

var emojiFile = new XMLHttpRequest();
emojiFile.open("GET", urlEmojiList, false);
emojiFile.onreadystatechange = () => {
  if (emojiFile.readyState === 4) {
    if (emojiFile.status === 200 || emojiFile.status == 0) {
      emojiText = emojiFile.responseText;
    }
  }
};
emojiFile.send(null);

var lineArray = emojiText.split("\n");
var finalArray = new Array();
for (i = 558; i < 816; i++) {
  finalArray.push(lineArray[i]);
}
var countryNames = new Intl.DisplayNames(["en"], { type: "region" });

//#endregion
var selectedOrigin, selectedEnding;

function runAfter() {
  addElements(null, null);
}

function addElements(remove, list) {
  if (remove == null) {
    var originContainer = document.getElementById("origin");
    var endingContainer = document.getElementById("ending");
    flagFormat.forEach((element) => {
      var divContain = document.createElement("div");
      divContain.setAttribute(
        "onclick",
        `getSelected('${element[1]}', "origin")`
      );
      divContain.style.display = "flex";
      divContain.style.width = "100%";
      var spanFlag = document.createElement("span");
      var spanText = document.createElement("span");
      spanFlag.innerHTML = element[0];
      spanFlag.style.fontFamily = "Noto Color Emoji";
      spanText.innerHTML = "<b>" + element[1] + "</b>" + " " + element[2];
      divContain.innerHTML += spanFlag.outerHTML + spanText.outerHTML;
      originContainer.innerHTML += divContain.outerHTML;
      divContain.setAttribute(
        "onclick",
        `getSelected('${element[1]}', "ending")`
      );
      endingContainer.innerHTML += divContain.outerHTML;
    });
  } else {
    if (list == "origin") {
      var originContainer = document.getElementById("origin");
      var child = originContainer.lastElementChild;
      var input;
      while (child) {
        if (child.tagName == "INPUT") input = child;
        originContainer.removeChild(child);
        child = originContainer.lastElementChild;
      }
      originContainer.innerHTML += input.outerHTML;
      var tempArray = new Array();
      flagFormat.forEach((element) => {
        tempArray.push(element);
      });
      tempArray.forEach((element) => {
        if (element[1] == remove) {
          tempArray.splice(tempArray.indexOf(element), 1);
        }
      });
      tempArray.forEach((element) => {
        var divContain = document.createElement("div");
        divContain.setAttribute(
          "onclick",
          `getSelected('${element[1]}', "origin")`
        );
        divContain.style.display = "flex";
        divContain.style.width = "100%";
        var spanFlag = document.createElement("span");
        var spanText = document.createElement("span");
        spanFlag.innerHTML = element[0];
        spanFlag.style.fontFamily = "Noto Color Emoji";
        spanText.innerHTML = "<b>" + element[1] + "</b>" + " " + element[2];
        divContain.innerHTML += spanFlag.outerHTML + spanText.outerHTML;
        originContainer.innerHTML += divContain.outerHTML;
      });
    } else if (list == "ending") {
      var endingContainer = document.getElementById("ending");
      var child = endingContainer.lastElementChild;
      var input;
      while (child) {
        if (child.tagName == "INPUT") input = child;
        endingContainer.removeChild(child);
        child = endingContainer.lastElementChild;
      }
      endingContainer.innerHTML += input.outerHTML;
      var tempArray = new Array();
      flagFormat.forEach((element) => {
        tempArray.push(element);
      });
      tempArray.forEach((element) => {
        if (element[1] == remove) {
          tempArray.splice(tempArray.indexOf(element), 1);
        }
      });
      tempArray.forEach((element) => {
        var divContain = document.createElement("div");
        divContain.setAttribute(
          "onclick",
          `getSelected('${element[1]}', "ending")`
        );
        divContain.style.display = "flex";
        divContain.style.width = "100%";
        var spanFlag = document.createElement("span");
        var spanText = document.createElement("span");
        spanFlag.innerHTML = element[0];
        spanFlag.style.fontFamily = "Noto Color Emoji";
        spanText.innerHTML = "<b>" + element[1] + "</b>" + " " + element[2];
        divContain.innerHTML += spanFlag.outerHTML + spanText.outerHTML;
        endingContainer.innerHTML += divContain.outerHTML;
      });
    } else {
      alert("Se te olvido algo 0te");
    }
  }
}

function getSelected(value, current) {
  if (current == "origin") {
    flagFormat.forEach((element) => {
      if (element[1] == value) {
        selectedOrigin = value;
        document.getElementById("originBtn").textContent = value;
        document.getElementById("origin").style.display = "none";
        addElements(value, "ending");
      }
    });
  } else {
    flagFormat.forEach((element) => {
      if (element[1] == value) {
        selectedEnding = value;
        document.getElementById("endingBtn").textContent = value;
        document.getElementById("ending").style.display = "none";
        addElements(value, "origin");
      }
    });
  }
}

function Calculate(fromBox) {
  var originValue = parseFloat(document.getElementById("originValue").value);
  var endingValue = parseFloat(document.getElementById("endingValue").value);
  if (fromBox == "origin") {
    if (!isNaN(originValue)) {
      if (!(originValue <= 0)) {
        if (!(selectedOrigin == null || selectedEnding == null)) {
          if (timer != null) window.clearTimeout(timer);
          timer = null;
          var urlConvert =
            "https://api.exchangerate.host/convert?from=" +
            selectedOrigin +
            "&to=" +
            selectedEnding +
            "&amount=" +
            originValue;
          var exchange = new XMLHttpRequest();
          var exchangeResponse;
          exchange.open("GET", urlConvert);
          exchange.responseType = "json";
          exchange.send();
          exchange.onload = () => {
            exchangeResponse = exchange.response;
            document.getElementById("endingValue").value =
              exchangeResponse["result"].toFixed(2);
            traspassData = {
              userValue: originValue,
              origin: selectedOrigin,
              ending: selectedEnding,
              result: document.getElementById("endingValue").value,
            };
            timer = window.setTimeout(() => {
              var row = document
                .getElementById("logTable")
                .getElementsByTagName("tbody")[0]
                .insertRow();
              var cell0 = row.insertCell(0);
              var cell1 = row.insertCell(1);
              var cell2 = row.insertCell(2);
              cell0.innerHTML = traspassData.userValue.toFixed(2);
              cell1.innerHTML =
                traspassData.origin + " a " + traspassData.ending;
              cell2.innerHTML = traspassData.result;
            }, 5000);
          };
        } else error("Debes seleccionar dos monedas de conversion");
      } else error("El valor ingresado debera ser mayor a 0");
    } else error("El valor ingresado no es numerico. Corregir el valor");
  } else {
    if (!isNaN(endingValue)) {
      if (!(endingValue <= 0)) {
        if (!(selectedOrigin == null || selectedEnding == null)) {
          if (timer != null) window.clearTimeout(timer);
          timer = null;
          var urlConvert =
            "https://api.exchangerate.host/convert?from=" +
            selectedEnding +
            "&to=" +
            selectedOrigin +
            "&amount=" +
            endingValue;
          var exchange = new XMLHttpRequest();
          var exchangeResponse;
          exchange.open("GET", urlConvert);
          exchange.responseType = "json";
          exchange.send();
          exchange.onload = () => {
            exchangeResponse = exchange.response;
            document.getElementById("originValue").value =
              exchangeResponse["result"].toFixed(2);
              traspassData = {
                userValue: endingValue,
                origin: selectedEnding,
                ending: selectedOrigin,
                result: document.getElementById("originValue").value
              };
              timer = window.setTimeout(() => {
                var row = document
                  .getElementById("logTable")
                  .getElementsByTagName("tbody")[0]
                  .insertRow();
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                cell0.innerHTML = traspassData.userValue.toFixed(2);
                cell1.innerHTML =
                  traspassData.origin + " a " + traspassData.ending;
                cell2.innerHTML = traspassData.result;
              }, 5000);
          };
        } else error("Debes seleccionar dos monedas de conversion");
      } else error("El valor ingresado debera ser mayor a 0");
    } else error("El valor ingresado no es numerico. Corregir el valor");
  }
}

var timer, traspassData;

function clearHistory(){
  var tbody = document.getElementById('logTable').getElementsByTagName('tbody')[0];
  var rows = tbody.getElementsByTagName('tr');
  if (rows.length > 0){
    var child = tbody.lastElementChild;
    while (child){
      tbody.removeChild(child);
      child = tbody.lastElementChild;
    }
  }
}

function error(text) {
  var errortext = document.getElementById("textNotif");
  errortext.innerHTML = "Error.\n" + text;
  document.getElementById("notif").style.visibility = "visible";
  setTimeout(function () {
    document.getElementById("notif").style.visibility = "hidden";
  }, 5000);
}

function filtering(unit) {
  var filter, userFilter, span;
  userFilter = document.getElementById(unit);
  if (unit == "origin") {
    filter = document.getElementById("originSearch").value.toUpperCase();
    span = userFilter.getElementsByTagName("span");
    for (var i = 0; i < span.length; i++) {
      if (span[i].textContent.toUpperCase().indexOf(filter) > -1) {
        span[i].parentElement.style.display = "flex";
      } else span[i].parentElement.style.display = "none";
    }
  } else {
    filter = document.getElementById("endingSearch").value.toUpperCase();
    span = userFilter.getElementsByTagName("span");
    for (var i = 0; i < span.length; i++) {
      if (span[i].textContent.toUpperCase().indexOf(filter) > -1) {
        span[i].parentElement.style.display = "flex";
      } else span[i].parentElement.style.display = "none";
    }
  }
}

function ShowOptionsOrigin() {
  const originWatch = document.getElementById("origin");
  if (originWatch.style.display == "block") {
    originWatch.style.display = "";
  } else {
    originWatch.style.display = "block";
  }
}

function ShowOptionsEnding() {
  const endingWatch = document.getElementById("ending");
  if (endingWatch.style.display == "block") {
    endingWatch.style.display = "";
  } else {
    endingWatch.style.display = "block";
  }
}

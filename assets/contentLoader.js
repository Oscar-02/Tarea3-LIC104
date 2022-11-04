var urlGetCurrency = "https://api.exchangerate.host/symbols"
var urlConvert = "https://api.exchangerate.host/convert?from=USD&to=EUR";
var available = new Array();
//[codigo, descripcion]

var request = new XMLHttpRequest();
request.open('GET', urlGetCurrency);
request.responseType = 'json';
request.send();

request.onload = () => {
  var json = request.response;
  Object.keys(json["symbols"]).forEach(function(key){
    available.push([json["symbols"][key]["code"], json["symbols"][key]["description"]]);
  })
  available.forEach(element => {
    var country =  "flag: " + countryNames.of(element[0].substring(0, 2));
    finalArray.forEach(subelement => {
      if (subelement.includes(country)){
        var emojiCode = subelement.substring(0, 11);
        flagFormat.push([String.fromCodePoint(`0x${emojiCode.substring(0,5)}`)
        + String.fromCodePoint(`0x${emojiCode.substring(6,11)}`), element[0], element[1]])
      }
    })
  })
}


//FUNCION CONVERTIR

var urlEmojiList = "assets/emoji-sequences.txt"
var emojiText = new String();
var flagFormat = new Array();

var emojiFile = new XMLHttpRequest();
emojiFile.open("GET", urlEmojiList, false);
emojiFile.onreadystatechange = () => {
  if (emojiFile.readyState === 4){
    if (emojiFile.status === 200 || emojiFile.status == 0){
      emojiText = emojiFile.responseText;
    }
  }
}
emojiFile.send(null);

var lineArray = emojiText.split('\n');
var finalArray = new Array();
for (i = 558; i < 816; i++){
  finalArray.push(lineArray[i])
}
var countryNames = new Intl.DisplayNames(['en'], {type: 'region'});


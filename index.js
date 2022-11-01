var urlGetCurrency = "https://api.exchangerate.host/symbols"
var urlConvert = "https://api.exchangerate.host/convert?from=USD&to=EUR";
var available = new Array();
//[codigo, descripcion]

fetch(urlGetCurrency)
.then (response => {

  return response.json();
})
.then (json => {
  Object.keys(json["symbols"]).forEach(function(key){
    available.push([json["symbols"][key]["code"], json["symbols"][key]["description"]])
  })
})
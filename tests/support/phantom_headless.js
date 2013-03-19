// use for testem
console.log('Loading a web page');
var page = require('webpage').create();
var url = 'http://localhost:7357';
page.open(url, function (status) {
    //Page is loaded!
    //phantom.exit();
});
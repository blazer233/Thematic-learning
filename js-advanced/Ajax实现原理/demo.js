const ajax = require('./index');
ajax.get('https://github.com/guyue88/ajax/blob/master/demo/test.html', {}, (e) => console.log(e))
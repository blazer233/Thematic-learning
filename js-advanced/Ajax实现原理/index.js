const XMLHttpRequest = require('xmlhttprequest')
module.exports = {
  index: 1,
  get: function (url, param, cb) {
    let search = [],
      _url = '';
    let xml = new XMLHttpRequest();
    for (let key in param) {
      search.push(key + '=' + param[key]);
    }
    _url = url + ((/\?/.test(url)) ? '&' : '?') + search.join('&');
    xml.open('GET', _url + '&_=' + (+new Date()), true);
    xml.onreadystatechange = () => {
      if (xml.readyState == 4 && xml.status == 200) {
        let res = JSON.parse(xml.responseText);
        if (cb && typeof cb == 'function')
          cb(res);
      }
    };
    xml.send();
  },
  post: function (url, param, cb) {
    let search = [];
    let xml = new XMLHttpRequest();
    for (let key in param) {
      search.push(key + '=' + param[key]);
    }
    let date = (/\?/.test(url)) ? '&_=' + (+new Date()) : '?_' + (+new Date());
    xml.open('POST', url + date, true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xml.onreadystatechange = () => {
      if (xml.readyState == 4 && xml.status == 200) {
        let res = JSON.parse(xml.responseText);
        if (cb && typeof cb == 'function')
          cb(res);
      }
    };
    xml.send(search.join('&'));
  },
  jsonp: function (url, param, cb) {
    let search = [],
      _url = '';
    for (let key in param) {
      search.push(key + '=' + param[key]);
    }
    _url = url + ((/\?/.test(url)) ? '&' : '?') + search.join('&') + '&_=' + (+new Date()) + '&cb=jsonp' + this.index;

    var hm = document.createElement("script");
    hm.src = _url;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
    window['jsonp' + this.index] = function (res) {
      hm.parentNode.removeChild(hm);
      if (cb && typeof cb == 'function')
        cb(res);
    };
    this.index++;
  }
};
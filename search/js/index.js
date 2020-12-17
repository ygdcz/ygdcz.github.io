;(function () {
  var oInput = document.getElementsByClassName('J_seachInput')[0],
    oWdList = document.getElementsByClassName('J_wdList')[0],
    listTpl = document.getElementById('J_listTpl').innerHTML;

  function init() {
    bindEvent();
  }

  function bindEvent() {
    oInput.addEventListener('input', handleInput, false);
  }

  function handleInput(e) {
    var val = trimSpace(e.data);
    getDatas(val, 'setDatas');
  }

  function getDatas(val, cb) {
    var oScript = document.createElement('script');
    oScript.src = "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1422,33222,31253,32974,33284,32938,32846,26350,33199,33239,33266&wd=" + val + "&req=2&csor=4&pwd=123&cb=" + cb;
    document.body.appendChild(oScript);
  }

  function renderList(data) {
    var data = data.g;
    var list = '';
    data.forEach(element => {
      console.log(element.q);
      list += tplReplace(listTpl, {
        wd: element.q,
        wdLink: element.q
      })
    });
    return list;
  }

  window.setDatas = function (data) {
    oWdList.innerHTML = renderList(data);
  }

  init();
})();
// example1_script.js
// 傳統語法：僅使用 var、function、字串串接

// 顯示提示窗
alert('歡迎來到 JavaScript！');

// 在 Console 顯示訊息
console.log('Hello JavaScript from console');

// 在頁面指定區域輸出文字
var el = document.getElementById('result');
el.textContent = '這行文字是由外部 JS 檔案寫入的。';
// 增加一行你的姓名跟學號
var el2 = document.getElementById('result');
el2.textContent = el2.textContent + ' 411630683雷天佑';

// 按鈕點擊事件：顯示 alert 訊息
var button = document.getElementById('myButton');
button.onclick = function() {
  alert('你點擊了按鈕！');
};
// example5_script.js
// 以巢狀 for 產生 1~9 的乘法表

// 讓使用者輸入乘法表的範圍
var startInput = prompt('請輸入起始數字（例如：1）：');
var endInput = prompt('請輸入結束數字（例如：9）：');

var start = parseInt(startInput, 10);
var end = parseInt(endInput, 10);

// 檢查輸入是否有效
if (isNaN(start) || isNaN(end)) {
  document.getElementById('result').textContent = '輸入無效！請重新整理頁面並輸入有效的數字。';
} else if (start > end) {
  document.getElementById('result').textContent = '起始數字不能大於結束數字！';
} else {
  var output = '=== ' + start + ' 到 ' + end + ' 的乘法表 ===\n\n';
  for (var i = start; i <= end; i++) {
    for (var j = 1; j <= 9; j++) {
      output += i + 'x' + j + '=' + (i * j) + '\t';
    }
    output += '\n';
  }
  document.getElementById('result').textContent = output;
}

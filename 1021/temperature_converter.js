// temperature_converter.js
// 溫度轉換器：攝氏 ↔ 華氏

// 攝氏轉華氏函式
function celsiusToFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}

// 華氏轉攝氏函式
function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

// 驗證輸入是否為有效數字
function isValidNumber(str) {
  var num = parseFloat(str);
  return !isNaN(num);
}

// 主程式
var tempInput = prompt('請輸入溫度數值：');
var unitInput = prompt('請輸入單位（C 代表攝氏，F 代表華氏）：');

var result = '';

// 檢查輸入是否有效
if (!tempInput || !unitInput) {
  result = '輸入不完整，請重新整理後再試。';
} else if (!isValidNumber(tempInput)) {
  result = '溫度必須是有效的數字！';
} else {
  var temp = parseFloat(tempInput);
  var unit = unitInput.toUpperCase().trim();
  
  if (unit === 'C') {
    // 攝氏轉華氏
    var fahrenheit = celsiusToFahrenheit(temp);
    result = '=== 溫度轉換結果 ===\n\n'
           + '輸入溫度：' + temp + '°C（攝氏）\n'
           + '轉換結果：' + fahrenheit.toFixed(2) + '°F（華氏）\n\n'
           + '轉換公式：F = C × 9/5 + 32';
    alert('轉換完成！\n' + temp + '°C = ' + fahrenheit.toFixed(2) + '°F');
  } else if (unit === 'F') {
    // 華氏轉攝氏
    var celsius = fahrenheitToCelsius(temp);
    result = '=== 溫度轉換結果 ===\n\n'
           + '輸入溫度：' + temp + '°F（華氏）\n'
           + '轉換結果：' + celsius.toFixed(2) + '°C（攝氏）\n\n'
           + '轉換公式：C = (F - 32) × 5/9';
    alert('轉換完成！\n' + temp + '°F = ' + celsius.toFixed(2) + '°C');
  } else {
    result = '單位輸入錯誤！請輸入 C（攝氏）或 F（華氏）。';
  }
}

// 顯示結果
console.log(result);
document.getElementById('result').textContent = result;

// guess_number_game.js
// 猜數字遊戲：電腦隨機產生 1-100 的數字，使用者猜測

// 產生 1-100 的隨機數字
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// 驗證輸入是否為有效整數
function isValidInteger(str) {
  var num = parseInt(str, 10);
  return !isNaN(num) && num > 0 && num <= 100;
}

// 取得提示訊息
function getHint(guess, answer) {
  if (guess < answer) {
    return '再大一點！';
  } else if (guess > answer) {
    return '再小一點！';
  } else {
    return '恭喜答對了！';
  }
}

// 主遊戲邏輯
function playGame() {
  var answer = generateRandomNumber();
  var attempts = 0;
  var gameLog = '=== 猜數字遊戲開始 ===\n\n';
  var isCorrect = false;
  
  console.log('答案是：' + answer + '（開發者模式才看得到）');
  
  while (!isCorrect) {
    var input = prompt('請輸入你猜的數字（1-100）：');
    
    // 檢查是否取消或空白
    if (input === null || input === '') {
      gameLog += '\n遊戲已取消。';
      break;
    }
    
    // 驗證輸入
    if (!isValidInteger(input)) {
      alert('請輸入 1-100 之間的有效整數！');
      continue;
    }
    
    var guess = parseInt(input, 10);
    attempts++;
    
    var hint = getHint(guess, answer);
    gameLog += '第 ' + attempts + ' 次：你猜 ' + guess + ' → ' + hint + '\n';
    
    if (guess === answer) {
      isCorrect = true;
      gameLog += '\n🎉 遊戲結束！\n';
      gameLog += '答案是：' + answer + '\n';
      gameLog += '你總共猜了 ' + attempts + ' 次。\n';
      
      // 根據次數給予評價
      var comment = '';
      if (attempts <= 3) {
        comment = '太厲害了！運氣超好！';
      } else if (attempts <= 7) {
        comment = '表現不錯！';
      } else if (attempts <= 10) {
        comment = '還可以，繼續加油！';
      } else {
        comment = '多練習幾次會更好喔！';
      }
      gameLog += '評價：' + comment;
      
      alert('🎉 恭喜答對了！\n答案是：' + answer + '\n你總共猜了 ' + attempts + ' 次。\n' + comment);
    } else {
      alert(hint);
    }
  }
  
  return gameLog;
}

// 執行遊戲
var result = playGame();
console.log(result);
document.getElementById('result').textContent = result;

const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  // 選手姓名
  name: {
    type: String,
    required: [true, '請輸入選手姓名'],
    trim: true
  },
  
  // 遊戲 ID
  gameId: {
    type: String,
    required: [true, '請輸入遊戲 ID'],
    trim: true,
    unique: true
  },
  
  // 位置 (上路/打野/中路/下路/輔助)
  position: {
    type: String,
    required: [true, '請選擇位置'],
    enum: ['上路', '打野', '中路', '下路', '輔助', 'Top', 'Jungle', 'Mid', 'ADC', 'Support']
  },
  
  // 照片網址
  photoUrl: {
    type: String,
    default: 'https://via.placeholder.com/400x400?text=Player'
  },
  
  // 選手介紹
  introduction: {
    type: String,
    default: ''
  },
  
  // 成就/經歷
  achievements: {
    type: String,
    default: ''
  },
  
  // 年齡
  age: {
    type: Number,
    min: 0
  },
  
  // 國籍
  nationality: {
    type: String,
    default: '台灣'
  }
}, {
  timestamps: true // 自動新增 createdAt 和 updatedAt
});

module.exports = mongoose.model('Player', playerSchema);

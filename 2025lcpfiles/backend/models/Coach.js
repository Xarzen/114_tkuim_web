const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  // 教練姓名
  name: {
    type: String,
    required: [true, '請輸入教練姓名'],
    trim: true
  },
  
  // 遊戲 ID
  gameId: {
    type: String,
    required: [true, '請輸入遊戲 ID'],
    trim: true,
    unique: true
  },
  
  // 位置 (總教練/教練)
  position: {
    type: String,
    required: [true, '請選擇位置'],
    enum: ['總教練', '教練', 'Head Coach', 'Coach']
  },
  
  // 照片網址
  photoUrl: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=Coach'
  },
  
  // 教練介紹
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
  timestamps: true
});

module.exports = mongoose.model('Coach', coachSchema);

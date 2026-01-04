const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入選手姓名'],
    trim: true
  },
  gameId: {
    type: String,
    required: [true, '請輸入遊戲 ID'],
    trim: true,
    unique: true
  },
  position: {
    type: String,
    required: [true, '請選擇位置'],
    enum: ['上路', '打野', '中路', '下路', '輔助', 'Top', 'Jungle', 'Mid', 'ADC', 'Support']
  },
  photoUrl: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  introduction: {
    type: String,
    default: ''
  },
  achievements: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    min: 0
  },
  nationality: {
    type: String,
    default: '台灣'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);

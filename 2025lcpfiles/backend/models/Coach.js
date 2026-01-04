const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入教練姓名'],
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
    enum: ['總教練', '教練', 'Head Coach', 'Coach']
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

module.exports = mongoose.model('Coach', coachSchema);

const Player = require('../models/Player');

// @desc    取得所有選手
// @route   GET /api/players
// @access  Public
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: players.length,
      data: players
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '取得選手資料失敗',
      error: error.message
    });
  }
};

// @desc    取得單一選手
// @route   GET /api/players/:id
// @access  Public
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: '找不到該選手'
      });
    }
    
    res.json({
      success: true,
      data: player
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '取得選手資料失敗',
      error: error.message
    });
  }
};

// @desc    新增選手
// @route   POST /api/players
// @access  Public
exports.createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    
    res.status(201).json({
      success: true,
      message: '選手新增成功',
      data: player
    });
  } catch (error) {
    // 處理重複的 gameId
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: '該遊戲 ID 已存在'
      });
    }
    
    // 處理驗證錯誤
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: '資料驗證失敗',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: '新增選手失敗',
      error: error.message
    });
  }
};

// @desc    更新選手
// @route   PUT /api/players/:id
// @access  Public
exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // 回傳更新後的資料
        runValidators: true // 執行驗證
      }
    );
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: '找不到該選手'
      });
    }
    
    res.json({
      success: true,
      message: '選手資料更新成功',
      data: player
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: '資料驗證失敗',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: '更新選手資料失敗',
      error: error.message
    });
  }
};

// @desc    刪除選手
// @route   DELETE /api/players/:id
// @access  Public
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: '找不到該選手'
      });
    }
    
    res.json({
      success: true,
      message: '選手刪除成功',
      data: player
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '刪除選手失敗',
      error: error.message
    });
  }
};

const Player = require('../models/Player');

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: 1 });
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

exports.createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json({
      success: true,
      message: '選手新增成功',
      data: player
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: '該遊戲 ID 已存在'
      });
    }
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

exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
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

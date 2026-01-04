const Coach = require('../models/Coach');

exports.getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find().sort({ createdAt: 1 });
    res.json({
      success: true,
      count: coaches.length,
      data: coaches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '取得教練資料失敗',
      error: error.message
    });
  }
};

exports.getCoachById = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) {
      return res.status(404).json({
        success: false,
        message: '找不到該教練'
      });
    }
    res.json({
      success: true,
      data: coach
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '取得教練資料失敗',
      error: error.message
    });
  }
};

exports.createCoach = async (req, res) => {
  try {
    const coach = await Coach.create(req.body);
    res.status(201).json({
      success: true,
      message: '教練新增成功',
      data: coach
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
      message: '新增教練失敗',
      error: error.message
    });
  }
};

exports.updateCoach = async (req, res) => {
  try {
    const coach = await Coach.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!coach) {
      return res.status(404).json({
        success: false,
        message: '找不到該教練'
      });
    }
    res.json({
      success: true,
      message: '教練資料更新成功',
      data: coach
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
      message: '更新教練資料失敗',
      error: error.message
    });
  }
};

exports.deleteCoach = async (req, res) => {
  try {
    const coach = await Coach.findByIdAndDelete(req.params.id);
    if (!coach) {
      return res.status(404).json({
        success: false,
        message: '找不到該教練'
      });
    }
    res.json({
      success: true,
      message: '教練刪除成功',
      data: coach
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '刪除教練失敗',
      error: error.message
    });
  }
};

const express = require('express');
const router = express.Router();
const {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
} = require('../controllers/playerController');

// GET /api/players - 取得所有選手
router.get('/', getAllPlayers);

// GET /api/players/:id - 取得單一選手
router.get('/:id', getPlayerById);

// POST /api/players - 新增選手
router.post('/', createPlayer);

// PUT /api/players/:id - 更新選手
router.put('/:id', updatePlayer);

// DELETE /api/players/:id - 刪除選手
router.delete('/:id', deletePlayer);

module.exports = router;

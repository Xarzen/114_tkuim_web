const express = require('express');
const router = express.Router();
const {
  getAllCoaches,
  getCoachById,
  createCoach,
  updateCoach,
  deleteCoach
} = require('../controllers/coachController');

// GET /api/coaches - 取得所有教練
router.get('/', getAllCoaches);

// GET /api/coaches/:id - 取得單一教練
router.get('/:id', getCoachById);

// POST /api/coaches - 新增教練
router.post('/', createCoach);

// PUT /api/coaches/:id - 更新教練
router.put('/:id', updateCoach);

// DELETE /api/coaches/:id - 刪除教練
router.delete('/:id', deleteCoach);

module.exports = router;

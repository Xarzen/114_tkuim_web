import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// 創建 axios 實例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 選手相關 API
export const playerAPI = {
  // 取得所有選手
  getAllPlayers: async () => {
    try {
      const response = await api.get('/players');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 取得單一選手
  getPlayerById: async (id) => {
    try {
      const response = await api.get(`/players/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 新增選手
  createPlayer: async (playerData) => {
    try {
      const response = await api.post('/players', playerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 更新選手
  updatePlayer: async (id, playerData) => {
    try {
      const response = await api.put(`/players/${id}`, playerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 刪除選手
  deletePlayer: async (id) => {
    try {
      const response = await api.delete(`/players/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// 教練相關 API
export const coachAPI = {
  // 取得所有教練
  getAllCoaches: async () => {
    try {
      const response = await api.get('/coaches');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 取得單一教練
  getCoachById: async (id) => {
    try {
      const response = await api.get(`/coaches/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 新增教練
  createCoach: async (coachData) => {
    try {
      const response = await api.post('/coaches', coachData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 更新教練
  updateCoach: async (id, coachData) => {
    try {
      const response = await api.put(`/coaches/${id}`, coachData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 刪除教練
  deleteCoach: async (id) => {
    try {
      const response = await api.delete(`/coaches/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;

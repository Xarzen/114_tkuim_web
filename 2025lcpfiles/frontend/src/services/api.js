import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const playerAPI = {
  getAllPlayers: async () => {
    try {
      const response = await api.get('/players');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getPlayerById: async (id) => {
    try {
      const response = await api.get(`/players/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createPlayer: async (playerData) => {
    try {
      const response = await api.post('/players', playerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updatePlayer: async (id, playerData) => {
    try {
      const response = await api.put(`/players/${id}`, playerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deletePlayer: async (id) => {
    try {
      const response = await api.delete(`/players/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export const coachAPI = {
  getAllCoaches: async () => {
    try {
      const response = await api.get('/coaches');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getCoachById: async (id) => {
    try {
      const response = await api.get(`/coaches/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createCoach: async (coachData) => {
    try {
      const response = await api.post('/coaches', coachData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateCoach: async (id, coachData) => {
    try {
      const response = await api.put(`/coaches/${id}`, coachData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

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

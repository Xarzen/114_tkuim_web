import { useState } from 'react';

function PlayerForm({ player = {}, onSubmit, isEdit = false }) {
  const [formData, setFormData] = useState({
    name: player.name || '',
    gameId: player.gameId || '',
    position: player.position || '中路',
    photoUrl: player.photoUrl || '',
    introduction: player.introduction || '',
    achievements: player.achievements || '',
    age: player.age || '',
    nationality: player.nationality || '台灣'
  });

  const [errors, setErrors] = useState({});

  const positions = ['上路', '打野', '中路', '下路', '輔助'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = '請輸入選手姓名';
    }
    if (!formData.gameId.trim()) {
      newErrors.gameId = '請輸入遊戲 ID';
    }
    if (!formData.position) {
      newErrors.position = '請選擇位置';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const submitData = {
      ...formData,
      age: formData.age ? Number(formData.age) : undefined
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? '編輯選手資料' : '新增選手'}
      </h2>

      {}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          選手姓名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`input-field ${errors.name ? 'border-red-500' : ''}`}
          placeholder="請輸入選手姓名"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          遊戲 ID <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="gameId"
          value={formData.gameId}
          onChange={handleChange}
          className={`input-field ${errors.gameId ? 'border-red-500' : ''}`}
          placeholder="請輸入遊戲 ID"
        />
        {errors.gameId && <p className="text-red-500 text-sm mt-1">{errors.gameId}</p>}
      </div>

      {}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          位置 <span className="text-red-500">*</span>
        </label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          className={`input-field ${errors.position ? 'border-red-500' : ''}`}
        >
          {positions.map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
        {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
      </div>

      {}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          年齡
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="input-field"
          placeholder="請輸入年齡"
          min="0"
        />
      </div>

      {}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          國籍
        </label>
        <input
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          className="input-field"
          placeholder="請輸入國籍"
        />
      </div>

      {}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          照片網址
        </label>
        <input
          type="text"
          name="photoUrl"
          value={formData.photoUrl}
          onChange={handleChange}
          className="input-field"
          placeholder="請輸入照片網址"
        />
        <p className="text-gray-500 text-sm mt-1">
          可使用線上圖片連結或留空使用預設圖片
        </p>
      </div>

      {}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          選手介紹
        </label>
        <textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          rows="4"
          className="input-field"
          placeholder="請輸入選手介紹..."
        />
      </div>

      {}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          成就/經歷
        </label>
        <textarea
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          rows="4"
          className="input-field"
          placeholder="請輸入成就或經歷..."
        />
      </div>

      {}
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 btn-primary"
        >
          {isEdit ? '更新選手' : '新增選手'}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 btn-secondary"
        >
          取消
        </button>
      </div>
    </form>
  );
}

export default PlayerForm;

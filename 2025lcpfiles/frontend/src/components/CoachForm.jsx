import { useState, useEffect } from 'react';

const CoachForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    gameId: '',
    position: '總教練',
    photoUrl: '',
    introduction: '',
    achievements: '',
    age: '',
    nationality: '台灣'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-red-400 mb-2">
            教練姓名 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="請輸入教練姓名"
          />
        </div>

        {}
        <div>
          <label htmlFor="gameId" className="block text-sm font-semibold text-red-400 mb-2">
            遊戲 ID *
          </label>
          <input
            type="text"
            id="gameId"
            name="gameId"
            value={formData.gameId}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="請輸入遊戲 ID"
          />
        </div>

        {}
        <div>
          <label htmlFor="position" className="block text-sm font-semibold text-red-400 mb-2">
            位置 *
          </label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="總教練">總教練</option>
            <option value="教練">教練</option>
          </select>
        </div>

        {}
        <div>
          <label htmlFor="age" className="block text-sm font-semibold text-red-400 mb-2">
            年齡
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            className="input-field"
            placeholder="請輸入年齡"
          />
        </div>

        {}
        <div>
          <label htmlFor="nationality" className="block text-sm font-semibold text-red-400 mb-2">
            國籍
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="input-field"
            placeholder="請輸入國籍"
          />
        </div>

        {}
        <div>
          <label htmlFor="photoUrl" className="block text-sm font-semibold text-red-400 mb-2">
            照片網址
          </label>
          <input
            type="text"
            id="photoUrl"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            className="input-field"
            placeholder="請輸入照片網址或使用 /images/coaches/xxx.jpg"
          />
        </div>
      </div>

      {}
      <div>
        <label htmlFor="introduction" className="block text-sm font-semibold text-red-400 mb-2">
          教練介紹
        </label>
        <textarea
          id="introduction"
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          rows="4"
          className="input-field resize-none"
          placeholder="請輸入教練介紹"
        />
      </div>

      {}
      <div>
        <label htmlFor="achievements" className="block text-sm font-semibold text-red-400 mb-2">
          成就與經歷
        </label>
        <textarea
          id="achievements"
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          rows="4"
          className="input-field resize-none"
          placeholder="請輸入成就與經歷"
        />
      </div>

      {}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn-secondary"
          disabled={isLoading}
        >
          取消
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? '處理中...' : '儲存'}
        </button>
      </div>
    </form>
  );
};

export default CoachForm;

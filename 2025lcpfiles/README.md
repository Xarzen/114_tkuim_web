# 2025 英雄聯盟 CFO 戰隊選手介紹系統

## 專案簡介
本專案為淡江大學 114 學年度網路程式設計期末專題，主題為「2025英雄聯盟CFO戰隊選手介紹」。
系統提供完整的 CRUD 功能，讓使用者可以新增、查詢、更新、刪除戰隊選手資料。

## 技術架構
### 前端
- React 18 (Vite)
- Tailwind CSS
- Axios (API 請求)
- React Router (路由管理)

### 後端
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS

### 資料庫
- MongoDB (本地端)

## 系統架構
```
前端 (React) <---> 後端 API (Express) <---> 資料庫 (MongoDB)
    :3000              :5000                   :27017
```

## 專案結構
```
2025lcpfiles/
├── frontend/          # 前端專案
│   ├── src/
│   │   ├── components/  # React 元件
│   │   ├── pages/       # 頁面元件
│   │   ├── services/    # API 服務
│   │   └── App.jsx
│   └── package.json
├── backend/           # 後端專案
│   ├── controllers/   # 控制器
│   ├── models/        # 資料模型
│   ├── routes/        # API 路由
│   ├── config/        # 配置文件
│   ├── server.js      # 主程式
│   └── package.json
├── docs/              # 文件與圖表
│   ├── api-spec.md
│   ├── architecture.png
│   └── flowchart.png
└── README.md
```

## 功能說明
### CRUD 功能
- **Create (新增)**：新增選手資料（姓名、遊戲ID、位置、照片、介紹等）
- **Read (查詢)**：查看所有選手列表及個別選手詳細資訊
- **Update (更新)**：編輯現有選手資料
- **Delete (刪除)**：刪除選手資料

### 主要頁面
1. 首頁 - 戰隊簡介與選手列表
2. 選手詳細頁 - 查看單一選手完整資訊
3. 新增選手頁 - 表單輸入新選手資料
4. 編輯選手頁 - 修改現有選手資料

## 安裝與執行

### 前置需求
- Node.js (v16 以上)
- MongoDB (v6 以上)
- npm 或 yarn

### 1. 安裝 MongoDB
確保 MongoDB 已安裝並啟動服務：
```bash
# macOS (使用 Homebrew)
brew install mongodb-community
brew services start mongodb-community

# 或手動啟動
mongod --dbpath ~/data/db
```

### 2. 後端安裝與啟動
```bash
# 進入後端目錄
cd backend

# 安裝相依套件
npm install

# 啟動後端伺服器 (port 5000)
npm start

# 開發模式 (使用 nodemon)
npm run dev
```

### 3. 前端安裝與啟動
```bash
# 開啟新終端機，進入前端目錄
cd frontend

# 安裝相依套件
npm install

# 啟動前端開發伺服器 (port 3000)
npm run dev
```

### 4. 訪問系統
- 前端網址：http://localhost:3000
- 後端 API：http://localhost:5000/api

## API 端點

### 選手相關 API
| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | /api/players | 取得所有選手 |
| GET | /api/players/:id | 取得特定選手 |
| POST | /api/players | 新增選手 |
| PUT | /api/players/:id | 更新選手資料 |
| DELETE | /api/players/:id | 刪除選手 |

詳細 API 規格請參考 [docs/api-spec.md](docs/api-spec.md)

## 資料庫設計

### Player Collection (選手集合)
```javascript
{
  _id: ObjectId,
  name: String,        // 選手姓名
  gameId: String,      // 遊戲 ID
  position: String,    // 位置 (上路/打野/中路/下路/輔助)
  photoUrl: String,    // 照片網址
  introduction: String,// 選手介紹
  achievements: String,// 成就/經歷
  createdAt: Date,     // 建立時間
  updatedAt: Date      // 更新時間
}
```

## Git 版本控制
本專案使用 Git 進行版本控制，commit 規範如下：
- `feat`: 新增功能
- `fix`: 修正錯誤
- `docs`: 文件更新
- `style`: 程式碼格式調整
- `refactor`: 程式碼重構

## 開發者
- 學生：[您的姓名]
- 學號：[您的學號]
- 課程：淡江大學 114(上) 網路程式設計

## 專案展示
- Demo 影片：[YouTube 連結]
- GitHub Repository：[此專案連結]

## 授權
本專案僅供學術用途。

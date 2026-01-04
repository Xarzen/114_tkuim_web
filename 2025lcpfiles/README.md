# 2025 英雄聯盟 T1 戰隊選手與教練介紹系統

## 專案簡介

本專案為淡江大學 114 學年度網路程式設計期末專題，主題為「2025 英雄聯盟 T1 戰隊選手與教練介紹系統」。

T1 是英雄聯盟史上最成功的戰隊，於 2025 年奪得第六座世界冠軍。本系統提供完整的 CRUD 功能，展示 T1 戰隊的選手與教練陣容，並實作管理員登入系統來保護資料編輯權限。

---

## 技術架構

### 前端技術
- **React 18.2**
- **Vite 5.0**
- **React Router 6.21** 
- **Tailwind CSS 3.4** 
- **Axios 1.6** 

### 後端技術
- **Node.js**
- **Express.js 4.18**
- **Mongoose 8.0**
- **CORS 2.8**

### 資料庫
- **MongoDB 8.0**

### 開發工具
- **Git**
- **Docker**


## 專案結構

```
2025lcpfiles/
├── frontend/                    # 前端專案目錄
│   ├── src/
│   │   ├── components/          # React 元件
│   │   │   ├── Navbar.jsx       # 導覽列
│   │   │   ├── PlayerCard.jsx   # 選手卡片
│   │   │   ├── PlayerForm.jsx   # 選手表單
│   │   │   ├── CoachCard.jsx    # 教練卡片
│   │   │   ├── CoachForm.jsx    # 教練表單
│   │   │   └── ProtectedRoute.jsx  # 路由保護
│   │   ├── pages/               # 頁面元件
│   │   │   ├── TeamIntro.jsx    # 首頁
│   │   │   ├── Home.jsx         # 選手列表
│   │   │   ├── PlayerDetail.jsx # 選手詳情
│   │   │   ├── AddPlayer.jsx    # 新增選手
│   │   │   ├── EditPlayer.jsx   # 編輯選手
│   │   │   ├── CoachList.jsx    # 教練列表
│   │   │   ├── CoachDetail.jsx  # 教練詳情
│   │   │   ├── AddCoach.jsx     # 新增教練
│   │   │   ├── EditCoach.jsx    # 編輯教練
│   │   │   └── Login.jsx        # 登入頁面
│   │   ├── context/             # React Context
│   │   │   └── AuthContext.jsx  # 認證狀態管理
│   │   ├── services/            # API 服務
│   │   │   └── api.js           # API 請求封裝
│   │   ├── App.jsx              # 主要應用元件
│   │   ├── index.css            # 全域樣式
│   │   └── main.jsx             # 應用進入點
│   ├── public/                  # 靜態資源
│   │   └── images/              # 圖片資源
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                     # 後端專案目錄
│   ├── controllers/             # 控制器層
│   │   ├── playerController.js  # 選手控制器
│   │   └── coachController.js   # 教練控制器
│   ├── models/                  # 資料模型層
│   │   ├── Player.js            # 選手模型
│   │   └── Coach.js             # 教練模型
│   ├── routes/                  # 路由層
│   │   ├── playerRoutes.js      # 選手路由
│   │   └── coachRoutes.js       # 教練路由
│   ├── server.js                # 伺服器主程式
│   ├── package.json
│   └── .env                     # 環境變數
│
├── docs/                        # 文件與圖表
│   ├── api-spec.md              # API 規格文件
│   ├── architecture.png         # 系統架構圖
│   └── flowchart.png            # CRUD 流程圖
│
├── .gitignore                   # Git 忽略檔案
└── README.md                    # 專案說明文件
```

---

## 功能說明

### 1. 首頁 - 戰隊介紹
- T1 戰隊歷史與成就展示
- 六座世界冠軍介紹（2013, 2015, 2016, 2023, 2024, 2025）
- 快速導航到選手與教練頁面

### 2. 選手管理系統
- **Create (新增)**：管理員可新增選手資料
- **Read (查詢)**：所有用戶可瀏覽選手列表與詳情
- **Update (更新)**：管理員可編輯選手資訊
- **Delete (刪除)**：管理員可刪除選手資料

### 3. 教練管理系統
- **Create (新增)**：管理員可新增教練資料
- **Read (查詢)**：所有用戶可瀏覽教練列表與詳情
- **Update (更新)**：管理員可編輯教練資訊
- **Delete (刪除)**：管理員可刪除教練資料

### 4. 管理員登入系統
- 前端使用 React Context 管理認證狀態
- 路由保護機制（Protected Routes）
- 登入資訊：
  - 帳號：`admin`
  - 密碼：`admin123`
- 未登入用戶只能瀏覽資料
- 登入後才能進行新增、編輯、刪除操作

### 5. 響應式設計
- 使用 Tailwind CSS 實現響應式布局
- 支援桌面、平板、手機等不同裝置
- Grid 系統自動調整卡片排列

---

## 安裝與執行指南

### 前置需求
- Node.js v16 以上
- MongoDB v6 以上
- npm 或 yarn
- Git

### 步驟 1：克隆專案
```bash
git clone [您的 GitHub Repo URL]
cd 2025lcpfiles
```

### 步驟 2：安裝並啟動 MongoDB

#### 使用 Docker（推薦）
```bash
# 啟動 MongoDB 容器
docker run -d -p 27017:27017 --name mongodb mongo:8.0

# 確認容器運行
docker ps
```

#### 使用 Homebrew（macOS）
```bash
# 安裝 MongoDB
brew tap mongodb/brew
brew install mongodb-community

# 啟動 MongoDB 服務
brew services start mongodb-community

# 或手動啟動
mongod --dbpath ~/data/db
```

### 步驟 3：後端安裝與啟動
```bash
# 進入後端目錄
cd backend

# 安裝相依套件
npm install

# 確認 .env 文件配置
# PORT=5001
# MONGODB_URI=mongodb://localhost:27017/cfo_team_db

# 啟動後端伺服器（背景執行）
node server.js &

# 或在前景執行（查看即時日誌）
node server.js

# 成功訊息：
#  伺服器運行於 http://localhost:5001
#  MongoDB 連線成功
```

### 步驟 4：前端安裝與啟動
```bash
# 開啟新終端機，進入前端目錄
cd frontend

# 安裝相依套件
npm install

# 啟動前端開發伺服器
npm run dev

# 成功訊息：
# ➜  Local:   http://localhost:3000/
# ➜  Network: use --host to expose
```

### 步驟 5：訪問系統
- **前端網址**：http://localhost:3000
- **後端 API**：http://localhost:5001/api



## 資料庫設計

### Player Collection（選手集合）
```javascript
{
  _id: ObjectId,              // MongoDB 自動生成
  name: String,               // 選手姓名（必填）
  gameId: String,             // 遊戲 ID（必填、唯一）
  position: String,           // 位置：上路/打野/中路/下路/輔助（必填）
  photoUrl: String,           // 照片網址
  introduction: String,       // 選手介紹
  achievements: String,       // 成就與經歷
  age: Number,               // 年齡
  nationality: String,        // 國籍（預設：台灣）
  createdAt: Date,           // 建立時間（自動）
  updatedAt: Date            // 更新時間（自動）
}
```

### Coach Collection（教練集合）
```javascript
{
  _id: ObjectId,              // MongoDB 自動生成
  name: String,               // 教練姓名（必填）
  gameId: String,             // 遊戲 ID（必填、唯一）
  position: String,           // 位置：總教練/教練（必填）
  photoUrl: String,           // 照片網址
  introduction: String,       // 教練介紹
  achievements: String,       // 成就與經歷
  age: Number,               // 年齡
  nationality: String,        // 國籍（預設：台灣）
  createdAt: Date,           // 建立時間（自動）
  updatedAt: Date            // 更新時間（自動）
}
```


## 專案文件

- **API 規格文件**：[docs/api-spec.md](docs/api-spec.md)
- **系統架構圖**：[docs/architecture.png](docs/architecture.png)
- **CRUD 流程圖**：[docs/flowchart.png](docs/flowchart.png)

---

## 測試方式

### 使用瀏覽器測試
1. 訪問 http://localhost:3000
2. 瀏覽首頁、選手列表、教練列表
3. 點擊「管理員登入」，使用 `admin` / `admin123` 登入
4. 登入後測試新增、編輯、刪除功能


## 專案展示

- **Demo 影片**：[YouTube 連結]（5-8 分鐘）

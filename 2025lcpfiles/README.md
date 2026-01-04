# 2025 英雄聯盟 T1 戰隊選手與教練介紹系統

## 專案簡介

本專案為淡江大學 114 學年度網路程式設計期末專題，主題為「2025 英雄聯盟 T1 戰隊選手與教練介紹系統」。

T1 是英雄聯盟史上最成功的戰隊，於 2025 年奪得第六座世界冠軍。本系統提供完整的 CRUD 功能，展示 T1 戰隊的選手與教練陣容，並實作管理員登入系統來保護資料編輯權限。

### 專題目標
- 實作完整的前後端分離架構
- 提供直觀的使用者介面展示戰隊資訊
- 實現完整的 CRUD 操作
- 建立權限管理系統保護資料安全

---

## 技術架構

### 前端技術
- **React 18.2** - 現代化前端框架
- **Vite 5.0** - 快速建構工具
- **React Router 6.21** - 前端路由管理
- **Tailwind CSS 3.4** - CSS 框架
- **Axios 1.6** - HTTP 請求庫

### 後端技術
- **Node.js** - JavaScript 執行環境
- **Express.js 4.18** - 後端框架
- **Mongoose 8.0** - MongoDB ODM
- **CORS 2.8** - 跨域資源共享

### 資料庫
- **MongoDB 8.0** - NoSQL 資料庫

### 開發工具
- **Git** - 版本控制
- **Docker** - 容器化部署（用於 MongoDB）

---

## 系統架構圖

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │  HTTP   │                 │ MongoDB │                 │
│  React Frontend │────────▶│  Express API    │────────▶│    MongoDB      │
│   (Port 3000)   │◀────────│  (Port 5001)    │◀────────│   (Port 27017)  │
│                 │  JSON   │                 │ Queries │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
        │
        │ 使用者操作
        ▼
┌─────────────────────────────────────┐
│  前端功能                             │
│  - 首頁（戰隊介紹）                   │
│  - 選手列表與詳情                     │
│  - 教練列表與詳情                     │
│  - 管理員登入                         │
│  - CRUD 操作（需登入）                │
└─────────────────────────────────────┘
```

---

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

### 2. 選手管理系統（完整 CRUD）
- **Create (新增)**：管理員可新增選手資料
- **Read (查詢)**：所有用戶可瀏覽選手列表與詳情
- **Update (更新)**：管理員可編輯選手資訊
- **Delete (刪除)**：管理員可刪除選手資料

### 3. 教練管理系統（完整 CRUD）
- **Create (新增)**：管理員可新增教練資料
- **Read (查詢)**：所有用戶可瀏覽教練列表與詳情
- **Update (更新)**：管理員可編輯教練資訊
- **Delete (刪除)**：管理員可刪除教練資料

### 4. 管理員登入系統（加分項目）
- 前端使用 React Context 管理認證狀態
- 路由保護機制（Protected Routes）
- 登入資訊：
  - 帳號：`admin`
  - 密碼：`admin123`
- 未登入用戶只能瀏覽資料
- 登入後才能進行新增、編輯、刪除操作

### 5. 響應式設計（RWD）
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
# MONGODB_URI=mongodb://localhost:27017/t1_team_db

# 啟動後端伺服器
node server.js

# 成功訊息：
# 🚀 伺服器運行於 http://localhost:5001
# ✅ MongoDB 連線成功
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
```

### 步驟 5：訪問系統
- **前端網址**：http://localhost:3000
- **後端 API**：http://localhost:5001/api

---

## API 端點說明

### 選手相關 API
| HTTP 方法 | 端點 | 說明 | 權限 |
|----------|------|------|------|
| GET | `/api/players` | 取得所有選手 | 公開 |
| GET | `/api/players/:id` | 取得特定選手 | 公開 |
| POST | `/api/players` | 新增選手 | 需登入 |
| PUT | `/api/players/:id` | 更新選手資料 | 需登入 |
| DELETE | `/api/players/:id` | 刪除選手 | 需登入 |

### 教練相關 API
| HTTP 方法 | 端點 | 說明 | 權限 |
|----------|------|------|------|
| GET | `/api/coaches` | 取得所有教練 | 公開 |
| GET | `/api/coaches/:id` | 取得特定教練 | 公開 |
| POST | `/api/coaches` | 新增教練 | 需登入 |
| PUT | `/api/coaches/:id` | 更新教練資料 | 需登入 |
| DELETE | `/api/coaches/:id` | 刪除教練 | 需登入 |

詳細 API 規格請參考：[docs/api-spec.md](docs/api-spec.md)

---

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

---

## Git 版本控制

本專案使用 Git 進行版本控制，遵循以下 commit 規範：

### Commit Message 格式
```
<type>: <subject>

<type> 類型：
- feat: 新增功能
- fix: 修正錯誤
- docs: 文件更新
- style: 程式碼格式調整（不影響功能）
- refactor: 程式碼重構
- test: 測試相關
- chore: 建置流程或輔助工具變動
```

### Commit 紀錄建議
```bash
# 初始化專案
git commit -m "feat: 初始化專案結構與前後端框架"

# 建立資料模型
git commit -m "feat: 建立 Player 和 Coach 資料模型"

# 實作 API
git commit -m "feat: 實作選手和教練 CRUD API"

# 開發前端元件
git commit -m "feat: 完成選手列表和詳情頁面元件"

# 新增權限系統
git commit -m "feat: 新增管理員登入與權限控制系統"

# 優化 UI
git commit -m "style: 調整 T1 主題配色與響應式設計"

# 更新文件
git commit -m "docs: 完成 README 和 API 規格文件"
```

---

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

### 使用 Postman 測試 API
```bash
# 取得所有選手
GET http://localhost:5001/api/players

# 新增選手
POST http://localhost:5001/api/players
Content-Type: application/json

{
  "name": "李相赫",
  "gameId": "Faker",
  "position": "中路",
  "age": 28,
  "nationality": "韓國"
}
```

---

## 問題排除

### MongoDB 連線失敗
```bash
# 檢查 MongoDB 是否運行
docker ps  # 使用 Docker
brew services list  # 使用 Homebrew

# 重新啟動 MongoDB
docker restart mongodb
# 或
brew services restart mongodb-community
```

### 前端無法連接後端
1. 確認後端服務運行在 port 5001
2. 檢查 `frontend/src/services/api.js` 的 API_URL 設定
3. 確認 CORS 已啟用

### 資料無法顯示
1. 檢查 MongoDB 資料庫是否有資料
2. 使用 `mongosh` 連接並查詢：
```bash
mongosh
use t1_team_db
db.players.find()
db.coaches.find()
```

---

## 開發者資訊

- **姓名**：[您的姓名]
- **學號**：[您的學號]
- **系級**：淡江大學 資訊管理學系
- **課程**：114(上) 網路程式設計
- **指導教師**：[教師姓名]

---

## 專案展示

- **Demo 影片**：[YouTube 連結]（5-8 分鐘）
- **GitHub Repository**：[您的 GitHub Repo URL]
- **部署網址**：http://localhost:3000（本機部署）

---

## 加分項目實作

✅ **設計模式應用**
- 後端使用 MVC Pattern（Model-View-Controller）
- 前端使用 Context API 進行狀態管理（Observer Pattern）

✅ **登入與權限管理**
- 實作 React Context 管理認證狀態
- 使用 Protected Route 保護需要權限的路由
- 前端按鈕根據登入狀態動態顯示

✅ **響應式設計（RWD）**
- 使用 Tailwind CSS Grid 系統
- 支援桌面、平板、手機等裝置
- 斷點設計：sm (640px)、md (768px)、lg (1024px)

---

## 授權聲明

本專案僅供學術用途，所有 T1 戰隊相關資訊與圖片版權歸 T1 Entertainment & Sports 所有。

---

## 致謝

感謝淡江大學資訊管理學系提供優質的學習環境，以及網路程式設計課程的指導。

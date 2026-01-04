# T1 戰隊系統 API 規格文件

## 基本資訊

- **Base URL**: `http://localhost:5001/api`
- **Content-Type**: `application/json`
- **認證方式**: 前端 Context 狀態管理（教學用途）
- **資料庫**: MongoDB (t1_team_db)
- **字元編碼**: UTF-8

---

## API 端點總覽

### 選手管理 (Players)
| 方法 | 端點 | 說明 | 權限 |
|------|------|------|------|
| GET | `/players` | 取得所有選手列表 | 公開 |
| GET | `/players/:id` | 取得特定選手詳情 | 公開 |
| POST | `/players` | 新增選手 | 需登入 |
| PUT | `/players/:id` | 更新選手資料 | 需登入 |
| DELETE | `/players/:id` | 刪除選手 | 需登入 |

### 教練管理 (Coaches)
| 方法 | 端點 | 說明 | 權限 |
|------|------|------|------|
| GET | `/coaches` | 取得所有教練列表 | 公開 |
| GET | `/coaches/:id` | 取得特定教練詳情 | 公開 |
| POST | `/coaches` | 新增教練 | 需登入 |
| PUT | `/coaches/:id` | 更新教練資料 | 需登入 |
| DELETE | `/coaches/:id` | 刪除教練 | 需登入 |

---

## 選手 API (Players)

### 1. 取得所有選手

**GET** `/api/players`

#### 說明
取得資料庫中所有選手的資料，按照建立時間由舊到新排序（最早加入的選手排在前面）。

#### 請求參數
無

#### 請求範例
```bash
curl -X GET http://localhost:5001/api/players
```

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "679e123a456b789c012d345e",
      "name": "李相赫",
      "gameId": "Faker",
      "position": "中路",
      "photoUrl": "https://example.com/faker.jpg",
      "introduction": "英雄聯盟史上最偉大的選手，人稱「大魔王」。",
      "achievements": "4次世界冠軍、2次MSI冠軍、10次LCK冠軍",
      "age": 28,
      "nationality": "韓國",
      "createdAt": "2025-02-01T08:00:00.000Z",
      "updatedAt": "2025-02-01T08:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "679e234b567c890d123e456f",
      "name": "崔宇帝",
      "gameId": "Zeus",
      "position": "上路",
      "photoUrl": "https://example.com/zeus.jpg",
      "introduction": "年輕且極具天賦的上路選手，被譽為韓國上路新生代第一人。",
      "achievements": "2023 世界冠軍、2024 世界冠軍",
      "age": 21,
      "nationality": "韓國",
      "createdAt": "2025-02-01T08:15:00.000Z",
      "updatedAt": "2025-02-01T08:15:00.000Z",
      "__v": 0
    }
  ]
}
```

#### 錯誤回應 (500 Internal Server Error)
```json
{
  "success": false,
  "message": "取得選手列表失敗",
  "error": "Database connection error"
}
```

---

### 2. 取得單一選手

**GET** `/api/players/:id`

#### 說明
根據選手的 MongoDB ObjectId 取得特定選手的詳細資料。

#### 請求參數
| 參數名稱 | 類型 | 位置 | 必填 | 說明 |
|---------|------|------|------|------|
| id | String | Path | 是 | 選手的 MongoDB ObjectId |

#### 請求範例
```bash
curl -X GET http://localhost:5001/api/players/679e123a456b789c012d345e
```

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "679e123a456b789c012d345e",
    "name": "李相赫",
    "gameId": "Faker",
    "position": "中路",
    "photoUrl": "https://example.com/faker.jpg",
    "introduction": "英雄聯盟史上最偉大的選手，人稱「大魔王」。",
    "achievements": "4次世界冠軍、2次MSI冠軍、10次LCK冠軍",
    "age": 28,
    "nationality": "韓國",
    "createdAt": "2025-02-01T08:00:00.000Z",
    "updatedAt": "2025-02-01T08:00:00.000Z",
    "__v": 0
  }
}
```

#### 錯誤回應 (404 Not Found)
```json
{
  "success": false,
  "message": "找不到該選手"
}
```

#### 錯誤回應 (500 Internal Server Error)
```json
{
  "success": false,
  "message": "取得選手資料失敗",
  "error": "Invalid ObjectId"
}
```

---

### 3. 新增選手

**POST** `/api/players`

#### 說明
新增一位選手到資料庫。此操作在前端需要管理員登入才能執行。

#### 請求標頭
```
Content-Type: application/json
```

#### 請求參數
| 參數名稱 | 類型 | 必填 | 說明 |
|---------|------|------|------|
| name | String | 是 | 選手姓名 |
| gameId | String | 是 | 遊戲 ID（唯一） |
| position | String | 是 | 位置（上路/打野/中路/下路/輔助） |
| photoUrl | String | 否 | 選手照片網址 |
| introduction | String | 否 | 選手介紹 |
| achievements | String | 否 | 成就與經歷 |
| age | Number | 否 | 年齡 |
| nationality | String | 否 | 國籍（預設：台灣） |

#### 請求範例
```bash
curl -X POST http://localhost:5001/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "李相赫",
    "gameId": "Faker",
    "position": "中路",
    "photoUrl": "https://example.com/faker.jpg",
    "introduction": "英雄聯盟史上最偉大的選手",
    "achievements": "4次世界冠軍",
    "age": 28,
    "nationality": "韓國"
  }'
```

#### 請求 Body 範例
```json
{
  "name": "李相赫",
  "gameId": "Faker",
  "position": "中路",
  "photoUrl": "https://example.com/faker.jpg",
  "introduction": "英雄聯盟史上最偉大的選手，人稱「大魔王」。",
  "achievements": "4次世界冠軍、2次MSI冠軍、10次LCK冠軍",
  "age": 28,
  "nationality": "韓國"
}
```

#### 成功回應 (201 Created)
```json
{
  "success": true,
  "message": "選手新增成功",
  "data": {
    "_id": "679e123a456b789c012d345e",
    "name": "李相赫",
    "gameId": "Faker",
    "position": "中路",
    "photoUrl": "https://example.com/faker.jpg",
    "introduction": "英雄聯盟史上最偉大的選手，人稱「大魔王」。",
    "achievements": "4次世界冠軍、2次MSI冠軍、10次LCK冠軍",
    "age": 28,
    "nationality": "韓國",
    "createdAt": "2025-02-01T08:00:00.000Z",
    "updatedAt": "2025-02-01T08:00:00.000Z",
    "__v": 0
  }
}
```

#### 錯誤回應 (400 Bad Request)
```json
{
  "success": false,
  "message": "新增選手失敗",
  "error": "ValidationError: gameId: Path `gameId` is required."
}
```

#### 錯誤回應 (409 Conflict)
```json
{
  "success": false,
  "message": "新增選手失敗",
  "error": "E11000 duplicate key error: gameId already exists"
}
```

---

### 4. 更新選手資料

**PUT** `/api/players/:id`

#### 說明
更新指定選手的資料。此操作在前端需要管理員登入才能執行。

#### 請求參數
| 參數名稱 | 類型 | 位置 | 必填 | 說明 |
|---------|------|------|------|------|
| id | String | Path | 是 | 選手的 MongoDB ObjectId |

#### 請求標頭
```
Content-Type: application/json
```

#### 請求 Body
可包含任意需要更新的欄位，不需要所有欄位。

#### 請求範例
```bash
curl -X PUT http://localhost:5001/api/players/679e123a456b789c012d345e \
  -H "Content-Type: application/json" \
  -d '{
    "age": 29,
    "achievements": "5次世界冠軍、2次MSI冠軍、10次LCK冠軍"
  }'
```

#### 請求 Body 範例
```json
{
  "age": 29,
  "achievements": "5次世界冠軍、2次MSI冠軍、10次LCK冠軍",
  "introduction": "更新的介紹內容"
}
```

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "message": "選手資料更新成功",
  "data": {
    "_id": "679e123a456b789c012d345e",
    "name": "李相赫",
    "gameId": "Faker",
    "position": "中路",
    "photoUrl": "https://example.com/faker.jpg",
    "introduction": "更新的介紹內容",
    "achievements": "5次世界冠軍、2次MSI冠軍、10次LCK冠軍",
    "age": 29,
    "nationality": "韓國",
    "createdAt": "2025-02-01T08:00:00.000Z",
    "updatedAt": "2025-02-01T10:30:00.000Z",
    "__v": 0
  }
}
```

#### 錯誤回應 (404 Not Found)
```json
{
  "success": false,
  "message": "找不到該選手"
}
```

#### 錯誤回應 (500 Internal Server Error)
```json
{
  "success": false,
  "message": "更新選手資料失敗",
  "error": "Database error"
}
```

---

### 5. 刪除選手

**DELETE** `/api/players/:id`

#### 說明
刪除指定的選手資料。此操作在前端需要管理員登入才能執行。

#### 請求參數
| 參數名稱 | 類型 | 位置 | 必填 | 說明 |
|---------|------|------|------|------|
| id | String | Path | 是 | 選手的 MongoDB ObjectId |

#### 請求範例
```bash
curl -X DELETE http://localhost:5001/api/players/679e123a456b789c012d345e
```

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "message": "選手刪除成功"
}
```

#### 錯誤回應 (404 Not Found)
```json
{
  "success": false,
  "message": "找不到該選手"
}
```

#### 錯誤回應 (500 Internal Server Error)
```json
{
  "success": false,
  "message": "刪除選手失敗",
  "error": "Database error"
}
```

---

## 教練 API (Coaches)

### 1. 取得所有教練

**GET** `/api/coaches`

#### 說明
取得資料庫中所有教練的資料，按照建立時間由舊到新排序。

#### 請求參數
無

#### 請求範例
```bash
curl -X GET http://localhost:5001/api/coaches
```

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "679e345c678d901e234f567g",
      "name": "金正均",
      "gameId": "Roach",
      "position": "總教練",
      "photoUrl": "https://example.com/roach.jpg",
      "introduction": "經驗豐富的總教練，帶領 T1 奪得多次世界冠軍。",
      "achievements": "3次世界冠軍教練、5次LCK冠軍",
      "age": 35,
      "nationality": "韓國",
      "createdAt": "2025-02-01T09:00:00.000Z",
      "updatedAt": "2025-02-01T09:00:00.000Z",
      "__v": 0
    }
  ]
}
```

#### 錯誤回應 (500 Internal Server Error)
```json
{
  "success": false,
  "message": "取得教練列表失敗",
  "error": "Database connection error"
}
```

---

### 2. 取得單一教練

**GET** `/api/coaches/:id`

#### 說明
根據教練的 MongoDB ObjectId 取得特定教練的詳細資料。

#### 請求參數
| 參數名稱 | 類型 | 位置 | 必填 | 說明 |
|---------|------|------|------|------|
| id | String | Path | 是 | 教練的 MongoDB ObjectId |

#### 請求範例
```bash
curl -X GET http://localhost:5001/api/coaches/679e345c678d901e234f567g
```

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "679e345c678d901e234f567g",
    "name": "金正均",
    "gameId": "Roach",
    "position": "總教練",
    "photoUrl": "https://example.com/roach.jpg",
    "introduction": "經驗豐富的總教練。",
    "achievements": "3次世界冠軍教練、5次LCK冠軍",
    "age": 35,
    "nationality": "韓國",
    "createdAt": "2025-02-01T09:00:00.000Z",
    "updatedAt": "2025-02-01T09:00:00.000Z",
    "__v": 0
  }
}
```

#### 錯誤回應 (404 Not Found)
```json
{
  "success": false,
  "message": "找不到該教練"
}
```

#### 錯誤回應 (500 Internal Server Error)
```json
{
  "success": false,
  "message": "取得教練資料失敗",
  "error": "Invalid ObjectId"
}
```

---

### 3. 新增教練

**POST** `/api/coaches`

#### 說明
新增一位教練到資料庫。此操作在前端需要管理員登入才能執行。

#### 請求標頭
```
Content-Type: application/json
```

#### 請求參數
| 參數名稱 | 類型 | 必填 | 說明 |
|---------|------|------|------|
| name | String | 是 | 教練姓名 |
| gameId | String | 是 | 遊戲 ID（唯一） |
| position | String | 是 | 位置（總教練/教練） |
| photoUrl | String | 否 | 教練照片網址 |
| introduction | String | 否 | 教練介紹 |
| achievements | String | 否 | 成就與經歷 |
| age | Number | 否 | 年齡 |
| nationality | String | 否 | 國籍（預設：台灣） |

#### 請求範例
```bash
curl -X POST http://localhost:5001/api/coaches \
  -H "Content-Type: application/json" \
  -d '{
    "name": "金正均",
    "gameId": "Roach",
    "position": "總教練",
    "photoUrl": "https://example.com/roach.jpg",
    "introduction": "經驗豐富的總教練",
    "achievements": "3次世界冠軍教練",
    "age": 35,
    "nationality": "韓國"
  }'
```

#### 請求 Body 範例
```json
{
  "name": "金正均",
  "gameId": "Roach",
  "position": "總教練",
  "photoUrl": "https://example.com/roach.jpg",
  "introduction": "經驗豐富的總教練，帶領 T1 奪得多次世界冠軍。",
  "achievements": "3次世界冠軍教練、5次LCK冠軍",
  "age": 35,
  "nationality": "韓國"
}
```

#### 成功回應 (201 Created)
```json
{
  "success": true,
  "message": "教練新增成功",
  "data": {
    "_id": "679e345c678d901e234f567g",
    "name": "金正均",
    "gameId": "Roach",
    "position": "總教練",
    "photoUrl": "https://example.com/roach.jpg",
    "introduction": "經驗豐富的總教練，帶領 T1 奪得多次世界冠軍。",
    "achievements": "3次世界冠軍教練、5次LCK冠軍",
    "age": 35,
    "nationality": "韓國",
    "createdAt": "2025-02-01T09:00:00.000Z",
    "updatedAt": "2025-02-01T09:00:00.000Z",
    "__v": 0
  }
}
```

#### 錯誤回應 (400 Bad Request)
```json
{
  "success": false,
  "message": "新增教練失敗",
  "error": "ValidationError: name: Path `name` is required."
}
```

#### 錯誤回應 (409 Conflict)
```json
{
  "success": false,
  "message": "新增教練失敗",
  "error": "E11000 duplicate key error: gameId already exists"
}
```

---

### 4. 更新教練資料

**PUT** `/api/coaches/:id`

#### 說明
更新指定教練的資料。此操作在前端需要管理員登入才能執行。

#### 請求參數
| 參數名稱 | 類型 | 位置 | 必填 | 說明 |
|---------|------|------|------|------|
| id | String | Path | 是 | 教練的 MongoDB ObjectId |

#### 請求標頭
```
Content-Type: application/json
```

#### 請求 Body
可包含任意需要更新的欄位。

#### 請求範例
```bash
curl -X PUT http://localhost:5001/api/coaches/679e345c678d901e234f567g \
  -H "Content-Type: application/json" \
  -d '{
    "achievements": "4次世界冠軍教練、5次LCK冠軍"
  }'
```

#### 請求 Body 範例
```json
{
  "achievements": "4次世界冠軍教練、5次LCK冠軍",
  "introduction": "更新的教練介紹"
}
```

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "message": "教練資料更新成功",
  "data": {
    "_id": "679e345c678d901e234f567g",
    "name": "金正均",
    "gameId": "Roach",
    "position": "總教練",
    "photoUrl": "https://example.com/roach.jpg",
    "introduction": "更新的教練介紹",
    "achievements": "4次世界冠軍教練、5次LCK冠軍",
    "age": 35,
    "nationality": "韓國",
    "createdAt": "2025-02-01T09:00:00.000Z",
    "updatedAt": "2025-02-01T11:00:00.000Z",
    "__v": 0
  }
}
```

#### 錯誤回應 (404 Not Found)
```json
{
  "success": false,
  "message": "找不到該教練"
}
```

#### 錯誤回應 (500 Internal Server Error)
```json
{
  "success": false,
  "message": "更新教練資料失敗",
  "error": "Database error"
}
```

---

### 5. 刪除教練

**DELETE** `/api/coaches/:id`

#### 說明
刪除指定的教練資料。此操作在前端需要管理員登入才能執行。

#### 請求參數
| 參數名稱 | 類型 | 位置 | 必填 | 說明 |
|---------|------|------|------|------|
| id | String | Path | 是 | 教練的 MongoDB ObjectId |

#### 請求範例
```bash
curl -X DELETE http://localhost:5001/api/coaches/679e345c678d901e234f567g
```

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "message": "教練刪除成功"
}
```

#### 錯誤回應 (404 Not Found)
```json
{
  "success": false,
  "message": "找不到該教練"
}
```

#### 錯誤回應 (500 Internal Server Error)
```json
{
  "success": false,
  "message": "刪除教練失敗",
  "error": "Database error"
}
```

---

## HTTP 狀態碼說明

| 狀態碼 | 說明 |
|--------|------|
| 200 OK | 請求成功 |
| 201 Created | 資源建立成功 |
| 400 Bad Request | 請求格式錯誤或缺少必填欄位 |
| 404 Not Found | 找不到指定的資源 |
| 409 Conflict | 資源衝突（如重複的 gameId） |
| 500 Internal Server Error | 伺服器內部錯誤 |

---

## 資料模型規範

### Player Model
```javascript
{
  _id: ObjectId,              // MongoDB 自動生成
  name: String (required),    // 選手姓名
  gameId: String (required, unique),  // 遊戲 ID
  position: String (required),  // 位置（上路/打野/中路/下路/輔助）
  photoUrl: String,            // 照片網址
  introduction: String,        // 選手介紹
  achievements: String,        // 成就與經歷
  age: Number,                // 年齡
  nationality: String (default: '台灣'),  // 國籍
  createdAt: Date,            // 建立時間（自動）
  updatedAt: Date,            // 更新時間（自動）
  __v: Number                 // 版本號（Mongoose 自動）
}
```

### Coach Model
```javascript
{
  _id: ObjectId,              // MongoDB 自動生成
  name: String (required),    // 教練姓名
  gameId: String (required, unique),  // 遊戲 ID
  position: String (required),  // 位置（總教練/教練）
  photoUrl: String,            // 照片網址
  introduction: String,        // 教練介紹
  achievements: String,        // 成就與經歷
  age: Number,                // 年齡
  nationality: String (default: '台灣'),  // 國籍
  createdAt: Date,            // 建立時間（自動）
  updatedAt: Date,            // 更新時間（自動）
  __v: Number                 // 版本號（Mongoose 自動）
}
```

---

## 注意事項

1. **認證機制**：本專案使用前端 React Context 進行狀態管理，並沒有後端 JWT 驗證。實際生產環境應實作完整的後端認證機制。

2. **CORS 設定**：後端已啟用 CORS，允許前端 (localhost:3000) 存取 API。

3. **資料排序**：所有列表 API 預設按照 `createdAt` 升序排序（最早建立的資料排在前面）。

4. **唯一性約束**：`gameId` 欄位具有唯一性約束，不可重複。

5. **錯誤處理**：所有 API 在發生錯誤時都會返回統一格式的錯誤訊息，包含 `success: false` 和 `message` 欄位。

6. **時間戳記**：`createdAt` 和 `updatedAt` 由 Mongoose 自動管理，使用 ISO 8601 格式。

---

## 測試建議

### 使用 cURL 測試
```bash
# 取得所有選手
curl http://localhost:5001/api/players

# 新增選手
curl -X POST http://localhost:5001/api/players \
  -H "Content-Type: application/json" \
  -d '{"name":"測試選手","gameId":"Test123","position":"中路"}'

# 更新選手
curl -X PUT http://localhost:5001/api/players/\[ID\] \
  -H "Content-Type: application/json" \
  -d '{"age":25}'

# 刪除選手
curl -X DELETE http://localhost:5001/api/players/\[ID\]
```

### 使用 Postman
1. 建立新的 Collection "T1 Team API"
2. 新增環境變數：`base_url = http://localhost:5001/api`
3. 依序測試各個端點
4. 確認回應格式和狀態碼

### 使用瀏覽器
直接訪問 GET 端點：
- http://localhost:5001/api/players
- http://localhost:5001/api/coaches

---

## 版本資訊

- **API 版本**: 1.0.0
- **最後更新**: 2025-02-01
- **維護者**: [您的姓名]

---

## 相關文件

- [README.md](../README.md) - 專案說明文件
- [系統架構圖](architecture.png) - 系統架構視覺化
- [CRUD 流程圖](flowchart.png) - 資料流程說明

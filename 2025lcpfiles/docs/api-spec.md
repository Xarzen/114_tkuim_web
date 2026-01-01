# API 規格文件

## 基本資訊
- **Base URL**: `http://localhost:5000/api`
- **Content-Type**: `application/json`
- **認證方式**: 無（本專案為教學用途，未實作認證）

## API 端點列表

### 1. 取得所有選手
**GET** `/players`

#### 說明
取得資料庫中所有選手的資料列表

#### 請求參數
無

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "王小明",
      "gameId": "CFO_TopLaner",
      "position": "上路",
      "photoUrl": "https://example.com/photo1.jpg",
      "introduction": "經驗豐富的上路選手",
      "achievements": "2024 LMS 春季賽冠軍",
      "age": 22,
      "nationality": "台灣",
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z"
    }
  ]
}
```

---

### 2. 取得單一選手
**GET** `/players/:id`

#### 說明
根據選手 ID 取得特定選手的詳細資料

#### 請求參數
| 參數 | 類型 | 位置 | 必填 | 說明 |
|------|------|------|------|------|
| id | string | URL | 是 | 選手的 MongoDB ObjectId |

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "王小明",
    "gameId": "CFO_TopLaner",
    "position": "上路",
    "photoUrl": "https://example.com/photo1.jpg",
    "introduction": "經驗豐富的上路選手，擅長坦克型角色",
    "achievements": "2024 LMS 春季賽冠軍\n2023 世界賽八強",
    "age": 22,
    "nationality": "台灣",
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-01T10:00:00.000Z"
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

---

### 3. 新增選手
**POST** `/players`

#### 說明
新增一位選手到資料庫

#### 請求 Body
```json
{
  "name": "王小明",
  "gameId": "CFO_TopLaner",
  "position": "上路",
  "photoUrl": "https://example.com/photo1.jpg",
  "introduction": "經驗豐富的上路選手",
  "achievements": "2024 LMS 春季賽冠軍",
  "age": 22,
  "nationality": "台灣"
}
```

#### 欄位說明
| 欄位 | 類型 | 必填 | 說明 |
|------|------|------|------|
| name | string | 是 | 選手姓名 |
| gameId | string | 是 | 遊戲 ID（唯一值） |
| position | string | 是 | 位置（上路/打野/中路/下路/輔助） |
| photoUrl | string | 否 | 照片網址 |
| introduction | string | 否 | 選手介紹 |
| achievements | string | 否 | 成就/經歷 |
| age | number | 否 | 年齡 |
| nationality | string | 否 | 國籍（預設：台灣） |

#### 成功回應 (201 Created)
```json
{
  "success": true,
  "message": "選手新增成功",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "王小明",
    "gameId": "CFO_TopLaner",
    "position": "上路",
    "photoUrl": "https://example.com/photo1.jpg",
    "introduction": "經驗豐富的上路選手",
    "achievements": "2024 LMS 春季賽冠軍",
    "age": 22,
    "nationality": "台灣",
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-01T10:00:00.000Z"
  }
}
```

#### 錯誤回應 (400 Bad Request) - 重複 gameId
```json
{
  "success": false,
  "message": "該遊戲 ID 已存在"
}
```

#### 錯誤回應 (400 Bad Request) - 驗證失敗
```json
{
  "success": false,
  "message": "資料驗證失敗",
  "errors": [
    "請輸入選手姓名",
    "請輸入遊戲 ID"
  ]
}
```

---

### 4. 更新選手
**PUT** `/players/:id`

#### 說明
更新指定選手的資料

#### 請求參數
| 參數 | 類型 | 位置 | 必填 | 說明 |
|------|------|------|------|------|
| id | string | URL | 是 | 選手的 MongoDB ObjectId |

#### 請求 Body
```json
{
  "name": "王小明",
  "gameId": "CFO_TopLaner",
  "position": "上路",
  "photoUrl": "https://example.com/photo1-updated.jpg",
  "introduction": "更新後的介紹內容",
  "achievements": "新增的成就",
  "age": 23,
  "nationality": "台灣"
}
```

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "message": "選手資料更新成功",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "王小明",
    "gameId": "CFO_TopLaner",
    "position": "上路",
    "photoUrl": "https://example.com/photo1-updated.jpg",
    "introduction": "更新後的介紹內容",
    "achievements": "新增的成就",
    "age": 23,
    "nationality": "台灣",
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-02T15:30:00.000Z"
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

---

### 5. 刪除選手
**DELETE** `/players/:id`

#### 說明
刪除指定的選手資料

#### 請求參數
| 參數 | 類型 | 位置 | 必填 | 說明 |
|------|------|------|------|------|
| id | string | URL | 是 | 選手的 MongoDB ObjectId |

#### 成功回應 (200 OK)
```json
{
  "success": true,
  "message": "選手刪除成功",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "王小明",
    "gameId": "CFO_TopLaner",
    "position": "上路"
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

---

## HTTP 狀態碼說明

| 狀態碼 | 說明 |
|--------|------|
| 200 OK | 請求成功 |
| 201 Created | 資源建立成功 |
| 400 Bad Request | 請求參數錯誤或驗證失敗 |
| 404 Not Found | 找不到指定資源 |
| 500 Internal Server Error | 伺服器內部錯誤 |

## 錯誤處理

所有錯誤回應都遵循以下格式：

```json
{
  "success": false,
  "message": "錯誤訊息描述",
  "error": "詳細錯誤資訊（僅在開發模式）"
}
```

## 測試範例

### 使用 curl 測試

#### 1. 取得所有選手
```bash
curl http://localhost:5000/api/players
```

#### 2. 新增選手
```bash
curl -X POST http://localhost:5000/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "王小明",
    "gameId": "CFO_TopLaner",
    "position": "上路",
    "age": 22,
    "nationality": "台灣",
    "introduction": "經驗豐富的上路選手"
  }'
```

#### 3. 更新選手
```bash
curl -X PUT http://localhost:5000/api/players/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "王小明",
    "age": 23
  }'
```

#### 4. 刪除選手
```bash
curl -X DELETE http://localhost:5000/api/players/65a1b2c3d4e5f6g7h8i9j0k1
```

---

## 資料驗證規則

### Player Schema 驗證
- **name**: 必填，字串
- **gameId**: 必填，字串，唯一值
- **position**: 必填，必須為以下值之一：
  - 上路, 打野, 中路, 下路, 輔助
  - Top, Jungle, Mid, ADC, Support
- **photoUrl**: 選填，字串
- **introduction**: 選填，字串
- **achievements**: 選填，字串
- **age**: 選填，數字，需 >= 0
- **nationality**: 選填，字串，預設為「台灣」

## 注意事項
1. 本 API 未實作認證機制，任何人都可以進行 CRUD 操作
2. gameId 必須是唯一值，重複時會回傳錯誤
3. 所有日期時間格式為 ISO 8601 標準
4. 建議在前端進行基本的表單驗證，減少無效請求

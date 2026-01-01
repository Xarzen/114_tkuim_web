# CRUD 流程圖說明

## 1. Create (新增選手) 流程

```
開始
  ↓
使用者點擊「新增選手」按鈕
  ↓
導航至 AddPlayer 頁面 (/add)
  ↓
顯示 PlayerForm 表單元件
  ↓
使用者填寫選手資料
- 姓名 (必填)
- 遊戲 ID (必填)
- 位置 (必填)
- 年齡 (選填)
- 國籍 (選填)
- 照片網址 (選填)
- 介紹 (選填)
- 成就 (選填)
  ↓
使用者點擊「新增選手」按鈕
  ↓
前端表單驗證
  ↓
驗證失敗? ──是→ 顯示錯誤訊息 → 返回表單
  ↓ 否
API Service 發送 POST 請求
→ axios.post('/api/players', formData)
  ↓
後端接收請求 (server.js)
  ↓
路由分發 (playerRoutes.js)
→ router.post('/', createPlayer)
  ↓
控制器處理 (playerController.js)
→ createPlayer 函式
  ↓
Mongoose Model 驗證資料
  ↓
驗證失敗? ──是→ 返回 400 錯誤
  ↓          (重複 gameId 或必填欄位缺失)
  否          ↓
  ↓        前端顯示錯誤訊息
  ↓          ↓
寫入 MongoDB 資料庫         結束
(players collection)
  ↓
返回 201 Created
+ 新增的選手資料
  ↓
前端接收回應
  ↓
顯示成功訊息
  ↓
導航回首頁 (/)
  ↓
重新載入選手列表
  ↓
結束
```

---

## 2. Read (查詢選手) 流程

### 2.1 查詢所有選手

```
開始
  ↓
使用者進入首頁 (/)
  ↓
Home 元件掛載 (useEffect)
  ↓
API Service 發送 GET 請求
→ axios.get('/api/players')
  ↓
後端接收請求
  ↓
路由分發 → getAllPlayers
  ↓
控制器查詢資料庫
→ Player.find().sort({ createdAt: -1 })
  ↓
MongoDB 返回所有選手資料
  ↓
後端返回 200 OK
{
  success: true,
  count: 5,
  data: [選手陣列]
}
  ↓
前端接收資料
  ↓
更新 React State (setPlayers)
  ↓
渲染選手列表
→ 使用 PlayerCard 元件
  ↓
顯示在畫面上
  ↓
結束
```

### 2.2 查詢單一選手

```
開始
  ↓
使用者點擊「查看詳情」按鈕
  ↓
導航至 PlayerDetail 頁面
(/player/:id)
  ↓
從 URL 取得選手 ID
  ↓
API Service 發送 GET 請求
→ axios.get(`/api/players/${id}`)
  ↓
後端接收請求
  ↓
路由分發 → getPlayerById
  ↓
控制器查詢資料庫
→ Player.findById(id)
  ↓
找到選手? ──否→ 返回 404 Not Found
  ↓ 是          ↓
  ↓        前端顯示錯誤訊息
返回 200 OK      ↓
+ 選手資料      結束
  ↓
前端接收資料
  ↓
更新 State (setPlayer)
  ↓
渲染選手詳細資訊
- 照片
- 基本資料
- 介紹
- 成就
  ↓
結束
```

---

## 3. Update (更新選手) 流程

```
開始
  ↓
使用者點擊「編輯」按鈕
  ↓
導航至 EditPlayer 頁面
(/edit/:id)
  ↓
從 URL 取得選手 ID
  ↓
API Service 發送 GET 請求
→ 載入現有選手資料
  ↓
顯示 PlayerForm 表單
(預填現有資料)
  ↓
使用者修改資料
  ↓
使用者點擊「更新選手」按鈕
  ↓
前端表單驗證
  ↓
驗證失敗? ──是→ 顯示錯誤訊息
  ↓ 否          ↓
  ↓          返回表單
API Service 發送 PUT 請求
→ axios.put(`/api/players/${id}`, formData)
  ↓
後端接收請求
  ↓
路由分發 → updatePlayer
  ↓
控制器處理
→ Player.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })
  ↓
MongoDB 更新資料
  ↓
找到並更新? ──否→ 返回 404 Not Found
  ↓ 是              ↓
  ↓            前端顯示錯誤
返回 200 OK          ↓
+ 更新後的資料      結束
  ↓
前端接收回應
  ↓
顯示成功訊息
  ↓
導航至選手詳細頁 (/player/:id)
  ↓
顯示更新後的資料
  ↓
結束
```

---

## 4. Delete (刪除選手) 流程

```
開始
  ↓
使用者點擊「刪除」按鈕
(可能在列表頁或詳細頁)
  ↓
前端顯示確認對話框
「確定要刪除選手「XXX」嗎?」
  ↓
使用者確認? ──否→ 取消操作 → 結束
  ↓ 是
  ↓
API Service 發送 DELETE 請求
→ axios.delete(`/api/players/${id}`)
  ↓
後端接收請求
  ↓
路由分發 → deletePlayer
  ↓
控制器處理
→ Player.findByIdAndDelete(id)
  ↓
MongoDB 刪除資料
  ↓
找到並刪除? ──否→ 返回 404 Not Found
  ↓ 是              ↓
  ↓            前端顯示錯誤
返回 200 OK          ↓
+ 被刪除的選手資料  結束
  ↓
前端接收回應
  ↓
在列表頁? ──是→ 重新載入選手列表
  ↓ 否              ↓
  ↓            顯示在畫面上
導航回首頁 (/)      ↓
  ↓            結束
顯示刪除成功訊息
  ↓
結束
```

---

## 錯誤處理流程

```
任何 API 請求
  ↓
發生錯誤?
  ↓
├─ 網路錯誤 (無法連接後端)
│   ↓
│   前端顯示:
│   「無法連接伺服器，請確認後端是否啟動」
│   ↓
│   結束
│
├─ 400 Bad Request (驗證錯誤)
│   ↓
│   後端返回錯誤訊息
│   ↓
│   前端顯示具體錯誤
│   (例: 必填欄位、重複的 gameId)
│   ↓
│   使用者修正後重試
│   ↓
│   結束
│
├─ 404 Not Found (找不到資源)
│   ↓
│   前端顯示:
│   「找不到該選手」
│   ↓
│   導航回首頁或顯示錯誤頁
│   ↓
│   結束
│
└─ 500 Internal Server Error (伺服器錯誤)
    ↓
    前端顯示:
    「伺服器發生錯誤，請稍後再試」
    ↓
    記錄錯誤 (console.error)
    ↓
    結束
```

---

## 前後端資料交換格式

### Request (請求)
```
前端 → 後端

Headers:
  Content-Type: application/json

Body (POST/PUT):
{
  "name": "王小明",
  "gameId": "CFO_TopLaner",
  "position": "上路",
  "age": 22,
  "nationality": "台灣",
  "photoUrl": "https://...",
  "introduction": "...",
  "achievements": "..."
}
```

### Response (回應)
```
後端 → 前端

Status: 200 OK / 201 Created / 400 / 404 / 500

Body (成功):
{
  "success": true,
  "message": "操作成功訊息",
  "data": { ...選手資料 }
}

Body (失敗):
{
  "success": false,
  "message": "錯誤訊息",
  "error": "詳細錯誤 (開發模式)"
}
```

---

## 使用者操作完整流程範例

### 情境：新增一位選手

```
1. 使用者開啟網站 (http://localhost:3000)
   → 看到選手列表

2. 點擊導覽列的「+ 新增選手」按鈕
   → 進入新增頁面 (/add)

3. 填寫表單:
   - 姓名: 王小明
   - 遊戲 ID: CFO_TopLaner
   - 位置: 上路
   - 年齡: 22
   - 國籍: 台灣
   - 照片網址: (貼上照片連結)
   - 介紹: (輸入選手介紹)
   - 成就: (輸入成就)

4. 點擊「新增選手」按鈕
   → 前端驗證通過
   → 發送 API 請求到後端

5. 後端處理:
   → 驗證資料
   → 寫入 MongoDB
   → 返回成功回應

6. 前端接收回應:
   → 顯示「選手新增成功!」
   → 自動跳轉回首頁

7. 首頁重新載入:
   → 顯示包含新選手的列表
   → 使用者看到剛新增的選手卡片

完成!
```

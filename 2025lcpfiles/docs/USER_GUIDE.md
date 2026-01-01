# 使用者編輯指南

## 📝 如何編輯選手資料和照片

親愛的使用者，這份文件將告訴您如何在系統中新增、編輯選手資料和照片。

---

## 方法一：使用網頁介面（推薦）✨

### 1. 啟動系統

首先確保系統已經啟動：

```bash
# 終端機 1 - 啟動後端
cd backend
npm start

# 終端機 2 - 啟動前端
cd frontend
npm run dev
```

然後在瀏覽器開啟：http://localhost:3000

### 2. 新增選手

1. 點擊右上角的「**+ 新增選手**」按鈕
2. 填寫表單：
   - **選手姓名** ⭐（必填）：輸入選手的真實姓名
   - **遊戲 ID** ⭐（必填）：輸入選手的遊戲帳號
   - **位置** ⭐（必填）：選擇位置（上路/打野/中路/下路/輔助）
   - **年齡**：輸入年齡數字
   - **國籍**：輸入國籍（預設：台灣）
   - **照片網址**：貼上照片的網址（見下方說明）
   - **選手介紹**：輸入選手的背景介紹
   - **成就/經歷**：輸入選手的戰績、獎項等

3. 點擊「**新增選手**」按鈕完成

### 3. 編輯選手

1. 在首頁選手卡片上點擊「**編輯**」按鈕
2. 或在選手詳細頁點擊「**編輯資料**」按鈕
3. 修改想要更新的欄位
4. 點擊「**更新選手**」按鈕儲存

### 4. 刪除選手

1. 在選手卡片或詳細頁點擊「**刪除**」按鈕
2. 確認刪除對話框
3. 選手資料將被永久刪除

---

## 📸 如何取得照片網址

### 方法 A：使用 Imgur（推薦）

1. 前往 [Imgur](https://imgur.com/)
2. 點擊「New post」上傳照片
3. 上傳完成後，在照片上按右鍵
4. 選擇「複製圖片網址」
5. 將網址貼到「照片網址」欄位

### 方法 B：使用 Google Drive

1. 上傳照片到 Google Drive
2. 對照片按右鍵 → 「取得連結」
3. 設定為「知道連結的任何人」
4. 複製連結並轉換格式：
   ```
   原始: https://drive.google.com/file/d/FILE_ID/view
   轉換: https://drive.google.com/uc?export=view&id=FILE_ID
   ```
5. 將轉換後的網址貼到欄位中

### 方法 C：使用其他圖床

- [ImgBB](https://imgbb.com/)
- [PostImage](https://postimages.org/)
- [ImageShack](https://imageshack.com/)

⚠️ **注意**：確保照片網址是 **直接指向圖片** 的連結（通常結尾是 .jpg, .png, .gif 等）

### 方法 D：使用本地檔案（進階）

如果您想使用本地照片：

1. 在 `frontend/public/images/` 目錄建立資料夾
2. 將照片放入該資料夾
3. 照片網址填寫：`/images/your-photo.jpg`

---

## 方法二：直接編輯程式碼（進階使用者）

### 建立初始測試資料

您可以在後端建立一個初始化腳本：

**檔案位置**：`backend/scripts/seedData.js`

```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const Player = require('../models/Player');

const samplePlayers = [
  {
    name: '王小明',
    gameId: 'CFO_TopLaner',
    position: '上路',
    age: 22,
    nationality: '台灣',
    photoUrl: 'https://your-image-url.com/player1.jpg',
    introduction: '經驗豐富的上路選手，擅長坦克型角色，團戰意識優秀。',
    achievements: '2024 LMS 春季賽冠軍\n2023 世界賽八強\n2023 MSI 季軍'
  },
  {
    name: '李大華',
    gameId: 'CFO_Jungle',
    position: '打野',
    age: 21,
    nationality: '台灣',
    photoUrl: 'https://your-image-url.com/player2.jpg',
    introduction: '侵略性打野，前期節奏掌控能力強。',
    achievements: '2024 LMS 春季賽 MVP\n2023 年度最佳打野'
  },
  {
    name: '陳中路',
    gameId: 'CFO_MidLane',
    position: '中路',
    age: 23,
    nationality: '台灣',
    photoUrl: 'https://your-image-url.com/player3.jpg',
    introduction: '全能型中路，法師、刺客都能駕馭。',
    achievements: '2024 春季賽擊殺王\n多次單殺世界級中路選手'
  },
  {
    name: '張下路',
    gameId: 'CFO_ADC',
    position: '下路',
    age: 20,
    nationality: '台灣',
    photoUrl: 'https://your-image-url.com/player4.jpg',
    introduction: '穩定輸出型 ADC，團戰定位精準。',
    achievements: '2023 年度新人王\n場均傷害最高 ADC'
  },
  {
    name: '劉輔助',
    gameId: 'CFO_Support',
    position: '輔助',
    age: 24,
    nationality: '台灣',
    photoUrl: 'https://your-image-url.com/player5.jpg',
    introduction: '指揮型輔助，擁有出色的視野控制能力。',
    achievements: '2024 最佳輔助\n隊伍主要戰術指揮'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB 連線成功');

    // 清空現有資料（小心使用！）
    await Player.deleteMany({});
    console.log('🗑️  已清空現有選手資料');

    // 插入測試資料
    await Player.insertMany(samplePlayers);
    console.log('✅ 成功新增 5 位選手資料');

    mongoose.connection.close();
    console.log('👋 資料庫連線已關閉');
  } catch (error) {
    console.error('❌ 錯誤:', error);
    process.exit(1);
  }
}

seedDatabase();
```

**執行腳本**：

```bash
cd backend
node scripts/seedData.js
```

---

## 📋 選手資料欄位說明

| 欄位 | 必填 | 說明 | 範例 |
|------|------|------|------|
| 姓名 | ⭐ 是 | 選手真實姓名 | 王小明 |
| 遊戲 ID | ⭐ 是 | 遊戲中的暱稱（不可重複） | CFO_TopLaner |
| 位置 | ⭐ 是 | 上路/打野/中路/下路/輔助 | 上路 |
| 年齡 | 否 | 選手年齡 | 22 |
| 國籍 | 否 | 選手國籍 | 台灣 |
| 照片網址 | 否 | 選手照片的網址 | https://... |
| 選手介紹 | 否 | 選手背景、特色介紹 | 經驗豐富的上路選手... |
| 成就/經歷 | 否 | 戰績、獎項、經歷 | 2024 冠軍、MVP... |

---

## 💡 實用技巧

### 1. 使用 Markdown 格式化文字

在「介紹」和「成就」欄位中，您可以使用換行來組織內容：

```
2024 LMS 春季賽冠軍
2023 世界賽八強
2023 MSI 季軍
```

### 2. 照片尺寸建議

- **推薦尺寸**：400x400 像素或以上
- **長寬比**：1:1（正方形）效果最佳
- **檔案格式**：JPG 或 PNG
- **檔案大小**：建議小於 2MB

### 3. 批次新增選手

如果要新增多位選手，建議：
1. 使用上方的 `seedData.js` 腳本方法
2. 或者使用 API 測試工具（如 Postman）批次發送請求

---

## 🔧 常見問題

### Q1: 照片無法顯示怎麼辦？

**A**: 檢查以下幾點：
- 照片網址是否正確
- 網址是否可以在瀏覽器中直接開啟
- 照片是否設定為公開存取
- 網址是否使用 HTTPS（建議使用）

### Q2: 無法新增選手？

**A**: 可能原因：
- 必填欄位（姓名、遊戲 ID、位置）是否都填寫了
- 遊戲 ID 是否與現有選手重複
- 後端伺服器是否正常運行

### Q3: 如何修改已上傳的照片？

**A**: 
1. 進入該選手的編輯頁面
2. 將新的照片網址貼到「照片網址」欄位
3. 點擊「更新選手」儲存

### Q4: 可以上傳多張照片嗎？

**A**: 
目前系統設計為一位選手一張照片。如需展示多張照片，建議：
- 使用照片編輯工具製作拼圖
- 上傳拼圖後的圖片
- 或在「介紹」欄位中附上其他照片連結

---

## 📞 需要協助？

如果遇到任何問題：
1. 檢查瀏覽器的開發者工具（F12）的 Console 頁籤
2. 查看後端終端機的錯誤訊息
3. 確認 MongoDB 資料庫是否正常運行

---

**祝您使用愉快！如有任何問題，歡迎隨時詢問。** 🎉

# GitHub Pages 部署說明

## 部署步驟

### 1. 準備工作
確保您的專案已經推送到 GitHub 倉庫，並且倉庫名稱是 `drawWeb`。

### 2. 啟用 GitHub Pages
1. 前往您的 GitHub 倉庫
2. 點擊 "Settings" 標籤
3. 在左側選單中找到 "Pages"
4. 在 "Source" 下拉選單中選擇 "GitHub Actions"
5. 儲存設定

### 3. 自動部署
當您推送程式碼到 `main` 或 `master` 分支時，GitHub Actions 會自動：
- 安裝依賴套件
- 建置專案
- 部署到 GitHub Pages

### 4. 訪問您的網站
部署完成後，您的網站將可以在以下網址訪問：
`https://wafflefrank.github.io/drawWeb/`

## 手動部署（如果需要）

如果自動部署有問題，您也可以手動部署：

```bash
# 安裝依賴
npm install

# 建置專案
npm run build

# 將 dist 資料夾的內容推送到 gh-pages 分支
```

## 注意事項

- 確保 `vue.config.js` 中的 `publicPath` 設定為 `/drawWeb/`
- 如果您的倉庫名稱不是 `drawWeb`，請相應修改 `publicPath`
- 部署過程可能需要幾分鐘時間
- 您可以在 "Actions" 標籤中查看部署狀態

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

## 故障排除

### 如果 GitHub Pages 沒有顯示網址：

1. **檢查分支設定**：
   - 確保您推送的分支是 `display_Wheel`、`main` 或 `master`
   - 工作流程已更新支援 `display_Wheel` 分支

2. **檢查 Pages 設定**：
   - 前往倉庫的 Settings > Pages
   - 確保 Source 選擇 "GitHub Actions"
   - 如果沒有顯示網址，等待幾分鐘後重新整理頁面

3. **檢查工作流程權限**：
   - 前往 Settings > Actions > General
   - 在 "Workflow permissions" 部分選擇 "Read and write permissions"
   - 勾選 "Allow GitHub Actions to create and approve pull requests"

4. **手動觸發部署**：
   - 前往 Actions 標籤
   - 點擊 "Deploy to GitHub Pages" 工作流程
   - 點擊 "Run workflow" 按鈕手動觸發

## 注意事項

- 確保 `vue.config.js` 中的 `publicPath` 設定為 `/drawWeb/`
- 如果您的倉庫名稱不是 `drawWeb`，請相應修改 `publicPath`
- 部署過程可能需要幾分鐘時間
- 您可以在 "Actions" 標籤中查看部署狀態
- 如果仍然沒有顯示網址，請檢查倉庫的 Pages 設定是否正確啟用

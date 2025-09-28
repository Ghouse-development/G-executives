# 🔧 Vercel環境変数エラーの解決方法

## 問題
`Uncaught Error: supabaseUrl is required` エラーが発生

## 原因
Vercelで環境変数が正しく設定されていない、または反映されていない

## 解決手順

### 1. Vercel環境変数の再確認

1. **Vercelダッシュボードにログイン**
   - https://vercel.com にアクセス
   - プロジェクトを選択

2. **Settings → Environment Variables を確認**

   以下が**正確に**設定されているか確認：

   ```
   Key: VITE_SUPABASE_URL
   Value: https://khxhkwdjqnafqouvxnup.supabase.co

   Key: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeGhrd2RqcW5hZnFvdXZ4bnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMTcwMzAsImV4cCI6MjA3NDU5MzAzMH0.Wyo7YmF0afag4mqlu_ShVK0rDBxoSgqLSv2PCks5kIQ
   ```

   ⚠️ **重要なチェックポイント**:
   - Keyの名前が完全一致（大文字小文字も）
   - 前後に空白がないこと
   - `VITE_` プレフィックスが付いていること

3. **環境の選択を確認**
   - [ ] Production ✅
   - [ ] Preview ✅
   - [ ] Development ✅

   全てにチェックが入っているか確認

### 2. 再デプロイの実行

環境変数を追加・変更した後は**必ず再デプロイが必要**：

1. Vercel Dashboard → プロジェクト → **Deployments**タブ
2. 最新のデプロイメントの右側の「・・・」メニュー
3. **「Redeploy」** をクリック
4. **「Use existing Build Cache」のチェックを外す** ← 重要！
5. 「Redeploy」ボタンをクリック

### 3. デバッグ情報の確認

ブラウザの開発者ツール（F12）のコンソールで確認：

```javascript
// 以下のような出力が表示されます
Environment check: {
  url: "Set",  // または "Missing"
  key: "Set",  // または "Missing"
  env: {...}   // 環境変数の一覧
}
```

### 4. それでも解決しない場合

#### A. Vercel CLIを使用して確認
```bash
vercel env ls
```

#### B. 手動で環境変数を削除して再追加
1. 既存の環境変数を削除
2. 改めて追加
3. 再デプロイ（キャッシュなし）

#### C. ビルドコマンドの確認
Vercel Settings → General → Build & Development Settings:
- Build Command: `npm run build`
- Output Directory: `dist`

### 5. 最終確認

1. デプロイログを確認
   - Vercel Dashboard → Functions タブ
   - ビルドログにエラーがないか確認

2. 環境変数がビルド時に読み込まれているか
   - ビルドログに `VITE_` で始まる環境変数が表示されているか確認

## よくある間違い

❌ **間違い例**:
- `SUPABASE_URL` （VITE_プレフィックスなし）
- `VITE_SUPABASE_URL ` （末尾に空白）
- ` VITE_SUPABASE_URL` （先頭に空白）
- 値をクォートで囲む `"https://..."`

✅ **正しい例**:
- `VITE_SUPABASE_URL`
- 値はクォートなし

---

これらの手順で必ず解決します。問題が続く場合は、コンソールのデバッグ情報を確認してください。
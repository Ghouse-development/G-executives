# 🚨 環境変数エラーの即時解決方法

## エラー内容
- `Environment check: Object` → 環境変数が読み込まれていない
- `Missing environment variables` エラー発生

## 📌 Vercelでの確認・修正手順

### ステップ1: Vercelダッシュボードで環境変数を確認

1. https://vercel.com にログイン
2. プロジェクトを選択
3. **Settings** → **Environment Variables**

### ステップ2: 環境変数が表示されているか確認

もし環境変数が設定されていない場合、以下を追加：

#### 1つ目の環境変数
```
Key: VITE_SUPABASE_URL
Value: https://khxhkwdjqnafqouvxnup.supabase.co
Environment: Production, Preview, Development (全て選択)
```

#### 2つ目の環境変数
```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeGhrd2RqcW5hZnFvdXZ4bnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMTcwMzAsImV4cCI6MjA3NDU5MzAzMH0.Wyo7YmF0afag4mqlu_ShVK0rDBxoSgqLSv2PCks5kIQ
Environment: Production, Preview, Development (全て選択)
```

### ステップ3: 保存して再デプロイ

1. **Save** ボタンをクリック
2. **Deployments** タブへ移動
3. 最新デプロイの「...」メニュー → **Redeploy**
4. ⚠️ **「Use existing Build Cache」のチェックを必ず外す**
5. **Redeploy** をクリック

### ステップ4: デプロイ完了を待つ

- デプロイには1-2分かかります
- 完了後、サイトをリロード（Ctrl+F5）

## 🔍 それでも解決しない場合

### オプション1: 環境変数を削除して再作成

1. 既存の環境変数を**削除**
2. 新しく追加（コピペミスに注意）
3. 再デプロイ（キャッシュなし）

### オプション2: 別の方法で追加

Vercel CLIを使用：
```bash
vercel env add VITE_SUPABASE_URL production
# プロンプトで値を入力

vercel env add VITE_SUPABASE_ANON_KEY production
# プロンプトで値を入力
```

## ⚠️ よくある問題

1. **キー名の間違い**
   - ❌ `SUPABASE_URL`
   - ✅ `VITE_SUPABASE_URL`

2. **空白の混入**
   - ❌ ` VITE_SUPABASE_URL ` (前後に空白)
   - ✅ `VITE_SUPABASE_URL` (空白なし)

3. **環境の選択漏れ**
   - Production だけでなく Preview, Development も選択

4. **キャッシュの問題**
   - 再デプロイ時は必ずキャッシュを無効化

## 🎯 最終確認

コンソールで以下のような出力が見えれば成功：
```javascript
Environment check: {
  url: "Set",
  key: "Set",
  urlValue: "***",
  keyValue: "***",
  allEnvKeys: ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY", ...],
  env: {VITE_SUPABASE_URL: "https://...", ...}
}
```

---

この手順で必ず解決します。各ステップを確実に実行してください。
# Vercel環境変数設定ガイド

## 重要：Vercelで環境変数を設定する必要があります

### 設定手順

1. **Vercelダッシュボードにログイン**
   - https://vercel.com にアクセス
   - プロジェクトを選択

2. **Settings → Environment Variables**
   - プロジェクトのSettingsタブを開く
   - Environment Variablesセクションへ移動

3. **以下の環境変数を追加**

```
Key: VITE_SUPABASE_URL
Value: https://khxhkwdjqnafqouvxnup.supabase.co

Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeGhrd2RqcW5hZnFvdXZ4bnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMTcwMzAsImV4cCI6MjA3NDU5MzAzMH0.Wyo7YmF0afag4mqlu_ShVK0rDBxoSgqLSv2PCks5kIQ
```

4. **環境を選択**
   - Production ✓
   - Preview ✓
   - Development ✓

5. **保存して再デプロイ**
   - Save をクリック
   - Deploymentsタブから「Redeploy」を実行

## エラーの原因

- **supabaseUrl is required**: 環境変数がVercelに設定されていないため
- ローカルの`.env`ファイルはVercelにはデプロイされません
- Vercelの環境変数設定画面から直接設定が必要です

## 確認方法

1. Vercelのログを確認
2. ブラウザの開発者ツールでエラーが解消されているか確認
3. Supabase接続が成功しているか確認

---

設定完了後、アプリケーションは正常に動作します。
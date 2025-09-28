# 🔑 Supabase APIキーの正しい取得方法

## 📍 アクセス先
https://supabase.com/dashboard/project/khxhkwdjqnafqouvxnup/settings/api

## 🔍 取得手順（画像付きガイド）

### 1. Supabaseダッシュボードにログイン
- https://supabase.com にアクセス
- ログイン
- プロジェクト「khxhkwdjqnafqouvxnup」を選択

### 2. Settings → API へ移動
```
左サイドバー
  ↓
⚙️ Settings
  ↓
API
```

### 3. 必要な情報をコピー

#### ① Project URL
```
セクション: Project URL
値: https://khxhkwdjqnafqouvxnup.supabase.co
コピー方法: 右側の「Copy」ボタンをクリック
```

#### ② Anon Key（重要！）
```
セクション: Project API keys
キーの種類: anon (public)  ← これを使用！
表示方法: 「Show」ボタンをクリック
コピー方法: 「Copy」ボタンをクリック
```

## ⚠️ 注意事項

### ✅ 正しいキー
- **anon (public)** - フロントエンドで使用
- 「Show」→「Copy」でコピー

### ❌ 間違いやすいキー
- **service_role (secret)** - これは使わない！
- **JWT Secret** - これも使わない！

## 🔄 キーの見分け方

正しい anon キーの特徴：
1. `eyJ` で始まる長い文字列
2. 「anon (public)」というラベル
3. 「This key is safe to use in a browser」という説明文

## 📝 取得後の確認

コピーしたキーをメモ帳に貼り付けて確認：
- 前後に空白がないこと
- 改行が入っていないこと
- 完全な文字列であること

## 🚀 設定場所

### 1. ローカル開発（.env）
```env
VITE_SUPABASE_URL=https://khxhkwdjqnafqouvxnup.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...（コピーしたキー）
```

### 2. Vercel環境変数
```
Key: VITE_SUPABASE_URL
Value: https://khxhkwdjqnafqouvxnup.supabase.co

Key: VITE_SUPABASE_ANON_KEY
Value: eyJ...（コピーしたキー）
```

---

もし現在のキーが動作しない場合は、Supabaseダッシュボードから
正しい anon (public) キーを再度コピーしてください。
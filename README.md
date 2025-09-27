# G-Executives Training System

Gハウス幹部向けの学習管理システム

## 機能

- 📚 教材管理（PDF、JPEG、PowerPoint対応）
- 📝 1問1答形式のテスト機能
- 👥 幹部ごとの学習進捗管理
- 🏆 リーダーボード機能
- 📊 カテゴリ別学習管理
- 🎯 習熟度の可視化

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseの設定

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. `supabase/schema.sql`のSQLをSupabaseのSQLエディタで実行
3. プロジェクトのURLとAnonキーを取得
4. `.env`ファイルを作成し、環境変数を設定

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

### 4. ビルド

```bash
npm run build
```

## デプロイ（Vercel）

1. GitHubリポジトリとVercelを連携
2. 環境変数を設定
3. デプロイ

## 使い方

1. **カテゴリ管理**: まずカテゴリを作成
2. **幹部登録**: テストを受ける幹部を登録
3. **教材アップロード**: PDF/JPEG/PowerPointファイルをアップロード
4. **テスト実施**: 幹部を選択してテストを開始
5. **進捗確認**: 学習進捗ページで成績を確認

## 技術スタック

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase
- Vercel
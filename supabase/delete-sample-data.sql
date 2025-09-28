-- サンプルデータを削除するSQL

-- 1. テスト回答を削除（外部キー制約のため先に削除）
DELETE FROM test_answers;

-- 2. テストセッションを削除
DELETE FROM test_sessions;

-- 3. 学習進捗を削除
DELETE FROM learning_progress;

-- 4. サンプル問題を削除
DELETE FROM questions
WHERE question IN (
  '顧客のニーズを把握するための最も重要な手法は何ですか？',
  'B2B営業とB2C営業の主な違いは何ですか？',
  'クロージングのタイミングを見極める重要なサインを3つ挙げてください',
  '4Pとは何の略ですか？',
  'STP分析のSTPは何を表しますか？',
  'カスタマージャーニーマップの主な目的は何ですか？',
  'チームビルディングの基本的な5段階を順番に答えてください',
  'サーバントリーダーシップとは何ですか？',
  'コンフリクトマネジメントの5つのアプローチを挙げてください',
  'ROEとは何の略ですか？',
  '流動比率の計算式は？',
  'キャッシュフロー計算書の3つの区分を答えてください',
  'PMBOKの5つのプロセスグループを答えてください',
  'WBSとは何の略ですか？',
  'クリティカルパスとは何ですか？'
);

-- 5. サンプル幹部を削除（メールアドレスで識別）
DELETE FROM executives
WHERE email LIKE '%@ghouse.example.com';

-- 6. 必要に応じて：全データを削除する場合
-- TRUNCATE TABLE test_answers CASCADE;
-- TRUNCATE TABLE test_sessions CASCADE;
-- TRUNCATE TABLE learning_progress CASCADE;
-- TRUNCATE TABLE questions CASCADE;
-- TRUNCATE TABLE materials CASCADE;
-- TRUNCATE TABLE executives CASCADE;
-- TRUNCATE TABLE categories CASCADE;
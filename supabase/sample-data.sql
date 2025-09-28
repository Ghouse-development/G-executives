-- サンプルデータ投入用SQL

-- カテゴリのサンプルデータ
INSERT INTO categories (name, description) VALUES
  ('営業基礎', '営業活動の基本知識とスキル'),
  ('マーケティング', 'マーケティング戦略と実践'),
  ('リーダーシップ', 'リーダーシップとチームマネジメント'),
  ('財務管理', '財務諸表の理解と経営分析'),
  ('プロジェクト管理', 'プロジェクトマネジメントの手法');

-- 幹部のサンプルデータ
INSERT INTO executives (name, email, position, department) VALUES
  ('田中 太郎', 'tanaka@ghouse.example.com', '営業部長', '営業部'),
  ('鈴木 花子', 'suzuki@ghouse.example.com', 'マーケティング部長', 'マーケティング部'),
  ('佐藤 次郎', 'sato@ghouse.example.com', '財務部長', '財務部'),
  ('高橋 美咲', 'takahashi@ghouse.example.com', '人事部長', '人事部'),
  ('山田 健一', 'yamada@ghouse.example.com', '技術部長', '技術部');

-- 問題のサンプルデータ（カテゴリIDは実際のIDに置き換えてください）
-- 営業基礎の問題
INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, '顧客のニーズを把握するための最も重要な手法は何ですか？', 'ヒアリング', 'easy'
FROM categories WHERE name = '営業基礎';

INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'B2B営業とB2C営業の主な違いは何ですか？', '意思決定プロセスの複雑さと購買サイクルの長さ', 'medium'
FROM categories WHERE name = '営業基礎';

INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'クロージングのタイミングを見極める重要なサインを3つ挙げてください', '価格の質問、納期の確認、決裁者の同席', 'hard'
FROM categories WHERE name = '営業基礎';

-- マーケティングの問題
INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, '4Pとは何の略ですか？', 'Product, Price, Place, Promotion', 'easy'
FROM categories WHERE name = 'マーケティング';

INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'STP分析のSTPは何を表しますか？', 'Segmentation, Targeting, Positioning', 'medium'
FROM categories WHERE name = 'マーケティング';

INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'カスタマージャーニーマップの主な目的は何ですか？', '顧客の購買プロセス全体を可視化し、タッチポイントごとの改善機会を特定すること', 'hard'
FROM categories WHERE name = 'マーケティング';

-- リーダーシップの問題
INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'チームビルディングの基本的な5段階を順番に答えてください', '形成期、混乱期、統一期、機能期、散会期', 'medium'
FROM categories WHERE name = 'リーダーシップ';

INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'サーバントリーダーシップとは何ですか？', '部下に奉仕し、支援することで組織を導くリーダーシップスタイル', 'easy'
FROM categories WHERE name = 'リーダーシップ';

INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'コンフリクトマネジメントの5つのアプローチを挙げてください', '競合、協調、妥協、回避、順応', 'hard'
FROM categories WHERE name = 'リーダーシップ';

-- 財務管理の問題
INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'ROEとは何の略ですか？', 'Return On Equity（自己資本利益率）', 'easy'
FROM categories WHERE name = '財務管理';

INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, '流動比率の計算式は？', '流動資産÷流動負債×100', 'medium'
FROM categories WHERE name = '財務管理';

INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'キャッシュフロー計算書の3つの区分を答えてください', '営業活動、投資活動、財務活動', 'medium'
FROM categories WHERE name = '財務管理';

-- プロジェクト管理の問題
INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'PMBOKの5つのプロセスグループを答えてください', '立ち上げ、計画、実行、監視・管理、終結', 'hard'
FROM categories WHERE name = 'プロジェクト管理';

INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'WBSとは何の略ですか？', 'Work Breakdown Structure（作業分解構造）', 'easy'
FROM categories WHERE name = 'プロジェクト管理';

INSERT INTO questions (category_id, question, answer, difficulty)
SELECT id, 'クリティカルパスとは何ですか？', 'プロジェクトの最短完了時間を決定する一連の作業経路', 'medium'
FROM categories WHERE name = 'プロジェクト管理';
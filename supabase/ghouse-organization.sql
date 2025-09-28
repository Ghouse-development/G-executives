-- G-house組織データの登録
-- 既存データをクリア
DELETE FROM executives;

-- 全社員データ登録 (name, department, position の順)
-- 社長
INSERT INTO executives (name, department, position) VALUES
  ('趙晃啓', '経営', '社長');

-- 営業部
INSERT INTO executives (name, department, position) VALUES
  ('奥村礼人', '営業部', '部長'),
  ('吉田祐', '営業部', 'メンバー'),
  ('杉村悠斗', '営業部', 'メンバー'),
  ('德田耕明', '営業部', 'メンバー');

-- 注文住宅事業部
INSERT INTO executives (name, department, position) VALUES
  ('村上由貴子', '注文住宅事業部', '部長'),
  ('佐古祐太', '注文住宅事業部', 'メンバー');

-- 設計部
INSERT INTO executives (name, department, position) VALUES
  ('箕浦三四郎', '設計部', '部長'),
  ('林恭生', '設計部', 'メンバー');

-- 工事部
INSERT INTO executives (name, department, position) VALUES
  ('藤田誠一', '工事部', '部長'),
  ('清家雅章', '工事部', 'メンバー'),
  ('湯山豊和', '工事部', 'メンバー'),
  ('藤本成規', '工事部', 'メンバー'),
  ('趙祐規', '工事部', 'メンバー');

-- 不動産事業部
INSERT INTO executives (name, department, position) VALUES
  ('清水崇志', '不動産事業部', '部長'),
  ('藤村倫', '不動産事業部', 'メンバー'),
  ('𠮷田萌', '不動産事業部', 'メンバー'),
  ('川鍋錠二', '不動産事業部', 'メンバー'),
  ('中村勇斗', '不動産事業部', 'メンバー');

-- 外構事業部
INSERT INTO executives (name, department, position) VALUES
  ('橋尾彰範', '外構事業部', '部長'),
  ('岸田陽一朗', '外構事業部', 'メンバー'),
  ('中畠大樹', '外構事業部', 'メンバー'),
  ('藤本龍志', '外構事業部', 'メンバー');

-- CS推進部
INSERT INTO executives (name, department, position) VALUES
  ('奥和俊', 'CS推進部', '部長');

-- 広告・マーケティング部
INSERT INTO executives (name, department, position) VALUES
  ('池本公宣', '広告・マーケティング部', '部長'),
  ('林明日香', '広告・マーケティング部', 'メンバー');

-- 商品企画部
INSERT INTO executives (name, department, position) VALUES
  ('西野秀樹', '商品企画部', '部長');

-- BtoB事業部
INSERT INTO executives (name, department, position) VALUES
  ('森山敬史', 'BtoB事業部', '部長'),
  ('森田和也', 'BtoB事業部', 'メンバー');

-- 経営管理部
INSERT INTO executives (name, department, position) VALUES
  ('西村武弘', '経営管理部', '部長'),
  ('藤原里帆', '経営管理部', 'メンバー');

-- 財務戦略部
INSERT INTO executives (name, department, position) VALUES
  ('丹保真人', '財務戦略部', '部長');
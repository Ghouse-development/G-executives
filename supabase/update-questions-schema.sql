-- questionsテーブルに解説と難易度フィールドを追加
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS explanation TEXT,
ADD COLUMN IF NOT EXISTS difficulty VARCHAR(20) DEFAULT 'medium';

-- 既存の問題を中級に設定
UPDATE questions SET difficulty = 'medium' WHERE difficulty IS NULL;
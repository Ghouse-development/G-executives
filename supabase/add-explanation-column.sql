-- questionsテーブルにexplanationカラムを追加
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS explanation TEXT;
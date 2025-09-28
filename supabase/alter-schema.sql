-- emailフィールドをNULL許可に変更
ALTER TABLE executives ALTER COLUMN email DROP NOT NULL;
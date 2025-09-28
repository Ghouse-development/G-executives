import { createClient } from '@supabase/supabase-js'

// 一時的な解決策：環境変数が読み込まれない問題を回避
// 本番環境では環境変数を使用してください
const supabaseUrl = 'https://khxhkwdjqnafqouvxnup.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeGhrd2RqcW5hZnFvdXZ4bnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMTcwMzAsImV4cCI6MjA3NDU5MzAzMH0.Wyo7YmF0afag4mqlu_ShVK0rDBxoSgqLSv2PCks5kIQ'

console.log('Using hardcoded Supabase configuration')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
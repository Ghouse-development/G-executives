import { createClient } from '@supabase/supabase-js'

// 環境変数を取得
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// デバッグ用ログ（開発環境のみ）
if (import.meta.env.DEV) {
  console.log('Supabase configured:', {
    url: supabaseUrl ? '✓' : '✗ (using fallback)',
    key: supabaseAnonKey ? '✓' : '✗ (using fallback)'
  })
}

// 環境変数が設定されていない場合は、一時的にハードコードされた値を使用
// ⚠️ 注意: これは開発用の一時的な解決策です
const FALLBACK_URL = 'https://khxhkwdjqnafqouvxnup.supabase.co'
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeGhrd2RqcW5hZnFvdXZ4bnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMTcwMzAsImV4cCI6MjA3NDU5MzAzMH0.Wyo7YmF0afag4mqlu_ShVK0rDBxoSgqLSv2PCks5kIQ'

const finalUrl = supabaseUrl || FALLBACK_URL
const finalKey = supabaseAnonKey || FALLBACK_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Using fallback Supabase configuration. Please set environment variables in production.')
}

export const supabase = createClient(finalUrl, finalKey)
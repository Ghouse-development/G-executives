import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Executive } from '../types'

interface Question {
  id: string
  category_id: string
  question: string
  answer: string
  explanation?: string
  category?: {
    name: string
  }
}

interface SimpleTestPageProps {
  preSelectedExecutive: Executive
  onBack: () => void
}

const SimpleTestPage = ({ preSelectedExecutive, onBack }: SimpleTestPageProps) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    // カテゴリに基づいてランダムに10問取得
    const { data, error } = await supabase
      .from('questions')
      .select(`
        *,
        category:categories (
          name
        )
      `)
      .limit(10)

    if (!error && data) {
      // ランダムに並び替え
      const shuffled = data.sort(() => Math.random() - 0.5)
      setQuestions(shuffled)
      if (shuffled.length > 0) {
        setCurrentQuestion(shuffled[0])
      }
    }
  }

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return

    // 簡単な採点（実際の実装では、より高度な採点ロジックが必要）
    const isCorrect = userAnswer.toLowerCase().includes(currentQuestion?.answer.substring(0, 20).toLowerCase() || '')

    if (isCorrect) {
      setScore(score + 1)
    }

    setAnsweredQuestions(answeredQuestions + 1)
    setShowAnswer(true)
  }

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1

    if (nextIndex >= questions.length || nextIndex >= 10) {
      setTestCompleted(true)
    } else {
      setCurrentQuestionIndex(nextIndex)
      setCurrentQuestion(questions[nextIndex])
      setUserAnswer('')
      setShowAnswer(false)
    }
  }

  if (testCompleted) {
    const percentage = Math.round((score / answeredQuestions) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              テスト完了
            </h1>

            <div className="mb-8">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-indigo-600 mb-2">
                  {percentage}%
                </div>
                <div className="text-xl text-gray-600 dark:text-gray-400">
                  正答率（{score}/{answeredQuestions}問正解）
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                <div className="mb-4">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">テスト対象者</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {preSelectedExecutive.name} - {preSelectedExecutive.department} {preSelectedExecutive.position}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">評価</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {percentage >= 80 ? '優秀' : percentage >= 60 ? '良好' : percentage >= 40 ? '要改善' : '要学習'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setTestCompleted(false)
                  setCurrentQuestionIndex(0)
                  setScore(0)
                  setAnsweredQuestions(0)
                  setUserAnswer('')
                  setShowAnswer(false)
                  fetchQuestions()
                }}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 font-semibold"
              >
                もう一度テストを受ける
              </button>
              <button
                onClick={onBack}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
              >
                メンバー選択に戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                問題 {currentQuestionIndex + 1} / {Math.min(10, questions.length)}
              </h2>
              <button
                onClick={onBack}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">テスト対象者</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {preSelectedExecutive.name} - {preSelectedExecutive.department}
              </div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / Math.min(10, questions.length)) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            {currentQuestion?.category && (
              <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">
                {currentQuestion.category.name}
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              問題
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentQuestion?.question}
            </p>
          </div>

          {!showAnswer ? (
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  回答
                </label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="回答を入力してください..."
                />
              </div>

              <button
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim()}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
              >
                回答する
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6 space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">あなたの回答</h4>
                  <p className="text-blue-800 dark:text-blue-200">{userAnswer}</p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">模範解答</h4>
                  <p className="text-green-800 dark:text-green-200">{currentQuestion?.answer}</p>
                </div>

                {currentQuestion?.explanation && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                    <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">解説</h4>
                    <p className="text-yellow-800 dark:text-yellow-200">{currentQuestion.explanation}</p>
                  </div>
                )}
              </div>

              <button
                onClick={nextQuestion}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 font-semibold"
              >
                {currentQuestionIndex + 1 >= Math.min(10, questions.length) ? 'テストを終了' : '次の問題へ'}
              </button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>現在のスコア: {score} / {answeredQuestions}</span>
              <span>正答率: {answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleTestPage
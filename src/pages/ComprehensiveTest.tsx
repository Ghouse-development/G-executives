import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface TestQuestion {
  id: string
  category_id: string
  question: string
  answer: string
  explanation: string
  difficulty: string
  category?: {
    name: string
  }
}

interface TestResult {
  questionId: string
  question: string
  userAnswer: string
  correctAnswer: string
  explanation: string
  isCorrect: boolean
  category: string
}

const ComprehensiveTest = () => {
  const [questions, setQuestions] = useState<TestQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<TestQuestion | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [testMode, setTestMode] = useState<'random' | 'sequential'>('random')
  const [testStarted, setTestStarted] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [questionOrder, setQuestionOrder] = useState<number[]>([])
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from('questions')
      .select(`
        *,
        category:categories (
          name
        )
      `)
      .eq('difficulty', 'hard')
      .limit(100)

    if (!error && data) {
      setQuestions(data)
    }
  }

  const startTest = () => {
    if (questions.length === 0) return

    const order = testMode === 'random'
      ? [...Array(questions.length)].map((_, i) => i).sort(() => Math.random() - 0.5)
      : [...Array(questions.length)].map((_, i) => i)

    setQuestionOrder(order)
    setCurrentQuestionIndex(0)
    setCurrentQuestion(questions[order[0]])
    setTestStarted(true)
    setTestResults([])
    setAnsweredQuestions(0)
    setCorrectAnswers(0)
    setShowResults(false)
  }

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !userAnswer.trim()) return

    const isCorrect = checkAnswer(userAnswer, currentQuestion.answer)

    const result: TestResult = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      userAnswer: userAnswer.trim(),
      correctAnswer: currentQuestion.answer,
      explanation: currentQuestion.explanation || '',
      isCorrect,
      category: currentQuestion.category?.name || ''
    }

    setTestResults([...testResults, result])
    setAnsweredQuestions(answeredQuestions + 1)
    if (isCorrect) setCorrectAnswers(correctAnswers + 1)
    setShowAnswer(true)
  }

  const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
    // キーワードベースの採点（実際の実装では、より高度な採点ロジックが必要）
    const userKeywords = extractKeywords(userAnswer.toLowerCase())
    const correctKeywords = extractKeywords(correctAnswer.toLowerCase())

    const matchCount = userKeywords.filter(keyword =>
      correctKeywords.includes(keyword)
    ).length

    const matchRate = matchCount / Math.max(correctKeywords.length, 1)
    return matchRate >= 0.6 // 60%以上のキーワード一致で正解
  }

  const extractKeywords = (text: string): string[] => {
    // 簡単なキーワード抽出（実際の実装では形態素解析が必要）
    const stopWords = ['の', 'を', 'に', 'は', 'が', 'で', 'と', 'から', 'まで', 'や', 'など']
    return text.split(/[\s、。！？]/)
      .filter(word => word.length > 1 && !stopWords.includes(word))
  }

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1

    if (nextIndex >= questionOrder.length || nextIndex >= 100) {
      // テスト終了
      setShowResults(true)
      setTestStarted(false)
    } else {
      setCurrentQuestionIndex(nextIndex)
      setCurrentQuestion(questions[questionOrder[nextIndex]])
      setUserAnswer('')
      setShowAnswer(false)
    }
  }

  const skipQuestion = () => {
    const result: TestResult = {
      questionId: currentQuestion!.id,
      question: currentQuestion!.question,
      userAnswer: '（スキップ）',
      correctAnswer: currentQuestion!.answer,
      explanation: currentQuestion!.explanation || '',
      isCorrect: false,
      category: currentQuestion!.category?.name || ''
    }

    setTestResults([...testResults, result])
    setAnsweredQuestions(answeredQuestions + 1)
    nextQuestion()
  }

  const resetTest = () => {
    setTestStarted(false)
    setCurrentQuestionIndex(0)
    setCurrentQuestion(null)
    setUserAnswer('')
    setShowAnswer(false)
    setTestResults([])
    setShowResults(false)
    setAnsweredQuestions(0)
    setCorrectAnswers(0)
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '問題解決の思考法': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'マネジメント強化': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      '３S主義': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      'Weekly Management': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      '観察・分析・判断': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
      '行動の優先順位': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
      '問題解決の特効薬': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
  }

  if (!testStarted && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              100問総合テスト
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Gハウス幹部マネジメント研修の総合理解度を測る100問のテストです。
            </p>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                出題モードを選択
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTestMode('random')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    testMode === 'random'
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-2xl mb-2">🔀</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">ランダム出題</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    問題をランダムな順番で出題
                  </div>
                </button>
                <button
                  onClick={() => setTestMode('sequential')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    testMode === 'sequential'
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-2xl mb-2">📝</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">順番出題</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    カテゴリ順に問題を出題
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">注意事項</h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                    <ul className="list-disc list-inside space-y-1">
                      <li>各問題には模範解答と解説が用意されています</li>
                      <li>回答後に正解と解説を確認できます</li>
                      <li>途中でスキップすることも可能です</li>
                      <li>最後に総合結果が表示されます</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={startTest}
              disabled={questions.length === 0}
              className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg transition-colors"
            >
              {questions.length === 0 ? '問題を読み込み中...' : 'テストを開始'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const scorePercentage = Math.round((correctAnswers / answeredQuestions) * 100)
    const categoryScores = testResults.reduce((acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = { correct: 0, total: 0 }
      }
      acc[result.category].total++
      if (result.isCorrect) acc[result.category].correct++
      return acc
    }, {} as { [key: string]: { correct: number; total: number } })

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              テスト結果
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">{scorePercentage}%</div>
                <div className="text-lg">総合正答率</div>
                <div className="text-sm mt-2 opacity-90">
                  {correctAnswers}/{answeredQuestions} 問正解
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">{answeredQuestions}</div>
                <div className="text-lg">回答問題数</div>
                <div className="text-sm mt-2 opacity-90">
                  100問中
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">
                  {scorePercentage >= 80 ? 'A' : scorePercentage >= 60 ? 'B' : scorePercentage >= 40 ? 'C' : 'D'}
                </div>
                <div className="text-lg">評価</div>
                <div className="text-sm mt-2 opacity-90">
                  {scorePercentage >= 80 ? '優秀' : scorePercentage >= 60 ? '良好' : scorePercentage >= 40 ? '要改善' : '要学習'}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                カテゴリ別成績
              </h2>
              <div className="space-y-3">
                {Object.entries(categoryScores).map(([category, scores]) => {
                  const percentage = Math.round((scores.correct / scores.total) * 100)
                  return (
                    <div key={category} className="flex items-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mr-3 ${getCategoryColor(category)}`}>
                        {category}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {scores.correct}/{scores.total} 問正解
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                回答詳細
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {testResults.map((result, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        問題 {index + 1}
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        result.isCorrect
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {result.isCorrect ? '正解' : '不正解'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {result.question}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-600 dark:text-gray-400">あなたの回答：</span>
                        <p className="mt-1 text-gray-900 dark:text-gray-100">{result.userAnswer}</p>
                      </div>
                      {!result.isCorrect && (
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">正解：</span>
                          <p className="mt-1 text-gray-900 dark:text-gray-100">{result.correctAnswer}</p>
                        </div>
                      )}
                      {result.explanation && (
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">解説：</span>
                          <p className="mt-1 text-gray-700 dark:text-gray-300">{result.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetTest}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
              >
                もう一度テストを受ける
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold transition-colors"
              >
                ダッシュボードに戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                問題 {currentQuestionIndex + 1} / 100
              </h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                currentQuestion?.category ? getCategoryColor(currentQuestion.category.name) : ''
              }`}>
                {currentQuestion?.category?.name}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / 100) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
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
                  あなたの回答
                </label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="回答を入力してください..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim()}
                  className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
                >
                  回答する
                </button>
                <button
                  onClick={skipQuestion}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold transition-colors"
                >
                  スキップ
                </button>
              </div>
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
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
              >
                {currentQuestionIndex + 1 >= 100 ? 'テストを終了' : '次の問題へ'}
              </button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>正解数: {correctAnswers} / {answeredQuestions}</span>
              <span>正答率: {answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComprehensiveTest
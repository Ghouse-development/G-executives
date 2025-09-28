import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Question, Executive, Category, TestSession } from '../types'

interface TestPageProps {
  preSelectedExecutive?: Executive;
  onBack?: () => void;
}

const TestPage = ({ preSelectedExecutive }: TestPageProps = {}) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [executives, setExecutives] = useState<Executive[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedExecutive, setSelectedExecutive] = useState<string>(preSelectedExecutive?.id || '')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [testMode, setTestMode] = useState<'own' | 'other' | ''>('')
  const [userAnswer, setUserAnswer] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [session, setSession] = useState<TestSession | null>(null)
  const [score, setScore] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)

  useEffect(() => {
    fetchExecutives()
    fetchCategories()
    if (preSelectedExecutive) {
      setSelectedExecutive(preSelectedExecutive.id)
      setSelectedDepartment(preSelectedExecutive.department)
    }
  }, [preSelectedExecutive])

  useEffect(() => {
    if (selectedDepartment && testMode) {
      filterCategories()
    }
  }, [selectedDepartment, testMode])

  const filterCategories = async () => {
    const departmentToCategory: { [key: string]: string } = {
      '営業部': '営業戦略',
      'マーケティング部': 'マーケティング戦略',
      '財務部': '財務管理',
      '人事部': '人事管理',
      '技術部': '技術戦略'
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (!error && data) {
      if (testMode === 'own') {
        // 自部門のカテゴリのみ
        const ownCategory = departmentToCategory[selectedDepartment]
        setCategories(data.filter(cat => cat.name === ownCategory))
      } else if (testMode === 'other') {
        // 他部門のカテゴリのみ
        const ownCategory = departmentToCategory[selectedDepartment]
        setCategories(data.filter(cat => cat.name !== ownCategory && departmentToCategory[Object.keys(departmentToCategory).find(dept => departmentToCategory[dept] === cat.name) || '']))
      }
    }
  }

  const fetchExecutives = async () => {
    const { data, error } = await supabase
      .from('executives')
      .select('*')
      .order('name')

    if (!error && data) {
      setExecutives(data)
    }
  }

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (!error && data) {
      setCategories(data)
    }
  }

  const startTest = async () => {
    if (!selectedExecutive || !selectedCategory) {
      alert('幹部とカテゴリを選択してください')
      return
    }

    const { data: questionsData, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .eq('category_id', selectedCategory)

    if (!questionsError && questionsData && questionsData.length > 0) {
      setQuestions(questionsData)

      const { data: sessionData, error: sessionError } = await supabase
        .from('test_sessions')
        .insert([{
          executive_id: selectedExecutive,
          started_at: new Date().toISOString(),
          total_questions: 10
        }])
        .select()
        .single()

      if (!sessionError && sessionData) {
        setSession(sessionData)
        setScore(0)
        setQuestionCount(0)
        getNextQuestion(questionsData)
      }
    } else {
      alert('選択したカテゴリに問題がありません')
    }
  }

  const getNextQuestion = (availableQuestions?: Question[]) => {
    const questionPool = availableQuestions || questions
    if (questionPool.length === 0) return

    const randomIndex = Math.floor(Math.random() * questionPool.length)
    setCurrentQuestion(questionPool[randomIndex])
    setUserAnswer('')
    setShowAnswer(false)
    setIsCorrect(null)
  }

  const checkAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim() || !session) return

    const correct = userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim()
    setIsCorrect(correct)
    setShowAnswer(true)

    if (correct) {
      setScore(score + 1)
    }

    await supabase
      .from('test_answers')
      .insert([{
        session_id: session.id,
        question_id: currentQuestion.id,
        user_answer: userAnswer,
        is_correct: correct,
        answered_at: new Date().toISOString()
      }])

    setQuestionCount(questionCount + 1)

    await supabase
      .from('learning_progress')
      .upsert({
        executive_id: selectedExecutive,
        category_id: selectedCategory,
        total_questions_answered: questionCount + 1,
        correct_answers: correct ? score + 1 : score,
        last_activity: new Date().toISOString(),
        mastery_level: ((correct ? score + 1 : score) / (questionCount + 1)) * 100
      }, {
        onConflict: 'executive_id,category_id'
      })
  }

  const nextQuestion = () => {
    if (questionCount >= 10) {
      endTest()
    } else {
      getNextQuestion()
    }
  }

  const endTest = async () => {
    if (session) {
      await supabase
        .from('test_sessions')
        .update({
          completed_at: new Date().toISOString(),
          score: (score / questionCount) * 100
        })
        .eq('id', session.id)
    }

    alert(`テスト終了！\nスコア: ${score}/${questionCount} (${Math.round((score / questionCount) * 100)}%)`)
    setSession(null)
    setCurrentQuestion(null)
    setQuestions([])
    setScore(0)
    setQuestionCount(0)
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">学習テスト</h1>

        {!session ? (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                幹部を選択
              </label>
              <select
                value={selectedExecutive}
                onChange={(e) => {
                  setSelectedExecutive(e.target.value)
                  const exec = executives.find(ex => ex.id === e.target.value)
                  if (exec) {
                    setSelectedDepartment(exec.position.split('長')[0] + '部')
                  }
                }}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              >
                <option value="">選択してください</option>
                {executives.map((exec) => (
                  <option key={exec.id} value={exec.id}>
                    {exec.name} - {exec.position}
                  </option>
                ))}
              </select>
            </div>

            {selectedDepartment && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  テストモード
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTestMode('own')}
                    className={`px-4 py-2 rounded-md border ${testMode === 'own' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    自部門知識
                  </button>
                  <button
                    onClick={() => setTestMode('other')}
                    className={`px-4 py-2 rounded-md border ${testMode === 'other' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    他部門理解度
                  </button>
                </div>
                {testMode === 'other' && (
                  <p className="mt-2 text-xs text-gray-500">
                    他部門の知識をテストして、クロススキル評価を行います。
                  </p>
                )}
              </div>
            )}

            {testMode && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カテゴリを選択
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                >
                  <option value="">選択してください</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={startTest}
              disabled={!selectedExecutive || !selectedCategory || !testMode}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none ${
                selectedExecutive && selectedCategory && testMode
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              テスト開始
            </button>
          </div>
        ) : currentQuestion ? (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>問題 {questionCount + 1}/10</span>
                <span>スコア: {score}/{questionCount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${((questionCount + 1) / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {currentQuestion.question}
              </h2>

              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={showAnswer}
                rows={4}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                placeholder="答えを入力してください"
              />
            </div>

            {showAnswer && (
              <div className={`mb-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? '正解！' : '不正解'}
                </p>
                <p className="mt-2 text-gray-700">
                  <span className="font-medium">正解: </span>
                  {currentQuestion.answer}
                </p>
              </div>
            )}

            <div className="flex space-x-4">
              {!showAnswer ? (
                <button
                  onClick={checkAnswer}
                  className="flex-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
                >
                  答えを確認
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="flex-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
                >
                  {questionCount >= 10 ? 'テスト終了' : '次の問題'}
                </button>
              )}
              <button
                onClick={endTest}
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                中断
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-500">テストの準備ができていません</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TestPage
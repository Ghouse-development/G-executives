import { useNavigate } from 'react-router-dom'

const TestTypeSelection = () => {
  const navigate = useNavigate()

  const testTypes = [
    {
      id: 'chiyoda-management',
      title: '千代田さんマネジメント研修',
      description: 'Gハウス幹部マネジメント研修の理解度を測る10問のテスト',
      icon: '📚',
      available: true
    },
    // 将来的に追加するテスト
    {
      id: 'sales-training',
      title: '営業研修（準備中）',
      description: '営業スキル向上のためのテスト',
      icon: '💼',
      available: false
    },
    {
      id: 'leadership-training',
      title: 'リーダーシップ研修（準備中）',
      description: 'リーダーシップスキルを評価するテスト',
      icon: '👥',
      available: false
    }
  ]

  const handleTestSelection = (testId: string) => {
    if (testId === 'chiyoda-management') {
      // 千代田さんマネジメント研修を選択した場合、メンバー選択画面へ
      navigate('/test-selection')
    }
    // 他のテストタイプは将来実装
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            テストを選択
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            受けたいテストを選択してください
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testTypes.map(test => (
            <button
              key={test.id}
              onClick={() => test.available && handleTestSelection(test.id)}
              disabled={!test.available}
              className={`
                relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-200
                ${test.available
                  ? 'bg-white dark:bg-gray-900 hover:shadow-lg hover:scale-[1.02] cursor-pointer'
                  : 'bg-gray-100 dark:bg-gray-900 opacity-50 cursor-not-allowed'
                }
              `}
            >
              {!test.available && (
                <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  準備中
                </div>
              )}

              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl">
                {test.icon}
              </div>

              <h3 className={`text-xl font-semibold mb-2 ${
                test.available
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-gray-600'
              }`}>
                {test.title}
              </h3>

              <p className={`text-sm leading-relaxed ${
                test.available
                  ? 'text-gray-600 dark:text-gray-400'
                  : 'text-gray-400 dark:text-gray-600'
              }`}>
                {test.description}
              </p>

              {test.available && (
                <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400">
                  <span className="text-sm font-medium">テストを開始</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-12 bg-gray-100 dark:bg-gray-900 rounded-2xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                現在利用可能なテスト
              </h3>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>現在「千代田さんマネジメント研修」のみ利用可能です。</p>
                <p className="mt-1">他のテストは順次追加予定です。</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            ← ダッシュボードに戻る
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestTypeSelection
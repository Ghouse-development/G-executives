import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface DepartmentScore {
  department: string
  score: number
  testsTaken: number
}

interface ExecutiveScore {
  name: string
  department: string
  scores: {
    [key: string]: number
  }
  overallScore: number
  crossSkillScore: number
}


const Dashboard = () => {
  const [executiveScores, setExecutiveScores] = useState<ExecutiveScore[]>([])
  const [departmentScores, setDepartmentScores] = useState<DepartmentScore[]>([])
  const [totalTests, setTotalTests] = useState(0)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    // テストセッション数を取得
    const { count } = await supabase
      .from('test_sessions')
      .select('*', { count: 'exact', head: true })

    setTotalTests(count || 0)

    // 実際のデータはSupabaseから取得する（現在は空の配列）
    setDepartmentScores([])
    setExecutiveScores([])
  }

  const handleStartTest = () => {
    window.location.href = '/test-type'
  }


  return (
    <div className="px-4 py-6 sm:px-0">
      {/* テスト開始ボタン - Apple Style */}
      <div className="mb-12">
        <button
          onClick={handleStartTest}
          className="w-full bg-black dark:bg-white text-white dark:text-black py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200"
        >
          テストを受ける
        </button>
        <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400">
          部門別の知識をチェックして、スキルを向上させましょう
        </p>
      </div>
      {/* 統計カード - Apple Style */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
          <div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <dl>
                  <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">部門数</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">平均理解度</dt>
                  <dd className="text-lg font-medium text-gray-900">-</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">総テスト数</dt>
                  <dd className="text-lg font-medium text-gray-900">{totalTests}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">クロススキル平均</dt>
                  <dd className="text-lg font-medium text-gray-900">-</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 部門別スコア */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">部門別平均スコア</h2>
          <div className="space-y-4">
            {departmentScores.map((dept) => (
              <div key={dept.department}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{dept.department}</span>
                  <span className="text-sm text-gray-500">{dept.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${dept.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">クロススキル評価トップ5</h2>
          <div className="space-y-3">
            {executiveScores
              .sort((a, b) => b.crossSkillScore - a.crossSkillScore)
              .slice(0, 5)
              .map((exec, index) => (
                <div key={exec.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-400 w-8">{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{exec.name}</p>
                      <p className="text-xs text-gray-500">{exec.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-indigo-600">{exec.crossSkillScore}%</p>
                    <p className="text-xs text-gray-500">他部門理解度</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>


    </div>
  )
}

export default Dashboard
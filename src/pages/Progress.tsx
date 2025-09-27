import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Executive, Category, LearningProgress } from '../types'

interface ProgressData extends LearningProgress {
  executive?: Executive
  category?: Category
}

const Progress = () => {
  const [progressData, setProgressData] = useState<ProgressData[]>([])
  const [executives, setExecutives] = useState<Executive[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedExecutive, setSelectedExecutive] = useState<string>('')

  useEffect(() => {
    fetchExecutives()
    fetchCategories()
    fetchProgress()
  }, [])

  useEffect(() => {
    if (selectedExecutive) {
      fetchProgress(selectedExecutive)
    } else {
      fetchProgress()
    }
  }, [selectedExecutive])

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

  const fetchProgress = async (executiveId?: string) => {
    let query = supabase
      .from('learning_progress')
      .select('*')

    if (executiveId) {
      query = query.eq('executive_id', executiveId)
    }

    const { data, error } = await query.order('mastery_level', { ascending: false })

    if (!error && data) {
      const enrichedData = data.map(progress => ({
        ...progress,
        executive: executives.find(e => e.id === progress.executive_id),
        category: categories.find(c => c.id === progress.category_id)
      }))
      setProgressData(enrichedData)
    }
  }

  const getLeaderboard = () => {
    const leaderboard: { [key: string]: { name: string, totalScore: number, questionsAnswered: number } } = {}

    progressData.forEach(progress => {
      const execId = progress.executive_id
      const exec = progress.executive

      if (!leaderboard[execId] && exec) {
        leaderboard[execId] = {
          name: exec.name,
          totalScore: 0,
          questionsAnswered: 0
        }
      }

      if (leaderboard[execId]) {
        leaderboard[execId].totalScore += progress.correct_answers
        leaderboard[execId].questionsAnswered += progress.total_questions_answered
      }
    })

    return Object.values(leaderboard)
      .map(exec => ({
        ...exec,
        accuracy: exec.questionsAnswered > 0 ? (exec.totalScore / exec.questionsAnswered) * 100 : 0
      }))
      .sort((a, b) => b.totalScore - a.totalScore)
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">学習進捗</h1>
          <p className="mt-2 text-sm text-gray-700">幹部の学習状況を確認します</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <select
            value={selectedExecutive}
            onChange={(e) => setSelectedExecutive(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md p-2 border"
          >
            <option value="">全員表示</option>
            {executives.map((exec) => (
              <option key={exec.id} value={exec.id}>
                {exec.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">リーダーボード</h2>
          <div className="space-y-3">
            {getLeaderboard().slice(0, 5).map((exec, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className={`text-2xl font-bold mr-3 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-600' : 'text-gray-600'}`}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{exec.name}</p>
                    <p className="text-sm text-gray-500">
                      正答数: {exec.totalScore} / {exec.questionsAnswered}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">
                    {exec.accuracy.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">正答率</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">カテゴリ別進捗</h2>
          <div className="space-y-3">
            {categories.map(category => {
              const categoryProgress = progressData.filter(p => p.category_id === category.id)
              const totalQuestions = categoryProgress.reduce((sum, p) => sum + p.total_questions_answered, 0)
              const correctAnswers = categoryProgress.reduce((sum, p) => sum + p.correct_answers, 0)
              const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0

              return (
                <div key={category.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-500">{accuracy.toFixed(1)}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${accuracy}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-3 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">詳細データ</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    幹部名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    カテゴリ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    回答数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    正答数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    習熟度
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    最終学習日
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {progressData.map((progress, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {progress.executive?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {progress.category?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {progress.total_questions_answered}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {progress.correct_answers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 mr-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                progress.mastery_level >= 80 ? 'bg-green-600' :
                                progress.mastery_level >= 60 ? 'bg-yellow-600' :
                                'bg-red-600'
                              }`}
                              style={{ width: `${progress.mastery_level}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-900">
                          {progress.mastery_level.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(progress.last_activity).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress
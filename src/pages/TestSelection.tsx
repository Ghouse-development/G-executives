import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Executive } from '../types'
import SimpleTestPage from './SimpleTestPage'

// 部門アイコンマッピング（順番固定）
const departmentIcons: { [key: string]: string } = {
  '経営': '👔',
  '営業部': '💼',
  '設計部': '📐',
  '工事部': '🔨',
  '不動産事業部': '🏢',
  '外構事業部': '🌳',
  'CS推進部': '💝',
  '広告・マーケティング部': '📢',
  '商品企画部': '💡',
  'BtoB事業部': '🤝',
  '経営管理部': '📊',
  '注文住宅事業部': '🏠',
  '財務戦略部': '💰'
}

// 部門の表示順序
const departmentOrder = [
  '経営',
  '営業部',
  '設計部',
  '工事部',
  '不動産事業部',
  '外構事業部',
  'CS推進部',
  '広告・マーケティング部',
  '商品企画部',
  'BtoB事業部',
  '経営管理部',
  '注文住宅事業部',
  '財務戦略部'
]

const TestSelection = () => {
  const [executives, setExecutives] = useState<Executive[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedExecutive, setSelectedExecutive] = useState<Executive | null>(null)
  const [departments, setDepartments] = useState<string[]>([])
  const [testStarted, setTestStarted] = useState(false)

  useEffect(() => {
    fetchExecutives()
  }, [])

  const fetchExecutives = async () => {
    const { data, error } = await supabase
      .from('executives')
      .select('*')
      .order('department')

    if (!error && data) {
      setExecutives(data)
      // 部門のリストを作成（順序付き）
      const uniqueDepts = Array.from(new Set(data.map(e => e.department)))
      const sortedDepts = departmentOrder.filter(dept => uniqueDepts.includes(dept))
      setDepartments(sortedDepts)
    }
  }

  const getDepartmentExecutives = (dept: string) => {
    return executives.filter(e => e.department === dept)
  }

  if (testStarted && selectedExecutive) {
    return <SimpleTestPage preSelectedExecutive={selectedExecutive} onBack={() => {
      setTestStarted(false)
      setSelectedExecutive(null)
      setSelectedDepartment('')
    }} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">学習テストを開始</h1>
          <p className="text-xl text-gray-600">部門を選択してから、メンバーを選んでください</p>
        </div>

        {/* 部門選択 */}
        {!selectedDepartment && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-8"
              >
                <div className="text-6xl mb-4">{departmentIcons[dept] || '📁'}</div>
                <div className="text-lg font-semibold text-gray-800">{dept}</div>
                <div className="text-sm text-gray-500 mt-2">
                  {getDepartmentExecutives(dept).length}名
                </div>
              </button>
            ))}
          </div>
        )}

        {/* メンバー選択 */}
        {selectedDepartment && !selectedExecutive && (
          <div>
            <button
              onClick={() => setSelectedDepartment('')}
              className="mb-6 text-gray-600 hover:text-gray-800 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              部門選択に戻る
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">{departmentIcons[selectedDepartment]}</span>
              {selectedDepartment}のメンバー
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getDepartmentExecutives(selectedDepartment).map(exec => (
                <button
                  key={exec.id}
                  onClick={() => setSelectedExecutive(exec)}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 p-6 text-left"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg mr-4">
                      {exec.name.substring(0, 1)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">{exec.name}</div>
                      <div className="text-sm text-gray-500">{exec.position}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* テスト開始確認 */}
        {selectedExecutive && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md">
              <h3 className="text-2xl font-bold mb-4">テスト開始の確認</h3>
              <div className="mb-6">
                <p className="text-gray-600">以下のメンバーでテストを開始します：</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-lg">{selectedExecutive.name}</p>
                  <p className="text-gray-600">{selectedExecutive.department} / {selectedExecutive.position}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setTestStarted(true)}
                  className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 font-semibold"
                >
                  テストを開始
                </button>
                <button
                  onClick={() => setSelectedExecutive(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 font-semibold"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TestSelection
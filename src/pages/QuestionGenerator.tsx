import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Category, Material, Question } from '../types'

const QuestionGenerator = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [materials, setMaterials] = useState<Material[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedMaterial, setSelectedMaterial] = useState<string>('')
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [customPrompt, setCustomPrompt] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchMaterials()
    }
  }, [selectedCategory])

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (!error && data) {
      setCategories(data)
    }
  }

  const fetchMaterials = async () => {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .eq('category_id', selectedCategory)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setMaterials(data)
    }
  }

  const generateQuestions = async () => {
    if (!selectedCategory) {
      alert('カテゴリを選択してください')
      return
    }

    setIsGenerating(true)

    // 教材の内容に基づいて問題を生成
    // ここでは手動で問題を作成しますが、将来的にはAI APIと連携可能
    const sampleQuestions = [
      {
        question: customPrompt || '選択された教材に関する基本的な質問を入力してください',
        answer: '回答を入力してください',
        difficulty: 'easy',
        category_id: selectedCategory,
        material_id: selectedMaterial || null
      },
      {
        question: '選択された教材の重要なポイントは何ですか？',
        answer: '回答を入力してください',
        difficulty: 'medium',
        category_id: selectedCategory,
        material_id: selectedMaterial || null
      },
      {
        question: '選択された教材から学んだことを実践に活かす方法を説明してください',
        answer: '回答を入力してください',
        difficulty: 'hard',
        category_id: selectedCategory,
        material_id: selectedMaterial || null
      }
    ]

    setGeneratedQuestions(sampleQuestions)
    setIsGenerating(false)
  }

  const saveQuestion = async (questionData: any, index: number) => {
    const { data, error } = await supabase
      .from('questions')
      .insert([questionData])
      .select()

    if (error) {
      alert(`保存エラー: ${error.message}`)
    } else {
      alert('問題を保存しました')
      // 保存済みの問題を削除
      const newQuestions = [...generatedQuestions]
      newQuestions.splice(index, 1)
      setGeneratedQuestions(newQuestions)
    }
  }

  const updateQuestion = (index: number, field: string, value: string) => {
    const newQuestions = [...generatedQuestions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    setGeneratedQuestions(newQuestions)
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">テスト問題生成</h1>
          <p className="mt-2 text-sm text-gray-700">教材から自動的にテスト問題を生成します</p>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カテゴリ選択
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
            >
              <option value="">カテゴリを選択</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              教材選択（オプション）
            </label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              disabled={!selectedCategory}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
            >
              <option value="">全ての教材から生成</option>
              {materials.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カスタムプロンプト（オプション）
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={3}
            placeholder="特定のトピックについて問題を生成したい場合は、ここに詳細を入力してください"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={generateQuestions}
            disabled={isGenerating || !selectedCategory}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
          >
            {isGenerating ? '生成中...' : '問題を生成'}
          </button>
        </div>
      </div>

      {generatedQuestions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">生成された問題</h2>
          <div className="space-y-4">
            {generatedQuestions.map((q, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    問題
                  </label>
                  <textarea
                    value={q.question}
                    onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    答え
                  </label>
                  <textarea
                    value={q.answer}
                    onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    難易度
                  </label>
                  <select
                    value={q.difficulty}
                    onChange={(e) => updateQuestion(index, 'difficulty', e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  >
                    <option value="easy">簡単</option>
                    <option value="medium">普通</option>
                    <option value="hard">難しい</option>
                  </select>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => saveQuestion(q, index)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => {
                      const newQuestions = [...generatedQuestions]
                      newQuestions.splice(index, 1)
                      setGeneratedQuestions(newQuestions)
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionGenerator
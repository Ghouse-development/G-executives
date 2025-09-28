import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Category, Material } from '../types'

interface GeneratedQuestion {
  question: string
  answer: string
  difficulty: 'easy' | 'medium' | 'hard'
  category_id: string
  material_id: string
}

const AutoQuestionGenerator = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [materials, setMaterials] = useState<Material[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [questionCount, setQuestionCount] = useState(10)
  const [apiKey, setApiKey] = useState('')
  const [useOpenAI, setUseOpenAI] = useState(false)

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

  const generateQuestionsFromContent = async (materialTitle: string, fileType: string) => {
    // 教材のタイトルとファイルタイプに基づいて問題を生成
    const baseQuestions = [
      {
        template: '「{title}」の主要な目的は何ですか？',
        answerTemplate: '主要な目的を簡潔に説明してください'
      },
      {
        template: '「{title}」から学べる最も重要な3つのポイントを挙げてください',
        answerTemplate: '1. 2. 3. の形式で回答してください'
      },
      {
        template: '「{title}」の内容を実務でどのように活用できますか？',
        answerTemplate: '具体的な活用方法を説明してください'
      },
      {
        template: '「{title}」で説明されている主要な概念を定義してください',
        answerTemplate: '簡潔に定義を述べてください'
      },
      {
        template: '「{title}」における重要な用語を3つ挙げ、それぞれ説明してください',
        answerTemplate: '用語とその説明を記載してください'
      }
    ]

    const questions: GeneratedQuestion[] = []
    const selectedQuestions = baseQuestions.slice(0, Math.min(questionCount, baseQuestions.length))

    selectedQuestions.forEach((q, index) => {
      questions.push({
        question: q.template.replace('{title}', materialTitle),
        answer: q.answerTemplate,
        difficulty: index < 2 ? 'easy' : index < 4 ? 'medium' : 'hard',
        category_id: selectedCategory,
        material_id: selectedMaterials[0] || ''
      })
    })

    return questions
  }

  const generateQuestionsWithOpenAI = async (materialTitle: string) => {
    if (!apiKey) {
      alert('OpenAI APIキーを入力してください')
      return []
    }

    try {
      const prompt = `
以下の教材タイトルに基づいて、1問1答形式のテスト問題を${questionCount}個生成してください。
教材タイトル: ${materialTitle}

各問題は以下の形式でJSONとして出力してください：
[
  {
    "question": "質問文",
    "answer": "回答",
    "difficulty": "easy/medium/hard"
  }
]

問題は実践的で、ビジネスに役立つ内容にしてください。
`

      // OpenAI APIの呼び出し（実装例）
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'あなたは教育専門家です。ビジネス教材から効果的な学習問題を作成してください。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      })

      if (!response.ok) {
        throw new Error('OpenAI API エラー')
      }

      const data = await response.json()
      const content = data.choices[0].message.content
      const questions = JSON.parse(content)

      return questions.map((q: any) => ({
        ...q,
        category_id: selectedCategory,
        material_id: selectedMaterials[0] || ''
      }))
    } catch (error) {
      console.error('OpenAI API Error:', error)
      alert('AI生成でエラーが発生しました。手動生成モードを使用します。')
      return []
    }
  }

  const generateQuestions = async () => {
    if (!selectedCategory || selectedMaterials.length === 0) {
      alert('カテゴリと教材を選択してください')
      return
    }

    setIsGenerating(true)

    try {
      // 選択された最初の教材を取得
      const material = materials.find(m => m.id === selectedMaterials[0])
      if (!material) return

      let questions: GeneratedQuestion[] = []

      if (useOpenAI && apiKey) {
        // OpenAI APIを使用
        questions = await generateQuestionsWithOpenAI(material.title)
      }

      if (questions.length === 0) {
        // 手動生成またはOpenAI失敗時
        questions = await generateQuestionsFromContent(material.title, material.file_type)
      }

      setGeneratedQuestions(questions)
    } finally {
      setIsGenerating(false)
    }
  }

  const saveAllQuestions = async () => {
    let successCount = 0
    let errorCount = 0

    for (const question of generatedQuestions) {
      const { error } = await supabase
        .from('questions')
        .insert([question])

      if (error) {
        errorCount++
        console.error('Save error:', error)
      } else {
        successCount++
      }
    }

    if (successCount > 0) {
      alert(`${successCount}個の問題を保存しました${errorCount > 0 ? `（${errorCount}個失敗）` : ''}`)
      setGeneratedQuestions([])
      setSelectedMaterials([])
    }
  }

  const toggleMaterial = (materialId: string) => {
    setSelectedMaterials(prev =>
      prev.includes(materialId)
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">AI問題自動生成</h1>
          <p className="mt-2 text-sm text-gray-700">
            アップロードした教材から自動的にテスト問題を生成します
          </p>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カテゴリ選択
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setSelectedMaterials([])
              }}
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

          {selectedCategory && materials.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                教材選択（問題生成の対象）
              </label>
              <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
                {materials.map((material) => (
                  <label key={material.id} className="flex items-center mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material.id)}
                      onChange={() => toggleMaterial(material.id)}
                      className="mr-2"
                    />
                    <span className="text-sm">{material.title}</span>
                    <span className="ml-2 text-xs text-gray-500">({material.file_type.toUpperCase()})</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              生成する問題数
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-32 sm:text-sm border-gray-300 rounded-md p-2 border"
            />
          </div>

          <div className="border-t pt-4">
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={useOpenAI}
                onChange={(e) => setUseOpenAI(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium">OpenAI GPTを使用する（より高度な問題生成）</span>
            </label>
            {useOpenAI && (
              <input
                type="password"
                placeholder="OpenAI APIキーを入力"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              />
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={generateQuestions}
              disabled={isGenerating || !selectedCategory || selectedMaterials.length === 0}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
            >
              {isGenerating ? '生成中...' : '問題を自動生成'}
            </button>
          </div>
        </div>
      </div>

      {generatedQuestions.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              生成された問題（{generatedQuestions.length}件）
            </h2>
            <button
              onClick={saveAllQuestions}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
            >
              全て保存
            </button>
          </div>

          <div className="space-y-3">
            {generatedQuestions.map((q, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-700">問題 {index + 1}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    q.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {q.difficulty === 'easy' ? '簡単' : q.difficulty === 'medium' ? '普通' : '難しい'}
                  </span>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium mb-1">質問:</p>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...generatedQuestions]
                      updated[index].question = e.target.value
                      setGeneratedQuestions(updated)
                    }}
                    className="w-full p-2 text-sm border rounded"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">答え:</p>
                  <textarea
                    value={q.answer}
                    onChange={(e) => {
                      const updated = [...generatedQuestions]
                      updated[index].answer = e.target.value
                      setGeneratedQuestions(updated)
                    }}
                    rows={2}
                    className="w-full p-2 text-sm border rounded"
                  />
                </div>
                <button
                  onClick={() => {
                    setGeneratedQuestions(generatedQuestions.filter((_, i) => i !== index))
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AutoQuestionGenerator
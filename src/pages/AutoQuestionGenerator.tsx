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

  const generateQuestionsFromContent = async (materialTitle: string, fileType: string, categoryName: string) => {
    // カテゴリ別の専門的な問題テンプレート
    const categorySpecificTemplates: { [key: string]: any[] } = {
      '営業': [
        { q: '「{title}」における顧客アプローチの基本戦略は何ですか？', a: '顧客のニーズを把握し、価値提案を明確にすること' },
        { q: '「{title}」で学んだ営業手法を実践する際の注意点を3つ挙げてください', a: '1. 顧客視点を忘れない 2. 傾聴を重視する 3. フォローアップを欠かさない' },
        { q: '「{title}」のクロージング技術で最も重要なポイントは？', a: 'タイミングの見極めと顧客の購買シグナルの把握' }
      ],
      'マーケティング': [
        { q: '「{title}」で説明されているターゲット設定の方法は？', a: 'セグメンテーション、ターゲティング、ポジショニングのSTP分析を活用' },
        { q: '「{title}」における効果測定の指標を3つ挙げてください', a: 'ROI、コンバージョン率、顧客獲得コスト' },
        { q: '「{title}」のブランド戦略の核心は何ですか？', a: '一貫したメッセージと顧客体験の提供' }
      ],
      'リーダーシップ': [
        { q: '「{title}」で提唱されているリーダーの資質とは？', a: 'ビジョン設定力、コミュニケーション能力、決断力' },
        { q: '「{title}」におけるチームビルディングの要点を説明してください', a: '信頼関係の構築、役割の明確化、目標の共有' },
        { q: '「{title}」のモチベーション管理手法は？', a: '個別対応、成長機会の提供、適切な評価とフィードバック' }
      ],
      '財務': [
        { q: '「{title}」で扱われている財務分析の基本指標は？', a: '収益性、流動性、安全性、成長性の各指標' },
        { q: '「{title}」における投資判断の基準を説明してください', a: 'NPV、IRR、回収期間を総合的に評価' },
        { q: '「{title}」のコスト管理手法の要点は？', a: '変動費と固定費の分析、損益分岐点の把握' }
      ],
      'プロジェクト': [
        { q: '「{title}」で説明されているプロジェクト計画の要素は？', a: 'スコープ、スケジュール、コスト、品質の管理' },
        { q: '「{title}」のリスク管理アプローチを説明してください', a: 'リスクの特定、分析、対応策の策定、モニタリング' },
        { q: '「{title}」における進捗管理の手法は？', a: 'ガントチャート、マイルストーン管理、EVM（アーンドバリュー）' }
      ]
    }

    // 汎用的な問題テンプレート（どのカテゴリでも使える）
    const universalTemplates = [
      { q: '「{title}」の内容を一言で要約すると？', a: '（回答を記入してください）', difficulty: 'easy' },
      { q: '「{title}」から学んだ最も重要な概念は何ですか？', a: '（核心となる概念を説明してください）', difficulty: 'easy' },
      { q: '「{title}」の内容を実務に応用する具体例を挙げてください', a: '（実際の業務での活用例を記載）', difficulty: 'medium' },
      { q: '「{title}」で提示された手法のメリットとデメリットは？', a: 'メリット：\nデメリット：', difficulty: 'medium' },
      { q: '「{title}」の理論を他の分野に応用するとしたら？', a: '（創造的な応用方法を記載）', difficulty: 'hard' },
      { q: '「{title}」の内容について批判的に検討すべき点は？', a: '（改善点や課題を指摘）', difficulty: 'hard' },
      { q: '「{title}」を読んで、あなたの業務改善案を提案してください', a: '（具体的な改善提案を記載）', difficulty: 'hard' },
      { q: '「{title}」の知識を使って新しいビジネスモデルを考案してください', a: '（革新的なアイデアを記載）', difficulty: 'hard' }
    ]

    // ファイルタイプ別の特別な問題
    const fileTypeQuestions: { [key: string]: any[] } = {
      'pdf': [
        { q: '「{title}」文書の構成と主要セクションを説明してください', a: '（文書構成を記載）' }
      ],
      'ppt': [
        { q: '「{title}」プレゼンテーションの主要メッセージは何ですか？', a: '（キーメッセージを記載）' }
      ],
      'pptx': [
        { q: '「{title}」のスライドで最も重要なポイントを3つ挙げてください', a: '1. \n2. \n3. ' }
      ]
    }

    const questions: GeneratedQuestion[] = []

    // カテゴリ固有の問題を追加
    let availableTemplates = []

    // カテゴリ名に基づいて適切なテンプレートを選択
    for (const [key, templates] of Object.entries(categorySpecificTemplates)) {
      if (categoryName.includes(key)) {
        availableTemplates.push(...templates)
        break
      }
    }

    // カテゴリ固有のテンプレートがない場合は汎用テンプレートを使用
    if (availableTemplates.length === 0) {
      availableTemplates = universalTemplates
    } else {
      // カテゴリ固有と汎用を組み合わせる
      availableTemplates.push(...universalTemplates)
    }

    // ファイルタイプ別の問題も追加
    if (fileTypeQuestions[fileType]) {
      availableTemplates.push(...fileTypeQuestions[fileType])
    }

    // ランダムに問題を選択してバリエーションを持たせる
    const shuffled = [...availableTemplates].sort(() => Math.random() - 0.5)
    const selectedTemplates = shuffled.slice(0, Math.min(questionCount, shuffled.length))

    selectedTemplates.forEach((template, index) => {
      const difficulty = template.difficulty ||
        (index < Math.floor(questionCount * 0.3) ? 'easy' :
         index < Math.floor(questionCount * 0.7) ? 'medium' : 'hard')

      questions.push({
        question: template.q.replace('{title}', materialTitle),
        answer: template.a,
        difficulty: difficulty as 'easy' | 'medium' | 'hard',
        category_id: selectedCategory,
        material_id: selectedMaterials[0] || ''
      })
    })

    // 不足分は追加の汎用問題で補う
    while (questions.length < questionCount) {
      const index = questions.length
      const difficulty = index < 3 ? 'easy' : index < 7 ? 'medium' : 'hard'
      questions.push({
        question: `「${materialTitle}」に関する問題${index + 1}：（質問を入力してください）`,
        answer: '（回答を入力してください）',
        difficulty,
        category_id: selectedCategory,
        material_id: selectedMaterials[0] || ''
      })
    }

    return questions.slice(0, questionCount)
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
      const category = categories.find(c => c.id === selectedCategory)
      if (!material) return

      // カテゴリ名を取得
      const categoryName = category?.name || ''

      // 無料の賢い問題生成を使用
      const questions = await generateQuestionsFromContent(material.title, material.file_type, categoryName)
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
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-sm text-green-800 font-medium">🎉 完全無料のAI問題生成</p>
              <p className="text-xs text-green-700 mt-1">
                カテゴリに最適化された賢い問題を自動生成します。費用は一切かかりません。
              </p>
            </div>
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
import { useState, useEffect } from 'react'

interface Document {
  id: string
  name: string
  file_path: string
  category: string
  description: string
  uploaded_at: string
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // ローカルに保存されているPDF資料のリスト
  const localDocuments: Document[] = [
    {
      id: '1',
      name: '問題解決に必要な３つの思考法',
      file_path: '/documents/問題解決に必要な３つの思考法.pdf',
      category: '問題解決の思考法',
      description: 'クリティカル・ラテラル・ロジカルシンキングの基礎',
      uploaded_at: '2025-01-01'
    },
    {
      id: '2',
      name: '【回答入り】問題解決に必要な３つの思考法',
      file_path: '/documents/【回答入り】問題解決に必要な３つの思考法.pdf',
      category: '問題解決の思考法',
      description: '詳細な説明と例を含む完全版',
      uploaded_at: '2025-01-01'
    },
    {
      id: '3',
      name: '問題解決に必要な３つの思考法｜演習問題',
      file_path: '/documents/問題解決に必要な３つの思考法｜演習問題.pdf',
      category: '問題解決の思考法',
      description: '実践的な演習問題集',
      uploaded_at: '2025-01-01'
    },
    {
      id: '4',
      name: '問題解決の特効薬',
      file_path: '/documents/問題解決の特効薬.pdf',
      category: '問題解決の特効薬',
      description: '実践的な問題解決アプローチ',
      uploaded_at: '2025-01-01'
    },
    {
      id: '5',
      name: 'マネジメント強化',
      file_path: '/documents/マネジメント強化.pdf',
      category: 'マネジメント強化',
      description: 'マネジメントの基本概念',
      uploaded_at: '2025-01-01'
    },
    {
      id: '6',
      name: 'マネジメント強化（修正）',
      file_path: '/documents/マネジメント強化（修正）.pdf',
      category: 'マネジメント強化',
      description: '改訂版マネジメント資料',
      uploaded_at: '2025-01-01'
    },
    {
      id: '7',
      name: '株式会社Gハウス｜マネジメント強化',
      file_path: '/documents/株式会社Gハウス｜マネジメント強化.pdf',
      category: 'マネジメント強化',
      description: 'Gハウス独自のマネジメント手法',
      uploaded_at: '2025-01-01'
    },
    {
      id: '8',
      name: 'Gハウス｜補足資料. ３S主義',
      file_path: '/documents/Gハウス｜補足資料.　３S主義ーマネジメント実現のスローガンの中身.pdf',
      category: '３S主義',
      description: 'Simplification, Specialization, Standardization',
      uploaded_at: '2025-01-01'
    },
    {
      id: '9',
      name: '補足資料（Weekly Management）',
      file_path: '/documents/補足資料（Weekly Management）.pdf',
      category: 'Weekly Management',
      description: '週次管理の実践方法',
      uploaded_at: '2025-01-01'
    },
    {
      id: '10',
      name: '補足資料（マネジメントにおける幹部の努力姿勢）',
      file_path: '/documents/補足資料（マネジメントにおける幹部の努力姿勢）.pdf',
      category: 'マネジメント強化',
      description: '幹部として必要な姿勢と心構え',
      uploaded_at: '2025-01-01'
    },
    {
      id: '11',
      name: '補足資料',
      file_path: '/documents/補足資料.pdf',
      category: 'マネジメント強化',
      description: '総合補足資料',
      uploaded_at: '2025-01-01'
    },
    {
      id: '12',
      name: '観察・分析・判断レポートフォーム',
      file_path: '/documents/観察・分析・判断レポートフォーム.pdf',
      category: '観察・分析・判断',
      description: '実践用レポートテンプレート',
      uploaded_at: '2025-01-01'
    },
    {
      id: '13',
      name: '行動の優先順位付け',
      file_path: '/documents/行動の優先順位付け.pdf',
      category: '行動の優先順位',
      description: '効果的な優先順位の決め方',
      uploaded_at: '2025-01-01'
    }
  ]

  useEffect(() => {
    setDocuments(localDocuments)
  }, [])

  const categories = [
    'all',
    '問題解決の思考法',
    'マネジメント強化',
    '３S主義',
    'Weekly Management',
    '観察・分析・判断',
    '行動の優先順位',
    '問題解決の特効薬'
  ]

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleDownload = (_filePath: string, fileName: string) => {
    // ローカルファイルへのリンクを作成
    const link = document.createElement('a')
    link.href = `C:\\claudecode\\G-executives\\documents\\${fileName}.pdf`
    link.download = fileName
    link.click()
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

  return (
    <div className="px-4 py-6 sm:px-0 dark:bg-gray-900 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">研修資料ライブラリ</h1>
        <p className="text-gray-600 dark:text-gray-400">Gハウス幹部マネジメント研修の教材資料</p>
      </div>

      {/* 検索とフィルタ */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="資料を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? '全てのカテゴリ' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 資料一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map(doc => (
          <div key={doc.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {doc.name}
                  </h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                    {doc.category}
                  </span>
                </div>
                <div className="ml-4">
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {doc.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {new Date(doc.uploaded_at).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleDownload(doc.file_path, doc.name)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  開く
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">資料が見つかりません</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">検索条件を変更してください</p>
        </div>
      )}
    </div>
  )
}

export default Documents
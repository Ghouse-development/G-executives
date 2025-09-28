import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface Category {
  id: string
  name: string
  description: string
  created_at: string
}

interface TestQuestion {
  id: string
  category_id: string
  question: string
  answer: string
  created_at: string
}

const Materials = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [questions, setQuestions] = useState<TestQuestion[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<TestQuestion | null>(null)

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  })

  const [questionForm, setQuestionForm] = useState({
    question: '',
    answer: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchQuestions(selectedCategory.id)
    }
  }, [selectedCategory])

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setCategories(data)
    }
  }

  const fetchQuestions = async (categoryId: string) => {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setQuestions(data)
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingCategory) {
      const { error } = await supabase
        .from('categories')
        .update(categoryForm)
        .eq('id', editingCategory.id)

      if (!error) {
        fetchCategories()
        closeCategoryModal()
      }
    } else {
      const { error } = await supabase
        .from('categories')
        .insert([categoryForm])

      if (!error) {
        fetchCategories()
        closeCategoryModal()
      }
    }
  }

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCategory) return

    if (editingQuestion) {
      const { error } = await supabase
        .from('questions')
        .update(questionForm)
        .eq('id', editingQuestion.id)

      if (!error) {
        fetchQuestions(selectedCategory.id)
        closeQuestionModal()
      }
    } else {
      const { error } = await supabase
        .from('questions')
        .insert([{
          ...questionForm,
          category_id: selectedCategory.id
        }])

      if (!error) {
        fetchQuestions(selectedCategory.id)
        closeQuestionModal()
      }
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (confirm('このカテゴリを削除しますか？関連するテスト問題も削除されます。')) {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (!error) {
        fetchCategories()
        if (selectedCategory?.id === id) {
          setSelectedCategory(null)
          setQuestions([])
        }
      }
    }
  }

  const handleDeleteQuestion = async (id: string) => {
    if (confirm('この問題を削除しますか？')) {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id)

      if (!error && selectedCategory) {
        fetchQuestions(selectedCategory.id)
      }
    }
  }

  const openCategoryModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
      setCategoryForm({
        name: category.name,
        description: category.description
      })
    } else {
      setEditingCategory(null)
      setCategoryForm({ name: '', description: '' })
    }
    setIsModalOpen(true)
  }

  const closeCategoryModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
    setCategoryForm({ name: '', description: '' })
  }

  const openQuestionModal = (question?: TestQuestion) => {
    if (question) {
      setEditingQuestion(question)
      setQuestionForm({
        question: question.question,
        answer: question.answer
      })
    } else {
      setEditingQuestion(null)
      setQuestionForm({ question: '', answer: '' })
    }
    setIsQuestionModalOpen(true)
  }

  const closeQuestionModal = () => {
    setIsQuestionModalOpen(false)
    setEditingQuestion(null)
    setQuestionForm({ question: '', answer: '' })
  }

  return (
    <div className="px-4 py-6 sm:px-0 dark:bg-gray-900 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* カテゴリ一覧 */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">カテゴリ</h2>
                <button
                  onClick={() => openCategoryModal()}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  新規カテゴリ
                </button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory?.id === category.id
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    } border ${
                      selectedCategory?.id === category.id
                        ? 'border-indigo-500'
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {category.description}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openCategoryModal(category)
                          }}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteCategory(category.id)
                          }}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* テスト問題一覧 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {selectedCategory ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {selectedCategory.name} のテスト問題
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {questions.length}個の問題
                      </p>
                    </div>
                    <button
                      onClick={() => openQuestionModal()}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                    >
                      問題を追加
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {questions.map((question, index) => (
                      <div key={question.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium mr-2">
                                {index + 1}
                              </span>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">問題</h4>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{question.question}</p>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">解答</h4>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{question.answer}</p>
                            </div>
                          </div>
                          <div className="flex space-x-1 ml-4">
                            <button
                              onClick={() => openQuestionModal(question)}
                              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">テスト問題がありません</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">カテゴリを選択してテスト問題を追加してください</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* カテゴリモーダル */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeCategoryModal}></div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleCategorySubmit}>
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mb-4">
                    {editingCategory ? 'カテゴリ編集' : '新規カテゴリ作成'}
                  </h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      カテゴリ名
                    </label>
                    <input
                      type="text"
                      required
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md p-2 border"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      説明
                    </label>
                    <textarea
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md p-2 border"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={closeCategoryModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 問題モーダル */}
      {isQuestionModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeQuestionModal}></div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleQuestionSubmit}>
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mb-4">
                    {editingQuestion ? '問題編集' : '新規問題作成'}
                  </h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      問題
                    </label>
                    <textarea
                      required
                      value={questionForm.question}
                      onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md p-2 border"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      解答
                    </label>
                    <textarea
                      required
                      value={questionForm.answer}
                      onChange={(e) => setQuestionForm({ ...questionForm, answer: e.target.value })}
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md p-2 border"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={closeQuestionModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Materials
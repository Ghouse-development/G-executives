import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Executive } from '../types'

const Executives = () => {
  const [executives, setExecutives] = useState<Executive[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExecutive, setEditingExecutive] = useState<Executive | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: ''
  })

  useEffect(() => {
    fetchExecutives()
  }, [])

  const fetchExecutives = async () => {
    const { data, error } = await supabase
      .from('executives')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setExecutives(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingExecutive) {
      const { error } = await supabase
        .from('executives')
        .update(formData)
        .eq('id', editingExecutive.id)

      if (!error) {
        fetchExecutives()
        closeModal()
      }
    } else {
      const { error } = await supabase
        .from('executives')
        .insert([formData])

      if (!error) {
        fetchExecutives()
        closeModal()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('この幹部を削除しますか？関連する学習記録も削除されます。')) {
      const { error } = await supabase
        .from('executives')
        .delete()
        .eq('id', id)

      if (!error) {
        fetchExecutives()
      }
    }
  }

  const openModal = (executive?: Executive) => {
    if (executive) {
      setEditingExecutive(executive)
      setFormData({
        name: executive.name,
        email: executive.email,
        position: executive.position,
        department: executive.department
      })
    } else {
      setEditingExecutive(null)
      setFormData({ name: '', email: '', position: '', department: '' })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingExecutive(null)
    setFormData({ name: '', email: '', position: '', department: '' })
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">幹部管理</h1>
          <p className="mt-2 text-sm text-gray-700">Gハウス幹部の情報を管理します</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => openModal()}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            新規幹部追加
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">名前</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">メールアドレス</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">役職</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">部門</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">登録日</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">操作</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {executives.map((executive) => (
                    <tr key={executive.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{executive.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{executive.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{executive.position}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{executive.department}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(executive.created_at).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => openModal(executive)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          編集
                        </button>
                        <button
                          onClick={() => handleDelete(executive.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {editingExecutive ? '幹部情報編集' : '新規幹部登録'}
                  </h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      名前
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      役職
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      部門
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default Executives
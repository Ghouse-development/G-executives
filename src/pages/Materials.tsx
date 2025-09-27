import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { Material, Category } from '../types'

const Materials = () => {
  const [materials, setMaterials] = useState<Material[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchCategories()
    fetchMaterials()
  }, [])

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
      .order('created_at', { ascending: false })

    if (!error && data) {
      setMaterials(data)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return
    if (!selectedCategory) {
      alert('カテゴリを選択してください')
      return
    }

    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()?.toLowerCase()
    const allowedTypes = ['pdf', 'jpeg', 'jpg', 'ppt', 'pptx']

    if (!fileExt || !allowedTypes.includes(fileExt)) {
      alert('PDF、JPEG、PowerPointファイルのみアップロード可能です')
      return
    }

    setUploading(true)

    const fileName = `${Date.now()}_${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('materials')
      .upload(fileName, file)

    if (uploadError) {
      alert('ファイルのアップロードに失敗しました')
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('materials')
      .getPublicUrl(fileName)

    const materialData = {
      category_id: selectedCategory,
      title: file.name.replace(/\.[^/.]+$/, ''),
      file_url: publicUrl,
      file_type: fileExt === 'jpg' ? 'jpeg' : fileExt as Material['file_type']
    }

    const { error: dbError } = await supabase
      .from('materials')
      .insert([materialData])

    if (dbError) {
      alert('データベースへの保存に失敗しました')
    } else {
      fetchMaterials()
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }

    setUploading(false)
  }

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!confirm('この教材を削除しますか？')) return

    const fileName = fileUrl.split('/').pop()
    if (fileName) {
      await supabase.storage
        .from('materials')
        .remove([fileName])
    }

    const { error } = await supabase
      .from('materials')
      .delete()
      .eq('id', id)

    if (!error) {
      fetchMaterials()
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    if (!selectedCategory) {
      alert('カテゴリを選択してください')
      return
    }

    const files = Array.from(e.dataTransfer.files)
    for (const file of files) {
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const allowedTypes = ['pdf', 'jpeg', 'jpg', 'ppt', 'pptx']

      if (!fileExt || !allowedTypes.includes(fileExt)) {
        continue
      }

      const fileName = `${Date.now()}_${file.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('materials')
        .upload(fileName, file)

      if (uploadError) continue

      const { data: { publicUrl } } = supabase.storage
        .from('materials')
        .getPublicUrl(fileName)

      const materialData = {
        category_id: selectedCategory,
        title: file.name.replace(/\.[^/.]+$/, ''),
        file_url: publicUrl,
        file_type: fileExt === 'jpg' ? 'jpeg' : fileExt as Material['file_type']
      }

      await supabase
        .from('materials')
        .insert([materialData])
    }

    fetchMaterials()
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">教材管理</h1>
          <p className="mt-2 text-sm text-gray-700">PDF、JPEG、PowerPointファイルをアップロードして管理します</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリを選択
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
          >
            <option value="">カテゴリを選択してください</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400"
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600">
            ファイルをドラッグ&ドロップまたは
            <label className="ml-1 cursor-pointer text-indigo-600 hover:text-indigo-500">
              クリックしてアップロード
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.jpeg,.jpg,.ppt,.pptx"
                onChange={handleFileUpload}
                disabled={uploading || !selectedCategory}
              />
            </label>
          </p>
          <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PowerPoint</p>
          {uploading && <p className="mt-2 text-sm text-gray-600">アップロード中...</p>}
        </div>
      </div>

      <div className="mt-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">タイトル</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">タイプ</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">カテゴリ</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">アップロード日</th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">操作</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {materials.map((material) => (
                <tr key={material.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {material.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {material.file_type.toUpperCase()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {categories.find(c => c.id === material.category_id)?.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {new Date(material.created_at).toLocaleDateString()}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a
                      href={material.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      表示
                    </a>
                    <button
                      onClick={() => handleDelete(material.id, material.file_url)}
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
  )
}

export default Materials
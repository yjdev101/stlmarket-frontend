import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const CATEGORIES = ['피규어', '부품', '생활용품', '예술', '기타']

export default function UploadPage() {
  const [form, setForm] = useState({ title: '', description: '', price: '0', category: '기타' })
  const [stlFile, setStlFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else if (user.role !== 'SELLER') {
      alert('판매자 계정만 파일을 등록할 수 있습니다.')
      navigate('/')
    }
  }, [user, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stlFile) { setError('STL 파일을 선택해주세요.'); return }

    setError('')
    setLoading(true)

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(form)], { type: 'application/json' }))
    formData.append('file', stlFile)
    if (thumbnail) formData.append('thumbnail', thumbnail)

    try {
      await api.post('/products', formData)
      setSuccess(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || '업로드에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">등록 완료!</h2>
          <p className="text-gray-500">파일이 성공적으로 등록되었습니다. 잠시 후 메인으로 이동합니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">STL 파일 등록</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              가격 (0 = 무료)
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, price: String(Math.max(0, Number(form.price) - 1000)) })}
                className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-lg font-medium flex items-center justify-center"
              >
                −
              </button>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="1000"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={() => setForm({ ...form, price: String(Number(form.price) + 1000) })}
                className="w-8 h-8 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-lg font-medium flex items-center justify-center"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {Number(form.price) === 0 ? '무료로 제공됩니다' : `${Number(form.price).toLocaleString()}원`}
            </p>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">STL 파일 *</label>
          <input
            type="file"
            accept=".stl"
            onChange={(e) => setStlFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-600 file:text-sm hover:file:bg-indigo-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">썸네일 이미지 (선택)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-gray-50 file:text-gray-600 file:text-sm hover:file:bg-gray-100"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? '등록 중...' : '파일 등록하기'}
        </button>
      </form>
    </div>
  )
}

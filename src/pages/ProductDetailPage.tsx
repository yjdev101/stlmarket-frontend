import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false))
  }, [id])

  const handleDownload = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    try {
      const res = await api.get(`/products/${id}/download`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${product.title}.stl`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err: any) {
      alert(err.response?.data?.message || '다운로드에 실패했습니다.')
    }
  }

  if (loading) return <div className="text-center py-20 text-gray-400">불러오는 중...</div>
  if (!product) return <div className="text-center py-20 text-gray-400">상품을 찾을 수 없습니다.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1">
        ← 뒤로가기
      </button>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          {product.thumbnailPath ? (
            <img
              src={`/api/files/${product.thumbnailPath}`}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl">🖨️</span>
          )}
        </div>

        <div className="p-6">
          <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">{product.title}</h1>
          <p className="text-sm text-gray-400 mt-1">by {product.sellerNickname} · ↓ {product.downloadCount}회 다운로드</p>

          {product.description && (
            <p className="text-gray-600 mt-4 text-sm leading-relaxed">{product.description}</p>
          )}

          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-indigo-600">
              {Number(product.price) === 0 ? '무료' : `${Number(product.price).toLocaleString()}원`}
            </span>
            {Number(product.price) === 0 ? (
              <button
                onClick={handleDownload}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                무료 다운로드
              </button>
            ) : (
              <div className="text-right">
                <button
                  disabled
                  className="bg-gray-200 text-gray-400 px-6 py-2.5 rounded-lg font-medium cursor-not-allowed"
                >
                  결제 준비 중
                </button>
                <p className="text-xs text-gray-400 mt-1">결제 기능은 곧 추가될 예정입니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'

const CATEGORIES = ['전체', '피규어', '부품', '생활용품', '예술', '기타']

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('')
  const [keyword, setKeyword] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const params: Record<string, string> = {}
    if (category) params.category = category
    if (search) params.keyword = search

    api.get('/products', { params })
      .then((res) => setProducts(res.data.content))
      .finally(() => setLoading(false))
  }, [category, search])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCategory('')
    setSearch(keyword)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">STLmarket</h1>
      <p className="text-gray-500 mb-6">3D 프린팅용 STL 파일 마켓플레이스</p>

      {/* 검색 */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="파일 검색..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
        >
          검색
        </button>
      </form>

      {/* 카테고리 */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat === '전체' ? '' : cat); setKeyword(''); setSearch('') }}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              (cat === '전체' && !category) || cat === category
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 상품 목록 */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">불러오는 중...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          {search || category ? '검색 결과가 없습니다.' : '등록된 파일이 없습니다.'}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

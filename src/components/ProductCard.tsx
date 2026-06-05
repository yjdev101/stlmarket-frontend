import { Link } from 'react-router-dom'

interface Product {
  id: number
  title: string
  description: string
  price: number
  category: string
  thumbnailPath: string | null
  downloadCount: number
  sellerNickname: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="h-44 bg-gray-100 flex items-center justify-center">
        {product.thumbnailPath ? (
          <img
            src={`/api/files/${product.thumbnailPath}`}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl">🖨️</span>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">
          {product.category}
        </span>
        <h3 className="mt-2 font-semibold text-gray-900 truncate">{product.title}</h3>
        <p className="text-sm text-gray-500 mt-1 truncate">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-indigo-600">
            {Number(product.price) === 0 ? '무료' : `${Number(product.price).toLocaleString()}원`}
          </span>
          <span className="text-xs text-gray-400">↓ {product.downloadCount}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">by {product.sellerNickname}</p>
      </div>
    </Link>
  )
}

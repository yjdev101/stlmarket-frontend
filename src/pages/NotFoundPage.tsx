import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-6xl font-bold text-indigo-200 mb-4">404</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">페이지를 찾을 수 없어요</h2>
        <p className="text-gray-500 mb-6">주소가 잘못됐거나 삭제된 페이지예요.</p>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  )
}

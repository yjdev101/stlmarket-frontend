import { Link, useSearchParams } from 'react-router-dom'

export default function PaymentFailPage() {
  const [searchParams] = useSearchParams()
  const message = searchParams.get('message') || '결제가 취소되었거나 실패했습니다.'
  const code = searchParams.get('code')

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <h1 className="text-xl font-bold text-gray-900 mb-2">결제에 실패했습니다</h1>
      <p className="text-sm text-gray-500">{message}</p>
      {code && <p className="text-xs text-gray-400 mt-1">오류 코드: {code}</p>}
      <Link to="/" className="mt-6 inline-block text-indigo-600 hover:underline">홈으로 돌아가기</Link>
    </div>
  )
}

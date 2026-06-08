import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api/axios'

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const orderId = searchParams.get('orderId')
    const paymentKey = searchParams.get('paymentKey')
    const amount = searchParams.get('amount')

    if (!orderId || !paymentKey || !amount) {
      setStatus('error')
      setError('잘못된 접근입니다.')
      return
    }

    api.post(`/orders/${orderId}/confirm`, { paymentKey, amount: Number(amount) })
      .then((res) => {
        setOrder(res.data)
        setStatus('success')
      })
      .catch((err) => {
        setError(err.response?.data?.message || '결제 승인에 실패했습니다.')
        setStatus('error')
      })
  }, [searchParams])

  if (status === 'loading') {
    return <div className="text-center py-20 text-gray-400">결제를 확인하는 중...</div>
  }

  if (status === 'error') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">결제 승인 실패</h1>
        <p className="text-sm text-gray-500 mb-6">{error}</p>
        <Link to="/" className="text-indigo-600 hover:underline">홈으로 돌아가기</Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <h1 className="text-xl font-bold text-gray-900 mb-2">구매가 완료되었습니다 🎉</h1>
      <p className="text-sm text-gray-500 mb-6">{order.productTitle}</p>
      <Link
        to={`/products/${order.productId}`}
        className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        상품 페이지로 이동
      </Link>
    </div>
  )
}

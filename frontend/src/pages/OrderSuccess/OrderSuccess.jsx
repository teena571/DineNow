import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderSuccess = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-6">Your order has been placed and paid successfully.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default OrderSuccess

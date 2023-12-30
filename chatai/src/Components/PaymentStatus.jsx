import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { updateItem } from '../apiCalls/growthNetwork'

export default function PaymentStatus({ success }) {
  const { purchase_id } = useParams()
  const navigate = useNavigate()
  const update_item = async () => {
    try {
      await updateItem({ purchase_id, is_paid: success, is_purchased: success })
    } catch (error) {
      // navigate("/")
    }
  }
  useEffect(() => {
    update_item()
  })
  return (
    <div className="py-20 w-100 h-100 h-screen">

      <div className="bg-white p-6  md:mx-auto">
        {success ? <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
          </path>
        </svg> : <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
          <path fill="currentColor"
            d="M19.07 6.93a1 1 0 0 0-1.414 0L12 10.586 6.344 4.93a1 1 0 0 0-1.415 1.415L10.586 12l-5.657 5.657a1 1 0 0 0 1.415 1.415L12 13.414l5.657 5.656a1 1 0 0 0 1.415-1.414L13.414 12l5.656-5.657a1 1 0 0 0 0-1.414z">
          </path>
        </svg>
        }
        {success ? <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
          <p className="text-gray-600 my-2">Thank you for completing your Purchase with <Link className='text-primary' to={"/"}>HomeLinked</Link></p>
          <p> Have a great day!  </p>
          <div className="py-10 text-center">
            <a href="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
              Track Your Order
            </a>
          </div>
        </div>

          : <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
            <p className="text-gray-600 my-2">There was issue with Purchase,Try Again Later</p>
            <p> Have a great day!  </p>
            <div className="py-10 text-center">
              <a href="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                HOME
              </a>
            </div>
          </div>}
      </div>

    </div>
  )
}

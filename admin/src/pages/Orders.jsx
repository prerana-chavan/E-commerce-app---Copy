import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

export const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      //console.log(response.data);

      if (response.data.success) {
        setOrders(response.data.orders)
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (e,orderId)=>{
    try {
      
      const response = await axios.post(backendUrl + '/api/order/status',{orderId,status:e.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
      }
    
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (

    <div>
      <h3>Order Page</h3>
      <div >
        {orders.map((order, index) => (
          <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:py-8 my-3 mg:my-4 text-xs sm:text-sm text-gray-700'>
            <img src={assets.parcel_icon} className='w-12' alt="Parcel Icon" />

            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className='py-0.5'>
                    {item.name} X {item.quantity} <span>{item.size}</span>
                  </p>
                ))}
              </div>
              <p className='mt-3 mb-2 font-bold'>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + " ,"}</p>
                <p>{order.address.city + " ," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Item:{order.items.length}</p>
              <p className='mt-3'>Payment Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'done':'pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className='p-2 font-semibold'>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shift">Shift</option>
              <option value="out for delivery">out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};



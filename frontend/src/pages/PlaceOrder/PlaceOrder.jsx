import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount, url} = useContext(StoreContext)

  const totalAmount = getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2;

  const handlePayment = async (e) => {
    e.preventDefault();
    if (totalAmount === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // 1️⃣ Create Razorpay order on backend
      const res = await fetch(`${url}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }), // in rupees
      });

      const data = await res.json();
      if (!data.success) {
        alert("Failed to create order. Try again!");
        return;
      }

      const { order } = data;

      // 2️⃣ Setup Razorpay checkout
      const options = {
        key: "rzp_test_XXXXXXXXXXXX", // replace with your Razorpay key id
        amount: order.amount,
        currency: order.currency,
        name: "DineNow",
        description: "Food Delivery Payment",
        order_id: order.id,
        handler: async function (response) {
          // 3️⃣ Verify payment on backend
          const verifyRes = await fetch(`${url}/api/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("✅ Payment Successful!");
          } else {
            alert("❌ Payment verification failed!");
          }
        },
        theme: { color: "#F37254" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong during payment!");
    }
  };

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name'/>
          <input type="text" placeholder='Last Name'/>
        </div>
        <input type="email" placeholder='Email Address'/>
        <input type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input type="text" placeholder='City'/>
          <input type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code'/>
          <input type="text" placeholder='Country'/>
        </div>
        <input type="text" placeholder='Phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0? 0: getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button>Proceed To Payment</button>
        </div>
      </div>
    </form>
  )
}


export default PlaceOrder

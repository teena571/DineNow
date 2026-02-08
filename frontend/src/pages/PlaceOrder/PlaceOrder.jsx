import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const {getTotalCartAmount, tableNo} = useContext(StoreContext)
  const navigate = useNavigate()

  const totalAmount = getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2;

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    if (totalAmount === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Navigate to payment page
    navigate('/payment');
  };

  return (
    <div className='place-order'>
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
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="button" onClick={handleProceedToPayment}>Proceed To Payment</button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder

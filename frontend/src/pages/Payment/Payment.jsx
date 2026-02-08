import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Payment = () => {
  const [message, setMessage] = useState('Processing payment...');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(true);
    const timer1 = setTimeout(() => {
      setMessage('Payment Done ✅');
      toast.success('Payment Successful');
    }, 2000);

    const timer2 = setTimeout(() => {
      setMessage('Order Confirmed 🎉');
      toast.success('Order Confirmed');
    }, 3000);

    const timer3 = setTimeout(() => {
      setMessage('Order reaching your table 🍽️');
    }, 4000);

    const timer4 = setTimeout(() => {
      navigate('/home');
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [navigate]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        width: '420px',
        background: 'linear-gradient(to bottom, #ff7e5f, #feb47b)',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        padding: '40px',
        textAlign: 'center',
        transform: isOpen ? 'scale(1)' : 'scale(0.9)',
        opacity: isOpen ? 1 : 0,
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px'
      }}>
        {/* Large Spinner */}
        <div style={{
          width: '80px',
          height: '80px',
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTop: '4px solid #fff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>

        {/* Message */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '10px'
          }}>
            {message}
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            Please wait while we process your order
          </p>
        </div>

        {/* Progress Indicator */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: message === 'Processing payment...' ? '#fff' : 'rgba(255, 255, 255, 0.3)',
            transition: 'background-color 0.5s'
          }}></div>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: message === 'Payment Done ✅' ? '#4ade80' : 'rgba(255, 255, 255, 0.3)',
            transition: 'background-color 0.5s'
          }}></div>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: message === 'Order Confirmed 🎉' ? '#4ade80' : 'rgba(255, 255, 255, 0.3)',
            transition: 'background-color 0.5s'
          }}></div>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: message === 'Order reaching your table 🍽️' ? '#3b82f6' : 'rgba(255, 255, 255, 0.3)',
            transition: 'background-color 0.5s'
          }}></div>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Payment;

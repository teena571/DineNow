// import React, { useState } from 'react'
// import Navbar from './components/Navbar/Navbar'
// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home/Home'
// import Cart from './pages/Cart/Cart'
// import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
// import Footer from './components/Footer/Footer'
// import LoginPopup from './components/LoginPopup/LoginPopup'


// const App = () => {

//   const [showLogin, setShowLogin] = useState(false)

//   return (
//     <>
//     {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
//       <div className='app'>
//         <Navbar setShowLogin={setShowLogin}/>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/cart' element={<Cart />} />
//           <Route path='/order' element={<PlaceOrder />} />
//         </Routes>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default App





import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Payment from './pages/Payment/Payment'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Chat from './pages/Chat/Chat.jsx'
import TableSelect from './pages/TableSelect/TableSelect.jsx'
import MyTable from './pages/MyTable/MyTable.jsx'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Signup from './pages/Signup/Signup'
import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/signup' element={<Signup />} />
          
          {/* Protected Customer Routes */}
          <Route path='/cart' element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path='/order' element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <PlaceOrder />
            </ProtectedRoute>
          } />
          <Route path='/payment' element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path='/order-success' element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <OrderSuccess />
            </ProtectedRoute>
          } />
          <Route path='/chat' element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <Chat />
            </ProtectedRoute>
          } />
          <Route path='/table-select' element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <TableSelect />
            </ProtectedRoute>
          } />
          <Route path='/my-table/:tableNo' element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <MyTable />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes - Add your admin pages here */}
          {/* <Route path='/admin' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } /> */}
          
          {/* Kitchen/Staff Routes - Add your kitchen pages here */}
          {/* <Route path='/kitchen' element={
            <ProtectedRoute allowedRoles={['staff', 'admin']}>
              <KitchenDashboard />
            </ProtectedRoute>
          } /> */}
          
          {/* Catch-all route - redirect to home */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
      <ToastContainer />
    </>
  )
}

export default App

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
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Payment from './pages/Payment/Payment'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Chat from './pages/Chat/Chat.jsx'   // ✅ Add this import
import TableSelect from './pages/TableSelect/TableSelect.jsx'
import MyTable from './pages/MyTable/MyTable.jsx'
import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/order-success' element={<OrderSuccess />} />
          <Route path='/chat' element={<Chat />} />   {/* ✅ New Chat Route */}
          <Route path='/table-select' element={<TableSelect />} />
          <Route path='/my-table/:tableNo' element={<MyTable />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
      <ToastContainer />
    </>
  )
}

export default App

// import React, { useState } from 'react'
// import './LoginPopup.css'
// import { assets } from '../../assets/assets'

// const LoginPopup = ({setShowLogin}) => {

//   const [currState,setCurrState] = useState("Sign Up")

//   return (
//     <div className='login-popup'>
//       <form className="login-popup-container">
//         <div className="login-popup-title">
//           <h2>{currState}</h2>
//           <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
//         </div>
//         <div className="login-popup-inputs">
//           {currState==="Login"?<></>:<input type="text" placeholder='Enter Name' required />}
//           <input type="text" placeholder='Enter Email' required />
//           <input type="password" placeholder='Enter Password' required />
//         </div>
//         <button>{currState==="Sign Up"?"Create Account":"Login"}</button>
//         <div className="login-popup-condition">
//           <input type="checkbox" required/>
//           <p>By continuing, I agree to the terms of use & privacy policy.</p>
//         </div>
//         {currState==="Login"
//           ?<p>Create a new account? <span onClick={()=> setCurrState("Sign Up")}>Click here</span></p>
//           :<p>Already have an account? <span onClick={()=> setCurrState("Login")}>Login here</span></p>
//         }
        
        
//       </form>
//     </div>
//   )
// }

// export default LoginPopup





import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up")
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const endpoint = currState === "Sign Up"
      ? "http://localhost:5000/api/auth/signup"
      : "http://localhost:5000/api/auth/login"

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        // Save token
        localStorage.setItem("token", data.token)

        // Close popup
        setShowLogin(false)

        // ✅ Redirect to homepage (or dashboard)
        navigate("/")   // change this route as per your app
      } else {
        alert(data.message || "Something went wrong")
      }
    } catch (error) {
      console.error(error)
      alert("Server error. Try again later.")
    }
  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              required
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  )
}

export default LoginPopup

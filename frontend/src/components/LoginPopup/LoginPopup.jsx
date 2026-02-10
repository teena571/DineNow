// import React, { useState } from 'react'
// import './LoginPopup.css'
// import { assets } from '../../assets/assets'
// import { useNavigate } from 'react-router-dom'

// const LoginPopup = ({ setShowLogin }) => {
//   const [currState, setCurrState] = useState("Sign Up")
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" })
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const endpoint = currState === "Sign Up"
//       ? "http://localhost:4000/api/user/register"
//       : "http://localhost:4000/api/user/login"

//     const payload = currState === "Sign Up"
//       ? { name: formData.name, email: formData.email, password: formData.password }
//       : { email: formData.email, password: formData.password }

//     try {
//       const res = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         // Save token
//         localStorage.setItem("token", data.token)

//         // Close popup
//         setShowLogin(false)

//         // ✅ Redirect to homepage (or dashboard)
//         navigate("/")   // change this route as per your app
//       } else {
//         alert(data.message || "Something went wrong")
//       }
//     } catch (error) {
//       console.error(error)
//       alert("Server error. Try again later.")
//     }
//   }

//   return (
//     <div className='login-popup'>
//       <form className="login-popup-container" onSubmit={handleSubmit}>
//         <div className="login-popup-title">
//           <h2>{currState}</h2>
//           <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
//         </div>
//         <div className="login-popup-inputs">
//           {currState === "Login" ? null : (
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter Name"
//               required
//               onChange={handleChange}
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             required
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             required
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">
//           {currState === "Sign Up" ? "Create Account" : "Login"}
//         </button>
//         <div className="login-popup-condition">
//           <input type="checkbox" required />
//           <p>By continuing, I agree to the terms of use & privacy policy.</p>
//         </div>
//         {currState === "Login" ? (
//           <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
//         ) : (
//           <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
//         )}
//       </form>
//     </div>
//   )
// }

// export default LoginPopup



import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useAuth } from '../../context/AuthContext'

const LoginPopup = ({ setShowLogin }) => {

  const {url} = useContext(StoreContext)
  const { login, signup } = useAuth()

  const [currState, setCurrState] = useState("Sign Up")
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = currState === "Sign Up"
      ? await signup(formData.name, formData.email, formData.password)
      : await login(formData.email, formData.password)

    setLoading(false)

    if (result.success) {
      setShowLogin(false)
      navigate("/") // redirect after successful login/signup
    } else {
      alert(result.message || "Something went wrong")
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
          {currState === "Sign Up" && (
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

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginPopup

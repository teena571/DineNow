// import React, { useContext, useState } from 'react'
// import './Navbar.css'
// import {assets} from '../../assets/assets'
// import { Link,useNavigate } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';

// const Navbar = ({setShowLogin}) => {

//     const [menu,setMenu] = useState("home");
//     const {getTotalCartAmount,setToken} = useContext(StoreContext);

//     const navigate = useNavigate();

//     // const [token, setToken] = useState(null);
//     const token = localStorage.getItem("token");

//     const logOut = () => {
//         localStorage.removeItem("token");
//         setToken("");
//         navigate("/")
//     }

//   return (
//     <div className='navbar'>
//         <Link to='/'><img src={assets.logo} className='logo' alt=''></img></Link>
//         <ul className="navbar-menu">
//             <Link to='/' onClick={() => setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
//             <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
//             <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile App</a>
//             <a href='#footer' onClick={() => setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
//         </ul>
//         <div className="navbar-right">
//             <img src={assets.search_icon} alt="" />
//             <div className="navbar-search-icon">
//                 <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
//                 <div className={getTotalCartAmount() === 0?"":"dot"}></div>
//             </div>

//             {!token? <button onClick={()=>setShowLogin(true)}>Sign In</button>
//             :<div className='navbar-profile'>
//                 <img src={assets.profile_icon} alt=''/>
//                 <ul className="nav-profile-dropdown">
//                     <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
//                     <hr />
//                     <li onClick={logOut}><img src={assets.logout_icon} alt="" />Logout</li>
//                 </ul>
//                 </div>}
//         </div>
//     </div>
//   )
// }

// export default Navbar



import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, setToken, searchTerm, setSearchTerm, setSearchResults, food_list } = useContext(StoreContext);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleLogout = async () => {
    await logout();
    logOut(); // Also clear old token
    toast.success('Logged out successfully');
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim()) {
      // Check if item exists in food_list
      const foundItems = food_list.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      if (foundItems.length > 0) {
        toast.success(`${foundItems[0].name} is available!`);
      } else {
        toast.error(`${query} is not available`);
      }

      // Scroll to food display
      const foodDisplay = document.getElementById('food-display');
      if (foodDisplay) {
        foodDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} className='logo' alt='logo' /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        
        {/* Only show My Table link when authenticated */}
        {(isAuthenticated || token) && (
          <Link to='/table-select' onClick={() => setMenu("table")} className={menu === "table" ? "active" : ""}>
            <span style={{ fontSize: '14px' }}>🪑</span> My Table
          </Link>
        )}
        
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
      </ul>

      <div className="navbar-right">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <img
            src={assets.search_icon}
            alt="search"
            className="search-icon"
            onClick={() => {
              if (searchTerm.trim()) {
                // Trigger search and scroll
                handleSearch({ target: { value: searchTerm } });
                // Scroll to food display section
                const foodDisplay = document.getElementById('food-display');
                if (foodDisplay) {
                  foodDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="cart" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* ✅ Chatbot Button - Only show when authenticated */}
        {(isAuthenticated || token) && (
          <Link to="/chat">
            <button className="chat-btn">💬 Chat</button>
          </Link>
        )}

        {!isAuthenticated && !token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='profile' />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={handleLogout}><img src={assets.logout_icon} alt="" />Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

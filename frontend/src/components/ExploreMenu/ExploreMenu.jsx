import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        {/* All Categories Button */}
        <div 
          onClick={() => setCategory("All")} 
          className="explore-menu-list-item"
          style={{
            border: category === "All" ? '3px solid tomato' : '3px solid transparent',
            transform: category === "All" ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <div style={{
            width: '7.5vw',
            minWidth: '80px',
            height: '7.5vw',
            minHeight: '80px',
            borderRadius: '50%',
            background: '#f8f8f8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px'
          }}>
            🍽️
          </div>
          <p style={{color: category === "All" ? 'tomato' : '#747474', fontWeight: category === "All" ? '600' : '500'}}>All</p>
        </div>
        
        {menu_list.map((item,index) => {
            return(
                <div 
                  onClick={() => setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} 
                  key={index} 
                  className="explore-menu-list-item"
                >
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}


export default ExploreMenu

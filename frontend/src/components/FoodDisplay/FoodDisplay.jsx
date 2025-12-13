import React, { useContext } from 'react'
import './FoodDisplay.css'
import {StoreContext} from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { foodImageMap } from '../../assets/assets'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {Array.isArray(food_list) && food_list.map((item, index) => {
            if (!item) return null;
            if (category === "All" || category === item.category) {
                // Safely compute image key only when image exists
                let imageSrc = item.image;
                if (typeof item.image === 'string' && item.image.length) {
                    try {
                        const imageKey = item.image.replace(/^\d+/, '');
                        imageSrc = foodImageMap[imageKey] || item.image;
                    } catch (e) {
                        // fallback to original image string
                        imageSrc = item.image;
                    }
                }
                return (
                  <FoodItem
                    key={String(item._id) || index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={imageSrc}
                  />
                );
            }
            return null;
        })}
      </div>
    </div>
  )
}

export default FoodDisplay

import React, { useContext, useEffect, useRef } from 'react'
import './FoodDisplay.css'
import {StoreContext} from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { foodImageMap } from '../../assets/assets'

const FoodDisplay = ({category}) => {

    const {food_list, searchTerm, searchResults} = useContext(StoreContext)
    const firstItemRef = useRef(null)
  
  useEffect(() => {
    if (searchResults.length > 0 && firstItemRef.current) {
      firstItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchResults, searchTerm]);

  // If searching, use search results. Otherwise use full food list
  const displayList = searchTerm ? searchResults : food_list;

  // Filter items based on category (only when not searching)
  const filteredList = searchTerm 
    ? displayList 
    : category === "All" 
      ? displayList 
      : displayList.filter(item => item?.category === category);

  return (
    <div className='food-display' id='food-display'>
      <h2>
        {searchTerm 
          ? `Search results for "${searchTerm}"` 
          : category === "All" 
            ? 'Top dishes near you' 
            : `${category} Dishes`
        }
      </h2>
      <div className="food-display-list">
        {searchTerm && filteredList.length === 0 && <p>No items found.</p>}
        {Array.isArray(filteredList) && filteredList.map((item, index) => {
            if (!item) return null;
            
            // Safely compute image key
            let imageSrc = item.image;
            if (typeof item.image === 'string' && item.image.length) {
                try {
                    const imageKey = item.image.replace(/^\d+/, '');
                    imageSrc = foodImageMap[imageKey] || item.image;
                } catch {
                    imageSrc = item.image;
                }
            }
            
            return (
              <FoodItem
                key={item._id || `food-${index}`}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={imageSrc}
                ref={index === 0 ? firstItemRef : null}
              />
            );
        })}
      </div>
    </div>
  )
}

export default FoodDisplay

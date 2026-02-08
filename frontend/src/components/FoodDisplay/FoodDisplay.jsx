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

  const displayList = searchTerm ? searchResults : food_list;

  return (
    <div className='food-display' id='food-display'>
      <h2>{searchTerm ? `Search results for "${searchTerm}"` : 'Top dishes near you'}</h2>
      <div className="food-display-list">
        {searchTerm && displayList.length === 0 && <p>No items found.</p>}
        {Array.isArray(displayList) && displayList.map((item, index) => {
            if (!item) return null;
            if (!searchTerm && (category === "All" || category === item.category)) {
                // Safely compute image key only when image exists
                let imageSrc = item.image;
                if (typeof item.image === 'string' && item.image.length) {
                    try {
                        const imageKey = item.image.replace(/^\d+/, '');
                        imageSrc = foodImageMap[imageKey] || item.image;
                    } catch {
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
                    ref={index === 0 ? firstItemRef : null}
                  />
                );
            } else if (searchTerm) {
                // For search results, display all
                let imageSrc = item.image;
                if (typeof item.image === 'string' && item.image.length) {
                    try {
                        const imageKey = item.image.replace(/^\d+/, '');
                        imageSrc = foodImageMap[imageKey] || item.image;
                    } catch {
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
                    ref={index === 0 ? firstItemRef : null}
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

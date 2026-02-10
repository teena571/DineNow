/**
 * FilteredFoodDisplay Component
 * 
 * Displays food items filtered by the selected category.
 * Shows all items when category is "All", otherwise filters by matching category.
 * 
 * Features:
 * - Dynamic filtering based on category prop
 * - Search functionality integration
 * - Image mapping from foodImageMap
 * - Empty state handling
 * - Smooth scroll to results
 */

import React, { useContext, useEffect, useRef, useMemo } from 'react';
import './FilteredFoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { foodImageMap } from '../../assets/assets';

const FilteredFoodDisplay = ({ category }) => {
  const { food_list, searchTerm, searchResults } = useContext(StoreContext);
  const firstItemRef = useRef(null);

  // Scroll to first item when search results change
  useEffect(() => {
    if (searchResults.length > 0 && firstItemRef.current) {
      firstItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchResults, searchTerm]);

  /**
   * Filter food items based on category
   * Memoized to prevent unnecessary recalculations
   */
  const filteredFoodList = useMemo(() => {
    if (!Array.isArray(food_list)) return [];
    
    // If searching, use search results
    if (searchTerm) {
      return searchResults;
    }
    
    // If "All" category, show all items
    if (category === "All") {
      return food_list;
    }
    
    // Filter by selected category
    return food_list.filter(item => item && item.category === category);
  }, [food_list, category, searchTerm, searchResults]);

  /**
   * Get image source with fallback
   */
  const getImageSrc = (item) => {
    if (!item.image) return '';
    
    if (typeof item.image === 'string' && item.image.length) {
      try {
        const imageKey = item.image.replace(/^\d+/, '');
        return foodImageMap[imageKey] || item.image;
      } catch {
        return item.image;
      }
    }
    
    return item.image;
  };

  /**
   * Get display title based on current state
   */
  const getDisplayTitle = () => {
    if (searchTerm) {
      return `Search results for "${searchTerm}"`;
    }
    if (category === "All") {
      return "Top dishes near you";
    }
    return `${category} Dishes`;
  };

  return (
    <div className='filtered-food-display' id='food-display'>
      <h2>{getDisplayTitle()}</h2>
      
      {/* Category Info */}
      {category !== "All" && !searchTerm && (
        <p className="category-info">
          Showing {filteredFoodList.length} {category.toLowerCase()} {filteredFoodList.length === 1 ? 'item' : 'items'}
        </p>
      )}

      <div className="filtered-food-display-list">
        {/* Empty State */}
        {filteredFoodList.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <p className="empty-message">
              {searchTerm 
                ? `No items found for "${searchTerm}"`
                : `No ${category.toLowerCase()} items available`
              }
            </p>
            <p className="empty-hint">Try selecting a different category</p>
          </div>
        )}

        {/* Food Items Grid */}
        {filteredFoodList.map((item, index) => {
          if (!item) return null;
          
          const imageSrc = getImageSrc(item);
          
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
        })}
      </div>
    </div>
  );
};

export default FilteredFoodDisplay;

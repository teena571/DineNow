/**
 * CategoryFilter Component
 * 
 * A reusable React component for filtering food items by category.
 * Displays menu categories as clickable items and filters food_list accordingly.
 * 
 * Features:
 * - Dynamic category filtering
 * - Visual feedback for selected category
 * - "All" option to show all items
 * - Smooth transitions and hover effects
 */

import React from 'react';
import './CategoryFilter.css';
import { menu_list } from '../../assets/assets';

const CategoryFilter = ({ category, setCategory }) => {
  
  /**
   * Handle category click
   * If same category is clicked, toggle to "All"
   * Otherwise, set to the clicked category
   */
  const handleCategoryClick = (menuName) => {
    setCategory(prev => prev === menuName ? "All" : menuName);
  };

  return (
    <div className='category-filter' id='category-filter'>
      <div className="category-filter-header">
        <h1>Explore Our Menu</h1>
        <p className='category-filter-text'>
          Choose from a diverse menu featuring a delectable array of dishes. 
          Our mission is to satisfy your cravings and elevate your dining experience, 
          one delicious meal at a time.
        </p>
      </div>

      <div className="category-filter-list">
        {/* "All" Category Button */}
        <div 
          onClick={() => setCategory("All")} 
          className={`category-filter-item ${category === "All" ? "active" : ""}`}
        >
          <div className="category-image-wrapper">
            <div className="all-category-icon">🍽️</div>
          </div>
          <p>All</p>
        </div>

        {/* Dynamic Category Buttons from menu_list */}
        {menu_list.map((item, index) => (
          <div 
            onClick={() => handleCategoryClick(item.menu_name)} 
            key={index} 
            className={`category-filter-item ${category === item.menu_name ? "active" : ""}`}
          >
            <div className="category-image-wrapper">
              <img 
                src={item.menu_image} 
                alt={item.menu_name}
                loading="lazy"
              />
            </div>
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr className="category-divider" />
    </div>
  );
};

export default CategoryFilter;

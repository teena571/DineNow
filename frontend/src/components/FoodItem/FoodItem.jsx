import React, { useContext } from 'react'
import './FoodItem.css'
import { assets , foodImageMap} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,price,description,image}) => {

    // const [itemCount,setItemCount] = useState(0)
    // not used since a new state is create for every situation
    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);
    // protect against cartItems being undefined
    const count = cartItems?.[id] ?? 0;

    // Safely derive imageSrc (image may already be a full path)
    let imageSrc = image;
    if (typeof image === 'string' && image.length) {
      try {
        const imageKey = image.replace(/^\d+/, '');
        imageSrc = foodImageMap[imageKey] || image;
      } catch (e) {
        imageSrc = image;
      }
    }

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img className='food-item-image' src={imageSrc} alt={name || "food"} />
        {!count
          ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
          : <div className='food-item-counter'>
            <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
            <p>{count}</p>
            <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
          </div>
        }
      </div>

    <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
    </div>

    </div>
  )
}

export default FoodItem




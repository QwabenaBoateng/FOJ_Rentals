import { RentalItem } from '../types';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

interface RentalCardProps {
  item: RentalItem;
  onAddToCart: (item: RentalItem) => void;
}

export const RentalCard = ({ item, onAddToCart }: RentalCardProps) => {
  return (
    <div className="rental-card">
      <div className="rental-card-image">
        <img src={item.image} alt={item.name} />
        {item.stock === 0 && <div className="out-of-stock">Out of Stock</div>}
      </div>
      <div className="rental-card-content">
        <h3>{item.name}</h3>
        <p className="description">{item.description}</p>
        
        <div className="rating">
          <FaStar className="star-icon" />
          <span>{item.rating.toFixed(1)}</span>
          <span className="reviews">({item.reviews} reviews)</span>
        </div>
        
        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart(item)}
          disabled={item.stock === 0}
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { CartItem } from '../types';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItemComponent = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemComponentProps) => {
  const getPrice = () => {
    switch (item.rentalPeriod) {
      case 'day':
        return item.pricePerDay * item.quantity;
      case 'week':
        return item.pricePerWeek * item.quantity;
      case 'month':
        return item.pricePerMonth * item.quantity;
      default:
        return 0;
    }
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p className="rental-period">{item.rentalPeriod.toUpperCase()}</p>
        <p className="dates">
          {item.startDate.toLocaleDateString()} - {item.endDate.toLocaleDateString()}
        </p>
      </div>
      
      <div className="cart-item-quantity">
        <button onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}>
          <FaMinus />
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.quantity + 1)}>
          <FaPlus />
        </button>
      </div>
      
      <div className="cart-item-price">
        <span className="total">₵{getPrice().toFixed(2)}</span>
      </div>
      
      <button className="remove-btn" onClick={onRemove}>
        <FaTrash />
      </button>
    </div>
  );
};

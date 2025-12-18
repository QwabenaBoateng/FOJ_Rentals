import { useState } from 'react';
import { useStore } from '../store/useStore';
import { CartItemComponent } from '../components/CartItemComponent';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const { cart, removeFromCart, updateCartItem, clearCart } = useStore();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    deliveryDate: '',
    returnDate: '',
    notes: '',
  });

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price =
        item.rentalPeriod === 'day'
          ? item.pricePerDay
          : item.rentalPeriod === 'week'
          ? item.pricePerWeek
          : item.pricePerMonth;
      return total + price * item.quantity;
    }, 0);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order creation
    console.log('Checkout:', { items: cart, ...formData });
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <FaArrowLeft /> Continue Shopping
        </button>
        <h1>Your Rental Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/')}>Browse Rentals</button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onUpdateQuantity={(quantity) => updateCartItem(item.id, quantity)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-line">
                <span>Delivery Fee:</span>
                <span>$25.00</span>
              </div>
              
              <div className="summary-line">
                <span>Tax (10%):</span>
                <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="summary-total">
                <span>Total:</span>
                <span>${(calculateTotal() * 1.1 + 25).toFixed(2)}</span>
              </div>

              {!showCheckout ? (
                <button
                  className="checkout-btn"
                  onClick={() => setShowCheckout(true)}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <form onSubmit={handleCheckout} className="checkout-form">
                  <div className="form-group">
                    <label>Delivery Date</label>
                    <input
                      type="date"
                      required
                      value={formData.deliveryDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Return Date</label>
                    <input
                      type="date"
                      required
                      value={formData.returnDate}
                      onChange={(e) =>
                        setFormData({ ...formData, returnDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Special Requests/Notes</label>
                    <textarea
                      placeholder="Any special instructions..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Place Order
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowCheckout(false)}
                  >
                    Back
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

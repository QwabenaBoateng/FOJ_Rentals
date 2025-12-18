import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

export const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-card">
          <FaCheckCircle className="success-icon" />
          
          <h1>Order Confirmed!</h1>
          <p>Thank you for your rental order.</p>
          
          <div className="confirmation-details">
            <p>Your order has been successfully placed.</p>
            <p>We'll send you a confirmation email shortly with all the details.</p>
            <p>Expected delivery: 2-3 business days</p>
          </div>

          <div className="confirmation-actions">
            <button
              className="btn-primary"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/')}
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

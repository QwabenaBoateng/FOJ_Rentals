import { useState, useEffect } from 'react';
import { Order } from '../../types';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';

export const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all');

  useEffect(() => {
    // Mock orders data
    const mockOrders: Order[] = [
      {
        id: 'ORD-001',
        customerId: 'CUST-001',
        items: [],
        totalAmount: 450.5,
        status: 'confirmed',
        createdAt: new Date('2025-12-01'),
        deliveryDate: new Date('2025-12-05'),
        returnDate: new Date('2025-12-12'),
        notes: 'Wedding event',
      },
      {
        id: 'ORD-002',
        customerId: 'CUST-002',
        items: [],
        totalAmount: 320.0,
        status: 'shipped',
        createdAt: new Date('2025-12-02'),
        deliveryDate: new Date('2025-12-06'),
        returnDate: new Date('2025-12-13'),
        notes: 'Corporate event',
      },
      {
        id: 'ORD-003',
        customerId: 'CUST-003',
        items: [],
        totalAmount: 580.75,
        status: 'pending',
        createdAt: new Date('2025-12-08'),
        deliveryDate: new Date('2025-12-10'),
        returnDate: new Date('2025-12-17'),
        notes: 'Birthday party',
      },
      {
        id: 'ORD-004',
        customerId: 'CUST-004',
        items: [],
        totalAmount: 750.25,
        status: 'delivered',
        createdAt: new Date('2025-11-25'),
        deliveryDate: new Date('2025-11-28'),
        returnDate: new Date('2025-12-05'),
        notes: 'Anniversary celebration',
      },
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const filteredOrders = orders.filter(
    (order) => filterStatus === 'all' || order.status === filterStatus
  );

  const getStatusColor = (status: Order['status']) => {
    const colors: Record<Order['status'], string> = {
      pending: '#ff9800',
      confirmed: '#2196f3',
      shipped: '#9c27b0',
      delivered: '#4caf50',
      cancelled: '#f44336',
    };
    return colors[status];
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="order-management">
      <div className="order-header">
        <h1>Order Management</h1>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Orders ({orders.length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filterStatus === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('confirmed')}
          >
            Confirmed
          </button>
          <button
            className={`filter-btn ${filterStatus === 'shipped' ? 'active' : ''}`}
            onClick={() => setFilterStatus('shipped')}
          >
            Shipped
          </button>
          <button
            className={`filter-btn ${filterStatus === 'delivered' ? 'active' : ''}`}
            onClick={() => setFilterStatus('delivered')}
          >
            Delivered
          </button>
        </div>
      </div>

      <div className="order-content">
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Delivery Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customerId}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{order.deliveryDate.toLocaleDateString()}</td>
                  <td>{order.returnDate.toLocaleDateString()}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="view-btn"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
          <div className="order-details">
            <div className="details-header">
              <h3>Order Details: {selectedOrder.id}</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className="details-content">
              <div className="detail-row">
                <span>Customer ID:</span>
                <span>{selectedOrder.customerId}</span>
              </div>
              <div className="detail-row">
                <span>Total Amount:</span>
                <span>${selectedOrder.totalAmount.toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <span>Created:</span>
                <span>{selectedOrder.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <span>Delivery Date:</span>
                <span>{selectedOrder.deliveryDate.toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <span>Return Date:</span>
                <span>{selectedOrder.returnDate.toLocaleDateString()}</span>
              </div>
              {selectedOrder.notes && (
                <div className="detail-row">
                  <span>Notes:</span>
                  <span>{selectedOrder.notes}</span>
                </div>
              )}

              <div className="status-update">
                <label>Update Status:</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedOrder.id,
                      e.target.value as Order['status']
                    )
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { Order } from '../../types';
import { FaEye, FaCheck, FaTimes, FaTruck, FaBox, FaClock } from 'react-icons/fa';
import './OrderManagement.css';

export const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <FaClock />;
      case 'confirmed':
        return <FaCheck />;
      case 'delivered':
        return <FaBox />;
      case 'cancelled':
        return <FaTimes />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="order-management-loading">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <div className="order-management">
      {/* Header */}
      <div className="order-header">
        <div className="header-content">
          <h1>Order Management</h1>
          <p className="header-subtitle">Manage and track all rental orders</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Order ID or Customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filter Buttons */}
      <div className="filter-section">
        <div className="filter-buttons">
          {[
            { status: 'all' as const, label: 'All Orders', count: statusCounts.all },
            { status: 'pending' as const, label: 'Pending', count: statusCounts.pending },
            { status: 'confirmed' as const, label: 'Confirmed', count: statusCounts.confirmed },
            { status: 'delivered' as const, label: 'Delivered', count: statusCounts.delivered },
          ].map((filter) => (
            <button
              key={filter.status}
              className={`filter-btn ${filterStatus === filter.status ? 'active' : ''}`}
              onClick={() => setFilterStatus(filter.status)}
            >
              <span className="filter-label">{filter.label}</span>
              <span className="filter-count">{filter.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-section">
        {filteredOrders.length > 0 ? (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Delivery Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="order-row">
                    <td className="order-id-cell">
                      <span className="order-id-badge">{order.id}</span>
                    </td>
                    <td>
                      <span className="customer-id">{order.customerId}</span>
                    </td>
                    <td>
                      <span className="amount">₵{order.totalAmount.toFixed(2)}</span>
                    </td>
                    <td>
                      <span className="date">{order.deliveryDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                    </td>
                    <td>
                      <span className="date">{order.returnDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                    </td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="action-cell">
                      <button
                        className="view-btn"
                        onClick={() => setSelectedOrder(order)}
                        title="View details"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <FaBox className="empty-icon" />
            <h3>No Orders Found</h3>
            <p>There are no orders matching your filters. Try adjusting your search.</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button
                className="close-btn"
                onClick={() => setSelectedOrder(null)}
                title="Close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Order Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Order ID</label>
                    <span className="detail-value order-id-badge">{selectedOrder.id}</span>
                  </div>
                  <div className="detail-item">
                    <label>Customer ID</label>
                    <span className="detail-value">{selectedOrder.customerId}</span>
                  </div>
                  <div className="detail-item">
                    <label>Total Amount</label>
                    <span className="detail-value amount">₵{selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Current Status</label>
                    <span className={`status-badge status-${selectedOrder.status}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Dates</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Order Date</label>
                    <span className="detail-value">{selectedOrder.createdAt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</span>
                  </div>
                  <div className="detail-item">
                    <label>Delivery Date</label>
                    <span className="detail-value">{selectedOrder.deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</span>
                  </div>
                  <div className="detail-item">
                    <label>Return Date</label>
                    <span className="detail-value">{selectedOrder.returnDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="detail-section">
                  <h3>Notes</h3>
                  <p className="notes-text">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="detail-section">
                <h3>Update Status</h3>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedOrder.id,
                      e.target.value as Order['status']
                    )
                  }
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-close"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

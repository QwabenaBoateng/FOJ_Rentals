import { useState, useEffect } from 'react';
import { FaBox, FaShoppingCart, FaChartLine, FaUsers, FaSignOutAlt, FaEye } from 'react-icons/fa';
import { useStore } from '../../store/useStore';
import './AdminDashboard.css';

interface AdminDashboardProps {
    username?: string;
    onLogout?: () => void;
}

interface DashboardStats {
    totalOrders: number;
    totalRevenue: number;
    activeRentals: number;
    totalCustomers: number;
}

export const AdminDashboard = ({ username = 'Admin', onLogout }: AdminDashboardProps) => {
    const { orders, items } = useStore();
    const [stats, setStats] = useState<DashboardStats>({
        totalOrders: 0,
        totalRevenue: 0,
        activeRentals: 0,
        totalCustomers: 0
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);

    useEffect(() => {
        calculateStats();
    }, [orders, items]);

    const calculateStats = () => {
        // Calculate total orders
        const totalOrders = orders.length;

        // Calculate total revenue
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        // Calculate active rentals (orders with status pending or confirmed)
        const activeRentals = orders.filter(
            order => order.status === 'pending' || order.status === 'confirmed'
        ).length;

        // Count unique customers
        const uniqueCustomers = new Set(orders.map(order => order.customerId)).size;

        setStats({
            totalOrders,
            totalRevenue,
            activeRentals,
            totalCustomers: uniqueCustomers
        });

        // Get recent orders (last 5)
        const recent = [...orders].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ).slice(0, 5);
        
        setRecentOrders(recent);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: 'GHS'
        }).format(amount);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'status-pending';
            case 'confirmed':
                return 'status-confirmed';
            case 'shipped':
                return 'status-shipped';
            case 'delivered':
                return 'status-delivered';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return 'status-pending';
        }
    };

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>Dashboard</h1>
                    <p>Welcome back, {username}!</p>
                </div>
                <div className="header-right">
                    {onLogout && (
                        <button className="btn-logout" onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon icon-orders">
                        <FaShoppingCart />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Orders</p>
                        <p className="stat-value">{stats.totalOrders}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon icon-revenue">
                        <FaChartLine />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Revenue</p>
                        <p className="stat-value">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon icon-active">
                        <FaBox />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Active Rentals</p>
                        <p className="stat-value">{stats.activeRentals}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon icon-customers">
                        <FaUsers />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Customers</p>
                        <p className="stat-value">{stats.totalCustomers}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-grid">
                {/* Recent Orders */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>Recent Orders</h2>
                    </div>
                    <div className="card-body">
                        {recentOrders.length > 0 ? (
                            <div className="orders-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td className="order-id">{order.id.slice(0, 8)}...</td>
                                                <td>{order.items.length} item(s)</td>
                                                <td className="order-amount">{formatCurrency(order.totalAmount)}</td>
                                                <td>
                                                    <span className={`status-badge ${getStatusBadgeColor(order.status)}`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="order-date">{formatDate(order.createdAt)}</td>
                                                <td>
                                                    <button className="btn-view" title="View details">
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
                                <p>No orders yet. Start managing your rentals!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Inventory Summary */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>Inventory Summary</h2>
                    </div>
                    <div className="card-body">
                        {items.length > 0 ? (
                            <div className="inventory-list">
                                {items.slice(0, 5).map((item) => (
                                    <div key={item.id} className="inventory-item">
                                        <div className="item-info">
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-category">{item.category}</p>
                                        </div>
                                        <div className={`stock-badge ${item.stock > 5 ? 'in-stock' : item.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                                            {item.stock} items
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>No items in inventory. Add items to get started!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Additional Info Cards */}
            <div className="info-grid">
                <div className="info-card">
                    <div className="info-icon">
                        <FaBox />
                    </div>
                    <h3>Manage Products</h3>
                    <p>Add, edit, or remove rental items from your inventory</p>
                </div>

                <div className="info-card">
                    <div className="info-icon">
                        <FaShoppingCart />
                    </div>
                    <h3>View Orders</h3>
                    <p>Track and manage all customer rental orders</p>
                </div>

                <div className="info-card">
                    <div className="info-icon">
                        <FaUsers />
                    </div>
                    <h3>Manage Admins</h3>
                    <p>Add or remove admin users from the system</p>
                </div>
            </div>
        </div>
    );
};

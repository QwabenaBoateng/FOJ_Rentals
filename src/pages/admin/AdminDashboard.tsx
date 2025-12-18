import { useState, useEffect } from 'react';
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign } from 'react-icons/fa';
import { AdminStats } from '../../types';

export const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock stats data
    const mockStats: AdminStats = {
      totalRevenue: 45250.5,
      totalOrders: 328,
      activeRentals: 47,
      totalCustomers: 1256,
      monthlyRevenue: [3500, 4200, 3800, 5100, 6200, 7500],
    };

    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's your business overview.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon revenue">
            <FaDollarSign />
          </div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-value">${stats?.totalRevenue.toFixed(2)}</p>
            <span className="stat-change">+12% from last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <FaShoppingCart />
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats?.totalOrders}</p>
            <span className="stat-change">+5% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active">
            <FaBox />
          </div>
          <div className="stat-content">
            <h3>Active Rentals</h3>
            <p className="stat-value">{stats?.activeRentals}</p>
            <span className="stat-change">Currently ongoing</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon customers">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>Total Customers</h3>
            <p className="stat-value">{stats?.totalCustomers}</p>
            <span className="stat-change">+8% new customers</span>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-card">
          <h3>Monthly Revenue Trend</h3>
          <div className="chart-placeholder">
            <p>Revenue Chart - Last 6 Months</p>
            {stats?.monthlyRevenue.map((revenue, index) => (
              <div key={index} className="chart-bar">
                <div
                  className="bar"
                  style={{
                    height: `${(revenue / 10000) * 100}%`,
                  }}
                >
                  <span>${revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Category Distribution</h3>
          <div className="category-distribution">
            <div className="dist-item">
              <span>Chairs</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '35%' }}></div>
              </div>
              <span className="percentage">35%</span>
            </div>
            <div className="dist-item">
              <span>Tables</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '25%' }}></div>
              </div>
              <span className="percentage">25%</span>
            </div>
            <div className="dist-item">
              <span>Linens</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '20%' }}></div>
              </div>
              <span className="percentage">20%</span>
            </div>
            <div className="dist-item">
              <span>Decorations</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '12%' }}></div>
              </div>
              <span className="percentage">12%</span>
            </div>
            <div className="dist-item">
              <span>Other</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '8%' }}></div>
              </div>
              <span className="percentage">8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

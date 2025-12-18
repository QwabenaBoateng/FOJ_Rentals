import { useState } from 'react';
import { FaBox, FaShoppingCart, FaChartBar, FaCog, FaTag } from 'react-icons/fa';
import { AdminDashboard } from './AdminDashboard';
import { InventoryManagement } from './InventoryManagement';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';

type AdminTab = 'dashboard' | 'inventory' | 'products' | 'orders' | 'settings';

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'inventory':
        return <InventoryManagement />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'settings':
        return <div className="settings-page"><h1>Settings</h1><p>Admin settings coming soon...</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>

        <nav className="admin-nav">
          <button
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartBar /> Dashboard
          </button>
          <button
            className={`nav-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <FaBox /> Inventory
          </button>
          <button
            className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <FaTag /> Products
          </button>
          <button
            className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaShoppingCart /> Orders
          </button>
          <button
            className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FaCog /> Settings
          </button>
        </nav>
      </div>

      <div className="admin-main">
        {renderContent()}
      </div>
    </div>
  );
};

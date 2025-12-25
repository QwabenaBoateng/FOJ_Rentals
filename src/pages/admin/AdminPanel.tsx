import { useState } from 'react';
import { FaBox, FaShoppingCart, FaChartBar, FaCog, FaTag, FaUsers, FaSignOutAlt, FaImage } from 'react-icons/fa';
import { AdminDashboard } from './AdminDashboard';
import { InventoryManagement } from './InventoryManagement';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';
import { ManageAdmins } from './ManageAdmins';
import { ImageManagement } from './ImageManagement';
import './AdminPanel.css';

type AdminTab = 'dashboard' | 'inventory' | 'products' | 'orders' | 'settings' | 'admins' | 'images';

interface AdminPanelProps {
  username?: string;
  onLogout?: () => void;
}

export const AdminPanel = ({ username = 'Admin', onLogout }: AdminPanelProps) => {
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
      case 'admins':
        return <ManageAdmins />;
      case 'images':
        return <ImageManagement />;
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
          <button
            className={`nav-btn ${activeTab === 'admins' ? 'active' : ''}`}
            onClick={() => setActiveTab('admins')}
          >
            <FaUsers /> Manage Admins
          </button>
          <button
            className={`nav-btn ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            <FaImage /> Banner Images
          </button>
        </nav>

        <div className="admin-user-section">
          <div className="admin-user-info">
            <p className="admin-username">{username}</p>
            <p className="admin-role">Administrator</p>
          </div>
          {onLogout && (
            <button className="btn-logout" onClick={onLogout} title="Logout">
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </div>

      <div className="admin-main">
        {renderContent()}
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { RentalItem } from '../../types';
import { FaPencilAlt, FaTrash, FaPlus, FaTimes, FaSearch, FaBox } from 'react-icons/fa';
import './InventoryManagement.css';

// Placeholder image generator
const getPlaceholderImage = (text: string) => {
  const colors = ['#667eea', '#764ba2', '#d946a6', '#c2185b', '#f97316', '#0ea5e9'];
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = colors[hash % colors.length];
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='${encodeURIComponent(color)}' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='white' font-weight='bold'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
};

export const InventoryManagement = () => {
  const [items, setItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<RentalItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: 'chairs' as const,
    description: '',
    pricePerDay: 0,
    pricePerWeek: 0,
    pricePerMonth: 0,
    stock: 0,
  });

  useEffect(() => {
    // Mock inventory data
    const mockItems: RentalItem[] = [
      {
        id: '1',
        name: 'Chiavari Chairs',
        category: 'chairs',
        description: 'Elegant Chiavari chairs',
        image: getPlaceholderImage('Chair'),
        pricePerDay: 2,
        pricePerWeek: 10,
        pricePerMonth: 30,
        stock: 100,
        rating: 4.8,
        reviews: 245,
      },
      {
        id: '2',
        name: 'Round Banquet Tables',
        category: 'tables',
        description: '60" round tables',
        image: getPlaceholderImage('Table'),
        pricePerDay: 15,
        pricePerWeek: 70,
        pricePerMonth: 200,
        stock: 50,
        rating: 4.6,
        reviews: 189,
      },
    ];

    setTimeout(() => {
      setItems(mockItems);
      setLoading(false);
    }, 500);
  }, []);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                ...formData,
                image: getPlaceholderImage(formData.name),
              }
            : item
        )
      );
    } else {
      const newItem: RentalItem = {
        id: Date.now().toString(),
        ...formData,
        image: getPlaceholderImage(formData.name),
        rating: 0,
        reviews: 0,
      };
      setItems([...items, newItem]);
    }
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'chairs',
      description: '',
      pricePerDay: 0,
      pricePerWeek: 0,
      pricePerMonth: 0,
      stock: 0,
    });
    setEditingItem(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (item: RentalItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category as typeof formData.category,
      description: item.description,
      pricePerDay: item.pricePerDay,
      pricePerWeek: item.pricePerWeek,
      pricePerMonth: item.pricePerMonth,
      stock: item.stock,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <div className="inventory-management-loading">
        <div className="loading-spinner"></div>
        <p>Loading inventory...</p>
      </div>
    );
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'out-of-stock';
    if (stock < 10) return 'low-stock';
    return 'in-stock';
  };

  return (
    <div className="inventory-management">
      {/* Header */}
      <div className="inventory-header">
        <div className="header-info">
          <h1>Inventory Management</h1>
          <p className="header-subtitle">Manage rental items and stock levels</p>
        </div>
        <button className="btn-add-item" onClick={openAddModal}>
          <FaPlus /> Add New Item
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar-inventory">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by item name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input-inventory"
        />
      </div>

      {/* Inventory Table */}
      <div className="inventory-section">
        {filteredItems.length === 0 ? (
          <div className="empty-state-inventory">
            <FaBox className="empty-icon" />
            <h3>No Items Found</h3>
            <p>Add your first inventory item to get started</p>
          </div>
        ) : (
          <div className="inventory-table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Daily</th>
                  <th>Weekly</th>
                  <th>Monthly</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="inventory-row">
                    <td className="item-name">
                      <strong>{item.name}</strong>
                    </td>
                    <td className="item-category">
                      <span className="category-badge">{item.category}</span>
                    </td>
                    <td className="item-stock">{item.stock} units</td>
                    <td className="item-price">₵{item.pricePerDay.toFixed(2)}</td>
                    <td className="item-price">₵{item.pricePerWeek.toFixed(2)}</td>
                    <td className="item-price">₵{item.pricePerMonth.toFixed(2)}</td>
                    <td>
                      <span className={`stock-status ${getStockStatus(item.stock)}`}>
                        {item.stock === 0 ? 'Out of Stock' : item.stock < 10 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button
                        className="btn-icon btn-edit-inv"
                        onClick={() => openEditModal(item)}
                        title="Edit Item"
                        data-tooltip="Edit"
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        className="btn-icon btn-delete-inv"
                        onClick={() => handleDelete(item.id)}
                        title="Delete Item"
                        data-tooltip="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay-inventory" onClick={closeModal}>
          <div className="modal-content-inventory" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-inventory">
              <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
              <button className="close-btn-inventory" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="inventory-form">
              <div className="modal-body-inventory">
                <div className="form-row-inv">
                  <div className="form-group-inv">
                    <label htmlFor="name">Item Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter item name"
                      className="form-input-inv"
                    />
                  </div>

                  <div className="form-group-inv">
                    <label htmlFor="category">Category *</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                        })
                      }
                      className="form-select-inv"
                    >
                      <option value="chairs">Chairs</option>
                      <option value="tables">Tables</option>
                      <option value="chair-covers">Chair Covers</option>
                      <option value="chafing-dishes">Chafing Dishes</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-inv">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter item description"
                    rows={3}
                    className="form-textarea-inv"
                  />
                </div>

                <div className="form-row-inv">
                  <div className="form-group-inv">
                    <label htmlFor="pricePerDay">Daily Price *</label>
                    <input
                      type="number"
                      id="pricePerDay"
                      step="0.01"
                      required
                      value={formData.pricePerDay}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricePerDay: parseFloat(e.target.value),
                        })
                      }
                      placeholder="0.00"
                      className="form-input-inv"
                    />
                  </div>

                  <div className="form-group-inv">
                    <label htmlFor="pricePerWeek">Weekly Price *</label>
                    <input
                      type="number"
                      id="pricePerWeek"
                      step="0.01"
                      required
                      value={formData.pricePerWeek}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricePerWeek: parseFloat(e.target.value),
                        })
                      }
                      placeholder="0.00"
                      className="form-input-inv"
                    />
                  </div>
                </div>

                <div className="form-row-inv">
                  <div className="form-group-inv">
                    <label htmlFor="pricePerMonth">Monthly Price *</label>
                    <input
                      type="number"
                      id="pricePerMonth"
                      step="0.01"
                      required
                      value={formData.pricePerMonth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricePerMonth: parseFloat(e.target.value),
                        })
                      }
                      placeholder="0.00"
                      className="form-input-inv"
                    />
                  </div>

                  <div className="form-group-inv">
                    <label htmlFor="stock">Stock Quantity *</label>
                    <input
                      type="number"
                      id="stock"
                      required
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: parseInt(e.target.value),
                        })
                      }
                      placeholder="0"
                      className="form-input-inv"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer-inventory">
                <button type="button" className="btn-cancel-inv" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-inv">
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

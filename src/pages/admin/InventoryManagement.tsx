import { useState, useEffect } from 'react';
import { RentalItem } from '../../types';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export const InventoryManagement = () => {
  const [items, setItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<RentalItem | null>(null);
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
        image: 'https://via.placeholder.com/100?text=Chair',
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
        image: 'https://via.placeholder.com/100?text=Table',
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
                image: 'https://via.placeholder.com/100?text=' + formData.name,
              }
            : item
        )
      );
      setEditingItem(null);
    } else {
      const newItem: RentalItem = {
        id: Date.now().toString(),
        ...formData,
        image: 'https://via.placeholder.com/100?text=' + formData.name,
        rating: 0,
        reviews: 0,
      };
      setItems([...items, newItem]);
    }
    setFormData({
      name: '',
      category: 'chairs',
      description: '',
      pricePerDay: 0,
      pricePerWeek: 0,
      pricePerMonth: 0,
      stock: 0,
    });
    setShowForm(false);
  };

  const handleEdit = (item: RentalItem) => {
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
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  if (loading) {
    return <div className="loading">Loading inventory...</div>;
  }

  return (
    <div className="inventory-management">
      <div className="inventory-header">
        <h1>Inventory Management</h1>
        <button
          className="add-item-btn"
          onClick={() => {
            setEditingItem(null);
            setShowForm(!showForm);
          }}
        >
          <FaPlus /> {showForm ? 'Cancel' : 'Add New Item'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddItem} className="inventory-form">
          <div className="form-row">
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as any,
                  })
                }
              >
                <option value="chairs">Chairs</option>
                <option value="tables">Tables</option>
                <option value="chair-covers">Chair Covers</option>
                <option value="chafing-dishes">Chafing Dishes</option>
                <option value="linens">Linens</option>
                <option value="decorations">Decorations</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price Per Day ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.pricePerDay}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricePerDay: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Price Per Week ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.pricePerWeek}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricePerWeek: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Price Per Month ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.pricePerMonth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricePerMonth: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      )}

      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Daily Price</th>
              <th>Weekly Price</th>
              <th>Monthly Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>${item.pricePerDay}</td>
                <td>${item.pricePerWeek}</td>
                <td>${item.pricePerMonth}</td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

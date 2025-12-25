import { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useStore } from '../../store/useStore';
import { Admin } from '../../types';
import './ManageAdmins.css';

export const ManageAdmins = () => {
  const { admins, addAdmin, deleteAdmin } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Initialize with some mock admins if empty
  useEffect(() => {
    if (admins.length === 0) {
      const mockAdmins: Admin[] = [
        {
          id: 'fd9dd9ab-0fb0-46e9-9a9a-82ae0141d7f3',
          email: 'admin@gmail.com',
          name: 'admin@gmail.com',
          role: 'super_admin',
          createdAt: new Date(),
          isActive: true,
        },
      ];
      useStore.setState({ admins: mockAdmins });
    }
  }, [admins.length]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.username || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    const newAdmin: Admin = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.username,
      role: 'admin',
      createdAt: new Date(),
      isActive: true,
    };
    addAdmin(newAdmin);

    setFormData({ username: '', email: '', password: '' });
    setShowForm(false);
  };

  const handleDelete = (adminId: string) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      deleteAdmin(adminId);
    }
  };

  return (
    <div className="manage-admins-container">
      <div className="manage-admins-header">
        <div className="header-content">
          <h1>Manage Admins</h1>
          <p className="header-subtitle">Create and remove admin records. Creating with a password will also create an auth user.</p>
        </div>
        <button className="btn-add-admin" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> Add Admin
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add Admin</h2>
            <form onSubmit={handleAddAdmin}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Set a password"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ username: '', email: '', password: '' });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admins-section">
        <h2>Existing Admins</h2>
        <div className="admins-list">
          {admins.length === 0 ? (
            <p className="no-admins">No admins found. Add a new admin to get started.</p>
          ) : (
            <table className="admins-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>User ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td className="user-id">{admin.id}</td>
                    <td className="actions-cell">
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(admin.id)}
                        title="Delete admin"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

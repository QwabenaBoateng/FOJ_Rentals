import { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaTimes, FaBox } from 'react-icons/fa';
import './ProductManagement.css';

export const ProductManagement = () => {
  const categories = [
    'Chairs',
    'Tables',
    'Chair Covers',
    'Chafing Dishes'
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null as File | null,
    imagePreview: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct = {
      id: editingProduct?.id || Date.now(),
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: selectedCategory,
      image: formData.imagePreview || editingProduct?.image
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      setProducts(prev => [...prev, newProduct]);
    }

    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: null,
      imagePreview: ''
    });
    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: null,
      imagePreview: product.image
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const categoryProducts = products.filter(p => p.category === selectedCategory);

  return (
    <div className="product-management">
      {/* Header */}
      <div className="product-header">
        <h1>Product Management</h1>
        <p className="header-subtitle">Manage rental products and inventory</p>
      </div>

      <div className="product-layout">
        {/* Categories Sidebar */}
        <div className="categories-sidebar">
          <h3>Categories</h3>
          <div className="categories-list">
            {categories.map(category => {
              const count = products.filter(p => p.category === category).length;
              return (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span className="category-name">{category}</span>
                  <span className="category-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Content */}
        <div className="products-content">
          <div className="products-header">
            <div className="header-info">
              <h2>{selectedCategory}</h2>
              <p className="product-count">{categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''}</p>
            </div>
            <button 
              className="btn-add-product"
              onClick={openAddModal}
            >
              <FaPlus /> Add Product
            </button>
          </div>

          {/* Products Grid */}
          <div className="products-section">
            {categoryProducts.length === 0 ? (
              <div className="empty-state">
                <FaBox className="empty-icon" />
                <h3>No Products Yet</h3>
                <p>Start by adding your first product to {selectedCategory.toLowerCase()}</p>
              </div>
            ) : (
              <div className="products-grid">
                {categoryProducts.map(product => (
                  <div key={product.id} className="product-card">
                    {product.image && (
                      <div className="product-image-container">
                        <img src={product.image} alt={product.name} className="product-image" />
                      </div>
                    )}
                    <div className="product-card-content">
                      <h3 className="product-name">{product.name}</h3>
                      {product.description && (
                        <p className="product-description">{product.description}</p>
                      )}
                      <div className="product-footer">
                        <span className="product-price">₵{parseFloat(product.price).toFixed(2)}</span>
                        <div className="product-actions">
                          <button 
                            className="btn-icon btn-edit"
                            onClick={() => openEditModal(product)}
                            title="Edit Product"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="btn-icon btn-delete"
                            onClick={() => handleDeleteProduct(product.id)}
                            title="Delete Product"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay-product" onClick={closeModal}>
          <div className="modal-content-product" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-product">
              <div>
                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <p className="modal-category-label">Category: <strong>{selectedCategory}</strong></p>
              </div>
              <button className="close-btn-product" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="product-form">
              <div className="modal-body-product">
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={3}
                    className="form-textarea"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Price (per unit) *</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="image">Product Image</label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-input"
                    />
                  </div>
                </div>

                {formData.imagePreview && (
                  <div className="image-preview">
                    <img src={formData.imagePreview} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="modal-footer-product">
                <button type="button" className="btn-cancel-product" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-product">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

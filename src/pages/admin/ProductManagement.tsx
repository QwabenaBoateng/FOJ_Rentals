import { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import './ProductManagement.css';

export const ProductManagement = () => {
  const categories = [
    'Chairs',
    'Tables',
    'Chair Covers',
    'Chafing Dishes',
    'Linens',
    'Decorations'
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
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
    
    if (!formData.name || !formData.price || !formData.image) {
      alert('Please fill in all fields and select an image');
      return;
    }

    // Create FormData for file upload
    const uploadFormData = new FormData();
    uploadFormData.append('image', formData.image);
    uploadFormData.append('name', formData.name);
    uploadFormData.append('description', formData.description);
    uploadFormData.append('price', formData.price);
    uploadFormData.append('category', selectedCategory);

    try {
      // TODO: Update with your actual API endpoint for uploading products
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   body: uploadFormData
      // });
      
      // For now, add to local state for preview
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: selectedCategory,
        image: formData.imagePreview
      };

      setProducts(prev => [...prev, newProduct]);
      setFormData({
        name: '',
        description: '',
        price: '',
        image: null,
        imagePreview: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Failed to upload product');
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const categoryProducts = products.filter(p => p.category === selectedCategory);

  return (
    <div className="product-management">
      <h1>Products Management</h1>
      
      <div className="product-layout">
        {/* Categories Sidebar */}
        <div className="categories-sidebar">
          <h3>Categories</h3>
          <div className="categories-list">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Content */}
        <div className="products-content">
          <div className="products-header">
            <h2>{selectedCategory}</h2>
            <button 
              className="btn-add-product"
              onClick={() => setShowForm(!showForm)}
            >
              <FaPlus /> Add Product
            </button>
          </div>

          {/* Add Product Form */}
          {showForm && (
            <div className="product-form-container">
              <form onSubmit={handleAddProduct} className="product-form">
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
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
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Price *</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="image">Upload Image *</label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {formData.imagePreview && (
                  <div className="image-preview">
                    <img src={formData.imagePreview} alt="Preview" />
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="btn-submit">Upload Product</button>
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({
                        name: '',
                        description: '',
                        price: '',
                        image: null,
                        imagePreview: ''
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products List */}
          <div className="products-list">
            {categoryProducts.length === 0 ? (
              <p className="no-products">No products in this category yet.</p>
            ) : (
              <div className="products-grid">
                {categoryProducts.map(product => (
                  <div key={product.id} className="product-card">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="product-image" />
                    )}
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      {product.description && <p className="description">{product.description}</p>}
                      <p className="price">${parseFloat(product.price).toFixed(2)}</p>
                    </div>
                    <div className="product-actions">
                      <button className="btn-icon btn-edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button 
                        className="btn-icon btn-delete"
                        onClick={() => handleDeleteProduct(product.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

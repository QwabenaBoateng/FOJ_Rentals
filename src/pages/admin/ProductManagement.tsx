import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit, FaTimes, FaBox } from 'react-icons/fa';
import { useStore } from '../../store/useStore';
import './ProductManagement.css';

export const ProductManagement = () => {
  const categories = [
    'Chairs',
    'Tables',
    'Chair Covers',
    'Chafing Dishes'
  ];

  const { items, setItems } = useStore();
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

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('adminProducts');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        setProducts(parsed);
        syncProductsToStore(parsed);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
  }, []);

  // Sync products to store whenever products change
  const syncProductsToStore = (productsToSync: any[]) => {
    const rentalItems = productsToSync.map(product => ({
      id: product.id.toString(),
      name: product.name,
      category: mapCategoryToRentalItem(product.category),
      description: product.description || '',
      image: product.image || '',
      pricePerDay: parseFloat(product.price) || 0,
      pricePerWeek: parseFloat(product.price) * 5 || 0,
      pricePerMonth: parseFloat(product.price) * 20 || 0,
      stock: product.stock || 10,
      rating: product.rating || 4.5,
      reviews: product.reviews || 0
    }));
    
    // Merge with existing items, updating existing ones and adding new ones
    const existingItems = items.filter(item => 
      !productsToSync.some(p => p.id.toString() === item.id)
    );
    setItems([...existingItems, ...rentalItems]);
  };

  const mapCategoryToRentalItem = (category: string): 'chairs' | 'tables' | 'chair-covers' | 'chafing-dishes' => {
    const mapping: { [key: string]: 'chairs' | 'tables' | 'chair-covers' | 'chafing-dishes' } = {
      'Chairs': 'chairs',
      'Tables': 'tables',
      'Chair Covers': 'chair-covers',
      'Chafing Dishes': 'chafing-dishes'
    };
    return mapping[category] || 'chairs';
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: previewUrl
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

    // Convert image to base64 if a new file is selected
    let imageData = editingProduct?.image || '';
    if (formData.image) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target?.result as string;
        imageData = base64Image;
        
        const newProduct = {
          id: editingProduct?.id || Date.now(),
          name: formData.name,
          description: formData.description,
          price: formData.price,
          category: selectedCategory,
          image: base64Image,
          stock: editingProduct?.stock || 10,
          rating: editingProduct?.rating || 4.5,
          reviews: editingProduct?.reviews || 0
        };

        let updatedProducts;
        if (editingProduct) {
          updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
        } else {
          updatedProducts = [...products, newProduct];
        }

        setProducts(updatedProducts);
        localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
        
        // Sync to store
        syncProductsToStore(updatedProducts);
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('productsUpdated'));

        resetForm();
        setShowModal(false);
      };
      reader.onerror = () => {
        alert('Error reading image file. Please try again.');
      };
      reader.readAsDataURL(formData.image);
      return; // Exit early, will continue in reader.onload
    } else {
      // No new image, use existing or empty
      const newProduct = {
        id: editingProduct?.id || Date.now(),
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: selectedCategory,
        image: imageData,
        stock: editingProduct?.stock || 10,
        rating: editingProduct?.rating || 4.5,
        reviews: editingProduct?.reviews || 0
      };

      let updatedProducts;
      if (editingProduct) {
        updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
      } else {
        updatedProducts = [...products, newProduct];
      }

      setProducts(updatedProducts);
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
      
      // Sync to store
      syncProductsToStore(updatedProducts);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('productsUpdated'));

      resetForm();
      setShowModal(false);
    }
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
    
    // Reset file input
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
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
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
      
      // Sync to store
      syncProductsToStore(updatedProducts);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('productsUpdated'));
    }
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

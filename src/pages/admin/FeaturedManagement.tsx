import { useState, useEffect } from 'react';
import { FaPlus, FaBox, FaEdit, FaUpload, FaTimes } from 'react-icons/fa';
import { useStore } from '../../store/useStore';
import './FeaturedManagement.css';

interface FeaturedManagementProps {
  // Props can be added here if needed in the future
}

export const FeaturedManagement = ({ }: FeaturedManagementProps) => {
  const categories = [
    'Chairs',
    'Tables',
    'Chair Covers',
    'Chafing Dishes'
  ];

  const { setItems } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null as File | null,
    imagePreview: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('adminProducts');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        setAllProducts(parsed);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
  }, []);

  // Listen for product updates
  useEffect(() => {
    const handleProductsUpdated = () => {
      const savedProducts = localStorage.getItem('adminProducts');
      if (savedProducts) {
        try {
          const parsed = JSON.parse(savedProducts);
          setAllProducts(parsed);
        } catch (error) {
          console.error('Error loading products:', error);
        }
      }
    };

    window.addEventListener('productsUpdated', handleProductsUpdated);
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdated);
    };
  }, []);

  const mapCategoryToRentalItem = (category: string): 'chairs' | 'tables' | 'chair-covers' | 'chafing-dishes' => {
    const mapping: { [key: string]: 'chairs' | 'tables' | 'chair-covers' | 'chafing-dishes' } = {
      'Chairs': 'chairs',
      'Tables': 'tables',
      'Chair Covers': 'chair-covers',
      'Chafing Dishes': 'chafing-dishes'
    };
    return mapping[category] || 'chairs';
  };

  // Get products that match the selected category
  const getCategoryProducts = () => {
    const categoryKey = mapCategoryToRentalItem(selectedCategory);
    return allProducts.filter((p: any) => {
      const productCategory = mapCategoryToRentalItem(p.category);
      return productCategory === categoryKey;
    });
  };

  // Get count for a specific category
  const getCategoryCount = (category: string) => {
    const categoryKey = mapCategoryToRentalItem(category);
    return allProducts.filter((p: any) => {
      const productCategory = mapCategoryToRentalItem(p.category);
      return productCategory === categoryKey;
    }).length;
  };

  const categoryProducts = getCategoryProducts();
  const productCount = categoryProducts.length;

  const handleAddProduct = () => {
    // Open the add product modal
    setShowAddProductModal(true);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: null,
      imagePreview: ''
    });

    // Reset file input
    const fileInput = document.getElementById('productImageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
    resetForm();
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: previewUrl
      }));
    } else if (file) {
      alert('Please select a valid image file');
    }
  };

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Please fill in the product name');
      return;
    }

    setIsSubmitting(true);

    // Convert image to base64 if provided
    if (formData.image) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const base64Image = event.target?.result as string;
          const newProduct = {
            id: Date.now(),
            name: formData.name,
            description: formData.description,
            price: '0',
            category: selectedCategory,
            image: base64Image,
            stock: 10,
            rating: 4.5,
            reviews: 0
          };

          const updatedProducts = [...allProducts, newProduct];
          setAllProducts(updatedProducts);
          localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));

          // Sync to store
          syncProductsToStore(updatedProducts);

          // Dispatch custom event to notify other components
          window.dispatchEvent(new CustomEvent('productsUpdated'));

          setIsSubmitting(false);
          closeAddProductModal();
          alert('Feature added successfully!');
        } catch (error) {
          console.error('Error adding product:', error);
          alert('Failed to add product. Please try again.');
          setIsSubmitting(false);
        }
      };
      reader.onerror = () => {
        alert('Error reading image file. Please try again.');
        setIsSubmitting(false);
      };
      reader.readAsDataURL(formData.image);
    } else {
      // Add product without image
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        price: '0',
        category: selectedCategory,
        image: '',
        stock: 10,
        rating: 4.5,
        reviews: 0
      };

      const updatedProducts = [...allProducts, newProduct];
      setAllProducts(updatedProducts);
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));

      // Sync to store
      syncProductsToStore(updatedProducts);

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('productsUpdated'));

      setIsSubmitting(false);
      closeAddProductModal();
      alert('Product added successfully!');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const openImageModal = (product: any) => {
    setEditingProduct(product);
    setPreviewUrl(product.image || '');
    setSelectedFile(null);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setEditingProduct(null);
    setSelectedFile(null);
    setPreviewUrl('');
    
    // Reset file input
    const fileInput = document.getElementById('featuredImageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleUploadImage = () => {
    if (!editingProduct) return;

    if (!selectedFile && !previewUrl) {
      alert('Please select an image to upload');
      return;
    }

    setUploading(true);

    // If a new file is selected, convert it to base64
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const base64Image = event.target?.result as string;
          
          // Update the product with new image
          const updatedProducts = allProducts.map(p => 
            p.id === editingProduct.id 
              ? { ...p, image: base64Image }
              : p
          );

          setAllProducts(updatedProducts);
          localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
          
          // Sync to store
          syncProductsToStore(updatedProducts);
          
          // Dispatch custom event to notify other components
          window.dispatchEvent(new CustomEvent('productsUpdated'));

          setUploading(false);
          closeImageModal();
          alert('Image uploaded successfully!');
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
          setUploading(false);
        }
      };
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
        setUploading(false);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // No new file, just close modal
      setUploading(false);
      closeImageModal();
    }
  };

  const syncProductsToStore = (productsToSync: any[]) => {
    const mapCategoryToRentalItem = (category: string): 'chairs' | 'tables' | 'chair-covers' | 'chafing-dishes' => {
      const mapping: { [key: string]: 'chairs' | 'tables' | 'chair-covers' | 'chafing-dishes' } = {
        'Chairs': 'chairs',
        'Tables': 'tables',
        'Chair Covers': 'chair-covers',
        'Chafing Dishes': 'chafing-dishes'
      };
      return mapping[category] || 'chairs';
    };

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
    
    // Get current items from store to preserve non-admin products (like mock items)
    // Access store state directly to get latest items
    const currentItems = useStore.getState().items;
    const adminProductIds = new Set(rentalItems.map(item => item.id));
    
    // Filter out old admin products and add new/updated ones
    const nonAdminItems = currentItems.filter(item => !adminProductIds.has(item.id));
    
    setItems([...nonAdminItems, ...rentalItems]);
  };

  return (
    <div className="featured-management">
      <div className="featured-layout">
        {/* Categories Sidebar */}
        <div className="featured-categories-sidebar">
          <h3 className="categories-title">CATEGORIES</h3>
          <div className="featured-categories-list">
            {categories.map(category => {
              const count = getCategoryCount(category);
              return (
                <button
                  key={category}
                  className={`featured-category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span className="featured-category-name">{category}</span>
                  <span className="featured-category-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Content */}
        <div className="featured-products-content">
          <div className="featured-products-header">
            <div className="featured-header-info">
              <h2 className="featured-category-title">{selectedCategory}</h2>
              <p className="featured-product-count">{productCount} product{productCount !== 1 ? 's' : ''}</p>
            </div>
            <button 
              className="featured-btn-add-product"
              onClick={handleAddProduct}
            >
              <FaPlus /> Add Feature
            </button>
          </div>

          {/* Products Section */}
          <div className="featured-products-section">
            {categoryProducts.length === 0 ? (
              <div className="featured-empty-state">
                <FaBox className="featured-empty-icon" />
                <h3 className="featured-empty-title">No Products Yet</h3>
                <p className="featured-empty-text">Start by adding your first product to {selectedCategory.toLowerCase()}</p>
              </div>
            ) : (
              <div className="featured-products-grid">
                {categoryProducts.map((product: any) => (
                  <div key={product.id} className="featured-product-card">
                    <div className="featured-product-image-container">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="featured-product-image" />
                      ) : (
                        <div className="featured-no-image">
                          <FaBox />
                          <span>No Image</span>
                        </div>
                      )}
                      <button
                        className="featured-upload-image-btn"
                        onClick={() => openImageModal(product)}
                        title="Upload/Edit Image"
                      >
                        <FaUpload />
                      </button>
                    </div>
                    <div className="featured-product-card-content">
                      <h3 className="featured-product-name">{product.name}</h3>
                      {product.description && (
                        <p className="featured-product-description">{product.description}</p>
                      )}
                      <div className="featured-product-footer">
                        <span className="featured-product-price">₵{parseFloat(product.price || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && editingProduct && (
        <div className="featured-modal-overlay" onClick={closeImageModal}>
          <div className="featured-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="featured-modal-header">
              <div>
                <h2>Upload Product Image</h2>
                <p className="featured-modal-product-name">{editingProduct.name}</p>
              </div>
              <button className="featured-close-btn" onClick={closeImageModal}>
                <FaTimes />
              </button>
            </div>

            <div className="featured-modal-body">
              <div className="featured-form-group">
                <label htmlFor="featuredImageInput">Select Image</label>
                <div className="featured-file-input-wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="featured-file-input"
                    id="featuredImageInput"
                  />
                  <label htmlFor="featuredImageInput" className="featured-file-label">
                    <FaUpload /> Choose Image
                  </label>
                </div>
              </div>

              {previewUrl && (
                <div className="featured-preview-section">
                  <h3>Preview</h3>
                  <img src={previewUrl} alt="Preview" className="featured-preview-image" />
                </div>
              )}
            </div>

            <div className="featured-modal-footer">
              <button 
                type="button" 
                className="featured-btn-cancel" 
                onClick={closeImageModal}
                disabled={uploading}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="featured-btn-upload" 
                onClick={handleUploadImage}
                disabled={uploading || (!selectedFile && !previewUrl)}
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="featured-modal-overlay" onClick={closeAddProductModal}>
          <div className="featured-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="featured-modal-header">
              <div>
                <h2>Add New Feature</h2>
                <p className="featured-modal-product-name">Category: {selectedCategory}</p>
              </div>
              <button className="featured-close-btn" onClick={closeAddProductModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit}>
              <div className="featured-modal-body">
                <div className="featured-form-group">
                  <label htmlFor="productName">Product Name *</label>
                  <input
                    type="text"
                    id="productName"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleFormInputChange}
                    required
                  />
                </div>

                <div className="featured-form-group">
                  <label htmlFor="productDescription">Description</label>
                  <textarea
                    id="productDescription"
                    name="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleFormInputChange}
                    rows={3}
                  />
                </div>

                <div className="featured-form-group">
                  <label htmlFor="productImageInput">Featured Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFormImageChange}
                    id="productImageInput"
                  />
                </div>

                {formData.imagePreview && (
                  <div className="featured-preview-section">
                    <h3>Preview</h3>
                    <img src={formData.imagePreview} alt="Preview" className="featured-preview-image" />
                  </div>
                )}
              </div>

              <div className="featured-modal-footer">
                <button 
                  type="button" 
                  className="featured-btn-cancel" 
                  onClick={closeAddProductModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="featured-btn-upload" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Feature'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


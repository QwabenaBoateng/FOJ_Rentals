import { useState, useEffect } from 'react';
import { FaUpload, FaTrash, FaImage } from 'react-icons/fa';
import './ImageManagement.css';

interface BannerImage {
  id: string;
  name: string;
  type: 'hero' | 'promo';
  imageData: string; // base64 encoded image
  uploadedDate: Date;
}

export const ImageManagement = () => {
  const [images, setImages] = useState<BannerImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [imageType, setImageType] = useState<'hero' | 'promo'>('hero');
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Load images from localStorage
    const savedImages = localStorage.getItem('bannerImages');
    if (savedImages) {
      try {
        const parsed = JSON.parse(savedImages);
        // Convert date strings back to Date objects
        const imagesWithDates = parsed.map((img: any) => ({
          ...img,
          uploadedDate: new Date(img.uploadedDate)
        }));
        setImages(imagesWithDates);
      } catch (error) {
        console.error('Error loading images:', error);
        setImages([]);
      }
    }
    setLoading(false);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleUpload = () => {
    if (!selectedFile || !imageName.trim()) {
      alert('Please select an image and enter a name');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imageData = event.target?.result as string;
        
        const newImage: BannerImage = {
          id: Date.now().toString(),
          name: imageName,
          type: imageType,
          imageData: imageData,
          uploadedDate: new Date(),
        };

        const updatedImages = [...images, newImage];
        setImages(updatedImages);
        
        // Convert dates to ISO strings for storage
        const imagesForStorage = updatedImages.map(img => ({
          ...img,
          uploadedDate: img.uploadedDate.toISOString()
        }));
        localStorage.setItem('bannerImages', JSON.stringify(imagesForStorage));

        // Dispatch custom event to notify other components in the same tab
        window.dispatchEvent(new CustomEvent('bannerImagesUpdated'));

        // Reset form
        setSelectedFile(null);
        setPreviewUrl('');
        setImageName('');
        
        // Reset file input
        const fileInput = document.getElementById('imageInput') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        
        setUploading(false);
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
  };

  const handleDeleteImage = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      const updatedImages = images.filter((img) => img.id !== id);
      setImages(updatedImages);
      
      // Convert dates to ISO strings for storage
      const imagesForStorage = updatedImages.map(img => ({
        ...img,
        uploadedDate: img.uploadedDate.toISOString()
      }));
      localStorage.setItem('bannerImages', JSON.stringify(imagesForStorage));
      
      // Dispatch custom event to notify other components in the same tab
      window.dispatchEvent(new CustomEvent('bannerImagesUpdated'));
    }
  };

  const heroImages = images.filter((img) => img.type === 'hero');
  const promoImages = images.filter((img) => img.type === 'promo');

  if (loading) {
    return <div className="image-management"><p>Loading...</p></div>;
  }

  return (
    <div className="image-management">
      <h1>Image Management</h1>
      <p className="subtitle">Upload and manage banner images for homepage</p>

      <div className="image-upload-section">
        <div className="upload-card">
          <h2>Upload New Image</h2>
          
          <div className="form-group-img">
            <label>Image Name</label>
            <input
              type="text"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              placeholder="e.g., Main Banner Image"
              className="form-input-img"
            />
          </div>

          <div className="form-group-img">
            <label>Image Type</label>
            <select
              value={imageType}
              onChange={(e) => setImageType(e.target.value as 'hero' | 'promo')}
              className="form-select-img"
            >
              <option value="hero">Hero Section (Homepage Banner)</option>
              <option value="promo">Promo Section (Premium Event Setup)</option>
            </select>
          </div>

          <div className="form-group-img">
            <label>Select Image</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
                id="imageInput"
              />
              <label htmlFor="imageInput" className="file-label">
                <FaUpload /> Choose Image
              </label>
            </div>
          </div>

          {previewUrl && (
            <div className="preview-section">
              <h3>Preview</h3>
              <img src={previewUrl} alt="Preview" className="preview-image" />
            </div>
          )}

          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </div>

      <div className="images-grid">
        <div className="images-section">
          <h2>Hero Section Images ({heroImages.length})</h2>
          {heroImages.length === 0 ? (
            <div className="empty-state">
              <FaImage />
              <p>No hero images uploaded yet</p>
            </div>
          ) : (
            <div className="images-list">
              {heroImages.map((img) => (
                <div key={img.id} className="image-card">
                  <img src={img.imageData} alt={img.name} className="image-thumbnail" />
                  <div className="image-info">
                    <h4>{img.name}</h4>
                    <p className="upload-date">
                      {new Date(img.uploadedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteImage(img.id)}
                    title="Delete image"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="images-section">
          <h2>Promo Section Images ({promoImages.length})</h2>
          {promoImages.length === 0 ? (
            <div className="empty-state">
              <FaImage />
              <p>No promo images uploaded yet</p>
            </div>
          ) : (
            <div className="images-list">
              {promoImages.map((img) => (
                <div key={img.id} className="image-card">
                  <img src={img.imageData} alt={img.name} className="image-thumbnail" />
                  <div className="image-info">
                    <h4>{img.name}</h4>
                    <p className="upload-date">
                      {new Date(img.uploadedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteImage(img.id)}
                    title="Delete image"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="info-box">
        <h3>Usage Instructions</h3>
        <ul>
          <li>Upload images in JPG, PNG, or WebP format</li>
          <li>Hero images appear on the main banner at top of homepage</li>
          <li>Promo images appear in the "Premium Event Setup" section</li>
          <li>Images are stored locally in your browser</li>
          <li>For best results, use high-resolution images</li>
        </ul>
      </div>
    </div>
  );
};

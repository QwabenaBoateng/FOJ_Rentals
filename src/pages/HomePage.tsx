import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { RentalCard } from '../components/RentalCard';
import { RentalItem } from '../types';
import { useNavigate } from 'react-router-dom';

// Placeholder image URL generator
const getPlaceholderImage = (text: string) => {
  const colors = ['#667eea', '#764ba2', '#d946a6', '#c2185b', '#f97316', '#0ea5e9'];
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = colors[hash % colors.length];
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='${encodeURIComponent(color)}' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='white' font-weight='bold'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
};

export const HomePage = () => {
  const { items, setItems, addToCart } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [heroImageUrl, setHeroImageUrl] = useState<string>('');
  const [promoImageUrl, setPromoImageUrl] = useState<string>('');

  // Load banner images from localStorage
  useEffect(() => {
    const loadImages = () => {
      try {
        const savedImages = localStorage.getItem('bannerImages');
        if (savedImages) {
          const images = JSON.parse(savedImages);
          // Get the most recent image of each type
          const heroImages = images.filter((img: any) => img.type === 'hero' && img.imageData);
          const promoImages = images.filter((img: any) => img.type === 'promo' && img.imageData);
          
          // Sort by uploadedDate (most recent first) and get the first one
          if (heroImages.length > 0) {
            const heroImage = heroImages.sort((a: any, b: any) => {
              const dateA = new Date(a.uploadedDate).getTime() || 0;
              const dateB = new Date(b.uploadedDate).getTime() || 0;
              return dateB - dateA;
            })[0];
            if (heroImage?.imageData) setHeroImageUrl(heroImage.imageData);
          }
          
          if (promoImages.length > 0) {
            const promoImage = promoImages.sort((a: any, b: any) => {
              const dateA = new Date(a.uploadedDate).getTime() || 0;
              const dateB = new Date(b.uploadedDate).getTime() || 0;
              return dateB - dateA;
            })[0];
            if (promoImage?.imageData) setPromoImageUrl(promoImage.imageData);
          } else {
            setPromoImageUrl(''); // Clear if no promo images
          }
        }
      } catch (error) {
        console.error('Error loading banner images:', error);
      }
    };

    // Load on initial mount
    loadImages();

    // Listen for custom event (for same-tab updates)
    const handleBannerImagesUpdate = () => {
      loadImages();
    };
    window.addEventListener('bannerImagesUpdated', handleBannerImagesUpdate);
    
    // Also listen for storage changes (for cross-tab updates)
    const handleStorageChange = () => {
      loadImages();
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('bannerImagesUpdated', handleBannerImagesUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Mock data - in real app, this would come from API
  // Chafing Dishes - Row 1
  const chafiing_dishes: RentalItem[] = [
    {
      id: '1',
      name: 'Round Chafing Dish Set',
      category: 'chafing-dishes',
      description: 'Complete round chafing dish set with fuel cans',
      image: getPlaceholderImage('Round Chafing Dish'),
      pricePerDay: 5,
      pricePerWeek: 20,
      pricePerMonth: 50,
      stock: 80,
      rating: 4.5,
      reviews: 156,
    },
    {
      id: '2',
      name: 'Rectangular Chafing Dish',
      category: 'chafing-dishes',
      description: 'Professional rectangular chafing dish',
      image: getPlaceholderImage('Rectangular Chafing'),
      pricePerDay: 6,
      pricePerWeek: 24,
      pricePerMonth: 60,
      stock: 75,
      rating: 4.6,
      reviews: 142,
    },
    {
      id: '3',
      name: 'Mini Chafing Dish',
      category: 'chafing-dishes',
      description: 'Compact mini chafing dish for appetizers',
      image: getPlaceholderImage('Mini Chafing Dish'),
      pricePerDay: 3,
      pricePerWeek: 12,
      pricePerMonth: 30,
      stock: 120,
      rating: 4.7,
      reviews: 198,
    },
    {
      id: '4',
      name: 'Deluxe Chafing Dish Collection',
      category: 'chafing-dishes',
      description: 'Premium deluxe chafing dish collection',
      image: getPlaceholderImage('Deluxe Chafing'),
      pricePerDay: 8,
      pricePerWeek: 32,
      pricePerMonth: 80,
      stock: 60,
      rating: 4.8,
      reviews: 216,
    },
  ];

  // Chairs - Row 2
  const chairs: RentalItem[] = [
    {
      id: '5',
      name: 'Chiavari Chairs',
      category: 'chairs',
      description: 'Elegant Chiavari chairs perfect for events',
      image: getPlaceholderImage('Chiavari Chair'),
      pricePerDay: 2,
      pricePerWeek: 10,
      pricePerMonth: 30,
      stock: 100,
      rating: 4.8,
      reviews: 245,
    },
    {
      id: '6',
      name: 'Folding Chairs',
      category: 'chairs',
      description: 'Durable folding chairs for any occasion',
      image: getPlaceholderImage('Folding Chair'),
      pricePerDay: 1.5,
      pricePerWeek: 7,
      pricePerMonth: 20,
      stock: 200,
      rating: 4.4,
      reviews: 156,
    },
    {
      id: '7',
      name: 'Cross Back Chairs',
      category: 'chairs',
      description: 'Rustic cross back chairs for elegant events',
      image: getPlaceholderImage('Cross Back Chair'),
      pricePerDay: 2.5,
      pricePerWeek: 12,
      pricePerMonth: 35,
      stock: 80,
      rating: 4.7,
      reviews: 189,
    },
    {
      id: '8',
      name: 'Ghost Chairs',
      category: 'chairs',
      description: 'Modern transparent ghost chairs',
      image: getPlaceholderImage('Ghost Chair'),
      pricePerDay: 3,
      pricePerWeek: 14,
      pricePerMonth: 40,
      stock: 90,
      rating: 4.9,
      reviews: 267,
    },
  ];

  // Tables - Row 3
  const tables: RentalItem[] = [
    {
      id: '9',
      name: 'Round Banquet Tables',
      category: 'tables',
      description: '60" round tables with capacity for 8-10 guests',
      image: getPlaceholderImage('Banquet Table'),
      pricePerDay: 15,
      pricePerWeek: 70,
      pricePerMonth: 200,
      stock: 50,
      rating: 4.6,
      reviews: 189,
    },
    {
      id: '10',
      name: 'Rectangular Banquet Tables',
      category: 'tables',
      description: 'Classic rectangular tables for formal events',
      image: getPlaceholderImage('Rectangular Table'),
      pricePerDay: 12,
      pricePerWeek: 55,
      pricePerMonth: 150,
      stock: 60,
      rating: 4.7,
      reviews: 201,
    },
    {
      id: '11',
      name: 'High Top Cocktail Tables',
      category: 'tables',
      description: 'Modern high top tables for cocktail events',
      image: getPlaceholderImage('Cocktail Table'),
      pricePerDay: 8,
      pricePerWeek: 35,
      pricePerMonth: 100,
      stock: 100,
      rating: 4.5,
      reviews: 167,
    },
    {
      id: '12',
      name: 'Farm Style Tables',
      category: 'tables',
      description: 'Rustic farm style tables for outdoor events',
      image: getPlaceholderImage('Farm Table'),
      pricePerDay: 18,
      pricePerWeek: 80,
      pricePerMonth: 220,
      stock: 40,
      rating: 4.8,
      reviews: 234,
    },
  ];

  // Chair Covers - Row 4
  const chairCovers: RentalItem[] = [
    {
      id: '13',
      name: 'Chair Covers - Satin',
      category: 'chair-covers',
      description: 'Elegant satin chair covers in multiple colors',
      image: getPlaceholderImage('Satin Cover'),
      pricePerDay: 0.5,
      pricePerWeek: 2,
      pricePerMonth: 5,
      stock: 500,
      rating: 4.7,
      reviews: 324,
    },
    {
      id: '14',
      name: 'Chair Covers - Polyester',
      category: 'chair-covers',
      description: 'Durable polyester chair covers',
      image: getPlaceholderImage('Polyester Cover'),
      pricePerDay: 0.4,
      pricePerWeek: 1.8,
      pricePerMonth: 4,
      stock: 600,
      rating: 4.5,
      reviews: 267,
    },
    {
      id: '15',
      name: 'Chair Covers - Premium',
      category: 'chair-covers',
      description: 'Premium quality chair covers with decorative sashes',
      image: getPlaceholderImage('Premium Cover'),
      pricePerDay: 0.75,
      pricePerWeek: 3,
      pricePerMonth: 8,
      stock: 400,
      rating: 4.9,
      reviews: 412,
    },
    {
      id: '16',
      name: 'Chair Covers - Spandex',
      category: 'chair-covers',
      description: 'Stretch spandex chair covers for modern look',
      image: getPlaceholderImage('Spandex Cover'),
      pricePerDay: 0.6,
      pricePerWeek: 2.5,
      pricePerMonth: 6,
      stock: 550,
      rating: 4.8,
      reviews: 289,
    },
  ];

  const mockItems: RentalItem[] = [
    ...chafiing_dishes,
    ...chairs,
    ...tables,
    ...chairCovers,
  ];

  useEffect(() => {
    // Load admin products from localStorage
    const loadAdminProducts = () => {
      try {
        const savedProducts = localStorage.getItem('adminProducts');
        if (savedProducts) {
          const products = JSON.parse(savedProducts);
          const adminRentalItems = products.map((product: any) => ({
            id: product.id.toString(),
            name: product.name,
            category: mapCategoryToRentalItem(product.category),
            description: product.description || '',
            image: product.image || getPlaceholderImage(product.name),
            pricePerDay: parseFloat(product.price) || 0,
            pricePerWeek: parseFloat(product.price) * 5 || 0,
            pricePerMonth: parseFloat(product.price) * 20 || 0,
            stock: product.stock || 10,
            rating: product.rating || 4.5,
            reviews: product.reviews || 0
          }));
          
          // Merge admin products with mock items (admin products take precedence if same ID)
          const existingIds = new Set(adminRentalItems.map((item: RentalItem) => item.id));
          const filteredMockItems = mockItems.filter(item => !existingIds.has(item.id));
          setItems([...filteredMockItems, ...adminRentalItems]);
        } else {
          setItems(mockItems);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setItems(mockItems);
        setLoading(false);
      }
    };

    // Load on initial mount
    loadAdminProducts();

    // Listen for product updates
    const handleProductsUpdate = () => {
      loadAdminProducts();
    };
    window.addEventListener('productsUpdated', handleProductsUpdate);
    
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
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

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch = true; // Show all items on homepage
    return matchesSearch;
  });

  const handleAddToCart = (item: RentalItem) => {
    addToCart(item, 1, 'day', new Date(), new Date());
  };

  // Get products by category from items (which includes admin products)
  const getCategoryItems = (category: 'chafing-dishes' | 'chairs' | 'tables' | 'chair-covers', mockItems: RentalItem[]) => {
    const categoryItems = items.filter(item => item.category === category);
    
    // Filter to show only items with real uploaded images (base64 jpeg/png/webp, not SVG placeholders)
    const itemsWithImages = categoryItems.filter(item => {
      if (!item.image) return false;
      // Check if it's a real uploaded image (base64 jpeg/png/webp) or external URL
      const isRealImage = item.image.startsWith('data:image/jpeg') || 
                          item.image.startsWith('data:image/jpg') ||
                          item.image.startsWith('data:image/png') ||
                          item.image.startsWith('data:image/webp') ||
                          item.image.startsWith('data:image/gif') ||
                          (item.image.startsWith('http://') || item.image.startsWith('https://'));
      // Exclude SVG placeholders
      const isNotPlaceholder = !item.image.includes('data:image/svg');
      return isRealImage && isNotPlaceholder;
    });
    
    // If we have items with real images, use those; otherwise fall back to mock data
    if (itemsWithImages.length > 0) {
      return itemsWithImages.slice(0, 4);
    }
    
    // Fall back to mock items if no admin products with images exist
    return mockItems.filter(item => item.category === category).slice(0, 4);
  };

  // Get featured items for each category
  const featuredChafingDishes = getCategoryItems('chafing-dishes', chafiing_dishes);
  const featuredChairs = getCategoryItems('chairs', chairs);
  const featuredTables = getCategoryItems('tables', tables);
  const featuredChairCovers = getCategoryItems('chair-covers', chairCovers);

  if (loading) {
    return <div className="loading">Loading rental items...</div>;
  }

  return (
    <div className="home-page">
      <div className="hero-section" style={heroImageUrl ? {backgroundImage: `url(${heroImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}>
        <div className="hero-content">
          <h1>Event Rentals Made Easy</h1>
          <p>Everything you need for your perfect event</p>
          <button className="hero-btn" onClick={() => navigate('/category')}>
            Browse by Category
          </button>
        </div>
      </div>

      <div 
        className="promo-banner"
        style={promoImageUrl ? {
          backgroundImage: `url(${promoImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        <div className="promo-content">
          <div className="promo-text">
            <h2>Premium Event Setup</h2>
            <p>Complete your event with our finest furniture and decorations</p>
            <button className="promo-btn" onClick={() => navigate('/category')}>
              View All Items →
            </button>
          </div>
        </div>
      </div>

      <div className="home-content">
        {/* Chafing Dishes Section */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Chafing Dishes</h2>
            <p>Professional chafing dish sets for food service</p>
          </div>
          <div className="featured-grid">
            {featuredChafingDishes.length > 0 ? (
              featuredChafingDishes.map((item) => (
                <RentalCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666', padding: '2rem' }}>
                No chafing dishes available. Add products in the admin panel to see them here.
              </p>
            )}
          </div>
        </div>

        {/* Chairs Section */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Chairs</h2>
            <p>Wide selection of elegant and comfortable chairs</p>
          </div>
          <div className="featured-grid">
            {featuredChairs.length > 0 ? (
              featuredChairs.map((item) => (
                <RentalCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666', padding: '2rem' }}>
                No chairs available. Add products in the admin panel to see them here.
              </p>
            )}
          </div>
        </div>

        {/* Tables Section */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Tables</h2>
            <p>Beautiful tables for any event size</p>
          </div>
          <div className="featured-grid">
            {featuredTables.length > 0 ? (
              featuredTables.map((item) => (
                <RentalCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666', padding: '2rem' }}>
                No tables available. Add products in the admin panel to see them here.
              </p>
            )}
          </div>
        </div>

        {/* Chair Covers Section */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Chair Covers</h2>
            <p>Transform your chairs with elegant covers</p>
          </div>
          <div className="featured-grid">
            {featuredChairCovers.length > 0 ? (
              featuredChairCovers.map((item) => (
                <RentalCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666', padding: '2rem' }}>
                No chair covers available. Add products in the admin panel to see them here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

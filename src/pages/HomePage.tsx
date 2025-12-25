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
    const savedImages = localStorage.getItem('bannerImages');
    if (savedImages) {
      const images = JSON.parse(savedImages);
      const heroImage = images.find((img: any) => img.type === 'hero');
      const promoImage = images.find((img: any) => img.type === 'promo');
      
      if (heroImage) setHeroImageUrl(heroImage.imageData);
      if (promoImage) setPromoImageUrl(promoImage.imageData);
    }
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
    // Simulate API call
    setTimeout(() => {
      setItems(mockItems);
      setLoading(false);
    }, 500);
  }, []);

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch = true; // Show all items on homepage
    return matchesSearch;
  });

  const handleAddToCart = (item: RentalItem) => {
    addToCart(item, 1, 'day', new Date(), new Date());
  };

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

      <div className="promo-banner">
        <div className="promo-content">
          <div className="promo-text">
            <h2>Premium Event Setup</h2>
            <p>Complete your event with our finest furniture and decorations</p>
            <button className="promo-btn" onClick={() => navigate('/category')}>
              View All Items →
            </button>
          </div>
          <div className="promo-image">
            {promoImageUrl ? (
              <img src={promoImageUrl} alt="Premium Event Setup" style={{width: '100%', height: '300px', borderRadius: '8px', objectFit: 'cover'}} />
            ) : (
              <div style={{width: '500px', height: '300px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '8px'}} />
            )}
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
            {chafiing_dishes.map((item) => (
              <RentalCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Chairs Section */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Chairs</h2>
            <p>Wide selection of elegant and comfortable chairs</p>
          </div>
          <div className="featured-grid">
            {chairs.map((item) => (
              <RentalCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Tables Section */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Tables</h2>
            <p>Beautiful tables for any event size</p>
          </div>
          <div className="featured-grid">
            {tables.map((item) => (
              <RentalCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Chair Covers Section */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Chair Covers</h2>
            <p>Transform your chairs with elegant covers</p>
          </div>
          <div className="featured-grid">
            {chairCovers.map((item) => (
              <RentalCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

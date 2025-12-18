import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { RentalCard } from '../components/RentalCard';
import { RentalItem } from '../types';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const { items, setItems, addToCart } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  // Chafing Dishes - Row 1
  const chafiing_dishes: RentalItem[] = [
    {
      id: '1',
      name: 'Round Chafing Dish Set',
      category: 'chafing-dishes',
      description: 'Complete round chafing dish set with fuel cans',
      image: 'https://via.placeholder.com/300x200?text=Round+Chafing+Dish',
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
      image: 'https://via.placeholder.com/300x200?text=Rectangular+Chafing',
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
      image: 'https://via.placeholder.com/300x200?text=Mini+Chafing+Dish',
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
      image: 'https://via.placeholder.com/300x200?text=Deluxe+Chafing',
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
      image: 'https://via.placeholder.com/300x200?text=Chiavari+Chair',
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
      image: 'https://via.placeholder.com/300x200?text=Folding+Chair',
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
      image: 'https://via.placeholder.com/300x200?text=Cross+Back+Chair',
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
      image: 'https://via.placeholder.com/300x200?text=Ghost+Chair',
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
      image: 'https://via.placeholder.com/300x200?text=Banquet+Table',
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
      image: 'https://via.placeholder.com/300x200?text=Rectangular+Table',
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
      image: 'https://via.placeholder.com/300x200?text=Cocktail+Table',
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
      image: 'https://via.placeholder.com/300x200?text=Farm+Table',
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
      image: 'https://via.placeholder.com/300x200?text=Satin+Cover',
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
      image: 'https://via.placeholder.com/300x200?text=Polyester+Cover',
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
      image: 'https://via.placeholder.com/300x200?text=Premium+Cover',
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
      image: 'https://via.placeholder.com/300x200?text=Spandex+Cover',
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
      <div className="hero-section">
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
            <img src="https://via.placeholder.com/500x300?text=Event+Setup" alt="Event Setup" />
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

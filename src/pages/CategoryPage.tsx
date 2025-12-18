import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { RentalCard } from '../components/RentalCard';
import { RentalItem } from '../types';

export const CategoryPage = () => {
  const { items, selectedCategory, setSelectedCategory, searchQuery, addToCart } = useStore();
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    let filtered = items;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [items, selectedCategory, searchQuery]);

  const handleAddToCart = (item: RentalItem) => {
    addToCart(item, 1, 'day', new Date(), new Date());
  };

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'chairs', name: 'Chairs' },
    { id: 'tables', name: 'Tables' },
    { id: 'chair-covers', name: 'Chair Covers' },
    { id: 'chafing-dishes', name: 'Chafing Dishes' },
    { id: 'linens', name: 'Linens' },
    { id: 'decorations', name: 'Decorations' },
  ];

  return (
    <div className="category-page">
      <div className="category-container">
        {/* Sidebar Filter */}
        <aside className="category-sidebar">
          <div className="filter-section">
            <h2>Filter by Category</h2>
            <div className="category-buttons">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-btn ${
                    selectedCategory === cat.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="category-main">
          <div className="category-header">
            <h1>
              {selectedCategory === 'all' || !selectedCategory
                ? 'All Items'
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h1>
            <p className="item-count">{filteredItems.length} items available</p>
          </div>

          {filteredItems.length > 0 ? (
            <div className="rental-grid">
              {filteredItems.map((item) => (
                <RentalCard key={item.id} item={item} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="no-items">
              <p>No items found in this category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

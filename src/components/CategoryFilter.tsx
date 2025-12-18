import { useStore } from '../store/useStore';
import { FaFilter } from 'react-icons/fa';

const categories = [
  { id: 'all', name: 'All Items', value: null },
  { id: 'chairs', name: 'Chairs', value: 'chairs' },
  { id: 'tables', name: 'Tables', value: 'tables' },
  { id: 'chair-covers', name: 'Chair Covers', value: 'chair-covers' },
  { id: 'chafing-dishes', name: 'Chafing Dishes', value: 'chafing-dishes' },
  { id: 'linens', name: 'Linens', value: 'linens' },
  { id: 'decorations', name: 'Decorations', value: 'decorations' },
];

export const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  return (
    <div className="category-filter">
      <h3>
        <FaFilter /> Filter by Category
      </h3>
      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-btn ${
              selectedCategory === category.value ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

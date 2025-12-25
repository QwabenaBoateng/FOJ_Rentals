# FOJ Rentals - Event Rental Platform

A comprehensive React-based event rentals website with an integrated admin dashboard for managing inventory, orders, and business analytics.

## Features

### Customer Features
- **Browse Rentals**: Explore chairs, tables, chair covers, chafing dishes, linens, and decorations
- **Search & Filter**: Find items by category or keywords
- **Shopping Cart**: Add items to cart with flexible rental periods (daily, weekly, monthly)
- **Checkout**: Specify delivery/return dates and special requests
- **User Accounts**: Register and manage orders

### Admin Dashboard
- **Dashboard Overview**: View key metrics (revenue, orders, active rentals, customers)
- **Inventory Management**: 
  - Add new rental items
  - Edit existing items
  - Update stock levels
  - Manage pricing for different rental periods
  - Delete items from inventory
- **Order Management**:
  - View all orders with filter by status
  - Track order details
  - Update order status (pending, confirmed, shipped, delivered, cancelled)
  - View customer information and delivery dates
- **Analytics**: 
  - Monthly revenue trends
  - Category distribution charts
  - Business statistics

## Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── RentalCard.tsx          # Item display component
│   ├── CartItemComponent.tsx   # Cart item display
│   └── CategoryFilter.tsx      # Filter sidebar
├── pages/
│   ├── HomePage.tsx            # Main product listing
│   ├── CartPage.tsx            # Shopping cart
│   ├── LoginPage.tsx           # User login
│   ├── RegisterPage.tsx        # User registration
│   ├── OrderConfirmationPage.tsx
│   └── admin/
│       ├── AdminPanel.tsx      # Admin main layout
│       ├── AdminDashboard.tsx  # Dashboard with stats
│       ├── InventoryManagement.tsx  # Manage products
│       └── OrderManagement.tsx # Manage orders
├── store/
│   └── useStore.ts            # Zustand state management
├── api/
│   └── api.ts                 # API endpoints
├── types/
│   └── index.ts               # TypeScript type definitions
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Date Handling**: date-fns
- **Styling**: CSS Grid & Flexbox

## Installation

1. Navigate to the project directory:
```bash
cd c:\projects\FOJ_Rentals
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to `http://localhost:3000`

## Demo Credentials

- **Admin Access**: Use email `admin@test.com` with any password to access the admin dashboard
- **Regular User**: Sign up or use any email to test customer features

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Admin Dashboard Access

The admin dashboard is only accessible to users with admin privileges. To access:

1. Log in with admin credentials (email: `admin@test.com`)
2. Click the "Admin Dashboard" button in the header
3. Navigate between:
   - **Dashboard**: Overview of business metrics
   - **Inventory**: Manage rental items and stock
   - **Orders**: Track and manage customer orders
   - **Settings**: Future settings configuration

## Key Pages

### Customer Pages
- `/` - Home page with product browsing
- `/cart` - Shopping cart and checkout
- `/login` - User login
- `/register` - User registration
- `/order-confirmation` - Order confirmation page

### Admin Pages
- `/admin` - Admin dashboard (requires admin login)
- All admin functions are within the admin panel

## Features Implemented

### ✅ Fully Implemented
- Product catalog with category filtering
- Search functionality
- Shopping cart management
- User authentication (mock)
- Admin dashboard with statistics
- Inventory management (CRUD operations)
- Order management with status tracking
- Responsive design for mobile and tablet
- Professional UI with gradients and shadows

### 🔄 Ready for Backend Integration
- All API endpoints defined and ready for integration
- Axios configured for API calls
- State management with Zustand for easy data flow
- Type-safe API interactions

## Customization

### Adding New Rental Categories
Edit the categories in `src/components/CategoryFilter.tsx` and update the type in `src/types/index.ts`

### Changing Colors
Update CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #2196f3;
  --secondary-color: #4caf50;
  --danger-color: #f44336;
  /* ... */
}
```

### Adding Backend API
Replace mock data in components with actual API calls using `itemsAPI`, `ordersAPI`, etc. from `src/api/api.ts`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Real backend API integration (Node.js/Express recommended)
- Payment gateway integration
- Email notifications
- Advanced analytics and reporting
- Customer reviews and ratings system
- Delivery tracking
- Inventory auto-sync with orders
- Multiple location support
- Customer support chat

## License

Private project - FOJ Rentals

## Contact

For questions or support, contact: fojrentals@gmail.com

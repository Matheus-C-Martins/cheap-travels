# 🏗️ Architecture Overview

Detailed system architecture and design decisions.

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   User Browser                      │
│  (React SPA + Service Worker for offline support)  │
└──────────────────┬──────────────────────────────────┘
                   │ HTTPS
                   ↓
┌──────────────────────────────────────────────────────┐
│              GitHub Pages (CDN)                      │
│        (Static Frontend Hosting)                     │
└──────────────────┬───────────────────────────────────┘
                   │ REST API
                   ↓
┌──────────────────────────────────────────────────────┐
│           Backend API (Node.js/Express)              │
│  ┌────────────────────────────────────────────────┐  │
│  │  Routes Layer                                  │  │
│  │  - /api/deals - /api/health                   │  │
│  └────────────────┬───────────────────────────────┘  │
│                   ↓                                   │
│  ┌────────────────────────────────────────────────┐  │
│  │  Services Layer                                │  │
│  │  - DealsService - Validator - Cache           │  │
│  └────────────────┬───────────────────────────────┘  │
│                   ↓                                   │
│  ┌────────────────────────────────────────────────┐  │
│  │  Data Layer (In-Memory / Future: Database)    │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Technology Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **CSS3** - Styling (no framework, pure CSS)
- **Context API** - State management

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── DealCard.jsx    # Individual deal display
│   ├── FilterBar.jsx   # Filtering controls
│   ├── SearchBar.jsx   # Search functionality
│   ├── LoadingState.jsx # Loading skeleton
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useTranslation.js
│   ├── useFavorites.js
│   └── useDarkMode.js
├── translations/       # i18n strings
│   └── index.js
├── styles/            # Global styles
│   ├── index.css
│   └── accessibility.css
└── App.jsx            # Main component
```

### State Management

#### Local State (useState)
- Component-specific UI state
- Form inputs
- Toggle states

#### Context State
- Language preference
- Dark mode
- Favorites

#### Server State
- Deals data (fetched from API)
- Cached with 5-minute TTL

### Data Flow

```
User Action → Component → Hook → API Call → State Update → Re-render
```

Example:
```javascript
// 1. User clicks favorite
onToggleFavorite(dealId)

// 2. Hook updates localStorage
useFavorites.toggle(dealId)

// 3. Component re-renders with new state
<FavoriteButton isFavorite={isFavorite(dealId)} />
```

## Backend Architecture

### Technology Stack

- **Node.js 18+** - Runtime
- **Express 4** - Web framework
- **Node-Cache** - In-memory caching
- **Helmet** - Security headers

### API Structure

```
api/
├── routes/
│   └── deals.js        # API endpoints
├── services/
│   ├── dealsService.js # Business logic
│   ├── validator.js    # Data validation
│   └── cache.js        # Cache management
├── middleware/
│   ├── rateLimiter.js  # Rate limiting
│   └── errorHandler.js # Error handling
└── server.js          # Express app
```

### Request Flow

```
Request → Middleware → Route → Service → Response
   ↓         ↓           ↓        ↓
 CORS    Rate Limit   Cache   Business Logic
```

### Caching Strategy

```javascript
// 1. Check cache
if (cache.has('deals')) {
  return cache.get('deals');
}

// 2. Fetch/process data
const deals = await fetchDeals();

// 3. Store in cache (5 min TTL)
cache.set('deals', deals, 300);

// 4. Return data
return deals;
```

## Design Patterns

### Frontend

#### 1. Custom Hooks Pattern
```javascript
// Encapsulate reusable logic
function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  // Logic here
  return { favorites, toggle, isFavorite };
}
```

#### 2. Compound Components
```javascript
<FilterBar>
  <FilterBar.TypeFilter />
  <FilterBar.SortFilter />
  <FilterBar.FavoritesToggle />
</FilterBar>
```

#### 3. Render Props (Skeleton Loading)
```javascript
{loading ? <LoadingState /> : <DealsGrid deals={deals} />}
```

### Backend

#### 1. Service Layer Pattern
```javascript
// Separate business logic from routes
class DealsService {
  async getDeals() { /* ... */ }
  async validateDeal() { /* ... */ }
}
```

#### 2. Middleware Chain
```javascript
app.get('/api/deals',
  rateLimiter,      // 1. Rate limit
  cacheMiddleware,  // 2. Check cache
  getDeals          // 3. Handler
);
```

## Security Architecture

### Frontend

- ✅ No sensitive data in client
- ✅ XSS prevention via React
- ✅ HTTPS only
- ✅ CSP headers

### Backend

```javascript
// Security layers
app.use(helmet());              // Security headers
app.use(cors(corsOptions));     // CORS policy
app.use(rateLimiter);           // Rate limiting
app.use(validateInput);         // Input validation
```

### Rate Limiting

```
100 requests/minute per IP
↓
Block for 15 minutes if exceeded
```

## Performance Optimizations

### Frontend

1. **Code Splitting**
   ```javascript
   const LazyComponent = lazy(() => import('./Component'));
   ```

2. **Memoization**
   ```javascript
   const sortedDeals = useMemo(() => 
     deals.sort(sortFn), [deals, sortFn]
   );
   ```

3. **Debouncing**
   ```javascript
   // Search input debounced to 300ms
   const debouncedSearch = useDebounce(searchTerm, 300);
   ```

### Backend

1. **Caching**
   - In-memory cache (5 min TTL)
   - Reduces API calls by ~95%

2. **Compression**
   ```javascript
   app.use(compression());
   ```

3. **Connection Pooling** (future)
   ```javascript
   // When adding database
   pool.query('SELECT * FROM deals');
   ```

## Scalability Considerations

### Current (MVP)
- In-memory data
- Single server
- ~100 req/min capacity

### Future (Production)

```
Load Balancer
      ↓
   ┌──┴──┐
 API-1  API-2  (Horizontal scaling)
   └──┬──┘
      ↓
   Database (PostgreSQL/MongoDB)
      ↓
   Redis Cache
```

## Error Handling

### Frontend
```javascript
try {
  const data = await fetchDeals();
  setDeals(data);
} catch (error) {
  setError(error.message);
  // Show error UI
}
```

### Backend
```javascript
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error'
      : err.message
  });
});
```

## Testing Strategy

### Frontend
- **Unit Tests:** Components (Jest + React Testing Library)
- **Integration:** User flows (Cypress)
- **E2E:** Full app (Playwright)

### Backend
- **Unit Tests:** Services (Jest)
- **Integration:** API endpoints (Supertest)
- **Load Tests:** Performance (k6)

## Future Enhancements

1. **Database Integration**
   - PostgreSQL for relational data
   - Redis for caching

2. **Real-time Updates**
   - WebSocket for live deal updates
   - Server-Sent Events for notifications

3. **Microservices** (if needed)
   ```
   API Gateway
       ↓
   ┌───┴────┐
   Deals   Users   Notifications
   Service Service Service
   ```

4. **CDN Integration**
   - Cloudflare for global distribution
   - Edge caching

## Development Workflow

```
Local Dev → Git Push → GitHub Actions → Deploy
   ↓
Unit Tests → Integration Tests → E2E Tests
   ↓
Lint → Build → Deploy to Staging → Deploy to Prod
```

## Monitoring & Logging

### Metrics to Track
- API response times
- Error rates
- Cache hit ratio
- User engagement

### Tools
- **Logging:** Winston / Pino
- **Monitoring:** New Relic / Datadog
- **Errors:** Sentry

## Documentation

All architecture decisions are documented in:
- This file (ARCHITECTURE.md)
- Code comments
- API documentation (API.md)
- ADRs (Architecture Decision Records) - future

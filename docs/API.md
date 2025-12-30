# 📡 API Reference

Complete API documentation for Cheap Travels backend.

## Base URL

```
Production: https://your-api.onrender.com/api
Development: http://localhost:3001/api
```

## Authentication

🔓 Currently no authentication required (public API)

## Rate Limiting

- **100 requests per minute** per IP address
- **429 status code** when limit exceeded
- **15 minute cooldown** after exceeding limit

## Endpoints

### Health Check

#### `GET /health`

Check API status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-30T20:00:00.000Z",
  "uptime": 3600
}
```

**Status Codes:**
- `200` - API is healthy
- `503` - API is down

---

### Get All Deals

#### `GET /deals`

Retrieve all travel deals.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | all | Filter by type: `flight`, `cruise`, or `all` |
| `minDiscount` | number | 0 | Minimum discount percentage |
| `maxPrice` | number | ∞ | Maximum current price |
| `sortBy` | string | discount | Sort by: `discount`, `price`, or `date` |
| `limit` | number | 100 | Max results to return |

**Example Request:**
```bash
GET /api/deals?type=flight&minDiscount=60&sortBy=price&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "flight-001",
      "type": "flight",
      "title": "São Paulo → Lisboa",
      "origin": "São Paulo (GRU)",
      "destination": "Lisboa (LIS)",
      "departureDate": "2025-02-15",
      "returnDate": "2025-02-28",
      "stops": 0,
      "airline": "TAP Air Portugal",
      "originalPrice": 8500,
      "currentPrice": 2550,
      "currency": "BRL",
      "discount": 70,
      "url": "https://www.flytap.com/...",
      "source": "TAP",
      "verified": true,
      "lastChecked": "2025-12-30T19:30:00.000Z"
    }
  ],
  "lastUpdate": "2025-12-30T20:00:00.000Z",
  "nextUpdate": "2025-12-30T20:30:00.000Z"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid parameters
- `429` - Rate limit exceeded
- `500` - Server error

---

### Get Flights Only

#### `GET /deals/flights`

Retrieve flight deals only.

**Response:** Same structure as `/deals` but filtered to flights.

---

### Get Cruises Only

#### `GET /deals/cruises`

Retrieve cruise deals only.

**Response:** Same structure as `/deals` but filtered to cruises.

---

## Data Models

### Deal Object

#### Flight Deal
```typescript
{
  id: string;              // Unique identifier
  type: 'flight';          // Deal type
  title: string;           // Deal title
  origin: string;          // Departure city/airport
  destination: string;     // Arrival city/airport
  departureDate: string;   // ISO 8601 date
  returnDate?: string;     // ISO 8601 date (optional)
  stops: number;           // Number of stops
  airline: string;         // Airline name
  originalPrice: number;   // Original price
  currentPrice: number;    // Current discounted price
  currency: string;        // ISO 4217 code (BRL, USD, EUR)
  discount: number;        // Discount percentage (0-100)
  url: string;             // Booking URL
  source: string;          // Data source
  verified: boolean;       // Verification status
  lastChecked: string;     // ISO 8601 timestamp
}
```

#### Cruise Deal
```typescript
{
  id: string;
  type: 'cruise';
  title: string;
  destination: string;     // Main destination
  departureDate: string;
  duration: number;        // Number of nights
  company: string;         // Cruise company
  ship: string;            // Ship name
  originalPrice: number;
  currentPrice: number;
  currency: string;
  discount: number;
  url: string;
  source: string;
  verified: boolean;
  lastChecked: string;
}
```

## Error Responses

### Standard Error Format

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2025-12-30T20:00:00.000Z"
}
```

### Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `INVALID_PARAMS` | 400 | Invalid query parameters |
| `RATE_LIMIT` | 429 | Rate limit exceeded |
| `NOT_FOUND` | 404 | Endpoint not found |
| `SERVER_ERROR` | 500 | Internal server error |

### Examples

**Invalid Parameters:**
```json
{
  "success": false,
  "error": "Invalid type parameter. Must be 'flight', 'cruise', or 'all'",
  "code": "INVALID_PARAMS"
}
```

**Rate Limit:**
```json
{
  "success": false,
  "error": "Too many requests. Try again in 15 minutes.",
  "code": "RATE_LIMIT",
  "retryAfter": 900
}
```

## Caching

- **Cache Duration:** 5 minutes
- **Cache-Control Header:** `public, max-age=300`
- **ETag Support:** Yes

**Cache Headers:**
```
Cache-Control: public, max-age=300
ETag: "abc123..."
Last-Modified: Tue, 30 Dec 2025 20:00:00 GMT
```

## CORS

**Allowed Origins:**
- `https://matheus-c-martins.github.io`
- `http://localhost:5173` (development)

**Allowed Methods:**
- `GET`
- `OPTIONS`

**Allowed Headers:**
- `Content-Type`
- `Accept`

## Response Times

**Target SLA:**
- p50: < 100ms
- p95: < 500ms
- p99: < 1000ms

**Actual (cached):**
- p50: ~50ms
- p95: ~200ms
- p99: ~500ms

## Examples

### JavaScript (Fetch)

```javascript
const response = await fetch('https://api.example.com/api/deals?type=flight');
const data = await response.json();

if (data.success) {
  console.log(`Found ${data.count} deals`);
  data.data.forEach(deal => {
    console.log(`${deal.title}: ${deal.discount}% off`);
  });
}
```

### cURL

```bash
curl -X GET "https://api.example.com/api/deals?type=flight&limit=5" \
  -H "Accept: application/json"
```

### Python (Requests)

```python
import requests

response = requests.get(
    'https://api.example.com/api/deals',
    params={'type': 'flight', 'minDiscount': 60}
)

data = response.json()
if data['success']:
    for deal in data['data']:
        print(f"{deal['title']}: {deal['discount']}% off")
```

## Webhooks (Future)

🚧 Coming soon: Real-time deal notifications via webhooks.

## Versioning

**Current Version:** v1 (implicit)

**Future:** API versioning will be added:
```
/api/v1/deals
/api/v2/deals
```

## Support

Questions about the API?

- 📖 [Documentation](./README.md)
- 🐛 [Report Issues](https://github.com/Matheus-C-Martins/cheap-travels/issues)
- 💬 [Discussions](https://github.com/Matheus-C-Martins/cheap-travels/discussions)

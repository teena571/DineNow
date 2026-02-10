# DineNow Authentication Reference

## Quick Start

### Backend Auth Flow
```
User → Login → JWT Access Token (15min) + Refresh Token (7d) → HttpOnly Cookies
```

### Frontend Auth Flow
```
Login → AuthContext → Auto Refresh (14min) → Protected Routes → Role-Based Access
```

---

## User Roles & Access

| Role | Access Level | Default Routes |
|------|-------------|----------------|
| `customer` | Order food, view menu, manage cart | `/`, `/cart`, `/order` |
| `staff` | Kitchen operations, order management | `/kitchen` |
| `admin` | Full system access | `/admin` |

---

## Backend Implementation

### Creating Protected Routes

```javascript
import { authMiddleware, verifyRole } from '../middleware/authMiddleware.js';

// Any authenticated user
router.get('/profile', authMiddleware, getProfile);

// Admin only
router.get('/admin/users', authMiddleware, verifyRole(['admin']), getAllUsers);

// Staff or Admin
router.get('/kitchen/orders', authMiddleware, verifyRole(['staff', 'admin']), getOrders);

// Customer or Admin
router.post('/order', authMiddleware, verifyRole(['customer', 'admin']), createOrder);
```

### Accessing User in Controller

```javascript
const myController = async (req, res) => {
  const user = req.user; // Available after authMiddleware
  console.log(user._id, user.name, user.email, user.role);
  
  // User object excludes password and refreshToken
};
```

---

## Frontend Implementation

### Using Auth Context

```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { 
    user,              // Current user object
    isAuthenticated,   // Boolean
    loading,           // Boolean
    login,             // Function
    register,          // Function
    googleLogin,       // Function
    logout,            // Function
    refreshToken       // Function
  } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome {user.name}! Role: {user.role}</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

### Login Example

```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  
  const result = await login(email, password);
  
  if (result.success) {
    toast.success('Login successful!');
    
    // Redirect based on role
    switch (result.user.role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'staff':
        navigate('/kitchen');
        break;
      default:
        navigate('/');
    }
  } else {
    toast.error(result.message);
  }
};
```

### Register Example

```javascript
const handleRegister = async (e) => {
  e.preventDefault();
  
  const result = await register(name, email, password);
  
  if (result.success) {
    toast.success('Registration successful!');
    navigate('/');
  } else {
    toast.error(result.message);
  }
};
```

### Google OAuth Example

```javascript
import { GoogleLogin } from '@react-oauth/google';

<GoogleLogin
  onSuccess={async (credentialResponse) => {
    const result = await googleLogin(credentialResponse);
    if (result.success) {
      toast.success('Google login successful!');
      navigate('/');
    }
  }}
  onError={() => {
    toast.error('Google login failed');
  }}
/>
```

### Protected Routes

```javascript
import ProtectedRoute from './components/ProtectedRoute';

<Route path='/admin' element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminDashboard />
  </ProtectedRoute>
} />

<Route path='/kitchen' element={
  <ProtectedRoute allowedRoles={['staff', 'admin']}>
    <KitchenDashboard />
  </ProtectedRoute>
} />

<Route path='/cart' element={
  <ProtectedRoute allowedRoles={['customer', 'admin']}>
    <Cart />
  </ProtectedRoute>
} />
```

---

## API Reference

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully.",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Google OAuth
```http
POST /api/auth/google
Content-Type: application/json

{
  "token": "google_id_token_here"
}

Response:
{
  "success": true,
  "message": "Google login successful.",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "avatar": "https://..."
  }
}
```

### Refresh Token
```http
POST /api/auth/refresh

Response:
{
  "success": true,
  "message": "Token refreshed successfully.",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Get Profile
```http
GET /api/auth/profile

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "createdAt": "2026-02-10T..."
  }
}
```

### Logout
```http
POST /api/auth/logout

Response:
{
  "success": true,
  "message": "Logout successful."
}
```

---

## Security Features

### Token Management
- **Access Token**: 15 minutes, stored in httpOnly cookie
- **Refresh Token**: 7 days, stored in httpOnly cookie
- Auto-refresh every 14 minutes
- Tokens cleared on logout

### Password Security
- bcrypt hashing with 10 salt rounds
- Minimum 8 characters required
- Password not returned in API responses

### Cookie Security
```javascript
{
  httpOnly: true,           // Not accessible via JavaScript
  secure: true,             // HTTPS only (production)
  sameSite: 'strict',       // CSRF protection
  maxAge: 15 * 60 * 1000   // 15 minutes for access token
}
```

### Rate Limiting
- General API: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes

### Headers (Helmet.js)
- XSS Protection
- Content Security Policy
- HSTS
- Frame Options
- Content Type Options

---

## Common Patterns

### Check User Role
```javascript
const { user } = useAuth();

if (user?.role === 'admin') {
  // Show admin features
}

if (['staff', 'admin'].includes(user?.role)) {
  // Show staff features
}
```

### Conditional Rendering
```javascript
const { isAuthenticated, user } = useAuth();

return (
  <>
    {isAuthenticated ? (
      <button onClick={logout}>Logout</button>
    ) : (
      <Link to="/login">Login</Link>
    )}
    
    {user?.role === 'admin' && (
      <Link to="/admin">Admin Panel</Link>
    )}
  </>
);
```

### Axios with Credentials
```javascript
import axios from 'axios';

// Set globally
axios.defaults.withCredentials = true;

// Or per request
axios.get('/api/auth/profile', {
  withCredentials: true
});
```

---

## Troubleshooting

### Token Expired
Frontend automatically refreshes tokens every 14 minutes. If manual refresh needed:
```javascript
const { refreshToken } = useAuth();
await refreshToken();
```

### Unauthorized Access
Check:
1. User is authenticated: `isAuthenticated === true`
2. User has correct role: `user.role === 'admin'`
3. Cookies are being sent: `axios.defaults.withCredentials = true`

### CORS Issues
Ensure backend `.env` has:
```env
FRONTEND_URL=http://localhost:5173
```

And frontend axios is configured:
```javascript
axios.defaults.withCredentials = true;
```

---

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (optional for OAuth),
  role: String (enum: ['customer', 'staff', 'admin']),
  googleId: String (unique, sparse),
  avatar: String,
  refreshToken: String,
  createdAt: Date
}
```

---

## Migration Guide

### Updating Existing Users
To change a user's role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Adding New Roles
1. Update `userModel.js` enum
2. Update `verifyRole` middleware
3. Create new protected routes
4. Add frontend role checks

---

## Best Practices

1. **Never store tokens in localStorage** - Use httpOnly cookies
2. **Always use HTTPS in production** - Secure cookies require it
3. **Implement rate limiting** - Prevent brute force attacks
4. **Validate input** - Check email format, password length
5. **Use role-based access** - Don't rely on frontend checks alone
6. **Log security events** - Track failed login attempts
7. **Rotate secrets regularly** - Update JWT secrets periodically
8. **Monitor token usage** - Detect suspicious activity

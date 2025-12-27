# BlockCred Frontend - Complete Setup Guide

## Overview

A modern, sleek React frontend for the BlockCred blockchain certificate management system with full dark mode support and role-based access control.

## Architecture

### Authentication System
- JWT-based authentication
- Role-based access control (ADMIN, ISSUER)
- Protected routes with automatic redirects
- Token stored in localStorage

### User Roles

**ADMIN:**
- Register new certificate issuers
- Manage system settings
- Full access to admin dashboard (`/admin`)

**ISSUER:**
- Issue new certificates
- Upload certificate PDFs
- Fill student/course details
- Access to issuer dashboard (`/dashboard`) and issuance form (`/issue`)

**PUBLIC:**
- Verify certificates using certificate ID
- No authentication required
- Access to verification page (`/verify`)

## Features Implemented

### Core Functionality
- User authentication with email/password
- Role-based routing and access control
- Certificate issuance with PDF upload
- Certificate verification by ID
- Blockchain integration for immutable records
- IPFS storage for decentralized file hosting

### UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Dark mode with toggle switch
- Smooth transitions and animations
- Modern card-based layouts
- Icon integration (Lucide React)
- Loading states and error handling
- Success/error notifications
- Copy-to-clipboard functionality

### Design System
- Clean sky blue color scheme (avoiding purple/indigo)
- Consistent spacing using 8px system
- Card components with shadows and borders
- Custom buttons (primary, secondary)
- Styled input fields with focus states
- Hover effects and micro-interactions

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Main navigation with role-based menu
│   │   └── PrivateRoute.jsx        # Route protection wrapper
│   ├── context/
│   │   ├── AuthContext.jsx         # Authentication state management
│   │   └── ThemeContext.jsx        # Dark mode state management
│   ├── pages/
│   │   ├── Home.jsx                # Landing page
│   │   ├── Login.jsx               # Authentication page
│   │   ├── AdminDashboard.jsx      # Admin panel
│   │   ├── IssuerDashboard.jsx     # Issuer dashboard
│   │   ├── IssueCertificate.jsx    # Certificate issuance form
│   │   └── VerifyCertificate.jsx   # Certificate verification
│   ├── utils/
│   │   └── api.js                  # API client with axios
│   ├── App.jsx                      # Main app with routing
│   ├── main.jsx                     # Entry point with providers
│   └── index.css                    # Tailwind styles
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## API Endpoints

All endpoints connect to `http://localhost:8082`:

### Authentication
```
POST /auth/login
Body: { email, password }
Response: { token }

POST /auth/register
Headers: { Authorization: Bearer <admin_token> }
Body: { email, password }
Response: { message }
```

### Certificates
```
POST /certificates/issue
Headers: { Authorization: Bearer <issuer_token> }
Form Data:
  - name: string
  - registration_number: string
  - organization: string
  - course: string
  - marks: string
  - file: PDF file
Response: { status, certId, metadataCid, pdfCid }

GET /certificates/verify/:certId
Response: {
  certId, issuer, issuedAt, revoked, valid,
  ipfsCid, name, course, organization
}
```

## Certificate Flow

### Issuance Process
1. Issuer logs in with credentials
2. Navigates to "Issue Certificate" page
3. Fills form:
   - Student name
   - Registration number (used to generate certId)
   - Organization/Institution
   - Course name
   - Marks/Grade
4. Uploads certificate PDF
5. Submits form
6. Backend process:
   - PDF uploaded to IPFS → pdfCid
   - Certificate ID generated: SHA256(registration_number)
   - Metadata JSON created with all details
   - Metadata uploaded to IPFS → metadataCid
   - Transaction sent to blockchain smart contract
7. Response displayed with all CIDs and certId

### Verification Process
1. Anyone enters certificate ID (64-char hex)
2. Backend queries blockchain smart contract
3. Retrieves on-chain data (issuer, timestamp, revoked status)
4. Fetches metadata from IPFS using stored CID
5. Displays complete certificate information
6. Shows validity status (Valid / Revoked)

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Backend URL
The API base URL is set in `src/utils/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8082';
```

Change if backend runs on different port.

### 3. Run Development Server
```bash
npm run dev
```
Access at: `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```
Output: `dist/` directory

## Default Test Credentials

These users should exist in your PostgreSQL database:

### Admin Account
```sql
INSERT INTO users (email, password_hash, role) VALUES
('admin@blockcred.com', '$2a$10$<bcrypt_hash>', 'ADMIN');
```

To generate hash:
```bash
cd backend
go run hash.go
# Enter: admin123
```

### Issuer Account
```sql
INSERT INTO users (email, password_hash, role) VALUES
('issuer@university.com', '$2a$10$<bcrypt_hash>', 'ISSUER');
```

## Dark Mode

- Automatic system preference detection
- Manual toggle in navbar
- Persists to localStorage
- Smooth transitions on all elements
- Dark variants for all components

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^7.1.3",
  "axios": "^1.7.9",
  "lucide-react": "^0.469.0",
  "tailwindcss": "^4.0.16",
  "@tailwindcss/postcss": "^4.0.16"
}
```

## Troubleshooting

### Backend Connection Issues
- Ensure backend is running on port 8082
- Check CORS configuration in backend
- Verify Ethereum node is running

### Authentication Failures
- Verify credentials exist in database
- Check JWT secret matches in backend
- Ensure token is properly stored

### Certificate Upload Issues
- Check file size limits
- Verify IPFS (Pinata) is accessible
- Ensure backend `/tmp` directory exists

### Dark Mode Not Working
- Check localStorage for `darkMode` key
- Verify `dark` class on `<html>` element
- Clear browser cache if needed

## Future Enhancements

Potential improvements:
- Certificate history/list view
- Bulk certificate issuance
- Certificate revocation interface
- Advanced search/filters
- PDF preview before upload
- QR code generation for certificates
- Email notifications
- Multi-language support

## Security Considerations

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Protected routes require valid tokens
- Role-based access enforcement
- No sensitive data in localStorage (only tokens)
- HTTPS recommended for production

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

For backend setup, refer to the backend README and ensure:
1. PostgreSQL database is running
2. Ethereum local node is running (Hardhat)
3. Smart contract is deployed
4. Backend Go server is running on port 8082

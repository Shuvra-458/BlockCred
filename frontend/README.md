# BlockCred Frontend

A sleek, modern React frontend for the BlockCred blockchain-based certificate management system.

## Features

- Modern UI/UX with clean, responsive design
- Full dark mode support with system preference detection
- Role-Based Access Control (Admin, Issuer, Public)
- Blockchain certificate verification
- IPFS decentralized storage integration

## Tech Stack

- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Lucide React for icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## User Roles

### Admin
- Register new certificate issuers
- Access: `/admin`

### Issuer
- Issue certificates with PDF upload
- View dashboard
- Access: `/dashboard`, `/issue`

### Public
- Verify certificates by ID
- Access: `/verify`

## API Integration

Backend API: `http://localhost:8082`

- `POST /auth/login` - Authentication
- `POST /auth/register` - Register issuer (Admin only)
- `POST /certificates/issue` - Issue certificate (Issuer only)
- `GET /certificates/verify/:certId` - Verify certificate

## Default Credentials

Ensure these users exist in your database:

**Admin:**
- Email: `admin@blockcred.com`
- Password: `admin123`

**Issuer:**
- Email: `issuer@university.com`
- Password: `issuer123`

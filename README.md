# Product Store - EMI Plans Application

A full-stack e-commerce application for browsing products with EMI (Equated Monthly Installment) plans backed by mutual funds. The application features a React/Next.js frontend and an Express.js backend with MongoDB.

## Table of Contents

- [1. Setup and Run Instructions](#1-setup-and-run-instructions)
- [2. API Endpoints and Example Responses](#2-api-endpoints-and-example-responses)
- [3. Tech Stack Used](#3-tech-stack-used)
- [4. Schema Used](#4-schema-used)

---

## 1. Setup and Run Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following variables:

   ```env
   PORT=8000
   DB_URL=mongodb://localhost:27017/product-store
   frontendUrl=http://localhost:3000
   ```

   **Note:** Replace `DB_URL` with your MongoDB connection string. For MongoDB Atlas, use: `mongodb+srv://username:password@cluster.mongodb.net/database-name`

4. Seed the database with sample data:

   ```bash
   npm run seedData
   ```

   This will populate the database with sample products from `backend/constants/data.json`.

5. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:8000` (or the PORT specified in your `.env`).

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the `frontend` directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

   **Note:** Update this URL if your backend is running on a different port or domain.

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

### Running the Application

1. **Start MongoDB** (if using local installation):

   ```bash
   mongod
   ```

2. **Start the Backend Server:**

   ```bash
   cd backend
   npm run dev
   ```

3. **Start the Frontend Server** (in a new terminal):

   ```bash
   cd frontend
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Additional Commands

**Backend:**

- `npm run seedData` - Import sample data into the database
- `npm run deleteSeedData` - Delete all products from the database
- `npm start` - Start the production server

**Frontend:**

- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

---

## 2. API Endpoints and Example Responses

### Base URL

```
http://localhost:8000
```

### Endpoints

#### 1. Get All Products

**GET** `/product`

Retrieves a list of all products with formatted data.

**Response:**

```json
{
  "message": "All product are found",
  "success": true,
  "formattedProducts": [
    {
      "_id": "65e71234567890abcdef1234",
      "name": "iPhone 17 Pro 256 GB",
      "price": 127400,
      "discount": 134900,
      "type": "Mobile",
      "thumbnail": "https://m.media-amazon.com/images/I/51MKPhvvjmL._AC_SX522_.jpg"
    },
    {
      "_id": "65e71234567890abcdef5678",
      "name": "Samsung Galaxy S25 Ultra 12GB/256GB",
      "price": 104400,
      "discount": 114999,
      "type": "Mobile",
      "thumbnail": "https://images.samsung.com/is/image/samsung/p6pim/in/2501/gallery/in-galaxy-s25-s938-sm-s938bakbins-544702688?imbypass=true"
    }
  ]
}
```

#### 2. Get Product by ID

**GET** `/product/:id`

Retrieves detailed information about a specific product by its MongoDB ID.

**Parameters:**

- `id` (string, required) - MongoDB ObjectId of the product

**Response:**

```json
{
  "success": true,
  "product": {
    "_id": "65e71234567890abcdef1234",
    "productName": "iPhone 17 Pro 256 GB",
    "productPrice": 127400,
    "productType": "Mobile",
    "description": "The new iPhone 17 Pro with A19 Pro chip and advanced triple-camera system.",
    "discountPrice": 134900,
    "variants": [
      {
        "productColour": "Cosmic Orange",
        "productImage": [
          "https://m.media-amazon.com/images/I/51MKPhvvjmL._AC_SX522_.jpg",
          "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/q/r/1/-original-imahft6cqn3ftf4p.jpeg?q=70&crop=false",
          "https://m.media-amazon.com/images/I/51hrF0k7uEL._AC_SX569_.jpg"
        ]
      },
      {
        "productColour": "Deep Blue",
        "productImage": [
          "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/f/r/h/-original-imahft6chdhxfwhj.jpeg?q=70&crop=false",
          "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/q/r/1/-original-imahft6cqn3ftf4p.jpeg?q=70&crop=false",
          "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/e/a/x/-original-imahft6cggdjcqsv.jpeg?q=70&crop=false"
        ]
      }
    ],
    "emiPlans": [
      {
        "durationMonths": 6,
        "monthlyAmount": 22483,
        "interestRate": 0,
        "cashback": 7500
      },
      {
        "durationMonths": 12,
        "monthlyAmount": 11242,
        "interestRate": 0,
        "cashback": 7500
      },
      {
        "durationMonths": 24,
        "monthlyAmount": 5621,
        "interestRate": 10.5,
        "cashback": 7500
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 3. Health Check

**GET** `/`

Returns a simple message to verify the server is running.

**Response:**

```json
{
  "message": "Server is workin fine"
}
```

### Error Responses

**Error Response (Product Not Found):**

```json
{
  "message": "No product details found",
  "success": false
}
```

**Error Response (Server Error):**

```json
{
  "message": "Internal Server Error",
  "success": false
}
```

---

## 3. Tech Stack Used

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** (v5.1.0) - Web application framework for Node.js
- **MongoDB** - NoSQL database for storing product data
- **Mongoose** (v8.19.3) - MongoDB object data modeling (ODM) library
- **CORS** (v2.8.5) - Cross-Origin Resource Sharing middleware
- **Dotenv** (v17.2.3) - Environment variable management

### Frontend

- **Next.js** (v16.0.1) - React framework for production
- **React** (v19.2.0) - JavaScript library for building user interfaces
- **TypeScript** (v5) - Typed superset of JavaScript
- **Tailwind CSS** (v4) - Utility-first CSS framework
- **Shadcn/ui** - Reusable component library built with Radix UI and Tailwind CSS
- **Zustand** (v5.0.8) - Lightweight state management library
- **Axios** (v1.13.2) - Promise-based HTTP client
- **Lucide React** (v0.553.0) - Icon library
- **Class Variance Authority** (v0.7.1) - For component variants
- **clsx** (v2.1.1) - Utility for constructing className strings
- **tailwind-merge** (v3.3.1) - Merge Tailwind CSS classes

### Development Tools

- **ESLint** - Code linting
- **Nodemon** - Development server auto-reload (backend)
- **TypeScript** - Type checking

---

## 4. Schema Used

### Product Schema

The Product schema is defined using Mongoose and stored in MongoDB. It includes product details, variants, and EMI plans.

#### Product Model Structure

```javascript
{
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  productType: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  discountPrice: {
    type: Number
  },
  variants: [VariantSchema],
  emiPlans: [EMISchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

#### Variant Schema

Each product can have multiple variants (different colors, storage options, etc.).

```javascript
{
  productColour: {
    type: String
  },
  productImage: [{
    type: String  // Array of image URLs
  }]
}
```

#### EMI Plan Schema

Each product can have multiple EMI (Equated Monthly Installment) plans.

```javascript
{
  durationMonths: {
    type: Number,
    required: true
  },
  monthlyAmount: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    required: true,
    default: 0
  },
  cashback: {
    type: Number,
    default: 0
  }
}
```

### Example Document Structure

```json
{
  "_id": "65e71234567890abcdef1234",
  "productName": "iPhone 17 Pro 256 GB",
  "productPrice": 127400,
  "productType": "Mobile",
  "description": "The new iPhone 17 Pro with A19 Pro chip and advanced triple-camera system.",
  "discountPrice": 134900,
  "variants": [
    {
      "productColour": "Cosmic Orange",
      "productImage": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ]
    }
  ],
  "emiPlans": [
    {
      "durationMonths": 6,
      "monthlyAmount": 22483,
      "interestRate": 0,
      "cashback": 7500
    }
  ],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Database Collection

- **Collection Name:** `products`
- **Database:** As specified in your MongoDB connection string

### Indexes

The schema automatically includes `createdAt` and `updatedAt` timestamps. You may want to add indexes for:

- `productName` (for search functionality)
- `productType` (for filtering)
- `productPrice` (for sorting)

---

## Features

- ✅ Product listing page with product cards
- ✅ Product detail page with image gallery
- ✅ Product variant selection (colors/finishes)
- ✅ EMI plan selection with animations
- ✅ Toast notifications for user feedback
- ✅ Responsive design with Tailwind CSS
- ✅ Type-safe code with TypeScript
- ✅ State management with Zustand
- ✅ Slug-based URLs for SEO-friendly product pages

## Project Structure

```
fi_assignment/
├── backend/
│   ├── config/
│   │   ├── db.config.js
│   │   └── env.config.js
│   ├── constants/
│   │   └── data.json
│   ├── controller/
│   │   └── productController.js
│   ├── models/
│   │   └── productModel.js
│   ├── routes/
│   │   └── productRoute.js
│   ├── scripts/
│   │   └── seedData.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── products/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── store/
│   │   │   └── useProducts.ts
│   │   └── utils/
│   └── package.json
└── README.md
```

## Author

Ashwani Sharma

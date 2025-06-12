# E-commerce Backend API

A RESTful backend API for a basic e-commerce platform built with **Node.js**, **Express.js**, and **MongoDB**. This project provides core e-commerce functionality, including managing products, categories, carts, and orders. Authentication is intentionally excluded to focus on core features.

This project was developed as a learning exercise to demonstrate CRUD operations, database relationships, and API design. It's well-structured, tested, and ready to run locally or extend with additional features.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
  - [Categories](#categories)
  - [Products](#products)
  - [Carts](#carts)
  - [Orders](#orders)
- [Testing the API](#testing-the-api)
- [Acknowledgements](#acknowledgements)

## Features

- **Categories**:
  - Create, read, update, and delete (CRUD) product categories.
- **Products**:
  - CRUD operations for products.
  - Filter products by category.
  - Search products by name (case-insensitive).
- **Carts**:
  - Add items to a cart.
  - Update item quantities or remove items.
  - View cart with total price calculation.
  - Clear cart.
- **Orders**:
  - Create orders from carts.
  - View order details and history.
  - Update product stock when orders are created.
- **Database Integration**:
  - Uses MongoDB for data storage with Mongoose for schema management.
- **RESTful Design**:
  - Follows REST principles with clear endpoint naming and HTTP status codes.
- **No Authentication**:
  - Public endpoints for simplicity, ideal for learning purposes.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **ES Modules**: Modern JavaScript module system (`import`/`export`).
- **Tools**:
  - **npm**: Package manager.
  - **nodemon**: Auto-restarts server during development.
  - **Postman**: Recommended for API testing.
  - **MongoDB Atlas**: Cloud MongoDB service (or local MongoDB).

## Project Structure

```
ecommerce-api/
├── config/
│   └── db.js               # MongoDB connection setup
├── models/
│   ├── Product.js         # Product schema
│   ├── Category.js        # Category schema
│   ├── Cart.js            # Cart schema
│   └── Order.js           # Order schema
├── routes/
│   ├── productRoutes.js   # Product API routes
│   ├── categoryRoutes.js  # Category API routes
│   ├── cartRoutes.js      # Cart API routes
│   └── orderRoutes.js     # Order API routes
├── controllers/
│   ├── productController.js # Product business logic
│   ├── categoryController.js # Category business logic
│   ├── cartController.js    # Cart business logic
│   └── orderController.js  # Order business logic
├── .env                   # Environment variables (not tracked)
├── .gitignore             # Files/folders to ignore in Git
├── package.json           # Project metadata and dependencies
└── server.js              # Entry point for the server
```

- **config/**: Handles database connection.
- **models/**: Defines MongoDB schemas using Mongoose.
- **routes/**: Express Router files for API endpoints.
- **controllers/**: Business logic for each endpoint.
- **.env**: Stores sensitive data like MongoDB URI and port.
- **server.js**: Initializes Express server and connects to MongoDB.

## Prerequisites

Before running the project, ensure you have:

- **Node.js** (v16 or higher): Install from https://nodejs.org/.
  - Verify with `node -v` and `npm -v`.
- **MongoDB**:
  - Option 1: Use **MongoDB Atlas** (cloud) for a free database (recommended).
  - Option 2: Install MongoDB locally (https://www.mongodb.com/docs/manual/installation/).
- **Postman** (optional): For testing API endpoints (https://www.postman.com/downloads/).
- A text editor like **VS Code** (recommended).
- Basic knowledge of JavaScript, REST APIs, and terminal commands.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ecommerce-api.git
   cd ecommerce-api
   ```

2. **Install Dependencies**:
   Run the following command to install required packages:
   ```bash
   npm install
   ```
   - Installs `express`, `mongoose`, `dotenv`, and `nodemon`.

3. **Set Up MongoDB**:
   - **MongoDB Atlas (recommended)**:
     - Sign up at https://www.mongodb.com/cloud/atlas.
     - Create a free cluster (choose a cloud provider, e.g., AWS).
     - Create a database user (save username and password).
     - Allow network access from `0.0.0.0/0` (for local development).
     - Copy the connection string (e.g., `mongodb+srv://username:password@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority`).
   - **Local MongoDB**:
     - Install MongoDB and start the service (`mongod`).
     - Use `mongodb://localhost:27017/ecommerce` as the connection string.

4. **Create .env File**:
   In the project root, create a `.env` file:
   ```bash
   touch .env
   ```
   Add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
   - Replace `your_mongodb_connection_string` with your MongoDB Atlas URI or local MongoDB URI.
   - Example for Atlas:
     ```env
     MONGO_URI=mongodb+srv://user:pass@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority
     ```

5. **Verify .gitignore**:
   Ensure `.gitignore` includes:
   ```
   node_modules/
   .env
   ```
   This prevents sensitive data and dependencies from being pushed to GitHub.

## Configuration

- **Port**: The API runs on `http://localhost:5000` by default (change `PORT` in `.env` if needed).
- **Database**: Ensure MongoDB is running (local) or accessible (Atlas).
- **ES Modules**: The project uses ES Modules (`"type": "module"` in `package.json`).

## Running the Project

1. **Start the Server**:
   ```bash
   npm start
   ```
   - Uses `nodemon` to auto-restart on file changes.
   - You should see:
     ```
     Server running on port 5000
     MongoDB connected
     ```

2. **Test the API**:
   - Open a browser or Postman and visit `http://localhost:5000/`.
   - Expected response: "API is running".
   - If you see errors:
     - Check `.env` for correct `MONGO_URI`.
     - Ensure MongoDB is running or Atlas network access is allowed.
     - Verify dependencies are installed (`npm install`).

## API Endpoints

All endpoints are prefixed with `http://localhost:5000/api/`. Use Postman or a similar tool to test them. Below is a detailed list of endpoints, methods, and expected request/response formats.

### Categories

Manage product categories.

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/categories` | List all categories | None | `200: { data: [{ _id, name, description }] }` |
| GET | `/categories/:id` | Get a category by ID | None | `200: { _id, name, description }` |
| POST | `/categories` | Create a category | `{ "name": "Electronics", "description": "Gadgets" }` | `201: { _id, name, description }` |
| PUT | `/categories/:id` | Update a category | `{ "name": "Updated", "description": "New" }` | `200: { _id, name, description }` |
| DELETE | `/categories/:id` | Delete a category | None | `200: { message: "Category deleted" }` |

**Notes:**
- `name` must be unique (enforced by schema).
- `:id` is the MongoDB `_id` (24-character hex string).

### Products

Manage products with category filtering and search.

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/products` | List all products | None | `200: { data: [{ _id, name, price, ... }] }` |
| GET | `/products/:id` | Get a product by ID | None | `200: { _id, name, price, ... }` |
| GET | `/products?category=id` | Filter by category | None | `200: { data: [products] }` |
| GET | `/products?search=keyword` | Search by name | None | `200: { data: [products] }` |
| POST | `/products` | Create a product | `{ "name": "Laptop", "price": 999.99, "stock": 50, "category": "id" }` | `201: { _id, name, price, ... }` |
| PUT | `/products/:id` | Update a product | `{ "name": "Laptop Pro", "price": 1299.99, ... }` | `200: { _id, name, price, ... }` |
| DELETE | `/products/:id` | Delete a product | None | `200: { message: "Product deleted" }` |

**Notes:**
- `category` is the `_id` of a category.
- Search is case-insensitive (e.g., "laptop" matches "Laptop").
- `price` and `stock` must be non-negative.

### Carts

Manage shopping carts.

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/cart/:id` | View cart by ID | None | `200: { _id, items: [{ product, quantity }], totalPrice }` |
| POST | `/cart` | Add item to cart | `{ "product": "productId", "quantity": 2 }` | `201: { _id, items, totalPrice }` |
| PUT | `/cart/:id` | Update cart (quantity/remove) | `{ "product": "productId", "quantity": 3 }` | `200: { _id, items, totalPrice }` |
| DELETE | `/cart/:id` | Clear cart | None | `200: { message: "Cart cleared" }` |

**Notes:**
- `product` is a product `_id`.
- `quantity` must be positive (set to 0 to remove an item).
- `totalPrice` is calculated automatically.
- Cart ID is returned on creation and used for subsequent requests.

### Orders

Manage orders created from carts.

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/orders` | List all orders | None | `200: { data: [{ _id, items, totalPrice, status, createdAt }] }` |
| GET | `/orders/:id` | View order by ID | None | `200: { _id, items, totalPrice, status, createdAt }` |
| POST | `/orders` | Create order from cart | `{ "cartId": "cartId" }` | `201: { _id, items, totalPrice, status, createdAt }` |

**Notes:**
- Creates an order, deletes the cart, and reduces product stock.
- `status` defaults to "pending" (options: pending, shipped, delivered).
- `cartId` is the cart's `_id`.

## Testing the API

1. **Use Postman**:
   - Create a Postman collection named "Ecommerce API".
   - Add requests for each endpoint (organized into folders: Categories, Products, Carts, Orders).
   - Example workflow:
     - Create a category (`POST /api/categories`).
     - Create a product with the category's `_id` (`POST /api/products`).
     - Add the product to a cart (`POST /api/cart`).
     - Create an order from the cart (`POST /api/orders`).
   - Test edge cases:
     - Invalid IDs (expect 400 or 404).
     - Duplicate category names (expect 400).
     - Out-of-stock products (expect 400).

2. **Verify in MongoDB**:
   - Use MongoDB Atlas or MongoDB Compass to check data in the `ecommerce` database.
   - Collections: `categories`, `products`, `carts`, `orders`.
   - Confirm stock updates and cart deletion after orders.

3. **Common Issues**:
   - **MongoDB Connection Error**: Verify `MONGO_URI` in `.env` and Atlas network access.
   - **404 Errors**: Ensure correct endpoint URLs and valid IDs.
   - **500 Errors**: Check server console for logs and fix controller logic.


## Acknowledgements

- **Express.js** and **Mongoose** for simplifying API and database development.
- **MongoDB Atlas** for providing a free cloud database.
- **Postman** for API testing.
---

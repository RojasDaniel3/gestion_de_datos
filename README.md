# Product Manager App

This project is a simple product manager application built with JavaScript. It allows you to **add**, **edit**, and **delete** products using a REST API, all done within the webpage.

## 🔧 Features

- **Add product** with **name** and **price**
- **Edit product** (update name and/or price)
- **Delete product** with confirmation
- Show products in a dynamically created **table**
- **SweetAlert2** for interactive alerts (error, success, confirm)
- **axios** for handling HTTP requests (GET, POST, PATCH, DELETE)

## 📦 How it works

1. The product list is initially empty.
2. You can **add** a new product by entering a name and price, then clicking **Save**.
3. To **edit** a product, click the **Edit** button next to a product. The current name and price will appear in the form. Make your changes and click **Update** to save.
4. To **delete** a product, click the **Delete** button next to the product, and confirm the action in a confirmation prompt.

### Workflow:
- The list is displayed in a table dynamically created via JavaScript.
- All operations (add, edit, delete) are done using `axios` to make HTTP requests to a **JSON Server** API running locally.

## 🚫 Validations

- **Name** and **Price** are required for both adding and updating products.
- **Price** must be a number greater than 0.
- **Product names** must be unique (no duplicates).
- When updating a product, you must change at least one field (name or price).
- When editing, the **name** must not conflict with an existing product's name.

## 🛠 Technologies

- **HTML**: Structure of the page.
- **CSS**: Basic styles for the app.
- **JavaScript**: Handles the logic, DOM manipulation, and event handling.
- **SweetAlert2**: For beautiful and customizable pop-up alerts.
- **axios**: Used for making HTTP requests to interact with the **JSON Server** API.

## 🧠 Practice Objectives

This project helps you to:
- Work with objects and arrays.
- Use **events** and **DOM manipulation** effectively.
- Practice **data validation** for user input.
- Interact with a **REST API** using `axios` instead of `fetch`.
- Avoid using `console.log()` and display relevant information on the page itself.

---

## 📋 Endpoints (JSON Server API)

The API uses **JSON Server** running locally at `http://localhost:3000/products`. Here are the available endpoints:

- **GET /products**: Retrieve the list of products.
- **POST /products**: Add a new product.
- **PATCH /products/:id**: Update a product.
- **DELETE /products/:id**: Delete a product.

Make sure to have **JSON Server** running on your machine for the app to function correctly.

---

## 🛠 Setup

1. Clone the repository to your local machine.
2. Install **JSON Server** globally if you haven't yet:
   ```bash
   npm install -g json-server
3. Start JSON Server with a default database (db.json) in your project folder:
    json-server --watch db.json --port 3000
4. Open the project in your browser and start managing products!
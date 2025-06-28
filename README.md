# Product Manager App

This is a small project to manage a list of products using JavaScript.  
You can **add**, **edit**, and **delete** products. All is done in the webpage (not in console).

## 🔧 Features

- Add product with **name** and **price**
- Edit product (change name and/or price)
- Delete product with confirmation
- Show products in a table
- SweetAlert2 is used for alerts (error, success, confirm)

## 📦 How it works

- First, the list is empty.
- You write the product name and price.
- Click **Save** to add it.
- If you click **Edit**, the data will go back to the form.
- Change something and click **Update**.
- You can only update if you change something.

## 🚫 Validations

- Name and price are required.
- Price must be a number and more than 0.
- Can't repeat the same name.
- When editing, name must not be same as another product.
- You need to change something to update.

## 📁 Technologies

- HTML
- CSS (basic)
- JavaScript (DOM, Arrays, Events)
- SweetAlert2

## 🧠 Practice Objective

This project helps to:
- Work with objects and arrays
- Use events and DOM
- Practice data validation
- Practice not using `console.log()` and show info on screen

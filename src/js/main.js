// Import libraries
import Swal from "sweetalert2";
import axios from "axios";

// API URL
const apiUrl = "http://localhost:3000/products";
let products = []; // Products array

// DOM elements
const $name = document.getElementById("name");
const $price = document.getElementById("price");
const $btnSave = document.getElementById("btn-save");
const $productList = document.getElementById("product-list");
const $form = document.getElementById("product-form");

// Create table
const table = document.createElement("table");
table.setAttribute("id", "product-table");

const thead = document.createElement("thead");
const headerRow = document.createElement("tr");
["ID", "Name", "Price", "Options"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);
$productList.appendChild(table);

// Show products in table
async function displayProducts() {
    const table = document.getElementById("product-table");
    const oldTbody = table.querySelector("tbody");
    if (oldTbody) oldTbody.remove();

    const tbody = document.createElement("tbody");

    try {
        const response = await axios.get(apiUrl);
        products = response.data;

        products.forEach(product => {
            const tr = document.createElement("tr");

            const tdId = document.createElement("td");
            tdId.textContent = product.id;

            const tdName = document.createElement("td");
            tdName.textContent = product.name;

            const tdPrice = document.createElement("td");
            tdPrice.textContent = `$${product.price.toFixed(2)}`;

            const tdOptions = document.createElement("td");
            tdOptions.setAttribute("id", "buttons"); // Options buttons here

            const btnEdit = document.createElement("button");
            btnEdit.textContent = "Edit";
            btnEdit.addEventListener("click", () => updateProduct(product.id));

            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Delete";
            btnDelete.addEventListener("click", () => deleteProduct(product.id));

            tdOptions.appendChild(btnEdit);
            tdOptions.appendChild(btnDelete);

            tr.appendChild(tdId);
            tr.appendChild(tdName);
            tr.appendChild(tdPrice);
            tr.appendChild(tdOptions);
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
    } catch (err) {
        console.log("Error in loading products:", err); // Uh, error here
    }
}

// Save new product
async function saveProduct() {
    const productName = $name.value.trim();
    const priceValue = parseFloat($price.value);

    // Check if input is good
    if (!productName || isNaN(priceValue) || priceValue <= 0) {
        Swal.fire("Error", "Please enter valid values.", "error");
        return;
    }

    try {
        const res = await axios.get(apiUrl);
        const existing = res.data;

        if (existing.some(p => p.name.toLowerCase() === productName.toLowerCase())) {
            Swal.fire("Error", "That product name already exists.", "error");
            return;
        }

        await axios.post(apiUrl, { name: productName, price: priceValue });

        $name.value = "";
        $price.value = "";

        Swal.fire("Saved", "Product saved.", "success");
        displayProducts();
    } catch (err) {
        console.log("Error saving product:", err); // Something went wrong
    }
}

// Delete product
async function deleteProduct(id) {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "This can't be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            Swal.fire("Deleted!", "Product deleted.", "success");
            displayProducts();
        } catch (err) {
            console.log("Error deleting product:", err); // Oops, error delete
        }
    }
}

// Prepare to edit product
function updateProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    $name.value = product.name;
    $price.value = product.price;

    $btnSave.textContent = "Update";
    $btnSave.setAttribute("data-id", id);
}

// Save updated product
async function saveUpdatedProduct(id) {
    const productName = $name.value.trim();
    const priceValue = parseFloat($price.value);

    if (!productName || isNaN(priceValue) || priceValue <= 0) {
        Swal.fire("Error", "Please enter valid data.", "error");
        return;
    }

    try {
        const currentProduct = await axios.get(`${apiUrl}/${id}`);
        const current = currentProduct.data;

        const nameChanged = current.name.toLowerCase() !== productName.toLowerCase();
        const priceChanged = current.price !== priceValue;

        if (!nameChanged && !priceChanged) {
            Swal.fire("Error", "You must change at least one field.", "error");
            return;
        }

        const allProducts = await axios.get(apiUrl); 
        if (
            nameChanged &&
            allProducts.data.some(p => p.name.toLowerCase() === productName.toLowerCase())
        ) {
            Swal.fire("Error", "Name already used by another product.", "error");
            return;
        }

        await axios.patch(`${apiUrl}/${id}`, {
            name: productName,
            price: priceValue,
        });

        $name.value = "";
        $price.value = "";
        $btnSave.textContent = "Save";
        $btnSave.removeAttribute("data-id");

        displayProducts();
        Swal.fire("Updated!", "Product updated.", "success");
    } catch (err) {
        console.log("Error updating product:", err); // Error in update
    }
}

// Handle form submission
$form.addEventListener("submit", function (e) {
    e.preventDefault();

    if ($btnSave.textContent === "Save") {
        saveProduct();
    } else if ($btnSave.textContent === "Update") {
        const productId = $btnSave.getAttribute("data-id");
        saveUpdatedProduct(productId);
    }
});

// Initial load of products
displayProducts();
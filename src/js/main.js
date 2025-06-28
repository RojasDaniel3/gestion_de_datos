import Swal from "sweetalert2";

// Product list (starts empty)
let products = [];

// DOM references
const $name = document.getElementById("name");
const $price = document.getElementById("price");
const $btnSave = document.getElementById("btn-save");
const $productList = document.getElementById("product-list");
const $form = document.getElementById("product-form");

// Create table with headers
const table = document.createElement("table");
table.setAttribute("id", "product-table");

const thead = document.createElement("thead");
const headerRow = document.createElement("tr");
const thId = document.createElement("th");
thId.textContent = "ID";
const thName = document.createElement("th");
thName.textContent = "Name";
const thPrice = document.createElement("th");
thPrice.textContent = "Price";
const thOptions = document.createElement("th");
thOptions.textContent = "Options";

headerRow.appendChild(thId);
headerRow.appendChild(thName);
headerRow.appendChild(thPrice);
headerRow.appendChild(thOptions);
thead.appendChild(headerRow);
table.appendChild(thead);
$productList.appendChild(table);

// Generate random unique ID
function generateRandomId() {
    const randomId = Math.floor(Math.random() * 9000) + 1000;
    const exists = products.find(p => p.id === randomId);
    return exists ? generateRandomId() : randomId;
}

// Save a new product
function saveProduct() {
    const productName = $name.value.trim();
    const priceValue = parseFloat($price.value);

    if (!productName || isNaN(priceValue) || priceValue <= 0) {
        Swal.fire("Error", "Please enter valid values.", "error");
        return;
    }

    if (products.some(p => p.name.toLowerCase() === productName.toLowerCase())) {
        Swal.fire("Error", "That product name already exists.", "error");
        return;
    }

    const newProduct = {
        id: generateRandomId(),
        name: productName,
        price: priceValue,
    };

    products.push(newProduct);
    $name.value = "";
    $price.value = "";

    Swal.fire("Saved", "Product saved successfully.", "success");
    displayProducts();
}

// Show products on the page
function displayProducts() {
    const table = document.getElementById("product-table");
    const oldTbody = table.querySelector("tbody");
    if (oldTbody) oldTbody.remove();

    const tbody = document.createElement("tbody");

    products.forEach(product => {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = product.id;

        const tdName = document.createElement("td");
        tdName.textContent = product.name;

        const tdPrice = document.createElement("td");
        tdPrice.textContent = `$${product.price.toFixed(2)}`;

        const tdOptions = document.createElement("td");
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
}

// Delete product
function deleteProduct(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "This can't be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
    }).then(result => {
        if (result.isConfirmed) {
            products = products.filter(p => p.id !== id);
            displayProducts();
            Swal.fire("Deleted!", "Product deleted.", "success");
        }
    });
}

// Start editing a product
function updateProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    $name.value = product.name;
    $price.value = product.price;
    $btnSave.textContent = "Update";
    $btnSave.setAttribute("data-id", id);
}

// Save updated product
function saveUpdatedProduct(id) {
    const productName = $name.value.trim();
    const priceValue = parseFloat($price.value);

    if (!productName || isNaN(priceValue) || priceValue <= 0) {
        Swal.fire("Error", "Please enter valid data.", "error");
        return;
    }

    const currentProduct = products.find(p => p.id === Number(id));
    if (!currentProduct) return;

    const nameChanged = currentProduct.name.toLowerCase() !== productName.toLowerCase();
    const priceChanged = currentProduct.price !== priceValue;

    if (!nameChanged && !priceChanged) {
        Swal.fire("Error", "You must change at least one field.", "error");
        return;
    }

    if (nameChanged && products.some(p => p.name.toLowerCase() === productName.toLowerCase())) {
        Swal.fire("Error", "Name already used by another product.", "error");
        return;
    }

    currentProduct.name = productName;
    currentProduct.price = priceValue;

    $name.value = "";
    $price.value = "";
    $btnSave.textContent = "Save";
    $btnSave.removeAttribute("data-id");

    displayProducts();
    Swal.fire("Updated!", "Product updated.", "success");
}

// Handle form submit
$form.addEventListener("submit", function (e) {
    e.preventDefault();

    if ($btnSave.textContent === "Save") {
        saveProduct();
    } else if ($btnSave.textContent === "Update") {
        const productId = $btnSave.getAttribute("data-id");
        saveUpdatedProduct(productId);
    }
});

displayProducts();

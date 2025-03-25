document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadBuyers();
});

function saveData(type) {
    let data = JSON.parse(localStorage.getItem(type)) || [];
    const form = document.querySelector(`#${type}-form`);
    const formData = new FormData(form);
    let entry = {};
    formData.forEach((value, key) => entry[key] = value);
    entry.id = Date.now();
    data.push(entry);
    localStorage.setItem(type, JSON.stringify(data));
    form.reset();
    if (type === 'products') loadProducts();
    else loadBuyers();
}

function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    const productList = document.getElementById("product-list");
    productList.innerHTML = products.map(product => `<p>${product.name} - ${product.category} - $${product.price} 
        <button onclick="deleteItem('products', ${product.id})">Delete</button></p>`).join('');
}

function loadBuyers() {
    let buyers = JSON.parse(localStorage.getItem("buyers")) || [];
    const buyerList = document.getElementById("buyer-list");
    buyerList.innerHTML = buyers.map(buyer => `<p>${buyer.name} - ${buyer.email} - ${buyer.phone} 
        <button onclick="deleteItem('buyers', ${buyer.id})">Delete</button></p>`).join('');
}

function deleteItem(type, id) {
    let data = JSON.parse(localStorage.getItem(type)) || [];
    data = data.filter(item => item.id !== id);
    localStorage.setItem(type, JSON.stringify(data));
    if (type === 'products') loadProducts();
    else loadBuyers();
}
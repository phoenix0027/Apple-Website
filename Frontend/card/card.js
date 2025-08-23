let cart = [];

function addToCart() {
    const productSelect = document.getElementById('product');
    const option = productSelect.selectedOptions[0];
    const name = option.value;
    const price = Number(option.dataset.price);

    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    const cartItems = document.getElementById('cartItems');

    if (cart.length > 0) {
        cartDiv.style.display = "block";
        cartItems.innerHTML = "";
        cart.forEach((item, i) => {
            cartItems.innerHTML += `<div class="line"><span>${item.name}</span><span>₹${item.price.toLocaleString("en-IN")}</span></div>`;
        });
    }
}

function checkout() {
    document.getElementById('buyForm').style.display = "block";
}

document.getElementById('buyForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let total = 0;
    let productListHTML = "";
    cart.forEach(item => {
        total += item.price;
        productListHTML += `<div class="line"><span>${item.name}</span><span>₹${item.price.toLocaleString("en-IN")}</span></div>`;
    });

    document.getElementById('billProducts').innerHTML = productListHTML;
    document.getElementById('billName').textContent = document.getElementById('name').value;
    document.getElementById('billEmail').textContent = document.getElementById('email').value;
    document.getElementById('billAddress').textContent = document.getElementById('address').value;
    document.getElementById('billPayment').textContent = document.getElementById('payment').value;
    document.getElementById('billTotal').textContent = "₹" + total.toLocaleString("en-IN");

    document.getElementById('bill').style.display = "block";
});
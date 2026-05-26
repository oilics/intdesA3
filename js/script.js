
const products = [
    {id: 1, name: "Blend Number 9", price: 20.00, img: "images/number9.png"},
    {id: 2, name: "Autumn Seasonal Blend", price: 20.00, img: "images/houseblend.png"},
    {id: 3, name: "TCC Coffee Cup", price: 20.00, img: "images/keepcup.png"}
];

let cart = [];

const productList = document.querySelector('.product-list');

products.forEach(product => {
    productList.innerHTML += `
        <div class="product">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
});
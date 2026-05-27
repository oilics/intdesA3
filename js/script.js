
const products = [
    {id: 1, name: "Blend Number 9", price: 30.00, img: "images/number9.png", rating: "images/ratingstars.png", url: "phproduct1.html"},
    {id: 2, name: "Autumn Seasonal Blend", price: 30.00, img: "images/houseblend.png", rating: "images/ratingstars.png", url: "phproduct2.html"},
    {id: 3, name: "TCC Coffee Cup", price: 20.00, img: "images/keepcup.png", rating: "images/ratingstars.png", url: "phproduct3.html"},

];

let cart = [];
let scrollAmount = 0;

const productList = document.querySelector('.product-list');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');


let productHTML = '';
products.forEach(product => {
    productHTML += `
        <div class="product">
            <a href="${product.url}" class="product-img-link">
                <img src="${product.img}" alt="${product.name}">
            </a>
            <a href="${product.url}" class="product-img-link">
                <h3 class="saira-semi-condensed-medium">${product.name}</h3>
            </a>
            <img src="${product.rating}" class="star-rating">
            <p class="saira-semi-condensed-medium">$${product.price}</p>
            <button onclick="addToCart(${product.id})" class="saira-semi-condensed-medium" >Add to Cart</button>
        </div>
    `;
});

productList.innerHTML = productHTML;

window.addToCart = function(productId) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = products.find(p => p.id === productId);
        cart.push({...product, quantity: 1});
    }

console.log("Current Cart:", cart);
updateCartBadge();
};

nextBtn.addEventListener('click', () => {
    const productCard = document.querySelector('.product');
    const carouselView = document.querySelector('.carousel-view');
    if (!productCard || !carouselView) return;

    const cardWidth = productCard.offsetWidth + 20;

    carouselView.style.scrollSnapType = 'none';
    carouselView.scrollBy({left: cardWidth, behavior: 'smooth'});
    setTimeout(() => {
        carouselView.style.scrollSnapType = 'x mandatory';
    }, 400);

});

prevBtn.addEventListener('click', () => {
    const productCard = document.querySelector('.product');
    const carouselView = document.querySelector('.carousel-view');
    if (!productCard || !carouselView) return;

    const cardWidth = productCard.offsetWidth + 20;

    carouselView.style.scrollSnapType = 'none';
    carouselView.scrollBy({left: -cardWidth, behavior: 'smooth'});
    setTimeout(() => {
        carouselView.style.scrollSnapType = 'x mandatory';
    }, 400);

});

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;

    const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

    badge.textContent = totalItemsInCart;

    if (totalItemsInCart > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
}
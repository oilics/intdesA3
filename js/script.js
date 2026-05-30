
const products = [
    {id: 1, name: "Blend Number 9", price: 30.50, img: "images/number9.png", rating: "images/ratingstars.png", url: "phproduct1.html"},
    {id: 2, name: "Autumn Seasonal Blend", price: 30.50, img: "images/houseblend.png", rating: "images/ratingstars.png", url: "phproduct2.html"},
    {id: 3, name: "TCC Coffee Cup", price: 24.99, img: "images/keepcup.png", rating: "images/ratingstars.png", url: "phproduct3.html"},
    {id: 4, name: "TCC Tote Bag", price: 29.99, img: "images/tote.png", rating: "images/ratingstars.png", url: "phproduct4.html"},

];

let cart = [];
let scrollAmount = 0;








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

window.addSelectedQuantityToCart = function(productId) {
    const quantityInput = document.getElementById('prodquantity');
    if (!quantityInput) return;
    const chosenQuantity = parseInt(quantityInput.value);
    if (isNaN(chosenQuantity) || chosenQuantity < 1) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += chosenQuantity;
    } else {
        const product = products.find(p => p.id === productId);
        cart.push({...product, quantity: chosenQuantity});
    }
    console.log("Current Cart:", cart);
    updateCartBadge();

};


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








document.addEventListener('DOMContentLoaded', () => {
    
    // == HOMEPAGE CAROUSEL ============================= //
    const productList = document.querySelector('.product-list');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (productList) {
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
    }
    if (nextBtn) {
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
    }

    if (prevBtn) {
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
    }

    // == PRODUCT PAGE GALLERY ============================= //

    const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');
    const galleryView = document.querySelector('.gallery-view');


    if (galleryPrev && galleryNext && galleryView) {
        galleryNext.addEventListener('click', () => {
            const item = galleryView.querySelector('.gallery-item');
            if (item) {
                galleryView.style.scrollSnapType = 'none';
                galleryView.scrollBy({left: item.offsetWidth, behavior: 'smooth'});
                setTimeout(() => {
                    galleryView.style.scrollSnapType = 'x mandatory';
                }, 400);
            }
        });

        galleryPrev.addEventListener('click', () => {
            const item = galleryView.querySelector('.gallery-item');
            if (item) {
                galleryView.style.scrollSnapType = 'none';
                galleryView.scrollBy({left: -item.offsetWidth, behavior: 'smooth'});
                setTimeout(() => {
                    galleryView.style.scrollSnapType = 'x mandatory';
                }, 400);
            }
        });
    }

    // == DA HAMBURGER ============================= //
    const hambIcon = document.getElementById('hamb-icon');
    const navDropdown = document.getElementById('nav-dropdown');
    const navClose = document.getElementById('nav-close');
    if (hambIcon && navDropdown) {
        hambIcon.addEventListener('click', () => {
            navDropdown.classList.add('active');
        });
        if (navClose) {
            navClose.addEventListener('click', () => {
                navDropdown.classList.remove('active');
            });
        }
    }
});


window.switchProductTab = function(event, targetPanelID) {
    const headings = document.querySelectorAll('.tab-heading');
    const panels = document.querySelectorAll('.tab-panel');
    headings.forEach(heading => heading.classList.remove('active'));
    panels.forEach(panel => panel.classList.remove('active'));
    event.currentTarget.classList.add('active');
    const targetPanel = document.getElementById(targetPanelID);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
};

window.adjustProductQty = function(changeValue) {
    const quantityInput = document.getElementById('prodquantity');
    if (!quantityInput) return;
    let currentQty = parseInt(quantityInput.value);
    let newQty = currentQty + changeValue;
    if (newQty < 1) {
        newQty = 1;
    }
    quantityInput.value = newQty;
}
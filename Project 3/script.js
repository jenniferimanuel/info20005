// SEARCH BAR
        const params = new URLSearchParams(window.location.search);
        const searchQuery = params.get("search");
        
        const products = document.querySelectorAll(".product-card");

        if (searchQuery && products.length > 0) {
            const value = searchQuery.toLowerCase();

            products.forEach(function(product) {
                    const productName = product.dataset.name.toLowerCase();

                if (productName.includes(value)){
                    product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
     }

// Size Buttons: choosing size 
const sizeButtons = document.querySelectorAll(".size-btn");
let selectedSize = "";
sizeButtons.forEach(function(button){
  button.addEventListener("click", function (){
    sizeButtons.forEach(function(btn){
        btn.classList.remove("selected");
    });
    button.classList.add("selected");
    selectedSize = button.textContent;
  });
});

//ADD to cart
const addToCartButton = document.querySelector(".add-to-cart-button");
if (addToCartButton) {
    addToCartButton.addEventListener("click", function () {
        //adding user error prevention
        if (selectedSize ==="") {
            alert("Please choose a size first.");
            return;
        }
        const product = {
            name: addToCartButton.dataset.name,
            price: Number(addToCartButton.dataset.price),
            image: addToCartButton.dataset.image,
            quantity: Number(document.getElementById("quantity-value").textContent),
            size: selectedSize
        };
        //save product into local storage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);

        console.log(product);
        console.log(cart);

        localStorage.setItem("cart", JSON.stringify(cart));
        //go to shopping cart page
        window.location.href="shopping-cart.html";
        });
}
// displaying CART ITEM
const cartItemsList = document.getElementById("cart-items-list");
const cartSubtotal = document.getElementById("cart-subtotal");

if (cartItemsList && cartSubtotal) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;
    cartItemsList.innerHTML = "";
    cart.forEach(function(item, index) {
        subtotal = subtotal + item.price * item.quantity;

        cartItemsList.innerHTML += `
        <div class="cart-item-card">
                <img class="cart-product-image" src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">
                <h2>${item.name}</h2>
                <p>Size: ${item.size}</p>
                <p class="cart-price">$${item.price}</p>

                <div class="cart-quantity">
                    <button type="button" onclick="decreaseCartQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button type="button" onclick="increaseCartQuantity(${index})">+</button>
                </div>

                <button type="button" onclick="removeCartItem(${index})" class="remove-cart-btn">
                Remove
                </button>
            </div>
        </div>
        `;
    });
    cartSubtotal.textContent = "$" + subtotal;
}

//to increase and decrease quantity
function increaseCartQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function decreaseCartQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

//REMOVE product
function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

//QUANTITY Buttons
const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");
const quantityValue = document.getElementById("quantity-value");

if (minusBtn && plusBtn && quantityValue) {
    minusBtn.addEventListener("click", function () {
        let quantity = Number(quantityValue.textContent);
        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
        }
    });
    plusBtn.addEventListener("click", function () {
        let quantity = Number(quantityValue.textContent);
        quantity++;
        quantityValue.textContent = quantity;
    });
}


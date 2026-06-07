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
    // if carts empty:
    const emptyCartMessage = document.getElementById("empty-cart-message");

    let subtotal = 0;
    cartItemsList.innerHTML = "";
    //if carts empty:
    if (cart.length ===0) {
       if (emptyCartMessage) {
        emptyCartMessage.style.display = "block";
       }
       cartSubtotal.textContent = "$0";
        } else {

       if (emptyCartMessage) {
        emptyCartMessage.style.display = "none";
       }
    //cart summary
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

//CHECKOUT summary
const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");

if (checkoutItems && checkoutTotal) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;
    checkoutItems.innerHTML = "";

    cart.forEach(function(item) {
        total = total + item.price * item.quantity;

        checkoutItems.innerHTML += `
            <div class="checkout-item">
                <p>${item.name}</p>
                <p>$${item.price * item.quantity}</p>
            </div>
        `;
    });
    checkoutTotal.textContent = "$" + total;
}

//fill in container on CHECKOUT page

const confirmBtn = document.getElementById("confirm-order");

if (confirmBtn) {
    confirmBtn.addEventListener("click", function (e) {
        e.preventDefault ();

        const fullName = document.getElementById("full-name").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const postcode = document.getElementById("postcode").value.trim();

        const cardholder = document.getElementById("cardholder-name").value.trim();
        const cardNumber = document.getElementById("card-number").value.trim();
        const expiryDate = document.getElementById("expiry-date").value.trim();
        const cvc = document.getElementById("cvc").value.trim();

        if (
            !fullName ||
            !address ||
            !city ||
            !postcode ||
            !cardholder ||
            !cardNumber ||
            !expiryDate ||
            !cvc
        ) {
            alert("Please fill in all fields.");
            return;
        }
        //preventing user error:
        //card number = exactly 16 digit
        if (!/^\d{16}$/.test(cardNumber)) {
            alert("Card number must be 16 digits.");
            return;
        }

        //CVC = exactly 3 digits
        if (!/^\d{3}$/.test(cvc)) {
            alert("CVC must be exactly 3 digits.");
            return;
        }

        //Expiry Date = MM/YY
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)){
            alert("Expiry date must be in MM/YY format.");
            return;
        }
        //Success
        window.location.href = "confirmed.html";
    });
}

//CONFIRMED PAGE summary
const confirmedItems = document.getElementById("confirmed-items");
const confirmedTotal = document.getElementById("confirmed-total");

if(confirmedItems && confirmedTotal) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    confirmedItems.innerHTML = "";

    cart.forEach(function(item) {
        total = total + item.price * item.quantity;

        confirmedItems.innerHTML += `
        <div class="confirmed-item">
            <p>${item.name}</p>
            <p>$${item.price * item.quantity}</p>
        </div>
        `
    ;
});
confirmedTotal.textContent = "$" + total;
}

// ADDING products to FAVOURITES
const favouriteButtons = document.querySelectorAll(".favorite-btn");
favouriteButtons.forEach(function(button) {
    
    button.addEventListener("click", function(event) {
        event.preventDefault();
        const favouriteProduct = {
            name: button.dataset.name,
            price:button.dataset.image,
            link: button.dataset.link
        };

        let favourites =
        JSON.parse(localStorage.getItem("favourites")) || [];

        const exists = favourites.some(function(item) {
            return item.name === favouriteProduct.name;
        });

        if (!exists) {
            favourites.push(favouriteProduct);
            localStorage.setItem(
                "favourites",
                JSON.stringify(favourites)
            );
            alert("Added to favourites!")
        }
        });
    });

// DISPLAYING fav page 
const favouritesList = document.getElementById("favourites-list");

const emptyFavouritesMessage = document.getElementById("empty-favourites-message");

if(favouritesList) {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    
    favouritesList.innerHTML = "";
    if (favourites.length === 0) {
        emptyFavouritesMessage.style.display="block";
    } else {
        favourites.forEach(function(item) {
            favouritesList.innerHTML += `
            <div class="product-card">
            <a href="${item.link}" class="product-link">
                <img src="${item.image}" alt="${item.name}">
            </a>

            <div class="product-info">
                <p>${item.name}</p>
                <p>$${item.price}</p>
            </div
            </div>
            `;
        });
        }
    }
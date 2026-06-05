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
        localStorage.setItem("cartItem",JSON.stringify(product));
        //go to shopping cart page
        window.location.href="shopping-cart.html";
        });
}
// displaying CART ITEM
const cartItem = JSON.parse(localStorage.getItem("cartItem"));
if (cartItem && document.getElementById("cart-name")){
    document.getElementById("cart-image").src=cartItem.image;
    document.getElementById("cart-name").textContent=cartItem.name;
    document.getElementById("cart-price").textContent="$" + cartItem.price;
    document.getElementById("cart-size").textContent = "Size: " + cartItem.size;
    document.getElementById("cart-quantity-value").textContent= cartItem.quantity;
    document.getElementById("cart-subtotal").textContent="$" + (cartItem.price * cartItem.quantity);
}

//Quantity Buttons
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
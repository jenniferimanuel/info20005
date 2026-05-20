//SEARCH BAR
//search input, select all product cards
function searchResult () {
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-card");
const form= document.querySelector(".search-form")
form.addEventListener("submit", function(event) {
    event.preventDefault();
});

searchInput.addEventListener ("keyup", function() {
//so it's not case sensitive
    const value = searchInput.value.toLowerCase();
    
    //loop through every product
    products.forEach (function(product) {
        //get product keyword
        const productName = product.dataset.name.toLowerCase();
        //check value if it matches
        if (productName.includes(value)){
            product.style.display = "block";}
        else {product.style.display = "none";}
    });
});
}
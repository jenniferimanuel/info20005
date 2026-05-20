//SEARCH BAR
    //search bar function
    const searchInput = document.getElementById("searchInput");
    const products = query.SelectorAll(".product-card");
    const form = document.querySelector(".search-form");
    //error prevention: to stop page from refreshing when search button clicked
    if (form){
        form.addEventListener("keyup", function () {
        const value = searchInput.value.toLowerCase();
        
        products.forEach(function(product) {
            const productName = product.dataset.name.toLowerCase();

            if (productName.includes(value)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
        });
    }

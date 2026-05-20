//SEARCH BAR
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

     button.addEventListener("click", function() {
        alert("clicked");
     });
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       🌟 WELCOME MESSAGE
    ========================== */

    alert("Welcome to GLAM ME UP CO— Luxury Bespoke Fashion");

    /* =========================
       🔍 SEARCH FUNCTION
    ========================== */

    const searchInput = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearSearch");
    const products = document.querySelectorAll(".product-card");
    const noResults = document.getElementById("noResults");

    function filterProducts() {

        if (!searchInput) return;

        const value = searchInput.value.toLowerCase().trim();

        let found = 0;

        products.forEach(product => {

            const keywords = product.getAttribute("data-search");

            if (!keywords) return;

            if (keywords.toLowerCase().includes(value)) {
                product.style.display = "block";
                found++;
            } else {
                product.style.display = "none";
            }

        });

        // Reset view if empty search
        if (value === "") {
            products.forEach(product => {
                product.style.display = "block";
            });
        }

        // No results message
        if (noResults) {
            noResults.style.display =
                (found === 0 && value !== "") ? "block" : "none";
        }
    }
    const searchBtn = document.querySelector(".search-box button[type='button']");
    
    if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        searchInput.focus();
        filterProducts();
    });
}
    searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        filterProducts();
    }
});

    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            searchInput.value = "";
            filterProducts();
        });
    }

    /* =========================
       🛒 SIMPLE CART (SAFE VERSION)
       ========================= */

    const cartCount = document.getElementById("cart-count");
    let count = 0;

    document.querySelectorAll(".add-cart").forEach(button => {
        button.addEventListener("click", () => {

            count++;

            if (cartCount) {
                cartCount.textContent = count;
            }

            button.textContent = "Added ✓";

            setTimeout(() => {
                button.textContent = "Add to Cart";
            }, 1000);

        });
    });

});

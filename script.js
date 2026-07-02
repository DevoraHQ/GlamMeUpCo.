document.addEventListener("DOMContentLoaded", () => {

    try {

        /* =========================
           🌟 WELCOME MESSAGE
        ========================== */

        alert("Welcome to GLAM ME UP CO");

        /* =========================
           🔍 SEARCH
        ========================== */

        const searchInput = document.getElementById("searchInput");
        const clearBtn = document.getElementById("clearSearch");
        const searchBtn = document.getElementById("searchBtn");

        function filterProducts() {

            const products = document.querySelectorAll(".product-card");
            const value = searchInput.value.toLowerCase().trim();

            let found = 0;

            products.forEach(product => {

                const keywords = product.dataset.search || "";

                if (keywords.toLowerCase().includes(value)) {
                    product.style.display = "block";
                    found++;
                } else {
                    product.style.display = "none";
                }

            });

            const noResults = document.getElementById("noResults");

            if (noResults) {
                noResults.style.display =
                    (found === 0 && value !== "") ? "block" : "none";
            }
            console.log("Search value:", value);
            console.log("Products found:", products.length);
        }

        /* =========================
           EVENTS
        ========================== */

        if (searchInput) {
            searchInput.addEventListener("input", filterProducts);

            searchInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    filterProducts();
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener("click", filterProducts);
        }

        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                searchInput.value = "";
                filterProducts();
            });
        }

        /* =========================
           🛒 CART SAFE VERSION
        ========================== */

        let count = 0;
        const cartCount = document.getElementById("cart-count");

        document.querySelectorAll(".add-cart").forEach(btn => {
            btn.addEventListener("click", () => {

                count++;

                if (cartCount) {
                    cartCount.textContent = count;
                }

                btn.textContent = "Added ✓";

                setTimeout(() => {
                    btn.textContent = "Add to Cart";
                }, 1000);

            });
        });

    } catch (error) {
        console.log("Script error prevented crash:", error);
    }

});

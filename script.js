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
    const suggestions = document.getElementById("searchSuggestions");
    
    if (!searchInput) return;
            
    const value = searchInput.value.toLowerCase().trim();

    let found = 0;

    suggestions.innerHTML = "";

    products.forEach(product => {

        const keywords = product.dataset.search || "";
        const title = product.querySelector("h3").textContent;

        if (value === "" || keywords.toLowerCase().includes(value)) {

            product.style.display = "block";

            found++;

            if(value !== ""){

                const item = document.createElement("div");

                item.textContent = title;

                item.onclick = () => {

                    window.location.href =
                    "search.html?search=" +
                    encodeURIComponent(title);

                };

                suggestions.appendChild(item);

            }

        } else {

            product.style.display = "none";

        }

    });

    suggestions.style.display =
        (value !== "" && found > 0) ? "block" : "none";

    const noResults = document.getElementById("noResults");

    if(noResults){

        noResults.style.display =
            (found === 0 && value !== "")
            ? "block"
            : "none";

    }
    // ✅ DEBUG (safe inside function)
    console.log("Search value:", value);
    console.log("Matched products:", found);

}
const toggleSearch = document.getElementById("toggleSearch");
const searchBox = document.getElementById("searchBox");

toggleSearch.addEventListener("click", () => {

    searchBox.classList.add("active");

    toggleSearch.style.display = "none";

    searchInput.focus();

});
    document.addEventListener("click", (event) => {

    const wrapper = document.querySelector(".search-wrapper");

if (
    wrapper &&
    !wrapper.contains(event.target) &&
    searchBox.classList.contains("active")
) {

    searchBox.classList.remove("active");
    toggleSearch.style.display = "flex";

    searchInput.value = "";
    filterProducts();

}
        
const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");


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

            searchInput.focus();

        });

    }

        /* =========================
           🛒 CART SAFE VERSION
        ========================== */

        document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        count++;

        if (cartCount) {
            cartCount.textContent = count;

            if (count > 0) {
                cartCount.style.display = "inline";
            }
        }

        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = "Add to Cart";
        }, 1000);

    });

});

// <-- Close the try block
} catch (error) {

    console.log("Script error prevented crash:", error);

}

if (menuToggle && sideMenu) {

    menuToggle.addEventListener("click", () => {
        sideMenu.classList.add("active");
    });

    document.addEventListener("click", (e) => {

        if (
            !sideMenu.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            sideMenu.classList.remove("active");
        }

    });

}

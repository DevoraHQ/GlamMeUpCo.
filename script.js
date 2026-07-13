document.addEventListener("DOMContentLoaded", () => {

    try {

        /* =========================
           🌟 WELCOME MESSAGE
        ========================== */
        alert("Welcome to GLAM ME UP CO");

        /* =========================
           🔍 SEARCH SYSTEM
        ========================== */

        const searchInput = document.getElementById("searchInput");
        const clearBtn = document.getElementById("clearSearch");
        const searchBtn = document.getElementById("searchBtn");
        const toggleSearch = document.getElementById("toggleSearch");
        const searchBox = document.getElementById("searchBox");
        const suggestions = document.getElementById("searchSuggestions");

        function goToSearchPage(value) {
            if (!value) return;

            window.location.href =
                "search.html?search=" + encodeURIComponent(value);
        }

        function filterProducts() {

            if (!searchInput) return;

            const products = document.querySelectorAll(".product-card");
            const value = searchInput.value.toLowerCase().trim();

            let found = 0;

            if (suggestions) suggestions.innerHTML = "";

            products.forEach(product => {

                const keywords = product.dataset.search || "";
                const title = product.querySelector("h3")?.textContent || "";

                const match = keywords.toLowerCase().includes(value);

                if (value === "" || match) {

                    product.style.display = "block";
                    found++;

                    if (value !== "" && suggestions) {

                        const item = document.createElement("div");
                        item.textContent = title;

                        item.addEventListener("click", () => {
                            goToSearchPage(title);
                        });

                        suggestions.appendChild(item);
                    }

                } else {
                    product.style.display = "none";
                }

            });

            if (suggestions) {
                suggestions.style.display =
                    (value !== "" && found > 0) ? "block" : "none";
            }

            const noResults = document.getElementById("noResults");

            if (noResults) {
                noResults.style.display =
                    (found === 0 && value !== "") ? "block" : "none";
            }
        }

        /* =========================
           🔍 SEARCH ICON TOGGLE
        ========================== */

        if (toggleSearch && searchBox) {

            toggleSearch.addEventListener("click", () => {
                searchBox.classList.add("active");
                toggleSearch.style.display = "none";

                if (searchInput) searchInput.focus();
            });

        }

        /* click outside search closes it */
        document.addEventListener("click", (event) => {

            const wrapper = document.querySelector(".search-wrapper");

            if (
                wrapper &&
                searchBox &&
                searchBox.classList.contains("active") &&
                !wrapper.contains(event.target)
            ) {

                searchBox.classList.remove("active");

                if (toggleSearch) toggleSearch.style.display = "flex";

                if (searchInput) searchInput.value = "";

                filterProducts();
            }
        });

        /* =========================
           🔘 SEARCH EVENTS
        ========================== */

        if (searchInput) {

            searchInput.addEventListener("input", filterProducts);

            searchInput.addEventListener("keypress", (e) => {

                if (e.key === "Enter") {
                    goToSearchPage(searchInput.value.trim());
                }

            });
        }

        if (searchBtn) {
            searchBtn.addEventListener("click", () => {
                goToSearchPage(searchInput.value.trim());
            });
        }

        if (clearBtn) {

            clearBtn.addEventListener("click", () => {

                searchInput.value = "";
                filterProducts();
                searchInput.focus();

            });

        }
        /* =========================
           🛒 CART SYSTEM (UPGRADED)
        ========================= */
        
        const cartCount = document.getElementById("cart-count");
        
        // Load cart from storage or start empty
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Save cart helper
        function saveCart() {
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        }
        
        // Update cart number
        function updateCartUI() {
        
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
            if (cartCount) {
                cartCount.textContent = totalItems;
        
                // Only show when items exist
                cartCount.style.display = totalItems > 0 ? "flex" : "none";
            }
        }
        
        // Add product to cart
        function addToCart(productName, price) {
        
            const existing = cart.find(item => item.name === productName);
        
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: price,
                    quantity: 1
                });
            }
        
            saveCart();
        }
        
        // Attach to buttons
        document.querySelectorAll(".add-cart").forEach(button => {
        
            button.addEventListener("click", (e) => {
        
                const card = e.target.closest(".product-card");
        
                const name = card.querySelector("h3").textContent;
                const priceText = card.querySelector(".price").textContent;
                const price = parseFloat(priceText.replace("£", ""));
        
                addToCart(name, price);
        
                button.textContent = "Added ✓";
        
                setTimeout(() => {
                    button.textContent = "Add to Cart";
                }, 1000);
        
            });
        
        });
        
        const cartIcon = document.getElementById("cartIcon");
        const cartPanel = document.getElementById("cartPanel");
        const cartOverlay = document.getElementById("cartOverlay");
        
        if (cartIcon && cartPanel && cartOverlay) {
        
            cartIcon.addEventListener("click", () => {
                cartPanel.classList.add("open");
                cartOverlay.classList.add("active");
            });
        
            cartOverlay.addEventListener("click", () => {
                cartPanel.classList.remove("open");
                cartOverlay.classList.remove("active");
            });
        
        }
        
        // Initial UI load
        updateCartUI();
        
        /* =========================
           🍔 MENU SYSTEM
        ========================== */

        const menuToggle = document.getElementById("menuToggle");
        const sideMenu = document.getElementById("sideMenu");

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

    } catch (error) {
        console.log("Script error prevented crash:", error);
    }

});

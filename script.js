alert("Welcome to GLAM ME UP — Luxury Bespoke Fashion ✨");
let total =
    Number(localStorage.getItem("total")) || 0;

totalElement.textContent = total;

const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart-panel");

document.querySelector(".cart-icon")
.addEventListener("click", () => {
    cartPanel.classList.toggle("open");
});

document.querySelectorAll(".add-cart")
.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        total += price;

        const item = document.createElement("li");

        item.appendChild(
            document.createTextNode(`${name} - £${price} `)
        );
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "✖";
        item.appendChild(removeBtn);

cartItems.appendChild(item);

item.querySelector(".remove-btn")
.addEventListener("click", () => {

    total -= price;

    totalElement.textContent = total;

    item.remove();

    cartCount.textContent =
        cartItems.children.length;
});

        totalElement.textContent = total;

        cartCount.textContent =
            cartItems.children.length;
    });

});
localStorage.setItem("total", total);

document.querySelector(".checkout-btn")
.addEventListener("click", () => {

    alert(
        "Thank you for shopping with GLAM ME UP. Online payment coming soon."
    );

});
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearSearch");
const products = document.querySelectorAll(".product-card");
const noResults = document.getElementById("noResults");

function filterProducts() {

    const search = searchInput.value.toLowerCase().trim();

    let found = 0;

    products.forEach(product => {

        const keywords = product.dataset.search.toLowerCase();

        if (keywords.includes(search)) {

            product.style.display = "block";
            product.style.border = "2px solid #E8A3B5";
            found++;

        } else {

            product.style.display = "none";

        }

    });

    if (search === "") {

        products.forEach(product => {

            product.style.display = "block";
            product.style.border = "1px solid #eee";

        });

    }

    noResults.style.display =
        (found === 0 && search !== "") ? "block" : "none";

}

searchInput.addEventListener("input", filterProducts);

clearBtn.addEventListener("click", () => {

    searchInput.value = "";

    filterProducts();

});

function filterProducts(category) {

    document
        .querySelectorAll(".product")
        .forEach(product => {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

}

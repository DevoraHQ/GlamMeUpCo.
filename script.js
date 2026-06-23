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

item.innerHTML = `
    ${name} - £${price}
    <button class="remove-btn">✖</button>
`;

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
const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const value =
            searchInput.value.toLowerCase();

        document
            .querySelectorAll(".product")
            .forEach(product => {

                const text =
                    product.innerText.toLowerCase();

                product.style.display =
                    text.includes(value)
                    ? "block"
                    : "none";

            });

    });

}

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
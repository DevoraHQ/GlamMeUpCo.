// =========================
// GLAM ME UP CO - Search Results
// =========================

// Current products
const products = [

    {
        title: "Evening Dress",
        price: "£180",
        image: "images/dress1.jpg",
        keywords: "evening dress elegant style luxury birthday formal women party"
    },

    {
        title: "Luxury Gown",
        price: "£250",
        image: "images/dress2.jpg",
        keywords: "luxury gown formal style wedding evening party women elegant prom"
    },

    {
        title: "Signature Set",
        price: "£220",
        image: "images/dress3.jpg",
        keywords: "signature set bespoke style fashion outfit casual party women ladies"
    }

];

// Read search from URL
const params = new URLSearchParams(window.location.search);
const search = (params.get("search") || "").toLowerCase().trim();

const resultsContainer = document.getElementById("searchResults");
const heading = document.getElementById("searchHeading");
const count = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

heading.textContent = `Search Results for "${search}"`;

let matches = 0;

products.forEach(product => {

    if (product.keywords.toLowerCase().includes(search)) {

        matches++;

        resultsContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p class="price">${product.price}</p>

            <button class="add-cart">
                Add to Cart
            </button>

        </div>

        `;

    }

});

count.textContent =
    matches === 1
    ? "1 product found"
    : `${matches} products found`;

if (matches === 0) {
    noResults.style.display = "block";
}

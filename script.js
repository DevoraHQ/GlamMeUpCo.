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
   🛒 CART SYSTEM (FULL VERSION)
========================= */

const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartIcon = document.querySelector(".cart-icon");
const closeCart = document.getElementById("closeCart");


let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* SAVE CART */

function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

}


/* UPDATE CART DISPLAY */

function updateCart(){

    if(!cartItems || !cartTotal) return;


    cartItems.innerHTML = "";


    let total = 0;

    let itemCount = 0;


    if(cart.length === 0){

        cartItems.innerHTML = `

        <div class="empty-cart">

            <h3>Your bag is empty</h3>

            <p>Add something beautiful.</p>

        </div>

        `;

    }


    cart.forEach((item,index)=>{


        total += item.price * item.quantity;

        itemCount += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

        <div class="cart-details">

            <h3>${item.name}</h3>

            <p>£${item.price}</p>


            <div class="quantity-controls">

                <button class="minus" data-index="${index}">
                    -
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button class="plus" data-index="${index}">
                    +
                </button>

            </div>

        </div>


        <button class="remove-item" data-index="${index}">
            Remove
        </button>

        `;


        cartItems.appendChild(cartItem);


    });



    cartTotal.textContent = 
        "£" + total.toFixed(2);



    // Update small cart number

    if(cartCount){

        cartCount.textContent = itemCount;

        cartCount.style.display =
        itemCount > 0 ? "block" : "none";

    }



    addCartButtonEvents();

}



/* ADD PRODUCTS */

function addToCart(name,price){


    const existing = cart.find(
        item => item.name === name
    );


    if(existing){

        existing.quantity++;

    }

    else{

        cart.push({

            name:name,

            price:price,

            quantity:1

        });

    }


    saveCart();

}



/* PRODUCT BUTTONS */

document.querySelectorAll(".add-cart")
.forEach(button=>{


button.addEventListener("click",()=>{


const card = button.closest(".product-card");


const name =
card.querySelector("h3").textContent;


const price =
parseFloat(
card.querySelector(".price")
.textContent.replace("£","")
);



addToCart(name,price);



button.textContent="Added ✓";


setTimeout(()=>{

button.textContent="Add to Cart";

},1000);



});


});



/* QUANTITY + REMOVE BUTTONS */

function addCartButtonEvents(){


document.querySelectorAll(".plus")
.forEach(button=>{


button.onclick=()=>{

let index = button.dataset.index;

cart[index].quantity++;

saveCart();

};


});



document.querySelectorAll(".minus")
.forEach(button=>{


button.onclick=()=>{


let index = button.dataset.index;


if(cart[index].quantity > 1){

cart[index].quantity--;

}

else{

cart.splice(index,1);

}


saveCart();


};


});



document.querySelectorAll(".remove-item")
.forEach(button=>{


button.onclick=()=>{


let index = button.dataset.index;


cart.splice(index,1);


saveCart();


};


});


}



/* OPEN CART */

if(cartIcon && cartPanel && cartOverlay){


cartIcon.addEventListener("click",()=>{


cartPanel.classList.add("open");

cartOverlay.classList.add("active");


});


}



/* CLOSE CART */

if(closeCart){


closeCart.addEventListener("click",()=>{


cartPanel.classList.remove("open");

cartOverlay.classList.remove("active");


});


}



if(cartOverlay){


cartOverlay.addEventListener("click",()=>{


cartPanel.classList.remove("open");

cartOverlay.classList.remove("active");


});


}



/* LOAD CART WHEN PAGE OPENS */

updateCart();
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

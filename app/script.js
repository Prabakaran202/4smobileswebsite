const whatsappNumber = "919999999999"; // change to your number

const products = [
    {
        brand: "vivo",
        name: "Vivo Y21",
        price: 12999,
        stock: true,
        img: "https://via.placeholder.com/150?text=Vivo"
    },
    {
        brand: "oppo",
        name: "Oppo A17",
        price: 11999,
        stock: true,
        img: "https://via.placeholder.com/150?text=Oppo"
    },
    {
        brand: "samsung",
        name: "Samsung A14",
        price: 14999,
        stock: false,
        img: "https://via.placeholder.com/150?text=Samsung"
    },
    {
        brand: "redmi",
        name: "Redmi Note 12",
        price: 13999,
        stock: true,
        img: "https://via.placeholder.com/150?text=Redmi"
    },
    {
        brand: "realme",
        name: "Realme Narzo 50",
        price: 12999,
        stock: true,
        img: "https://via.placeholder.com/150?text=Realme"
    }
];

const container = document.getElementById("productContainer");

function displayProducts(filter = "all", search = "") {
    container.innerHTML = "";

    products
        .filter(p => (filter === "all" || p.brand === filter))
        .filter(p => p.stock)
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .forEach(p => {

            const message = `Hello, I want to buy ${p.name} for ₹${p.price}`;
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            container.innerHTML += `
                <div class="card">
                    <img src="${p.img}">
                    <h3>${p.name}</h3>
                    <p class="price">₹${p.price}</p>
                    <p style="color:lime;">Available</p>
                    <a href="${whatsappLink}" target="_blank">
                        <button>Order on WhatsApp</button>
                    </a>
                </div>
            `;
        });
}

function filterBrand(brand) {
    displayProducts(brand, document.getElementById("search").value);
}

function searchProduct() {
    displayProducts("all", document.getElementById("search").value);
}

// load
displayProducts();
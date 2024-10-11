const menuItems = [
    { id: 1, name: "Burger", price: 3500, image: "assets/images/burger.jpg" },
    { id: 2, name: "Pizza", price: 4500, image: "assets/images/pizza.jpg" },
    { id: 3, name: "Salad", price: 2800, image: "assets/images/salad.jpg" },
    { id: 4, name: "Pasta", price: 4000, image: "assets/images/pasta.jpg" },
    { id: 5, name: "Grilled Chicken", price: 4800, image: "assets/images/grilled-chicken.jpg" },
    { id: 6, name: "Soda", price: 1500, image: "assets/images/soda.jpg" },
    { id: 7, name: "Sandwich", price: 2800, image: "assets/images/sandwich.jpg" },
    { id: 8, name: "Steak", price: 6500, image: "assets/images/steak.jpg" },
];

const menuContainer = document.getElementById("menu");
const orderList = document.getElementById("order-list");
const totalElement = document.getElementById("total");
const placeOrderButton = document.getElementById("place-order");

let order = [];

function renderMenu() {
    menuItems.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "col-lg-3 col-md-6 col-sm-6 mb-4";
        itemElement.innerHTML = `
            <div class="card food-item" data-id="${item.id}">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">₦${item.price.toLocaleString()}</p>
                </div>
            </div>
        `;
        menuContainer.appendChild(itemElement);
    });
}

function addToOrder(item) {
    const existingItem = order.find(orderItem => orderItem.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        order.push({ ...item, quantity: 1 });
    }
    updateOrderDisplay();
}

function updateOrderDisplay() {
    orderList.innerHTML = "";
    let total = 0;
    order.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${item.name} x ${item.quantity}
            <span>
                ₦${(item.price * item.quantity).toLocaleString()}
                <button class="btn btn-danger btn-sm ms-2 remove-item" data-index="${index}">Remove</button>
            </span>
        `;
        orderList.appendChild(li);
        total += item.price * item.quantity;
    });
    totalElement.textContent = total.toLocaleString();
}

function removeFromOrder(index) {
    order.splice(index, 1);
    updateOrderDisplay();
}

menuContainer.addEventListener("click", (e) => {
    const foodItem = e.target.closest(".food-item");
    if (foodItem) {
        const itemId = parseInt(foodItem.dataset.id);
        const selectedItem = menuItems.find(item => item.id === itemId);
        if (selectedItem) {
            addToOrder(selectedItem);
        }
    }
});

placeOrderButton.addEventListener("click", () => {
    if (order.length === 0) {
        alert("Please add items to your order before placing it.");
    } else {
        alert("Thank you for your order! It will be ready soon.");
        order = [];
        updateOrderDisplay();
    }
});

orderList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
        const index = parseInt(e.target.dataset.index);
        removeFromOrder(index);
    }
});

renderMenu();

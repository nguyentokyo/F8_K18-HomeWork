
//task01
const inputName = document.getElementById("inputName");
const resultName = document.getElementById("resultName");
const saveBtn = document.getElementById("saveBtn");
const readBtn = document.getElementById("readBtn");
const deleteBtn = document.getElementById("deleteBtn");

window.onload = function () {
    const savedName = localStorage.getItem("username");
    if (savedName) {
        resultName.textContent = "Tên đã lưu: " + savedName;
    }

    renderCart();       // Task3 load
};

function renderName() {
    const savedName = localStorage.getItem("username");
    if (savedName) {
        resultName.textContent = "Tên đã lưu: " + savedName;
    } else {
        resultName.textContent = "Chưa có dữ liệu!";
    }
}

saveBtn.addEventListener("click", () => {
    const name = inputName.value;
    localStorage.setItem("username", name);
    inputName.value = "";
})

readBtn.addEventListener("click", () => {
    renderName()
})

deleteBtn.addEventListener("click", () => {
    localStorage.removeItem("username");
    resultName.textContent = "Dữ liệu đã bị xóa"
})

//task 02
const visitCountEl = document.getElementById("visitCount");
const resetBtn = document.getElementById("resetBtn");
let count = localStorage.getItem("visitCount");

if (!count) {
    count = 0;
}

count++;
localStorage.setItem("visitCount", count);

visitCountEl.textContent = "Bạn đã truy cập trang này " + count + " lần.";

// Reset
resetBtn.addEventListener("click", () => {
    localStorage.setItem("visitCount", 0);
    visitCountEl.textContent = "Bạn đã truy cập trang này 0 lần.";
});

//task3
const cartList = document.getElementById("cartList");
const countEl = document.getElementById("count");
const productItemEl = document.getElementById("products");
const clearBtn = document.getElementById("clearBtn");

const products = [
    { id: 1, name: "Áo" },
    { id: 2, name: "Quần" },
    { id: 3, name: "Giày" },
    { id: 4, name: "Dép" },
    { id: 5, name: "Mũ" },
    { id: 6, name: "Balo" },
    { id: 7, name: "Cặp sách" },
];

products.forEach((product) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = product.name;
    p.style.width = "200px"

    const btn = document.createElement("button");
    btn.textContent = "Thêm";
    btn.onclick = () => addToCart(product.id);

    div.appendChild(p);
    div.appendChild(btn);

    productItemEl.appendChild(div);
});

cart = []

function addToCart(productid) {
    const cart = getCart();
    cart.push(productid);
    saveCart(cart)
    console.log(cart);
    renderCart();
}

function saveCart(cart) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
}
function getCart() {
    return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function renderCart() {
    const cart = getCart();

    cartList.innerHTML = "";

    cart.forEach(id => {
        const product = products.find(p => p.id === id);

        const li = document.createElement("li");
        li.textContent = product ? product.name : "Unknown";
        cartList.appendChild(li);
    });

    countEl.textContent = cart.length;
}

clearBtn.addEventListener("click", () => {
    sessionStorage.removeItem("cart");
    renderCart();
});



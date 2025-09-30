// Simple login function
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  // Valid credentials
  if ((username === "admin" && password === "admin123") ||
      (username === "user" && password === "password") ||
      (username === "demo" && password === "demo123")) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials! Try: admin/admin123 or user/password or demo/demo123");
  }
}

// Check login status
function checkLogin() {
  if (window.location.pathname.includes("index.html")) {
    if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "login.html";
    }
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  checkLogin();
  
  // Setup login form
  const form = document.getElementById("loginForm");
  if (form) {
    form.onsubmit = handleLogin;
  }
  
  // Load products
  if (document.getElementById("productGrid")) {
    renderProducts(products);
    setTimeout(() => {
      const loading = document.getElementById("loading");
      if (loading) loading.style.display = "none";
    }, 500);
  }
});

// Logout function
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// Products data
const products = [
  { id: 1, name: "Leather Wallet", price: "$39", category: "fashion", img: "images/wallet.jpg", desc: "Premium leather wallet." },
  { id: 2, name: "Luxury Watch", price: "$199", category: "fashion", img: "images/watch.jpg", desc: "Elegant timepiece for all occasions." },
  { id: 3, name: "Coffee Mug", price: "$12", category: "home", img: "images/mug.jpg", desc: "Perfect for your morning coffee." },
  { id: 4, name: "Scented Candle", price: "$18", category: "home", img: "images/candle.jpg", desc: "Relax with a warm candle scent." },
  { id: 5, name: "Tote Bag", price: "$25", category: "lifestyle", img: "images/tote.jpg", desc: "Eco-friendly canvas tote bag." },
  { id: 6, name: "Backpack", price: "$59", category: "lifestyle", img: "images/backpack.jpg", desc: "Durable backpack for travel & work." }
];

// Render products
function renderProducts(items) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = "";
  items.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
    `;
    card.onclick = () => openModal(p);
    grid.appendChild(card);
  });
}


// Filtering
function filterProducts(cat) {
  if (cat === "all") {
    renderProducts(products);
  } else {
    renderProducts(products.filter(p => p.category === cat));
  }
}

// Modal
let currentProduct = null;
function openModal(p) {
  currentProduct = p;
  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalTitle").innerText = p.name;
  document.getElementById("modalPrice").innerText = p.price;
  document.getElementById("modalDesc").innerText = p.desc;
  document.getElementById("productModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("productModal").style.display = "none";
  currentProduct = null;
}

// Add to cart function
function addToCart() {
  if (currentProduct) {
    alert(`${currentProduct.name} added to cart!`);
    closeModal();
  }
}

// Filter products with active state
function filterProducts(cat) {
  // Remove active class from all buttons
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  
  // Add active class to clicked button
  if (event && event.target) {
    event.target.classList.add('active');
  }
  
  if (cat === "all") {
    renderProducts(products);
  } else {
    renderProducts(products.filter(p => p.category === cat));
  }
}

// Sample Tech Products Array
const products = [
    {
        id: 1,
        name: "AeroGlass HUD v4",
        category: "Optics",
        price: 899.00,
        icon: "fa-glasses",
        desc: "Augmented reality retina overlay with real-time hardware telemetry diagnostics."
    },
    {
        id: 2,
        name: "Neural Node Pro",
        category: "Bio-Link",
        price: 1250.00,
        icon: "fa-brain",
        desc: "Direct neural link crown yielding sub-millisecond response latency inputs."
    },
    {
        id: 3,
        name: "Viper Glove Mk.II",
        category: "Haptics",
        price: 450.00,
        icon: "fa-hand-back-fist",
        desc: "Tactile response glove simulating hyper-realistic texture feedback physics."
    },
    {
        id: 4,
        name: "Grid-Core Drive 2T",
        category: "Storage",
        price: 299.00,
        icon: "fa-hard-drive",
        desc: "Solid-state quantum encryption block resistant to localized EMP threats."
    },
    {
        id: 5,
        name: "Chrono-Oasis Watch",
        category: "Wearables",
        price: 620.00,
        icon: "fa-stopwatch",
        desc: "Graphene-cased luxury time apparatus sync'd directly with standard atomic clocks."
    },
    {
        id: 6,
        name: "Pulse-Link Audio",
        category: "Audio",
        price: 380.00,
        icon: "fa-volume-high",
        desc: "Sub-harmonic conduction bone drivers delivering uncompressed spatial streams."
    }
];

// Load existing cart from storage array if present
let cart = JSON.parse(localStorage.getItem('neon_grid_cart')) || [];

// DOM Element Fallbacks
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

// 1. Initialize & Render Electronics Cards with View Spec routing
function displayProducts() {
    if(!productGrid) return; // Prevent breaking on other pages
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-card p-6 rounded-xl flex flex-col justify-between group">
            <div class="cursor-pointer" onclick="window.location.href='product.html?id=${product.id}'">
                <div class="flex justify-between items-start mb-6">
                    <span class="text-xs font-bold tracking-widest text-slate-500 uppercase">// ${product.category}</span>
                    <div class="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800 text-cyan-400 group-hover:text-pink-500 group-hover:border-pink-500/30 transition-all duration-300">
                        <i class="fa-solid ${product.icon} text-xl"></i>
                    </div>
                </div>
                <h3 class="text-lg font-bold tracking-wide group-hover:text-cyan-400 transition-colors">${product.name}</h3>
                <p class="text-slate-400 text-xs mt-2 leading-relaxed">${product.desc}</p>
                <span class="text-[10px] text-cyan-500/70 underline mt-2 inline-block">View System Specs -></span>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span class="text-xl font-bold font-mono text-pink-500">$${product.price.toFixed(2)}</span>
                <button onclick="addToCart(${product.id})" class="px-4 py-2 bg-slate-900 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 text-xs font-bold uppercase rounded border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 cursor-pointer">
                    Sync Unit
                </button>
            </div>
        </div>
    `).join('');
}

// 2. Cart Logic Processing
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    // Write array changes directly to browser memory cache
    localStorage.setItem('neon_grid_cart', JSON.stringify(cart));

    if(cartCount) cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    if(cartTotal) cartTotal.innerText = `$${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`;

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-slate-500 text-center py-8">Inventory empty. Awaiting data...</p>`;
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between bg-slate-950 p-3 rounded border border-slate-800">
            <div class="flex items-center space-x-3">
                <i class="fa-solid ${item.icon} text-cyan-400 text-lg"></i>
                <div>
                    <h4 class="text-xs font-bold tracking-wide">${item.name}</h4>
                    <p class="text-[10px] text-slate-500">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-slate-500 hover:text-pink-500 transition-colors p-1 cursor-pointer">
                <i class="fa-solid fa-trash-can text-sm"></i>
            </button>
        </div>
    `).join('');
}

// 3. UI Toggle Mechanics Guard Clauses
if (cartBtn && cartSidebar) cartBtn.addEventListener('click', () => cartSidebar.classList.remove('translate-x-full'));
if (closeCart && cartSidebar) closeCart.addEventListener('click', () => cartSidebar.classList.add('translate-x-full'));

// Self-initializing sequence execution loop
document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    updateCart();
});
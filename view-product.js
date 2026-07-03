/**
 * View Product Page - JavaScript Logic
 * Handles product loading, gallery interactions, and order functionality
 */

// Global state
let currentProduct = null;
let selectedSize = null;
let selectedColor = null;
let selectedQuantity = 1;
let currentImageIndex = 0;

/**
 * Initialize the page on load
 */
document.addEventListener('DOMContentLoaded', function () {
    const productId = getProductIdFromURL();

    if (!productId) {
        showErrorPage();
        return;
    }

    currentProduct = getProductById(productId);

    if (!currentProduct) {
        showErrorPage();
        return;
    }

    renderProductDetails();
    renderRelatedProducts();
    setupEventListeners();
});

/**
 * Get product ID from URL parameter
 * @returns {number|null} Product ID or null if not found
 */
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id ? parseInt(id) : null;
}

/**
 * Show error page if product not found
 */
function showErrorPage() {
    const container = document.getElementById('productContainer');
    container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--muted);">
            <h2 style="color: var(--text); margin-bottom: 1rem;">Product not found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <a href="collection.html" class="btn btn-primary" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem;">
                Back to Collection
            </a>
        </div>
    `;
    document.getElementById('relatedProducts').innerHTML = '';
}

/**
 * Render product details and gallery
 */
function renderProductDetails() {
    const container = document.getElementById('productContainer');

    const galleryHTML = `
        <div class="gallery-section">
            <div class="main-image">
                <img id="mainImage" src="${currentProduct.images[0]}" alt="${currentProduct.name}">
            </div>
            <div class="thumbnails">
                ${currentProduct.images.map((image, index) => `
                    <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                        <img src="${image}" alt="${currentProduct.name} - view ${index + 1}">
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const ratingStars = '★'.repeat(Math.floor(currentProduct.rating)) +
        (currentProduct.rating % 1 ? '½' : '');

    const availability = currentProduct.availability ? 'In Stock' : 'Out of Stock';
    const availabilityClass = currentProduct.availability ? '' : 'out-of-stock';

    const detailsHTML = `
        <div class="details-section">
            <div class="product-header">
                <h1 class="product-title">${currentProduct.name}</h1>
                <div class="product-meta">
                    <div class="rating">
                        <span class="rating-stars">${ratingStars}</span>
                        <span class="rating-value">${currentProduct.rating}</span>
                    </div>
                    <span class="review-count">(${currentProduct.reviews} reviews)</span>
                </div>
                <div class="price">${formatCurrency(currentProduct.price)}</div>
            </div>

            <div class="product-info">
                <div class="info-row">
                    <span class="info-label">Category</span>
                    <span class="info-value">${currentProduct.category}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Availability</span>
                    <span class="availability-badge ${availabilityClass}">${availability}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Product Code</span>
                    <span class="info-value">${currentProduct.productCode}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Stock Available</span>
                    <span class="info-value">${currentProduct.stock} units</span>
                </div>
            </div>

            <div>
                <h3 class="section-title">Description</h3>
                <p class="product-description">${currentProduct.description}</p>
            </div>

            <div class="options-section">
                <div class="option-group">
                    <label class="option-label">Size</label>
                    <div class="option-buttons">
                        ${currentProduct.sizes.map(size => `
                            <button class="option-btn" data-option-type="size" data-value="${size}">
                                ${size}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="option-group">
                    <label class="option-label">Color</label>
                    <div class="option-buttons">
                        ${currentProduct.colors.map(color => `
                            <button class="option-btn" data-option-type="color" data-value="${color}">
                                ${color}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="option-group">
                    <label class="option-label">Quantity</label>
                    <div class="quantity-control">
                        <button class="qty-btn" id="decreaseQty">−</button>
                        <input type="number" id="qtyInput" class="qty-input" value="1" min="1" max="${currentProduct.stock}">
                        <button class="qty-btn" id="increaseQty">+</button>
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-order" id="orderNowBtn">Order Now</button>
                    <a href="collection.html" class="btn btn-back">Back to Collection</a>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = galleryHTML + detailsHTML;
}

/**
 * Render related products
 */
function renderRelatedProducts() {
    const relatedProducts = getRelatedProducts(currentProduct.id, 4);
    const container = document.getElementById('relatedProducts');

    if (relatedProducts.length === 0) {
        container.innerHTML = '<p style="color: var(--muted); grid-column: 1/-1;">No related products found.</p>';
        return;
    }

    container.innerHTML = relatedProducts.map(product => `
        <div class="related-card">
            <div class="related-image">
                <img src="${product.images[0]}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;">
            </div>
            <div class="related-body">
                <h3 class="related-name">${product.name}</h3>
                <div class="related-price">${formatCurrency(product.price)}</div>
                <div class="related-buttons">
                    <a href="view-product.html?id=${product.id}" class="related-btn related-btn-view">View</a>
                    <button class="related-btn related-btn-order" data-product-id="${product.id}" onclick="quickAddToOrder(${product.id})">
                        Order
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Image gallery
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            changeMainImage(index);
        });
    });

    // Size and color selection
    document.querySelectorAll('[data-option-type]').forEach(btn => {
        btn.addEventListener('click', function () {
            const type = this.dataset.optionType;
            const value = this.dataset.value;

            // Remove previous selection
            document.querySelectorAll(`[data-option-type="${type}"]`).forEach(b => {
                b.classList.remove('selected');
            });

            // Add selection to clicked button
            this.classList.add('selected');

            if (type === 'size') {
                selectedSize = value;
            } else if (type === 'color') {
                selectedColor = value;
            }
        });
    });

    // Quantity controls
    document.getElementById('decreaseQty').addEventListener('click', function () {
        const input = document.getElementById('qtyInput');
        let value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
            selectedQuantity = value - 1;
        }
    });

    document.getElementById('increaseQty').addEventListener('click', function () {
        const input = document.getElementById('qtyInput');
        let value = parseInt(input.value);
        const max = parseInt(input.max);
        if (value < max) {
            input.value = value + 1;
            selectedQuantity = value + 1;
        }
    });

    document.getElementById('qtyInput').addEventListener('change', function () {
        let value = parseInt(this.value);
        const max = parseInt(this.max);
        if (isNaN(value) || value < 1) {
            this.value = 1;
            selectedQuantity = 1;
        } else if (value > max) {
            this.value = max;
            selectedQuantity = max;
        } else {
            selectedQuantity = value;
        }
    });

    // Order button
    document.getElementById('orderNowBtn').addEventListener('click', handleOrderNow);
}

/**
 * Change main image with fade animation
 * @param {number} index - Image index
 */
function changeMainImage(index) {
    const mainImage = document.getElementById('mainImage');

    // Fade out current image
    mainImage.classList.add('fade-out');

    // Update thumbnail selection
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });

    // Swap src and fade back in
    setTimeout(() => {
        mainImage.src = currentProduct.images[index];
        mainImage.classList.remove('fade-out');
        currentImageIndex = index;
    }, 200);
}

/**
 * Handle Order Now button click
 */
function handleOrderNow() {
    // Validate selections
    if (!selectedSize) {
        showToast('Please select a size', 'warning');
        return;
    }

    if (!selectedColor) {
        showToast('Please select a color', 'warning');
        return;
    }

    if (selectedQuantity < 1) {
        showToast('Quantity must be at least 1', 'warning');
        return;
    }

    // Prepare order item
    const orderItem = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        size: selectedSize,
        color: selectedColor,
        quantity: selectedQuantity,
        image: currentProduct.images[0],
        productCode: currentProduct.productCode
    };

    // Save to localStorage
    addToOrder(orderItem);

    // Show success message
    showToast('Item added to your order', 'success');

    // Reset form
    setTimeout(() => {
        resetProductOptions();
    }, 1500);
}

/**
 * Add item to order (handles duplicate prevention)
 * @param {object} item - Order item
 */
function addToOrder(item) {
    // Get existing orders
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Check if same product with same size and color exists
    const existingIndex = orders.findIndex(order =>
        order.id === item.id &&
        order.size === item.size &&
        order.color === item.color
    );

    if (existingIndex !== -1) {
        // Update quantity if exists
        orders[existingIndex].quantity += item.quantity;
    } else {
        // Add new item
        orders.push(item);
    }

    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));

    // Update order badge (if exists in other pages)
    updateOrderBadge();
}

/**
 * Update order notification badge
 */
function updateOrderBadge() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const totalItems = orders.reduce((sum, item) => sum + item.quantity, 0);

    // Dispatch custom event for other pages to listen to
    window.dispatchEvent(new CustomEvent('orderUpdated', { detail: { totalItems } }));
}

/**
 * Quick add product to order from related products
 * @param {number} productId - Product ID
 */
function quickAddToOrder(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        size: product.sizes[0] || 'One Size',
        color: product.colors[0] || 'Default',
        quantity: 1,
        image: product.images[0],
        productCode: product.productCode
    };

    addToOrder(item);
    showToast(`${product.name} added to order`, 'success');
}

/**
 * Reset product options
 */
function resetProductOptions() {
    selectedSize = null;
    selectedColor = null;
    selectedQuantity = 1;

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    document.getElementById('qtyInput').value = 1;
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, warning, error)
 */
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');

    const bgColor = type === 'success' ? 'rgba(31, 165, 51, 0.9)' :
        type === 'warning' ? 'rgba(255, 193, 7, 0.9)' :
            'rgba(220, 53, 69, 0.9)';

    const toastHTML = `
        <div style="
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            margin-bottom: 0.75rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            animation: slideInRight 0.3s ease-in-out;
        ">
            ${message}
        </div>
        <style>
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        </style>
    `;

    const toast = document.createElement('div');
    toast.innerHTML = toastHTML;
    toastContainer.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-in-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

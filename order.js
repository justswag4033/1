// Order page logic

/**
 * Load cart items from localStorage
 * @returns {array}
 */
function loadCartItems() {
    try {
        const storedItems = localStorage.getItem('orders');
        if (!storedItems) return [];

        const parsedItems = JSON.parse(storedItems);
        return Array.isArray(parsedItems) ? parsedItems.filter(item => item && typeof item === 'object') : [];
    } catch (error) {
        console.warn('Unable to load cart items:', error);
        return [];
    }
}

/**
 * Save cart items to localStorage
 * @param {array} items
 */
function saveCartItems(items) {
    const safeItems = Array.isArray(items) ? items.filter(item => item && typeof item === 'object') : [];
    localStorage.setItem('orders', JSON.stringify(safeItems));
    return safeItems;
}

/**
 * Format price value
 * @param {number} value
 * @returns {string}
 */
function formatPrice(value) {
    const numericValue = Number(value) || 0;
    return `₦${numericValue.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Render the cart on the order page
 */
function renderCart() {
    const cartItems = loadCartItems();
    const container = document.getElementById('cartItemsContainer');
    const subtotalEl = document.getElementById('subtotalAmount');
    const shippingEl = document.getElementById('shippingAmount');
    const taxEl = document.getElementById('taxAmount');
    const totalEl = document.getElementById('totalAmount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutStatus = document.getElementById('checkoutStatus');
    const orderBadge = document.getElementById('orderBadge');

    if (!container || !subtotalEl || !shippingEl || !taxEl || !totalEl) return;

    // Clear existing items
    container.innerHTML = '';

    if (cartItems.length === 0) {
        container.innerHTML = '<div class="empty-cart">Your cart is empty. Add items from the collection page.</div>';
        updateBadge(0);
        subtotalEl.textContent = formatPrice(0);
        shippingEl.textContent = formatPrice(0);
        taxEl.textContent = formatPrice(0);
        totalEl.textContent = formatPrice(0);
        if (checkoutBtn) checkoutBtn.disabled = true;
        if (checkoutStatus) checkoutStatus.textContent = 'Add items to your cart to continue.';
        return;
    }

    let subtotal = 0;
    let totalQuantity = 0;

    cartItems.forEach((item, index) => {
        const normalizedQuantity = Math.max(1, Number(item.quantity) || 1);
        const normalizedPrice = Number(item.price) || 0;
        const itemTotal = normalizedPrice * normalizedQuantity;
        subtotal += itemTotal;
        totalQuantity += normalizedQuantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-image">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:0.5rem;">` : '<small>Image</small>'}
            </div>
            <div class="item-details">
                <h6>${item.name}</h6>
                <small>Size: ${item.size} | Color: ${item.color}</small>
                <div><small>Code: ${item.productCode || 'N/A'}</small></div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
            <div class="item-price">${formatPrice(itemTotal)}</div>
            <div class="qty-control">
                <button class="qty-btn" data-action="decrease" data-index="${index}">−</button>
                <input type="number" value="${normalizedQuantity}" min="1" class="qty-input" data-index="${index}">
                <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
            </div>
        `;

        container.appendChild(cartItem);
    });

    const shipping = subtotal > 0 ? 10 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = formatPrice(shipping);
    taxEl.textContent = formatPrice(tax);
    totalEl.textContent = formatPrice(total);

    if (checkoutBtn) checkoutBtn.disabled = false;
    if (checkoutStatus) checkoutStatus.textContent = 'Checkout will be available soon.';

    updateBadge(totalQuantity);
    attachCartInteractions();
}

/**
 * Attach event listeners to cart item controls
 */
function attachCartInteractions() {
    const decreaseButtons = document.querySelectorAll('[data-action="decrease"]');
    const increaseButtons = document.querySelectorAll('[data-action="increase"]');
    const qtyInputs = document.querySelectorAll('.qty-input');
    const removeButtons = document.querySelectorAll('.remove-btn');

    decreaseButtons.forEach(button => {
        button.addEventListener('click', handleQtyChange);
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', handleQtyChange);
    });

    qtyInputs.forEach(input => {
        input.addEventListener('change', handleQtyInputChange);
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', handleRemoveItem);
    });
}

/**
 * Handle quantity change by button click
 * @param {Event} event
 */
function handleQtyChange(event) {
    const index = parseInt(event.currentTarget.dataset.index, 10);
    const action = event.currentTarget.dataset.action;
    const cartItems = loadCartItems();

    if (!Array.isArray(cartItems) || !cartItems[index]) return;

    const currentQuantity = Math.max(1, Number(cartItems[index].quantity) || 1);

    if (action === 'decrease' && currentQuantity > 1) {
        cartItems[index].quantity = currentQuantity - 1;
    }

    if (action === 'increase') {
        cartItems[index].quantity = currentQuantity + 1;
    }

    saveCartItems(cartItems);
    renderCart();
}

/**
 * Handle quantity input changes
 * @param {Event} event
 */
function handleQtyInputChange(event) {
    const index = parseInt(event.target.dataset.index, 10);
    let value = parseInt(event.target.value, 10);
    const cartItems = loadCartItems();

    if (!Array.isArray(cartItems) || !cartItems[index]) return;

    if (isNaN(value) || value < 1) {
        value = 1;
    }

    cartItems[index].quantity = value;
    saveCartItems(cartItems);
    renderCart();
}

/**
 * Remove item from cart
 * @param {Event} event
 */
function handleRemoveItem(event) {
    const index = parseInt(event.currentTarget.dataset.index, 10);
    const cartItems = loadCartItems();

    if (!Array.isArray(cartItems) || !cartItems[index]) return;

    cartItems.splice(index, 1);
    saveCartItems(cartItems);
    renderCart();
}

/**
 * Update order badge count
 * @param {number} count
 */
function updateBadge(count) {
    const orderBadge = document.getElementById('orderBadge');
    if (!orderBadge) return;

    if (count > 0) {
        orderBadge.textContent = count;
        orderBadge.classList.remove('d-none');
    } else {
        orderBadge.textContent = 0;
        orderBadge.classList.add('d-none');
    }
}

/**
 * Initialize order page
 */
function initOrderPage() {
    renderCart();
    updateBadge(loadCartItems().reduce((sum, item) => sum + (Number(item.quantity) || 0), 0));

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            const status = document.getElementById('checkoutStatus');
            if (status) {
                status.textContent = 'Checkout is coming soon. Please keep shopping.';
            }
        });
    }

    window.addEventListener('storage', () => {
        renderCart();
    });

    window.addEventListener('orderUpdated', () => {
        renderCart();
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOrderPage);
} else {
    initOrderPage();
}

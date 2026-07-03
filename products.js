// Product Data Store
// All products with complete information including images, sizes, colors, etc.

const PRODUCTS = [
    {
        id: 1,
        name: "Swag Unbound Yellow",
        price: 45000,
        category: "Unbound",
        description: "Premium cotton tee with a timeless design. Clean cut, relaxed fit — perfect for everyday wear. Made from 100% organic cotton that gets softer with every wash.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Yellow"],
        images: [
            "./swag unbound yellow.jpeg"
        ],
        rating: 4.5,
        reviews: 128,
        availability: true,
        productCode: "SWAG-UB-YEL",
        stock: 12
    },
    {
        id: 2,
        name: "Swag Unbound Pink",
        price: 45000,
        category: "Unbound",
        description: "Premium cotton tee with a timeless design. Clean cut, relaxed fit — perfect for everyday wear. Made from 100% organic cotton that gets softer with every wash.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Pink"],
        images: [
            "./swag unbound pink.jpeg"
        ],
        rating: 4.8,
        reviews: 234,
        availability: true,
        productCode: "SWAG-UB-PNK",
        stock: 4
    },
    {
        id: 3,
        name: "Swag Unbound Purple",
        price: 45000,
        category: "Unbound",
        description: "Premium cotton tee with a timeless design. Clean cut, relaxed fit — perfect for everyday wear. Made from 100% organic cotton that gets softer with every wash.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Purple"],
        images: [
            "./swag unbound purple.jpeg"
        ],
        rating: 4.6,
        reviews: 187,
        availability: true,
        productCode: "SWAG-UB-PUR",
        stock: 8
    },
    {
        id: 4,
        name: "Swag Unbound Red",
        price: 45000,
        category: "Unbound",
        description: "Premium cotton tee with a timeless design. Clean cut, relaxed fit — perfect for everyday wear. Made from 100% organic cotton that gets softer with every wash.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Red"],
        images: [
            "./swag unbound red.jpeg"
        ],
        rating: 4.7,
        reviews: 95,
        availability: true,
        productCode: "SWAG-UB-RED",
        stock: 11
    },
    {
        id: 5,
        name: "Swag Burning Black",
        price: 45000,
        category: "Burning",
        description: "Bold statement piece with a comfortable polo fit. Smart casual looks that take you from day to night. Premium fabric with a structured collar and clean finish.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Black"],
        images: [
            "./swag burning black.jpeg"
        ],
        rating: 4.5,
        reviews: 156,
        availability: true,
        productCode: "SWAG-BRN-BLK",
        stock: 22
    },
    {
        id: 6,
        name: "Swag Burning White",
        price: 45000,
        category: "Burning",
        description: "Clean and crisp polo for smart casual looks. Premium fabric with a structured collar that keeps its shape wash after wash. Versatile enough for any occasion.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["White"],
        images: [
            "./swag burning white.jpeg"
        ],
        rating: 4.4,
        reviews: 102,
        availability: true,
        productCode: "SWAG-BRN-WHT",
        stock: 35
    },
    {
        id: 7,
        name: "Swag Healing Black",
        price: 45000,
        category: "Healing",
        description: "Comfort polo designed for smart casual looks. Soft premium fabric with a relaxed yet refined silhouette. Great for everyday wear or semi-casual outings.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Black"],
        images: [
            "./swag healing black.jpeg"
        ],
        rating: 4.6,
        reviews: 88,
        availability: true,
        productCode: "SWAG-HLG-BLK",
        stock: 18
    },
    {
        id: 8,
        name: "Swag Healing White",
        price: 45000,
        category: "Healing",
        description: "Comfort polo designed for smart casual looks. Soft premium fabric with a relaxed yet refined silhouette. Great for everyday wear or semi-casual outings.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["White"],
        images: [
            "./swag healing white.jpeg"
        ],
        rating: 4.3,
        reviews: 74,
        availability: true,
        productCode: "SWAG-HLG-WHT",
        stock: 20
    },
    {
        id: 9,
        name: "Project Swag",
        price: 65000,
        category: "Project",
        description: "Too fly to be ordinary. This limited-edition piece is a statement all on its own — bold design, premium feel, and a fit that turns heads wherever you go.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Multi"],
        images: [
            "./project swag.jpeg"
        ],
        rating: 4.9,
        reviews: 61,
        availability: true,
        productCode: "SWAG-PROJ-001",
        stock: 7
    },
    {
        id: 10,
        name: "Swag Manifest Black",
        price: 57600,
        category: "Manifest",
        description: "Manifest your style with this sharp, smart casual piece. Refined design with clean lines and a confident silhouette that speaks for itself.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Black"],
        images: [
            "./swag manifest black.jpeg"
        ],
        rating: 4.5,
        reviews: 93,
        availability: true,
        productCode: "SWAG-MNF-BLK",
        stock: 14
    },
    {
        id: 11,
        name: "Swag Manifest White",
        price: 57600,
        category: "Manifest",
        description: "Manifest your style with this sharp, smart casual piece. Refined design with clean lines and a confident silhouette that speaks for itself.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["White"],
        images: [
            "./swag manifest white.jpeg"
        ],
        rating: 4.4,
        reviews: 77,
        availability: true,
        productCode: "SWAG-MNF-WHT",
        stock: 16
    },
    {
        id: 12,
        name: "Swag Manifest Green",
        price: 57600,
        category: "Manifest",
        description: "Manifest your style with this sharp, smart casual piece. Refined design with clean lines and a confident silhouette that speaks for itself.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Green"],
        images: [
            "./swag manifest green.jpeg"
        ],
        rating: 4.6,
        reviews: 58,
        availability: true,
        productCode: "SWAG-MNF-GRN",
        stock: 10
    },
    {
        id: 13,
        name: "Swag Manifest Purple",
        price: 57600,
        category: "Manifest",
        description: "Manifest your style with this sharp, smart casual piece. Refined design with clean lines and a confident silhouette that speaks for itself.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Purple"],
        images: [
            "./swag manifest purple.jpeg"
        ],
        rating: 4.7,
        reviews: 49,
        availability: true,
        productCode: "SWAG-MNF-PUR",
        stock: 9
    },
    {
        id: 14,
        name: "Swag crewneck",
        price: 35000,
        category: "Crewneck",
        description: "Manifest your style with this sharp, smart casual piece. Refined design with clean lines and a confident silhouette that speaks for itself.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Black"],
        images: [
            "./j-swag crewneck.jpeg"
        ],
        rating: 4.7,
        reviews: 49,
        availability: true,
        productCode: "SWAG-CREW-010",
        stock: 17
    },
    {
        id: 15,
        name: "Swag crewneck",
        price: 35000,
        category: "Crewneck",
        description: "Manifest your style with this sharp, smart casual piece. Refined design with clean lines and a confident silhouette that speaks for itself.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Black"],
        images: [
            "./swag crewneck.jpeg"
        ],
        rating: 4.7,
        reviews: 49,
        availability: true,
        productCode: "SWAG-CREW-020",
        stock: 18
    },
    {
        id: 16,
        name: "Sip n Swag white",
        price: 45000,
        category: "Sip n swag",
        description: "Manifest your style with this sharp, smart casual piece. Refined design with clean lines and a confident silhouette that speaks for itself.",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["White"],
        images: [
            "./swag sip n swap.jpeg"
        ],
        rating: 4.7,
        reviews: 49,
        availability: true,
        productCode: "SWAG-SIP-SWAG",
        stock: 11
    }
];

/**
 * Format a price using the naira currency symbol
 * @param {number} value - Price value
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
    return `₦${Number(value).toLocaleString('en-NG')}`;
}

/**
 * Get a product by ID
 * @param {number} id - Product ID
 * @returns {object|null} Product object or null if not found
 */
function getProductById(id) {
    return PRODUCTS.find(product => product.id === parseInt(id)) || null;
}

/**
 * Get products by category
 * @param {string} category - Category name
 * @returns {array} Array of products in category
 */
function getProductsByCategory(category) {
    return PRODUCTS.filter(product => product.category === category);
}

/**
 * Get related products from same category (excluding current product)
 * @param {number} productId - Current product ID
 * @param {number} limit - Number of products to return
 * @returns {array} Array of related products
 */
function getRelatedProducts(productId, limit = 4) {
    const product = getProductById(productId);
    if (!product) return [];

    // First try same category
    let related = getProductsByCategory(product.category)
        .filter(p => p.id !== productId);

    // If not enough, fill with other products
    if (related.length < limit) {
        const others = PRODUCTS.filter(p => p.id !== productId && p.category !== product.category);
        related = related.concat(others);
    }

    return related.slice(0, limit);
}

/**
 * Get all products
 * @returns {array} All products
 */
function getAllProducts() {
    return PRODUCTS;
}

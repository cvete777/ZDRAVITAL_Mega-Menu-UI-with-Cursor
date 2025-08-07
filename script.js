// Mega Menu Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const productsLink = document.getElementById('products-link');
    const megaMenu = document.getElementById('mega-menu');
    const categoryItems = document.querySelectorAll('.category-item');
    const filterItems = document.querySelectorAll('.filter-item');
    const productCards = document.querySelectorAll('.product-card');
    const ctaButton = document.querySelector('.cta-button');

    // Mega Menu Toggle
    let isMenuOpen = true; // Start with menu open for demonstration
    let menuTimeout;

    // Show mega menu on hover
    productsLink.addEventListener('mouseenter', function() {
        clearTimeout(menuTimeout);
        showMegaMenu();
    });

    // Hide mega menu when leaving the entire nav item
    const navItem = productsLink.closest('.nav-item');
    navItem.addEventListener('mouseleave', function() {
        menuTimeout = setTimeout(hideMegaMenu, 150);
    });

    // Keep menu open when hovering over it
    megaMenu.addEventListener('mouseenter', function() {
        clearTimeout(menuTimeout);
    });

    megaMenu.addEventListener('mouseleave', function() {
        menuTimeout = setTimeout(hideMegaMenu, 150);
    });

    function showMegaMenu() {
        megaMenu.style.opacity = '1';
        megaMenu.style.visibility = 'visible';
        megaMenu.style.transform = 'translateY(0)';
        isMenuOpen = true;
    }

    function hideMegaMenu() {
        megaMenu.style.opacity = '0';
        megaMenu.style.visibility = 'hidden';
        megaMenu.style.transform = 'translateY(-10px)';
        isMenuOpen = false;
    }

    // Category Selection
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all categories
            categoryItems.forEach(cat => {
                cat.classList.remove('active');
                const chevron = cat.querySelector('.chevron-icon');
                chevron.classList.remove('down');
                chevron.classList.add('right');
            });

            // Add active class to clicked category
            this.classList.add('active');
            const chevron = this.querySelector('.chevron-icon');
            chevron.classList.remove('right');
            chevron.classList.add('down');

            // Update content based on category
            const category = this.dataset.category;
            updateRightPanelContent(category);
        });

        // Keyboard accessibility
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make focusable
        item.setAttribute('tabindex', '0');
    });

    // Filter Selection
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all filters
            filterItems.forEach(filter => filter.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');

            // Update CTA button text
            const filterName = this.textContent;
            ctaButton.textContent = `See All Products for ${filterName}`;

            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });

        // Keyboard accessibility
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make focusable
        item.setAttribute('tabindex', '0');
    });

    // Product Card Interactions
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 100);

            // Simulate product page navigation
            console.log('Navigate to product:', this.querySelector('.product-name').textContent);
        });

        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make focusable
        card.setAttribute('tabindex', '0');
    });

    // CTA Button Interaction
    ctaButton.addEventListener('click', function() {
        const activeFilter = document.querySelector('.filter-item.active');
        const filterName = activeFilter ? activeFilter.textContent : 'products';
        
        // Add click effect
        this.style.transform = 'translateY(-1px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-1px) scale(1)';
        }, 100);

        console.log(`Navigate to all ${filterName} products`);
    });

    // Update Right Panel Content Based on Category
    function updateRightPanelContent(category) {
        const rightPanel = document.querySelector('.right-panel');
        
        // Define content for different categories
        const categoryContent = {
            symptom: {
                filters: ['Nausea', 'Headache', 'Sleep'],
                products: [
                    { name: 'Ginger Capsules', price: '$24.99', image: 'Ginger+Capsules' },
                    { name: 'Peppermint Oil', price: '$18.99', image: 'Peppermint+Oil' },
                    { name: 'Anti-Nausea Tea', price: '$16.50', image: 'Anti-Nausea+Tea' },
                    { name: 'Motion Sickness Relief', price: '$22.99', image: 'Motion+Sickness+Relief' },
                    { name: 'Digestive Support', price: '$29.99', image: 'Digestive+Support' },
                    { name: 'Nausea Patches', price: '$14.99', image: 'Nausea+Patches' },
                    { name: 'Ginger Chews', price: '$12.99', image: 'Ginger+Chews' },
                    { name: 'Herbal Remedy', price: '$26.99', image: 'Herbal+Remedy' }
                ]
            },
            condition: {
                filters: ['Diabetes', 'Arthritis', 'Anxiety'],
                products: [
                    { name: 'Blood Sugar Support', price: '$34.99', image: 'Blood+Sugar+Support' },
                    { name: 'Insulin Optimizer', price: '$42.99', image: 'Insulin+Optimizer' },
                    { name: 'Glucose Monitor Kit', price: '$89.99', image: 'Glucose+Monitor' },
                    { name: 'Diabetic Vitamins', price: '$28.99', image: 'Diabetic+Vitamins' },
                    { name: 'Chromium Complex', price: '$19.99', image: 'Chromium+Complex' },
                    { name: 'Cinnamon Extract', price: '$22.50', image: 'Cinnamon+Extract' },
                    { name: 'Alpha Lipoic Acid', price: '$31.99', image: 'Alpha+Lipoic+Acid' },
                    { name: 'Berberine Plus', price: '$38.99', image: 'Berberine+Plus' }
                ]
            },
            ingredient: {
                filters: ['Turmeric', 'Ashwagandha', 'Probiotics'],
                products: [
                    { name: 'Curcumin Complex', price: '$32.99', image: 'Curcumin+Complex' },
                    { name: 'Turmeric Gold', price: '$27.99', image: 'Turmeric+Gold' },
                    { name: 'Anti-Inflammatory', price: '$35.50', image: 'Anti-Inflammatory' },
                    { name: 'Joint Support Plus', price: '$29.99', image: 'Joint+Support' },
                    { name: 'Turmeric Capsules', price: '$24.99', image: 'Turmeric+Capsules' },
                    { name: 'Golden Milk Mix', price: '$18.99', image: 'Golden+Milk' },
                    { name: 'Inflammation Relief', price: '$31.99', image: 'Inflammation+Relief' },
                    { name: 'Turmeric Tea', price: '$16.99', image: 'Turmeric+Tea' }
                ]
            },
            brand: {
                filters: ['NatureWell', 'PureHealth', 'VitalLife'],
                products: [
                    { name: 'NatureWell Immunity', price: '$39.99', image: 'NatureWell+Immunity' },
                    { name: 'NatureWell Energy', price: '$33.99', image: 'NatureWell+Energy' },
                    { name: 'NatureWell Sleep', price: '$28.99', image: 'NatureWell+Sleep' },
                    { name: 'NatureWell Digest', price: '$31.99', image: 'NatureWell+Digest' },
                    { name: 'NatureWell Focus', price: '$35.99', image: 'NatureWell+Focus' },
                    { name: 'NatureWell Recovery', price: '$42.99', image: 'NatureWell+Recovery' },
                    { name: 'NatureWell Balance', price: '$37.99', image: 'NatureWell+Balance' },
                    { name: 'NatureWell Vitality', price: '$44.99', image: 'NatureWell+Vitality' }
                ]
            }
        };

        const content = categoryContent[category];
        if (!content) return;

        // Update filters
        const symptomFilters = rightPanel.querySelector('.symptom-filters');
        symptomFilters.innerHTML = '';
        content.filters.forEach((filter, index) => {
            const filterElement = document.createElement('div');
            filterElement.className = `filter-item ${index === 0 ? 'active' : ''}`;
            filterElement.textContent = filter;
            filterElement.setAttribute('tabindex', '0');
            
            // Add click event
            filterElement.addEventListener('click', function() {
                symptomFilters.querySelectorAll('.filter-item').forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                ctaButton.textContent = `See All Products for ${this.textContent}`;
            });

            symptomFilters.appendChild(filterElement);
        });

        // Update products
        const productGrid = rightPanel.querySelector('.product-grid');
        productGrid.innerHTML = '';
        content.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.setAttribute('tabindex', '0');
            productElement.innerHTML = `
                <div class="product-image">
                    <img src="https://via.placeholder.com/180x140/e8f5e8/4a9f4a?text=${product.image}" alt="${product.name}">
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
            `;

            // Add click event
            productElement.addEventListener('click', function() {
                this.style.transform = 'translateY(-2px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-2px) scale(1)';
                }, 100);
                console.log('Navigate to product:', product.name);
            });

            productGrid.appendChild(productElement);
        });

        // Update CTA button
        const activeFilter = content.filters[0];
        ctaButton.textContent = `See All Products for ${activeFilter}`;

        // Add smooth transition effect
        rightPanel.style.opacity = '0.7';
        setTimeout(() => {
            rightPanel.style.opacity = '1';
        }, 200);
    }

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            hideMegaMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navItem.contains(e.target)) {
            hideMegaMenu();
        }
    });

    // Initial setup - show menu by default for demonstration
    setTimeout(() => {
        showMegaMenu();
    }, 500);
});

// Smooth scroll and additional utilities
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for hover effects
const handleProductHover = debounce(function(e) {
    if (e.type === 'mouseenter') {
        e.target.style.transform = 'translateY(-2px)';
    } else {
        e.target.style.transform = 'translateY(0)';
    }
}, 50);

// Add optimized hover listeners after DOM load
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', handleProductHover);
        card.addEventListener('mouseleave', handleProductHover);
    });
});
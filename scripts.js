// Initialize the site when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render products from the products data
    renderProducts();

    // Set up mobile navigation functionality
    setupMobileNavigation();

    // Set up terminal typing animation in hero section
    setupTerminalAnimation();

    // Set up smooth scrolling for anchor links
    setupSmoothScrolling();

    // Set up order modal functionality
    setupOrderModal();
});

// Function to generate the HTML for each product
function renderProducts() {
    const productGrid = document.getElementById('product-grid');

    // Clear existing content
    productGrid.innerHTML = '';

    // Generate HTML for each product
    products.forEach(product => {
        // Create product card element
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.design = product.id;
        productCard.dataset.color = product.defaultColor.toLowerCase();
        productCard.dataset.size = 'm l xl';

        // Create HTML for product card content
        let productHTML = '';

        // If product has multiple images, create image gallery
        if (product.images.length > 1) {
            productHTML += `
                <div class="product-image-container">
                    <div class="product-image">
                        <img src="${product.images[0].src}" alt="${product.images[0].alt}" id="${product.id}-main-img">
                    </div>
                    <div class="image-thumbnails">
            `;

            // Add thumbnails for each image
            product.images.forEach((image, index) => {
                productHTML += `
                    <img src="${image.src}" alt="${image.alt}" 
                         onclick="changeImage('${product.id}-main-img', '${image.src}', '${image.alt}')" 
                         class="thumbnail ${index === 0 ? 'active' : ''}">
                `;
            });

            productHTML += `
                    </div>
                </div>
            `;
        } else {
            // Single image
            productHTML += `
                <div class="product-image">
                    <img src="${product.images[0].src}" alt="${product.images[0].alt}">
                </div>
            `;
        }

        // Add product info
        productHTML += `
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-meta">
                    <span>Available in: ${product.colors.join(', ')}</span>
                    <span>Sizes: ${product.sizes.join(', ')}</span>
                </div>
            </div>
        `;

        // Add order buttons or coming soon label
        if (product.status === 'available') {
            productHTML += `
                <button class="btn order-btn" onclick="openOrderModal('${product.name.replace(/"/g, '\\"')}', '${product.defaultColor}', ${product.price})">Order Now</button>
                <a href="https://wa.me/123456789?text=I'm%20interested%20in%20ordering%20the%20'${encodeURIComponent(product.name)}'%20t-shirt%20in%20${product.defaultColor},%20size%20L" class="btn btn-outline whatsapp-btn" target="_blank">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.6 6.31999C16.8 5.49999 15.8 4.89999 14.7 4.49999C13.6 4.09999 12.5 3.99999 11.3 4.09999C10.1 4.19999 8.99999 4.60001 7.99999 5.20001C6.99999 5.80001 6.19999 6.60001 5.59999 7.60001C4.99999 8.60001 4.69999 9.69999 4.59999 10.9C4.49999 12.1 4.69999 13.2 5.09999 14.3C5.49999 15.4 6.19999 16.4 6.99999 17.2L7.09999 17.3L6.79999 18.8C6.69999 19.3 6.69999 19.7 6.89999 20C6.99999 20.2 7.19999 20.4 7.49999 20.5C7.69999 20.6 7.89999 20.7 8.19999 20.7C8.49999 20.7 8.79999 20.6 9.09999 20.4L10.8 19.5H10.9C11.9 19.8 12.9 19.9 13.9 19.8C15 19.7 16 19.3 16.9 18.8C17.8 18.2 18.6 17.5 19.2 16.5C19.8 15.5 20.1 14.5 20.3 13.3C20.4 12.1 20.3 11 19.9 9.89999C19.4 8.79999 18.7 7.49999 17.6 6.31999ZM16.8 15.8C16.4 16.3 15.8 16.7 15.2 17C14.6 17.3 13.9 17.4 13.2 17.5C12.5 17.5 11.7 17.4 11 17.2C10.3 17 9.69999 16.6 9.09999 16.2L6.79999 17.3L7.39999 15.2V15.1C6.99999 14.4 6.69999 13.8 6.39999 13.1C6.19999 12.4 6.09999 11.7 6.09999 11C6.09999 10.3 6.29999 9.60001 6.59999 8.90001C6.89999 8.20001 7.29999 7.70001 7.89999 7.20001C8.49999 6.70001 9.09999 6.39999 9.79999 6.19999C10.5 5.99999 11.1 5.99999 11.8 6.09999C12.5 6.19999 13.1 6.39999 13.7 6.69999C14.3 6.99999 14.8 7.39999 15.3 7.89999C15.7 8.39999 16.1 8.89999 16.3 9.49999C16.5 10.1 16.6 10.7 16.6 11.3C16.6 12 16.5 12.7 16.3 13.3C16 14.3 15.5 15.1 16.8 15.8ZM14.8 12.3C14.6 12.2 14.4 12.1 14.1 12C13.9 11.9 13.6 11.8 13.4 11.7C13.2 11.6 13 11.5 12.8 11.5C12.6 11.5 12.3 11.6 12.1 11.7C11.9 11.8 11.8 12 11.7 12.2C11.5 12.3 11.3 12.4 11.1 12.4C10.9 12.3 10.7 12.3 10.5 12.2C10.3 12.1 10.1 12 9.89999 11.8C9.69999 11.6 9.49999 11.4 9.39999 11.2C9.19999 11 9.09999 10.7 8.99999 10.5C8.99999 10.3 8.99999 10.1 9.09999 9.89999C9.19999 9.69999 9.29999 9.59999 9.39999 9.49999C9.49999 9.39999 9.69999 9.19999 9.79999 9.09999C9.89999 8.99999 9.89999 8.79999 9.79999 8.59999C9.79999 8.49999 9.69999 8.39999 9.59999 8.19999C9.49999 7.99999 9.39999 7.89999 9.29999 7.69999C9.19999 7.49999 9.09999 7.39999 8.99999 7.19999C8.89999 6.99999 8.79999 6.99999 8.69999 6.89999C8.59999 6.89999 8.39999 6.89999 8.29999 6.99999C8.09999 6.99999 7.99999 7.09999 7.79999 7.19999C7.69999 7.29999 7.49999 7.49999 7.39999 7.59999C7.19999 7.79999 7.09999 7.99999 6.99999 8.19999C6.89999 8.49999 6.79999 8.79999 6.79999 9.09999C6.79999 9.49999 6.89999 9.79999 6.99999 10.2C7.19999 10.6 7.39999 10.9 7.59999 11.3C7.79999 11.6 8.09999 11.9 8.39999 12.2C8.69999 12.5 8.99999 12.7 9.29999 12.9C9.59999 13.1 9.99999 13.3 10.3 13.4C10.7 13.6 11.1 13.7 11.4 13.8C11.8 13.9 12.2 13.9 12.6 13.9C12.9 13.9 13.3 13.8 13.7 13.7C14 13.6 14.4 13.4 14.7 13.1C14.9 12.9 15 12.6 15 12.3C15 11.9 14.9 11.8 14.8 11.7V12.3Z" fill="currentColor"/>
                    </svg>
                    Order via WhatsApp
                </a>
            `;
        } else {
            productHTML += `<div class="coming-soon">Coming Soon</div>`;
        }

        // Set the HTML content of the card
        productCard.innerHTML = productHTML;

        // Add to the product grid
        productGrid.appendChild(productCard);
    });
}

// Function to change image in product gallery
function changeImage(imgId, newSrc, newAlt) {
    const mainImg = document.getElementById(imgId);
    mainImg.src = newSrc;
    mainImg.alt = newAlt;

    // Update active thumbnail
    const thumbnails = mainImg.closest('.product-image-container').querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        if (thumb.src === newSrc) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}
// Make the changeImage function available globally
window.changeImage = changeImage;

// Function to set up mobile navigation
function setupMobileNavigation() {
    const burgerMenu = document.getElementById('burger-menu');
    const closeMenu = document.getElementById('close-menu');
    const overlay = document.getElementById('overlay');
    const mobileNav = document.getElementById('mobile-nav');

    burgerMenu.addEventListener('click', function() {
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function closeNavigation() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeMenu.addEventListener('click', closeNavigation);
    overlay.addEventListener('click', closeNavigation);

    // Close mobile nav when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeNavigation);
    });
}

// Function to set up terminal animation
function setupTerminalAnimation() {
    const terminalContent = document.querySelector('.terminal-content');
    if (terminalContent) {
        const lines = terminalContent.querySelectorAll('p');
        lines.forEach((line, index) => {
            if (index < lines.length - 1) {
                line.style.opacity = '0';
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transition = 'opacity 0.5s';
                }, index * 700);
            }
        });
    }
}

// Function to set up smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Function to open the order modal
function openOrderModal(productName, color, price) {
    const modal = document.getElementById('order-modal');

    // Set the values in the summary
    document.getElementById('modal-product-name').textContent = productName;
    document.getElementById('modal-product-color').textContent = color;
    document.getElementById('modal-product-price').textContent = '$' + price.toFixed(2);

    // Set the values in the hidden form fields
    document.getElementById('form-product').value = productName;
    document.getElementById('form-color').value = color;
    document.getElementById('form-price').value = price.toFixed(2);

    // Show the modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}
// Make the openOrderModal function available globally
window.openOrderModal = openOrderModal;

// Function to save order to localStorage
function saveOrderToLocalStorage(orderDetails) {
    // Generate a unique order ID
    const orderId = 'ORD-' + Date.now();

    // Add the order ID and metadata to the order details
    orderDetails.orderId = orderId;
    orderDetails.orderDate = new Date().toISOString();
    orderDetails.status = 'Pending';

    // Get existing orders from localStorage
    let orders = JSON.parse(localStorage.getItem('404techwear_orders') || '[]');

    // Add the new order
    orders.push(orderDetails);

    // Save back to localStorage
    localStorage.setItem('404techwear_orders', JSON.stringify(orders));

    // Return the order ID for confirmation to the customer
    return orderId;
}

// Function to set up the order modal functionality
function setupOrderModal() {
    const modal = document.getElementById('order-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    // Close the modal when clicking the X button
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Allow scrolling again
    });

    // Close the modal if clicked outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle form submission
    const orderForm = document.getElementById('order-form');

    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const orderDetails = {
            product: document.getElementById('form-product').value,
            color: document.getElementById('form-color').value,
            size: document.getElementById('size').value,
            quantity: document.getElementById('quantity').value,
            price: document.getElementById('form-price').value,
            total: (parseFloat(document.getElementById('form-price').value) *
                parseInt(document.getElementById('quantity').value)).toFixed(2),
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            payment: document.getElementById('payment').value
        };

        // Save order and get order ID
        const orderId = saveOrderToLocalStorage(orderDetails);

        // Set the order ID in the success message
        document.getElementById('order-id').textContent = orderId;

        // Add order ID to the form data for submission
        const orderIdInput = document.createElement('input');
        orderIdInput.type = 'hidden';
        orderIdInput.name = 'orderId';
        orderIdInput.value = orderId;
        orderForm.appendChild(orderIdInput);

        // For demonstration: show success message without actual form submission
        // In production, you would uncomment this section to submit to Formspree

        /*
        fetch(orderForm.action, {
            method: orderForm.method,
            body: new FormData(orderForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                orderForm.style.display = 'none';
                document.querySelector('.form-success-message').style.display = 'block';
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error(error);
            alert('There was a problem submitting your order. Please try again.');
        });
        */

        // For demonstration purposes - show success without actual submission
        orderForm.style.display = 'none';
        document.querySelector('.form-success-message').style.display = 'block';
    });
}
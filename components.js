// React Components for 404 Techwear

function App() {
    const [showOrderModal, setShowOrderModal] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [selectedColor, setSelectedColor] = React.useState("");
    const [orderSuccess, setOrderSuccess] = React.useState(false);
    const [orderId, setOrderId] = React.useState("");

    // Reference to order form
    const orderFormRef = React.useRef(null);

    // Function to open order modal
    const openOrderModal = (product, color) => {
        setSelectedProduct(product);
        setSelectedColor(color);
        setShowOrderModal(true);
        setOrderSuccess(false);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Function to close order modal
    const closeOrderModal = () => {
        setShowOrderModal(false);
        document.body.style.overflow = 'auto'; // Allow scrolling
    };

    // Function to handle order submission
    const handleOrderSubmit = (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(orderFormRef.current);
        const orderDetails = {
            product: selectedProduct.name,
            color: formData.get('color') || selectedColor,
            size: formData.get('size'),
            quantity: formData.get('quantity'),
            price: selectedProduct.price.toFixed(2),
            total: (selectedProduct.price * parseInt(formData.get('quantity'))).toFixed(2),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            discount: formData.get('discount') || 'None',
            payment: 'Cash on Delivery'
        };

        // Save order and get order ID
        const newOrderId = saveOrderToLocalStorage(orderDetails);
        setOrderId(newOrderId);

        // Show success message
        setOrderSuccess(true);

        // In a real implementation, you would submit to Formspree here
        /*
        fetch(orderFormRef.current.action, {
          method: orderFormRef.current.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            setOrderSuccess(true);
            setOrderId(newOrderId);
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(error => {
          console.error(error);
          alert('There was a problem submitting your order. Please try again.');
        });
        */
    };

    // Function to save order to localStorage
    const saveOrderToLocalStorage = (orderDetails) => {
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
    };

    return (
        <React.Fragment>
            <Header />
            <MobileNav />
            <HeroSection />
            <ProductsSection openOrderModal={openOrderModal} />
            <AboutSection />
            <ContactSection />
            <Footer />
            <ImagePreviewModal />

            {showOrderModal && selectedProduct && (
                <OrderModal
                    product={selectedProduct}
                    color={selectedColor}
                    onClose={closeOrderModal}
                    onSubmit={handleOrderSubmit}
                    formRef={orderFormRef}
                    orderSuccess={orderSuccess}
                    orderId={orderId}
                />
            )}
        </React.Fragment>
    );
}

// Header Component
function Header() {
    const [mobileNavActive, setMobileNavActive] = React.useState(false);

    const toggleMobileNav = () => {
        setMobileNavActive(!mobileNavActive);

        // Toggle body scroll
        if (!mobileNavActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Toggle overlay
        const overlay = document.getElementById('overlay');
        if (overlay) {
            if (!mobileNavActive) {
                overlay.classList.add('active');
            } else {
                overlay.classList.remove('active');
            }
        }

        // Toggle mobile nav
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav) {
            if (!mobileNavActive) {
                mobileNav.classList.add('active');
            } else {
                mobileNav.classList.remove('active');
            }
        }
    };

    return (
        <header>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className="logo">
                    <svg className="logo-icon" width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="5" y="65" fontFamily="Arial" fontWeight="bold" fontSize="40" fill="white">4</text>
                        <text x="74" y="65" fontFamily="Arial" fontWeight="bold" fontSize="40" fill="white">4</text>
                        <circle cx="50" cy="50" r="15" stroke="#1dd1b0" strokeWidth="5" fill="none"></circle>
                        <line x1="50" y1="30" x2="50" y2="45" stroke="#1dd1b0" strokeWidth="5" strokeLinecap="round"></line>
                    </svg>
                    <span>Techwear</span>
                </div>
            </div>
            <nav className="nav-links">
                <a href="#products">Products</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav>
            <div className="burger-menu" id="burger-menu" onClick={toggleMobileNav}>
                <div className="burger-bar"></div>
                <div className="burger-bar"></div>
                <div className="burger-bar"></div>
            </div>
        </header>
    );
}

// Mobile Navigation Component
function MobileNav() {
    const closeMobileNav = () => {
        const mobileNav = document.getElementById('mobile-nav');
        const overlay = document.getElementById('overlay');

        if (mobileNav) mobileNav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');

        document.body.style.overflow = 'auto';
    };

    return (
        <React.Fragment>
            <div className="overlay" id="overlay"></div>
            <div className="mobile-nav" id="mobile-nav">
                <div className="close-menu" id="close-menu" onClick={closeMobileNav}>×</div>
                <div className="mobile-nav-links">
                    <a href="#products" onClick={closeMobileNav}>Products</a>
                    <a href="#about" onClick={closeMobileNav}>About</a>
                    <a href="#contact" onClick={closeMobileNav}>Contact</a>
                </div>
            </div>
        </React.Fragment>
    );
}

// Hero Section Component
function HeroSection() {
    React.useEffect(() => {
        // Terminal typing animation
        const lines = document.querySelectorAll('.terminal-content p');
        lines.forEach((line, index) => {
            if (index < lines.length - 1) {
                line.style.opacity = '0';
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transition = 'opacity 0.5s';
                }, index * 700);
            }
        });
    }, []);

    return (
        <section className="hero">
            <div className="container">
                <div className="badge">Damascus, Syria</div>
                <h1>The Missing Line of Code<br/>Your Wardrobe Needs</h1>
                <p>Premium techwear for developers and designers. High-quality shirts with tech-inspired designs that speak your language.</p>

                <div className="terminal">
                    <div className="terminal-header">
                        <div className="terminal-dot"></div>
                        <div className="terminal-dot"></div>
                        <div className="terminal-dot"></div>
                    </div>
                    <div className="terminal-content">
                        <p style={{opacity: 1, transition: 'opacity 0.5s'}}>$ npm install --save 404-techwear</p>
                        <p style={{opacity: 1, transition: 'opacity 0.5s'}}>Installing...</p>
                        <p className="highlight" style={{opacity: 1, transition: 'opacity 0.5s'}}>✓ Package installed successfully!</p>
                        <p style={{opacity: 1, transition: 'opacity 0.5s'}}>$ echo "Get ready to upgrade your style"</p>
                        <p style={{opacity: 1, transition: 'opacity 0.5s'}}>Get ready to upgrade your style</p>
                        <p className="terminal-prompt">$</p>
                    </div>
                </div>

                <a href="#products" className="btn">Explore Collection</a>
            </div>
        </section>
    );
}

// Product Card Component with Image Preview
function ProductCard({ product, openOrderModal }) {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const changeImage = (index) => {
        setCurrentImageIndex(index);
    };

    const openImagePreview = (imageSrc, imageAlt) => {
        const previewModal = document.getElementById('image-preview-modal');
        const previewImage = document.getElementById('preview-image');

        if (previewModal && previewImage) {
            previewImage.src = imageSrc;
            previewImage.alt = imageAlt;
            previewModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    };

    return (
        <div className="product-card" data-design={product.id} data-color={product.defaultColor.toLowerCase()} data-size="m l xl">
            {product.images.length > 1 ? (
                <div className="product-image-container">
                    <div className="product-image" onClick={() => openImagePreview(product.images[currentImageIndex].src, product.images[currentImageIndex].alt)}>
                        <img
                            src={product.images[currentImageIndex].src}
                            alt={product.images[currentImageIndex].alt}
                        />
                    </div>
                    <div className="image-thumbnails">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.src}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => changeImage(index)}
                                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="product-image" onClick={() => openImagePreview(product.images[0].src, product.images[0].alt)}>
                    <img src={product.images[0].src} alt={product.images[0].alt} />
                </div>
            )}

            <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-description">{product.description}</div>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <div className="product-meta">
                    <span>Available in: {product.colors.join(', ')}</span>
                    <span>Sizes: {product.sizes.join(', ')}</span>
                </div>
            </div>

            {product.status === 'available' ? (
                <div className="product-buttons">
                    <button
                        className="btn order-btn"
                        onClick={() => openOrderModal(product, product.defaultColor)}
                    >
                        Order Now
                    </button>
                    <a
                        href={`https://wa.me/123456789?text=I'm%20interested%20in%20ordering%20the%20'${encodeURIComponent(product.name)}'%20t-shirt`}
                        className="btn btn-outline whatsapp-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Order via WhatsApp
                    </a>
                </div>
            ) : (
                <div className="coming-soon">Coming Soon</div>
            )}
        </div>
    );
}
// Products Section Component
function ProductsSection({ openOrderModal }) {
    return (
        <section className="products" id="products">
            <div className="container">
                <h2 className="section-title">Our Collection</h2>
                <div id="product-grid" className="product-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            openOrderModal={openOrderModal}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// About Section Component
function AboutSection() {
    return (
        <section className="about" id="about">
            <div className="container">
                <h2 className="section-title">About 404 Techwear</h2>
                <div className="about-content">
                    <div className="about-text">
                        <div className="badge">Inspired by Technology</div>
                        <h3>We're building clothes for the builders of the web</h3>
                        <p>404 Techwear was born from the intersection of coding culture and everyday fashion. We create high-quality apparel that resonates with developers, designers, and tech enthusiasts.</p>

                        <div className="code-block">
                            <p><span className="highlight">const</span> brand = {'{'}</p>
                            <p>&nbsp;&nbsp;name: <span className="highlight">'404 Techwear'</span>,</p>
                            <p>&nbsp;&nbsp;mission: <span className="highlight">'To make tech culture wearable'</span>,</p>
                            <p>&nbsp;&nbsp;founded: <span className="highlight">'Damascus, Syria'</span>,</p>
                            <p>&nbsp;&nbsp;quality: <span className="highlight">'Premium'</span></p>
                            <p>{'}'};</p>
                            <p><span className="code-comment">// We're not just a clothing brand, we're a community</span></p>
                        </div>

                        <p>Every shirt features our iconic 404 power button logo embroidered on the bottom left, with carefully crafted tech-inspired designs that make statements only true techies will understand.</p>

                        <a href="#contact" className="btn mt-2">Connect With Us</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Contact Section Component
function ContactSection() {
    return (
        <section className="instagram-connect" id="contact">
            <div className="container">
                <h2 className="section-title">Follow Our Journey</h2>
                <p>Connect with us on Instagram to stay updated on our latest designs and launch date.</p>

                <div className="instagram-container">
                    <div className="instagram-logo">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="#1dd1b0" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </div>
                    <div className="instagram-info">
                        <h3>@404_Techwear</h3>
                        <p>Our only official communication channel</p>
                        <a href="https://instagram.com/404_techwear" className="btn" target="_blank">Follow Us</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Footer Component
function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <div className="logo footer-logo">
                            <svg className="logo-icon" width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <text x="5" y="65" fontFamily="Arial" fontWeight="bold" fontSize="40" fill="white">4</text>
                                <text x="74" y="65" fontFamily="Arial" fontWeight="bold" fontSize="40" fill="white">4</text>
                                <circle cx="50" cy="50" r="15" stroke="#1dd1b0" strokeWidth="5" fill="none"></circle>
                                <line x1="50" y1="30" x2="50" y2="45" stroke="#1dd1b0" strokeWidth="5" strokeLinecap="round"></line>
                            </svg>
                            <span> Techwear</span>
                        </div>
                        <p>The missing line of code your wardrobe needs. Premium techwear for developers and designers.</p>
                    </div>

                    <div>
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#products">Our Products</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="copyright">
                    <p>© 2025 404 Techwear. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

// Order Modal Component
function OrderModal({ product, color, onClose, onSubmit, formRef, orderSuccess, orderId }) {
    // State for selected color
    const [selectedColor, setSelectedColor] = React.useState(color);

    // Click outside to close
    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal') {
            onClose();
        }
    };

    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>&times;</span>
                <h2>Complete Your Order</h2>

                {!orderSuccess ? (
                    <React.Fragment>
                        <div id="order-summary">
                            <p><strong>Product:</strong> <span id="modal-product-name">{product.name}</span></p>
                            <p><strong>Price:</strong> <span id="modal-product-price">${product.price.toFixed(2)}</span></p>
                        </div>

                        <form id="order-form" ref={formRef} action="https://formspree.io/f/manoydbv" method="POST" onSubmit={onSubmit}>
                            {/* Hidden fields to collect product info */}
                            <input type="hidden" name="product" id="form-product" value={product.name} />
                            <input type="hidden" name="price" id="form-price" value={product.price.toFixed(2)} />

                            {/* Color Selection */}
                            <div className="form-group">
                                <label htmlFor="color">Color:</label>
                                <div className="color-selection">
                                    {product.colors.map(colorOption => (
                                        <div
                                            key={colorOption}
                                            className={`color-option ${selectedColor === colorOption ? 'selected' : ''}`}
                                            style={{
                                                backgroundColor: getColorCode(colorOption),
                                                border: `2px solid ${selectedColor === colorOption ? '#1dd1b0' : 'transparent'}`
                                            }}
                                            onClick={() => setSelectedColor(colorOption)}
                                            title={colorOption}
                                        >
                                        </div>
                                    ))}
                                </div>
                                <input type="hidden" name="color" id="form-color" value={selectedColor} />
                                <p className="selected-color-text">Selected: {selectedColor}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="size">Size:</label>
                                <select id="size" name="size" required>
                                    <option value="">Select Size</option>
                                    {product.sizes.map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="quantity">Quantity:</label>
                                <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Full Name:</label>
                                <input type="text" id="name" name="name" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <input type="tel" id="phone" name="phone" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Delivery Address:</label>
                                <textarea id="address" name="address" required></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="discount">Discount Code (Optional):</label>
                                <input type="text" id="discount" name="discount" placeholder="Enter discount code if you have one" />
                            </div>

                            <div className="order-details">
                                <p>Payment Method: Cash on Delivery</p>
                                <input type="hidden" name="payment" value="Cash on Delivery" />
                            </div>

                            <button type="submit" className="btn">Place Order</button>
                        </form>
                    </React.Fragment>
                ) : (
                    <div className="form-success-message" style={{ display: 'block' }}>
                        <h3>Thank you for your order!</h3>
                        <p>Your order ID is: <strong>{orderId}</strong></p>
                        <p>We have received your order and will contact you shortly.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Image Preview Modal Component
function ImagePreviewModal() {
    const closeImagePreview = () => {
        const previewModal = document.getElementById('image-preview-modal');
        if (previewModal) {
            previewModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Allow scrolling again
        }
    };

    // Close when clicking anywhere on the modal
    const handleModalClick = (e) => {
        if (e.target.id === 'image-preview-modal' || e.target.id === 'preview-close') {
            closeImagePreview();
        }
    };

    return (
        <div id="image-preview-modal" className="image-preview-modal" onClick={handleModalClick}>
            <span className="preview-close" id="preview-close">&times;</span>
            <img id="preview-image" className="image-preview-content" alt="Preview" />
        </div>
    );
}

// Helper function to get color code from color name
function getColorCode(colorName) {
    const colorMap = {
        'Black': '#121212',
        'Gray': '#808080',
        'Beige': '#F5F5DC',
        'Off-White': '#f2f0ed',
        // Add more colors as needed
    };

    return colorMap[colorName] || '#121212'; // Default to black if color not found
}
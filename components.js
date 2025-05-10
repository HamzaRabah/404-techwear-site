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
                    <svg className="logo-icon"
                         version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1075 491" width="1075"
                         height="491">
                        <path fill="#19c0a3"
                              d="m378.9 277.2c0.8-42.9 15.9-79.4 44.4-110.6 8.3-9.1 17.5-17 27.8-23.9 6.1-4 11.8-4.1 17.6-0.2 12.1 8.1 16.5 23.3 5.6 35.2-6.7 7.3-14.4 13.7-21.3 21-16.6 17.7-26.3 38.6-29.6 62.8-4.4 32.7 4.5 61.8 24.6 87.4 15.8 20.2 36.2 34.5 61.4 40.6 42.5 10.2 80.3 0.4 111.3-30.6 19-19.1 30.3-42.8 32.8-70.1 3.8-41.5-10.7-75.5-42.4-102.4-4.8-4.1-9.6-8.1-12.3-14-4.5-9.8-1-24.8 7.5-31.3 5.2-4 11.2-3.9 17.1 0 16.3 10.5 30.3 23.4 42.1 38.8 14 18.4 23.5 38.8 27.7 61.5 2.4 13.5 5 26.9 4.2 40.7-0.8 12.5-2.7 24.8-5.8 36.9-6.6 25.7-18.3 48.6-36.7 67.9-22.4 23.4-49.2 39.2-81.2 45.8-34.6 7.2-68.3 4.5-100.5-9.8-35.1-15.5-61.1-40.8-77.8-75.6-10.7-22.3-15.7-45.9-16.5-70.1z"/>
                        <path fill="#f2f2f2"
                              d="m118 313c39 0 77.4-0.1 115.7 0.1 3.8 0 3.6-2 3.6-4.5q0-47.1 0-94.2c0-6.4 0-6.4 6.5-6.4 10.4 0 20.7 0 31.1-0.2 3.9 0 5.7 1.5 5.8 5.3q0 1.9 0 3.8c0 30.5 0.1 60.9 0 91.3-0.1 3.7 0.7 5 4.7 4.9 9.2-0.3 18.4-0.1 27.6-0.1 5.6 0 7.1 1.3 7.1 6.7 0.1 10.2 0 20.4 0.1 30.6 0 4.4-2 6.5-6.4 6.4-9.1-0.1-18.2 0.2-27.2-0.1-4.5-0.1-6 1.5-5.9 5.9 0.2 20.7 0.1 41.4 0.1 62.1 0 1.8-0.2 3.5-0.4 5.3-0.4 3.3-2.1 4.4-5.1 4.4-10.4 0-20.7 0.1-31.1 0-4.9-0.1-6.8-2.3-6.8-7.9-0.1-21.6-0.2-43.3 0-65 0.1-4-1.1-4.8-4.8-4.8-53.4 0.1-106.8 0.1-160.2 0.1-7.1 0-7.3-0.2-7.3-7.4 0-8.6 0.3-17.2-0.1-25.7-0.2-4.7 1.1-8.9 3-12.8 38.9-77.8 77.9-155.6 116.9-233.4 1.7-3.4 3.4-6.8 4.9-10.3 0.8-1.8 2.1-1.7 3.6-1.7 13.1 0 26.2-0.1 39.3 0 4.1 0.1 5.2 3 3.2 7.6-8.7 20-19 39.3-28.6 58.9-27.7 56.4-55.7 112.6-83.6 168.9-1.9 3.8-3.6 7.8-5.7 12.2z"/>
                        <path fill="#f2f2f2"
                              d="m939.6 434.2c-5.4-0.3-5.9-4.3-5.9-8.3 0-21.4-0.2-42.7 0.1-64.1 0.1-4.5-1.3-5.2-5.4-5.2-52.9 0.1-105.8 0.1-158.7 0.1-7.3 0-8.2-1-8.2-8.5 0-8.2 0.1-16.5 0-24.7-0.1-3.9 0.8-7.3 2.5-10.7q60.8-121.1 121.3-242.3c1.9-3.8 4-5.4 8.5-5.2 11.1 0.4 22.3 0.1 33.5 0.1 6.7 0 8.4 2.7 5.5 8.7-19.4 39.5-38.9 79-58.3 118.5-18.7 37.8-37.5 75.6-56.2 113.5-1.1 2.2-2.4 4.1-3.8 6 1.2 1.5 2.7 0.9 4.1 0.9 36.7 0 73.4-0.1 110.1 0.1 4 0 5.1-1 5.1-5.1-0.2-31-0.1-62.1-0.1-93.2 0-6.8 0-6.8 6.6-6.8 10 0 20-0.1 30.1 0 1.9 0 4.4-0.9 5.3 1.9 0 0-0.2 0.3-0.2 0.3l0.2 0.3c1.9 1.5 1.1 3.6 1.1 5.4 0.1 30.4 0 60.8 0.1 91.2 0 2-0.9 4.3 1.1 5.9q17.7 0 35.5 0c1.1 1.3 2.8 2.1 3.3 3.9q0.1 18 0.2 36c-1.4 3-3.7 3.9-7 3.9-9.2-0.2-18.5 0.1-27.7-0.2-4.3-0.1-5.5 1.5-5.5 5.7 0.1 22 0 43.9 0.1 65.9 0 4.1-1.5 6.1-5.6 6-10.6-0.5-21.1-0.6-31.7 0z"/>
                        <path fill="#19c0a3"
                              d="m560.8 167.4c0 26.2 0 52.4-0.1 78.6 0 11.2-7.4 20.3-17.8 22.1-11.6 2.1-21.4-3.3-25.7-14.1-1.2-3.2-1.3-6.6-1.3-10 0-51.6 0.1-103.2-0.1-154.8 0-14.7 10.9-26.2 26.4-24 10 1.3 18.4 10.7 18.5 22.1 0.2 20.4 0.1 40.8 0.1 61.1q0 9.5 0 19 0 0 0 0z"/>

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
                <h1>Hello, World of Fashion</h1>
                <p>Premium tech-wear for developers and designers.<br/>High-quality shirts with tech-inspired designs
                    that speak your language.</p>

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
                        href={`https://wa.me/+963935776387?text=I'm%20interested%20in%20ordering%20the%20'${encodeURIComponent(product.name)}'%20t-shirt`}
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
                        <h3>@404__wear</h3>
                        <p>Our only official communication channel</p>
                        <a href="https://www.instagram.com/404__wear" className="btn" target="_blank">Follow Us</a>
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
                                <input type="email" id="email" name="email" />
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
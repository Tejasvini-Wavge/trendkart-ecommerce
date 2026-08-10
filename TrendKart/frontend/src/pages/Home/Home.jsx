
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/products"
      );

      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Product added to cart 🛒");
  };

  // =========================
  // PRODUCT DETAILS
  // =========================

  const openProduct = (id) => {
    navigate(`/product/${id}`);
  };

  // =========================
  // CATEGORY FILTER
  // =========================

  const getCategoryProducts = (category) => {
    return products.filter(
      (product) =>
        product.category?.toLowerCase() ===
        category.toLowerCase()
    );
  };

  return (
    <div className="home">

      {/* ======================================
          TOP OFFER BAR
      ====================================== */}

      <div className="offer-bar">
        🚚 FREE SHIPPING ON ORDERS ABOVE ₹999
      </div>


      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav className="navbar">

        <Link to="/" className="brand">
          🛍️ TrendKart
        </Link>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <a href="#men">
            Men
          </a>

          <a href="#women">
            Women
          </a>

          <a href="#new-arrivals">
            New Arrivals
          </a>

          <a href="#offers">
            Offers
          </a>

        </div>


        <div className="nav-actions">

          {/* Search */}

          <button
            className="icon-btn"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            🔍
          </button>


          {/* Wishlist */}

          <button className="icon-btn">
            ♡
          </button>


          {/* Login */}

          <Link
            to="/login"
            className="icon-btn"
          >
            👤
          </Link>


          {/* Cart */}

          <button
            className="cart-btn"
            onClick={() => navigate("/cart")}
          >
            🛒
            <span>
              0
            </span>
          </button>

        </div>

      </nav>


      {/* ======================================
          HERO SECTION
      ====================================== */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small-title">
            NEW COLLECTION 2026
          </p>

          <h1>
            Elevate Your
            <br />
            Everyday Style
          </h1>

          <p className="hero-description">
            Discover fashion that matches
            your personality. Explore our
            latest collection of stylish
            clothing for every occasion.
          </p>

          <div className="hero-buttons">

            <a
              href="#products"
              className="primary-btn"
            >
              Shop Now
            </a>

            <a
              href="#categories"
              className="secondary-btn"
            >
              Explore Collection
            </a>

          </div>

        </div>


        <div className="hero-image">

          <div className="hero-image-content">

            <span>
              TRENDKART
            </span>

            <h2>
              YOUR
              <br />
              STYLE
            </h2>

            <p>
              WEAR YOUR CONFIDENCE
            </p>

          </div>

        </div>

      </section>


      {/* ======================================
          CATEGORY SECTION
      ====================================== */}

      <section
        className="categories-section"
        id="categories"
      >

        <div className="section-title">

          <p>
            EXPLORE
          </p>

          <h2>
            Shop By Category
          </h2>

        </div>


        <div className="category-grid">


          {/* MEN */}

          <a
            href="#men"
            className="category-card men-card"
          >

            <div>

              <span>
                01
              </span>

              <h3>
                Men
              </h3>

              <p>
                Explore Collection →
              </p>

            </div>

          </a>


          {/* WOMEN */}

          <a
            href="#women"
            className="category-card women-card"
          >

            <div>

              <span>
                02
              </span>

              <h3>
                Women
              </h3>

              <p>
                Explore Collection →
              </p>

            </div>

          </a>


          {/* T-SHIRTS */}

          <a
            href="#new-arrivals"
            className="category-card tshirt-card"
          >

            <div>

              <span>
                03
              </span>

              <h3>
                T-Shirts
              </h3>

              <p>
                Shop Now →
              </p>

            </div>

          </a>


          {/* OFFERS */}

          <a
            href="#offers"
            className="category-card offer-card"
          >

            <div>

              <span>
                04
              </span>

              <h3>
                Offers
              </h3>

              <p>
                Shop Sale →
              </p>

            </div>

          </a>

        </div>

      </section>


      {/* ======================================
          TRENDING PRODUCTS
      ====================================== */}

      <section
        className="products-section"
        id="products"
      >

        <div className="section-title">

          <p>
            SHOP THE LATEST
          </p>

          <h2>
            Trending Now 🔥
          </h2>

        </div>


        {products.length === 0 ? (

          <div className="no-products">

            <div>
              🛍️
            </div>

            <h3>
              No Products Available
            </h3>

            <p>
              Products added by the admin
              will appear here.
            </p>

          </div>

        ) : (

          <div className="product-grid">

            {products
              .slice(0, 8)
              .map((product) => (

                <div
                  className="product-card"
                  key={product.id}
                  onClick={() =>
                    openProduct(product.id)
                  }
                >


                  {/* PRODUCT IMAGE */}

                  <div className="product-image">

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    ) : (

                      <div className="product-placeholder">
                        👕
                      </div>

                    )}


                    {/* WISHLIST */}

                    <button
                      className="wishlist-btn"
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                    >
                      ♡
                    </button>


                    {/* NEW */}

                    <span className="new-badge">
                      NEW
                    </span>

                  </div>


                  {/* PRODUCT INFO */}

                  <div className="product-info">

                    <p className="product-category">
                      {product.category ||
                        "Fashion"}
                    </p>

                    <h3>
                      {product.name}
                    </h3>

                    <div className="rating">
                      ⭐⭐⭐⭐⭐
                    </div>


                    <div className="product-bottom">

                      <strong>
                        ₹{product.price}
                      </strong>


                      <button
                        className="add-cart-btn"
                        onClick={(event) => {

                          event.stopPropagation();

                          addToCart(product);

                        }}
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>

                </div>

              ))}

          </div>

        )}


        {/* VIEW ALL */}

        {products.length > 8 && (

          <div className="view-all">

            <button>
              View All Products →
            </button>

          </div>

        )}

      </section>


      {/* ======================================
          MEN SECTION
      ====================================== */}

      {getCategoryProducts("Men").length > 0 && (

        <section
          className="category-products"
          id="men"
        >

          <div className="section-title">

            <p>
              MEN'S COLLECTION
            </p>

            <h2>
              Men's Fashion
            </h2>

          </div>


          <div className="product-grid">

            {getCategoryProducts("Men")
              .slice(0, 4)
              .map((product) => (

                <div
                  className="product-card"
                  key={product.id}
                  onClick={() =>
                    openProduct(product.id)
                  }
                >

                  <div className="product-image">

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    ) : (

                      <div className="product-placeholder">
                        👕
                      </div>

                    )}

                  </div>


                  <div className="product-info">

                    <p className="product-category">
                      Men
                    </p>

                    <h3>
                      {product.name}
                    </h3>

                    <div className="product-bottom">

                      <strong>
                        ₹{product.price}
                      </strong>

                      <button
                        className="add-cart-btn"
                        onClick={(event) => {

                          event.stopPropagation();

                          addToCart(product);

                        }}
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>

                </div>

              ))}

          </div>

        </section>

      )}


      {/* ======================================
          WOMEN SECTION
      ====================================== */}

      {getCategoryProducts("Women").length > 0 && (

        <section
          className="category-products"
          id="women"
        >

          <div className="section-title">

            <p>
              WOMEN'S COLLECTION
            </p>

            <h2>
              Women's Fashion
            </h2>

          </div>


          <div className="product-grid">

            {getCategoryProducts("Women")
              .slice(0, 4)
              .map((product) => (

                <div
                  className="product-card"
                  key={product.id}
                  onClick={() =>
                    openProduct(product.id)
                  }
                >

                  <div className="product-image">

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    ) : (

                      <div className="product-placeholder">
                        👗
                      </div>

                    )}

                  </div>


                  <div className="product-info">

                    <p className="product-category">
                      Women
                    </p>

                    <h3>
                      {product.name}
                    </h3>

                    <div className="product-bottom">

                      <strong>
                        ₹{product.price}
                      </strong>

                      <button
                        className="add-cart-btn"
                        onClick={(event) => {

                          event.stopPropagation();

                          addToCart(product);

                        }}
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>

                </div>

              ))}

          </div>

        </section>

      )}


      {/* ======================================
          PROMOTIONAL BANNER
      ====================================== */}

      <section
        className="promo-section"
        id="offers"
      >

        <div className="promo-content">

          <p>
            LIMITED TIME OFFER
          </p>

          <h2>
            New Season.
            <br />
            New You.
          </h2>

          <span>
            Get up to 40% OFF on selected styles.
          </span>

          <button>
            Shop Offers →
          </button>

        </div>

      </section>


      {/* ======================================
          BENEFITS
      ====================================== */}

      <section className="benefits-section">

        <div className="section-title">

          <p>
            WHY TRENDKART
          </p>

          <h2>
            Shopping Made Better
          </h2>

        </div>


        <div className="benefits-grid">


          <div className="benefit-card">

            <div>
              🚚
            </div>

            <h3>
              Fast Delivery
            </h3>

            <p>
              Get your favorite styles
              delivered quickly.
            </p>

          </div>


          <div className="benefit-card">

            <div>
              🔒
            </div>

            <h3>
              Secure Payment
            </h3>

            <p>
              Your payment and data
              are always protected.
            </p>

          </div>


          <div className="benefit-card">

            <div>
              ↩️
            </div>

            <h3>
              Easy Returns
            </h3>

            <p>
              Hassle-free returns
              within our return policy.
            </p>

          </div>


          <div className="benefit-card">

            <div>
              💬
            </div>

            <h3>
              Customer Support
            </h3>

            <p>
              We're here whenever
              you need us.
            </p>

          </div>

        </div>

      </section>


      {/* ======================================
          NEWSLETTER
      ====================================== */}

      <section className="newsletter">

        <div>

          <p>
            STAY IN THE LOOP
          </p>

          <h2>
            Get fashion updates
            in your inbox.
          </h2>

        </div>


        <div className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email address"
          />

          <button>
            Subscribe
          </button>

        </div>

      </section>


      {/* ======================================
          FOOTER
      ====================================== */}

      <footer className="footer">

        <div className="footer-grid">


          <div className="footer-brand">

            <h2>
              🛍️ TrendKart
            </h2>

            <p>
              Discover your style.
              Wear your confidence.
            </p>

            <div className="social-icons">
              Instagram &nbsp; Facebook &nbsp; Twitter
            </div>

          </div>


          <div>

            <h3>
              Shop
            </h3>

            <a href="#men">
              Men
            </a>

            <a href="#women">
              Women
            </a>

            <a href="#new-arrivals">
              New Arrivals
            </a>

            <a href="#offers">
              Offers
            </a>

          </div>


          <div>

            <h3>
              Help
            </h3>

            <a href="#contact">
              Contact Us
            </a>

            <a href="#shipping">
              Shipping
            </a>

            <a href="#returns">
              Returns
            </a>

            <a href="#faq">
              FAQ
            </a>

          </div>


          <div>

            <h3>
              Account
            </h3>

            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Create Account
            </Link>

            <Link to="/cart">
              Shopping Cart
            </Link>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © 2026 TrendKart.
            All Rights Reserved.
          </p>

          <p>
            Privacy Policy &nbsp; | &nbsp;
            Terms & Conditions
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;


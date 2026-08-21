import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminProducts.css";

function AdminProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: ""
  });

  const token = localStorage.getItem("token");

 
  // FETCH PRODUCTS
  

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/admin/products"
      );

      setProducts(response.data.products || []);

    } catch (error) {

      console.error(
        "Error fetching products:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchProducts();
  }, []);



  // HANDLE INPUT
 

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


 
  // RESET FORM


  const resetForm = () => {

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: ""
    });

    setEditingProduct(null);
    setShowForm(false);

  };



  // ADD PRODUCT
  

  const handleAddProduct = async (event) => {

    event.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/admin/products",
        {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
          image: formData.image,
          stock: Number(formData.stock)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product added successfully ✅");

      resetForm();

      fetchProducts();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add product"
      );

    }

  };


 
  // OPEN EDIT FORM
  

  const handleEdit = (product) => {

    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "",
      image: product.image || "",
      stock: product.stock || ""
    });

    setShowForm(true);

  };



  // UPDATE PRODUCT
 

  const handleUpdateProduct = async (event) => {

    event.preventDefault();

    try {

      await axios.put(
        `http://localhost:5000/admin/products/${editingProduct.id}`,
        {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
          image: formData.image,
          stock: Number(formData.stock)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product updated successfully ✅");

      resetForm();

      fetchProducts();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to update product"
      );

    }

  };


 
  // DELETE PRODUCT
  // 

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:5000/admin/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product deleted successfully 🗑️");

      fetchProducts();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete product"
      );

    }

  };


  return (

    <div className="admin-products-page">


      {/* 
          SIDEBAR
      */}

      <aside className="products-sidebar">

        <div className="products-logo">
          🛍️ TrendKart
        </div>

        <p className="sidebar-label">
          ADMIN PANEL
        </p>

        <nav>

          <Link to="/admin/dashboard">
            📊 Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="active"
          >
            🛍️ Products
          </Link>

          <Link to="/admin/users">
            👥 Users
          </Link>

          <Link to="/admin/orders">
            📦 Orders
          </Link>

          <Link to="/admin/settings">
            ⚙️ Settings
          </Link>

        </nav>

      </aside>


      {/* 
          MAIN
      */}

      <main className="products-main">


        {/* HEADER */}

        <header className="products-header">

          <div>

            <p>
              PRODUCT MANAGEMENT
            </p>

            <h1>
              Products
            </h1>

          </div>


          <button
            className="add-product-btn"
            onClick={() => {

              setEditingProduct(null);

              setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                image: "",
                stock: ""
              });

              setShowForm(true);

            }}
          >
            + Add Product
          </button>

        </header>


        {/*
            ADD / EDIT FORM
        */}

        {showForm && (

          <div className="product-form-card">

            <div className="form-header">

              <div>

                <p>
                  {editingProduct
                    ? "UPDATE PRODUCT"
                    : "NEW PRODUCT"}
                </p>

                <h2>
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

              </div>

              <button
                className="close-form"
                onClick={resetForm}
              >
                ✕
              </button>

            </div>


            <form
              onSubmit={
                editingProduct
                  ? handleUpdateProduct
                  : handleAddProduct
              }
            >


              <div className="form-grid">


                {/* NAME */}

                <div className="form-group">

                  <label>
                    Product Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                  />

                </div>


                {/* CATEGORY */}

                <div className="form-group">

                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Category
                    </option>

                    <option value="Men">
                      Men
                    </option>

                    <option value="Women">
                      Women
                    </option>

                    <option value="T-Shirts">
                      T-Shirts
                    </option>

                    <option value="Jeans">
                      Jeans
                    </option>

                    <option value="Dresses">
                      Dresses
                    </option>

                    <option value="Accessories">
                      Accessories
                    </option>

                  </select>

                </div>


                {/* PRICE */}

                <div className="form-group">

                  <label>
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="₹ 0"
                    min="0"
                    required
                  />

                </div>


                {/* STOCK */}

                <div className="form-group">

                  <label>
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Enter stock"
                    min="0"
                    required
                  />

                </div>


                {/* IMAGE */}

                <div className="form-group full-width">

                  <label>
                    Image URL
                  </label>

                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                  />

                </div>


                {/* DESCRIPTION */}

                <div className="form-group full-width">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    rows="4"
                  />

                </div>


              </div>


              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  {editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>

              </div>

            </form>

          </div>

        )}


        {/* 
            PRODUCT TABLE
        */}

        <section className="products-table-section">

          <div className="table-top">

            <div>

              <p>
                INVENTORY
              </p>

              <h2>
                All Products
              </h2>

            </div>

            <span>
              {products.length} Products
            </span>

          </div>


          {loading ? (

            <div className="products-loading">
              Loading products...
            </div>

          ) : products.length === 0 ? (

            <div className="products-empty">

              <div>
                🛍️
              </div>

              <h3>
                No Products Found
              </h3>

              <p>
                Add your first product to TrendKart.
              </p>

            </div>

          ) : (

            <div className="products-table-wrapper">

              <table className="products-table">

                <thead>

                  <tr>

                    <th>
                      Product
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Price
                    </th>

                    <th>
                      Stock
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {products.map((product) => (

                    <tr key={product.id}>


                      {/* PRODUCT */}

                      <td>

                        <div className="product-cell">

                          <div className="product-thumb">

                            {product.image ? (

                              <img
                                src={product.image}
                                alt={product.name}
                              />

                            ) : (

                              <span>
                                👕
                              </span>

                            )}

                          </div>

                          <div>

                            <strong>
                              {product.name}
                            </strong>

                            <small>
                              ID: #{product.id}
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* CATEGORY */}

                      <td>
                        {product.category || "Fashion"}
                      </td>


                      {/* PRICE */}

                      <td>
                        ₹{product.price}
                      </td>


                      {/* STOCK */}

                      <td>
                        {product.stock}
                      </td>


                      {/* STATUS */}

                      <td>

                        {Number(product.stock) > 0 ? (

                          <span className="stock-status in-stock">
                            In Stock
                          </span>

                        ) : (

                          <span className="stock-status out-stock">
                            Out of Stock
                          </span>

                        )}

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="product-actions">

                          <button
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(product)
                            }
                          >
                            ✏️
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(product.id)
                            }
                          >
                            🗑️
                          </button>

                        </div>

                      </td>


                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>

  );
}

export default AdminProducts;
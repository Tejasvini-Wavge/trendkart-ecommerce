
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  // ==============================
  // PRODUCTS
  // ==============================

  const [products, setProducts] = useState([]);

  // ==============================
  // PRODUCT FORM
  // ==============================

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");

  // ==============================
  // EDIT STATE
  // ==============================

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ==============================
  // GET ALL PRODUCTS
  // ==============================

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/products"
      );

      setProducts(response.data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  // Load products when dashboard opens
  useEffect(() => {
    fetchProducts();
  }, []);

  // ==============================
  // ADD PRODUCT
  // ==============================

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/admin/products",
        {
          name,
          description,
          price,
          category,
          image,
          stock,
        }
      );

      alert("Product added successfully");

      clearForm();

      fetchProducts();
    } catch (error) {
      console.log("Error adding product:", error);

      alert(
        error.response?.data?.message ||
        "Failed to add product"
      );
    }
  };

  // ==============================
  // SELECT PRODUCT FOR EDIT
  // ==============================

  const handleEditProduct = (product) => {
    setEditingId(product.id);

    setName(product.name);
    setDescription(product.description || "");
    setPrice(product.price);
    setCategory(product.category || "");
    setImage(product.image || "");
    setStock(product.stock);

    setIsEditing(true);
  };

  // ==============================
  // UPDATE PRODUCT
  // ==============================

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/admin/products/${editingId}`,
        {
          name,
          description,
          price,
          category,
          image,
          stock,
        }
      );

      alert("Product updated successfully");

      clearForm();

      fetchProducts();
    } catch (error) {
      console.log("Error updating product:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update product"
      );
    }
  };

  // ==============================
  // DELETE PRODUCT
  // ==============================

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/admin/products/${id}`
      );

      alert("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      console.log("Error deleting product:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete product"
      );
    }
  };

  // ==============================
  // CLEAR FORM
  // ==============================

  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImage("");
    setStock("");

    setEditingId(null);
    setIsEditing(false);
  };

  // ==============================
  // ADMIN LOGOUT
  // ==============================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div>

      {/* ==============================
          ADMIN HEADER
      ============================== */}

      <h1>Welcome to Admin Dashboard 👨‍💼</h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      <hr />

      {/* ==============================
          PRODUCT FORM
      ============================== */}

      <h2>
        {isEditing
          ? "Edit Product ✏️"
          : "Add Product ➕"}
      </h2>

      <form
        onSubmit={
          isEditing
            ? handleUpdateProduct
            : handleAddProduct
        }
      >

        {/* NAME */}

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <br />
        <br />

        {/* DESCRIPTION */}

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <br />
        <br />

        {/* PRICE */}

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          required
        />

        <br />
        <br />

        {/* CATEGORY */}

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <br />
        <br />

        {/* IMAGE */}

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <br />
        <br />

        {/* STOCK */}

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        <br />
        <br />

        {/* SUBMIT */}

        <button type="submit">
          {isEditing
            ? "Update Product"
            : "Add Product"}
        </button>

        {/* CANCEL EDIT */}

        {isEditing && (
          <button
            type="button"
            onClick={clearForm}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}

      </form>

      <hr />

      {/* ==============================
          MANAGE PRODUCTS
      ============================== */}

      <h2>Manage Products 📦</h2>

      {products.length === 0 ? (

        <p>No products found.</p>

      ) : (

        <table
          border="1"
          cellPadding="10"
        >

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Price</th>

              <th>Category</th>

              <th>Stock</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product.id}>

                <td>
                  {product.id}
                </td>

                <td>
                  {product.name}
                </td>

                <td>
                  ₹{product.price}
                </td>

                <td>
                  {product.category}
                </td>

                <td>
                  {product.stock}
                </td>

                <td>

                  {/* EDIT */}

                  <button
                    onClick={() =>
                      handleEditProduct(product)
                    }
                  >
                    Edit
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      handleDeleteProduct(product.id)
                    }
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default AdminDashboard;


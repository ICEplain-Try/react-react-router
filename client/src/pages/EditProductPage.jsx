import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditProductForm from "../components/EditProductForm";

function EditProductPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/products/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:4001/products/${id}`, formData);
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h1>Edit Product Page</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <EditProductForm handleChange={handleChange} formData={formData} />
        <div className="form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductPage;

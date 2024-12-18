import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  // สร้าง State สำหรับเก็บข้อมูลสินค้า, ข้อผิดพลาด และสถานะการโหลด
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ใช้ useNavigate สำหรับนำทางไปหน้าอื่น
  const navigate = useNavigate();

  // ฟังก์ชันดึงข้อมูลสินค้าจาก Server
  const getProducts = async function () {
    try {
      setIsError(false); // รีเซ็ตสถานะข้อผิดพลาด
      setIsLoading(true); // เริ่มสถานะโหลด
      const response = await axios.get("http://localhost:4001/products");
      setProducts(response.data.data); // เก็บข้อมูลสินค้าที่ได้ใน State
      setIsLoading(false); // สิ้นสุดการโหลด
    } catch (error) {
      setIsError(true); // ตั้งสถานะข้อผิดพลาดถ้าเกิดปัญหา
    }
  };

  // ฟังก์ชันลบสินค้า
  const deleteProduct = async function (id) {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      setProducts(function (prevProducts) {
        return prevProducts.filter(function (product) {
          return product.id !== id; // อัปเดต State โดยลบสินค้าที่มี ID ตรงกับที่ลบ
        });
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // ดึงข้อมูลสินค้าทั้งหมดเมื่อ Component โหลดครั้งแรก
  useEffect(function () {
    getProducts();
  }, []);

  return (
    <div>
      {/* ส่วน Header */}
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
        <button
          onClick={function () {
            navigate("/create"); // นำทางไปหน้า Create Product Page
          }}
        >
          Create Product
        </button>
      </div>

      {/* ส่วนแสดงสินค้าทั้งหมด */}
      <div className="product-list">
        {products.map(function (product) {
          return (
            <div key={product.id} className="product">
              {/* ส่วนแสดงภาพสินค้า */}
              <div className="product-preview">
                <img
                  src={product.image}
                  alt={product.name}
                  width="250"
                  height="250"
                />
              </div>

              {/* ส่วนแสดงรายละเอียดสินค้า */}
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>

                {/* ปุ่ม View และ Edit */}
                <div className="product-actions">
                  <button
                    className="view-button"
                    onClick={function () {
                      navigate("/view/" + product.id); // นำทางไปหน้า View Product Page
                    }}
                  >
                    View
                  </button>
                  <button
                    className="edit-button"
                    onClick={function () {
                      navigate("/edit/" + product.id); // นำทางไปหน้า Edit Product Page
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* ปุ่ม Delete */}
              <button
                className="delete-button"
                onClick={function () {
                  deleteProduct(product.id); // เรียกฟังก์ชันลบสินค้า
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>

      {/* แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาดหรือกำลังโหลด */}
      {isError ? <h1>Request failed</h1> : null}
      {isLoading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default HomePage;

import { useEffect, useState } from "react";
import "./App.css";

function Header() {
  return <h1 className="header">Amazon Product Store</h1>;
}

function ProductCard({ productName, price, quantity, selectedColor, deliveryCity }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${productName} | ${selectedColor} | Cart: ${quantity}`;

    return () => {
      document.title = previousTitle;
    };
  }, [productName, selectedColor, quantity]);

  const totalAmount = quantity * price;

  return (
    <div className="product-card">
      <h2>Product Details</h2>
      <p><strong>Product:</strong> {productName}</p>
      <p><strong>Price:</strong> ₹{price}</p>
      <p><strong>Colour:</strong> {selectedColor}</p>
      <p><strong>Deliver to:</strong> {deliveryCity}</p>
      <p><strong>Cart Quantity:</strong> {quantity}</p>
      <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
      <p><strong>Status:</strong> {quantity === 0 ? "Cart is empty" : "Product added to cart"}</p>
    </div>
  );
}

function Footer() {
  return <footer>© 2026 Amazon Product Store</footer>;
}

function App() {
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [deliveryCity, setDeliveryCity] = useState("Coimbatore");
  const [showProduct, setShowProduct] = useState(true);

  const productName = "Wireless Mouse";
  const price = 499;

  return (
    <div className="app">
      <Header />

      <div className="controls">
        <label htmlFor="color">Select Colour:</label>
        <select id="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
          <option value="White">White</option>
        </select>

        <label htmlFor="city">Delivery City:</label>
        <input id="city" type="text" value={deliveryCity} onChange={(e) => setDeliveryCity(e.target.value)} />

        <div className="buttons">
          <button onClick={() => setQuantity(q => q + 1)}>Add to Cart</button>
          <button onClick={() => setQuantity(q => Math.max(0, q - 1))} disabled={quantity === 0}>Remove One</button>
          <button onClick={() => setQuantity(0)}>Reset Cart</button>
          <button onClick={() => setShowProduct(v => !v)}>{showProduct ? "Hide Product" : "Show Product"}</button>
        </div>
      </div>

      {showProduct && (
        <ProductCard
          productName={productName}
          price={price}
          quantity={quantity}
          selectedColor={selectedColor}
          deliveryCity={deliveryCity}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
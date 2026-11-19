import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import CatalogPage from "./pages/CatalogPage";
import CheckoutPage from "./pages/CheckoutPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import { ALBUMS } from "./data/albums";

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // cart handlers -> unidirectional data flow
  //event handler to add items to the cart
  const handleAddToCart = (album, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === album.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === album.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...album, quantity }];
    });
    setIsCartOpen(true);
  };

  //update the items in the cart - update operations
  const handleUpdateQuantity = (albumId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === albumId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  // removing items from the cart
  const handleRemoveFromCart = (albumId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== albumId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // subtotal of the cart must persist universally
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // JSX formulation
  return (
    <div className="app-container">
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <CatalogPage albums={ALBUMS} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/album/:albumId"
            element={
              <AlbumDetailPage albums={ALBUMS} onAddToCart={handleAddToCart} />
            }
          />

          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} onClearCart={handleClearCart} />}
          />
        </Routes>
      </main>

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default App;

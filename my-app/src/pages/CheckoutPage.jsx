import React, { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = ({ cart, onClearCart }) => {
  // check if the user has confirmed any payments
  const [isSubmitted, setIsSubmitted] = useState(false);

  //initalize the form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    shippingAddress: "",
    zipCode: "",
  });

  // comput the cart total of the invoice calculation
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  //add michigan taxes
  const taxes = subtotal * 0.06;
  const total = subtotal + taxes;

  //event listner to handle form input feilds
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //event listener to handle form submissions
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    onClearCart();
  };
  // When user purchases items
  if (isSubmitted) {
    return (
      <div className="checkout-success">
        <h2> Your Order was placed successfully 🎉 </h2>
        <p>
          Thank you! {formData.fullName}. A confirmation email is sent to{" "}
          {formData.email}. Happy Shopping!
        </p>
        <Link className="btn btn-primary" to="/">
          Return to HomePage
        </Link>
      </div>
    );
  }
  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="empty-cart-page">
        <h2> Your cart is empty. 👀 </h2>
        <Link className="btn btn-secondary" to="/">
          Shop for some items 🛒 !
        </Link>
      </div>
    );
  }

  //
  return (
    <div className="checkout-container">
      <h1> Checkout and Order Confirmation </h1>
      <div className="checkout-grid">
        {/* {FORM ELEMENTS} */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2> Shipping Information 🛒 </h2>
          <div className="form-group">
            <label htmlFor="fullName"> Full Name *</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"> Email *</label>
            <input
              type="text"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress"> Shipping Address *</label>
            <input
              type="text"
              name="shippingAddress"
              id="shippingAddress"
              required
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode"> Zip Code *</label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              required
              pattern="[0-9]{5}"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Complete Order (${total.toFixed(2)})
          </button>
        </form>

        <aside className="order-summary-card">
          <h3> Order Summary </h3>
          <ul className="summary-list">
            {cart.map((item) => (
              <li key={item.id} className="summary-row">
                <span>
                  {item.title} &times; {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-row">
            <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax (6%):</span> <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total:</span> <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;

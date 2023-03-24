import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

import { CartProvider } from "./context/CartProvider";
import { ProductsProvider } from "./context/ProductProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
);

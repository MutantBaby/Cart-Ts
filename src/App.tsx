import { useState } from "react";

import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <Product />;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  );

  return content;
}

export default App;

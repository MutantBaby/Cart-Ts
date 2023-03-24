import { ReactElement } from "react";

import Pro from "./Pro";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";

const Product = () => {
  const { REDUCER_ACTION, cart, dispatch } = useCart();

  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);

      return (
        <Pro
          inCart={inCart}
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTION}
        />
      );
    });
  }

  const content = <main className="main main--products">{pageContent}</main>;

  return content;
};

export default Product;

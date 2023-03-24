import { useState } from "react";
import useCart from "../hooks/useCart";
import CartItemList from "./CartItemList";

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);

  const { REDUCER_ACTION, cart, dispatch, totalItem, totalPrice } = useCart();

  const onSubmitOrder = () => {
    dispatch({
      type: REDUCER_ACTION.SUBMIT,
    });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <h2>Thank You For Your Purchase</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartItemList
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTION={REDUCER_ACTION}
            />
          );
        })}
      </ul>

      <div className="cart__totals">
        <p>Total Items: {totalItem}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          disabled={!totalItem}
          onClick={onSubmitOrder}
          className="cart__submit">
          Place Order
        </button>
      </div>
    </>
  );

  const content = <main className="main main--cart">{pageContent}</main>;

  return content;
};

export default Cart;

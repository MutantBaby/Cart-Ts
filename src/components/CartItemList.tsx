import React, { ChangeEvent, memo, ReactElement } from "react";
import {
  CartItemType,
  ReducerAction,
  ReducerActionType,
} from "../context/CartProvider";

type PropType = {
  item: CartItemType;
  REDUCER_ACTION: ReducerActionType;
  dispatch: React.Dispatch<ReducerAction>;
};

const CartItemList = ({ item, REDUCER_ACTION, dispatch }: PropType) => {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
    .href;

  const lineTotal: number = item.quantity * item.price;
  const highestQuantity: number = 20 > item.quantity ? 20 : item.quantity;
  const optionValues: number[] = [...Array(highestQuantity).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTION.QUANTITY,
      payload: { ...item, quantity: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTION.REMOVE,
      payload: item,
    });

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div>

      <label htmlFor="itemQuantity" className="offscreen">
        Item Quantity
      </label>
      <select
        id="itemQuantity"
        name="itemQuantity"
        value={item.quantity}
        className="cart__select"
        aria-label="Item Quantity"
        onChange={onChangeQuantity}>
        {options}
      </select>

      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>

      <button
        className="cart__button"
        onClick={onRemoveFromCart}
        title="Remove Item From Cart"
        aria-label="Remove Item From Cart">
        ❌
      </button>
    </li>
  );

  return content;
};

function areItemsEqual(
  { item: prevItem }: PropType,
  { item: nextItem }: PropType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartItemList = memo<typeof CartItemList>(
  CartItemList,
  areItemsEqual
);

export default MemoizedCartItemList;

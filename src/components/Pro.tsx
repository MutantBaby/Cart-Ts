import { memo, ReactElement } from "react";
import { ProductType } from "../context/ProductProvider";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";

type PropsType = {
  inCart: boolean;
  product: ProductType;
  REDUCER_ACTIONS: ReducerActionType;
  dispatch: React.Dispatch<ReducerAction>;
};

const Pro = ({
  inCart,
  product,
  dispatch,
  REDUCER_ACTIONS,
}: PropsType): ReactElement => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;

  console.log(img);

  const onAddToCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...product, quantity: 1 },
    });

  const itemInCart = inCart ? ` -> Item in Cart: ✔️` : null;

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="prduct__img" />
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
        {itemInCart}
        <button onClick={onAddToCart}>Add To Cart</button>
      </p>
    </article>
  );

  return content;
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}

const MemoizedPro = memo<typeof Pro>(Pro, areProductsEqual);

export default MemoizedPro;

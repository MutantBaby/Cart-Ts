import { createContext, ReactElement, useMemo, useReducer } from "react";

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

type CartStateType = { cart: CartItemType[] };

const initialCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  SUBMIT: "SUBMIT",
  QUANTITY: "QUANTITY",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload)
        throw new Error("Action Payload Missing -> Add -> CartProvider");

      const { sku, name, price } = action.payload;

      // getting old data
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      // whether item exist already or not.
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      const quantity: number = itemExists ? itemExists.quantity + 1 : 1;

      return {
        ...state,
        cart: [...filteredCart, { sku, name, price, quantity }],
      };
    }

    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload)
        throw new Error("Action Payload Missing -> Remove -> CartProvider");

      const { sku } = action.payload;

      // getting old data in saved
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return {
        ...state,
        cart: [...filteredCart],
      };
    }

    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload)
        throw new Error("Action Payload Missing -> Quantity -> CartProvider");

      const { sku, quantity } = action.payload;

      // getting new data
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      if (!itemExists)
        throw new Error("Item should exist -> Quantity -> CartProvider");

      const updateItem: CartItemType = { ...itemExists, quantity };

      // getting old data in saved
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return {
        ...state,
        cart: [...filteredCart, updateItem],
      };
    }

    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }

    default:
      throw new Error("Unidentified Reducer Action Type -> CartProvider");
  }
};

const useCartContext = (initialCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initialCartState);

  const REDUCER_ACTION: ReducerActionType = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  console.log(`State Value -> UseCartUpdate -> CartProvider`, state);

  const totalItem: number = state.cart.reduce(
    (prevValue, cartItem) => prevValue + cartItem.quantity,
    0
  );

  const totalPrice: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USA",
  }).format(
    state.cart.reduce(
      (prevValue, cartItem) => prevValue + cartItem.quantity * cartItem.price,
      0
    )
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-3));
    const itemB = Number(b.sku.slice(-3));

    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTION, totalItem, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initialCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTION: REDUCER_ACTION_TYPE,
  totalItem: 0,
  totalPrice: "",
  cart: [],
};

const CartContext = createContext<UseCartContextType>(
  initialCartContextState
);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initialCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

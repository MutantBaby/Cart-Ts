import { createContext, ReactElement, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

// const initialState: ProductType[] = [];

const initialState: ProductType[] = [
  {
    sku: "item001",
    name: "Widget",
    price: 9.99,
  },
  {
    sku: "item002",
    name: "Premium Stuff",
    price: 159.99,
  },
  {
    sku: "item003",
    name: "Dulex Edition",
    price: 999.99,
  },
];

export type UseProductsContextType = { products: ProductType[] };

const initialContextState: UseProductsContextType = { products: [] };

const ProductsContext =
  createContext<UseProductsContextType>(initialContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initialState);

  // useEffect(() => {
  //   const fetchProducts = async (): Promise<ProductType[]> => {
  //     const data = await fetch(`http://localhost:3500/products`)
  //       .then((res) => res.json())
  //       .catch((err) => {
  //         if (err instanceof Error) console.log(err.message);
  //       });

  //     return data;
  //   };

  //   fetchProducts().then((products) => setProducts(products));
  // }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;

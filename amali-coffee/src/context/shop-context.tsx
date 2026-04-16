import { useContext, useState } from "react";
import { products } from "../product";
import ShopContext from "./ShopContext";

export type ShopContextType = {
  cartItems: { [key: number]: number };
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  getTotalCartAmount: () => number;
  deleteFromCart: (id: number) => void;
  resetCart: () => void;
};

const getDefaultCart = () => {
  const cart: any = {};
  for (let i = 1; i < products.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
// Custom hook to access ShopContext
export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (context === null) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }
  return context;
};

// ShopContextProvider component
const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState(getDefaultCart);

  // calculate total amount for products in cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const iteminfo = products.find((product) => product.id == Number(item));
        if (iteminfo) {
          totalAmount += cartItems[item] * iteminfo.price;
        }
      }
    }
    return totalAmount;
  };

  //deleted item from cart
  const deleteFromCart = (id: number) => {
    setCartItems((prev: any) => {
      const updatedCart = { ...prev };
      updatedCart[id] = 0; // Set quantity to 0, or you can use `delete updatedCart[id];` to completely remove it
      return updatedCart;
    });
  };

  const addToCart = (id: number) => {
    setCartItems((prev: number[]) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev: number[]) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 0),
    }));
  };

  //reseting cart
  const resetCart = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    resetCart,
    getTotalCartAmount,
    deleteFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

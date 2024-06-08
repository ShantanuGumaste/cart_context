import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  onAddItemToCart: () => {},
});

const shoppingCartReducer = (state, actions) => {
  if (actions.type == "ADD_ITEM_TO_CART") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === actions.payload.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === actions.payload.id
      );
      updatedItems.push({
        id: actions.payload.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  } else if (actions.type === "UPDATE_CART_ITEM_QUANTITY") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === actions.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += actions.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
};

const CartContextProvider = ({ children }) => {
  const [shoppingCartState, dispatchShoppingCart] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(id) {
    dispatchShoppingCart({
      type: "ADD_ITEM_TO_CART",
      payload: { id },
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    dispatchShoppingCart({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: {
        productId,
        amount,
      },
    });
  }

  const contextValueData = {
    items: shoppingCartState.items,
    onAddItemToCart: handleAddItemToCart,
    onUpdateCartItem: handleUpdateCartItemQuantity,
  };
  return (
    <CartContext.Provider value={contextValueData}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;

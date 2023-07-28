export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const deleteCartItem = (itemId) => ({
  type: "DELETE_CART_ITEM",
  payload: itemId,
});

export const setInitialCartItems = (cartItems) => ({
  type: "SET_INITIAL_CART_ITEMS",
  payload: cartItems,
});

export const setInitialShoesList = (productList) => ({
  type: "SET_INITIAL_PRODUCTS_LIST",
  payload: productList,
});

const initialState = {
  cartItems: [],
  productsList: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INITIAL_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "ADD_TO_CART":
      const newList = state.productsList.map((product) => {
        if (product._id.includes(action.payload.productID._id)) {
          product.isAdded = true;
        }

        return product;
      });
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        productsList: [...newList],
      };
    case "DELETE_CART_ITEM":
      const newDeleteList = state.productsList.map((product) => {
        if (product._id.includes(action.payload.productID)) {
          product.isAdded = false;
        }

        return product;
      });
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
        productsList: [...newDeleteList],
      };
    case "SET_INITIAL_PRODUCTS_LIST":
      return {
        ...state,
        productsList: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;

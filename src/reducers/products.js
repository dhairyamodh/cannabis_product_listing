
const initState = {
  allProducts: null,
  isLoading: false,
  error: null
}

export const products = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_PRODUCTS_SUCCESS':
      console.log('action', action.payload);
      return {
        ...state,
        allProducts: action.payload.data,
        isLoading: !state.isLoading
      }

    case 'GET_ALL_PRODUCTS_FAIL':
      return {
        ...state,
        isLoading: !state.isLoading,
        error: action.error.data
      }

    default:
      return state
  }
}
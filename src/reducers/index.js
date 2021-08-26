import { combineReducers } from 'redux'
import { products } from './products'

//decide to leave it for demostration
const reducers = combineReducers({
  products: products
})

export default reducers
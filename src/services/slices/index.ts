export { feedSlice, getFeedThunk } from './feed/feedSlice';
export {
  ingredientSlice,
  getIngredientsThunk
} from './ingredients/ingredientSlice';
export {
  orderSlice,
  getOrdersThunk,
  getOrderByNumberThunk,
  clearOrderModalData,
  requestOrderThunk
} from './order/orderSlice';
export {
  userSlice,
  getUserThunk,
  loginUserThunk,
  registerThunk,
  logoutThunk,
  updateThunk
} from './user/userSlice';
export {
  constructorSlice,
  chooseBun,
  addIngredient,
  removeIngredient,
  replaceIngredient
} from './constructor/constructorSlice';

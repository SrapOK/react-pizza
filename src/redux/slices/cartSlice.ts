import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
}

interface initialState {
  totalPrice: number;
  length: number;
  items: IPizza[];
}

const initialState: initialState = {
  totalPrice: 0,
  length: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<IPizza>) {
      const theSamePizza = findPizza(state.items, action);

      if (theSamePizza) {
        theSamePizza.count++;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce(
        (acc, obj): number => acc + obj.price * obj.count,
        0 as number
      );
      state.length = state.items.reduce(
        (acc, obj): number => acc + obj.count,
        0 as number
      );
    },
    clearCartItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.length = 0;
    },
    minusCartItem(state, action: PayloadAction<IPizza>) {
      const theSamePizza = findPizza(state.items, action);

      if (theSamePizza) {
        if (theSamePizza.count > 1) {
          theSamePizza.count--;
        } else {
          const index = state.items.indexOf(theSamePizza);
          state.items.splice(index, index + 1);
        }
      }
      state.length = state.items.reduce(
        (acc, obj) => acc + obj.count,
        0 as number
      );
      state.totalPrice = state.items.reduce(
        (acc, obj): number => acc + obj.price * obj.count,
        0 as number
      );
    },

    removeCartItem(state, action: PayloadAction<IPizza>) {
      const theSamePizza = findPizza(state.items, action);

      if (theSamePizza) {
        const index = state.items.indexOf(theSamePizza);
        state.items.splice(index, index + 1);
      }
      state.length = state.items.reduce(
        (acc, obj) => acc + obj.count,
        0 as number
      );
      state.totalPrice = state.items.reduce(
        (acc, obj): number => acc + obj.price * obj.count,
        0 as number
      );
    },
  },
});

export const { clearCartItems, addCartItem, minusCartItem, removeCartItem } =
  cartSlice.actions;

export const selectTotalPrice = (state: RootState) =>
  state.cartSlice.totalPrice;
export const selectLengthOfCart = (state: RootState) => state.cartSlice.length;

export default cartSlice.reducer;

function comparePizzas(a: IPizza, b: IPizza): boolean {
  if (
    a.id === b.id &&
    a.size === b.size &&
    a.title === b.title &&
    a.type === b.type
  ) {
    return true;
  }
  return false;
}

function findPizza(array: IPizza[], action: PayloadAction<IPizza>) {
  const obj = array.find((obj) => {
    if (comparePizzas(obj, action.payload)) {
      return obj;
    }
  });
  return obj;
}

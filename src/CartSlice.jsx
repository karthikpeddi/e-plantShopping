import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // Payload is expected to contain at least: name, image, description, cost
      const incoming = action.payload;
      const name = typeof incoming === 'string' ? incoming : incoming?.name;
      if (!name) return;

      const existing = state.items.find((i) => i.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...incoming,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      const payload = action.payload;
      const name = typeof payload === 'string' ? payload : payload?.name;
      if (!name) return;
      state.items = state.items.filter((i) => i.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload || {};
      if (!name || typeof amount !== 'number') return;
      const item = state.items.find((i) => i.name === name);
      if (!item) return;
      item.quantity = amount;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

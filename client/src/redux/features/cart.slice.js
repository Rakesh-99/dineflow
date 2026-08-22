import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopId: null,
    shopName: "",
    items: []
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        // single-restaurant rule : adding from a new shop replaces the whole cart
        addToCart: (state, action) => {
            const { shopId, shopName, item } = action.payload;
            if (state.shopId && state.shopId !== shopId) {
                state.shopId = shopId;
                state.shopName = shopName;
                state.items = [{ ...item, quantity: 1 }];
                return;
            }
            state.shopId = shopId;
            state.shopName = shopName;
            const existing = state.items.find((i) => i.itemId === item.itemId);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },
        incrementItem: (state, action) => {
            const existing = state.items.find((i) => i.itemId === action.payload);
            if (existing) existing.quantity += 1;
        },
        decrementItem: (state, action) => {
            const existing = state.items.find((i) => i.itemId === action.payload);
            if (!existing) return;
            existing.quantity -= 1;
            if (existing.quantity < 1) {
                state.items = state.items.filter((i) => i.itemId !== action.payload);
                if (state.items.length === 0) {
                    state.shopId = null;
                    state.shopName = "";
                }
            }
        },
        clearCart: (state) => {
            state.shopId = null;
            state.shopName = "";
            state.items = [];
        }
    }
});

export const { addToCart, incrementItem, decrementItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

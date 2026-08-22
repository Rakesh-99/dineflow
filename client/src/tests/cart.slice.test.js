import { describe, it, expect } from 'vitest';
import cartSlice, { addToCart, incrementItem, decrementItem, clearCart } from '../redux/features/cart.slice';

const item = (itemId) => ({ itemId, name: 'Test Item', price: 100, image: '' });

describe('cart slice', () => {
    it('adds a new item with quantity 1', () => {
        const state = cartSlice(undefined, addToCart({ shopId: 's1', shopName: 'Shop', item: item('i1') }));
        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(1);
        expect(state.shopId).toBe('s1');
    });

    it('increments quantity for an existing item in the same shop', () => {
        let state = cartSlice(undefined, addToCart({ shopId: 's1', shopName: 'Shop', item: item('i1') }));
        state = cartSlice(state, incrementItem('i1'));
        expect(state.items[0].quantity).toBe(2);
    });

    it('replaces the cart when adding from a different shop', () => {
        let state = cartSlice(undefined, addToCart({ shopId: 's1', shopName: 'A', item: item('i1') }));
        state = cartSlice(state, incrementItem('i1'));
        state = cartSlice(state, addToCart({ shopId: 's2', shopName: 'B', item: item('i2') }));
        expect(state.shopId).toBe('s2');
        expect(state.items).toHaveLength(1);
        expect(state.items[0].itemId).toBe('i2');
    });

    it('decrements and removes the item at zero, clearing the shop when empty', () => {
        let state = cartSlice(undefined, addToCart({ shopId: 's1', shopName: 'Shop', item: item('i1') }));
        state = cartSlice(state, decrementItem('i1'));
        expect(state.items).toHaveLength(0);
        expect(state.shopId).toBeNull();
    });
});

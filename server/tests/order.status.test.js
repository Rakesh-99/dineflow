import { describe, it, expect } from 'vitest';
import orderModel from '../models/order.model.js';

describe('order status vocabulary', () => {
    it('exposes the full status list as a static', () => {
        expect(orderModel.STATUSES).toEqual(['placed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']);
    });

    it('allows only forward lifecycle transitions', () => {
        expect(orderModel.canTransition('placed', 'preparing')).toBe(true);
        expect(orderModel.canTransition('preparing', 'out_for_delivery')).toBe(true);
        expect(orderModel.canTransition('out_for_delivery', 'delivered')).toBe(true);
        expect(orderModel.canTransition('placed', 'cancelled')).toBe(true);
    });

    it('rejects illegal transitions', () => {
        expect(orderModel.canTransition('delivered', 'preparing')).toBe(false);
        expect(orderModel.canTransition('out_for_delivery', 'cancelled')).toBe(false);
        expect(orderModel.canTransition('cancelled', 'placed')).toBe(false);
        expect(orderModel.canTransition('placed', 'delivered')).toBe(false);
    });
});

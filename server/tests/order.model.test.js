import { describe, it, expect } from 'vitest';
import orderModel from '../models/order.model.js';

describe('order model', () => {
    it('registers the Order model', () => {
        expect(orderModel.modelName).toBe('Order');
    });

    it('defines the order status enum', () => {
        const statusPath = orderModel.schema.path('status');
        expect(statusPath.enumValues).toContain('placed');
        expect(statusPath.enumValues).toContain('delivered');
    });
});

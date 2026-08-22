import { describe, it, expect } from 'vitest';
import { STATUSES, STATUS_LABELS, legalNext } from '../constants/orderStatus';

describe('orderStatus module', () => {
    it('covers every status with a label', () => {
        for (const status of STATUSES) {
            expect(STATUS_LABELS[status]).toBeTruthy();
        }
    });

    it('offers only legal next statuses', () => {
        expect(legalNext('placed')).toEqual(['preparing', 'cancelled']);
        expect(legalNext('delivered')).toEqual([]);
        expect(legalNext('unknown')).toEqual([]);
    });
});

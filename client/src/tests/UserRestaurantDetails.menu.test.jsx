// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import axios from 'axios';
import UserRestaurantDetails from '../pages/UserRestaurantDetails';
import currentuserSlice from '../redux/features/currentUser.slice';
import themeSlice from '../redux/features/theme.slice';
import currentOwnerRestaurants from '../redux/features/currentOwnerRestaurants.slice';
import categorySlice from '../redux/features/categorySlice';
import cartSlice from '../redux/features/cart.slice';

vi.mock('axios');

const restaurant = {
    _id: 'shop-1',
    shopName: 'Blanco',
    description: 'Fine dining',
    budgetFriendly: true,
    image: { url: 'http://x/img.png' },
    address1: 'Road 1',
    city: 'Bhubaneswar'
};

function makeStore() {
    return configureStore({
        reducer: {
            currentuserSlice: currentuserSlice,
            themeSlice: themeSlice,
            currentOwnerRestaurants: currentOwnerRestaurants,
            categorySlice: categorySlice,
            cartSlice: cartSlice
        },
        preloadedState: {
            currentuserSlice: { userData: { fullname: 'C', role: 'user' }, userAddress: null },
            themeSlice: { theme: 'light' },
            currentOwnerRestaurants: { restaurants: [restaurant], userCityBasedRestaurants: [restaurant], loading: false },
            categorySlice: { categories: [] },
            cartSlice: { shopId: null, shopName: '', items: [] }
        }
    });
}

const menuResponse = {
    data: {
        success: true,
        message: 'ok',
        data: [
            { _id: 'i1', name: 'Chicken Pokoda', price: 180, image: { url: 'http://x/a.png' }, category: { categoryName: 'Starters' } },
            { _id: 'i2', name: 'Paneer Tikka', price: 199, image: { url: 'http://x/b.png' }, category: null }
        ]
    }
};

describe('UserRestaurantDetails menu', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue(menuResponse);
    });

    it('renders menu items returned by the API', async () => {
        render(
            <Provider store={makeStore()}>
                <MemoryRouter initialEntries={['/user-restaurant-details/blanco/shop-1']}>
                    <Routes>
                        <Route path="/user-restaurant-details/:restaurantName/:restaurantId" element={<UserRestaurantDetails />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(await screen.findByText('Menu')).toBeTruthy();

        await waitFor(() => {
            expect(screen.getByText('Chicken Pokoda')).toBeTruthy();
            expect(screen.getByText('Paneer Tikka')).toBeTruthy();
        });
    });
});


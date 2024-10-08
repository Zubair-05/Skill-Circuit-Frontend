import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Array of courses in the cart
    totalItems: 0, // Number of items in the cart
    totalPrice: 0, // Total price of all items in the cart
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        setCartData : (state, action) => {
            state.items = action.payload;
        },
        // Add course to the cart
        addToCart: (state, action) => {
            const course = action.payload;

            // Check if the course already exists in the cart
            const exists = state.items.find((item) => item.course.id === course.id);
            if (exists) {
                return;
            }

            // If not, add it to the cart items
            state.items.push({ course });
            state.totalItems += 1;
            state.totalPrice += course.price;
        },

        // Remove course from the cart
        removeFromCart: (state, action) => {
            const courseId = action.payload;

            const itemIndex = state.items.findIndex((item) => item.course.id === courseId);
            if (itemIndex !== -1) {
                const itemPrice = state.items[itemIndex].course.price;

                // Remove item and update totals
                state.items.splice(itemIndex, 1);
                state.totalItems -= 1;
                state.totalPrice -= itemPrice;
            }
        },

        // Clear all items from the cart
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },

        // Checkout the cart
        checkoutCart: (state) => {
            // You can add more logic here if required (e.g., calling an API)
            console.log('Checkout initiated');
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
    },
});

// Export actions for use in the component
export const {
    setCartData,
    addToCart,
    removeFromCart,
    clearCart,
    checkoutCart
} = cartSlice.actions;

export default cartSlice.reducer;

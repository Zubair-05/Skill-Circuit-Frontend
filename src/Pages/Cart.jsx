import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button }from '@/Components/ui/button.jsx';
import {Card} from '@/Components/ui/card.jsx'
import {getApiCall, postApiCall} from "@/utils/apiHelper.js";
import {setCartData, removeFromCart, clearCart, } from "@/store/features/cartSlice.js";

const Cart = () => {
    const dispatch = useDispatch();

    const items = useSelector((state) => state.cart.items); // Access cart state from Redux store
    const total = useSelector(state => state.cart.totalPrice)

    const fetchCart = async () => {
        try{
            const response = await getApiCall('/cart');
            dispatch(setCartData(response.data));
        } catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCart();
    }, [cart]);

    const handleRemove = async (courseId) => {
        try{
            const response = await postApiCall(`/cart/remove/${courseId}`);
            dispatch(removeFromCart(courseId));
        } catch (err){
            console.log(err);
        }

    };

    const handleClearCart =async () => {
        try{
            const response = await postApiCall(`/cart/clear`);
            dispatch(clearCart());
        } catch(err){
            console.log(err);
        }
        dispatch(clearCart());
    };

    // const handleCheckout = () => {
    //     dispatch(checkoutCart());
    //     alert('Checkout successful!');
    // };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
            <h2 className="text-xl mb-4">{items.length} Course(s) in Cart</h2>

            <div className="flex justify-between">
                <div className="w-3/5 space-y-6">
                    {items.map((item) => (
                        <Card key={item.course.id} className="flex p-4 items-center space-x-4">
                            <img
                                src={item.course.thumbnail}
                                alt={item.course.title}
                                className="w-32 h-20 rounded-md object-cover"
                            />
                            <div className="flex-grow">
                                <h3 className="text-lg font-medium">{item.course.title}</h3>
                                <p className="text-sm text-gray-500">By {item.course.teacher.name}</p>
                                <p className="text-lg text-indigo-600">₹{item.course.price}</p>
                                <div className="flex space-x-2 mt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRemove(item.course.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="w-2/5 p-6 border rounded-md shadow-sm">
                    <h3 className="text-2xl font-medium mb-4">Total: ₹{total}</h3>
                    <Button className="w-full bg-purple-600 text-white py-2" onClick={handleCheckout}>
                        Checkout
                    </Button>
                    <Button variant="outline" className="w-full mt-4 py-2" onClick={handleClearCart}>
                        Clear Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;

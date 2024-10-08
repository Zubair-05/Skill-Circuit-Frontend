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
            dispatch(setCartData(response?.data?.cart?.items));
        } catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

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

    const handleCheckout = () => {
        dispatch(checkoutCart());
        alert('Checkout successful!');
    };

    return (
        // <div className="container mx-auto p-6">
        //     <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
        //     <h2 className="text-xl mb-4">{items.length} Course(s) in Cart</h2>
        //
        //     <div className="flex justify-between">
        //         <div className="w-3/5 space-y-6">
        //             {items?.map((item) => (
        //                 <Card key={item.course.id} className="flex p-4 items-center space-x-4">
        //                     <img
        //                         src={item?.course?.thumbnail}
        //                         alt={item?.course?.title}
        //                         className="w-32 h-20 rounded-md object-cover"
        //                     />
        //                     <div className="flex-grow">
        //                         <h3 className="text-lg font-medium">{item.course.title}</h3>
        //                         <p className="text-sm text-gray-500">By {item?.course?.teacher?.name}</p>
        //                         <p className="text-lg text-indigo-600">₹{item.course.price}</p>
        //                         <div className="flex space-x-2 mt-2">
        //                             <Button
        //                                 variant="outline"
        //                                 size="sm"
        //                                 onClick={() => handleRemove(item.course.id)}
        //                             >
        //                                 Remove
        //                             </Button>
        //                         </div>
        //                     </div>
        //                 </Card>
        //             ))}
        //         </div>
        //
        //         <div className="w-2/5 p-6 border rounded-md shadow-sm">
        //             <h3 className="text-2xl font-medium mb-4">Total: ₹{total}</h3>
        //             <Button className="w-full bg-purple-600 text-white py-2" onClick={handleCheckout}>
        //                 Checkout
        //             </Button>
        //             <Button variant="outline" className="w-full mt-4 py-2" onClick={handleClearCart}>
        //                 Clear Cart
        //             </Button>
        //         </div>
        //     </div>
        // </div>
        // <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        //     <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Shopping Cart</h1>
        //     <h2 className="text-xl mb-6 text-gray-600">
        //         {items.length} {items.length === 1 ? "Course" : "Courses"} in Cart
        //     </h2>
        //
        //     <div className="flex flex-col sm:flex-row md:space-x-8 justify-between">
        //         {/* Left Section: Cart Items */}
        //         <div className="w-full sm:w-3/5 space-y-6">
        //             {items.length > 0 ? (
        //                 items.map((item) => (
        //                     <Card
        //                         key={item.course.id}
        //                         className="flex flex-col lg:flex-row p-4 items-center lg:items-start space-x-0 lg:space-x-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        //                     >
        //                         {/* Course Thumbnail */}
        //                         <img
        //                             src={item?.course?.thumbnail}
        //                             alt={item?.course?.title}
        //                             className="w-full lg:w-48 h-28 rounded-md object-cover mb-4 lg:mb-0"
        //                         />
        //
        //                         {/* Course Details */}
        //                         <div className="flex-grow flex flex-col justify-between">
        //                             <div>
        //                                 <h3 className="text-lg font-semibold text-gray-800">{item.course.title}</h3>
        //                                 <p className="text-sm text-gray-500 mt-1">By {item?.course?.teacher?.name}</p>
        //                                 <p className="text-lg text-indigo-600 mt-2">₹{item.course.price}</p>
        //                             </div>
        //                             <div className="flex space-x-2 mt-4 lg:mt-0">
        //                                 <Button
        //                                     variant="outline"
        //                                     size="sm"
        //                                     className="bg-red-50 text-red-600 hover:bg-red-100 border-red-300"
        //                                     onClick={() => handleRemove(item.course.id)}
        //                                 >
        //                                     Remove
        //                                 </Button>
        //                             </div>
        //                         </div>
        //                     </Card>
        //                 ))
        //             ) : (
        //                 <p className="text-gray-500 text-center py-10">Your cart is empty. Add some courses to get started!</p>
        //             )}
        //         </div>
        //
        //         {/* Right Section: Cart Summary */}
        //         <div className="w-full sm:w-2/5 p-6 border rounded-md shadow-lg bg-white sticky top-4">
        //             <h3 className="text-3xl font-semibold mb-4 text-gray-700">Order Summary</h3>
        //             <div className="text-lg text-gray-500 mb-6">
        //                 <span>Total Items:</span> <span className="font-semibold">{items.length}</span>
        //             </div>
        //             <div className="text-2xl font-bold text-indigo-600 mb-8">Total: ₹{total}</div>
        //
        //             {/* Checkout and Clear Cart Buttons */}
        //             <Button
        //                 className="w-full bg-purple-600 text-white py-3 rounded-lg mb-4 hover:bg-purple-700 transition duration-200"
        //                 onClick={handleCheckout}
        //             >
        //                 Checkout
        //             </Button>
        //             <Button
        //                 variant="outline"
        //                 className="w-full py-3 border-red-300 text-red-600 hover:bg-red-50 transition duration-200"
        //                 onClick={handleClearCart}
        //             >
        //                 Clear Cart
        //             </Button>
        //         </div>
        //     </div>
        // </div>
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Shopping Cart</h1>
            <h2 className="text-xl mb-6 text-gray-600">
                {items.length} {items.length === 1 ? "Course" : "Courses"} in Cart
            </h2>

            <div className="flex flex-col lg:flex-row lg:space-x-8 justify-between">
                {/* Left Section: Cart Items */}
                <div className="w-full lg:w-3/5 space-y-6">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <Card
                                key={item.course.id}
                                className="flex flex-col lg:flex-row p-4 items-center lg:items-start space-x-0 lg:space-x-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Course Thumbnail */}
                                <img
                                    src={item?.course?.thumbnail}
                                    alt={item?.course?.title}
                                    className="w-full lg:w-48 h-28 rounded-md object-cover mb-4 lg:mb-0"
                                />

                                {/* Course Details */}
                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{item.course.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">By {item?.course?.teacher?.name}</p>
                                        <p className="text-lg text-indigo-600 mt-2">₹{item.course.price}</p>
                                    </div>
                                    <div className="flex space-x-2 mt-4 lg:mt-0">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="bg-red-50 text-red-600 hover:bg-red-100 border-red-300"
                                            onClick={() => handleRemove(item.course.id)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-10">Your cart is empty. Add some courses to get
                            started!</p>
                    )}
                </div>

                {/* Right Section: Order Summary */}
                <div className="w-full lg:w-2/5 p-6 border rounded-md shadow-lg bg-white self-start">
                    <h3 className="text-3xl font-semibold mb-4 text-gray-700">Order Summary</h3>
                    <div className="text-lg text-gray-500 mb-6">
                        <span>Total Items:</span> <span className="font-semibold">{items.length}</span>
                    </div>
                    <div className="text-2xl font-bold text-indigo-600 mb-8">Total: ₹{total}</div>

                    {/* Checkout and Clear Cart Buttons */}
                    <Button
                        className="w-full bg-purple-600 text-white py-3 rounded-lg mb-4 hover:bg-purple-700 transition duration-200"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full py-3 border-red-300 text-red-600 hover:bg-red-50 transition duration-200"
                        onClick={handleClearCart}
                    >
                        Clear Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;

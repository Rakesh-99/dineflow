import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IndianRupee, Loader, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { clearCart, decrementItem, incrementItem } from "@/redux/features/cart.slice";

const ORDER_URL = import.meta.env.VITE_BACKEND_ORDER_API_URL;

const Cart = () => {
    const { theme } = useSelector((state) => state.themeSlice);
    const isDark = theme === "dark";
    const cart = useSelector((state) => state.cartSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [placing, setPlacing] = useState(false);

    const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const placeOrderHandler = async () => {
        if (!cart.shopId || cart.items.length === 0) return;
        try {
            setPlacing(true);
            const { data } = await axios.post(`${ORDER_URL}/place-order`, {
                shopId: cart.shopId,
                items: cart.items.map((i) => ({ itemId: i.itemId, quantity: i.quantity }))
            }, { withCredentials: true });
            if (data.success) {
                toast.success(data.message || "Order has been placed");
                dispatch(clearCart());
                navigate("/customer-orders");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Could not place the order!");
            console.log(error);
        } finally {
            setPlacing(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 px-4">
            <h1 className="text-2xl font-semibold mb-1">Your Cart</h1>
            {cart.shopName && <p className={`text-xs mb-6 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Ordering from <span className="font-medium text-customOrange">{cart.shopName}</span></p>}

            {!cart.shopId || cart.items.length === 0 ? (
                <div className={`flex flex-col items-center gap-3 mt-16 border rounded-xl p-10 ${isDark ? "border-zinc-700 text-zinc-400" : "border-zinc-100 text-zinc-500"}`}>
                    <ShoppingCart className="size-10" />
                    <p className="text-sm">Your cart is empty.</p>
                    <Button onClick={() => navigate(-1)} className="bg-customOrange rounded text-xs">Browse restaurants</Button>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-3">
                        {cart.items.map((item) => (
                            <div key={item.itemId}
                                className={`flex items-center justify-between gap-3 border rounded-lg p-3 ${isDark ? "border-zinc-700" : "border-zinc-100"}`}>
                                <div className="flex items-center gap-3 min-w-0">
                                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate">{item.name}</p>
                                        <p className={`text-xs flex items-center ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                                            <IndianRupee className="size-3" /> {item.price} × {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Button variant="outline" size="icon" onClick={() => dispatch(decrementItem(item.itemId))}
                                        className={`rounded-full h-7 w-7 ${isDark ? "border-zinc-600" : ""}`}><Minus className="size-3.5" /></Button>
                                    <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                                    <Button variant="outline" size="icon" onClick={() => dispatch(incrementItem(item.itemId))}
                                        className={`rounded-full h-7 w-7 ${isDark ? "border-zinc-600" : ""}`}><Plus className="size-3.5" /></Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`mt-6 flex items-center justify-between border rounded-lg p-4 ${isDark ? "border-zinc-700" : "border-zinc-100"}`}>
                        <span className="text-sm">Total</span>
                        <span className="text-lg font-semibold flex items-center"><IndianRupee className="size-4" /> {total}</span>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button disabled={placing} onClick={placeOrderHandler}
                            className="bg-customOrange rounded py-4 px-6 gap-2">
                            {placing ? (<><Loader className="animate-spin size-4" /> Placing order...</>) : "Place Order"}
                        </Button>
                    </div>

                    <div className="mt-3 flex justify-end">
                        <Button variant="ghost" onClick={() => dispatch(clearCart())}
                            className="text-xs text-red-400 gap-1"><Trash2 className="size-3.5" /> Clear cart</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;

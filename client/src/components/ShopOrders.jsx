import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { IndianRupee } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const ORDER_URL = import.meta.env.VITE_BACKEND_ORDER_API_URL;
const STATUSES = ["placed", "preparing", "out_for_delivery", "delivered", "cancelled"];

const STATUS_LABELS = {
    placed: "Placed",
    preparing: "Preparing",
    out_for_delivery: "Out for delivery",
    delivered: "Delivered",
    cancelled: "Cancelled"
};

const ShopOrders = () => {
    const { theme } = useSelector((state) => state.themeSlice);
    const isDark = theme === "dark";
    const [orders, setOrders] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        (async function fetchShopOrders() {
            try {
                const { data } = await axios.get(`${ORDER_URL}/shop-orders`, { withCredentials: true });
                if (data.success) setOrders(data.data);
            } catch (error) {
                setOrders([]);
                console.log(`Could not load shop orders ${error}`);
            }
        })();
    }, []);

    const statusChangeHandler = async (orderId, status) => {
        try {
            setUpdatingId(orderId);
            const { data } = await axios.patch(`${ORDER_URL}/${orderId}/status`, { status }, { withCredentials: true });
            if (data.success) {
                setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Could not update the order status!");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className={`mt-10 p-5 rounded-xl border ${isDark ? "border-zinc-700" : "border-zinc-100"}`}>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-medium">Incoming Orders</h2>
                    <p className="text-xs text-gray-400">Orders placed by customers in your restaurants</p>
                </div>
            </div>

            {orders === null ? (
                <p className="text-xs text-gray-400 mt-6">Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="text-xs text-gray-400 mt-6">No orders yet.</p>
            ) : (
                <div className="flex flex-col gap-3 mt-6">
                    {orders.map((order) => (
                        <div key={order._id} className={`border rounded-lg p-4 flex flex-col gap-3 ${isDark ? "border-zinc-700" : "border-zinc-100"}`}>
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                <div>
                                    <p className="text-sm font-medium">{order.customer?.fullname}</p>
                                    <p className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                                        {order.customer?.contact} • {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <Select value={order.status} onValueChange={(value) => statusChangeHandler(order._id, value)} disabled={updatingId === order._id}>
                                    <SelectTrigger className="w-44 text-xs"><SelectValue /></SelectTrigger>
                                    <SelectContent className={isDark ? "bg-zinc-800 text-zinc-200" : ""}>
                                        <SelectGroup>
                                            <SelectLabel className="text-xs">Update status</SelectLabel>
                                            {STATUSES.map((s) => (
                                                <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-1">
                                {order.items.map((i) => (
                                    <div key={i._id} className={`flex justify-between text-xs ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
                                        <span>{i.name} × {i.quantity}</span>
                                        <span className="flex items-center"><IndianRupee className="size-3" />{i.price * i.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={`mt-1 pt-2 flex justify-end items-center gap-1 border-t text-sm font-semibold ${isDark ? "border-zinc-700" : "border-zinc-100"}`}>
                                Total : <IndianRupee className="size-3.5" />{order.totalAmount}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopOrders;

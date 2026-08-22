import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { IndianRupee, PackageOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ORDER_URL = import.meta.env.VITE_BACKEND_ORDER_API_URL;

const STATUS_STYLES = {
    placed: "bg-blue-100 text-blue-800",
    preparing: "bg-amber-100 text-amber-800",
    out_for_delivery: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
};

const STATUS_LABELS = {
    placed: "Placed",
    preparing: "Preparing",
    out_for_delivery: "Out for delivery",
    delivered: "Delivered",
    cancelled: "Cancelled"
};

const CustomerOrders = () => {
    const { theme } = useSelector((state) => state.themeSlice);
    const isDark = theme === "dark";
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        (async function fetchOrders() {
            try {
                const { data } = await axios.get(`${ORDER_URL}/my-orders`, { withCredentials: true });
                if (data.success) setOrders(data.data);
            } catch (error) {
                setOrders([]);
                console.log(`Could not load orders ${error}`);
            }
        })();
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-8 px-4">
            <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

            {orders === null ? (
                <p className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Loading orders...</p>
            ) : orders.length === 0 ? (
                <div className={`flex flex-col items-center gap-3 mt-16 border rounded-xl p-10 ${isDark ? "border-zinc-700 text-zinc-400" : "border-zinc-100 text-zinc-500"}`}>
                    <PackageOpen className="size-10" />
                    <p className="text-sm">No orders yet.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                        <div key={order._id}
                            className={`border rounded-xl p-4 ${isDark ? "border-zinc-700" : "border-zinc-100"}`}>
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="text-sm font-medium">{order.shop?.shopName}</p>
                                    <p className={`text-[11px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <Badge variant="outline" className={`${STATUS_STYLES[order.status]} border-0`}>
                                    {STATUS_LABELS[order.status] || order.status}
                                </Badge>
                            </div>

                            <div className="flex flex-col gap-1">
                                {order.items.map((i) => (
                                    <div key={i._id} className={`flex justify-between text-xs ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
                                        <span>{i.name} × {i.quantity}</span>
                                        <span className="flex items-center"><IndianRupee className="size-3" />{i.price * i.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={`mt-3 pt-3 flex justify-end items-center gap-1 border-t text-sm font-semibold ${isDark ? "border-zinc-700" : "border-zinc-100"}`}>
                                Total : <IndianRupee className="size-3.5" />{order.totalAmount}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomerOrders;

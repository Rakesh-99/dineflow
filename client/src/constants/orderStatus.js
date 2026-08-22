export const STATUSES = ["placed", "preparing", "out_for_delivery", "delivered", "cancelled"];

export const TRANSITIONS = {
    placed: ["preparing", "cancelled"],
    preparing: ["out_for_delivery", "cancelled"],
    out_for_delivery: ["delivered"],
    delivered: [],
    cancelled: []
};

export const STATUS_LABELS = {
    placed: "Placed",
    preparing: "Preparing",
    out_for_delivery: "Out for delivery",
    delivered: "Delivered",
    cancelled: "Cancelled"
};

export const STATUS_STYLES = {
    placed: "bg-blue-100 text-blue-800",
    preparing: "bg-amber-100 text-amber-800",
    out_for_delivery: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
};

export function legalNext(status) {
    return TRANSITIONS[status] || [];
}

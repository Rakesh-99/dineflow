import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/ErrorHandler.js";
import orderModel from "../models/order.model.js";
import shopModel from "../models/shop.model.js";
import itemModel from "../models/item.model.js";
import mongoose from "mongoose";


// status vocabulary lives on the Order schema as statics (single source of truth) :


// place order (customer) : prices are always re-read from DB, client totals are never trusted :
export const placeOrder = expressAsyncHandler(async(req, res, next) => {

    const {shopId, items} = req.body;
    const userId = req.userId;

    if(!shopId || !Array.isArray(items) || items.length < 1){
        return next(new ErrorHandler(400, 'Shop and items are required!'));
    }

    if(!mongoose.Types.ObjectId.isValid(shopId)){
        return next(new ErrorHandler(400, 'Invalid restaurant id!'));
    }

    for(const entry of items){
        if(!mongoose.Types.ObjectId.isValid(entry.itemId) || !Number.isInteger(entry.quantity) || entry.quantity < 1 || entry.quantity > 50){
            return next(new ErrorHandler(400, 'Invalid item or quantity!'));
        }
    }

    const shop = await shopModel.findOne({_id : shopId, status : true});
    if(!shop){
        return next(new ErrorHandler(404, 'Restaurant not found or currently inactive!'));
    }

    const itemIds = items.map((entry) => entry.itemId);
    const dbItems = await itemModel.find({_id : {$in : itemIds}, shop : shopId, status : true});

    if(dbItems.length !== items.length){
        return next(new ErrorHandler(400, 'Some items are unavailable in this restaurant!'));
    }

    let totalAmount = 0;
    const orderItems = items.map((entry) => {
        const dbItem = dbItems.find((d) => d._id.toString() === entry.itemId);
        totalAmount += dbItem.price * entry.quantity;
        return {
            item : dbItem._id,
            name : dbItem.name,
            price : dbItem.price,
            quantity : entry.quantity
        };
    });

    const order = await orderModel.create({
        customer : userId,
        shop : shopId,
        items : orderItems,
        totalAmount,
        status : 'placed'
    });

    return res.status(201).json({
        success : true,
        message : 'Order has been placed',
        data : order
    });
});


// customer's own orders :
export const myOrders = expressAsyncHandler(async(req, res, next) => {

    const userId = req.userId;

    const orders = await orderModel.find({customer : userId})
        .sort({createdAt : -1})
        .populate({path : 'shop', select : 'shopName image city'});

    if(orders.length < 1){
        return next(new ErrorHandler(404, 'No orders found!'));
    }

    return res.status(200).json({
        success : true,
        message : 'Orders have been fetched',
        data : orders
    });
});


// incoming orders for owner's shops :
export const shopOrders = expressAsyncHandler(async(req, res, next) => {

    const userId = req.userId;

    const shops = await shopModel.find({owner : userId}).select('_id');
    const shopIds = shops.map((s) => s._id);

    if(shopIds.length < 1){
        return next(new ErrorHandler(404, 'No restaurant found!'));
    }

    const orders = await orderModel.find({shop : {$in : shopIds}})
        .sort({createdAt : -1})
        .populate({path : 'customer', select : '-password -otp -otpExpiration'})
        .populate('shop', 'shopName');

    if(orders.length < 1){
        return next(new ErrorHandler(404, 'No orders yet!'));
    }

    return res.status(200).json({
        success : true,
        message : 'Shop orders have been fetched',
        data : orders
    });
});


// owner updates status of an order belonging to their shop :
export const updateOrderStatus = expressAsyncHandler(async(req, res, next) => {

    const {orderId} = req.params;
    const {status} = req.body;
    const userId = req.userId;

    if(!mongoose.Types.ObjectId.isValid(orderId)){
        return next(new ErrorHandler(400, 'Invalid order id!'));
    }

    if(!orderModel.STATUSES.includes(status)){
        return next(new ErrorHandler(400, 'Invalid status!'));
    }

    const order = await orderModel.findById(orderId).populate('shop', 'owner');
    if(!order){
        return next(new ErrorHandler(404, 'Order not found!'));
    }

    if(order.shop.owner.toString() !== userId){
        return next(new ErrorHandler(403, 'You are not authorized to update this order!'));
    }

    if(!orderModel.canTransition(order.status, status)){
        return next(new ErrorHandler(400, `Cannot change status from ${order.status} to ${status}!`));
    }

    // guarded update : fails when another request changed the status after our read (race-safe)
    const updatedOrder = await orderModel.findOneAndUpdate(
        {_id : orderId, status : order.status},
        {$set : {status}},
        {new : true}
    );

    if(!updatedOrder){
        return next(new ErrorHandler(409, 'Order status was just changed by someone else, please refresh!'));
    }

    return res.status(200).json({
        success : true,
        message : `Order status updated to ${status}`,
        data : updatedOrder
    });
});

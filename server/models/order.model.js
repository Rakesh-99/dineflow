import mongoose, { Schema } from "mongoose";



const orderSchema = new mongoose.Schema({

    customer : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : [true, 'Customer is required!']
    },
    shop : {
        type : Schema.Types.ObjectId,
        ref : 'Shop',
        required : [true, 'Shop is required!']
    },
    items : [{
        item : {
            type : Schema.Types.ObjectId,
            ref : 'Item',
            required : true
        },
        name : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true,
            min : 0
        },
        quantity : {
            type : Number,
            required : true,
            min : 1
        }
    }],
    totalAmount : {
        type : Number,
        required : true,
        min : 0
    },
    status : {
        type : String,
        enum : ['placed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
        default : 'placed',
        required : true
    }
}, {timestamps : true});


orderSchema.index({customer : 1, createdAt : -1});
orderSchema.index({shop : 1, createdAt : -1});

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;

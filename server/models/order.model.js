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

// single source of truth for the status lifecycle :
orderSchema.statics.STATUSES = ['placed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
orderSchema.statics.TRANSITIONS = {
    placed : ['preparing', 'cancelled'],
    preparing : ['out_for_delivery', 'cancelled'],
    out_for_delivery : ['delivered'],
    delivered : [],
    cancelled : []
};
orderSchema.statics.canTransition = function(from, to) {
    return (this.TRANSITIONS[from] || []).includes(to);
};

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;

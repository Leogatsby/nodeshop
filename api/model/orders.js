const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    product : {
         type: mongoose.Schema.Types.ObjectId,  //필
         ref:"products",
         required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("orders", orderSchema);
const mongoose = require("mongoose"),
    uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
    {
        id_product: {
            required: true,
            type: String,
        },
        category: {
            type: String,
        },
        barcode: {
            type: Number,
            required: true,
            index: true,
        },
        name: {
            required: true,
            type: String,
        },
        cost: {
            required: true,
            type: Number,
        },
        profit: {
            required: true,
            type: Number,
        },
        balance: {
            required: true,
            type: Number,
        },
    },
    { timestamps: true }
);

// Apply the uniqueValidator plugin to userSchema.
schema.plugin(uniqueValidator, { status: 400 });

// Custom JSON Response
schema.methods.toJSON = function () {
    return {
        id: this._id,
        category: this.category,
        barcode: this.barcode,
        name: this.name,
        cost: this.cost,
        profit: this.profit,
        balance: this.balance,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};

// Custom field before save
schema.pre("save", function (next) {
    next();
});

module.exports = mongoose.model("Post", schema);

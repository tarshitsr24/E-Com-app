const mongoose =require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "placed",
    },
    deliveredAt: { type: Date },
    returnRequested: { type: Boolean, default: false },
  },
  { _id: true },
);

const shippingAddressSnapshotSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: [orderItemSchema],
    shippingAddress: { type: shippingAddressSnapshotSchema, required: true },
    amount: {
      itemsTotal: { type: Number, required: true },
      shipping: { type: Number, required: true, default: 0 },
      total: { type: Number, required: true },
    },
    payment: {
      method: { type: String, enum: ["cod", "razorpay"], required: true },
      status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
      razorpayOrderId: { type: String },
      razorpayPaymentId: { type: String },
      razorpaySignature: { type: String },
      paidAt: { type: Date },
    },
    orderStatus: {
      type: String,
      enum: ["pending_payment", "confirmed", "completed", "cancelled"],
      default: "confirmed",
      index: true,
    },
    placedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports=mongoose.model("Order", orderSchema);

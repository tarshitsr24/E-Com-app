const Joi =require('joi');

const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required();

export const placeOrderSchema = Joi.object({
  shippingAddress: Joi.object({
    fullName: Joi.string().trim().max(60).required(),
    phone: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    line1: Joi.string().trim().max(120).required(),
    line2: Joi.string().trim().max(120).allow('', null).optional(),
    city: Joi.string().trim().max(50).required(),
    state: Joi.string().trim().max(50).required(),
    pincode: Joi.string().pattern(/^\d{6}$/).required()
  }).required(),
  paymentMethod: Joi.string().valid('cod', 'razorpay').required()
});

export const createReturnRequestSchema = Joi.object({
  orderId: objectId,
  orderItemId: objectId,
  reason: Joi.string().trim().min(10).max(500).required()
});
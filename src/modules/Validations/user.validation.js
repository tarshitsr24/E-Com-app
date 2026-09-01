const Joi =require('joi') ;

const addressValidationSchema = Joi.object({
  label: Joi.string().trim().max(30).optional(),
  fullName: Joi.string().trim().max(60).required(),
  phone: Joi.string().pattern(/^[6-9]\d{9}$/).required().messages({
    'string.pattern.base': 'Phone number must be a valid 10-digit Indian mobile number.'
  }),
  line1: Joi.string().trim().max(120).required(),
  line2: Joi.string().trim().max(120).allow('', null).optional(),
  city: Joi.string().trim().max(50).required(),
  state: Joi.string().trim().max(50).required(),
  pincode: Joi.string().pattern(/^\d{6}$/).required().messages({
    'string.pattern.base': 'Pincode must be a valid 6-digit postal code.'
  }),
  isDefault: Joi.boolean().default(false)
});

 const registerUserSchema = Joi.object({
  name: Joi.string().trim().max(60).required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(6).max(30).required(),
  phone: Joi.string().pattern(/^[6-9]\d{9}$/).optional(),
  role: Joi.string().valid('user', 'seller').default('user'),
  shopName: Joi.when('role', {
    is: 'seller',
    then: Joi.string().trim().max(100).required(),
    otherwise: Joi.forbidden()
  })
});

 const loginUserSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required()
});

// export const addAddressSchema = addressValidationSchema;

module.exports={ 
  addressValidationSchema ,
  registerUserSchema ,
  loginUserSchema
}
const Joi =require('joi') ;

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const objectId = Joi.string().pattern(objectIdPattern).messages({
  'string.pattern.base': 'Invalid ObjectId format.'
});

 const createProductSchema = Joi.object({
  title: Joi.string().trim().max(140).required(),
  description: Joi.string().max(4000).allow('', null).optional(),
  price: Joi.number().min(1).required(),
  mrp: Joi.number().min(1).greater(Joi.ref('price')).required().messages({
    'number.greater': 'MRP must be strictly greater than selling price.'
  }),
  category: objectId.required(),
  subCategory: objectId.optional(),
  brand: objectId.optional(),
  stockQty: Joi.number().integer().min(0).default(0),
  tags: Joi.array().items(Joi.string().valid('trending', 'top-selling', 'new')).optional()
});

 const updateProductSchema = Joi.object({
  title: Joi.string().trim().max(140),
  description: Joi.string().max(4000).allow('', null),
  price: Joi.number().min(1),
  mrp: Joi.number().min(1),
  category: objectId,
  subCategory: objectId,
  brand: objectId,
  stockQty: Joi.number().integer().min(0),
  tags: Joi.array().items(Joi.string().valid('trending', 'top-selling', 'new')),
  isActive: Joi.boolean()
}).min(1);

module.exports  = { createProductSchema , updateProductSchema}; 
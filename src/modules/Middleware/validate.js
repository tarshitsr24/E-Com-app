const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    next();
  };
};

module.exports = validate ;

// module.exports = validate;

// import { ApiError } from "../utils/ApiError.js";

// const validate = (schema) => (req, res, next) => {
//   const { error, value } = schema.validate(req.body, {
//     abortEarly: false, // Return all errors, not just the first one
//     stripUnknown: true, // Remove fields not defined in schema
//   });

//   if (error) {
//     const errorDetails = error.details.map((detail) => ({
//       field: detail.path.join("."),
//       message: detail.message.replace(/['"]/g, ""),
//     }));
//     return next(new ApiError(400, "Validation Error", errorDetails));
//   }

//   req.body = value;
//   next();
// };

// module.exports = validate;

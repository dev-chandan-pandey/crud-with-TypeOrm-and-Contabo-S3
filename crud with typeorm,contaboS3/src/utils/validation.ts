// import Joi from 'joi';

// export const userSchema = Joi.object({
//   name: Joi.string().required().messages({
//     "any.required": `"name" is required`,
//     "string.empty": `"name" cannot be empty`,
//   }),
//   email: Joi.string().email().required().messages({
//     "any.required": `"email" is required`,
//     "string.empty": `"email" cannot be empty`,
//     "string.email": `"email" must be a valid email`,
//   })
// });

import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`,
    "string.email": `"email" must be a valid email`,
  })
});
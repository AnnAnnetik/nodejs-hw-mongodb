import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(true).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().optional(true),
  age: Joi.number().integer().min(6).max(16).required(),
  phoneNumber: Joi.number().min(8).max(20).required(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .required(true)
    .valid('personal', 'work', 'home')
    .default('personal'),
});
// const validationResult = createContactSchema.validate(userData, {
//   abortEarly: false,
// });
export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(true).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().optional(true),
  age: Joi.number().integer().min(6).max(16),
  phoneNumber: Joi.number().min(8).max(20),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('personal', 'work', 'home')
    .default('personal'),
});

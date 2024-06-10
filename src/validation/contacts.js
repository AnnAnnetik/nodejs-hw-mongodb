import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(true).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().optional(true),
  phoneNumber: Joi.string().min(8).required(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .required(true)
    .valid('personal', 'work', 'home')
    .optional()
    .default('personal'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(true).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().optional(true),

  phoneNumber: Joi.string().min(8),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('personal', 'work', 'home')
    .default('personal'),
});

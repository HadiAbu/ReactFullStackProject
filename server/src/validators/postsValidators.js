import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(300).required(),
  content: Joi.string().min(1).required(),
  author: Joi.string().allow(null, "").max(200),
  tags: Joi.array().items(Joi.string()).default([]),
  published: Joi.boolean().default(false),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(300),
  content: Joi.string().min(1),
  author: Joi.string().allow(null, "").max(200),
  tags: Joi.array().items(Joi.string()),
  published: Joi.boolean(),
}).min(1);

export const listPostsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  published: Joi.boolean(),
});

import express from "express";
import * as controller from "../controllers/postsController.js";
import validate from "../middleware/validate.js";
import {
  createPostSchema,
  updatePostSchema,
  listPostsSchema,
} from "../validators/postsValidators.js";

const router = express.Router();

// Create
router.post("/", validate(createPostSchema), controller.createPost);

// Read list with pagination & filters
// router.get("/", validate(listPostsSchema, "query"), controller.getAllPosts);
router.get("/", controller.getAllPosts);

// Read single
router.get("/:id", controller.getPostById);

// Update partial
router.patch("/:id", validate(updatePostSchema), controller.updatePost);

// Replace
router.put("/:id", validate(createPostSchema), controller.replacePost);

// Delete
router.delete("/:id", controller.deletePost);

export default router;

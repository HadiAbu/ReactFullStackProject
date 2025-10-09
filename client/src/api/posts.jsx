import { api } from "./client";

// Get all posts
export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    console.log("HHHEEEEERRRRREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Create a new post
export const createPost = async (postData) => {
  try {
    const response = await api.post("/posts", postData);
    console.log("HHHEEEEERRRRREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

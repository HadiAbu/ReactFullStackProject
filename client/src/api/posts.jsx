import { api } from "./client";

export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const createPost = async (data) => {
  const res = await api.post("/posts", data);
  return res.data;
};

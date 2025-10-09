import { supabase } from "../supabaseClient.js";

// Utility: map Supabase row to response object
function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    author: row.author,
    tags: row.tags,
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ───────────────────────────────────────────────
// GET /api/posts
export const getAllPosts = async (req, res) => {
  console.log("TaCOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
  try {
    const { data, error } = await supabase.from("POST").select("*"); // match your table
    if (error) throw error;

    console.log("Fetched posts:", data); // debug
    res.json(data); // <-- MUST respond
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/posts/:id
export async function getPostById(req, res, next) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("POST")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "Post not found" });
      }
      throw error;
    }

    res.json(mapRow(data));
  } catch (err) {
    next(err);
  }
}

// POST /api/posts
export async function createPost(req, res, next) {
  try {
    const {
      title,
      content,
      author = null,
      tags = [],
      published = false,
    } = req.body;

    const { data, error } = await supabase
      .from("POST")
      .insert([{ title, content, author, tags, published }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(mapRow(data));
  } catch (err) {
    next(err);
  }
}

// PATCH /api/posts/:id
export async function updatePost(req, res, next) {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updated_at: new Date().toISOString() };

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const { data, error } = await supabase
      .from("POST")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "Post not found" });
      }
      throw error;
    }

    res.json(mapRow(data));
  } catch (err) {
    next(err);
  }
}

// PUT /api/posts/:id
export async function replacePost(req, res, next) {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      author = null,
      tags = [],
      published = false,
    } = req.body;

    const { data, error } = await supabase
      .from("POST")
      .update({
        title,
        content,
        author,
        tags,
        published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "Post not found" });
      }
      throw error;
    }

    res.json(mapRow(data));
  } catch (err) {
    next(err);
  }
}

// DELETE /api/posts/:id
export async function deletePost(req, res, next) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("POST")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "Post not found" });
      }
      throw error;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

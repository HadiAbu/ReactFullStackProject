import { query } from "../db/index.js";

// Utility: map DB row to response object (optional, can adjust)
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
export async function getAllPosts(req, res, next) {
  try {
    const { rows } = await query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.json(rows.map(mapRow));
  } catch (err) {
    next(err);
  }
}

// GET /api/posts/:id
export async function getPostById(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await query("SELECT * FROM posts WHERE id = $1", [id]);
    if (!rows[0]) return res.status(404).json({ error: "Post not found" });
    res.json(mapRow(rows[0]));
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
    const sql = `
      INSERT INTO posts (title, content, author, tags, published)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const { rows } = await query(sql, [
      title,
      content,
      author,
      tags,
      published,
    ]);
    res.status(201).json(mapRow(rows[0]));
  } catch (err) {
    next(err);
  }
}

// PATCH /api/posts/:id
export async function updatePost(req, res, next) {
  try {
    const { id } = req.params;
    const fields = [];
    const params = [];
    let idx = 1;

    for (const [key, value] of Object.entries(req.body)) {
      fields.push(`${key} = $${idx++}`);
      params.push(value);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    fields.push(`updated_at = now()`);

    const sql = `
      UPDATE posts
      SET ${fields.join(", ")}
      WHERE id = $${idx}
      RETURNING *;
    `;

    params.push(id);
    const { rows } = await query(sql, params);

    if (!rows[0]) return res.status(404).json({ error: "Post not found" });
    res.json(mapRow(rows[0]));
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

    const sql = `
      UPDATE posts
      SET title=$1, content=$2, author=$3, tags=$4, published=$5, updated_at=now()
      WHERE id=$6
      RETURNING *;
    `;
    const { rows } = await query(sql, [
      title,
      content,
      author,
      tags,
      published,
      id,
    ]);

    if (!rows[0]) return res.status(404).json({ error: "Post not found" });
    res.json(mapRow(rows[0]));
  } catch (err) {
    next(err);
  }
}

// DELETE /api/posts/:id
export async function deletePost(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );

    if (!rows[0]) return res.status(404).json({ error: "Post not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

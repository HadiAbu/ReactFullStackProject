import { query } from "../db/index.js";
try {
  const { id } = req.params;
  const fields = [];
  const params = [];
  let idx = 1;

  for (const [k, v] of Object.entries(req.body)) {
    fields.push(`${k} = $${idx++}`);
    params.push(v);
  }

  if (fields.length === 0)
    return res.status(400).json({ error: "No fields to update" });

  // updated_at field
  fields.push(`updated_at = now()`);

  const sql = `UPDATE posts SET ${fields.join(
    ", "
  )} WHERE id = $${idx} RETURNING *`;
  params.push(id);

  const { rows } = await query(sql, params);
  if (!rows[0]) return res.status(404).json({ error: "Post not found" });
  res.json(mapRow(rows[0]));
} catch (err) {
  next(err);
}

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

    const sql = `UPDATE posts SET title=$1, content=$2, author=$3, tags=$4, published=$5, updated_at=now() WHERE id=$6 RETURNING *`;
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

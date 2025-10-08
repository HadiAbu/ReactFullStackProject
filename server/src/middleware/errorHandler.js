export default function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // hide stack in production
  const body = { error: message };
  if (process.env.NODE_ENV !== "production") body.stack = err.stack;
  res.status(status).json(body);
}

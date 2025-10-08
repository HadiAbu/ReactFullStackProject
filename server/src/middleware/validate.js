// Simple Joi-based validator middleware
export default function validate(schema, property = "body") {
  return (req, res, next) => {
    if (!schema) return next();
    const { error, value } = schema.validate(req[property], {
      stripUnknown: true,
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({
          error: "Validation failed",
          details: error.details.map((d) => d.message),
        });
    }
    // replace with validated / sanitized value
    if (property === "body") req.body = value;
    else if (property === "query") req.query = value;
    next();
  };
}

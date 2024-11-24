export function isValidApiKeyMiddleware(req, res, next) {
  const apiKey = req.headers["api-key"];
  if (!apiKey || apiKey !== "12345") {
    return res.status(403).json({ message: "Unauthorized", data: null });
  }
  next()
}

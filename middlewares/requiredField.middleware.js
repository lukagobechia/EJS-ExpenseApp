export function requiredField(req, res, next) {
  const { category, price, paymentMethod } = req.body;
  if (!category || !price || !paymentMethod) {
    return res
      .status(400)
      .json({ message: "All the fields are required", data: null });
  }
  next();
}

export const getRandom = (req, res) => {
  const randomNumber = Math.random() * 1;
  console.log(randomNumber);

  if (randomNumber > 0.5) {
    return res.status(200).json({ messgae: "success" });
  } else {
    return res.status(400).json({ messgae: "bad request" });
  }
};

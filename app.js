import apiRouter from "./api/api.route.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.redirect("api/expenses");
});
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

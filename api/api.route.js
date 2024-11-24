import { Router } from "express";
import expensesRouter from "./expenses/expenses.route.js";
import randomRouter from "./random/random.route.js";

const apiRouter = Router();

apiRouter.get("/", async (req, res) => {
  res.redirect("api/expenses");
});

apiRouter.use("/expenses", expensesRouter);
apiRouter.use("/random", randomRouter);

export default apiRouter;

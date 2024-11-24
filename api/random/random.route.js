import { Router } from "express";
import { getRandom } from "./random.service.js";

const randomRouter = Router();

randomRouter.get("/", getRandom);

export default randomRouter
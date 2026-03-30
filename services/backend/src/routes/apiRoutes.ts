import express from "express";

import { articleController } from "../api/controllers/article.controller";
import { lessonController } from "../api/controllers/lesson.controller";
import { weatherController } from "../api/controllers/weather.controller";

const router = express.Router();
console.log("api router");

router.post("/article", articleController.getByCategory);

router.get("/lessons", lessonController.getAll);
router.post("/lesson", lessonController.getByID);

router.get("/forecast", weatherController.getAll);

export default router;

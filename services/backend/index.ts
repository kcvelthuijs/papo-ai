import express from "express";
import dotenv from "dotenv";

import apiRouter from "./src/routes/apiRoutes";
import llmRouter from "./src/routes/llmRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", apiRouter); // api calls
app.use("/llm", llmRouter); // llm callsbunad

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import express from "express";
import dotenv from "dotenv";

import router from "./src/Routes/Routes";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/llm", router);
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

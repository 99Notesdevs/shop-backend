import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import logger from "./utils/logger";

const PORT = Number(process.env.PORT) || 5550;

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});

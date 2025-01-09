import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connect from "./config/database";
const { PORT } = process.env;

connect();

app.on("db ready", () => {
  app.listen(PORT, () => {
    console.log("");
    console.log(`Im listening to port ${PORT}`);
    console.log(`To access, use: http://localhost:${PORT}`);
  });
});

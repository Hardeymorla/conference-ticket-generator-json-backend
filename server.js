import { router as _router, defaults } from "json-server";
import express, { json } from "express";
import cors from "cors";
import { join } from "path";

const server = express();
const router = _router(join(__dirname, "db.json"));
const middlewares = defaults();

server.use(cors());
server.use(json());
server.use(middlewares);

// Custom endpoint to test server
server.get("/", (req, res) => {
  res.send("Ticket Backend API is running 🚀");
});

// Allow POST, PUT, DELETE
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = new Date().toISOString();
  }
  next();
});

server.use("/api", router);

// Render listens on process.env.PORT
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

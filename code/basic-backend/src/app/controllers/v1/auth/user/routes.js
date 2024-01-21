import express from "express";
const app = express();
import {
  create,
  login,
  getAll,
  getById,
  update,
  deleteById,
  resetPassword,
  setPassword,
  forgetPassword,
} from "./user.js";

app.post("/register", create);
app.post("/login", login);
app.get("/getAll", getAll);
app.get("/profile/:id", getById);
app.put("/update/:id", update);
app.delete("/delete/:id", deleteById);
app.post("/reset-password", resetPassword);
app.post("/set-password", setPassword);
app.post("/forgot-password", forgetPassword);

export default app;

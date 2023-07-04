import express, { json } from "express";
import authRoutes from "./routes/auth/auth";
import companyRoutes from "./routes/company/company";
import jobRoutes from "./routes/job/job";
const app = express();
const port = 3000;
app.use(json());
app.use("/auth", authRoutes);
app.use("/company", companyRoutes);
app.use("/job", jobRoutes);
app.listen(port, () => {
  console.log(`app  running on port ${port} http://localhost:3000/`);
});

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RepairRouter from './routes/RepairRoutes.js';
import AuthRouter from './routes/AuthRoutes.js';
import ReportRouter from './routes/ReportRoutes.js';
import AdminRouter from './routes/AdminRoutes.js';
import AiRouter from './routes/AiRoutes.js';
import UserRouter from './routes/UserRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 2000;
const URL = process.env.MONGOURL;

mongoose.connect(URL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log("Server is running on Port:", PORT);
    });
  })
  .catch(error => console.log(error));

app.use("/api",RepairRouter);
app.use("/api/users",AuthRouter);
app.use("/api/user",UserRouter);
app.use("/api",ReportRouter);
app.use("/api/admin",AdminRouter);
app.use("/api", AiRouter);
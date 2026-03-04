import express from 'express';
import cors from "cors";
import 'dotenv/config';
import connectDB from './config/db.js';
import healthRoute from './routes/health.route.js'
import authRoute from './routes/auth.route.js'
import { protect } from './middleware/auth.middleware.js';
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import { startKeepAlive } from "./utils/keepAlive.js";


const app = express();

// Enabling CORS
const allowedOrigins = [
  "http://localhost:5173",              
  process.env.FRONTEND_URL              
].filter(Boolean);


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.use("/uploads", express.static("uploads"));
// PORT
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use("/api/applications", applicationRoute);


// Routes
app.use('/api',healthRoute)
app.use("/api", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/applications", applicationRoute);

// Database
connectDB();


// Keeping Route Alive
startKeepAlive();


app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});
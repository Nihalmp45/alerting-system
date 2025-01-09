import logger from "./src/logger.js";
import morgan from "morgan";
import express from "express";
import "dotenv/config" 
import cors from "cors"
import connectToDB from "./src/config/dbConfig.js";
import failedRequestsRoutes from "./src/views/failedRequestRoute.js";


const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
connectToDB()

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, // Allow cookies to be sent
}));

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use("/api", failedRequestsRoutes);
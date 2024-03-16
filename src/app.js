import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createRoles } from "./libs/initialSetup";
import ProductsRouter from "./routes/products.routes";
import authRoutes from "./routes/auth.routes"
import userRouts from "./routes/user.routes"
import rateLimit from "express-rate-limit";

const app = express();
createRoles();
app.use(morgan('dev')); //registrar informacion sobre las solicitudes hhtp

const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE', 
    allowedHeaders: 'Content-Type,Authorization', 
    credentials: true 
  };


app.use(cors(corsOptions));
app.use(express.json())


app.get ("/", (req, res)=>{
        res.status(200).json({
            messgage: "Pruebitas",
        });
})  

app.use('/products',ProductsRouter);
app.use('/api/auth/',authRoutes);
app.use('/api/users', userRouts);


export default app;


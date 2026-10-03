import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import { getConnection } from "./db.js";
import usersRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();


// Middlewares
app.use(morgan("dev"));
app.use(express.json());


// Probar conexión con SQL Server
getConnection();


// Rutas iniciales
app.get("/", (req, res) => {
    res.send("REST API funcionando");
});

app.get("/marco", (req, res) => {
    res.send("Hola Marco");
});

app.get("/ping", (req, res) => {
    res.json({
        message: "pong"
    });
});


// Rutas de usuarios
app.use(usersRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
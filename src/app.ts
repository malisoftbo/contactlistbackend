import express, { Application } from 'express';
import morgan from 'morgan'
import cors from "cors"

import Routes from "./routes"
import "./database"

const app: Application = express();

/*SETTINGS*/
app.set('port', process.env.PORT || "4000");

/*MIDDLAWARES*/
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

/*ROUTES*/
app.use("/api", Routes);

/*EXPORTING THE MODULE*/
export default app;
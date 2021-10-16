import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"


import {extractDataProfileLinkedInRoute} from "./routes/extractDataProfileLinkedIn.route"
import {getDataLinkedinRoute} from "./routes/getDataLinkedin.route";
import {exportDataRoute} from "./routes/exportData.route";
import {connectToDatabase} from "./config/databaseConnection";
import {connectProfileMessageLinkedinRoute} from "./routes/connectProfileMessageLinkedin.route";

dotenv.config();

const port = parseInt(process.env.PORT || "8080");
const app = express();


app.use(morgan('dev'));
app.use(cors({origin: 'http://localhost:3000'}));


app.use("/extract", extractDataProfileLinkedInRoute());
app.use("/connect", connectProfileMessageLinkedinRoute())
app.use("/", getDataLinkedinRoute());
app.use("/", exportDataRoute());



app.listen(port, async () => {
     await connectToDatabase();
    console.log(`Application started on URL http://localhost:${port}`);
});


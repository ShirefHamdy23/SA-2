import express from "express" ;
import {kafka} from "./src/controllers/kafka_producer.js";
import { config } from "dotenv";

config();
const app = express();
app.use(express.json());

kafka(app);

app.listen(4321,() => {
    console.log("marketer runs on 4321");
});
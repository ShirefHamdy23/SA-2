import express from "express" ;
import {kafka} from "./src/controllers.producer.js";
import { config } from "dotnev";

config();
const app = express();
app.use(express.json());

kafka(app);

app.listen(4321,() => {
    console.log("marketer runs on 4321");
});
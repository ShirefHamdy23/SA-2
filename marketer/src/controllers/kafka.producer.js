import router from "../routes/offer.router.js";
import {kafkaClient , producer } from "kafka-node";
const client = new kafkaClient({kafkaHost: "kafka:9092"});
const producer = new producer(client);
export const  kafka = async (app) =>{
    producer.on("ready",() => {
        console.log("ready");
        app.use(router);
    });
};

export function kafkaSend(message){
    producer.send(
        [
            {
                topic: process.env.TOPIC,
                messages:JSON.stringify(message),
            },
        ],
        (err,data) => {}
    );
}

function initTopic(producer){
    producer.send(
        [
            {
                topic: process.env.TOPIC,
                messages:
                [
                    JSON.stringify({
                        method :  "post",
                        item : "mo",
                        percentage : 5 ,
                    }),
                ],
            },
        ],

        (err , data) =>{ }
    )
}
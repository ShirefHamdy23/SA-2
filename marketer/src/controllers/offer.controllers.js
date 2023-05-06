import {offer as Offer } from "../models/offer.js";
import { kafkaSend } from "./kafka.producer.js";

const sendOffer = (res,offer) => {
    offer = new Offer(offer);

    if (offer.valid){
        console.log({...offer});
        kafkaSend({...offer});
        return res
        .status(200)
        .json({status:"sent" ,  message: "message sent to the client"});
    }
    return res.status(400).json({status:"failed" ,  message: "error in model"});
};

export default {sendOffer};
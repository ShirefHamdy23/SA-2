import {Router} from "express";
import {methods} from "../models/offer.js";
import offerController from "../controllers/offer.controllers.js";

const router = Router();

router.post("/" , (req,res) => {
    return offerController.sendOffer(res,{
    ...req.body,
    method: methods.post,
    });
});

router.delete("/:id" ,  ( req,res) => {
    const {id} = req.params;
    return offerController.sendOffer(res ,{id , method: methods.delete }); 
});

router.patch("/:id" ,  ( req,res) => {
    const {id} = req.params;
    return offerController.sendOffer(
        res,
        {
            ...req.body,
            id,
            method: methods.update,
        },
        id
    ) ;
});
export default router;

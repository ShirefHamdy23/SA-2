import { Router } from "express";
import offerController from "../controllers/offer_controller.js";
// import { offer } from "process";
const router = Router();
router.get("/", async (req, res, next) => {
  try {
    const offers = await offerController.getOffers();
    res.json({
      type: "success",
      message: "offers retrieved successfully",
      offers,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const offers = await offerController.addOffer();
    res.json({
      type: "success",
      message: "offers retrieved successfully",
      offers,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const offers = await offerController.getOffer(id);
    res.json({
      type: "success",
      message: "offer retrieved successfully",
      offers,
    });
  } catch (err) {
    next(err);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const offer = await offerController.deleteOffer(id);
    if (offer) {
      res.json({
        type: "success",
        message: "offer deleted successfully",
        offer,
      });
    }
    else {
      res.json({
        message: "offer not found ",
        offer,
      });
    }
    
  } catch (err) {
    next(err);
  }
});
export default router;
